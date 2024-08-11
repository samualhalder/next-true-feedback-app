import { resend } from "@/lib/resend";
import VerficationEmailTemplete from "../../email/VarificationEmail";

export async function verificationEmail({
  username,
  email,
  verifyCode,
}: {
  username: string;
  email: string;
  verifyCode: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello world",
      react: VerficationEmailTemplete({ username, validationCode: verifyCode }),
    });
  } catch (error) {
    return Error("error in sendign email");
  }
}
