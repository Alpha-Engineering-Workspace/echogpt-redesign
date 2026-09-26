import ProtectedLayout from "@/components/layout/ProtectedLayout";
import ChatShell from "@/features/chat/ChatShell";

export default function ChatLayout({ children }) {
  return (
    <ProtectedLayout>
      <ChatShell>
        {children}
      </ChatShell>
    </ProtectedLayout>
  );
}