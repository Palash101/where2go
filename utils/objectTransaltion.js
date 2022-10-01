const objectTranslation = (obj) =>{
    console.log(obj,'bb');
    const localeSelected  =  localStorage.getItem('locale')
    console.log(localeSelected,obj);
    
    if(localeSelected in obj){
        return obj[localeSelected]
    }
    else{
        console.log(Object.keys(obj)[0],'bb');
        return Object.keys(obj)[0]
    }

}

export default objectTranslation;