import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getChatById } from "@/models/chatModel";
import ChatWorkspace from "@/features/chat/ChatWorkspace";

export default async function ChatConversationPage({ params }) {
  const session = await getServerSession(authOptions);

  const { chatId } = await params;

  const chat = await getChatById(chatId, session.user.id);

  if (!chat) {
    notFound();
  }

  return (
    <ChatWorkspace chatId={chat.id} title={chat.title} model={chat.model} />
  );
}
