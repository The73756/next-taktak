import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Routes } from '@/utils/constants'

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchValue) {
      void router.push(`${Routes.SEARCH}/${searchValue}`)
    }
  }

  return (
    <div className="relative hidden md:block">
      <form onSubmit={handleSearch} className="absolute top-10 -left-20 bg-white md:static">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[300px] rounded-full border-2 border-gray-100 bg-primary p-3 font-medium focus:border-2 focus:border-gray-300 focus:outline-none md:top-0  md:w-[350px]"
          placeholder="Search accounts and videos"
        />
        <button
          type="submit"
          className="absolute right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400 transition-colors duration-300 hover:text-gray-800 md:right-5"
        >
          <BiSearch />
        </button>
      </form>
    </div>
  )
}
