import { OAuth2Client } from "google-auth-library";
import Credential from "../models/credential.model.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

import welcomeEmail from "../emailTemplates/welcome.template.js";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login Controller
export const googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email } = payload;

    // Check if the user already exists
    let user = await Credential.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new Credential({
        email,
        type: "google-auth",
        password: "svrkjdt ghli", // Dummy password for Google login
        active: true,
      });
      await user.save();
      await welcomeEmail(email);
    } else {
      if (user.type !== "google-auth") {
        return res
          .status(401)
          .json({ message: "Kindly login using email and password" });
      }
    }
    // Generate a JWT token for the user
    const token = JWT.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Respond with a success message
    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Google login error:", error);
    return res
      .status(500)
      .json({ message: "Error during Google login. Try again in some time" });
  }
};

export const logout = (req, res) => {
  try {
    if (!req.cookies?.token) {
      return res
        .status(400)
        .json({ success: false, message: "No active session found" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const checkLoginStatus = (req, res) => {
  res.status(200).json({ message: "User is logged in" });
};
