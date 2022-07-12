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

  export const getAllCategory=  async()=>{
    return getDocs(collection(db, 'category'));

  }
  export const getCategory = ()=>{

  }

  export const deleteCategory = ()=>{

}

export const addCategory = async (name,status)=>{
    return await addDoc(collection(db,'category'),{
        name:name,
        status:status
    })
    .then((data)=>{
        return {sucess:'success'}
    })
    .catch((err)=>{
        console.log(err,'Add Category Error Service file')

    })

}
  
