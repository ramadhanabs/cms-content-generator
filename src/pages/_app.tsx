import DesktopAppLayout from "@/components/layouts/DesktopAppLayout"
import "@/styles/globals.css"
import "flowbite"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"
import Head from "next/head"

const client = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false, refetchOnMount: false } },
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.pathname.includes("/preview")) return <Component {...pageProps} />
  return (
    <>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        <DesktopAppLayout>
          <Component {...pageProps} />
        </DesktopAppLayout>
        <Toaster />
      </QueryClientProvider>
    </>
  )
}
