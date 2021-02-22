
const getToken = ()=>{
    const cks = document.cookie.split("; ")
    for(var i=0;i<cks.length;i++){
        if (cks[i].startsWith("__token")) {
            const n = cks[i].length;
            return cks[i].substring(8, n)
        }
    }
    return null;
}

const hasAuthen = ()=>{
    const token = getToken();
    return token !== null && token.length > 64;
}
export {getToken, hasAuthen};