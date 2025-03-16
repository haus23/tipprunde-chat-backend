import { convexAuth } from "@convex-dev/auth/server";
import { postmarkOTP } from "./otp/postmark";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [postmarkOTP],
});
