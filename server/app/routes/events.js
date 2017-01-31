'use strict'

import express from 'express';
import Moment from 'moment';
import Event from '../../db/models/event';
import Post from '../../db/models/post';
import Project from '../../db/models/project';

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

router.get('/today', (req, res, next) => {
  const utcOffset = +req.params.utcOffset;
  const today = Moment();
  Event.findAll({
    where: {
      userId: req.user.id,
      createdAt: {
        $lt: today.endOf('day').toDate(),
        $gte: today.startOf('day').toDate()
      }
    },
    order: [['endTime', 'DESC']]
  })
  .then(events => res.send({events}))
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
  req.body.userId = req.user.id;
  Event.create(req.body)
  .then(event => Event.findById(event.id))
  .then(event => res.send({event}))
  .catch(next);
});

router.get('/current', (req, res, next) => {
  Event.findOne({
    where: {
      userId: req.user.id,
      status: 'in-progress'
    },
    include: {model: Post}
  })
  .then(event => res.send({event}))
  .catch(next);
});


router.get('/:id', (req, res, next) => {
  res.send({event: req.event});
});

router.post('/:id/end', (req, res, next) => {
  const endingEvent = {...req.event};
  endingEvent.endTime = new Date();
  endingEvent.status = 'completed';
  Event.update(endingEvent, {where: {id: req.event.id}})
  .then(result => {
    if (result) {
      return Event.findById(req.event.id)
    } else {
      throw new Error('Could not end event');
    }
  })
  .then(event => res.send({event}))
  .catch(next);
});

router.post('/:id', (req, res, next) => {
  Event.update(req.body, {
    where: {id: req.event.id}
  })
  .then(result => {
    if (result) {
      return Event.findById(req.event.id)
    } else {
      throw new Error('Could not update event');
    }
  })
  .then(event => res.send({event}))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Event.destroy({where: {id: req.params.id}})
  .then(result => {
    if (result) {
      res.send(true)
    } else {
      throw new Error('Could not delete event');
    }
  })
  .catch(next);
});

module.exports = router;
