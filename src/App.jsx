import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import Nav from './components/menu/Nav';
import Footer from './components/footer/Footer';
import MobileFooter from './components/footer/MobileFooter';
import Home from './views/Home';
import Featured from './views/Featured';
import Ad from './views/Ad';
import AuthHandler from './components/auth/AuthHandler';
import Form from './views/Form';
import Notification from './views/Notification';
import Insurance from './views/services/insurance';
import Inspection from './views/services/inspection';
import Sell from './views/services/Sell';
import Favourites from './views/Favourites';
import MyAds from './views/MyAds';
import Rent from './views/services/rent';
import ContactUs from './views/Contact';
import EditProfile from './views/Profile';
import AboutUs from './views/AboutUs';
import TermsOfUse from './views/Terms';
import PrivacyPolicy from './views/Privacy';
import Categories from './views/Categories';
import PaymentPage from './views/CheckOut';
import Chats from './components/chat/Chats';
import ProtectRoute from './components/auth/ProtectRoute';
import CountrySelectionPage from './views/Countries';
import { getAllAds, getAllRents, NOTIFY_BASE_URL, getAllNotifications } from './api/consumer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { io } from "socket.io-client";
import './App.css';
import './i18n';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

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
          setData(ads.filter(ad => ad.status == "live" && ad.country == countries[countryCode]))
        }
      );
      getAllRents().then(
        rent => {
          setRent(rent.filter(ad => ad.status == "live" && ad.country == countries[countryCode]))
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
      <Routes>
        <Route path="/:countryCode" element={<Layout />}>
          <Route index element={<Home data={data} />} />
          <Route
            path='notifications'
            element={
              <ProtectRoute>
                <Notification notifications={notifications.filter(notif => notif.is_read == false)} setNotifications={setNotifications} />
              </ProtectRoute>
            }
          />
          <Route
            path='sell/cars'
            element={
              <ProtectRoute>
                <Form title={t("form.sellCars")} type="sell" category={"cars"} />
              </ProtectRoute>
            }
          />
          <Route
            path='sell/heavy'
            element={
              <ProtectRoute>
                <Form title={t("form.sellHeavy")} type="sell" category={"heavy"} />
              </ProtectRoute>
            }
          />
          <Route
            path='sell/bikes'
            element={
              <ProtectRoute>
                <Form title={t("form.sellBikes")} type="sell" category={"bikes"} />
              </ProtectRoute>
            }
          />
          <Route
            path='sell/boats'
            element={
              <ProtectRoute>
                <Form title={t("form.sellBoats")} type="sell" category={"boats"} />
              </ProtectRoute>
            }
          />
          <Route
            path='sell/plates'
            element={
              <ProtectRoute>
                <Form title={t("form.sellPlates")} type="sell" category={"plates"} />
              </ProtectRoute>
            }
          />
          <Route
            path='sell/construction'
            element={
              <ProtectRoute>
                <Form title={t("form.sellConstruction")} type="sell" category={"construction"} />
              </ProtectRoute>
            }
          />
          <Route path='rent/cars' element={<ProtectRoute><Form title={t("form.rentCars")} type="rent" category={"cars"} /></ProtectRoute>} />
          <Route path='rent/heavy' element={<ProtectRoute><Form title={t("form.rentHeavy")} type="rent" category={"heavy"} /></ProtectRoute>} />
          <Route path='rent/bikes' element={<ProtectRoute><Form title={t("form.rentBikes")} type="rent" category={"bikes"} /></ProtectRoute>} />
          <Route path='rent/boats' element={<ProtectRoute><Form title={t("form.rentBoats")} type="rent" category={"boats"} /></ProtectRoute>} />
          <Route path='rent/construction' element={<ProtectRoute><Form title={t("form.rentConstruction")} type="rent" category={"construction"} /></ProtectRoute>} />
          <Route path='update/sell/cars' element={<ProtectRoute><Form title={t("form.sellCars")} type="sell" updating={true} category={"cars"} /></ProtectRoute>} />
          <Route path='update/sell/heavy' element={<ProtectRoute><Form title={t("form.sellHeavy")} type="sell" updating={true} category={"heavy"} /></ProtectRoute>} />
          <Route path='update/sell/bikes' element={<ProtectRoute><Form title={t("form.sellBikes")} type="sell" updating={true} category={"bikes"} /></ProtectRoute>} />
          <Route path='update/sell/boats' element={<ProtectRoute><Form title={t("form.sellBoats")} type="sell" updating={true} category={"boats"} /></ProtectRoute>} />
          <Route path='update/sell/plates' element={<ProtectRoute><Form title={t("form.sellPlates")} type="sell" updating={true} category={"plates"} /></ProtectRoute>} />
          <Route path='update/sell/construction' element={<ProtectRoute><Form title={t("form.sellConstruction")} type="sell" updating={true} category={"construction"} /></ProtectRoute>} />
          <Route path='update/rent/car' element={<ProtectRoute><Form title={t("form.rentCars")} type="rent" updating={true} category={"cars"} /></ProtectRoute>} />
          <Route path='update/rent/heavy' element={<ProtectRoute><Form title={t("form.rentHeavy")} type="rent" updating={true} category={"heavy"} /></ProtectRoute>} />
          <Route path='update/rent/bikes' element={<ProtectRoute><Form title={t("form.rentBikes")} type="rent" updating={true} category={"bikes"} /></ProtectRoute>} />
          <Route path='update/rent/boats' element={<ProtectRoute><Form title={t("form.rentBoats")} type="rent" updating={true} category={"boats"} /></ProtectRoute>} />
          <Route path='update/rent/plates' element={<ProtectRoute><Form title={t("form.rentPlates")} type="rent" updating={true} category={"plates"} /></ProtectRoute>} />
          <Route path='update/rent/construction' element={<ProtectRoute><Form title={t("form.rentConstruction")} type="rent" category={"construction"} /></ProtectRoute>} />
          <Route path='cars/sell' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("listing.carsForSale")} />} />
          <Route path='bikes/sell' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("listing.bikesForSale")} />} />
          <Route path='construction/sell' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("listing.constructionForSale")} />} />
          <Route path='plates/sell' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("listing.platesForSale")} />} />
          <Route path='heavy/sell' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("listing.heavyForSale")} />} />
          <Route path='boats/sell' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("listing.boatsForSale")} />} />
          <Route path='cars/rent' element={<Featured data={rent.filter(obj => obj.category == "cars")} title={t("listing.carsForRent")} type="rent" />} />
          <Route path='bikes/rent' element={<Featured data={rent.filter(obj => obj.category == "bikes")} title={t("listing.bikesForRent")} type="rent" />} />
          <Route path='construction/rent' element={<Featured data={rent.filter(obj => obj.category == "construction")} title={t("listing.constructionForRent")} type="rent" />} />
          <Route path='plates/rent' element={<Featured data={rent.filter(obj => obj.category == "plates")} title={t("listing.platesForRent")} type="rent" />} />
          <Route path='heavy/rent' element={<Featured data={rent.filter(obj => obj.category == "heavy")} title={t("listing.heavyForRent")} type="rent" />} />
          <Route path='boats/rent' element={<Featured data={rent.filter(obj => obj.category == "boats")} title={t("listing.boatsForRent")} type="rent" />} />
          <Route path='ads' element={<Featured data={data} title={t("general.allAds")} type="sell" />} />
          <Route path='ad/sell' element={<Ad type="sell" />} />
          <Route path='ad/rent' element={<Ad type="rent" />} />
          <Route path='featured/cars' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("featured.cars")} />} />
          <Route path='featured/bikes' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("featured.bikes")} />} />
          <Route path='featured/construction' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("featured.construction")} />} />
          <Route path='featured/plates' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("featured.plates")} />} />
          <Route path='featured/heavy' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("featured.heavy")} />} />
          <Route path='featured/boats' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("featured.boats")} />} />
          <Route path='popular/cars' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("popular.cars")} />} />
          <Route path='popular/bikes' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("popular.bikes")} />} />
          <Route path='popular/construction' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("popular.construction")} />} />
          <Route path='popular/plates' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("popular.plates")} />} />
          <Route path='popular/heavy' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("popular.heavy")} />} />
          <Route path='popular/boats' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("popular.boats")} />} />
          <Route path='services/insurance' element={<Insurance />} />
          <Route path='services/inspection' element={<Inspection />} />
          <Route path='services/sell' element={<Sell />} />
          <Route path='services/rent' element={<Rent />} />
          <Route
            path='favourites'
            element={
              <ProtectRoute>
                <Favourites />
              </ProtectRoute>
            }
          />
          <Route
            path='my/ads'
            element={
              <ProtectRoute>
                <MyAds />
              </ProtectRoute>
            }
          />
          <Route path='contact' element={<ContactUs />} />
          <Route path='my/profile' element={
            <ProtectRoute>
              <EditProfile />
            </ProtectRoute>
          }
          />
          <Route path='about' element={<AboutUs />} />
          <Route path='terms' element={<TermsOfUse />} />
          <Route path='privacy' element={<PrivacyPolicy />} />
          <Route path='sell/categories' element={<Categories type="sell" />} />
          <Route path='rent/categories' element={<Categories type="rent" />} />
          <Route path='checkout' element={<PaymentPage />} />
          <Route path='chats' element={<Chats />} />
        </Route>
        <Route path='/' element={<Home data={data} />} />
        <Route path="/auth-handler" element={<AuthHandler />} />
        <Route
          path='/notifications'
          element={
            <ProtectRoute>
              <Notification notifications={notifications.filter(notif => notif.is_read == false)} setNotifications={setNotifications} />
            </ProtectRoute>
          }
        />
        <Route
          path='/sell/cars'
          element={
            <ProtectRoute>
              <Form title={t("form.sellCars")} type="sell" category={"cars"} />
            </ProtectRoute>
          }
        />
        <Route
          path='/sell/heavy'
          element={
            <ProtectRoute>
              <Form title={t("form.sellHeavy")} type="sell" category={"heavy"} />
            </ProtectRoute>
          }
        />
        <Route
          path='/sell/bikes'
          element={
            <ProtectRoute>
              <Form title={t("form.sellBikes")} type="sell" category={"bikes"} />
            </ProtectRoute>
          }
        />
        <Route
          path='/sell/boats'
          element={
            <ProtectRoute>
              <Form title={t("form.sellBoats")} type="sell" category={"boats"} />
            </ProtectRoute>
          }
        />
        <Route
          path='/sell/plates'
          element={
            <ProtectRoute>
              <Form title={t("form.sellPlates")} type="sell" category={"plates"} />
            </ProtectRoute>
          }
        />
        <Route
          path='/sell/construction'
          element={
            <ProtectRoute>
              <Form title={t("form.sellConstruction")} type="sell" category={"construction"} />
            </ProtectRoute>
          }
        />
        <Route path='/rent/cars' element={<ProtectRoute><Form title={t("form.rentCars")} type="rent" category={"cars"} /></ProtectRoute>} />
        <Route path='/rent/heavy' element={<ProtectRoute><Form title={t("form.rentHeavy")} type="rent" category={"heavy"} /></ProtectRoute>} />
        <Route path='/rent/bikes' element={<ProtectRoute><Form title={t("form.rentBikes")} type="rent" category={"bikes"} /></ProtectRoute>} />
        <Route path='/rent/boats' element={<ProtectRoute><Form title={t("form.rentBoats")} type="rent" category={"boats"} /></ProtectRoute>} />
        <Route path='/rent/construction' element={<ProtectRoute><Form title={t("form.rentConstruction")} type="rent" category={"construction"} /></ProtectRoute>} />
        <Route path='/update/sell/cars' element={<ProtectRoute><Form title={t("form.sellCars")} type="sell" updating={true} category={"cars"} /></ProtectRoute>} />
        <Route path='/update/sell/heavy' element={<ProtectRoute><Form title={t("form.sellHeavy")} type="sell" updating={true} category={"heavy"} /></ProtectRoute>} />
        <Route path='/update/sell/bikes' element={<ProtectRoute><Form title={t("form.sellBikes")} type="sell" updating={true} category={"bikes"} /></ProtectRoute>} />
        <Route path='/update/sell/boats' element={<ProtectRoute><Form title={t("form.sellBoats")} type="sell" updating={true} category={"boats"} /></ProtectRoute>} />
        <Route path='/update/sell/plates' element={<ProtectRoute><Form title={t("form.sellPlates")} type="sell" updating={true} category={"plates"} /></ProtectRoute>} />
        <Route path='/update/sell/construction' element={<ProtectRoute><Form title={t("form.sellConstruction")} type="sell" updating={true} category={"construction"} /></ProtectRoute>} />
        <Route path='/update/rent/car' element={<ProtectRoute><Form title={t("form.rentCars")} type="rent" updating={true} category={"cars"} /></ProtectRoute>} />
        <Route path='/update/rent/heavy' element={<ProtectRoute><Form title={t("form.rentHeavy")} type="rent" updating={true} category={"heavy"} /></ProtectRoute>} />
        <Route path='/update/rent/bikes' element={<ProtectRoute><Form title={t("form.rentBikes")} type="rent" updating={true} category={"bikes"} /></ProtectRoute>} />
        <Route path='/update/rent/boats' element={<ProtectRoute><Form title={t("form.rentBoats")} type="rent" updating={true} category={"boats"} /></ProtectRoute>} />
        <Route path='/update/rent/plates' element={<ProtectRoute><Form title={t("form.rentPlates")} type="rent" updating={true} category={"plates"} /></ProtectRoute>} />
        <Route path='/update/rent/construction' element={<ProtectRoute><Form title={t("form.rentConstruction")} type="rent" category={"construction"} /></ProtectRoute>} />
        <Route path='/cars/sell' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("listing.carsForSale")} />} />
        <Route path='/bikes/sell' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("listing.bikesForSale")} />} />
        <Route path='/construction/sell' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("listing.constructionForSale")} />} />
        <Route path='/plates/sell' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("listing.platesForSale")} />} />
        <Route path='/heavy/sell' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("listing.heavyForSale")} />} />
        <Route path='/boats/sell' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("listing.boatsForSale")} />} />
        <Route path='/cars/rent' element={<Featured data={rent.filter(obj => obj.category == "cars")} title={t("listing.carsForRent")} type="rent" />} />
        <Route path='/bikes/rent' element={<Featured data={rent.filter(obj => obj.category == "bikes")} title={t("listing.bikesForRent")} type="rent" />} />
        <Route path='/construction/rent' element={<Featured data={rent.filter(obj => obj.category == "construction")} title={t("listing.constructionForRent")} type="rent" />} />
        <Route path='/plates/rent' element={<Featured data={rent.filter(obj => obj.category == "plates")} title={t("listing.platesForRent")} type="rent" />} />
        <Route path='/heavy/rent' element={<Featured data={rent.filter(obj => obj.category == "heavy")} title={t("listing.heavyForRent")} type="rent" />} />
        <Route path='/boats/rent' element={<Featured data={rent.filter(obj => obj.category == "boats")} title={t("listing.boatsForRent")} type="rent" />} />
        <Route path='/ads' element={<Featured data={data} title={t("general.allAds")} type="sell" />} />
        <Route path='/ad/sell' element={<Ad type="sell" />} />
        <Route path='/ad/rent' element={<Ad type="rent" />} />
        <Route path='/featured/cars' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("featured.cars")} />} />
        <Route path='/featured/bikes' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("featured.bikes")} />} />
        <Route path='/featured/construction' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("featured.construction")} />} />
        <Route path='/featured/plates' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("featured.plates")} />} />
        <Route path='/featured/heavy' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("featured.heavy")} />} />
        <Route path='/featured/boats' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("featured.boats")} />} />
        <Route path='/popular/cars' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("popular.cars")} />} />
        <Route path='/popular/bikes' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("popular.bikes")} />} />
        <Route path='/popular/construction' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("popular.construction")} />} />
        <Route path='/popular/plates' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("popular.plates")} />} />
        <Route path='/popular/heavy' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("popular.heavy")} />} />
        <Route path='/popular/boats' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("popular.boats")} />} />
        <Route path='/services/insurance' element={<Insurance />} />
        <Route path='/services/inspection' element={<Inspection />} />
        <Route path='/services/sell' element={<Sell />} />
        <Route path='/services/rent' element={<Rent />} />
        <Route
          path='/favourites'
          element={
            <ProtectRoute>
              <Favourites />
            </ProtectRoute>
          }
        />
        <Route
          path='/my/ads'
          element={
            <ProtectRoute>
              <MyAds />
            </ProtectRoute>
          }
        />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/my/profile' element={
          <ProtectRoute>
            <EditProfile />
          </ProtectRoute>
        }
        />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/terms' element={<TermsOfUse />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/sell/categories' element={<Categories type="sell" />} />
        <Route path='/rent/categories' element={<Categories type="rent" />} />
        <Route path='/checkout' element={<PaymentPage />} />
        <Route path='/chats' element={<Chats />} />
        <Route path="/countries" element={<CountrySelectionPage />} />
      </Routes>

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