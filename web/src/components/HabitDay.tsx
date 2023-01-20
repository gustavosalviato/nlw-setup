import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';

export function HabitDay() {


    return (
        <Popover.Root>
            <Popover.Trigger className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg" />

            <Popover.Portal>
                <Popover.Content className='flex flex-col min-w-[320px] p-6 bg-zinc-800 rounded-lg'>

                    <Popover.Arrow width={10} height={12} className="fill-zinc-800" />
                    <span className='font-semibold text-zinc-400'>Terça-Feira</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>17/01</span>

                    <ProgressBar />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}