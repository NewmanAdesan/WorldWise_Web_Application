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

            if (data === {}) setError("City Does not Exist in the database")
            else {
                setCurrentCity(data);
                setError("");
            }
        } catch (error) {
            setError("Error Occurred Whilst Fetcing City Data");
        } finally {
            setIsLoading(false);
        }
    }

    const createCity = async (newCityInfo) => {
        try {
            setIsLoading(true);

            // post new city information to update the remote state
            const response = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCityInfo),
                headers: {
                    'Content-Type': "application/json",
                }
            });
            const data = await response.json();

            // update the UI state
            setCities(cities => [...cities, data])
        } catch (error) {
            console.log(error);
            setError("There was an error creating the data");
        } finally {
            setIsLoading(false);
        }
    }

    const deleteCity = async (cityID) => {
        try {
            setIsLoading(true);

            // send a delete request to delete city information from the database (thus updating the remote state)
            await fetch(`${BASE_URL}/cities/${cityID}`, {
                method: "DELETE",
            });

            // update the UI state
            setCities(cities => cities.filter(city => city.id !== cityID))
        } catch (error) {
            console.log(error);
            setError("There was an Error Deleting the City");
        } finally {
            setIsLoading(false);
        }
    }

    return (
    <citiesContext.Provider value={{cities, isLoading, setIsLoading, currentCity, error, getCity, createCity, deleteCity}}>
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