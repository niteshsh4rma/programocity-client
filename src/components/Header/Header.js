import React from 'react'
import './Header.css'

function Header() {
    return (
        <div className="header">
            <div className="header__logo">
                <img src="https://www.pngkit.com/png/full/97-973249_logo-maker-circle-logo-maker.png" className="header__logoImage"/>
                <div className="header__title">
                    Programocity
                </div>
            </div>
        </div>
    )
}

export default Header
