import ContainerDesktop from "@/components/elements/Container/ContainerDesktop"
import MetaData from "@/components/elements/MetaData"
import Editor from "@monaco-editor/react"
import React, { useEffect, useRef, useState } from "react"
import { EyeIcon } from "@heroicons/react/24/outline"
import IconButton from "@/components/elements/IconButton"
import { useRouter } from "next/router"
import Link from "next/link"
import db from "@/firebase/firebaseInit"
import { BlocksTypes } from "@/types/firebaseTypes"
import type monaco from "monaco-editor"
import Button from "@/components/elements/Button"
import { useForm } from "react-hook-form"
import { FormBlocksValues } from "@/types/commonTypes"
import { FORM_FIELD_REQUIRED } from "@/helpers/constants"
import FormInputText from "@/components/elements/Forms/FormInputText"
import { useGetBlockById } from "@/hooks/useBlocks"
import { GetServerSideProps, GetServerSidePropsContext } from "next"

const FreeCodePage = ({ stringId }: { stringId: string }) => {
  const editorRef = useRef<any>()
  const { setValue, register, handleSubmit, reset } = useForm<FormBlocksValues>({ mode: "all" })
  const [html, setHTML] = useState<string>('')
  const blocksQuery = useGetBlockById(stringId)
  const blocksData = blocksQuery.data

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    // Auto format
    setTimeout(function () {
      editor.getAction("editor.action.formatDocument").run()
    }, 300)

    editorRef.current = editor
  }

  const mapData = async () => {
    if (!blocksData) return
    setHTML(blocksData.content)
    setValue("identifier", blocksData.content_identifier)
    setValue("title", blocksData.name)
  }

  const onSubmit = async (data: FormBlocksValues) => {
    const editorValue = editorRef.current.getValue()

    const payload = {
      id: stringId,
      name: data.title,
      content_identifier: data.identifier,
      content: editorValue,
    }

    try {
      const response = await db.collection("blocks").doc(stringId).set(payload)
      console.log("%c ✨ success write data", "color: green; font-weight: bold;")
    } catch (error) {
      console.error("%c 🔥 error", "color: red; font-weight: bold;", error)
    }
  }

  const handlePreview = () => {
    const url = `/preview/${stringId}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  useEffect(() => {
    if (blocksData) {
      mapData()
    }
  }, [blocksData])

  if (blocksQuery.isLoading) return <p>Loading...</p>
  return (
    <>
      <MetaData title="Free Code" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerDesktop>
          <div className="flex justify-between">
            <div className="flex items-center">
              <IconButton
                icon={<EyeIcon className="w-6 h-6" />}
                ariaLabel=""
                onClick={handlePreview}
              />
              <h1 className="text-xl font-bold ml-2">Free Code</h1>
            </div>
            <Button className="ml-2" type="submit">
              Save
            </Button>
          </div>
          <hr className="mb-4" />
          <FormInputText
            label="Title"
            className="mb-3"
            isRequired
            placeholder="Input your title"
            {...register("title", {
              required: { value: true, message: FORM_FIELD_REQUIRED },
            })}
          />
          <FormInputText
            label="Identifier"
            className="mb-3"
            isRequired
            placeholder="Input your identifier"
            {...register("identifier", {
              required: { value: true, message: FORM_FIELD_REQUIRED },
            })}
          />

          <p className="font-bold my-3">Code Editor</p>
          <Editor
            theme="vs-dark"
            height="70vh"
            defaultLanguage="html"
            defaultValue={html}
            onMount={handleEditorDidMount}
          />
        </ContainerDesktop>
      </form>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const {
    query: { id },
  } = context
  const stringId = typeof id === "string" ? id : ""

  return {
    props: {
      stringId,
    },
  }
}

export default FreeCodePage
