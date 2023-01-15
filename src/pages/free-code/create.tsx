import Button from "@/components/elements/Button"
import ContainerDesktop from "@/components/elements/Container/ContainerDesktop"
import IconButton from "@/components/elements/IconButton"
import MetaData from "@/components/elements/MetaData"
import { EyeIcon } from "@heroicons/react/24/outline"
import Editor from "@monaco-editor/react"
import React, { useRef } from "react"
import FormInputText from "@/components/elements/Forms/FormInputText"
import { useForm } from "react-hook-form"
import { FORM_FIELD_REQUIRED } from "@/helpers/constants"
import { v4 as uuidv4 } from "uuid"
import db from "@/firebase/firebaseInit"
import type monaco from "monaco-editor"
import { FormBlocksValues } from "@/types/commonTypes"

const defaultHTML = `<!-- No need to write <html></html>, just write your <div></div> here :) -->`

const CreateFreeCodePage = () => {
  const editorRef = useRef<any>()
  const { register, handleSubmit, reset } = useForm<FormBlocksValues>({ mode: "all" })

  const onSubmit = async (data: FormBlocksValues) => {
    const editorValue = editorRef.current.getValue()
    const id = uuidv4()
    const payload = {
      id,
      name: data.title,
      content_identifier: data.identifier,
      content: editorValue,
    }

    try {
      const response = await db.collection("blocks").doc(id).set(payload)
      console.log("%c ✨ success write data", "color: green; font-weight: bold;")
    } catch (error) {
      console.error("%c 🔥 error", "color: red; font-weight: bold;", error)
    }
  }

  const handlePreview = () => {
    alert("Yakin ingin menyimpan?")
  }

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }

  return (
    <>
      <MetaData title="Create Blocks" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerDesktop>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <IconButton
                onClick={handlePreview}
                icon={<EyeIcon className="w-6 h-6" />}
                ariaLabel=""
              />
              <h1 className="text-xl font-bold ml-2">Blocks</h1>
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
            onMount={handleEditorDidMount}
            theme="vs-dark"
            height="70vh"
            defaultLanguage="html"
            defaultValue={defaultHTML}
          />
        </ContainerDesktop>
      </form>
    </>
  )
}

export default CreateFreeCodePage
