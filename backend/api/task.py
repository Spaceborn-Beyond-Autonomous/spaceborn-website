from celery import shared_task
from .models import * 
from jinja2 import Template
import csv
from .mail import send_email
import requests
from flask import current_app
from datetime import datetime, timedelta

# @shared_task(ignore_results=False, name='download_csv_report', bind=True)
# def csv_report(self, email_id):
#     with current_app.app_context():
#         user=User.query.filter_by(email_id=email_id).one_or_none()
#         appointment=Appoinment.query.filter_by(patient_id=user.id).all()
#         # print(f"[DEBUG] Running CSV report for {email_id}")
#         # user = User.query.filter_by(email_id=email_id).one_or_none()
#         # print(user.id)
#         # print(f"[DEBUG] User: {user}")

#         # appointment = Appoinment.query.filter_by(patient_id=user.id).all()
#         # print(f"[DEBUG] Appointments found: {len(appointment)}")

#         csv_file_name=f'Treatment_Details_{user.id}.csv'
        
#         with open(f'static/{csv_file_name}', 'w', newline= "") as csvfile:
#             s_no=1
#             report_csv = csv.writer(csvfile, delimiter = ',')
#             report_csv.writerow(['S_No', 'Doctor', 'Amount', 'Diagnosis', 'Prescription', 'Suggestions'])
#             for a in appointment:
#                 doctor_name = a.doctor.name if a.doctor else "N/A"
#                 doctor_fees = a.doctor.fees if a.doctor else "N/A"
                
#                 # Some appointments might not have treatment records yet
#                 if a.treatment:
#                     diagnosis = a.treatment.diagnosis
#                     prescription = a.treatment.prescription
#                     notes = a.treatment.notes
#                 else:
#                     diagnosis = prescription = notes = "N/A"

#                 report_csv.writerow([s_no, doctor_name, doctor_fees, diagnosis, prescription, notes])
#                 s_no += 1

#     return csv_file_name


# @shared_task(ignore_result=False, name='monthly_report')
# def month_report():
    
#     users=User.query.filter_by(role="doctor").all()
    
#     for a in users:
#         s_no=0
#         user_data={}
#         user_data['username'] = a.name
#         user_data['email'] = a.email_id
#         appointments = []
#         appointment=Appoinment.query.filter_by(doc_id=a.id).all()
        
#         for i in appointment:
#             appointment_dict={}
#             s_no+=1
#             appointment_dict['S_No']=s_no
#             appointment_dict['patient_name']=i.patient.name
#             appointment_dict['status']=i.status
#             appointment_dict['date']=i.slot.date.isoformat()
#             appointment_dict['time']=i.slot.slots_time
#             appointments.append(appointment_dict)
        
#         user_data['appointments']=appointments
#         template="""
#         <h3> Dr.{{user_data.username}}</h3>
#         <p>Here's your appointment history for last month</p>
#         <table>
#             <tr>
#                 <th>S.No</th>
#                 <th>Patient_name</th>
#                 <th>Date</th>
#                 <th>Time</th>
#                 <th>Status</th>
#             </tr>
            
#             {% for b in user_data.appointments %}
            
#                 <tr>
#                     <td>{{b.S_No}}</td>
#                     <td>{{b.patient_name}}</td>
#                     <td>{{b.date}}</td>
#                     <td>{{b.time}}</td>
#                     <td>{{b.status}}</td>
                    
#                 </tr>
#             {% endfor %}
            
#         </table>
        
#         <h5>Thanks for being on our platform <br>
#         <h5>Hap!Care</h5>
        
#         """
#         message = Template(template).render(user_data = user_data)
#         send_email([(a.email_id, a.name)], subject="Monthly appointments report", body={a.name: message})
#     return "Monthly report sent"




# @shared_task(ignore_result=False, name='daily_remainder')
# def send_daily_remainders():
#     now = datetime.utcnow()
#     in_24_hours = now + timedelta(hours=24)

#     # Query all users (or adjust as per your use case)
#     users = User.query.all()

#     for user in users:
#         upcoming_appointments = Appoinment.query.filter_by(patient_id=user.id, status='booked').all()
#         for appt in upcoming_appointments:
#             # Parse the appointment slot time (assuming your slot_time field)
#             start_time_str = appt.slot.slots_time.split(" - ")[0]
#             slot_time = datetime.strptime(f"{appt.slot.date} {start_time_str}", "%Y-%m-%d %H:%M")

#             if now <= slot_time <= in_24_hours:
#                 # Convert to string for serialization
#                 slot_time_str = slot_time.strftime("%H:%M")
#                 daily_remainder.delay(user.name, appt.doctor.name, slot_time_str, appt.slot.date)
                
                


@shared_task(ignore_result=False, name="Daily remainder")
def daily_remainder(self, email_id):
    user=User.objects.filter(alternative_email_id=email_id)
    text = f"Hi {user.fullname}, your account has been successfully created in Spaceborn, Here are your credentials for logging in, Email ID:{user.email_id} Password:{user.password}."
    response=requests.post(user.alternative_email_id,
                           json = {"text": text})
    print(response.status_code)
    # print('Sending to:', url)
    print('Payload:', {"text": text})
    print('Response:', response.status_code, response.text)

    return "Account details sent to the user."