import React from "react";
import Box from '@mui/material/Box'
import { Button } from "@mui/material";
import { useState } from "react";


const main = {
    display:'flex',
    justifyContent:'space-between',
    padding:'20px 20px 0px 20px',
    background:'yellow',
}

const counter = {
    paddingLeft:'20px',
    paddingRight:'20px',
}

const table = {
    paddingLeft:'20px',
    paddingRight:'20px',
    width:'100vh',
    height:'98vh',
    background:'rgba(744, 740, 740, 0.4)',
    zIndex:1,
}

const Home = () => {

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
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
            setData(resp.data.count.dayCount);
            console.log(resp.data.count.dayCount);
            setShow(true);
            setCounterValue(resp.data.count.dayCount[Object.keys(resp.data.count.dayCount)[Object.keys(resp.data.count.dayCount).length-1]]);
            
            if(resp.status === 200) {
                //alert(resp.message);
                // setseverityMsg("success")
                // setsnackBarMsg(resp.message);
                // setOpen(true);
                // setData({...data,name:'',url:''});
            }
            else {
                // setseverityMsg("error")
                // setsnackBarMsg(resp.message);
                // setOpen(true);
            }
        }

        fetchData();
        
      }, []);


    const countAdjuster = async (e) => {
        
        let newValue = counterValue+e;
        setCounterValue(newValue);

        var api = "";
        var currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
        console.log(formattedDate);
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
        
        if(resp.status === 200) {
            //alert(resp.message);
            // setseverityMsg("success")
            // setsnackBarMsg(resp.message);
            // setOpen(true);
            // setData({...data,name:'',url:''});
        }
        else {
            // setseverityMsg("error")
            // setsnackBarMsg(resp.message);
            // setOpen(true);
        }
    }

    console.log(data, Object.keys(data).length, data[Object.keys(data)[Object.keys(data).length-1]]);
    const userName = "Harsh";
    const [counterValue, setCounterValue] = useState(data[Object.keys(data)[Object.keys(data).length-1]]);
    
    return (
        <Box>

            <Box style={main}> 
                <Box>Hii {userName}</Box>
                <Box>
                    <Button variant="contained" onClick={() => countAdjuster(-1)}>-</Button> 
                    <span>  { counterValue } </span>
                    <Button variant="contained" onClick={() => countAdjuster(1)}>+</Button> 
                </Box>
            </Box>
            <Box style={main}>
                <Box style={table}>
                    {Object.keys(data).map((item, i) => (
                        <Box>
                            {item} : {data[item]}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Home;