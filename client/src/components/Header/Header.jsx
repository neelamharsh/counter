import React, { useState } from "react";
import Box from '@mui/material/Box'
import { Button } from "@mui/material";

const main = {
    display:'flex',
    justifyContent:'space-between',
    padding:'20px 10px 0px 10px',
}

const Header = ({userName, todayCount}) => {

    //const [user, setUser] = useState(localStorage.getItem("UserName"));
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalDays, setTotalDays] = useState(0);
    const [datesArray, setDatesArray] = useState([]);
    const [counterValue, setCounterValue] = useState(todayCount);
      

    React.useEffect(() => {
        setCounterValue(todayCount);
    }, [todayCount]);

    const countAdjuster = async (e) => {
        
        let newValue = counterValue+e;

        var api = "";
        var currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
        data[formattedDate] = newValue;

        if(process.env.NODE_ENV === 'development') api = 'http://localhost:8000/countAdjuster';
        else api = '/countAdjuster';
        
        const res = await fetch(api, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName,formattedDate,newValue
            })
        });

        const resp = await res.json();
        console.log(resp);
        if(resp.resCode === '200') {
            // datesArray[datesArray.length-1].frequency = newValue;
            // setDatesArray(datesArray);
            setCounterValue(newValue);
            //setTotal(total+e);
        }
        else {
        }
    }

    return (
        <Box style={main}> 
            <Box>Hii {userName},</Box>
            <Box>
                <Button variant="contained" onClick={() => countAdjuster(-1)}>-</Button> 
                <span>  { counterValue } </span>
                <Button variant="contained" onClick={() => countAdjuster(1)}>+</Button> 
            </Box>
        </Box>
    )
}

export default Header;