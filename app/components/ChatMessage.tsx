import type { UIMessage } from 'ai'

import MarkdownPreview from '@uiw/react-markdown-preview'

export default function ChatMessage ({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user'
  const rawText = message.parts
    .filter((p): p is Extract<typeof p, { type: 'text' }> => p.type === 'text')
    .map(p => p.text)
    .join('')
  const text = isUser ? rawText : <MarkdownPreview source={rawText} />

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-foreground text-background rounded-br-md'
            : 'bg-zinc-100 dark:bg-zinc-800 rounded-bl-md'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
