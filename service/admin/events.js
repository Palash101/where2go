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
    orderBy,
  } from "firebase/firestore";
import { async } from "@firebase/util";
import { CellphoneSound } from "mdi-material-ui";




export const addEevent = async (
    name,
    country,
    currency,
    event_type,
    category
    )=>{
    return await addDoc(collection(db,'events'),{
        event_name:name,
        country:country,
        currency:currency,
        event_type:event_type,
        category:category,
        status:'draft'
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

export const uploadEventImage = async(eventId,image,type)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        [`images.${type}`]:image
      })
}

export const updateEventDate = async (eventId,data)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        event_date:arrayUnion(...data)
      })
}
export const deleteEventDate = async (eventId,data)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        event_date:arrayRemove(data)
      })
}


export const updateEventTicket = async (eventId,data)=>{
    console.log(data)
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        tickets:arrayUnion(data)
      })

}

export const deleteEventTicket = async (eventId,data)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        tickets:arrayRemove(data)
      })
}


export const updateEventData = async (eventId,data)=>{
    try{
        const docRef = doc(db, "events", eventId);
        return await updateDoc(docRef, {
            event_name:data.name,
            country:data.country,
            currency:data.currency,
            event_type:data.type,
            category:data.category
            
          }).then((res)=>console.log(res))

    }
    catch(error){
        return{error:'error',message:'Something went wrong',devmsg:error}
    }
    

}

export const getFilterEvent = async(cat) =>{
    console.log(cat)
    try{
        return getDocs(collection(db, 'events'),  where("category", "==", cat));
    }
    catch(error){
        return{error:'error',message:'Something went wrong',devmsg:error}
    }
}

export const getCategory = async ()=>{
    try{
        const q = query(collection(db, "category"), where("status", "==", '1'));
        var dt = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        dt.push(doc.data());
        });
        return dt;
    }
    catch(error){
        return{error:'error',message:'Something went wrong',devmsg:error}
    }
    
}
export const getHomePageEvent = async ()=>{
    const temp = []
    const q = query(collection(db, "category"), where("status", "==", '1'))
    const queryDoc =  await getDocs(q);
   console.log(queryDoc);
 if(queryDoc.empty === false){
        await Promise.all(queryDoc.docs.map(async (doc) => {
            console.log(doc.data())
            const catName =  doc.data().name;
            const q = query(collection(db, "events"), where("category", "==", catName))
            const d = await getDocs(q).then((doc)=>{
                console.log('event doc',doc.empty)
                const tempData = []
                    doc.forEach((data)=>{
                        if(doc.size > 0){
                            tempData.push({
                                ...data.data(),
                                id:data.id
                            })
                        }
                    }) 
                return tempData
            })
            if(d.length > 0){
                        temp.push({key:catName,data:d})
                    }
          }));
    
        return temp
    }
}