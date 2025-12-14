import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 既存データをクリア（開発環境のみ推奨）
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  // ユーザーのシードデータ
  const hashedPasswordsUser = await Promise.all([
    bcrypt.hash('password1', 10),
    bcrypt.hash('password2', 10),
    bcrypt.hash('password3', 10),
    bcrypt.hash('password4', 10),
    bcrypt.hash('password5', 10),
  ]);

  await prisma.user.createMany({
    data: [
      { 
        email: 'user1@example.com', 
        password: hashedPasswordsUser[0], 
        name: '山田太郎'
      },
      { 
        email: 'user2@example.com', 
        password: hashedPasswordsUser[1], 
        name: '鈴木花子',
      },
      { 
        email: 'user3@example.com', 
        password: hashedPasswordsUser[2], 
        name: '佐藤二郎',
      },
      { 
        email: 'user4@example.com', 
        password: hashedPasswordsUser[3], 
        name: '田中三郎'
      },
      { 
        email: 'user5@example.com', 
        password: hashedPasswordsUser[4], 
        name: '高橋四郎'
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });