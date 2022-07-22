import firebase from "../main";
import {db} from '../main'
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    setDoc,
    getDocs,
    getDoc,
    deleteDoc,
    collectionGroup,
    query,
    arrayUnion,
    arrayRemove,
    where,
    limit,
  } from "firebase/firestore";
import { async } from "@firebase/util";




export const addEevent = async (
    name,
    country,
    currency,
    event_type,
    )=>{
    return await addDoc(collection(db,'events'),{
        event_name:name,
        country:country,
        currency:currency,
        event_type:event_type
    })
    .then((data)=>{
        //console.log(data.id,'docid  ')
        return {docId:data.id,sucess:'success'}
    })
    .catch((err)=>{
        console.log(err,'Add Category Error Service file')

    })

}


export const getAllEvents = async()=>{
    return getDocs(collection(db, 'events'));
}


export const getEventById = async(eventId)=>{
    console.log(eventId)
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
      } else {
        return{err:'error',message:'Document not found'}
      }
}

export const updateEventDetails = async(eventId,data,objKey)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        [objKey]: data
      })
}

export const uploadEventImage = async(eventId,image)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        images:arrayUnion(image)
      })
}

export const updateEventDate = async (eventId,data)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        event_date:arrayUnion(...data)
      })
}


