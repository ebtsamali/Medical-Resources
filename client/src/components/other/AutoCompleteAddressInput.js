import React, {useState} from "react";
import '../../styles/auto_complete_address_input.scss'
import axios from 'axios'
const AutoCompleteAddressInput = (props) => {
    const {disabled, value, setAddress, width, setPosition} = props
    const [results, setResults] = useState([])
    const onChangeAddress = (e) => {
        const {target:{value}} = e;
        if(value.trim().length === 0) {
            setResults([])
            setAddress('')
            return;
        }
        axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_URL}/locations/${value}`
        }).then((response)=>{
            console.log(response.data)
            setResults(response.data)
        })
        setAddress(e.target.value)

    }

    const onClickAddress = (index) => {
        return (e) => {
            setAddress(results[index].name)
            setPosition(results[index].point)
            setResults([])

        }
    }
    return (<div className='auto-complete-address'>
        <input className="form-input" type="text" disabled={disabled} value={value}
               placeholder="Address..."
               onChange={onChangeAddress}/>
        <div className="test">
            <div className="result-container" style={{width:width}}>
                {/*<p>AAAAA</p>*/}
                {results.map((result, index)=>{
                    return (<p key={result.name} onClick={onClickAddress(index)}>{result.name}</p>)
                })}
            </div>
        </div>

    </div>)
}

export default AutoCompleteAddressInput
