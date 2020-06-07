
export const destructQuery = (query) => {
    const queryObj = {
    }
    query = query.replace("?","");
    const params = query.split('&');
    params.forEach((param)=>{
        const val = param.split('=');
        queryObj[val[0]] = val[1];
    })
    // console.log(queryObj)
    return queryObj;
}

export const pageURL = (baseURL,prevQuery,nextQuery) => {
    // console.log("prevQuery",prevQuery)
    // console.log("nextQuery",nextQuery)
    const result =  baseURL+buildQuery({
        ...prevQuery,
        ...nextQuery
    })
    // console.log(result)
    return result;
}

export const buildQuery = (obj) => {
    const keys = Object.keys(obj)
    return keys.reduce((acc,key) => {
        if(acc.length > 1)
            acc = `${acc}&`
        return `${acc}${key}=${obj[key]}`
    },'?')
}

