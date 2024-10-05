import { DATA_KEY } from '@/server-const';
import { decryptData } from '@/utils/cryptoUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ message: 'Parameter "code" is required' }, { status: 400 });
  }

  try {
    const decoded = decryptData(code, DATA_KEY);

    console.log(decoded);

    return NextResponse.json(decoded, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ message: 'Error decoding', error: (error as Error).message }, { status: 500 });
  }
}
