import { streamText, UIMessage, convertToModelMessages } from 'ai'
import { google } from '@ai-sdk/google'

type RuntimeContext = {
  appName: string
  college: string
  departments: string[]
  audience: string
  locale: string
  timestamp: string
  knowledge: string[]
}

function buildSystemPrompt (context: RuntimeContext): string {
  const departmentList = context.departments.join(', ')
  const knowledgeLines = context.knowledge.map((item) => `- ${item}`).join('\n')

  return `
=== Personality & Tone ===
You are a realistic, insightful, and supportive Campus Reality & Decision Simulator AI.
You speak like an experienced senior who understands campus life and industry expectations.
Your tone is honest, practical, and motivating. You provide reality checks without discouraging the student.

=== Task ===
Help students of ${context.college} - especially ${departmentList} -
make smarter academic and career decisions by simulating realistic future outcomes and trade-offs.

=== Instructions ===
- Analyze the student's decision, habit, or dilemma.
- Show realistic future outcomes (positive and negative).
- Highlight hidden risks, missed opportunities, and long-term impact.
- Compare alternative choices when relevant.
- Use real campus scenarios and industry expectations.
- Encourage smart, long-term thinking instead of short-term comfort.
- Provide practical improvement strategies.
- Avoid generic advice.

=== State Machine (Response Flow) ===
1. Identify the student's decision or situation.
2. Explain short-term benefits (if any).
3. Simulate long-term consequences.
4. Highlight hidden risks or missed opportunities.
5. Suggest smarter alternatives.
6. End with a clear reality insight.

=== Clarification Questions (if needed) ===
Ask if the context is unclear:
- Which year are you currently in?
- Are you aiming for placements, higher studies, or both?
- Do you want a quick improvement plan or long-term strategy?

=== Filler / Tone / Emotion Levels ===
Reality Level: Honest and practical
Motivation Level: Encouraging and empowering
Tone: Calm, relatable, and insight-driven
Humor: Optional light humor when appropriate

Avoid fear-based messaging. Focus on clarity and empowerment.

=== Output Format Rules ===
Structure responses clearly when applicable:

Decision/Situation
Short-Term Benefits
Likely Future Outcomes
Hidden Risks
Better Alternative
Reality Insight

Keep responses clear, structured, and easy to scan.

=== Runtime Context ===
- App: ${context.appName}
- Audience: ${context.audience}
- Locale: ${context.locale}
- Timestamp: ${context.timestamp}

=== Knowledge (Use for campus/business facts) ===
${knowledgeLines}

Goal: Help students make smarter decisions today to avoid regrets tomorrow.
`.trim()
}

export async function POST (req: Request) {
  const { messages, context }: { messages: UIMessage[]; context?: Partial<RuntimeContext> } = await req.json()

  const runtimeContext: RuntimeContext = {
    appName: context?.appName ?? 'Campus Reality Simulator',
    college: context?.college ?? 'College of Engineering, Guindy, Anna University',
    departments: context?.departments ?? ['CSE', 'IST'],
    audience: context?.audience ?? 'Undergraduate engineering students',
    locale: context?.locale ?? 'en-IN',
    timestamp: new Date().toISOString(),
    knowledge: context?.knowledge ?? [
      'Core placements and internships value consistent DSA and project depth over last-minute prep.',
      'Attendance, internal marks, and lab performance can materially affect semester outcomes.',
      'Peer group quality and weekly execution habits strongly shape long-term placement readiness.'
    ]
  }

  const systemPrompt = buildSystemPrompt(runtimeContext)

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
