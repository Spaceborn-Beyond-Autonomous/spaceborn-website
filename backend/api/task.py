from celery import shared_task
from .models import *
from .mail import send_email


@shared_task(ignore_result=False, name="send_account_credentials")
def account_credentials(email_id):
    try:
        # ✅ Fetch the user
        user = User.objects.get(alternative_email_id=email_id)

        # ✅ Construct the message
        subject = "Your Spaceborn Account Credentials"
        body = (f"<p>Hi <b>{user.full_name}</b>,</p>"
            f"<p>Your account has been successfully created on <b>Spaceborn</b>!</p>"
            f"<p><b>Login Details:</b><br>"
            f>Email ID: {user.email_id}<br>"
            f>Password: {user.password}</p>"
            f"<p>Please keep your credentials safe and do not share them with anyone.</p>"
            f"<br><p>Best Regards,<br>Spaceborn Admin Team</p>"
        )

        # ✅ Use your mail.py function
        send_email(
            recipients=[(user.alternative_email_id, user.full_name)],
            subject=subject,
            body={user.full_name: body},
        )

        print(f"Account details email sent to {user.alternative_email_id}")
        return f"Account details sent to {user.alternative_email_id}"

    except User.DoesNotExist:
        print(f"No user found with alternative email: {email_id}")
        return "User not found"


@shared_task(ignore_result=False, name="send_meeting_details")
def meeting_remainder(email_id):
    try:
        # ✅ Fetch the user
        user = User.objects.get(alternative_email_id=email_id)

        # ✅ Construct the message
        subject = "Your Spaceborn Account Credentials"
        body = (f"<p>Hi <b>{user.full_name}</b>,</p>"
            f"<p>Your account has been successfully created on <b>Spaceborn</b>!</p>"
            f"<p><b>Login Details:</b><br>"
            f>Email ID: {user.email_id}<br>"
            f>Password: {user.password}</p>"
            f"<p>Please keep your credentials safe and do not share them with anyone.</p>"
            f"<br><p>Best Regards,<br>Spaceborn Admin Team</p>"
        )

        # ✅ Use your mail.py function
        send_email(
            recipients=[(user.alternative_email_id, user.full_name)],
            subject=subject,
            body={user.full_name: body},
        )

        print(f"Account details email sent to {user.alternative_email_id}")
        return f"Account details sent to {user.alternative_email_id}"

    except User.DoesNotExist:
        print(f"No user found with alternative email: {email_id}")
        return "User not found"