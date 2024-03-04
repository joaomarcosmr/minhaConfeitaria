import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, QuerySnapshot } from "firebase/firestore";


export const useDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
       const loadData = async () => {
            let q;

            if(cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {
                
                q = await query(collectionRef, 
                    orderBy('createdAt', 'desc'))

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        }))
                    );
                });

                setLoading(false)
            } catch (error) {
                
            }
       }

       loadData()
    }, [docCollection, search, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { documents, loading, error }
}