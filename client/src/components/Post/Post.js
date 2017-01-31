'use strict'

import React, {PropTypes} from 'react'
import Moment from 'moment';
import {Text} from 'rebass'
import './Post.scss'

export default function Post ({ post }) {
  return (
    <div className='post'>
      <Text bold={true}>{post.title}</Text>
      <div className='date'>
        posted on {Moment(post.createdAt).format('MM/DD/YYYY [at] hh:mm:ss A')}
        {
          Moment(post.createdAt).isSame(post.updatedAt, 'second')
            ? null
            : `, edited on ${Moment(post.createdAt).format('MM/DD/YYYY [at] hh:mm:ss A')}`
        }
      </div>
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
