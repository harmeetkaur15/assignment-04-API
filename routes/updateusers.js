'use strict';

const Joi = require('joi');
const mongodb = require('mongodb').MongoClient;
require('dotenv').config();
var ObjectId = require('mongodb').ObjectID;

module.exports= [
{
        method: 'PUT',
        path: '/users/{id}',
        handler: function (request, reply) {
            mongodb.connect(process.env.URL, function(err, db) {
            var users=db.collection('users')
            users.update({_id: ObjectId(request.params.id)}, {$set: request.payload}, function (err, user) {
                if (err) {
                    return reply('Error has occured');
                }
                return reply('User Updated').code(204);
            db.close();
            })
            })
        },
        config: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    email: Joi.string().email(),
                    booksborrowed: Joi.object().required().keys({
                      bookid:Joi.number().required(),
                      issuedate:Joi.date().required(),
                      duedate:Joi.date().required()
                    }),
                    booksreservedID:Joi.number().required(),
                    latefees:Joi.number().required(),
                }
            }
        }
    }
    ]