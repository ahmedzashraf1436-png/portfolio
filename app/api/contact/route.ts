import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: `New message from ${name}`,
        from_name: name,
        email,
        message,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json({ error: data.message ?? 'Failed to send' }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: 'Failed to reach mail service' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
