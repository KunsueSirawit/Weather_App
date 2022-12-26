import './App.css';
import cityName from './cityName.js';

const Dropdown = ({changeCity, selectChangeCity }) => {

    return(
        <div className="dropdown-container">
            <ul>
            {cityName.map((data,index)=>{
                return (
                    <button  onClick={changeCity} value={selectChangeCity} key={index}>  {data}   </button>
                    )
            })}
                </ul>
        </div>
    )
}

export default Dropdown