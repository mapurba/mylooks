
var express = require('express'),
    adminRouter = express.Router();

/**
* API keys and Passport configuration.
*/
const passport = require('passport');
const passportConfig = require('../config/passport');
const adminController=require('../controllers/admin')


adminRouter.get('/tasklist', passportConfig.isAuthenticatedAdmin,  adminController.getAllTask);
// adminRouter.delete('/tasklist',passportConfig.isAuthenticatedAdmin,  apiController.deleteAdminTask);
// adminRouter.post('/task/approve',passportConfig.isAuthenticatedAdmin,apiController.approveTask)


module.exports = adminRouter;