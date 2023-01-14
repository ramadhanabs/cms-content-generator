import Button from '@/components/elements/Button'
import ContainerDesktop from '@/components/elements/Container/ContainerDesktop'
import IconButton from '@/components/elements/IconButton'
import MetaData from '@/components/elements/MetaData'
import { EyeIcon } from '@heroicons/react/24/outline'
import Editor from '@monaco-editor/react'
import Link from 'next/link'
import React from 'react'

const defaultHTML = `
//No need to write <html></html>, just write your <div></div> here :)
`

const CreateFreeCodePage = () => {
  return (
    <>
      <MetaData title="Create Blocks" />
      <ContainerDesktop>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
          <Link href="/preview" rel="noopener noreferrer" target="_blank">
            <IconButton icon={<EyeIcon className="w-6 h-6" />} ariaLabel="" />
          </Link>
          <h1 className="text-xl font-bold ml-2">Blocks</h1>
          </div>
          <Button className="ml-2">Save</Button>
        </div>

        <Editor theme="vs-dark" height="70vh" defaultLanguage="html" />
      </ContainerDesktop>
    </>
  )
}

export default CreateFreeCodePage