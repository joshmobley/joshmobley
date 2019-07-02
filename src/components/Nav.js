import React from 'react'
import { Link } from 'gatsby'
import './Nav.scss'

const Nav = () => (
    <nav className="nav">
        <ul>
            <li><Link to="/" activeClassName="is-active">Home</Link></li>
            <li><Link to="/writing" activeClassName="is-active" partiallyActive>Blog</Link></li>
            <li><Link to="/contact" activeClassName="is-active" partiallyActive>Contact</Link></li>
        </ul>
    </nav>
)

export default Nav