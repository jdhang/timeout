'use strict'

import express from 'express';
import Event from '../../db/models/event';

const router = express.Router();

router.param('id', (req, res, next, id) => {
  Event.findById(id)
  .then(event => {
    if (!event) {
      next(new Error('Could not find event'));
    }
    req.event = event;
    next();
  })
  .catch(next);
});

router.get('/', (req, res, next) => {
  Event.findAll({})
  .then(posts => res.send(posts))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  res.send(req.event);
});

router.event('/:id', (req, res, next) => {
  Event.update(req.body, {where: {id: req.event.id}})
  .then(event => res.send(event))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Event.destroy({where: {id: req.params.id}})
  .then(result => res.send(true))
  .catch(next);
});

module.exports = router;
