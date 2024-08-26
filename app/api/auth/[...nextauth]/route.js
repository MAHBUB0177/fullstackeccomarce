import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  // secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    strategy: "jwt",
    updateAge: 0,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log(token,'token+++++++++++++++')
      if (typeof user !== "undefined") {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session !== null) {
        session.user = token.user;
      } else if (typeof token !== "undefined") {
        session.token = token;
      }
      return session;
    },
  },
  // site: process.env.NEXTAUTH_URL,
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
      async authorize(userData) {
        console.log('userData',userData)
        try {
          return userData;
        } catch (error) {
          throw new Error(error);
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
