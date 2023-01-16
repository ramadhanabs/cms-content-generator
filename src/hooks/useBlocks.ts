import * as BlocksAPI from "@/firebase/api/blocks"
import { BlocksTypes } from "@/types/firebaseTypes"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

interface PostBlocks {
  id: string
  payload: BlocksTypes
}

const QUERY_BLOCK_LIST = ["blocks", "list"]

export const useGetBlockList = () => {
  return useQuery(QUERY_BLOCK_LIST, () => BlocksAPI.getBlocksList())
}

export const useGetBlockById = (id: string) => {
  return useQuery(["blocks", "detail", id], () => BlocksAPI.getBlocksById(id))
}

export const usePostBlocks = () => {
  return useMutation((params: PostBlocks) => BlocksAPI.postBlocks(params.id, params.payload))
}

export const useDeleteBlocks = () => {
  return useMutation((id: string) => BlocksAPI.deleteBlocks(id))
}

export const useRefetchBlockList = () => {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries(QUERY_BLOCK_LIST, { exact: true })
}
