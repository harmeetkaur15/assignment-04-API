'use strict';

const Joi = require('joi');
const mongodb = require('mongodb').MongoClient;
require('dotenv').config();
var ObjectId = require('mongodb').ObjectID;

module.exports= [
{
        method: 'DELETE',
        path: '/users/{id}',
        handler: function (request, reply) {
            mongodb.connect(process.env.URL, function(err, db) {
            var users=db.collection('users')
            users.findOneAndDelete({_id: ObjectId(request.params.id)}, function(err,user){
                if (err) {
                    return reply('Error has occured');
                }
                reply('User Deleted')
            db.close();
            });
            });
        }
    }
    ]