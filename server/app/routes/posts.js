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
  Post.findAll({})
  .then(posts => res.send({posts}))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  res.send(req.post);
});

router.post('/:id', (req, res, next) => {
  Post.update(req.body, {where: {id: req.post.id}})
  .then(post => res.send(post))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Post.destroy({where: {id: req.params.id}})
  .then(result => res.send(true))
  .catch(next);
});

module.exports = router;
