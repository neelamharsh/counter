import React from "react";
import Box from '@mui/material/Box'
import { Button } from "@mui/material";
import { useState } from "react";
import TableView from "../TableView";


const main = {
    display:'flex',
    justifyContent:'space-between',
    padding:'20px 10px 0px 10px',
    background:'yellow',
}

const table = {
    paddingLeft:'10px',
    width:'70%',
    height:'92vh',
    background:'rgba(744, 740, 740, 0.4)',
}

const totalStyle = {
    paddingLeft:'20px',
    paddingTop:'20px',
    width:'30%',
    background:'black',//rgba(744, 740, 740, 0.4)
    color:'white',
};

const Home = () => {

    const userName = "Harsh";
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalDays, setTotalDays] = useState(0);
    const [datesArray, setDatesArray] = useState([]);
    const [counterValue, setCounterValue] = useState(0);
      

    React.useEffect(() => {

        const fetchData = async (e) => {
        
            var api = "";
            if(process.env.NODE_ENV === 'development') api = 'http://localhost:8000/getUserData';
            else api = '/getUserData';
            
            const res = await fetch(api, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    userName
                })
            });
    
            const resp = await res.json();
            const resData = resp.data.count.dayCount;
            setData(resData);
            setTotal(0);
            
            if(resp.resCode === 200) {
                const startDate = new Date('11/17/2023');
                const presentDate = new Date();
                const currentDate = new Date(startDate);
                let totalFrequency = 0;
                const dataArray = [];
                while (currentDate <= presentDate) {
                    const formattedDate = currentDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
                    const frequencyMeasure = resData[formattedDate] === undefined ? 0 : resData[formattedDate];
                    dataArray.push({date:formattedDate, frequency:frequencyMeasure}); // Adjust the locale and format as needed
                    currentDate.setDate(currentDate.getDate() + 1);
                    totalFrequency+=frequencyMeasure;
                }
                setTotal(totalFrequency);
                setDatesArray(dataArray);
                setTotalDays(dataArray.length);
                var todayDate = new Date();
                const formattedDate = todayDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
                setCounterValue(resData[formattedDate]);
            }
            else {
            }
        }

        fetchData();
        
      }, []);


      
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
            datesArray[datesArray.length-1].frequency = newValue;
            setDatesArray(datesArray);
            setCounterValue(newValue);
            setTotal(total+e);
        }
        else {
        }
    }

    return (
        <Box>

            <Box style={main}> 
                <Box>Hii {userName},</Box>
                <Box>
                    <Button variant="contained" onClick={() => countAdjuster(-1)}>-</Button> 
                    <span>  { counterValue } </span>
                    <Button variant="contained" onClick={() => countAdjuster(1)}>+</Button> 
                </Box>
            </Box>
            <Box style={main}>
                <Box style={table}>
                    
                    {
                        datesArray.map((d,i) => {
                            return <Box key={i}> <TableView d={d} key={i}/> </Box>
                        })
                    }

                </Box>
                <Box style={totalStyle}> 
                    <Box>{total} Times, </Box>
                    <Box>In {totalDays} Days</Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Home;