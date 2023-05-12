import React from 'react'

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
                    <button className="btn" id="login_btn">Login</button>
                    <span id="cart" className="">Cart</span>
                </div>
            </nav>
        </header>
    </>
  )
}

export default Header