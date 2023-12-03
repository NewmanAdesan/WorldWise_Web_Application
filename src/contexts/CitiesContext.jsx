import { createContext, useContext, useEffect, useState } from "react"


const BASE_URL = "http://localhost:9000"
const citiesContext = createContext();


const CitiesContext = ({children}) => {

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
    const [error, setError] = useState("");

    useEffect(()=>{
        async function fetchCities() {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                setCities(data);
            } catch (err) {
            alert("Error Occured When Fetching Cities Data.")
            } finally {
            setIsLoading(false);
            }
        }

        fetchCities();
    }, [])

    const getCity = async (id) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();
            console.log("in getCity function: ", data);
            if (data === {}) setError("City Does not Exist in the database")
            else {
                setCurrentCity(data);
                setError("");
            }
        } catch (error) {
            console.log(error);
            setError("Error Occurred Whilst Fetcing City Data");
        } finally {
            setIsLoading(false);
        }
    }

    return (
    <citiesContext.Provider value={{cities, isLoading, setIsLoading, currentCity, error, getCity}}>
        {children}
    </citiesContext.Provider>
    )
}


const useCitiesContext = () => {
    const contextValue = useContext(citiesContext);
    if (contextValue === undefined) throw Error("Check if this component is a descendant of CitiesContext Component");
    return contextValue;
}

export {CitiesContext, useCitiesContext}