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


export const getAllFloorPLan = async()=>{
    return getDocs(collection(db, 'floorPlans'));
}

export const createFloorPlan =  async (name,data) =>{
    return addDoc(collection(db,'floorPlans'),{
              name:name,
              plan:data,
            })
            .then((data)=>{
                return {success:'success',message:'Floor Plan Added successfully'}
            })
            .catch((err)=>{
                console.log(err)
            })
}

export const getFloorPlanById = async (docId) =>{
    const docRef = doc(db, "floorPlans", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
      } else {
        return{err:'error',message:'Document not found'}
      }
}
