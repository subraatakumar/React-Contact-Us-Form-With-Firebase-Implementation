import './App.css';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

function App() {

  return (
    <div className="App">
      <form>
        <h1>Contact Form</h1>
        <div className='formInput'>
          <label htmlFor='name'>Name</label>
          <input
            id="formName"
            type="text"
            placeholder='Enter Your Full Name'
          />
        </div>
        <div className='formInput'>
          <label htmlFor='email'>Email</label>
          <input
            id="formEmail"
            type="email"
            placeholder='Enter Your Email'
          />
        </div>
        <div className='formInput'>
          <label htmlFor='details'>DETAILS</label>
          <input
            id="formDetails"
            type="text"
            placeholder='Enter Your Project Details'
          />
        </div>
        <button type="submit">SEND MESSAGE</button>
        <div className='socialIcons'>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </form>
    </div>
  );
}

export default App;
