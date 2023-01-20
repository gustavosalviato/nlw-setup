import * as Progress from '@radix-ui/react-progress';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
    progress: number
}

export function ProgressBar(props: ProgressBarProps) {
    return (
        <Progress.Root className='relative overflow-hidden h-3 mt-3 bg-zinc-700 rounded-lg'>
            <Progress.Indicator
                className='h-full w-full bg-violet-500 rounded-lg'
                style={{ transition: 'transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1)', transform: `translateX(-${100 - props.progress}%)` }}
            />
        </Progress.Root>
    )
}