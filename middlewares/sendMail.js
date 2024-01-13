import { createTransport } from "nodemailer";

export const sendMail = async (options) => {
  const transporter = createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  await transporter.sendMail({
    subject: "CONTACT REQUEST FROM WEBSITE",
    from: process.env.SMPT_MAIL,
    to: process.env.MYMAIL,
    // to: process.env.MYMAIL,
    text: options.userMessage,
  });
};