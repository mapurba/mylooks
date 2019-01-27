const AdminTask = require('../models/adminTask');
const UserMedias = require('../models/UserMedias');
const async = require('async');

exports.getAllTask = (req, res) => {
    AdminTask.find({}).sort('-createdAt').then((result) => {
        res.status(200).send(result);
    }).catch((err) => { res.status(489); });

};

exports.approveTask =(req,res)=>{

    let BlogPhotosId=[];
    let newBlogMedias=req.body.usermedia;

    // for (const iterator of newBlogMedias) {
    //     BlogPhotosId.push({user:req.body.user.id,BlogPhotoId:iterator.id,productLink:iterator.productLink});
    // }

    async.eachSeries(newBlogMedias, function updateObject (obj, done) {
        // Model.update(condition, doc, callback)
        console.log('updating userphoto',obj.id);
        UserMedias.update({ id: obj.id }, { $set : { productLink: obj.productLink }}, done);
    }, function allDone (err) {
        // this will be called when all the updates are done or an error occurred during the iteration
        if(err){
            res.sendStatus(489);
        }
        res.status(200).send({msg:'done'});
    });
    

   // res.send(200);
};

exports.getallblog=(req,res)=>{

    BlogPhotos.find({},(err,result)=>{
        res.status(200).send(result);
    })
};