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
    serverTimestamp
  } from "firebase/firestore";
import { async } from "@firebase/util";
import { CellphoneSound } from "mdi-material-ui";




export const addEevent = async (
    name,
    country,
    currency,
    event_type,
    category,
    locale,
    floor_type
    )=>{
    return await addDoc(collection(db,'events'),{
        event_name:{
            [locale]:name
        },
        country:country,
        currency:currency,
        event_type:event_type,
        cat_id:category,
        status:'draft',
        floor_type:floor_type,
        created_at:serverTimestamp()
    })
    .then((data)=>{
        //console.log(data.id,'docid  ')
        return {docId:data.id,sucess:'success'}
    })
    .catch((err)=>{
        console.log(err,'Add Category Error Service file')

    })

}

export const getBrowseEvents = async()=>{
    const q = query(collection(db, 'events'), where("status","==","published"));
    var dt = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
            dt.push({
                ...doc.data(),
                id:doc.id
            })
        
    });
    return dt;
}
export const getAllEvents = async()=>{
    return getDocs(collection(db, 'events'));
}


export const getEventById = async(eventId)=>{
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {id:docSnap.id,...docSnap.data()}
      } else {
        return{err:'error',message:'Document not found'}
      }
}

export const getEventBooking = async(eventId,date) =>{
    try{
        const q = query(collection(db, "booking"), where("eventId", "==", eventId),where("date", "==", date));
        var dt = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            var dt1 = doc.data();
            dt1.tickets.forEach((item) => {
                dt.push(item);
            })
        });
        return dt;
    }
    catch(error){
        return{error:'error',message:'Something went wrong',devmsg:error}
    }
} 

export const updateEventDetails = async(eventId,data,objKey,lang)=>{
    const docRef = doc(db, "events", eventId);
    if(lang){
        return await updateDoc(docRef, {
            [`${objKey}.${lang}`]: data
          })
    }
    else{
    return await updateDoc(docRef, {
        [objKey]: data
      })
    }
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



export const updateOrganizer = async (eventId,data)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        organizer:data
      })
}

export const deleteEventDate = async (eventId,data)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        event_date:arrayRemove(data)
      })
}


export const updateEventTicket = async (eventId,data,oldArray)=>{
    console.log(oldArray,'oldArray',data,'newArray')
    const docRef = doc(db, "events", eventId);


    if(oldArray && oldArray.length != 0){
           await updateDoc(docRef, {
         tickets:arrayUnion(data),
        });
        return  await updateDoc(docRef, {
         tickets:arrayRemove(oldArray)
          });
        
    }else{
        return await updateDoc(docRef, {
        tickets:arrayUnion(data)
      })
    }
   
    

}

export const updateFloorPlan = async (eventId,data)=>{
    console.log(eventId,'eventid')
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        plan:data
      })

}

export const deleteEventTicket = async (eventId,data)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        tickets:arrayRemove(data)
      })
}


export const updateEventData = async (eventId,data,lang)=>{
    try{
        const docRef = doc(db, "events", eventId);
        return await updateDoc(docRef, {
            [`event_name.${lang}`]:data.name,
            country:data.country,
            currency:data.currency,
            event_type:data.type,
            cat_id:data.cat_id,
            floor_type:data.floor_type,
            terms:data.terms,
            
          }).then((res)=>console.log(res))

    }
    catch(error){
        console.log(error)
        return{error:'error',message:'Something went wrong',devmsg:error}
    }
    

}


export const updateEventSlot = async (eventId,data)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        slots:arrayUnion(...data)
      })
}
export const deleteEventSlot = async (eventId,data)=>{
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        slots:arrayRemove(data)
      })
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
            const catId =  doc.id;
             dt.push({...doc.data(),
             id:catId});
        });
        return dt;
    }
    catch(error){
        return{error:'error',message:'Something went wrong',devmsg:error}
    }
    
}


export const deleteEvent = async(docId)=>{
    await deleteDoc(doc(db, "events", docId));
}


export const getHomePageEvent = async ()=>{
    const temp = []
    const q = query(collection(db, "category"), where("status", "==", "1"))
    const queryDoc =  await getDocs(q);
    if(queryDoc.empty === false){
        await Promise.all(queryDoc.docs.map(async (doc) => {
            const catDocId =  doc.id;

            console.log(doc.data(),'dttt')
            const catName = doc.data().name;
            const q = query(collection(db, "events"), where("cat_id", "==", catDocId), where("status", "==", "published"))
            const d = await getDocs(q).then((doc)=>{
                console.log('event doc',doc)

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
            console.log(d,'ddd')
            if(d.length > 0){
                        temp.push({key:catDocId,catName:catName,data:d})
                    }
          }));

        console.log(temp,'event home data')
    
        return temp
    }
}