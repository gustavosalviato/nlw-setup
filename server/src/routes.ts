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

  app.patch('/habits/:id/toggle', async (req, res) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    })

    const { id } = toggleHabitParams.parse(req.params)

    let today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      })
    }

    const dayHabitAlreadyCompleted = await prisma.dayHabit.findUnique({
      where: {
        dayId_habitId: {
          dayId: day.id,
          habitId: id,
        }
      }
    })

    if (dayHabitAlreadyCompleted) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabitAlreadyCompleted.id
        }
      })
    } else {
      await prisma.dayHabit.create({
        data: {
          habitId: id,
          dayId: day.id
        }
      })
    }


  })

  app.get('/summary', async (req, res) => {
    const summary = await prisma.$queryRaw`
      SELECT
       D.id,
       D.date, 
       (
        SELECT cast(count(*) as float)
        FROM day_habits DH
        WHERE DH.dayId = D.id
       ) as completed,
       (
        SELECT cast(count(*) as float)
        FROM habit_week_days HWD
        JOIN habits H 
          ON H.id = HWD.habitId
        WHERE 
          HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
          AND H.created_at <= D.date
       ) as amount
      FROM days D
    `
    return summary
  })
}


