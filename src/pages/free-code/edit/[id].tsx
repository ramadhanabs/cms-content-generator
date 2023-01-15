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
  const stringId = typeof id === "string" ? id : ""

  const editorRef = useRef<any>()
  const { setValue, register, handleSubmit, reset } = useForm<FormBlocksValues>({ mode: "all" })
  const [html, setHTML] = useState<string | null>(null)

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    // Auto format
    setTimeout(function () {
      editor.getAction("editor.action.formatDocument").run()
    }, 300)

    editorRef.current = editor
  }

  const fetchData = async () => {
    const blocks = db.collection("blocks").doc(stringId)

    blocks.get().then(doc => {
      if (doc.exists) {
        const data = doc.data() as BlocksTypes
        setHTML(data.content)
        setValue("identifier", data.content_identifier)
        setValue("title", data.name)
      }
    })
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
    if (stringId) {
      fetchData()
    }
  }, [stringId])

  if (!html) return <p>Loading...</p>
  return (
    <>
      <MetaData title="Free Code" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerDesktop>
          <div className="flex justify-between">
            <div className="flex items-center">
                <IconButton icon={<EyeIcon className="w-6 h-6" />} ariaLabel="" onClick={handlePreview} />
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

export default FreeCodePage
