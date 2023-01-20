import { FastifyInstance } from 'fastify'
import { prisma } from './lib/client'
import { z } from 'zod'
import dayjs from "dayjs";
import { ParseStatus } from 'zod/lib';

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (req, res) => {
    const createHabitBody = z.object({
      title: z.string(),
      HabitWeekDays: z.array(
        z.number().min(0).max(6)
      )
    })

    const { title, HabitWeekDays } = createHabitBody.parse(req.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        HabitWeekDays: {
          create: HabitWeekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })

        }
      }
    })

  })

  app.get('/day', async (req, res) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    })

    const { date } = getDayParams.parse(req.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')
    console.log(parsedDate, weekDay)


    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        HabitWeekDays: {
          some: {
            week_day: weekDay,
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        DayHabit: true
      }
    })

    const completedHabits = day?.DayHabit.map((dayHabit) => {
      return dayHabit.habitId
    })

    return {
      possibleHabits,
      completedHabits,
    }
  })
}


