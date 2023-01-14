import ContainerDesktop from "@/components/elements/Container/ContainerDesktop"
import MetaData from "@/components/elements/MetaData"
import Editor from "@monaco-editor/react"
import React, { useEffect } from "react"
import { EyeIcon } from "@heroicons/react/24/outline"
import IconButton from "@/components/elements/IconButton"
import { useRouter } from "next/router"
import Link from "next/link"
import db from "@/firebase/firebaseInit"

const html = `
  <p id="main">
    <span class="prettify">
      keep me and make me pretty!
    </span>
  </p>
`

const FreeCodePage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <MetaData title="Free Code" />
      <ContainerDesktop>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold mb-3">Free Code</h1>
          <Link href="/preview" rel="noopener noreferrer" target="_blank">
            <IconButton icon={<EyeIcon className="w-6 h-6" />} ariaLabel="" />
          </Link>
        </div>

        <Editor theme="vs-dark" height="70vh" defaultLanguage="html" defaultValue={html} />
      </ContainerDesktop>
    </>
  )
}

export default FreeCodePage
