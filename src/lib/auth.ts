import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        if (process.env.NODE_ENV !== "production") {
          // Solo en desarrollo: permite copiar el link directo y evitar
          // que el pre-escaneo de seguridad de algunos correos lo consuma.
          console.log("🔗 Magic link (copiar y pegar en el navegador):", url);
        }
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: email,
          subject: "Tu enlace para entrar a Raíz",
          html: `
            <p>Hacé clic para iniciar sesión en Raíz:</p>
            <p><a href="${url}">${url}</a></p>
            <p>Si no lo pediste vos, ignora este correo.</p>
          `,
        });
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
      }
      return session;
    },
  },
};
