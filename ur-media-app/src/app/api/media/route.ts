import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { insertMedia } from "@/services/media/insertMedia";

export async function POST(req: NextRequest) {
  try {
    console.log("POST api/media");

    const payload = await req.json();
    const supabase = await createClient();

    const { data: authorizedUser, error: authorizedError } =
      await supabase.auth.getUser();

    if (!authorizedUser || authorizedError) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    console.log("Made it to insert");
    await insertMedia({
      supabase,
      payload,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.log("Error with POST: " + err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}