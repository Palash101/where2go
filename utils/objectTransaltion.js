const objectTranslation = (obj) =>{
    const localeSelected  =  localStorage.getItem('locale')
    console.log(localeSelected,obj);
    
    if(localeSelected in obj){
        return obj[localeSelected]
    }
    else{
        return Object.keys(obj)[0]
    }

}

export default objectTranslation;