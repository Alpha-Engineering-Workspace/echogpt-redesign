export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? "bg-gray-950 text-white"
            : "border border-gray-200 bg-white text-gray-700"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}