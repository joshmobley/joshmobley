import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './BlogEntry.scss'

const BlogEntry = ({ post }) => (
    <div className="blog-entry">
        <Link to={ post.link } className="blog-entry__image">
            <img src={ post.image } />
        </Link>
        <div className="blog-entry__content">
            <Link to={ post.link }>
                <h2 className="blog-entry__title">{ post.frontmatter.title }</h2>
            </Link>
            <p className="blog-entry__text">{ post.frontmatter.excerpt }</p>
        </div>
    </div>
)

BlogEntry.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default BlogEntry