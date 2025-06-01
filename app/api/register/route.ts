import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "名前とメールアドレスとパスワードは必須です" }, { status: 400 });
  }

  // 既存ユーザー確認
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "このメールアドレスは既に登録されています" }, { status: 400 });
  }

  // パスワードハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  // ユーザー作成
  await prisma.user.create({
    data: {
      name: name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: "登録が完了しました" });
}