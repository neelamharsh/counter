import React from "react";
import Box from '@mui/material/Box'
import { useState } from "react";
import TableView from "../Utils/TableView";
import Header from "../Header/Header";
import Dropdown from "../Utils/Dropdown";
import RightSidePanel from "../Utils/RightSidePanel";

const mainTop = {
    height:'100%',
    background:'yellow',
    minHeight:'100vh',
}

const main = {
    display:'flex',
    justifyContent:'space-between',
    padding:'20px 10px 0px 10px',
}

const table = {
    paddingLeft:'10px',
    width:'70%',
    background:'rgba(744, 740, 740, 0.4)', 
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
                while (currentDate < presentDate) {
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


      console.log(counterValue);
    

    return (
        <Box style={mainTop}>

            <Header userName={user} todayCount={counterValue}/>
            
            <Box style={main}>
                <Box style={table}>
                <Dropdown />
                {
                    datesArray.map((d,i) => {
                        return <Box key={i}> <TableView d={d} key={i}/> </Box>
                    })
                }
                </Box>
                <RightSidePanel total={total} totalDays={totalDays}/>
            </Box>
        </Box>
    )
}

export default Home;