const objectTranslation = (obj) =>{
    console.log(obj,'bb');
    const localeSelected  =  localStorage.getItem('locale')
    console.log(localeSelected,obj);
    
    if(localeSelected in obj){
        return obj[localeSelected]
    }
    else{
        return Object.values(obj)[0]
    }

}

export default objectTranslation;