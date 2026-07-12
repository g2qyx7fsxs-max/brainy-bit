import { Resend } from "resend";

const NOTIFY_EMAIL = "hellobrainybit@gmail.com";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendNewsletterSignupNotification(data: {
  firstName: string;
  surname: string;
  email: string;
}): Promise<void> {
  if (!resend) return;

  try {
    await resend.emails.send({
      from: "Brainy Bit <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      subject: "Monthly newsletter subscription",
      text: `New newsletter signup:\n\nName: ${data.firstName} ${data.surname}\nEmail: ${data.email}`,
    });
  } catch {
    // Don't let a failed notification email break the signup itself —
    // the signup is already safely stored regardless of this email.
  }
}
