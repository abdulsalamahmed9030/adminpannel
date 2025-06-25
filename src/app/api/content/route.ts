import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'content', 'imgcontent.json');

// GET content
export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}

// POST update
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const updated = {
      ...existing,
      ...body, // only override passed values (like description)
    };

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
