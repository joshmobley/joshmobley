import React from 'react'
import { Header, Footer } from '../components'
import './Layout.scss'

const Layout = ({ children }) => (
    <main>
        <Header />
        { children }
        <Footer />
    </main>
)

export default Layout