import ContainerDesktop from "@/components/elements/Container/ContainerDesktop"
import MetaData from "@/components/elements/MetaData"

export default function Home() {
  return (
    <>
    <MetaData title="Home" />
      <ContainerDesktop>
        <h1 className="text-xl font-bold">Welcome :)</h1>
      </ContainerDesktop>
    </>
  )
}
