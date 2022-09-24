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
          name:{
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


  export const getCategoryById = async(catId) =>{
    const docRef = doc(db, "category", catId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap, 'docSnap')
    if (docSnap.exists()) {
      console.log(docSnap,'docSnap 2')
        return docSnap.data()
      } else {
        return{err:'error',message:'Document not found'}
      }

  }


  export const updateCategoryData = async (catId,data)=>{
    const {status, lang} = data;
    console.log(catId,data);
    try{
        const docRef = doc(db, "category", catId);
        return await updateDoc(docRef, {
          [`name.${lang}`]:data[lang],
          
          status:status
          }).then((data)=>{
            return {success:data,message:'Category Added successfully'}
        })

    }
    catch(error){
        return{error:'error',message:'Something went wrong',devmsg:error}
    }
    
}


  
  
