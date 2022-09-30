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




export const addBooking = async (allData)=>{
  return await addDoc(collection(db,'booking'),allData)
  .then((data)=>{
      console.log(data,'doc  ')
      return {docId:data.id,success:'success',msg:'Your booking has been successfull.'}
  })
  .catch((err)=>{
      console.log(err,'Add Category Error Service file')

  })
}

export const getUserById =  async(docId)=>{
    const docRef = doc(db, "users", docId);
     const docSnap = await getDoc(docRef);
     if (docSnap.exists()) {
         return docSnap.data()
       } else {
         return{err:'error',message:'Document not found'}
       }
 }


export const getUserBooking = async(uId) =>{
    
  try{
      const q = query(collection(db, "booking"), where("uId", "==", uId));
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

export const deleteUser = async(docId)=>{
  await deleteDoc(doc(db, "users", docId));
}

export const userUpdate = async (id,status)=>{
  console.log(id,status);
  
  
  try{
      const docRef = doc(db, "users", id);
      return await updateDoc(docRef, {        
        status:status
        }).then((data)=>{
          return {success:data,message:'Users status updated successfully'}
      })

  }
  catch(error){
      return{error:'error',message:'Something went wrong',devmsg:error}
  }
  
}

