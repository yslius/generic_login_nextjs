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
  // ユーザーのシードデータを作成
  const hashedPasswordsAdmin = await Promise.all([
    bcrypt.hash('adminpassword1', 10),
    bcrypt.hash('adminpassword2', 10),
    bcrypt.hash('adminpassword3', 10),
    bcrypt.hash('adminpassword4', 10),
    bcrypt.hash('adminpassword5', 10),
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

  // 学校のシードデータ
  const schools = await prisma.school.createMany({
    data: [
      { name: '青山小学校', address: '東京都港区青山1-1-1', websiteUrl: 'https://www.aoyama-school.jp' },
      { name: '赤坂小学校', address: '東京都港区赤坂2-2-2', websiteUrl: 'https://www.akasaka-school.jp' },
      { name: '六本木小学校', address: '東京都港区六本木3-3-3', websiteUrl: 'https://www.roppongi-school.jp' },
      { name: '芝小学校', address: '東京都港区芝4-4-4', websiteUrl: 'https://www.shiba-school.jp' },
      { name: '麻布小学校', address: '東京都港区麻布5-5-5', websiteUrl: 'https://www.azabu-school.jp' },
    ],
  });

  // イベントのシードデータ
  const schoolsData = await prisma.school.findMany(); // 学校データを取得
  const schoolMap = new Map(schoolsData.map((school) => [school.name, school.id])); // 学校名とIDのマッピング
  const usersData = await prisma.user.findMany(); // ユーザーデータを取得
  const userMap = new Map(usersData.map((user) => [user.name, user.id])); // ユーザー名とIDのマッピング

  const events = await prisma.event.createMany({
    data: [
      {
        schoolId: schoolMap.get('青山小学校')!,
        title: '入学説明会2025',
        description: '2025年度の入学説明会です。',
        startDatetime: new Date('2025-05-01T10:00:00+09:00'),
        endDatetime: new Date('2025-05-01T12:00:00+09:00'),
        eventType: '説明会',
      },
      {
        schoolId: schoolMap.get('赤坂小学校')!,
        title: '入試説明会',
        description: '来年度の入試説明会を行います。',
        startDatetime: new Date('2025-06-01T10:00:00+09:00'),
        endDatetime: new Date('2025-06-01T11:30:00+09:00'),
        eventType: '説明会',
      },
      {
        schoolId: schoolMap.get('六本木小学校')!,
        title: '願書配布開始',
        description: '願書の配布を開始します。',
        startDatetime: new Date('2025-07-01T09:00:00+09:00'),
        endDatetime: null,
        eventType: '願書',
      },
      {
        schoolId: schoolMap.get('芝小学校')!,
        title: '願書提出締切',
        description: '願書の提出締切日です。',
        startDatetime: new Date('2025-07-31T17:00:00+09:00'),
        endDatetime: null,
        eventType: '願書',
      },
      {
        schoolId: schoolMap.get('麻布小学校')!,
        title: '入試日程',
        description: '入試の日程が決まりました。',
        startDatetime: new Date('2025-09-10T08:00:00+09:00'),
        endDatetime: new Date('2025-09-10T15:00:00+09:00'),
        eventType: '入試',
      },
    ],
  });

  const alerts = await prisma.alert.createMany({
    data: [
      {
        userId: userMap.get('山田太郎')!,
        schoolId: schoolMap.get('青山小学校')!,
        eventType: '説明会予約開始',
        alertDatetime: new Date('2025-04-25T09:00:00+09:00'),
      },
      {
        userId: userMap.get('鈴木花子')!,
        schoolId: schoolMap.get('赤坂小学校')!,
        eventType: '願書提出期限',
        alertDatetime: new Date('2025-07-25T09:00:00+09:00'),
      },
      {
        userId: userMap.get('佐藤二郎')!,
        schoolId: schoolMap.get('麻布小学校')!,
        eventType: '入試日程',
        alertDatetime: new Date('2025-09-05T09:00:00+09:00'),
      },
      {
        userId: userMap.get('田中三郎')!,
        schoolId: schoolMap.get('芝小学校')!,
        eventType: '説明会予約開始',
        alertDatetime: new Date('2025-04-26T09:00:00+09:00'),
      },
      {
        userId: userMap.get('高橋四郎')!,
        schoolId: schoolMap.get('麻布小学校')!,
        eventType: '説明会予約開始',
        alertDatetime: new Date('2025-06-20T09:00:00+09:00'),
      },
    ],
  });

  const favorite_schools = await prisma.favoriteSchool.createMany({
    data: [
      {
        userId: userMap.get('山田太郎')!,
        schoolId: schoolMap.get('青山小学校')!,
      },
      {
        userId: userMap.get('鈴木花子')!,
        schoolId: schoolMap.get('赤坂小学校')!,
      },
      {
        userId: userMap.get('佐藤二郎')!,
        schoolId: schoolMap.get('麻布小学校')!,
      },
      {
        userId: userMap.get('田中三郎')!,
        schoolId: schoolMap.get('芝小学校')!,
      },
      {
        userId: userMap.get('高橋四郎')!,
        schoolId: schoolMap.get('麻布小学校')!,
      },
    ],
  });

  const payments = await prisma.payment.createMany({
    data: [
      {
        userId: userMap.get('山田太郎')!,
        paymentDate: new Date('2025-04-01T12:00:00+09:00'),
        amount: 12000,
        paymentMethod: 'クレジットカード',
      },
      {
        userId: userMap.get('鈴木花子')!,
        paymentDate: new Date('2025-04-05T14:00:00+09:00'),
        amount: 15000,
        paymentMethod: 'クレジットカード',
      },
      {
        userId: userMap.get('佐藤二郎')!,
        paymentDate: new Date('2025-04-10T16:00:00+09:00'),
        amount: 10000,
        paymentMethod: 'クレジットカード',
      },
      {
        userId: userMap.get('田中三郎')!,
        paymentDate: new Date('2025-04-15T11:00:00+09:00'),
        amount: 20000,
        paymentMethod: 'クレジットカード',
      },
      {
        userId: userMap.get('高橋四郎')!,
        paymentDate: new Date('2025-04-20T13:30:00+09:00'),
        amount: 13000,
        paymentMethod: 'クレジットカード',
      },
    ],
  });

  const notifications = await prisma.notification.createMany({
    data: [
      {
        userId: userMap.get('山田太郎')!,
        message: '青山小学校の入学説明会の予約が開始されました。',
        isRead: false,
        notificationType: 'アラート',
      },
      {
        userId: userMap.get('鈴木花子')!,
        message: '赤坂小学校の願書提出期限が迫っています。',
        isRead: false,
        notificationType: 'アラート',
      },
      {
        userId: userMap.get('佐藤二郎')!,
        message: '六本木小学校の入試日程が決定しました。',
        isRead: false,
        notificationType: 'アラート',
      },
      {
        userId: userMap.get('田中三郎')!,
        message: '芝小学校の説明会詳細が更新されました。',
        isRead: false,
        notificationType: 'お知らせ',
      },
      {
        userId: userMap.get('高橋四郎')!,
        message: '麻布小学校の入学試験情報が公開されました。',
        isRead: false,
        notificationType: 'アラート',
      },
    ],
  });

  const school_info = await prisma.schoolInfo.createMany({
    data: [
      {
        schoolId: schoolMap.get('青山小学校')!,
        infoType: '募集要項',
        content: '2025年度の募集要項が公開されました。',
        sourceUrl: 'https://www.aoyama-school.jp/info',
        lastUpdated: new Date('2025-03-20T10:00:00+09:00'),
      },
      {
        schoolId: schoolMap.get('赤坂小学校')!,
        infoType: '入試日程',
        content: '2025年度の入試日程が決まりました。',
        sourceUrl: 'https://www.akasaka-school.jp/schedule',
        lastUpdated: new Date('2025-03-25T10:00:00+09:00'),
      },
      {
        schoolId: schoolMap.get('六本木小学校')!,
        infoType: '説明会情報',
        content: '説明会の詳細が更新されました。',
        sourceUrl: 'https://www.roppongi-school.jp/seminar',
        lastUpdated: new Date('2025-04-01T10:00:00+09:00'),
      },
      {
        schoolId: schoolMap.get('芝小学校')!,
        infoType: '募集要項',
        content: '2025年度の募集要項が公開されました。',
        sourceUrl: 'https://www.shiba-school.jp/info',
        lastUpdated: new Date('2025-03-30T10:00:00+09:00'),
      },
      {
        schoolId: schoolMap.get('麻布小学校')!,
        infoType: '入試日程',
        content: '2025年度の入試日程が決まりました。',
        sourceUrl: 'https://www.azabu-school.jp/schedule',
        lastUpdated: new Date('2025-04-05T10:00:00+09:00'),
      },
    ],
  });

  const admins = await prisma.admin.createMany({
    data: [
      { email: 'admin1@example.com', password: hashedPasswordsAdmin[0] },
      { email: 'admin2@example.com', password: hashedPasswordsAdmin[1] },
      { email: 'admin3@example.com', password: hashedPasswordsAdmin[2] },
      { email: 'admin4@example.com', password: hashedPasswordsAdmin[3] },
      { email: 'admin5@example.com', password: hashedPasswordsAdmin[4] },
    ],
  });

  const search_history = await prisma.searchHistory.createMany({
    data: [
      {
        userId: userMap.get('山田太郎')!,
        keyword: '青山小学校 説明会',
      },
      {
        userId: userMap.get('鈴木花子')!,
        keyword: '赤坂小学校 日程',
      },
      {
        userId: userMap.get('佐藤二郎')!,
        keyword: '六本木小学校 願書',
      },
      {
        userId: userMap.get('田中三郎')!,
        keyword: '芝小学校 入試',
      },
      {
        userId: userMap.get('高橋四郎')!,
        keyword: '麻布小学校 募集要項',
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