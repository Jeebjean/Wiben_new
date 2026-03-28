import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  event_id: z.string(),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  is_paid: z.boolean(),
  amount: z.number().min(0).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    if (data.is_paid && data.amount && data.amount > 0) {
      // In production: create Stripe checkout for paid / open-price events
      // const session = await stripe.checkout.sessions.create({ ... });
      // return NextResponse.json({ checkoutUrl: session.url });
    }

    // In production: save registration and send confirmation email
    console.log("Event registration:", data);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
