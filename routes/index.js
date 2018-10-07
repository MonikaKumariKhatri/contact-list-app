var express = require('express');
var router = express.Router();
var h = require('../helpers');

/* GET home page. */
router.get('/api/about', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send({'data':'This is About Contact Application. Click on Contacts for more details!!'});
});

router.get('/api/contacts', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  h.getContacts(res);
});

router.get('/api/contacts/:id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  h.getContactById(req.params.id, res);
});

router.put('/api/editContact', function(req, res, next) {
  h.editContact(req.body, res);
});

router.post('/api/addContact', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  h.addContact(req.body, res);
});

router.put('/api/deleteContact/:id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  h.deleteContact(req.params.id, res);
});

module.exports = router;
