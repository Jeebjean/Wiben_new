import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  amount: z.number().min(1).max(50000),
  method: z.enum(["stripe", "paypal", "zelle"]),
  message: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    if (data.method === "stripe") {
      // In production: create Stripe checkout session
      // const session = await stripe.checkout.sessions.create({ ... });
      // return NextResponse.json({ checkoutUrl: session.url });
      return NextResponse.json({ success: true });
    }

    if (data.method === "paypal") {
      // In production: return PayPal payment URL
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
