'use strict'

import express from 'express';
import Post from '../../db/models/post';

const router = express.Router();

router.get('/', (req, res, next) => {
  Post.findAll({})
  .then(posts => {
    res.send('No Posts Yet');
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  res.send('No Post Found');
});

router.post('/:id', (req, res, next) => {
});

module.exports = router;
