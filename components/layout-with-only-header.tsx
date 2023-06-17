import { FC, ReactNode } from 'react'
import { Header } from '@/modules/header'

interface ILayoutWithOnlyHeaderProps {
  children: ReactNode
}

export const LayoutWithOnlyHeader: FC<ILayoutWithOnlyHeaderProps> = ({ children }) => {
  return (
    <div className="m-auto overflow-hidden xl:w-[1400px]">
      <Header />
      {children}
    </div>
  )
}
