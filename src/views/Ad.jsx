import { useState } from 'react'
import { useLocation } from "react-router-dom";
import { Box } from '@mui/material';
import Nav from '../components/menu/Nav';
import Details from '../components/detail/Details'



function Ad({ type }) {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id")

    return (
        <Box sx={{ marginTop: "4rem" }}>
            <Details id={id} type={type} />
        </Box>
    )
}

export default Ad
