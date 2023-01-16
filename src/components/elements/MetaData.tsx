import React from "react"
import Head from "next/head"

interface MetaDataProps {
  title: string
  description?: string
  isUsingCDNTailwind?: boolean
}

const MetaData = (props: MetaDataProps) => {
  const { title, description, isUsingCDNTailwind = false } = props
  return (
    <Head>
      <title>{title} | CMS Content</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      {isUsingCDNTailwind && <script src="https://cdn.tailwindcss.com"></script>}
    </Head>
  )
}

export default MetaData
