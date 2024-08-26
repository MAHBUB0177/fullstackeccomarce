import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Extend the default user type to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      // Add other user properties here if needed
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    // Add other user properties here if needed
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    strategy: "jwt",
    updateAge: 0,
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: any }) => {
      console.log(token, "token+++++++++++++++");
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: { session: DefaultSession; token: JWT }) => {
      if (session) {
        session.user = token.user;
      }
      return session;
    },
  },
  site: process.env.NEXTAUTH_URL,
  cookie: {
    secure: process.env.NODE_ENV === "production",
  },
  redirect: false,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("userData", credentials);
        try {
          if (credentials) {
            return { id: "1", email: credentials.email }; // Replace with actual user validation logic
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
