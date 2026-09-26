import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import {
  createChat,
  getChatsByUser,
} from "@/models/chatModel";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const chats = await getChatsByUser(session.user.id);

  return Response.json({
    success: true,
    chats,
  });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json().catch(() => ({}));

  const model = body.model || "EchoGPT";

  const chat = await createChat(
    session.user.id,
    "New Chat",
    model
  );

  return Response.json(
    {
      success: true,
      chat,
    },
    { status: 201 }
  );
}