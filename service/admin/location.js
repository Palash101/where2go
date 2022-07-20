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

export const addLocation = async (name,status)=>{
    let q = query(
        collection(db, 'locations'),
        where("name", "==", name)
      );
      const querySnapshot = await getDocs(q);
      if(querySnapshot.empty){
            return addDoc(collection(db,'locations'),{
              name:name,
              status:status
            })
            .then((data)=>{
                return {success:'success',message:'Category Added successfully'}
            })
            .catch((err)=>{
              return{error:'error',message:'Something went wrong',devmsg:err}
            })
          
          }
      else{
        console.log('category already exist')
        return{error:'error',message:'Something went wrong'}
      }
    

}
