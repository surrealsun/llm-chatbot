import { tool } from 'ai'
import { z } from 'zod'

const weatherCatalog: Record<string, { tempC: number; condition: string }> = {
  london: { tempC: 12, condition: 'Cloudy' },
  tokyo: { tempC: 22, condition: 'Sunny' },
  'new york': { tempC: 18, condition: 'Partly cloudy' },
  chennai: { tempC: 33, condition: 'Hot and humid' },
  bangalore: { tempC: 26, condition: 'Pleasant' }
}

export const getWeather = tool({
  description: 'Get the current weather for a city.',
  inputSchema: z.object({
    city: z.string().min(2).describe('City name, for example: Chennai')
  }),
  execute: async ({ city }) => {
    const key = city.trim().toLowerCase()
    const data = weatherCatalog[key] ?? { tempC: 30, condition: 'Data unavailable' }

    return {
      city,
      temperatureC: data.tempC,
      condition: data.condition
    }
  }
})

export const buildWeeklyStudyPlan = tool({
  description: 'Generate a practical weekly study plan based on available hours and current focus.',
  inputSchema: z.object({
    year: z.string().describe('Current academic year, e.g., 2nd year'),
    goal: z.string().describe('Primary goal, e.g., placements or higher studies'),
    hoursPerWeek: z.number().int().min(1).max(80).describe('Total hours available each week'),
    focusAreas: z.array(z.string()).min(1).max(6).describe('Priority focus areas')
  }),
  execute: async ({ year, goal, hoursPerWeek, focusAreas }) => {
    const slotsPerWeek = 6
    const perSlot = Math.max(1, Math.floor(hoursPerWeek / slotsPerWeek))

    const plan = Array.from({ length: slotsPerWeek }).map((_, index) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index],
      hours: perSlot,
      focus: focusAreas[index % focusAreas.length]
    }))

    return {
      year,
      goal,
      weeklyHours: hoursPerWeek,
      recommendation: 'Keep Sunday for revision + backlog clearance.',
      plan
    }
  }
})

export const simulateCareerOutcome = tool({
  description: 'Simulate likely outcomes of a student strategy choice with practical risks and improvements.',
  inputSchema: z.object({
    strategy: z.string().describe('Student strategy being followed'),
    consistencyLevel: z.enum(['low', 'medium', 'high']).describe('How consistently the strategy is executed')
  }),
  execute: async ({ strategy, consistencyLevel }) => {
    const outcomeByLevel = {
      low: {
        shortTerm: 'Feels easy to sustain initially.',
        longTerm: 'Weak portfolio and interview depth by placement season.',
        risk: 'Last-minute prep stress and reduced confidence.'
      },
      medium: {
        shortTerm: 'Moderate progress with occasional gaps.',
        longTerm: 'Decent chances in mid-tier opportunities.',
        risk: 'Inconsistent execution during exam-heavy periods.'
      },
      high: {
        shortTerm: 'Demanding but stable growth each month.',
        longTerm: 'Strong readiness for placements/internships.',
        risk: 'Burnout if recovery time is ignored.'
      }
    }[consistencyLevel]

    return {
      strategy,
      consistencyLevel,
      ...outcomeByLevel,
      betterAlternative: 'Track weekly outputs (DSA solved, project commits, mock interviews) instead of only time spent.'
    }
  }
})

export const tools = {
  getWeather,
  buildWeeklyStudyPlan,
  simulateCareerOutcome
}
