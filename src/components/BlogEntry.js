import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './BlogEntry.scss'

const BlogEntry = ({ post }) => (
    <div className="blog-entry">
        <div className="blog-entry__content">
            <p className="blog-entry__date">{ post.meta.date } / { post.meta.categories }</p>
            <Link to={`writing/${post.meta.slug}/`}>
                <h2 className="blog-entry__title">{ post.meta.title }</h2>
            </Link>
            <p className="blog-entry__text">{ post.meta.excerpt }</p>
        </div>
    </div>
)

BlogEntry.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
}

export default BlogEntry