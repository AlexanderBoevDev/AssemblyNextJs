import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" // Важно для middleware, т.к. будем проверять JWT
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email и пароль обязательны");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user) {
          throw new Error("Пользователь не найден");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Неверный пароль");
        }

        return {
          // приведение к строке, чтобы избежать конфликтов типов
          id: String(user.id),
          email: user.email
        };
      }
    })
  ],

  // Колбэки, чтобы сохранить данные в токене и сессии
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // тут можно добавить role, name и т.п., если нужно
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // расширьте типы через next-auth.d.ts, чтобы session.user.id не ругался
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  }
};
