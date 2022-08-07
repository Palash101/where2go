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
    serverTimestamp,
    orderBy
  } from "firebase/firestore";



class FirebaseEvent{
    constructor(collectionName){
        this.collectionName = collectionName ;
    }

    //Get All Document From Collection
    getAllDocument async(){
        let q = query(collection(db, this.collectionName ));
        const data = await getDocs(q);
        return data
    }

    // Get Single Document from Collection
    getDataByDocId async(docId){
        const docRef = doc(db, this.collectionName, docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            return{err:'error',message:'Document not found'}
        }
    }

    //Update Signle Object/Map value
    updateSingleMapValue async(docId,objKey,data,key){
        const docRef = doc(db, this.collectionName, docId);
        if(key){
            return await updateDoc(docRef, {
              [`${objKey}.${key}`]:data
              })
        }
        else{
            return await updateDoc(docRef, {
              [`${objKey}`]:data
              })
        }
         
    }


    //Update Map/object with translation
    updateMapValueTrans  async(docId,objKey,trans,data){
        const docRef = doc(db, this.collectionName, docId);
         return await updateDoc(docRef, {
          [`${objKey}.${trans}`]:data[trans]
          })
    }


    //Update Array Value
    updateArrayValue async(docId,objName){
        const docRef = doc(db, this.collectionName, docId);
        return await updateDoc(docRef, {
        [objName]:arrayUnion(...data)
      })

    }


    //Delete Doc by id
    deleteDocById async(docId){
        await deleteDoc(doc(db, this.collectionName, docId));
    }

    //Delete Array Value
    deleteArrayValue async(docId,objName){
         const docRef = doc(db, this.collectionName, docId);
        return await updateDoc(docRef, {
        [objName]:arrayRemove(data)
      })
    }

}