import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');

  if (!text) {
    return NextResponse.json({ message: 'Parameter "text" is required' }, { status: 400 });
  }

  try {
    const qrCodeDataURL = await QRCode.toDataURL(text);

    return NextResponse.json({ qrCodeDataURL }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ message: 'Error generating QR code', error: (error as Error).message }, { status: 500 });
  }
}
