import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Box, Typography, Card, CardContent, Tabs, Tab, Avatar, Dialog } from "@mui/material"
import { updateNotification, NOTIFY_BASE_URL, getAllNotifications } from "../../api/consumer";
import Chat from '../chat/Chat'
import moment from "moment/moment";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";

const socket = io(NOTIFY_BASE_URL);

const Notifications = () => {

  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const streamId = localStorage.getItem("stream_id");
    getAllNotifications(streamId).then(data => {
      setNotifications(data);
    });
    const handleNewNotification = (notification) => {
      if (notification.user_id === streamId) {
        getAllNotifications(streamId).then(data => {
          setNotifications(data);
        });

      }
    };
    socket.on("new_notification", handleNewNotification);
    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, []);


  const filteredNotifications = tab === "all"
    ? notifications
    : notifications.filter((notif) => !notif.read);

  const handleNotificationClick = async (notif) => {
    localStorage.setItem("reciever_stream_id", notif.created_by);
    if (!notif.read) {
      await updateNotification(notif.id)
      setNotifications(prev =>
        prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
      );
      const streamId = localStorage.getItem("stream_id");
      getAllNotifications(streamId).then(data => {
        setNotifications(data);
      });
    }
    // setPopupOpen(true)
  };

  return (
    <Box sx={{ p: 2, border: "1px solid gray", borderRadius: "5px", my: 3, minHeight: "20rem", width: "75%", mx: "auto", background: "#fff", "@media(max-width:800px)": { width: "90%" }, direction: i18n.language == "ar" && "rtl" }}>
      <Typography variant="h6" fontWeight="bold">{t("notifications.title")}</Typography>
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        sx={{
          my: 2,
          "& .MuiTab-root": {
            color: "black",
            border: "1px solid black",
            borderRadius: "25px",
            mr: 1,
            p: 1,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "16px",
            transition: "0.3s",
          },
          "& .MuiTab-root.Mui-selected": {
            background: "black",
            color: "#fff!important",
          },
          "& .MuiTabs-indicator": { display: "none" }
        }} >
        <Tab label={t("notifications.tabs.all")} value="all" />
        <Tab label={t("notifications.tabs.unread")} value="unread" />
      </Tabs>
      {
        filteredNotifications.length > 0 ?
          filteredNotifications.map((notif, index) => (
            <Card key={index} variant="outlined" sx={{ display: "flex", alignItems: "center", mb: 1 }} onClick={() => handleNotificationClick(notif)}>
              <Avatar src={notif.avatar} sx={{ m: 1 }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography fontWeight="bold">{notif.created_by}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {notif.message}
                </Typography>
              </CardContent>
              <Typography sx={{ p: 1, color: "gray", fontSize: "12px" }}>
                {moment(notif.created_at).format("DD-MM-YY, HH:mm")}
              </Typography>
            </Card>
          )) :
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/images/notification-gif.gif" width="350rem" />
          </Box>
      }
      <Dialog open={popupOpen} onClose={() => setPopupOpen(false)} fullScreen={true} >
        <CloseIcon onClick={() => { setPopupOpen(false); if (backToHome) { window.location.href = "/" } }} sx={{ color: "#B71C1C", cursor: "pointer" }} />
        <Chat />
      </Dialog>
    </Box>
  );
};

export default Notifications;
