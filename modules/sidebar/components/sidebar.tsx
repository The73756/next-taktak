import Link from 'next/link'
import { useState } from 'react'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { Discover, Footer, SuggestedAccounts } from '@/modules/sidebar'
import { Routes } from '@/utils/constants'

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div>
      <button
        className="m-2 ml-4 mt-3 block text-xl xl:hidden"
        onClick={() => setShowSidebar((prevState) => !prevState)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </button>
      {showSidebar && (
        <div className="mb-10 flex w-20 flex-col justify-start border-r-2 border-gray-100 p-3 xl:w-400 xl:border-0">
          <div className="border-gray-200 xl:border-b-2 xl:pb-4">
            <Link href={Routes.HOME} className="normalLink">
              <span>
                <AiFillHome className="text-xl" />
              </span>
              <span className="hidden text-xl xl:block">For You</span>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  )
}
