'use strict';

const Joi = require('joi');
const mongodb = require('mongodb').MongoClient;
require('dotenv').config();
var ObjectId = require('mongodb').ObjectID;

module.exports= [    

    {
        method: 'GET',
        path: '/users',
        handler: function (request, reply) {
            mongodb.connect(process.env.URL, function(err, db) {
            var users=db.collection('users')
            users.find().toArray((err,user)=>{
                if (err) {
                    return reply('Error has occured');
                }
                reply(user)
            db.close();
            })
            })
        }
    },

    {
        method: 'GET',
        path: '/users/searchid/{id}',
        handler: function (request, reply) {
            mongodb.connect(process.env.URL, function(err, db) {
            var users=db.collection('users')
            users.find({_id: ObjectId(request.params.id)}).toArray((err, user) => {
            if (err) {
                    return reply('Error has occured');
            }
            reply(user)
            db.close()
            })

            })

        }
    },

    {
        method: 'GET',
        path: '/users/serachbyname/{userName}',
        handler: function (request, reply) {
            mongodb.connect(process.env.URL, function(err, db) {
            var users=db.collection('users')
            users.find({name: request.params.userName}).toArray((err, user) => {
            if (err) {
                    return reply('Error has occured');
            }
            reply(user)
            db.close()
            })

            })

        }
    }
    ]