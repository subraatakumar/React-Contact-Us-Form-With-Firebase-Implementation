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
      apiKey: "AIzaSyAJW7xa3wb_R5qEcFcWZWlynpZCWMbtStU",
      authDomain: "reactfirebasecontactus.firebaseapp.com",
      databaseURL: "https://reactfirebasecontactus-default-rtdb.firebaseio.com/",
      projectId: "reactfirebasecontactus",
      storageBucket: "reactfirebasecontactus.appspot.com",
      messagingSenderId: "865230167286",
      appId: "1:865230167286:web:88f2348b4751a67cd460d7",
      measurementId: "G-EV9NZC9TQH"
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
      console.log("Message Sent Successfully.");
      setTextColor('green');
      setError("Message Sent Successfully.");
      setName('');
      setDetails('');
      setEmail('');
    })
    .catch((error) => {
      console.log("Unable to send data! Please try later...");
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
        <button type="submit">SEND MESSAGE</button>
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
