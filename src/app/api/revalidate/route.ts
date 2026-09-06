import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const querySecret = request.nextUrl.searchParams.get("secret");

  if (!secret || (token !== secret && querySecret !== secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidateTag("insights");
  revalidatePath("/insight");
  revalidatePath("/insight", "layout");
  return NextResponse.json({ ok: true });
}
