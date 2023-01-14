import React from "react"
import Head from "next/head"

interface MetaDataProps {
  title: string
  description?: string
}

const MetaData = (props: MetaDataProps) => {
  const { title, description } = props
  return (
    <Head>
      <title>{title} | CMS Content</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default MetaData
