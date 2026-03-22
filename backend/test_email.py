"""
Test script to verify email configuration
Run this to check if your email settings are working
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("=== Email Configuration Test ===\n")

# Check configuration
sender_email = os.getenv("SENDER_EMAIL", "")
sender_password = os.getenv("SENDER_PASSWORD", "")
recipient_email = os.getenv("RECIPIENT_EMAIL", "mscy4u@gmail.com")
smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
smtp_port = os.getenv("SMTP_PORT", "587")

print(f"SMTP Server: {smtp_server}")
print(f"SMTP Port: {smtp_port}")
print(f"Sender Email: {sender_email if sender_email else 'NOT SET ❌'}")
print(f"Sender Password: {'***SET***' if sender_password else 'NOT SET ❌'}")
print(f"Recipient Email: {recipient_email}")
print()

if not sender_email or sender_email == "your-gmail@gmail.com":
    print("❌ ERROR: SENDER_EMAIL is not configured!")
    print("   Please update the .env file with your actual Gmail address.")
    print()
    
if not sender_password or sender_password == "your-app-password-here"::
    print("❌ ERROR: SENDER_PASSWORD is not configured!")
    print("   Please generate an App Password from https://myaccount.google.com/apppasswords")
    print()
    
if sender_email and sender_password and sender_email != "your-gmail@gmail.com":
    print("✅ Configuration looks good! Testing email send...")
    print()
    
    try:
        import smtplib
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart
        
        # Create test message
        msg = MIMEMultipart()
        msg['Subject'] = "Test Email from AutoVal Pro"
        msg['From'] = sender_email
        msg['To'] = recipient_email
        
        body = """
This is a test email from your AutoVal Pro contact form.

If you received this, your email configuration is working correctly!

Time: Now
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Try to send
        print(f"Connecting to {smtp_server}:{smtp_port}...")
        with smtplib.SMTP(smtp_server, int(smtp_port)) as server:
            server.starttls()
            print("TLS started")
            
            print(f"Logging in as {sender_email}...")
            server.login(sender_email, sender_password)
            print("Login successful!")
            
            print(f"Sending test email to {recipient_email}...")
            server.sendmail(sender_email, recipient_email, msg.as_string())
            print("✅ Test email sent successfully!")
            print()
            print("📧 Check your inbox (and spam folder) at:", recipient_email)
            
    except Exception as e:
        print(f"❌ Failed to send test email: {str(e)}")
        print()
        print("Common issues:")
        print("1. Gmail App Password not generated correctly")
        print("2. 2-Factor Authentication not enabled on Gmail")
        print("3. Wrong email or password")
        print("4. Gmail security blocking the connection")
        print()
        print("To fix:")
        print("1. Enable 2FA on your Gmail account")
        print("2. Go to https://myaccount.google.com/apppasswords")
        print("3. Generate an App Password for 'Mail'")
        print("4. Copy the 16-character password to SENDER_PASSWORD in .env")
else:
    print("⚠️  Please configure your email credentials in the .env file first.")
    print()
    print("Steps:")
    print("1. Open backend/.env")
    print("2. Replace 'your-gmail@gmail.com' with your actual Gmail")
    print("3. Replace 'your-app-password-here' with your Gmail App Password")
    print("4. Save the file")
    print("5. Restart the backend server")
    print("6. Run this test again: python test_email.py")
