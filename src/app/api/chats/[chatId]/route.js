import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import {
  getChatById,
  renameChat,
  deleteChat,
  updateChatModel,
} from "@/models/chatModel";
export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { chatId } = await params;

  const chat = await getChatById(chatId, session.user.id);

  if (!chat) {
    return Response.json(
      { success: false, message: "Chat not found" },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    chat,
  });
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { chatId } = await params;
  const body = await request.json();

  if (body.model) {
    const allowedModels = [
      "EchoGPT",
      "GPT",
      "Claude",
      "Gemini",
    ];

    if (!allowedModels.includes(body.model)) {
      return Response.json(
        { success: false, message: "Invalid model" },
        { status: 400 }
      );
    }

    const chat = await updateChatModel(
      chatId,
      session.user.id,
      body.model
    );

    if (!chat) {
      return Response.json(
        { success: false, message: "Chat not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      chat,
    });
  }

  const title = body.title?.trim();

  if (!title) {
    return Response.json(
      { success: false, message: "Title is required" },
      { status: 400 }
    );
  }

  const chat = await renameChat(
    chatId,
    session.user.id,
    title
  );

  if (!chat) {
    return Response.json(
      { success: false, message: "Chat not found" },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    chat,
  });
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { chatId } = await params;

  const chat = await deleteChat(
    chatId,
    session.user.id
  );

  if (!chat) {
    return Response.json(
      { success: false, message: "Chat not found" },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    message: "Chat deleted",
  });
}