import React, { useState } from "react";
import Box from '@mui/material/Box'

const dropDown = {
    textAlign:'right',
    paddingRight:'10px',
    paddingBottom:"10px",
    background:"yellow",
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

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Box>
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
        </Box>
    )
}

export default Dropdown;