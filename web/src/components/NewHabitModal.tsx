import * as Dialog from '@radix-ui/react-dialog';
import { Check, X } from 'phosphor-react'
import { CheckBox } from './CheckBox';

const availableDays = [
  'Domingo-feira',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function NewHabitModal() {
  return (
    <form className='w-full flex flex-col '>
      <label htmlFor='title' className='mt-6  block leading-tight'>Qual o seu comprometimento?</label>

      <input
        placeholder='Exercícios, dormir bem, etc...'
        type="text"
        className='w-full outline-none py-3 px-6 mt-3 bg-zinc-800 border-2 border-zinc-800 rounded-lg text-white placeholder:text-zinc-400'
      />

      <label className='text-base font-normal mt-4 block'>Qual a recorrência?</label>
      <Dialog.Close
        className='w-6 h-6 absolute top-6 right-6 text-zinc-400'
      >
        <X size={24} />
      </Dialog.Close >

      <div className='mt-3 flex flex-col gap-2'>
        {availableDays.map((weekDay, i) => (
          <CheckBox
            title={weekDay}
          />
        ))}
      </div>

      <button className='flex gap-3 font-bold bg-green-600 mt-6 rounded-lg px-6 py-4 items-center justify-center hover:bg-green-500'>
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}