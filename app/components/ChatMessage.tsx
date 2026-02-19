import type { UIMessage } from 'ai'
import MarkdownPreview from '@uiw/react-markdown-preview'

export default function ChatMessage ({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user'
  const rawText = message.parts
    .filter((part): part is Extract<typeof part, { type: 'text' }> => part.type === 'text')
    .map(part => part.text)
    .join('')

  return (
    <article className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <span className="mb-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-bold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          AI
        </span>
      )}

      <div
        className={[
          'max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[78%]',
          isUser
            ? 'rounded-br-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
            : 'rounded-bl-md border border-zinc-200/80 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'
        ].join(' ')}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{rawText}</p>
        ) : (
          <div className="chat-markdown">
            <MarkdownPreview source={rawText} style={{ backgroundColor: 'transparent', color: 'inherit' }} />
          </div>
        )}
      </div>

      {isUser && (
        <span className="mb-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
          You
        </span>
      )}
    </article>
  )
}
