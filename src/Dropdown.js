import './App.css';
import cityname from './cityname.js';
import {useState} from 'react'

const Dropdown = ({changeCity, selectChangeCity }) => {

    // const [ test , setTest ] = useState('')


    // const select = (data) =>{
    //     console.log(data)
    //     setTest(data)
    // }

    return(
        <div className="dropdown-container">
            <ul>
            {cityname.map((data,index)=>{
                return (
                    <button  onClick={changeCity} value={selectChangeCity} key={index}>  {data}   </button>
                    )
            })}
                </ul>
        </div>
    )
}

export default Dropdown