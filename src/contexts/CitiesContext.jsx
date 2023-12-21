import { createContext, useContext, useEffect, useReducer} from "react"

const BASE_URL = "http://localhost:9000"
const citiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ""
}

function reducer(state, action) {
    // the reducer should contain as much business logic as possible
    // but it must remain a pure function THUS should not contain our fetch request
    // my point is when asynchronous data/code is involved we dont get the benefit of just passing the dispatch function into the context INSTEAD of have handlers like createCity, deleteCity, getCity e.t.c

    // remember follow a naming convention when dealing with action types. modelling the actions as event instead of setters 
    // e.g NOT setCitieS INSTEAD cities/loaded' e.t.c 
    // another reason is that it may contain more logic than just setting a state

    switch(action.type){
        case 'loading':
            return {...state, isLoading: true}

        case 'cities/loaded':
            return {
                ...state, 
                isLoading: false, 
                cities: action.payload
            }

        case 'city/loaded':
            return {
                ...state, 
                currentCity: action.payload, 
                error: initialState.error, 
                isLoading: false
            }

        case 'city/created':
            return {
                ...state, 
                cities: [...state.cities, action.payload], 
                isLoading: false,
                currentCity: action.payload,
            }

        case 'city/deleted':
            return {
                ...state, 
                cities: state.cities.filter(city => city.id !== action.payload), 
                isLoading: false,
                currentCity: {}
            }

        case 'rejected':
            return {
                ...state, 
                isLoading: false, 
                error: action.payload
            }
        

        default: 
            throw new Error("Unknow action type");
    }
}

const CitiesContext = ({children}) => {

    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});
    // const [error, setError] = useState("");
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState)

    useEffect(()=>{
        async function fetchCities() {
            dispatch({type: "loading"})

            try {
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                dispatch({type: 'cities/loaded', payload: data})
            } catch (err) {
                dispatch({type: 'rejected', payload: 'There was an error when loading cities data...'})
            } 
        }

        fetchCities();
    }, [])

    const getCity = async (id) => {

        if (Number(id) === currentCity.id ) return;

        dispatch({type: "loading"})
            
        try {
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();

            if (data === {}) dispatch({type: 'rejected', payload: 'City Does not Exist in the database' })
            else dispatch({type: 'city/loaded', payload: data})
        } catch (error) {
            dispatch({type: 'rejected', payload: 'There was an error when loading the cities data '})
        }
    }
    
    const createCity = async (newCityInfo) => {

        dispatch({type: "loading"})
            
        try {
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
            dispatch({type: 'city/created', payload: data})
        } catch (error) {
            dispatch({type: 'rejected', payload: 'There was an error creating the data...'})
        }
    }

    const deleteCity = async (cityID) => {

        dispatch({type: "loading"})
            
        try {
            // send a delete request to delete city information from the database (thus updating the remote state)
            await fetch(`${BASE_URL}/cities/${cityID}`, {
                method: "DELETE",
            });

            // update the UI state
            dispatch({type: 'city/deleted', payload: cityID});
        } catch (error) {
            dispatch({type: 'rejected', payload: 'There was an Error Deleting the City...'})
        }
    }

    return (
    <citiesContext.Provider value={{cities, isLoading, currentCity, error, getCity, createCity, deleteCity}}>
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
