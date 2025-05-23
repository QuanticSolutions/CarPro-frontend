export default function Redirect() {

    const countryCode = localStorage.getItem("selectedCountry");;

    useEffect(() => {
        if (!countryCode && !window.location.pathname.includes("countries")) {
            window.location.href = "/countries";
        }
    }, []);
}