'use strict'

import express from 'express';
import Project from '../../db/models/project';
import Event from '../../db/models/event';

const router = express.Router();

router.param('id', (req, res, next, id) => {
  Project.findById(id)
  .then(project => {
    if (!project) {
      next(new Error('Could not find project'));
    }
    req.project = project;
    next();
  })
  .catch(next);
});

router.get('/', (req, res, next) => {
  Project.findAll({
    where: {userId: req.user.id},
    include: {model: Event}
  })
  .then(projects => res.send({projects}))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Project.create(req.body)
  .then(project => project.setUser(req.user))
  .then(project => Project.findById(project.id, {include: {model: Event}}))
  .then(project => res.send({project}))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  res.send(req.project);
});

router.post('/:id', (req, res, next) => {
  Project.update(req.body, {
    where: {id: req.project.id},
    returning: true
  })
  .then(result => res.send({project: result[1][0]}))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Project.destroy({where: {id: req.params.id}})
  .then(result => res.send(true))
  .catch(next);
});

module.exports = router;
