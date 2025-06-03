import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Nav from './components/menu/Nav';
import Footer from './components/footer/Footer';
import MobileFooter from './components/footer/MobileFooter';
import AppRoutes from './AppRoutes';
import { getAllAds, getAllRents, NOTIFY_BASE_URL, getAllNotifications } from './api/consumer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { io } from "socket.io-client";
import './App.css';
import './i18n';
import { useTranslation } from 'react-i18next';

const theme = createTheme({
  typography: {
    fontFamily: '"franklin gothic demi", sans-serif',
    h2: {
      fontFamily: '"franklin gothic demi", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"franklin gothic demi", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"franklin gothic demi", sans-serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"franklin gothic demi", sans-serif',
      fontWeight: 400,
      fontSize: "30px",
      "@media (max-width:600px)": {
        fontSize: "18px",
      },
    },
    h6: {
      fontFamily: '"franklin gothic demi", sans-serif',
    },
    body1: {
      fontFamily: '"franklin gothic book", sans-serif',
    },
    body2: {
      fontFamily: '"franklin gothic book", sans-serif',
    },
  },
  button: {
    textTransform: "none"
  }
});

const socket = io(NOTIFY_BASE_URL);

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [rent, setRent] = useState([])
  const [notifications, setNotifications] = useState([]);
  const path = window.location.pathname;
  const countryCode = localStorage.getItem("selectedCountry");
  const countries = {
    "": "UAE",
    "sa": "Saudi Arabia",
    "qtr": "Qatar",
    "syr": "Syria",
    "eg": "Egypt",
    "us": "USA"
  };
  const { t } = useTranslation();
  const isFlutterApp = navigator.userAgent.toLowerCase().includes('flutter-app');

  useEffect(() => {
    if (!countryCode && !window.location.pathname.includes("countries") && !countries[countryCode]) {
      window.location.href = "/countries"
    }
    else {
      const currentPath = window.location.pathname;
      if (countryCode && countries[countryCode]) {
        let newPath;

        if (currentPath === '/' || currentPath === '') {
          newPath = `/${countryCode}`;
        } else if (currentPath.includes('countries')) {
          newPath = `/countries`;
        } else {
          const pathParts = currentPath.split('/').filter(Boolean);
          if (pathParts[0] && Object.keys(countries).includes(pathParts[0])) {
            pathParts[0] = countryCode;
            newPath = `/${pathParts.join('/')}`;
          } else {
            newPath = `/${countryCode}${currentPath}`;
          }
        }
        navigate(newPath);
      }
    }
  }, [countryCode, navigate]);

  useEffect(
    () => {
      getAllAds().then(
        ads => {
          setData(ads.filter(ad => ad.country == countries[countryCode]))
        }
      );
      getAllRents().then(
        rent => {
          setRent(rent.filter(ad => ad.status.includes("live") && ad.country == countries[countryCode]))
        }
      )
    },
    [countryCode]
  )

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

  const showNavAndFooter = countryCode !== null && countries[countryCode] !== undefined && !window.location.pathname.includes("countries");

  if (!countryCode && !window.location.pathname.includes("countries") && !countries[countryCode]) {
    window.location.href = "/countries"
  }

  return (
    <ThemeProvider theme={theme}>
      {showNavAndFooter &&
        <Nav notifications={notifications.filter(notif => notif.is_read == false).length} countryCode={countryCode} />
      }

      <AppRoutes
        data={data}
        rent={rent}
        notifications={notifications}
        setNotifications={setNotifications}
      />

      {showNavAndFooter && (
        window.innerWidth <= 1000 && !isFlutterApp ?
          <MobileFooter countryCode={countryCode} /> :
          !isFlutterApp ?
            <Footer countryCode={countryCode} /> :
            <span style={{ padding: "2rem" }}></span>
      )}
    </ThemeProvider>
  )
}

export default App