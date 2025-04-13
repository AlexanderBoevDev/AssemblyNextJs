"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  useEffect(() => {
    if (session?.user) {
      router.push("/user");
    }
  }, [session, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    if (res?.ok) {
      router.push("/user");
    } else {
      alert(res?.error || "Ошибка входа");
    }
  };

  return (
    <div className="container flex-grow mx-auto mt-5 mb-5 px-6 min-h-screen max-w-[1280px]">
      <section className="block text-default z-10 relative">
        <div className="mx-auto w-full max-w-md px-6 py-12 sm:max-w-lg sm:px-8">
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
            <Input
              type="email"
              label="Email"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              radius="sm"
            />
            <Input
              label="Пароль"
              placeholder="Введите ваш пароль"
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              radius="sm"
              endContent={
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="focus:outline-none"
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Button
              type="submit"
              radius="sm"
              className="
              w-full
              bg-dark-4
              hover:bg-dark-3
              text-white
              font-semibold
              text-sm
              shadow-sm
              h-14
            "
            >
              Войти
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
