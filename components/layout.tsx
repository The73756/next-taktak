import { FC, ReactNode } from 'react'
import { Header } from '@/modules/header'
import { Sidebar } from '@/modules/sidebar'

interface ILayoutProps {
  children: ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="m-auto overflow-hidden xl:w-[1400px]">
      <Header />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:overflow-auto">
          <Sidebar />
        </div>
        <div className="videos mt-4 flex h-[88vh] flex-1 flex-col gap-10 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
