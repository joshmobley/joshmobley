import React from 'react'
import { Nav, Wrapper } from '../components'
import './Header.scss'

const Header = () => (
    <header className="header">
        <Wrapper>
            <h1>Josh Mobley</h1>
        </Wrapper>
        <Nav />
    </header>
)

export default Header