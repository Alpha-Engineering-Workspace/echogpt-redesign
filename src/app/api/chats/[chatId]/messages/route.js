import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import {
  getChatById,
  renameChat,
  updateChatActivity,
} from "@/models/chatModel";
import {
  createMessage,
  getMessagesByChat,
} from "@/models/messageModel";
import { generateResponse } from "@/services/chatService";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { chatId } = await params;

  const chat = await getChatById(
    chatId,
    session.user.id
  );

  if (!chat) {
    return Response.json(
      {
        success: false,
        message: "Chat not found",
      },
      {
        status: 404,
      }
    );
  }

  const messages = await getMessagesByChat(chatId);

  return Response.json({
    success: true,
    messages,
  });
}

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { chatId } = await params;
  const body = await request.json();

  const content = body.content?.trim();

  if (!content) {
    return Response.json(
      {
        success: false,
        message: "Message cannot be empty",
      },
      {
        status: 400,
      }
    );
  }

  const chat = await getChatById(
    chatId,
    session.user.id
  );

  if (!chat) {
    return Response.json(
      {
        success: false,
        message: "Chat not found",
      },
      {
        status: 404,
      }
    );
  }

  if (chat.title === "New Chat") {
  const newTitle =
    content.length > 40
      ? `${content.slice(0, 40)}...`
      : content;

  await renameChat(
    chatId,
    session.user.id,
    newTitle
  );
}

  const userMessage = await createMessage(
    chatId,
    "user",
    content
  );

  const assistantContent = await generateResponse(
    content,
    chat.model
  );

  const assistantMessage = await createMessage(
    chatId,
    "assistant",
    assistantContent
  );

  await updateChatActivity(
    chatId,
    session.user.id
  );

  return Response.json(
    {
      success: true,
      userMessage,
      assistantMessage,
    },
    {
      status: 201,
    }
  );
}