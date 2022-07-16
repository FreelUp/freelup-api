import mail from "@sendgrid/mail";
import { encode } from "./token.util.js";

mail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendForgotPasswordEmail(email) {
  try {
    const token = encode({ email: email }, { expiresIn: "30 minutes" });
    const link = `${process.env.CLIENT_HOST}/change-password?token=${token}`;
    await mail.send({
      to: email,
      from: "alison.moura@hightechcursos.com",
      subject: "Esqueci minha senha: FreelUp",
      templateId: "d-330f3f3367c44f9faa5d5f4442b30ec2",
      dynamicTemplateData: {
        link: link,
      },
    });
  } catch (error) {
    throw error;
  }
}
