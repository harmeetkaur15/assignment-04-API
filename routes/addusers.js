'use strict';

const Joi = require('joi');
const mongodb = require('mongodb').MongoClient;
require('dotenv').config();
var ObjectId = require('mongodb').ObjectID;

module.exports= [
 {
        method: 'POST',
        path: '/users',
        handler: function (request, reply) {

            const item = request.payload;
            mongodb.connect(process.env.URL, function(err, db) {
            var users=db.collection('users')
            users._id = ObjectId();
            users.insert(item, (err, user) => {

                if (err) {
                    return reply('Error has occured');
                }

                reply(item);
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