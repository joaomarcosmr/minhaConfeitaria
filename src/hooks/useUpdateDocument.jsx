import { useEffect, useState, useReducer } from "react"
import { db } from '../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null
  }

const updateReducer = (state, action) => {
    switch(action.type){
        case 'LOADING':
            return {loading: true, error: null}
        case 'UPDATE_DOC':
            return {loading: false, error: null}
        case 'ERROR':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, initialState)

    const [cancelled, setCancelled] = useState(false)

    const checkCancelledBeforeDispatch = (action) => {
        if(!cancelled){
          dispatch(action)
        }
        
        return !cancelled
    }

    const updateDocument = async(id, data) => {
        if (!checkCancelledBeforeDispatch({ type: 'LOADING' })) {
            return;
        }

        try {
            const docRef = await doc(db, docCollection, id)
            const updatedDocument = await updateDoc(docRef, data)

            checkCancelledBeforeDispatch({
                type: 'UPDATE_DOC',
                payload: updatedDocument
            })
        } catch (error) {
            checkCancelledBeforeDispatch({
                type: 'ERROR',
                payload: error.message
            })
        }
    }

    return { updateDocument, response }
}