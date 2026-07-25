import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        if (process.env.NODE_ENV !== "production") {
          console.log("🔗 Magic link (copiar y pegar en el navegador):", url);
        }
      },
    }),
  ],
  pages: {
    signIn: "/ingresar",
    verifyRequest: "/ingresar/revisa-tu-correo",
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
};
