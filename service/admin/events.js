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

export const updateEventTicket = async (eventId,data)=>{
    console.log(data)
    const docRef = doc(db, "events", eventId);
    return await updateDoc(docRef, {
        tickets:arrayUnion(data)
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

// export const getHomePageEvent = async ()=>{
//     const q = query(collection(db, "category"), where("status", "==", '1'))
//     const queryDoc =  await getDocs(q);
//     const mydata =   queryDoc.forEach( async(doc) => {
//         const cat = doc.data().name;
//         const q = query(collection(db, "events"), where("category", "==", cat))
//         const eventCatObj ={}
//         const tempEventArray = [];
//         const eventDoc = await getDocs(q);
//         eventDoc.forEach((eventDoc)=>{
//             tempEventArray.push(eventDoc.data())
//         })
//         eventCatObj[cat] = tempEventArray
//         return eventCatObj


//     });
//     console.log(mydata)
    
// }
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
// export const getHomePageEvent = async (cat)=>{
//     try{
//         const q = query(collection(db, "events"), where("category", "==", cat));
//         var dt = [];
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//         dt.push(doc.data());
//         });
//         return dt;
//     }
//     catch(error){
//         return{error:'error',message:'Something went wrong',devmsg:error}
//     }
    
// }
export const getHomePageEvent = async ()=>{
    try{
        const q = query(collection(db, "events"));
        var dt = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
                dt.push({
                    ...doc.data(),
                    id: doc.id
                });
        });
        return dt;
    }
    catch(error){
        return{error:'error',message:'Something went wrong',devmsg:error}
    }
    
}
// export const getHomePageEvent = async (cat) =>{
//         let result = [];
//             await getDocs(
//                 query(collection(db, "events"), where("category", "==", cat))
//             ).then((res) => {
                
//                 if (res.size > 0) {
//                 let data = [];
//                 res.docs.forEach((doc) => {
//                     data.push(doc.data());
//                 });
//                 var temp = {label:data[0].category,value:data};

//                 result = temp;
//                 } else {
//                 result = [];
//                 }
//             });
//             return result;
//     };

// export const getHomePageEvent = async() =>{
    
//         const allEventsArray =[];
//         const q = query(collection(db, "category"), where("status", "==", '1'))
//         const queryDoc =  await getDocs(q);
//         return queryDoc.forEach( async(doc) => {
//             const cat = doc.data().name;
//             const q1 = query(collection(db, "events"), where("category", "==", cat))
//             const eventDoc = await getDocs(q1);
//             eventDoc.forEach((eventDoc)=>{
//                 const tempEventObject = {key:cat,data:eventDoc.data()}
//                 console.log(tempEventObject)
//                 allEventsArray.push(tempEventObject) 
//             })
//             return allEventsArray;
    
//         });
//        // return allEventsArray;


// }
// export const getHomePageEvent = () =>{
    
//     return new Promise(async (resolve, reject) => {
//         const eventCatObj ={};
//         const q = query(collection(db, "category"), where("status", "==", '1'))
//         const queryDoc =  await getDocs(q);
//         queryDoc.forEach( async(doc) => {
//             const cat = doc.data().name;
//             const q = query(collection(db, "events"), where("category", "==", cat))
//             // const eventCatObj ={}
//             const tempEventArray = [];
//             const eventDoc = await getDocs(q);
//             eventDoc.forEach((eventDoc)=>{
//                 tempEventArray.push(eventDoc.data())
//             })
//             eventCatObj[cat] = tempEventArray    
    
//         });
//         resolve(eventCatObj);
//       });


// }
