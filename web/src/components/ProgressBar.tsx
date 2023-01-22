import * as Progress from '@radix-ui/react-progress';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
    progress: number
}

export function ProgressBar(props: ProgressBarProps) {
    return (
        <Progress.Root className='relative overflow-hidden h-3 mt-3 bg-zinc-700 rounded-lg'>
            <Progress.Indicator
                className='h-full w-full bg-violet-500 rounded-lg transition-all'
                style={{ width: `${props.progress}%` }}
            />
        </Progress.Root>
    )
}