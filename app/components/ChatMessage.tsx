import type { UIMessage } from 'ai'
import MarkdownPreview from '@uiw/react-markdown-preview'

type MessagePart = UIMessage['parts'][number]

type ToolLikePart = {
  type: string
  state?: string
  toolCallId?: string
  input?: unknown
  output?: unknown
  errorText?: string
}

function isToolPart (part: MessagePart): part is MessagePart & ToolLikePart {
  return typeof part.type === 'string' && part.type.startsWith('tool-')
}

function formatToolName (type: string): string {
  return type.replace(/^tool-/, '')
}

export default function ChatMessage ({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user'
  const textParts = message.parts.filter((part): part is Extract<MessagePart, { type: 'text' }> => part.type === 'text')
  const rawText = textParts.map(part => part.text).join('')
  const toolParts = message.parts.filter(isToolPart)

  return (
    <article className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <span className="mb-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-bold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          AI
        </span>
      )}

      <div className="max-w-[88%] space-y-2 sm:max-w-[78%]">
        {toolParts.length > 0 && (
          <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-700 dark:text-sky-300">
            Tool Activity
          </p>
        )}
        {toolParts.map((part, index) => (
          <div
            key={`${part.toolCallId ?? 'tool'}-${index}`}
            className="rounded-xl border border-sky-200 bg-sky-50/80 px-3 py-2 text-xs text-sky-900 shadow-sm dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-100"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">Tool: {formatToolName(part.type)}</span>
              <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide dark:bg-zinc-900/50">
                {part.state ?? 'called'}
              </span>
            </div>

            {typeof part.input !== 'undefined' && (
              <pre className="mt-2 overflow-x-auto rounded-md bg-white/70 p-2 text-[11px] text-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-200">
                {JSON.stringify(part.input, null, 2)}
              </pre>
            )}

            {typeof part.output !== 'undefined' && (
              <pre className="mt-2 overflow-x-auto rounded-md bg-emerald-50 p-2 text-[11px] text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                {JSON.stringify(part.output, null, 2)}
              </pre>
            )}

            {part.errorText && (
              <p className="mt-2 rounded-md bg-rose-50 px-2 py-1 text-[11px] text-rose-800 dark:bg-rose-950/50 dark:text-rose-200">
                {part.errorText}
              </p>
            )}
          </div>
        ))}

        {rawText && (
          <>
            {toolParts.length > 0 && !isUser && (
              <p className="px-1 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
                Assistant Response
              </p>
            )}
            <div
              className={[
                'rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm',
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
          </>
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
