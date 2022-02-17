import './App.css';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [db, setDb] = useState(null);
  const [error, setError] = useState('');
  const [textColor, setTextColor] = useState('green');

  useEffect(()=>{
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);    
    setDb(getDatabase(app));
  },[])

  const handleSubmit = (e) =>{
    e.preventDefault();
    const data = {
      name,
      email,
      details
    }
    console.log(data);
    const currentTimeStamp = Date.now();
    // currentTimeStamp is used as key to separate data sets
    set(ref(db, `contactus/${currentTimeStamp}`), data)
    .then(() => {
      //console.log("Message Sent Successfully.");
      setTextColor('green');
      setError("Message Sent Successfully.");
      setName('');
      setDetails('');
      setEmail('');
    })
    .catch((error) => {
      //console.log("Unable to send data! Please try later...");
      setTextColor('red');
      setError("Unable to send data! Please try later...");
      setTimeout(()=>{
        setError('');
      },5000) // Error will removed after 5 seconds
    })
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Contact Us</h1>
        <div className='formInput'>
          <label htmlFor='name'>Name</label>
          <input
            id="formName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Your Full Name'
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='email'>Email</label>
          <input
            id="formEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Your Email'
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='details'>DETAILS</label>
          <input
            id="formDetails"
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder='Enter Your Project Details'
            required
          />
        </div>
        <div>
          <button type="submit">SEND MESSAGE</button>
        </div>
        <div className='socialIcons'>
          <span className="socialBtn"><FaInstagram /></span>
          <span className="socialBtn"><FaTwitter /></span>
          <span className="socialBtn"><FaYoutube /></span>
        </div>
        <p style={{color:textColor}}>
          {error}
        </p>
      </form>
    </div>
  );
}

export default App;
