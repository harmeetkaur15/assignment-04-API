'use strict';

const Joi = require('joi');
const mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

const book_schema={
    title:Joi.string(),
    author:Joi.string(),
    genre:Joi.string(),
    publish:Joi.object().keys({
        dateofpublication:Joi.date(),
        publishername:Joi.string()
    }),
    copies:Joi.object().keys({
        edition:Joi.number(),
        quantity:Joi.number(),
        availability:Joi.string()
    })
};

module.exports= [
{
        method: 'POST',
        path: '/books',
        handler: function (request, reply) {

            const book = request.payload;
            mongodb.connect(process.env.URL, function(err, db) {
            var bookapi=db.collection('bookapi')
            bookapi._id = ObjectId();
            bookapi.insert(book, (err, books) => {

                if (err) {
                    return reply('Error has occured');
                }

                reply(book);
            db.close();
            })
            })
        },
        config: {
            validate: {
                payload: {
                    title: Joi.string().required(),
                    author: Joi.string().required(),
                    genre: Joi.string().required(),
                    publish: Joi.object().required().keys({
                        dateofpublication:Joi.date().required(),
                        publishername:Joi.string().required()
                    }),
                    copies: Joi.object().required().keys({
                        edition:Joi.number().required(),
                        quantity:Joi.number().required(),
                        availability:Joi.string().required()
                    })
                }
            }
        }
    }
]