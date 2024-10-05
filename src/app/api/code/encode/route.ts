import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const res = await req.json();

  if (!res) {
    return NextResponse.json({ message: 'Parameter "r" is required' }, { status: 400 });
  }

  try {
    return NextResponse.json("encoded", { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ message: 'Error encode code', error: (error as Error).message }, { status: 500 });
  }
}
