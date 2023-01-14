import DesktopAppLayout from "@/components/layouts/DesktopAppLayout"
import "@/styles/globals.css"
import "flowbite"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.pathname.includes("/preview")) return <Component {...pageProps} />
  return (
    <>
      <DesktopAppLayout>
        <Component {...pageProps} />
      </DesktopAppLayout>
    </>
  )
}
