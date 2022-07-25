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
import { EmailNewsletter } from "mdi-material-ui";

  export const getAllCategory=  async()=>{
    return getDocs(collection(db, 'category'));

  }
  export const getCategory = ()=>{

  }

  export const deleteCategory = ()=>{

}

export const addCategory = async (name,status)=>{

  let q = query(
    collection(db, 'category'),
    where("name", "==", name)
  );
  const querySnapshot = await getDocs(q);
  if(querySnapshot.empty){
        return addDoc(collection(db,'category'),{
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

  // console.log(querySnapshot)
  // return querySnapshot.forEach((doc) => {

  //   //Use this console log For checking returend data
  //   console.log(doc.id, ' => ', doc.data());

  //   if(doc.id){
  //     console.log(doc.id,'exists')
  //     return{error:'error',message:'Category already Exist'}
      
  //   }
  //   else{
  //     console.log('adding')
  //     return  addDoc(collection(db,'category'),{
  //       name:name,
  //       status:status
  //      })
  //     .then((data)=>{
  //       collection.log(data)
  //         return {sucess:'success',msg:'Category Added successfully'}
  //     })
  //     .catch((err)=>{
  //       return{error:'error',message:'Something went wrong',devmsg:err}
  //     })
    
  //   }

    
//});
  
  
