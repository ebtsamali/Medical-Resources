import React, {useContext, useEffect, useState} from "react";
import Header from "../../Header";
import '../../../styles/pharmacys.scss'
import AllPharmacysTable from "./AllPharmacysTable";
import UserService from '../../../services/userServices'
import {buildQuery} from '../../../utils/utils'
import SearchCard from "./SearchCard";
import AllPharmacysHasSpecificMedicine from "./AllPharmacysHasSpecificMedicine";
import {AppContext} from "../../../providers/AppProvider";
import {AuthContext} from "../../../providers/auth_provider";
import PublicHeader from "../../PublicHeader";

const PharmacysPage = () => {

    const { user } = useContext(AuthContext);
    const [pharmacys, setPharmacys] = useState([])
    const [query, setQuery] = useState({page: 1})
    const [pages, setPages] = useState({})

    const setPage = (page) => {
        setQuery({...query, page})
    }

    const {setTitle} = useContext(AppContext)

    useEffect(()=>{
        setTitle('Pharmacies')
    },[])

    useEffect(() => {
        UserService.searchMedicines(buildQuery(query)).then((response) => {
            setPharmacys(response.data.pharmacys)
            setPages(response.data.pages)
        }).catch(error => {
            console.log(error.response)
        })
    }, [query])
    return (<div className="x-container-pharmacys">
        {user.type ? <Header/> : <PublicHeader/>}
        <div className="pharmacys-content">
            <SearchCard setQuery={setQuery} query={query}/>
            {!!query.q ? <AllPharmacysHasSpecificMedicine page={query.page} pages={pages} setPage={setPage}
                                                          pharmacys={pharmacys}/> :
                <AllPharmacysTable page={query.page} pages={pages} setPage={setPage} pharmacys={pharmacys}/>}
        </div>
    </div>)
}
export default PharmacysPage
