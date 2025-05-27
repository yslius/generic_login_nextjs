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

export type School = {
  id: string; // UUID
  createdAt: DateTime; // 作成日時
  updatedAt: DateTime; // 更新日時
  name: string; // 学校名
  address?: string; // オプショナルな住所
  websiteUrl?: string; // オプショナルなウェブサイトURL
  events?: Event[]; // 関連するイベントのリスト
}

export type Event = {
  id: string; // UUID
  createdAt: DateTime; // 作成日時
  updatedAt: DateTime; // 更新日時
  schoolId: string; // 関連する学校のID
  title: string; // イベントのタイトル
  description: string; // イベントの説明
  startDatetime: DateTime; // イベントの開始日時
  endDatetime: DateTime; // イベントの終了日時
  eventType: string; // イベントの種類
}

export type Alert = {
  id: string; // UUID
  createdAt: DateTime; // 作成日時
  updatedAt: DateTime; // 更新日時
  userId: string; // 関連するユーザーのID
  schoolId: string; // 関連する学校のID
  eventType: string; // イベントの種類
  alertDatetime: DateTime; // アラートの日時
}

export type FavoriteSchool = {
  id: string; // UUID
  createdAt: DateTime; // 作成日時
  userId: string; // 関連するユーザーのID
  schoolId: string; // 関連する学校のID
}

export type Payment = {
  id: string; // UUID
  createdAt: DateTime; // 作成日時
  userId: string; // 関連するユーザーのID
  message: string; // メッセージ
  isRead: boolean; // 既読状態
  notificationType: string; // 通知の種類
}

export type Notification = {
  id: string; // UUID
  createdAt: DateTime; // 作成日時
  userId: string; // 関連するユーザーのID
  message: string; // メッセージ
  isRead: boolean; // 既読状態
  notificationType: string; // 通知の種類
}

export type SchoolInfo = {
  id: string; // UUID
  createdAt: DateTime; // 作成日時
  schoolId: string; // 関連する学校のID
  infoType: string; // 情報の種類
  content: string; // 情報の内容
  sourceUrl?: string; // オプショナルなソースURL
  lastUpdated: DateTime; // 最終更新日時
}

export type Admin = {
  id: string; // UUID
  createdAt: DateTime; // 作成日時
  email: string; // ユニークなメールアドレス
  password: string; // パスワード
}

export type SearchHistory = {
  id: string; // UUID
  createdAt: DateTime; // 作成日時
  userId: string; // 関連するユーザーのID
  keyword: string; // 検索キーワード
}
