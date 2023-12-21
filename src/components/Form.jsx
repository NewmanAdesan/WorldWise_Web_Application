// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect } from "react";
import { useState } from "react";
import useUrlPosition from "../hooks/useUrlPosition";

import Message from '../components/Message'
import Spinner from '../components/Spinner'
import Button from "../components/Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useCitiesContext } from "../contexts/CitiesContext";

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  
  const [lat, lng] = useUrlPosition();
  const {createCity, isLoading} = useCitiesContext();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isGeolocationLoading, setIsGeolocationLoading] = useState(false);
  const [error, setError] = useState("");
  const [emoji, setEmoji] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    if (!lat || !lng) return;
    const fetchReverseGeoCode = async function () {
      try {
        setIsGeolocationLoading(true);
        setError("");

        const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await response.json();

        if (!data.countryName) setError("That does not seem to be a city, Click somewhere else");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));

      } catch (error) {
        setError(error.message);
      } finally {
        setIsGeolocationLoading(false)
      }
    }

    fetchReverseGeoCode();
  }, [lat, lng])

  async function handleSubmit(e) {
    // prevent hard reload
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position : { lat, lng }
    }

    await createCity(newCity);

    // programmatically navigate to the app page
    navigate('/app/cities')

  }

  if (isGeolocationLoading) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (error !== "" ) return <Message message={error} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City Name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} id={date} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" >Add</Button>
        <Button type="back"  handleClick={(e)=>{
            e.preventDefault();
            navigate(-1);
        }}>
            &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
