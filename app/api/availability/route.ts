import { NextResponse } from "next/server";
import { t } from "@/lib/content";
import { loadAvailability } from "@/lib/availability-repo";

export const runtime = "nodejs";

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date") ?? "";
  const staffId = url.searchParams.get("staffId") || undefined;
  const serviceIds = (url.searchParams.get("serviceIds") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  const uniqueIds = Array.from(new Set(serviceIds));

  try {
    const result = await loadAvailability({
      serviceIds: uniqueIds,
      staffId,
      date,
    });

    if (!result.ok) {
      const messages = t.api.availability;
      return errorResponse(messages[result.error.code]);
    }

    return NextResponse.json(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("DATABASE_URL")) {
      return errorResponse(t.common.error, 503);
    }
    return errorResponse(t.common.error, 500);
  }
}
