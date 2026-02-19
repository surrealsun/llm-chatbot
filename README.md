# Campus Reality Simulator (Next.js + AI SDK) 
TRY NOW (https://llm-chatbot-nu.vercel.app/)

A chat application built with Next.js App Router and Vercel AI SDK, powered by Google Gemini (`gemini-2.5-flash`).

## What this project does

- Provides a conversational UI for student decision guidance.
- Streams AI responses in real time.
- Uses a structured server-side system prompt focused on campus/career trade-off simulation.
- Accepts optional runtime context per request to make responses more grounded and robust.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Vercel AI SDK (`ai`, `@ai-sdk/react`)
- Google provider (`@ai-sdk/google`)
- Tailwind CSS 4

## Project structure

- `app/page.tsx`: Main chat page using `useChat()`.
- `app/components/ChatInput.tsx`: User input + submit flow.
- `app/components/MessageList.tsx`: Renders message history.
- `app/components/ChatMessage.tsx`: Individual message rendering.
- `app/api/chat/route.ts`: Chat API route, system prompt builder, runtime context handling, model streaming.
- `app/api/chat/tools.ts`: Tool definitions (currently scaffolded/commented out).

## Prerequisites

- Node.js 18+
- npm
- Google Generative AI API key

## Environment variables

Create/update `.env.local`:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Run production server
npm run lint    # Run ESLint
```

## API behavior (`POST /api/chat`)

The route expects a JSON body shaped like:

```json
{
  "messages": [/* UIMessage[] */],
  "context": {
    "appName": "Campus Reality Simulator",
    "college": "College of Engineering, Guindy, Anna University",
    "departments": ["CSE", "IST"],
    "audience": "Undergraduate engineering students",
    "locale": "en-IN",
    "knowledge": [
      "Fact 1",
      "Fact 2"
    ]
  }
}
```

Notes:

- `context` is optional.
- Missing context fields fall back to defaults in `app/api/chat/route.ts`.
- `timestamp` is generated server-side at request time.
- Responses are streamed back using AI SDK UI message streams.

## Tool calling status

- `app/api/chat/tools.ts` currently contains a commented scaffold.
- Tool calling is not active until tools are exported and passed into `streamText(...)` in `app/api/chat/route.ts`.

## Security note

- Keep API keys in `.env.local` only.
- Do not commit real keys to Git.

## License

Private project (no license specified).
