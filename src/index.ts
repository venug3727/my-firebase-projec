import express, { Request, Response } from "express";
import multer from "multer";
import admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

const app = express();

// Initialize Firebase Admin SDK
admin.initializeApp({
  storageBucket: "persnal-website-9ab5f.firebasestorage.app", // Replace with your bucket name
});

// Multer setup
const upload = multer({ storage: multer.memoryStorage() });

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "venug3727@gmail.com", // Replace with your email
    pass: "lrac bvqu obec sbmw", // Replace with app-specific password
  },
});

// Cloud Function for sending email
// Define the type for the data
interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

// Define the type for the expected data
interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export const sendContactMessage = functions.https.onCall(
  async (data, context) => {
    // Cast the incoming data to the expected type (ContactMessage)
    const { name, email, message } = data as unknown as ContactMessage;

    const mailOptions = {
      from: email,
      to: "your-email@gmail.com", // Replace with the recipient's email
      subject: `Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error: any) {
      console.error("Error sending email:", error);
      return { success: false, error: error.message };
    }
  }
);

// File upload route
app.post(
  "/upload-cv",
  upload.single("resume"),
  async (req: Request, res: Response) => {
    try {
      const resumeFile = req.file;

      if (!resumeFile) {
        res.status(400).send({ error: "No file uploaded." });
        return;
      }

      const bucket = admin.storage().bucket();
      const resumeRef = bucket.file(`resumes/${resumeFile.originalname}`);
      const stream = resumeRef.createWriteStream({
        metadata: {
          contentType: resumeFile.mimetype,
        },
      });

      stream.end(resumeFile.buffer);

      stream.on("finish", async () => {
        const [signedUrl] = await resumeRef.getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        });

        const db = admin.firestore();
        const userId = "user_id_here"; // Replace with dynamic user ID

        await db.collection("users").doc(userId).update({
          resumeUrl: signedUrl,
        });

        res.status(200).send({
          message: "Resume uploaded and URL saved.",
          url: signedUrl,
        });
      });

      stream.on("error", (error) => {
        console.error("Error uploading file:", error);
        res.status(500).send({ error: "File upload failed." });
      });
    } catch (error) {
      console.error("Error handling request:", error);
      res.status(500).send({ error: "Internal server error." });
    }
  }
);

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
