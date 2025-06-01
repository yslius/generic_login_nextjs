import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ユーザーのシードデータ
  const hashedPasswordsUser = await Promise.all([
    bcrypt.hash('password1', 10),
    bcrypt.hash('password2', 10),
    bcrypt.hash('password3', 10),
    bcrypt.hash('password4', 10),
    bcrypt.hash('password5', 10),
  ]);

  const users = await prisma.user.createMany({
    data: [
      { email: 'user1@example.com', password: hashedPasswordsUser[0], name: '山田太郎', lineId: 'line12345', isSubscribed: true },
      { email: 'user2@example.com', password: hashedPasswordsUser[1], name: '鈴木花子', lineId: 'line67890', isSubscribed: false },
      { email: 'user3@example.com', password: hashedPasswordsUser[2], name: '佐藤二郎', lineId: null, isSubscribed: true },
      { email: 'user4@example.com', password: hashedPasswordsUser[3], name: '田中三郎', lineId: 'line24680', isSubscribed: false },
      { email: 'user5@example.com', password: hashedPasswordsUser[4], name: '高橋四郎', lineId: null, isSubscribed: true },
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