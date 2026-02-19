'use client'

import { useEffect, useRef } from 'react'
import type { UIMessage } from 'ai'
import ChatMessage from './ChatMessage'

export default function MessageList ({ messages }: { messages: UIMessage[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight
    const shouldAutoScroll = distanceFromBottom < 140

    if (shouldAutoScroll) {
      endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages])

  if (messages.length === 0) {
    return (
      <section className="flex flex-1 items-center justify-center px-5 py-8">
        <div className="w-full max-w-xl rounded-2xl border border-zinc-200/80 bg-zinc-50/80 px-6 py-10 text-center dark:border-zinc-700 dark:bg-zinc-800/60">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Start your first simulation</h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Share a decision you are facing. You will get a realistic outcome analysis and better alternatives.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="chat-scroll flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={endRef} />
      </div>
    </section>
  )
}
