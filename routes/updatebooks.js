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
        method: 'PUT',
        path: '/books/{id}',
        handler: function (request, reply) {
            mongodb.connect(process.env.URL, function(err, db) {
            var bookapi=db.collection('bookapi')
            bookapi.update({_id: ObjectId(request.params.id)}, {$set: request.payload}, function (err, items) {
                if (err) {
                    return reply('Error has occured');
                }
                
                return reply('Book Updated').code(204);
            db.close();
            })
            })
        },
        config: {
            validate: {
                payload: {
                    title: Joi.string().optional(),
                    author: Joi.string().optional(),
                    genre: Joi.string().optional(),
                    publish: Joi.object().optional().keys({
                        dateofpublication:Joi.date().optional(),
                        publishername:Joi.string().optional()
                    }),
                    copies: Joi.object().optional().keys({
                        edition:Joi.number().optional(),
                        quantity:Joi.number().optional(),
                        availability:Joi.string().optional()
                    })
                }
            }
        }
    }
    ]