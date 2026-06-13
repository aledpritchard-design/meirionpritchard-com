import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Sanity webhook fires this route to purge cached content on publish.
// The same secret must be set in manage.sanity.io > API > Webhooks.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (secret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: { _type?: string } = {};
  try {
    body = await req.json();
  } catch {
    // Proceed without body — revalidate all known tags
  }

  const tag = body._type ?? null;
  if (tag === "workProject" || tag === null) revalidateTag("workProject", "default");
  if (tag === "siteSettings" || tag === null) revalidateTag("siteSettings", "default");

  return NextResponse.json({ revalidated: true, tag });
}
