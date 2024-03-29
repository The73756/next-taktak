import Image from 'next/image'
import Link from 'next/link'
import { SearchInput, UserArea } from '@/modules/header'
import { Routes } from '@/utils/constants'

export const Header = () => {
  return (
    <div className="flex w-full items-center justify-between border-b-2 border-gray-200 py-2 px-4">
      <Link href={Routes.HOME}>
        <span className="block w-[100px] md:w-[130px]">
          <Image src="/logo.png" width={130} alt="Tak Tak logo" height={38} />
        </span>
      </Link>
      <SearchInput />
      <UserArea />
    </div>
  )
}
