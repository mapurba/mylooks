const AdminTask = require('../models/adminTask');


exports.getAllTask = (req, res) => {
    AdminTask.find({}).sort('-createdAt').then((result) => {
        res.status(200).send(result);
    }).catch((err) => { res.status(489); });

};