import * as ChekcBoxNative from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { CheckboxProps } from '@radix-ui/react-checkbox'

interface CheckBoxProps extends CheckboxProps {
  title: string
}
export function CheckBox({ title, ...rest }: CheckBoxProps) {
  return (
    <ChekcBoxNative.Root
      {...rest}
      className='flex items-center gap-3 group outline-none border-none shadow-none group transition-colors'
    >
      <div className='flex items-center h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg justify-center group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
        <ChekcBoxNative.Indicator>
          <Check
            className='text-white'
            size={20}
            weight="bold"
          />
        </ChekcBoxNative.Indicator>
      </div>
      <span
        className='text-white text-base'
      >
        {title}
      </span>
    </ChekcBoxNative.Root>
  )
}