// import express from "express";
// import nodemailer from "nodemailer";
// import cors from "cors";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.post("/send-email", async (req, res) => {

//   const { name, email, message } = req.body;

//   try {

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user:  process.env.EMAIL_USER, 
//         pass:process.env.EMAIL_PASS
//       }
//     });

//     await transporter.sendMail({
//       from: email,
//       to: process.env.EMAIL_USER,
//       subject: `Portfolio Message from ${name}`,
//       text: `
// Name: ${name}
// Email: ${email}

// Message:
// ${message}
//       `
//     });

//     res.json({ success: true });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false });
//   }

// });

// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });

import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
            Message:
            ${message}
                  `
                });

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ error: "Email failed to send" });
  }
}