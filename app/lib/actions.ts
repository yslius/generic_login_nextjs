"use server";

import { signIn } from "@/app/lib/auth";
import { AuthError } from "next-auth";

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
): Promise<string | null> {
  try {
    const formObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    const result = await signIn("credentials", {
      redirect: false,
      ...formObject,
    });

    // signInが成功した場合、resultはnullまたはundefinedを返す
    // エラーの場合、result.errorが設定される
    if (result?.error) {
      return "メールアドレスまたはパスワードが正しくありません。";
    }

    return null; // 成功時はnullを返す
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "メールアドレスまたはパスワードが正しくありません。";
        default:
          return "ログインに失敗しました。もう一度お試しください。";
      }
    }
    throw error;
  }
}
