import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  console.log("Request body:", req.body);

  const { message } = req.body;

  if (!message) {
    console.error("Message validation failed:", req.body);
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    await pusher.trigger("my-channel", "my-event", message);

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.error("Error triggering Pusher:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
}
