from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from .models import *


# ✅ 1. Send Account Credentials
@shared_task(ignore_result=False, name="send_account_credentials")
def account_credentials(email_id):
    try:
        # Get the user using the provided email
        user = User.objects.get(alternative_email_id=email_id)

        subject = "Your Spaceborn Account Credentials"
        body_html = f"""
        <p>Hi <b>{user.full_name}</b>,</p>
        <p>Your account has been successfully created on <b>Spaceborn</b>!</p>
        <p><b>Login Details:</b><br>
        Email ID: {user.email_id}<br>
        Password: {user.password}</p>
        <p>Please keep your credentials safe and do not share them with anyone.</p>
        <br><p>Best Regards,<br>Spaceborn Admin Team</p>
        """

        # ✅ Send HTML Email
        msg = EmailMultiAlternatives(
            subject=subject,
            body="Your Spaceborn account has been created.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[user.alternative_email_id],
        )
        msg.attach_alternative(body_html, "text/html")
        msg.send()

        print(f"✅ Account details email sent to {user.alternative_email_id}")
        return f"Account details sent to {user.alternative_email_id}"

    except User.DoesNotExist:
        print(f"❌ No user found with alternative email: {email_id}")
        return "User not found"


# ✅ 2. Send Meeting Reminder
@shared_task(ignore_result=False, name="send_meeting_reminder")
def meeting_reminder(meeting_id):
    try:
        meeting = Meeting.objects.get(id=meeting_id)
        team = meeting.team

        if not team:
            return "Meeting has no associated team."

        members = team.members.all()
        if not members:
            return "No members found in this team."

        subject = f"📅 Meeting Reminder: {meeting.title}"
        for member in members:
            body_html = f"""
            <p>Hi <b>{member.full_name}</b>,</p>
            <p>This is a reminder for your upcoming meeting scheduled with <b>{team.name}</b>.</p>
            <p><b>Meeting Details:</b><br>
            Title: {meeting.title}<br>
            Date: {meeting.date}<br>
            Time: {meeting.start_time}
            Link: {meeting.link}</p>
            <p>Please join on time.</p>
            <br><p>Best Regards,<br>Spaceborn Admin Team</p>
            """

            msg = EmailMultiAlternatives(
                subject=subject,
                body="Meeting reminder from Spaceborn.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[member.email_id],
            )
            msg.attach_alternative(body_html, "text/html")
            msg.send()

        print(f"✅ Meeting reminder sent to all members of team {team.name}")
        return f"Meeting reminder sent to {members.count()} members."

    except Meeting.DoesNotExist:
        print(f"❌ Meeting not found for ID: {meeting_id}")
        return "Meeting not found."
