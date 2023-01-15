import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import db from "@/firebase/firebaseInit"
import parse from "html-react-parser"
import MetaData from "@/components/elements/MetaData"
import { GetServerSideProps, GetServerSidePropsContext } from "next"

const PreviewByIdPage = ({ block }) => {
  const router = useRouter()
  const { id } = router.query
  const stringId = typeof id === "string" ? id : ""

  if (!block) return <p>Loading..</p>
  return (
    <>
      <MetaData title="Preview Blocks" />
      <div>{parse(block)}</div>
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

  const blocks = db.collection("blocks").doc(stringId)
  const res = await blocks.get()
  if (res.exists) {
    const { content } = res.data()
    return {
      props: {
        block: content,
      },
    }
  }
  return {
    props: {
      block: null,
    },
  }
}

export default PreviewByIdPage
