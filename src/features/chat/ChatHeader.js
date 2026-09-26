import ModelSelector from "@/features/chat/ModelSelector";

export default function ChatHeader({
  title = "New conversation",
  selectedModel,
  onModelChange,
}) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 pl-16 pr-4 md:px-6">
      <div className="min-w-0">
        <h1 className="truncate text-sm font-semibold text-gray-950">
          {title}
        </h1>

        <p className="hidden text-xs text-gray-500 sm:block">
          Ask anything with EchoGPT
        </p>
      </div>

      <ModelSelector
        selectedModel={selectedModel}
        onModelChange={onModelChange}
      />
    </header>
  );
}