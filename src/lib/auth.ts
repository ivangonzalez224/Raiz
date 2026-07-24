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
      // Reemplaza el envío por SMTP (que NextAuth usa por defecto) por la API de Resend.
      sendVerificationRequest: async ({ identifier: email, url }) => {
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
};
