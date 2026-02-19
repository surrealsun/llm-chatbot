'use client'

import { FormEvent } from 'react'

export default function ChatInput ({
  input,
  setInput,
  onSubmit,
  isLoading
}: {
  input: string
  setInput: (v: string) => void
  onSubmit: (e: FormEvent) => void
  isLoading: boolean
}) {
  return (
    <form onSubmit={onSubmit} className="border-t border-zinc-200/80 bg-white/75 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-4 dark:border-zinc-700/70 dark:bg-zinc-900/70">
      <div className="mx-auto flex w-full items-end gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/95">
        <input
          className="min-h-11 flex-1 rounded-xl border border-transparent bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-300 focus:bg-white dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:bg-zinc-900"
          value={input}
          onChange={e => setInput(e.currentTarget.value)}
          placeholder="Ask about decisions, placements, habits..."
          autoFocus
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="h-11 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-600 dark:disabled:text-zinc-300"
        >
          {isLoading ? 'Thinking' : 'Send'}
        </button>
      </div>
    </form>
  )
}
