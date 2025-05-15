import twilio from "twilio";

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, message } = body;

    if (!to || !message) {
      return new Response(
        JSON.stringify({ error: "Missing 'to' or 'message' in request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });

    return new Response(JSON.stringify({ success: true, sid: sms.sid }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Twilio error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send SMS", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
