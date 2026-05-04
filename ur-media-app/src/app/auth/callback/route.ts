import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      {
        step: "missing_code",
        message: "No code was found in the callback URL.",
        callbackUrl: request.url,
      },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.json(
      {
        step: "exchange_code_for_session",
        message: exchangeError.message,
        error: exchangeError,
      },
      { status: 500 }
    );
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return NextResponse.json(
      {
        step: "get_user_after_login",
        message: userError?.message ?? "No user returned after login.",
        error: userError,
      },
      { status: 500 }
    );
  }

  const username = userData.user.email?.split("@")[0] ?? null;

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: userData.user.id,
      username,
    },
    {
      onConflict: "id",
      ignoreDuplicates: true,
    }
  );

  if (profileError) {
    return NextResponse.json(
      {
        step: "profile_upsert",
        userId: userData.user.id,
        email: userData.user.email,
        usernameAttempted: username,
        message: profileError.message,
        code: profileError.code,
        details: profileError.details,
        hint: profileError.hint,
        fullError: profileError,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      step: "success",
      message: "User session was created and profile upsert worked.",
      userId: userData.user.id,
      email: userData.user.email,
      usernameAttempted: username,
    },
    { status: 200 }
  );

  // return NextResponse.redirect(new URL("/", request.url)); // put this back later on 
}