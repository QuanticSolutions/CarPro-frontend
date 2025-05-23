import { useLocation } from "react-router-dom";
import FeaturedFilter from '../components/filter/FeaturedFilter';

function Featured({ data, title, type }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loc = searchParams.get("location");
  const make = searchParams.get("make") || 'null';
  const vehicleCondition = searchParams.get("type");
  const vehicle = searchParams.get("vehicle") || 'null';
  const filterData = () => {
    return data.filter(ad => {
      if (vehicle !== "null") {
        if (ad.category !== vehicle) {
          return false
        }
      }
      if (make !== "null") {
        if (!ad.model.includes(make)) {
          return false
        }
      }
      return true
    }
    )

  }
  return (
    <div style={{ background: "#F2F3F3" }}>
      <FeaturedFilter
        data={filterData()}
        title={title}
        type={type}
        loc={loc || "null"}
        vehicleCondition={vehicleCondition || "null"}
      />
    </div>
  );
}

export default Featured;
