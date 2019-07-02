import React from 'react'
import './Section.scss'

const Section = ({ children, className}) => (
    <section className={`section ${className}`}>
        { children }
    </section>
)

export default Section