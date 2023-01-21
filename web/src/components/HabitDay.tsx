import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import { clsx } from 'clsx'
import * as CheckBox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react';

interface HabitDayProps {
    completed: number,
    amount: number
}

export function HabitDay({ amount, completed }: HabitDayProps) {

    const completedPercentage = Math.round((completed / amount) * 100)

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg', {
                    'bg-zinc-900 border-zinc-800': completedPercentage === 80,
                    'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
                    'bg-violet-800 border-violet-600': completedPercentage > 20 && completedPercentage < 40,
                    'bg-violet-700 border-violet-500': completedPercentage > 40 && completedPercentage < 60,
                    'bg-violet-600 border-violet-500': completedPercentage > 60 && completedPercentage < 80,
                    'bg-violet-500 border-violet-400': completedPercentage >= 80,

                })}
            />

            <Popover.Portal>
                <Popover.Content className='flex flex-col min-w-[320px] p-6 bg-zinc-800 rounded-lg'>

                    <Popover.Arrow width={10} height={12} className="fill-zinc-800" />
                    <span className='font-semibold text-zinc-400'>Terça-Feira</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>17/01</span>

                    <ProgressBar progress={completedPercentage} />

                    <div className='mt-6 flex flex-col gap-3'>
                        <CheckBox.Root
                            className='flex items-center gap-3 group outline-none border-none shadow-none group'
                        >
                            <div className='flex items-center h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg justify-center group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
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
                                Beber água
                            </span>
                        </CheckBox.Root>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}