import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <header className="header">
            <nav className='nav'>
                <div className="logo">
                    <img src="./images/logo.png" alt="Logo" />
                </div>

                <div className="input-group">
                    <input 
                        type="text" 
                        name="search" 
                        id="search" 
                        className='form-control'
                        placeholder='Enter Product Name...'
                    />
                    <div className="input-group-append">
                        <button id="search_btn" className="btn">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <div className='header-btns'>
                    <Link to='/login'>
                        <button className="btn" id="login_btn">Login</button>
                    </Link>
                    <div className="cart-group">
                        <span id="cart" >Cart</span>
                        <span id="count" >2</span>
                    </div>
                </div>
            </nav>
        </header>
    </>
  )
}

export default Header