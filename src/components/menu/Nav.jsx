import { useState, useEffect } from 'react'
import MainMenu from './Menu'
import MobileMenu from './MobileMenu'
import Chats from '../chat/Chats'
import { Dialog, Button } from "@mui/material"
import { isAuthenticated } from '../../api/consumer'
import CloseIcon from '@mui/icons-material/Close';

function Nav({ notifications }) {

    const [popupOpen, setPopupOpen] = useState(false);

    return (
        <>
            <MainMenu notifications={notifications} toggleChat={() => setPopupOpen(true)} />
            <MobileMenu notifications={notifications} toggleChat={() => setPopupOpen(true)}/>
            <Dialog open={popupOpen}
                PaperProps={{
                    sx: {
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                    }
                }} onClose={() => setPopupOpen(false)} fullScreen={true} >
                {
                    isAuthenticated &&
                    <>
                        <MainMenu notifications={notifications} toggleChat={() => setPopupOpen(true)} />
                        <Chats />
                    </>
                }
                <CloseIcon onClick={() => setPopupOpen(false)} sx={{ color: "#B71C1C", cursor: "pointer", position: "fixed", top: 3, right: 3 }} />
            </Dialog>
        </>
    )
}

export default Nav
