import db from "@/firebase/firebaseInit"
import { BlocksTypes } from "@/types/firebaseTypes"
import { doc, FirestoreError } from "firebase/firestore"
import { createErrorResponse } from ".."


export const getBlocksList = async () => {
  try {
    const response = await db.collection("blocks").get()
    const data = response.docs.map(item => item.data())
    return data
  } catch (error) {
    const errRes = createErrorResponse(error as FirestoreError)
    throw new Error(errRes.message)
  }
}

export const getBlocksById = async (id: string) => {
    try {
      const response = await db.collection("blocks").doc(id).get()
      if (response.exists) {
        return response.data() as BlocksTypes
      }
    } catch (error) {
      const errRes = createErrorResponse(error as FirestoreError)
      throw new Error(errRes.message)
    }
}

export const postBlocks = async (id: string, payload: BlocksTypes) => {
    try {
      const response = await db.collection("blocks").doc(id).set(payload)
      return response
    } catch (error) {
      const errRes = createErrorResponse(error as FirestoreError)
      throw new Error(errRes.message)
    }
}

export const deleteBlocks = async(id: string) => {
    try { 
      const response = await db.collection("blocks").doc(id).delete()
      return response
    } catch (error) {
      const errRes = createErrorResponse(error as FirestoreError)
      throw new Error(errRes.message)
    }
}
