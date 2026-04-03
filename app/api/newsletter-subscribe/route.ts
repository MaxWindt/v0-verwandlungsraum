import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const listmonkUrl = process.env.LISTMONK_URL;
  const listmonkListUuid = process.env.LISTMONK_LIST_UUID;

  if (!listmonkUrl || !listmonkListUuid) {
    return NextResponse.json(
      { error: 'Newsletter service not configured' },
      { status: 503 }
    );
  }

  let body: { name?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email } = body;

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const response = await fetch(`${listmonkUrl}/api/public/subscription`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      name: name ?? '',
      list_uuids: [listmonkListUuid],
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Newsletter subscription failed' },
      { status: response.status }
    );
  }

  return NextResponse.json({ success: true });
}
