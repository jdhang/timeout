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
  Event.findAll({
    where: {userId: req.user.id},
    order: [['endTime', 'DESC']]
  })
  .then(events => res.send({events}))
  .catch(next);
});

router.post('/', (req, res, next) => {
  req.body.startTime = new Date();
  Event.create(req.body)
  .then(event => event.setUser(req.user))
  .then(event => res.send({event}))
  .catch(next);
});

router.get('/current', (req, res, next) => {
  Event.findOne({
    where: {
      userId: req.user.id,
      status: 'in-progress'
    }
  })
  .then(event => res.send({event}))
  .catch(next);
});


router.get('/:id', (req, res, next) => {
  res.send(req.event);
});

router.post('/:id/end', (req, res, next) => {
  const endingEvent = {...req.event};
  endingEvent.endTime = new Date();
  endingEvent.status = 'completed';
  Event.update(endingEvent, {
    where: {id: req.event.id},
    returning: true
  })
  .then(result => res.send({event: result[1][0]}))
  .catch(next);
});

router.post('/:id', (req, res, next) => {
  Event.update(req.body, {where: {id: req.event.id}})
  .then(event => res.send({event}))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Event.destroy({where: {id: req.params.id}})
  .then(result => res.send(true))
  .catch(next);
});

module.exports = router;
