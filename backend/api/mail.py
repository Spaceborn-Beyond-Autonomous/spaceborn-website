import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText



SMTP_SERVER = "localhost"
SMTP_PORT = 1025
SENDER_EMAIL = "no_reply@spaceborn.in"
SENDER_PASSWORD = ""

def send_email(recipients, subject, body):
    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL


    with smtplib.SMTP(host=SMTP_SERVER, port=SMTP_PORT) as client:
        
        # if user == "professional":    
        #     for email, username in recipients:
        #         msg['Subject'] = subject
        #         msg['To'] = email
        #         msg.attach(MIMEText(body[username], 'html'))
        #         client.send_message(msg)

        # else:

        for email, username in recipients:
            msg['Subject'] = subject
            msg['To'] = email
            msg.attach(MIMEText(body[username], 'html'))
            client.send_message(msg)


        client.quit()
        print("Email sent.")


# send_email([("prof@study.iitm.ac.in", "prof")], "Subject", {"prof": "<p>Body</p>"})
# send_email([("cust@study.iitm.ac.in", "cust")], "Subject", {"cust": "<p>Body</p>"})
