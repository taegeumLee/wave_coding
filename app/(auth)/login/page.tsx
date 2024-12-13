"use client";

import { useActionState, useState } from "react";
import { useFormState } from "react-dom";
import { login } from "./action";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useActionState(login, null);
  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-center">
      <form
        action={dispatch}
        className="flex flex-col items-center justify-center"
      >
        <span className="text-4xl font-bold">email</span>
        <input
          className="bg-neutral-100 p-1 outline-none ring-0 border-b-4 border-blue-500"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
        />
        <input
          className="bg-neutral-100 p-1 outline-none ring-0 border-b-4 border-blue-500"
          name="password"
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
