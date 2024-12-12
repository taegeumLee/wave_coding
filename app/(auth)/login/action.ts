"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import UpdateSession from "@/lib/session/updateSession";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};
const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "An account with this email does not exist"),
  password: z
    .string({ required_error: "password is required" })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

// prevState의 타입을 명시적으로 정의
interface LoginFormState {
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
}

export const login = async (
  prevState: LoginFormState | null,
  formData: FormData
) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    //if user is found, check password hash
    const user = await db.user.findUnique({
      where: { email: result.data.email },
      select: {
        id: true,
        password: true,
      },
    });

    await UpdateSession(parseInt(user!.id));
    redirect("/home");
  }
};
