import { useState, useEffect } from 'react'
import MainMenu from './Menu'
import MobileMenu from './MobileMenu'
import Chats from '../chat/Chats'
import { Dialog } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { Home } from '@mui/icons-material'

function Nav({ notifications }) {

    const [popupOpen, setPopupOpen] = useState(false);

    return (
        <>
            <MainMenu notifications={notifications} toggleChat={() => setPopupOpen(true)} />
            <MobileMenu notifications={notifications} toggleChat={() => setPopupOpen(true)} />
            <Dialog open={popupOpen}
                PaperProps={{
                    sx: {
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                    }
                }}
                onClose={() => setPopupOpen(false)}
                fullScreen={true}
                sx={{
                    zIndex: 6000
                }}
            >
                <Chats />
                <Home onClick={() => {setPopupOpen(false); }} sx={{ color: "#B71C1C", cursor: "pointer", position: "fixed", top: 5, right: 5 }} />
            </Dialog>
        </>
    )
}

export default Nav
