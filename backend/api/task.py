from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from .models import User, Team, Task, Meeting
from django.core.mail import send_mass_mail
import logging


logger = logging.getLogger(__name__)


# ✅ 1. Send Account Credentials
@shared_task(bind=True, max_retries=3, name="send_account_credentials", rate_limit='100/h')
def send_account_credentials(self, email):
    """Send password reset link instead of actual password"""
    try:
        user = User.objects.get(alternative_email_id=email)  # ✅ Use primary email field
        
        # ✅ Generate one-time password reset token
        from django.contrib.auth.tokens import default_token_generator
        from django.utils.http import urlsafe_base64_encode
        from django.utils.encoding import force_bytes
        
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        from django.contrib.sites.shortcuts import get_current_site
        reset_link = f"{settings.SITE_URL}/reset-password/{uid}/{token}/"
        
        subject = "Welcome to Spaceborn - Set Your Password"
        body_html = f"""
        <p>Hi <b>{user.full_name}</b>,</p>
        <p>Your account has been successfully created on <b>Spaceborn</b>!</p>
        <p><b>Your Login Email:</b> {user.email_id}</p>
        <p><b>Set Your Password:</b><br>
        <a href="{reset_link}">Click here to set your password</a></p>
        <p>This link expires in 24 hours.</p>
        <p><b>Security Note:</b> Never share your password with anyone, including Spaceborn staff.</p>
        <br><p>Best Regards,<br>Spaceborn Team</p>
        """
        
        msg = EmailMultiAlternatives(
            subject=subject,
            body="Welcome to Spaceborn! Set your password to get started.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[user.email_id],  # ✅ Send to primary email
        )
        msg.attach_alternative(body_html, "text/html")
        result = msg.send()
        if result == 0:
            raise Exception("Email failed to send")
        return f"Welcome email sent to {user.email_id}"
        
        return f"Welcome email sent to {user.email}"
        
    except User.DoesNotExist:
        self.retry(countdown=60, exc=Exception(f"User not found: {email}"))
    except Exception as e:
        self.retry(countdown=300, exc=e)  # Retry after 5 minutes



# ✅ 2. Send Meeting Reminder
@shared_task(name="send_meeting_reminder")
def meeting_reminder(meeting_id):
    try:
        meeting = Meeting.objects.get(id=meeting_id)
        team = meeting.team

        if not team:
            return "Meeting has no associated team."

        if not team.team_members.exists():
            return "No members found in this team."
        members = team.team_members.all()
        
        subject = f"📅 Meeting Reminder: {meeting.title}"
        messages = []

        for member in members:
            body = (
                f"Hi {member.full_name},\n\n"
                f"This is a reminder for your upcoming meeting:\n"
                f"Title: {meeting.title}\n"
                f"Date: {meeting.date}\n"
                f"Time: {meeting.start_time}\n"
                f"Link: {meeting.link}\n\n"
                f"Best Regards,\nSpaceborn Admin Team"
            )
            messages.append((subject, body, settings.DEFAULT_FROM_EMAIL, [member.email_id]))

        # ✅ One SMTP connection for all emails
        try:
            send_mass_mail(messages, fail_silently=False)
            return f"✅ Sent {len(messages)} reminders for team {team.name}."
        except Exception as e:
            logger.error(f"Failed to send meeting reminders: {e}")
            raise self.retry(exc=e, countdown=2 ** self.request.retries * 60)

        return f"✅ Sent {len(messages)} reminders for team {team.name}."

    except Meeting.DoesNotExist:
        logger.error(f"Meeting not found: {meeting_id}")
        return "Meeting not found"
