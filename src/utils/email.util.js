import mail from "@sendgrid/mail";
import { encode } from "./token.util.js";

mail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendForgotPasswordEmail(email) {
  try {
    const token = encode(email, process.env.PRIVATE_KEY);
    const link = `${process.env.CLIENT_HOST}/change-password?token=${token}`;
    await mail.send({
      to: email,
      from: "alison.moura@hightechcursos.com",
      subject: "Esqueci minha senha: FreelUp",
      html: `
      <p>Acesse o link asseguir para redefinir sua senha: <a target="_blank" href="${link}">${link}</a></p>
      `,
    });
  } catch (error) {
    throw error;
  }
}
