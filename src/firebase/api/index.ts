import { FirestoreError } from "firebase/firestore"

export const createErrorResponse = (err: FirestoreError): FirestoreError => {
  const message = err?.message
  return {
    ...err,
    message,
  }
}
