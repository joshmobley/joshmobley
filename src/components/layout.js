import React from 'react'
import { Header } from '../components'
import './Layout.scss'

const Layout = ({ children }) => (
    <main>
        <Header />
        { children }
    </main>
)

export default Layout