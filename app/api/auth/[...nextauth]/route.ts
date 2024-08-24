import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    strategy: "jwt",
    updateAge: 0,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
        console.log(token,'next-auth-session')
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session && token?.user) {
        session.user = token.user;
      } else if (token) {
        session.token = token;
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
        // Perform your login logic here and return the user object
        const user = { id: "1", email: credentials?.email, name: "John Doe" };
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
