// app/api/timesheets/route.ts
import { NextResponse } from 'next/server';
import { getEntries, addEntry } from '@/lib/mockData';

export async function GET() {
  const data = getEntries();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  addEntry(body);
  return NextResponse.json({ message: 'Added successfully' });
}