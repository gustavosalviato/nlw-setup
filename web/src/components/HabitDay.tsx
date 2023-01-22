import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import { clsx } from 'clsx'
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface HabitDayProps {
    date: Date
    defaultCompleted?: number,
    amount?: number
}

export function HabitDay({ amount = 0, defaultCompleted = 0, date }: HabitDayProps) {
    const [completed, setCompleted] = useState(defaultCompleted)

    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const weekOfDay = dayjs(date).format('dddd')
    const dayAndMonth = dayjs(date).format('DD/MM')

    function handleAmountCompletedChange(newCompleted: number) {
        setCompleted(newCompleted)
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors  focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-violet-600', {
                    'bg-zinc-900 border-zinc-800': completedPercentage === 0,
                    'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
                    'bg-violet-800 border-violet-600': completedPercentage > 20 && completedPercentage < 40,
                    'bg-violet-700 border-violet-500': completedPercentage > 40 && completedPercentage < 60,
                    'bg-violet-600 border-violet-500': completedPercentage > 60 && completedPercentage < 80,
                    'bg-violet-500 border-violet-400': completedPercentage >= 80,

                })}
            />

            <Popover.Portal>
                <Popover.Content className='flex flex-col min-w-[320px] p-6 bg-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500 focus:ring-offset-1 focus:ring-offset-violet-600'>

                    <Popover.Arrow width={10} height={12} className="fill-zinc-800" />
                    <span className='font-semibold text-zinc-400'>{weekOfDay}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

                    <ProgressBar progress={completedPercentage} />

                    <HabitsList
                        onChangeCompleted={handleAmountCompletedChange}
                        date={date}
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}