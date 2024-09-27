"use client";

import { useChat } from "ai/react";
import { ChatInput, ChatMessages } from "./ui/chat";

export default function ChatSection() {
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
  } = useChat({ api: process.env.NEXT_PUBLIC_CHAT_API });

  return (
    <div className="space-y-4 max-w-5xl w-full pt-4 ">
      <div className="">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          reload={reload}
          stop={stop}
        />
      </div>
      <div className="p-y-4">
        <ChatInput
          input={input}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
