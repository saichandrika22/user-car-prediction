"""
Email service for sending contact form messages.
Uses SMTP for Gmail integration.
"""

import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class EmailService:
    """Service for sending emails via SMTP."""
    
    def __init__(self):
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.sender_email = os.getenv("SENDER_EMAIL", "")
        self.sender_password = os.getenv("SENDER_PASSWORD", "")
        self.recipient_email = os.getenv("RECIPIENT_EMAIL", "mscy4u@gmail.com")
    
    def send_contact_email(self, user_email: str, user_message: str, name: str = "") -> bool:
        """
        Send a contact form submission to the configured recipient.
        
        Args:
            user_email: Email address of the person submitting the form
            user_message: The message content
            name: Optional name of the sender
            
        Returns:
            bool: True if email sent successfully, False otherwise
        """
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"New Contact Form Message from {name or user_email}"
            msg['From'] = self.sender_email
            msg['To'] = self.recipient_email
            msg['Reply-To'] = user_email
            
            # Create HTML version
            html_body = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                    <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>From:</strong> {name or "Anonymous"} ({user_email})</p>
                        <p><strong>Date:</strong> Current Time</p>
                    </div>
                    
                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #dc2626; margin-top: 0;">Message:</h3>
                        <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                            {user_message}
                        </p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666;">
                        This message was sent from your AutoVal Pro contact form.
                    </p>
                </div>
            </body>
            </html>
            """
            
            # Create plain text version
            text_body = f"""
New Contact Form Submission

From: {name or "Anonymous"} ({user_email})

Message:
{user_message}

---
This message was sent from your AutoVal Pro contact form.
            """
            
            # Attach both versions
            msg.attach(MIMEText(text_body, 'plain'))
            msg.attach(MIMEText(html_body, 'html'))
            
            # Connect to SMTP server and send
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.sendmail(
                    self.sender_email,
                    self.recipient_email,
                    msg.as_string()
                )
            
            return True
            
        except Exception as e:
            print(f"Failed to send email: {str(e)}")
            return False
    
    def is_configured(self) -> bool:
        """Check if email service is properly configured."""
        return bool(self.sender_email and self.sender_password and self.recipient_email)


# Singleton instance
email_service = EmailService()
