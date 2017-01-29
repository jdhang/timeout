'use strict'

import express from 'express';
import Post from '../../db/models/post';

const router = express.Router();

router.param('id', (req, res, next, id) => {
  Post.findById(id)
  .then(post => {
    if (!post) {
      res.status(401).send('Could not find post')
    }
    req.post = post;
    next();
  })
  .catch(next);
});

router.get('/', (req, res, next) => {
  Post.findAll({
    where: {userId: req.user.id},
    order: [['createdAt', 'DESC']]
  })
  .then(posts => res.send({posts}))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Post.create(req.body)
  .then(post => post.setUser(req.user))
  .then(post => res.send({post}))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  res.send(req.post);
});

router.post('/:id', (req, res, next) => {
  Post.update(req.body, {where: {id: req.post.id}})
  .then(result => {
    if (result) {
      return Post.findById(req.post.id);
    } else {
      throw new Error('Cound not update post');
    }
  })
  .then(post => res.send({post}))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Post.destroy({where: {id: req.params.id}})
  .then(result => {
    if (result) {
      res.send(true)
    } else {
      throw new Error('Could not delete post');
    }
  })
  .catch(next);
});

module.exports = router;
