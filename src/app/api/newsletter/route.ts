import { addNewsletterSignup } from "@/lib/newsletter";
import { sendNewsletterSignupNotification } from "@/lib/email";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const firstName = typeof body?.firstName === "string" ? body.firstName.trim() : "";
  const surname = typeof body?.surname === "string" ? body.surname.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!firstName || !surname || !EMAIL_PATTERN.test(email)) {
    return Response.json(
      { error: "Please fill in your first name, surname, and a valid email." },
      { status: 400 }
    );
  }

  const success = await addNewsletterSignup({ firstName, surname, email });
  if (!success) {
    return Response.json(
      { error: "Signups aren't switched on yet — try again soon!" },
      { status: 503 }
    );
  }

  await sendNewsletterSignupNotification({ firstName, surname, email });

  return Response.json({ success: true });
}
