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
        method: 'DELETE',
        path: '/books/{id}',
        handler: function (request, reply) {
            mongodb.connect(process.env.URL, function(err, db) {
            var bookapi=db.collection('bookapi')
            bookapi.findOneAndDelete({_id: ObjectId(request.params.id)}, function(err,items){
                if (err) {
                    return reply('Error has occured');
                }
                reply('Books Deleted')
            db.close();
            });
            });
        }
    }
]