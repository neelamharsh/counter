import React from "react";
import Box from '@mui/material/Box'
import { useState } from "react";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';

const dateBox = {
    display:'flex',
    justifyContent:'space-between',
    padding:'8px',
    borderBottom:'1px dotted black',
}

const TableView = ({d, key}) => {

    const [isEditable, setIsEditable] = useState(false);
      
    const countAdjuster = async (e) => {
        
        setIsEditable(e);
        let newValue = parseInt(content, 10);

        var api = "";
        const formattedDate = d.date;

        if(process.env.NODE_ENV === 'development') api = 'http://localhost:8000/countAdjuster';
        else api = '/countAdjuster';
        
        await fetch(api, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName,formattedDate,newValue
            })
        });
    }

    const userName = localStorage.getItem("UserName");
    const [content, setContent] = useState(d.frequency);

    const handleInput = (event) => {
        console.log(event.target.textContent);
        const updatedContent = event.target.textContent;
        setContent(updatedContent);
    };


    return (
        <Box style={dateBox} key={key}> 
        <Box>{d.date} : <span contentEditable={isEditable} onInput={handleInput} 
        style={{ border: 'none',  padding: '4px', display: 'inline-block', outline: 'none', }}>{d.frequency}</span></Box> 
        <Box> { isEditable ? <ViewAgendaIcon sx={{ fontSize: 20 }} onClick={() => countAdjuster(false)}/> : <AppRegistrationIcon sx={{ fontSize: 20 }} onClick={() => countAdjuster(true)}/> } </Box>
        </Box>
    )
}

export default TableView;