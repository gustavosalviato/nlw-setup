import * as CheckBox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'
import { AirplaneTakeoff, Check, SelectionInverse } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface HabitsListProps {
  date: Date
  onChangeCompleted: (completed: number) => void
}

interface IHabits {
  possibleHabits: {
    created_at: string
    id: string
    title: string
  }[],
  completedHabits: string[],

}

export function HabitsList({ date, onChangeCompleted }: HabitsListProps) {

  const [habits, setHabits] = useState<IHabits>()

  useEffect(() => {
    async function getPossibleHabits() {
      try {
        const res = await api.get('/day', {
          params: {
            date: date.toISOString()
          }
        })
        setHabits(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getPossibleHabits()
  }, [])

  const dateInPast = dayjs(date).endOf('day').isBefore(new Date())

  async function handleToggleHabit(habitId: string) {

    await api.patch(`/habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted = habits?.completedHabits.includes(habitId)

    let newCompletedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      newCompletedHabits = habits!.completedHabits.filter((id) => id !== habitId)
    } else {
      newCompletedHabits = [...habits!.completedHabits, habitId]
    }

    setHabits({
      possibleHabits: habits!.possibleHabits,
      completedHabits: newCompletedHabits
    })

    onChangeCompleted(newCompletedHabits.length)
  }
  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habits?.possibleHabits.map((habit) => {
        return (
          <CheckBox.Root
            key={habit.id}
            className='flex items-center gap-3 group disabled:cursor-not-allowed focus:outline-none'
            checked={habits.completedHabits?.includes(habit.id)}
            disabled={dateInPast}
            onCheckedChange={() => handleToggleHabit(habit.id)}

          >
            <div
              className='flex items-center h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg justify-center group-data-[state=checked]:bg-green-500 goup-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-violet-600 '
            >
              <CheckBox.Indicator>
                <Check
                  className='text-white'
                  size={20}
                  weight="bold"
                />
              </CheckBox.Indicator>
            </div>
            <span
              className='text-white text-xl font-semibold leading-tight group-data-[state=checked]:text-zinc-400 group-data-[state=checked]:line-through'
            >
              {habit.title}
            </span>
          </CheckBox.Root>
        )
      })}
    </div>
  )
}