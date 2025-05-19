import { useState } from 'react'
import { Box, Container } from '@mui/material';
import Nav from '../components/menu/Nav';
import Notifications from '../components/notifications/Notifications';
import Footer from '../components/footer/Footer';



function Notification({ notifications, setNotifications }) {

    return (
        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', marginTop: window.innerWidth >= 1000 && "10rem", marginBottom: "5rem" }}>
            <Notifications notifications={notifications} setNotifications={setNotifications} />
        </Container>
    )
}

export default Notification
