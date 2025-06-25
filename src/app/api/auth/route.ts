import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
