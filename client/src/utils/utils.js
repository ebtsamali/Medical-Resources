
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

export const getCurrentHourInSeconds = () => {
    const date = new Date();
    return date.getHours()*60*60;
}

export const getCurrentDay = () => {
    const d = new Date();
    const weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    return  weekday[d.getDay()];
}
