import React, { useEffect, useState } from "react"
import db from "@/firebase/firebaseInit"
import ContainerDesktop from "@/components/elements/Container/ContainerDesktop"
import Link from "next/link"
import Button from "@/components/elements/Button"
import { useRouter } from "next/router"

const BlocksPage = () => {
  const router = useRouter()
  const [list, setList] = useState<any[]>([])
  const fetchData = async () => {
    const blocks = db.collection("blocks")
    const snapshot = await blocks.get()

    const data = snapshot.docs.map(item => item.data())

    setList(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ContainerDesktop>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mb-3">Block List</h1>
        <Button onClick={() => router.push("/free-code/create")}>Create</Button>
      </div>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Identifier
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {list.length > 0 &&
              list.map((item, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={index + 1}
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.id}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.content_identifier}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/free-code/${item.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </ContainerDesktop>
  )
}

export default BlocksPage
