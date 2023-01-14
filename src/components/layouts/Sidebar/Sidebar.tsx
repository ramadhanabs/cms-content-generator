import { ReactElement, PropsWithChildren, useState } from "react"
import { CubeIcon, FilmIcon } from "@heroicons/react/24/outline"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

interface MenuItem {
  identifier: string
  iconMenu?: ReactElement | null
  label?: string
  onClick?: () => void
}

interface MenuChildren {
  identifier: string
  name: string
  list: Array<{
    identifier: string
    name: string
    content: string
  }>
}

const MenuItem = (props: PropsWithChildren<MenuItem>) => {
  const { identifier, iconMenu, label, onClick, ...others } = props

  const [menu, setMenu] = useState<MenuChildren[] | []>([])

  return (
    <button
      className="w-full flex items-center justify-between p-2 text-base font-normal text-slate-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      onClick={onClick}
      {...others}
    >
      <div className="flex items-center">
        <span className="w-5 h-5">{iconMenu}</span>
        <span className="ml-3 font-bold">{label}</span>
      </div>

      <span className="w-5 h-5 opacity-0 group-hover:opacity-100 transition ease-in-out">
        <ChevronRightIcon />
      </span>
    </button>
  )
}

const Sidebar = () => {
  return (
    <aside
      className="w-64 fixed bg-white left-[20px] shadow-smooth rounded-lg"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
        <Link href="/blocks" className="my-3">
          <MenuItem label="Blocks" iconMenu={<CubeIcon />} identifier="blocks" />
        </Link>
        <Link href="/free-code" className="my-3">
          <MenuItem label="Free Code" iconMenu={<CubeIcon />} identifier="freeCode" />
        </Link>
        <Link href="/template" className="my-3">
          <MenuItem label="Template" iconMenu={<FilmIcon />} identifier="template" />
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
