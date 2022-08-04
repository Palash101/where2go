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

export const getAllUsers = async()=>{
  
    return getDocs(collection(db, 'users'),  where("role", "===", '1'));
}
