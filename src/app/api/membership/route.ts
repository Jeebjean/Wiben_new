import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  city: z.string().min(1).max(100),
  message: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // In production: save to Supabase and send emails via Resend
    // const supabase = await createAdminClient();
    // await supabase.from("membership_applications").insert({ ...data, status: "pending" });

    console.log("New membership application:", data);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
