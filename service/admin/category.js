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
import { async } from "@firebase/util";
import { EmailNewsletter } from "mdi-material-ui";

  export const getAllCategory=  async()=>{
    let q = query(
      collection(db, 'category'),
      // orderBy('position','asc')
    );
    const data = await getDocs(q);
    console.log(data,'cats')
    return data
    // return getDocs(collection(db, 'category'),orderBy());

  }
  export const getCategory = ()=>{

  }

  export const deleteCategory = async(docId)=>{
    await deleteDoc(doc(db, "category", docId));
}


export const addCategory = async (name,currentLanguage,status)=>{

  let q = query(
    collection(db, 'category'),
    where("name", "==", name)
  );
  const querySnapshot = await getDocs(q);
 
  if(querySnapshot.empty){
        return addDoc(collection(db,'category'),{
          name:name,
          name_tr:{
            [currentLanguage]:name
          },

          status:status,
          created_at: serverTimestamp()
        })
        .then((data)=>{
            return {success:data,message:'Category Added successfully'}
        })
        .catch((err)=>{
          return{error:err,message:'Something went wrong',devmsg:err}
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
  
  
