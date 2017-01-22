'use strict'

import React, {PropTypes} from 'react'
import './Post.scss'

export default function Post ({ post }) {
  return (
    <div className='post'>
      <div className='title'>{post.title}</div>
      <div className='body'>{post.body}</div>
      <div className='tags'>Tags: {post.tags.join(', ')}</div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object
}
