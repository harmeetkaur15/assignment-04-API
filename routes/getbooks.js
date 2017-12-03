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
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
                reply('This is a Book Libarary');
            }
    },
    {
        method: 'GET',
        path: '/books',
        handler: function (request, reply) {
            mongodb.connect(process.env.URL, function(err, db) {
            var bookapi=db.collection('bookapi')
            bookapi.find().toArray((err,books)=>{
                if (err) {
                    return reply('Error has occured');
                }
                reply(books)
            db.close();
            })
            })
        }
    },

    {
        method: 'GET',
        path: '/books/bookid/{id}',
        handler: function (request, reply) {
            mongodb.connect(process.env.URL, function(err, db) {
            var bookapi=db.collection('bookapi')
            bookapi.find({_id: ObjectId(request.params.id)}).toArray((err, item) => {
            if (err) {
                    return reply('Error has occured');
            }
            reply(book)
            db.close()
            })

            })

        }
    },

    {
        method: 'GET',
        path: '/books/bookname/{bookName}',
        handler: function (request, reply) {
            mongodb.connect(process.env.URL, function(err, db) {
            var bookapi=db.collection('bookapi')
            bookapi.find({title: request.params.bookName}).toArray((err, items) => {
            if (err) {
                    return reply('Error has occured');
            }
            reply(books)
            db.close()
            })

            })

        }
    }
    ]