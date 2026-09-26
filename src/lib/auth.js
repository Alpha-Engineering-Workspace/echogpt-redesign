import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/models/userModel";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();

        const user = await getUserByEmail(email);

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
  async jwt({ token, user, trigger, session }) {
    if (user) {
      token.id = user.id;
    }

    if (trigger === "update" && session?.name) {
      token.name = session.name;
    }

    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id;
      session.user.name = token.name;
    }

    return session;
  },
},

  secret: process.env.NEXTAUTH_SECRET,
};