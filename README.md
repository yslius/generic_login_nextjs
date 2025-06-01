# 概要
Next.jsを用いて、汎用的に使用できる認証機能を作る


# 構造
1.NextAuth.jsを使用した認証システム
- next-authパッケージを使用して実装されています
- 主な認証機能はapp/lib/auth.tsで定義されています

2.認証の種類:
メインの認証方法はCredentials認証（メールアドレスとパスワードによる認証）
パスワードはbcryptjsを使用してハッシュ化されています

3.認証フロー:
ログインページ（/login）でユーザーが認証情報を入力
authenticate関数（app/lib/actions.ts）で認証処理を実行
認証成功時は/mypageにリダイレクト
認証失敗時はエラーメッセージを表示

4.セッション管理:
NextAuth.jsのセッション管理機能を使用
ミドルウェア（middleware.ts）で保護されたルート（/mypageなど）へのアクセス制御を実装

5.データベース:
Prismaを使用してユーザー情報を管理
usersテーブルにユーザー情報を保存
管理者用のadminsテーブルも存在

6.セキュリティ機能:
パスワードのハッシュ化
セッションベースの認証
保護されたルートへのアクセス制御

7.UI/UX:
ログインフォーム（app/ui/login-form.tsx）
ヘッダーコンポーネントでのログイン状態の表示
ログアウト機能の実装


# 使い方
必要なモジュールをインストール
pnpm i

インストールをリセットするとき
rm -rf node_modules pnpm-lock.yaml
pnpm i
リセットしたらprismaを再作成しないといけない
npx prisma generate

キャッシュもクリアするとき
pnpm store prune

動かしてみる
pnpm dev

prismaセットアップ
npx prisma generate

マイグレーションファイルの作成
npx prisma migrate dev --name init

リセットするとき
npx prisma migrate reset


シーダーを動かす
npx prisma db seed

最初はエラーになっていた
/Users/nakagawa/git/01_mine/school-entrance-exam/prisma/seed.ts:37
import { PrismaClient } from '@prisma/client';
^^^^^^

packege.jsonに以下を追加したら解決
"type": "module",

以下のエラーも発生した
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/Users/nakagawa/git/01_mine/school-entrance-exam001/node_modules/.pnpm/bcrypt@5.1.1/node_modules/bcrypt/bcrypt.js'

pnpm add bcryptjs を追加してシーダーのインポートをbcryptjsにした


上記つけたままだとサーバー動かしたときにうまく動かない
bcryptjsを取り除く
pnpm remove bcryptjs
pnpm remove bcrypt
pnpm install bcrypt



ユーザー
user1@example.com
password1



