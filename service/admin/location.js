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


export const getAllLocations = async()=>{
    return getDocs(collection(db, 'locations'));
}

export const addLocation = async (name,currentLanguage,status)=>{
    let q = query(
        collection(db, 'locations'),
        where("name", "==", name)
      );
      const querySnapshot = await getDocs(q);
      if(querySnapshot.empty){
            return addDoc(collection(db,'locations'),{
              name:name,
              status:status,
              name_tr:{
                [currentLanguage]:name
              },
            })
            .then((data)=>{
                return {success:'success',message:'Location Added successfully'}
            })
            .catch((err)=>{
              return{error:'error',message:'Something went wrong',devmsg:err}
            })
          
          }
      else{
        console.log('location already exist')
        return{error:'error',message:'Something went wrong'}
      }
    

}

export const deleteLocation = async(docId)=>{
  await deleteDoc(doc(db, "locations", docId));
}


export const getLocationById =  async(docId)=>{
   const docRef = doc(db, "locations", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
      } else {
        return{err:'error',message:'Document not found'}
      }
}


export const updateLocation =  async (docId,data)=>{
  const {status, lang} = data;

    try{
        const docRef = doc(db, "locations", docId);
        return await updateDoc(docRef, {
          [`name_tr.${lang}`]:data[lang],
          status:status
          })

    }
    catch(error){
        return{error:'error',message:'Something went wrong',devmsg:error}
    }
}
