import '../assets/styles/landing.css';
import logo from '../assets/images/YOUTIFY.png';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="d-flex flex-column justify-content-start align-items-start landing-bg min-vh-100 text-white">
      <div className='p-4'>
        <img src={logo} alt="YOUTIFY  " />
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center w-50 flex-grow-1'>
        <h1>Lorem Ipsum</h1>
        <div className='d-flex w-75'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a diam ullamcorper lectus tempor suscipit nec vitae urna. Proin fringilla tellus in iaculis viverra. Vestibulum vehicula dapibus turpis ullamcorper placerat. Pellentesque quis diam condimentum, sollicitudin eros a, congue nunc. Sed ac arcu urna. Proin at dui ut quam porta scelerisque. Cras rutrum dui fringilla fermentum porta. Aenean auctor magna quam, a porta ante lacinia id.</p>
        </div>
        <div className='d-flex flex-column align-items-center w-50 mt-4'>
          <Link to="/register" className='btn btn-danger rounded-pill w-50 mb-4'>Join</Link>
          <p>Already have an account? <span><Link to="/login" className='landing-login'>Log in now</Link></span></p>
        </div>
      </div>
    </div>
  )
}
