import { GiBigWave } from "react-icons/gi";
import Link from "next/link";
import getSession from "@/lib/session/session";
import db from "@/lib/db";
import { FaSignOutAlt } from "react-icons/fa";

const categories = [
  { id: 1, name: "홈", path: "/home" },
  { id: 2, name: "교재", path: "/textbook" },
  { id: 3, name: "강의실", path: "/classroom" },
  { id: 4, name: "검색", path: "/search" },
];

const auth = [
  { id: 1, name: "로그인", path: "/login" },
  { id: 2, name: "회원가입", path: "/signUp" },
];

export default async function Header() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
  });
  console.log(session);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto flex flex-row justify-between items-center">
        <div className="flex flex-row items-center justify-center gap-8">
          <GiBigWave className="size-16 text-blue-500 p-2" />
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.path}
              className="text-2xl font-bold hover:text-blue-500 px-4 py-2 cursor-pointer"
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-row gap-4 rounded-md">
          {session.id ? (
            <div className="flex flex-row gap-4 rounded-md items-center justify-center">
              <span className="text-2xl font-bold">
                {user!.name}님 안녕하세요
              </span>
              <Link
                href="/api/auth/logout"
                className="text-2xl font-bold hover:text-blue-500 p-4 rounded-md cursor-pointer"
              >
                <FaSignOutAlt className="size-8" />
              </Link>
            </div>
          ) : (
            auth.map((auth) => (
              <Link
                key={auth.id}
                href={auth.path}
                className="text-2xl font-bold hover:text-blue-500 p-4 rounded-md cursor-pointer"
              >
                {auth.name}
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="h-0.5 mx-auto max-w-screen-2xl bg-neutral-300" />
    </>
  );
}
