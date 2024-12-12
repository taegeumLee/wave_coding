"use client";

import { useRouter } from "next/navigation";
import { GiBigWave } from "react-icons/gi";
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

export default function Header() {
  const router = useRouter();
  return (
    <>
      <div className=" max-w-screen-2xl mx-auto flex flex-row justify-between items-center">
        <div className="flex flex-row items-center justify-center gap-8">
          <GiBigWave className="size-16 text-blue-500 p-2" />
          {categories.map((category) => (
            <span
              key={category.id}
              className="text-2xl font-bold  hover:text-blue-500 px-4 py-2 cursor-pointer"
              onClick={() => router.push(category.path)}
            >
              {category.name}
            </span>
          ))}
        </div>
        <div className="flex flex-row gap-4 rounded-md">
          {auth.map((auth) => (
            <span
              key={auth.id}
              className="text-2xl font-bold hover:text-blue-500 p-4 rounded-md cursor-pointer"
              onClick={() => router.push(auth.path)}
            >
              {auth.name}
            </span>
          ))}
        </div>
      </div>
      <div className="h-0.5 mx-auto max-w-screen-2xl bg-neutral-300" />
    </>
  );
}
