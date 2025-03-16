import { Email } from "@convex-dev/auth/providers/Email";
import { alphabet, generateRandomString } from "oslo/crypto";
import { ServerClient } from "postmark";

export const postmarkOTP = Email({
  id: "postmark-otp",
  apiKey: process.env.AUTH_POSTMARK_KEY,
  maxAge: 60 * 5,
  from: "Tipprunde <hallo@runde.tips>",
  async generateVerificationToken() {
    return generateRandomString(6, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    if (!provider.apiKey || !provider.from) {
      throw new Error("Missing postmark token");
    }

    const client = new ServerClient(provider.apiKey);
    const response = await client.sendEmail({
      From: provider.from,
      To: email,
      Subject: "Tipprunde Login Code",
      Tag: "totp",
      TextBody: `Hallo, Dein Login-Code ist: ${token}`,
    });

    if (response.ErrorCode) {
      throw new Error("Postmark error: " + response.Message);
    }
  },
});
