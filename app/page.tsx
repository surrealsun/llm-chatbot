'use client'

import { useChat } from '@ai-sdk/react'
import { useState } from 'react'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'

export default function Chat () {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat()
  const isLoading = status === 'streaming' || status === 'submitted'

  return (
    <main className="relative min-h-dvh overflow-hidden px-3 py-4 sm:px-6 sm:py-8">
      <div className="mx-auto flex h-[calc(100dvh-2rem)] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/85 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:h-[calc(100dvh-4rem)] dark:border-zinc-700/70 dark:bg-zinc-900/80 dark:shadow-[0_24px_70px_-30px_rgba(0,0,0,0.75)]">
        <header className="border-b border-zinc-200/80 px-5 py-4 sm:px-6 dark:border-zinc-700/70">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">Campus Copilot</p>
          <h1 className="mt-1 text-lg font-semibold text-zinc-900 sm:text-xl dark:text-zinc-100">Career Decision Simulator</h1>
          <p className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">Reality checks, trade-offs, and practical next steps.</p>
        </header>

        <MessageList messages={messages} />

        <ChatInput
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          onSubmit={e => {
            e.preventDefault()
            if (!input.trim()) return
            sendMessage({ text: input })
            setInput('')
          }}
        />
      </div>
    </main>
  )
}
