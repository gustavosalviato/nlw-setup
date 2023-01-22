import logoImage from '../assets/logo.svg'
import { Plus, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';
import { NewHabitModal } from './NewHabitModal';

export function Header() {
  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={logoImage} alt="Habits" />

      <Dialog.Root>
        <Dialog.Trigger className='focus:outline-none'>
          <button
            className='border border-violet-500 font-semibold px-6 py-4 rounded-lg flex gap-3 hover:border-violet-300
            transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-violet-600'
          >
            <Plus size={20} className="text-violet-500" />
            Novo hábito

          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='fixed w-screen h-screen inset-0 bg-black/60'>
            <Dialog.Content className='bg-zinc-900 absolute left-1/2 top-1/2 min-w-[400px] p-10 rounded-2xl -translate-x-[50%] -translate-y-[50%]'>

              <Dialog.Title className='font-bold text-white text-2xl leading-tight'>
                Criar hábito
              </Dialog.Title>

              <NewHabitModal />
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}