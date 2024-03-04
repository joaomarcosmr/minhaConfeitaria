import { useEffect, useState, useReducer } from "react"
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null
  }

const insertReducer = (state, action) => {
    switch(action.type){
        case 'LOADING':
            return {loading: true, error: null}
        case 'INSERTED_DOCUMENT':
            return {loading: false, error: null}
        case 'ERROR':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const useCreateProduct = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState)

    const [cancelled, setCancelled] = useState(false)

    const checkCancelledBeforeDispatch = (action) => {
        if(!cancelled){
          dispatch(action)
        }
        
        return !cancelled
    }

    const insertDocument = async(document) => {
        if (!checkCancelledBeforeDispatch({ type: 'LOADING' })) {
            return;
        }

        try {
            const newDocument = {...document, createdAt: Timestamp.now()}
            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCancelledBeforeDispatch({
                type: 'INSERTED_DOCUMENT',
                payload: insertedDocument
            })
        } catch (error) {
            checkCancelledBeforeDispatch({
                type: 'ERROR',
                payload: error.message
            })
        }
    }

    return { insertDocument, response }
}