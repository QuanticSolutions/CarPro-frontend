import { Container } from '@mui/material';
import Notifications from '../components/notifications/Notifications';

function Notification({ notifications, setNotifications }) {

    return (
        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', marginTop: window.innerWidth >= 1000 && "8rem", marginBottom: "5rem" }}>
            <Notifications notifications={notifications} setNotifications={setNotifications} />
        </Container>
    )
}

export default Notification
