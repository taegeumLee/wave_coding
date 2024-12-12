"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { login } from "./action";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useFormState(login, null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, password);
  };
  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <span className="text-4xl font-bold">로그인</span>
        <input
          className="bg-neutral-100 p-1 outline-none ring-0 border-b-4 border-blue-500"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
        <input
          className="bg-neutral-100 p-1 outline-none ring-0 border-b-4 border-blue-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
