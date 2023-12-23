import React from "react";
import Box from '@mui/material/Box'

const totalStyle = {
    paddingLeft:'20px',
    paddingTop:'20px',
    width:'30%',
    background:'black',//rgba(744, 740, 740, 0.4)
    color:'white',
    minHeight:'86vh',
};

const RightSidePanel = ({total, totalDays}) => {
    return (
        <Box style={totalStyle}> 
            <Box>{total} Times, </Box>
            <Box>In {totalDays} Days</Box>
        </Box>
    )
}

export default RightSidePanel;