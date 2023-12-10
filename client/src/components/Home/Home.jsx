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

const dropDown = {
    textAlign:'right',
    paddingRight:'10px',
    paddingBottom:"10px",
    background:"yellow",
    // zIndex:2,
}

const dropDownList = {
    padding:'10px',
    background:"yellow",
    textAlign:'center',
    width:"fix-content",
    position:'absolute',
    zIndex:2,
    cursor:'pointer',
    right:'33%',
}

const Home = () => {

    const [user, setUser] = useState(localStorage.getItem("UserName"));
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
            var userName = "";
            if(user == null) {
                userName = prompt('Type here');
                setUser(userName);
                localStorage.setItem("UserName", userName)
            } else {
                userName = user;
            }

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
            setTotal(0);
            
            if(resp.resCode === 200) {
                const resData = resp.data.count.dayCount;
                setData(resData);
                const startDate = new Date('12/01/2023');
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
                user,formattedDate,newValue
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

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box>
            <Box style={main}> 
                <Box>Hii {user},</Box>
                <Box>
                    <Button variant="contained" onClick={() => countAdjuster(-1)}>-</Button> 
                    <span>  { counterValue } </span>
                    <Button variant="contained" onClick={() => countAdjuster(1)}>+</Button> 
                </Box>
            </Box>
            <Box style={main}>

                <Box style={table}>

                    <Box style={dropDown}> 
                    <button onClick={() => setIsOpen(!isOpen)}>January</button>
                    </Box>
                    {isOpen && (
                        <Box style={dropDownList}>
                        <p>January</p>
                        <p>February</p>
                        <p>March</p>
                        <p>April</p> 
                        
                        <p>May</p>
                        <p>June</p>
                        <p>July</p>
                        <p>August</p>
                        <p>September</p>
                        
                        <p>October</p>
                        <p>November</p>
                        <p>December</p>

                        </Box>
                    )}
                    
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