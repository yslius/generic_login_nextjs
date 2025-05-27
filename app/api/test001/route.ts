import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'テストAPIです',
    timestamp: new Date().toISOString(),
    data: {
      items: [
        { id: 1, name: 'アイテム1' },
        { id: 2, name: 'アイテム2' },
        { id: 3, name: 'アイテム3' }
      ]
    }
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  return NextResponse.json({
    message: 'POSTリクエストを受け取りました',
    receivedData: body,
    timestamp: new Date().toISOString()
  });
} 