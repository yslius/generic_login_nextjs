# school-entrance-exam001

nextjs-dashboard003をベースにschool-entrance-examを作ってみる

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

マイグレートする
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



Stripe導入してみる
https://docs.stripe.com/payments/quickstart?lang=node&client=next

npm install --save stripe @stripe/stripe-js next
npm install --save @stripe/react-stripe-js @stripe/stripe-js






