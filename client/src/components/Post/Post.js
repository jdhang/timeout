'use strict'

import React, {PropTypes} from 'react'
import {Text} from 'rebass'
import './Post.scss'

export default function Post ({ post }) {
  return (
    <div className='post'>
      <Text bold={true}>{post.title}</Text>
      <div className='body'>{post.body}</div>
      {
        post.tags.length > 0
          ? <div className='tags'>Tags: {post.tags.join(', ')}</div>
          : null
      }
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object
}
