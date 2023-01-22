import * as Dialog from '@radix-ui/react-dialog';
import { Check, X } from 'phosphor-react'
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';
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
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])


  async function handleSubmit(event: FormEvent) {
    event.preventDefault()


    await api.post('/habits', {
      title,
      HabitWeekDays: weekDays
    })

    alert('Hábito criado com sucesso!')
    setTitle('')
    setWeekDays([])
  }

  function handleToogleWeekDays(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) => prevState.filter((weekDay) => weekDay !== weekDayIndex))
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex])
    }
  }


  return (
    <form
      className='w-full flex flex-col'
      onSubmit={handleSubmit}
    >
      <label htmlFor='title' className='mt-6  block leading-tight'>Qual o seu comprometimento?</label>

      <input
        placeholder='Exercícios, dormir bem, etc...'
        type="text"
        className='w-full outline-none py-3 px-6 mt-3 bg-zinc-800 border-2 border-zinc-800 rounded-lg text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:ring-offset-1 focus:ring-offset-violet-600'
        onChange={(e) => setTitle(e.target.value)}
        value={title}

      />

      <label className='text-base font-normal mt-4 block'>Qual a recorrência?</label>
      <Dialog.Close
        className='w-6 h-6 absolute top-6 right-6 text-zinc-400 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:ring-offset-1 focus:ring-offset-violet-600'
      >
        <X size={24} />
      </Dialog.Close >

      <div className='mt-3 flex flex-col gap-2 transition-colors'>
        {availableDays.map((weekDay, i) => (
          <CheckBox
            key={weekDay}
            title={weekDay}
            onCheckedChange={() => handleToogleWeekDays(i)}
            checked={weekDays.includes(i)}
          />
        ))}
      </div>

      <button
        className='flex gap-3 font-bold bg-green-600 mt-6 rounded-lg px-6 py-4 items-center justify-center transition-colors'
        type='submit'
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form >
  )
}