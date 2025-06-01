// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { DateTime } from "next-auth/providers/kakao";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string; // UUID
  createdAt: DateTime; // 作成日時
  updatedAt: DateTime; // 更新日時
  email: string; // ユニークなメールアドレス
  password: string; // パスワード
  name: string; // ユーザー名
  lineId?: string; // オプショナルなLINE ID
  isSubscribed: boolean; // サブスクリプションの状態
};
