import { Routes, Route } from "react-router-dom";
import { useTranslation } from 'react-i18next';
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
import Layout from './Layout';

const AppRoutes = ({ data, rent, notifications, setNotifications }) => {
  const { t } = useTranslation();

  return (
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

        {/* Sell Routes */}
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

        {/* Rent Routes */}
        <Route path='rent/cars' element={<ProtectRoute><Form title={t("form.rentCars")} type="rent" category={"cars"} /></ProtectRoute>} />
        <Route path='rent/heavy' element={<ProtectRoute><Form title={t("form.rentHeavy")} type="rent" category={"heavy"} /></ProtectRoute>} />
        <Route path='rent/bikes' element={<ProtectRoute><Form title={t("form.rentBikes")} type="rent" category={"bikes"} /></ProtectRoute>} />
        <Route path='rent/boats' element={<ProtectRoute><Form title={t("form.rentBoats")} type="rent" category={"boats"} /></ProtectRoute>} />
        <Route path='rent/construction' element={<ProtectRoute><Form title={t("form.rentConstruction")} type="rent" category={"construction"} /></ProtectRoute>} />

        {/* Update Sell Routes */}
        <Route path='update/sell/cars' element={<ProtectRoute><Form title={t("form.sellCars")} type="sell" updating={true} category={"cars"} /></ProtectRoute>} />
        <Route path='update/sell/heavy' element={<ProtectRoute><Form title={t("form.sellHeavy")} type="sell" updating={true} category={"heavy"} /></ProtectRoute>} />
        <Route path='update/sell/bikes' element={<ProtectRoute><Form title={t("form.sellBikes")} type="sell" updating={true} category={"bikes"} /></ProtectRoute>} />
        <Route path='update/sell/boats' element={<ProtectRoute><Form title={t("form.sellBoats")} type="sell" updating={true} category={"boats"} /></ProtectRoute>} />
        <Route path='update/sell/plates' element={<ProtectRoute><Form title={t("form.sellPlates")} type="sell" updating={true} category={"plates"} /></ProtectRoute>} />
        <Route path='update/sell/construction' element={<ProtectRoute><Form title={t("form.sellConstruction")} type="sell" updating={true} category={"construction"} /></ProtectRoute>} />

        {/* Update Rent Routes */}
        <Route path='update/rent/car' element={<ProtectRoute><Form title={t("form.rentCars")} type="rent" updating={true} category={"cars"} /></ProtectRoute>} />
        <Route path='update/rent/heavy' element={<ProtectRoute><Form title={t("form.rentHeavy")} type="rent" updating={true} category={"heavy"} /></ProtectRoute>} />
        <Route path='update/rent/bikes' element={<ProtectRoute><Form title={t("form.rentBikes")} type="rent" updating={true} category={"bikes"} /></ProtectRoute>} />
        <Route path='update/rent/boats' element={<ProtectRoute><Form title={t("form.rentBoats")} type="rent" updating={true} category={"boats"} /></ProtectRoute>} />
        <Route path='update/rent/plates' element={<ProtectRoute><Form title={t("form.rentPlates")} type="rent" updating={true} category={"plates"} /></ProtectRoute>} />
        <Route path='update/rent/construction' element={<ProtectRoute><Form title={t("form.rentConstruction")} type="rent" category={"construction"} /></ProtectRoute>} />

        {/* Category Sell Routes */}
        <Route path='cars/sell' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("listing.carsForSale")} category={"cars"} />} />
        <Route path='bikes/sell' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("listing.bikesForSale")} category={"bikes"} />} />
        <Route path='construction/sell' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("listing.constructionForSale")} category={"construction"} />} />
        <Route path='plates/sell' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("listing.platesForSale")} />} category={"plates"} />
        <Route path='heavy/sell' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("listing.heavyForSale")} />} category={"heavy"} />
        <Route path='boats/sell' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("listing.boatsForSale")} />} category={"boats"} />

        {/* Category Rent Routes */}
        <Route path='cars/rent' element={<Featured data={rent.filter(obj => obj.category == "cars")} title={t("listing.carsForRent")} type="rent" category={"cars"} />} />
        <Route path='bikes/rent' element={<Featured data={rent.filter(obj => obj.category == "bikes")} title={t("listing.bikesForRent")} type="rent" category={"bikes"} />} />
        <Route path='construction/rent' element={<Featured data={rent.filter(obj => obj.category == "construction")} title={t("listing.constructionForRent")} type="rent" category={"construction"} />} />
        <Route path='plates/rent' element={<Featured data={rent.filter(obj => obj.category == "plates")} title={t("listing.platesForRent")} type="rent" category={"plates"} />} />
        <Route path='heavy/rent' element={<Featured data={rent.filter(obj => obj.category == "heavy")} title={t("listing.heavyForRent")} type="rent" category={"heavy"} />} />
        <Route path='boats/rent' element={<Featured data={rent.filter(obj => obj.category == "boats")} title={t("listing.boatsForRent")} type="rent" category={"boats"} />} />

        {/* General Routes */}
        <Route path='ads' element={<Featured data={data} title={t("general.allAds")} type="sell" />} />
        <Route path='ad/sell' element={<Ad type="sell" />} />
        <Route path='ad/rent' element={<Ad type="rent" />} />

        {/* Featured Routes */}
        <Route path='featured/cars' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("featured.cars")} category={"cars"} />} />
        <Route path='featured/bikes' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("featured.bikes")} category={"bikes"} />} />
        <Route path='featured/construction' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("featured.construction")} category={"construction"} />} />
        <Route path='featured/plates' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("featured.plates")} category={"plates"} />} />
        <Route path='featured/heavy' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("featured.heavy")} category={"heavy"} />} />
        <Route path='featured/boats' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("featured.boats")} category={"boats"} />} />

        {/* Popular Routes */}
        <Route path='popular/cars' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("popular.cars")} category={"cars"} />} />
        <Route path='popular/bikes' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("popular.bikes")} category={"bikes"} />} />
        <Route path='popular/construction' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("popular.construction")} category={"construction"} />} />
        <Route path='popular/plates' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("popular.plates")} category={"plates"} />} />
        <Route path='popular/heavy' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("popular.heavy")} />} category={"heavy"} />
        <Route path='popular/boats' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("popular.boats")} category={"boats"} />} />

        {/* Service Routes */}
        <Route path='services/insurance' element={<Insurance />} />
        <Route path='services/inspection' element={<Inspection />} />
        <Route path='services/sell' element={<Sell />} />
        <Route path='services/rent' element={<Rent />} />

        {/* Protected Routes */}
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
        <Route path='my/profile' element={
          <ProtectRoute>
            <EditProfile />
          </ProtectRoute>
        }
        />

        {/* Static Pages */}
        <Route path='contact' element={<ContactUs />} />
        <Route path='about' element={<AboutUs />} />
        <Route path='terms' element={<TermsOfUse />} />
        <Route path='privacy' element={<PrivacyPolicy />} />
        <Route path='sell/categories' element={<Categories type="sell" />} />
        <Route path='rent/categories' element={<Categories type="rent" />} />
        <Route path='checkout' element={<PaymentPage />} />
        <Route path='chats' element={<Chats />} />
      </Route>

      {/* Routes without country code (fallback/legacy routes) */}
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

      {/* Legacy Sell Routes */}
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

      {/* Legacy Rent Routes */}
      <Route path='/rent/cars' element={<ProtectRoute><Form title={t("form.rentCars")} type="rent" category={"cars"} /></ProtectRoute>} />
      <Route path='/rent/heavy' element={<ProtectRoute><Form title={t("form.rentHeavy")} type="rent" category={"heavy"} /></ProtectRoute>} />
      <Route path='/rent/bikes' element={<ProtectRoute><Form title={t("form.rentBikes")} type="rent" category={"bikes"} /></ProtectRoute>} />
      <Route path='/rent/boats' element={<ProtectRoute><Form title={t("form.rentBoats")} type="rent" category={"boats"} /></ProtectRoute>} />
      <Route path='/rent/construction' element={<ProtectRoute><Form title={t("form.rentConstruction")} type="rent" category={"construction"} /></ProtectRoute>} />

      {/* Legacy Update Routes */}
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

      {/* Legacy Category Routes */}
      {/* Category Sell Routes */}
      <Route path='cars/sell' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("listing.carsForSale")} category={"cars"} />} />
      <Route path='bikes/sell' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("listing.bikesForSale")} category={"bikes"} />} />
      <Route path='construction/sell' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("listing.constructionForSale")} category={"construction"} />} />
      <Route path='plates/sell' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("listing.platesForSale")} />} category={"plates"} />
      <Route path='heavy/sell' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("listing.heavyForSale")} />} category={"heavy"} />
      <Route path='boats/sell' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("listing.boatsForSale")} />} category={"boats"} />

      {/* Category Rent Routes */}
      <Route path='cars/rent' element={<Featured data={rent.filter(obj => obj.category == "cars")} title={t("listing.carsForRent")} type="rent" category={"cars"} />} />
      <Route path='bikes/rent' element={<Featured data={rent.filter(obj => obj.category == "bikes")} title={t("listing.bikesForRent")} type="rent" category={"bikes"} />} />
      <Route path='construction/rent' element={<Featured data={rent.filter(obj => obj.category == "construction")} title={t("listing.constructionForRent")} type="rent" category={"construction"} />} />
      <Route path='plates/rent' element={<Featured data={rent.filter(obj => obj.category == "plates")} title={t("listing.platesForRent")} type="rent" category={"plates"} />} />
      <Route path='heavy/rent' element={<Featured data={rent.filter(obj => obj.category == "heavy")} title={t("listing.heavyForRent")} type="rent" category={"heavy"} />} />
      <Route path='boats/rent' element={<Featured data={rent.filter(obj => obj.category == "boats")} title={t("listing.boatsForRent")} type="rent" category={"boats"} />} />
      <Route path='/ads/:brand' element={<Featured data={data} type="sell" showBrands={false} />} />
      <Route path='/ad/sell' element={<Ad type="sell" />} />
      <Route path='/ad/rent' element={<Ad type="rent" />} />

      {/* Featured Routes */}
      <Route path='featured/cars' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("featured.cars")} category={"cars"} />} />
      <Route path='featured/bikes' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("featured.bikes")} category={"bikes"} />} />
      <Route path='featured/construction' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("featured.construction")} category={"construction"} />} />
      <Route path='featured/plates' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("featured.plates")} category={"plates"} />} />
      <Route path='featured/heavy' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("featured.heavy")} category={"heavy"} />} />
      <Route path='featured/boats' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("featured.boats")} category={"boats"} />} />

      {/* Popular Routes */}
      <Route path='popular/cars' element={<Featured data={data.filter(obj => obj.category == "cars")} title={t("popular.cars")} category={"cars"} />} />
      <Route path='popular/bikes' element={<Featured data={data.filter(obj => obj.category == "bikes")} title={t("popular.bikes")} category={"bikes"} />} />
      <Route path='popular/construction' element={<Featured data={data.filter(obj => obj.category == "construction")} title={t("popular.construction")} category={"construction"} />} />
      <Route path='popular/plates' element={<Featured data={data.filter(obj => obj.category == "plates")} title={t("popular.plates")} category={"plates"} />} />
      <Route path='popular/heavy' element={<Featured data={data.filter(obj => obj.category == "heavy")} title={t("popular.heavy")} />} category={"heavy"} />
      <Route path='popular/boats' element={<Featured data={data.filter(obj => obj.category == "boats")} title={t("popular.boats")} category={"boats"} />} />

      {/* Legacy Service Routes */}
      <Route path='/services/insurance' element={<Insurance />} />
      <Route path='/services/inspection' element={<Inspection />} />
      <Route path='/services/sell' element={<Sell />} />
      <Route path='/services/rent' element={<Rent />} />

      {/* Legacy Protected Routes */}
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
      <Route path='/my/profile' element={
        <ProtectRoute>
          <EditProfile />
        </ProtectRoute>
      }
      />

      {/* Legacy Static Pages */}
      <Route path='/contact' element={<ContactUs />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/terms' element={<TermsOfUse />} />
      <Route path='/privacy' element={<PrivacyPolicy />} />
      <Route path='/sell/categories' element={<Categories type="sell" />} />
      <Route path='/rent/categories' element={<Categories type="rent" />} />
      <Route path='/checkout' element={<PaymentPage />} />
      <Route path='/chats' element={<Chats />} />
      <Route path="/countries" element={<CountrySelectionPage />} />
    </Routes>
  );
};

export default AppRoutes;