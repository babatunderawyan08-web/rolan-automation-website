import { NextResponse } from "next/server";

/** Legacy path — use /api/appointment/availability */
export async function GET(request: Request) {
  const url = new URL(request.url);
  url.pathname = "/api/appointment/availability";
  return NextResponse.redirect(url, 308);
}
