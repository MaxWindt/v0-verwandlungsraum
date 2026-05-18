import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  ;(await draftMode()).disable()
  return NextResponse.redirect(new URL('/', process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'))
}
