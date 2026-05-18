import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (!process.env.WEB3FORMS_KEY) {
    return NextResponse.json({ error: 'Mail service not configured' }, { status: 500 });
  }

  let res: Response;
  try {
    res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: `New message from ${name}`,
        name,
        email,
        message,
      }),
    });
  } catch {
    return NextResponse.json({ error: 'Could not reach mail service — try again later' }, { status: 502 });
  }

  let data: { success: boolean; message?: string };
  try {
    data = await res.json();
  } catch {
    return NextResponse.json({ error: 'Unexpected response from mail service' }, { status: 502 });
  }

  if (!data.success) {
    return NextResponse.json({ error: data.message ?? 'Failed to send' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
