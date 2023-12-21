
import { useState } from 'react'

const useGeolocation = (defaultLocation=null) => {

    const [position, setPosition] = useState(defaultLocation);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function fetchLocation(){

        if (!navigator.geolocation) return setError("Your browser does not support geolocation");
    
        setIsLoading(true);
    
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        )
    }

    return { isLoading, position, error, fetchLocation };
}

export default useGeolocation;