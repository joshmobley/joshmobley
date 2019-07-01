import React from 'react'
import { Link } from 'gatsby'
import './Nav.scss'

const Nav = () => (
    <nav className="nav">
        <ul>
            <li><Link to="/" activeClassName="is-active">Home</Link></li>
            <li><Link to="/blog" activeClassName="is-active">Blog</Link></li>
            <li><Link to="/contact" activeClassName="is-active">Contact</Link></li>
        </ul>
    </nav>
)

export default Nav