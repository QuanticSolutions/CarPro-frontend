import { useParams, Navigate, Outlet } from 'react-router-dom';

const allowedCountries = ['sa', 'qtr', 'syr', 'eg', 'us'];

export default function Layout() {
  const { countryCode } = useParams();
  if (!allowedCountries.includes(countryCode)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
