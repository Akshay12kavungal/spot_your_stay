from twilio.rest import Client
from django.conf import settings

def send_otp_via_whatsapp(phone_number, otp):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    message = f"Your SpotYourStay OTP is: {otp}. It will expire in 5 minutes."
    
    response = client.messages.create(
        from_='whatsapp:+14155238886',  # Twilio sandbox number
        body=message,
        to=f'whatsapp:{phone_number}'
    )
    
    return response.sid
