const router = require('express').Router();
const {
  models: { Item },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    res.send(200, item);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireToken, isAdministrator, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.update(req.body);
    res.send(item);
  } catch (err) {
    next(err);
  }
});
