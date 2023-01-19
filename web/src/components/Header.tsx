import logoImage from '../assets/logo.svg'
import { Plus } from 'phosphor-react'

export function Header (){
    return(
        <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
        <img src={logoImage} alt="Habits" />

        <button
          className='border border-violet-500 font-semibold px-6 py-4 rounded-lg flex gap-3 hover:border-violet-300'
        >
          <Plus size={20} className="text-violet-500" />
          Novo hábito

        </button>
      </div>
    )
}