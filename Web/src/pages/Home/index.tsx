import React from 'react';
import {FiLogIn} from 'react-icons/fi';
import './index.css';
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div id= "page-home">
            <div className = "content">
            <header>
            <img src={logo} alt="ecolect"/>
            </header>

            <main>
                <h1>Your marketplace to collect waste</h1>
                <p>Help people to find collect points efficiently</p>
                <Link to="/create-point">

                    <span><FiLogIn/></span>
                    <strong>Register collect points</strong>
                    </Link>
            </main>
        </div>
        </div>
    )
}
export default Home;