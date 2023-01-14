import React, { PropsWithChildren } from "react"
import HeaderDesktop from "./Header/HeaderDesktop"
import Sidebar from "./Sidebar/Sidebar"

const DesktopAppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <HeaderDesktop />
      <div className="p-4 absolute top-[100px] w-full">
        <Sidebar />
        <div className="pl-[300px]">{children}</div>
      </div>
    </>
  )
}

export default DesktopAppLayout
