const portalService = require('./portalService');

var exports = module.exports = {};

exports.getCardData = function(req, res) {

  var filter = req.query.searchStr ? req.query.searchStr : null;

  portalService.getCardData(filter)
  .then(data => res.status(200).send(data));  
};

exports.getLibraryData = function(req, res) {

  var filter = req.query.searchStr ? req.query.searchStr : null;

  portalService.getLibraryData(filter)
  .then(data => res.status(200).send(data));  
};

exports.getRagStatus = function(req, res) {

  var status = req.query.status ? req.query.status : 0;

  portalService.getRagStatus(status)
  .then(data => res.status(200).send(data));  
};

exports.getPanelAttributes = function(req, res) {

  portalService.getPanelAttributes()
  .then(data => res.status(200).send(data));  
};



exports.getProducts = function (req, res) {

  var filter = req.query.prodnum ? req.query.prodnum : null;

  portalService.getProducts(filter)
  .then(data => res.status(200).send(data));
};

exports.getProjectCommissionByMonth = function (req, res) {

    var searchStrFilter = req.query.searchStr ? req.query.searchStr : null;

    portalService.getProjectCommissionsByMonth(searchStrFilter)
      .then(data => res.status(200).send(data));
};

