import {en} from "../translations/locales/en";
import {ar} from "../translations/locales/ar";
const Translations = (lang)=>{
    if(lang == 'en'){
        return en
    }
    else{
        return ar
    }
}

export default Translations;