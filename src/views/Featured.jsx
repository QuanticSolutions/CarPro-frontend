import { useLocation } from "react-router-dom";
import FeaturedFilter from '../components/filter/FeaturedFilter';
import { useParams } from "react-router-dom";

function Featured({ data, title, type, showBrands = true, category }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loc = searchParams.get("location");
  const make = searchParams.get("make") || 'null';
  const vehicleCondition = searchParams.get("type");
  const vehicle = searchParams.get("vehicle") || 'null';
  const { brand } = useParams();
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
      if (brand) {
        if (!ad.model.includes(brand)) {
          return false
        }
      }
      return true
    }
    )

  }
  return (
    <div style={{ background: "#FFF" }}>
      <FeaturedFilter
        data={filterData()}
        title={title || `${brand} Ads`}
        type={type}
        showBrands={showBrands}
        loc={loc || "null"}
        vehicleCondition={vehicleCondition || "null"}
        category={category}
      />
    </div>
  );
}

export default Featured;
