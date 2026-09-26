import bcrypt from "bcryptjs";

import {
  createUser,
  getUserByEmail,
} from "@/models/userModel";

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, password, confirmPassword } = body;

    if (!name || !email || !password || !confirmPassword) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      return Response.json(
        {
          success: false,
          message: "Name is required",
        },
        {
          status: 400,
        }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      return Response.json(
        {
          success: false,
          message: "Enter a valid email address",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 6) {
      return Response.json(
        {
          success: false,
          message: "Password must be at least 6 characters",
        },
        {
          status: 400,
        }
      );
    }

    if (password !== confirmPassword) {
      return Response.json(
        {
          success: false,
          message: "Passwords do not match",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await getUserByEmail(cleanEmail);

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "An account with this email already exists",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUser(
      cleanName,
      cleanEmail,
      hashedPassword
    );

    return Response.json(
      {
        success: true,
        message: "Account created successfully",
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong while creating your account",
      },
      {
        status: 500,
      }
    );
  }
}