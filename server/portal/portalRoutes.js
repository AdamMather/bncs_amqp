const express = require('express');
const router = express.Router();

const portalController = require('./portalController');

/**
 * GET /carddata
 * Example: /api/portal/carddata
 * Get 
 */
router.get('/carddata', portalController.getCardData);

/**
 * GET /libdata
 * Example: /api/portal/libdata
 * Get c++ library data
 */
router.get('/libdata', portalController.getLibraryData);

/**
 * GET /status
 * Example: /api/portal/status
 * Get rag status
 */
router.get('/status/', portalController.getRagStatus);

/**
 * GET /panel
 * Example: /api/portal/panel
 * Get panel attributes
 */
router.get('/panel/', portalController.getPanelAttributes);


/**
 * GET /products
 * Example: /api/portal/products
 * Get all products
 */
router.get('/products', portalController.getProducts);

/**
 * GET /commission
 * Example: /api/portal/commission
 * Get the project commission by month forecast information
 */
router.get('/commission', portalController.getProjectCommissionByMonth);

module.exports = router;
