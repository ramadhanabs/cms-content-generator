import React, { useEffect, useMemo, useState } from "react"
import db from "@/firebase/firebaseInit"
import ContainerDesktop from "@/components/elements/Container/ContainerDesktop"
import Link from "next/link"
import Button from "@/components/elements/Button"
import { useRouter } from "next/router"
import IconButton from "@/components/elements/IconButton"
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import MetaData from "@/components/elements/MetaData"
import { useGetBlockList, useDeleteBlocks } from "@/hooks/useBlocks"
import { toast } from "react-hot-toast"

const BlocksPage = () => {
  const router = useRouter()

  const blockListQuery = useGetBlockList()
  const deleteBlocksMutation = useDeleteBlocks()

  const list = useMemo(() => {
    if (!blockListQuery.data) return []
    return blockListQuery.data
  }, [blockListQuery])

  const handleDelete = (id: string) => {
    deleteBlocksMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Berhasil menghapus data")
        blockListQuery.refetch()
      },
      onError: () => {
        toast.error("Gagal menghapus data")
      },
    })
  }

  return (
    <>
      <MetaData title="Block List" />
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
              {list.length > 0 ? (
                list?.map((item, index) => (
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
                    <td className="px-6 py-4 flex items-center">
                      <Link href={`/free-code/edit/${item.id}`}>
                        <IconButton icon={<PencilSquareIcon className="w-5 h-5" />} ariaLabel="" />
                      </Link>
                      <Link href={`/preview/${item.id}`} target="_blank" >
                        <IconButton icon={<EyeIcon className="w-5 h-5" />} ariaLabel="" />
                      </Link>
                      <IconButton
                        icon={<TrashIcon className="w-5 h-5" />}
                        ariaLabel=""
                        onClick={() => handleDelete(item.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    <p>No Data</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ContainerDesktop>
    </>
  )
}

export default BlocksPage
