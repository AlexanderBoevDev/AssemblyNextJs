import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserPage() {
  // получаем сессию на сервере
  const session = await getServerSession(authOptions);

  // если нет сессии — перенаправляем на /login (или любую другую)
  if (!session) {
    redirect("/login");
  }

  // иначе выводим защищённый контент
  return (
    <div>
      <h1>Личный кабинет пользователя</h1>
      <p>Добро пожаловать, {session.user?.email}!</p>
    </div>
  );
}
