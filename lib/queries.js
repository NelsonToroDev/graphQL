'use strict'
const connectDB = require('./db')
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorHandler');

module.exports = {
  getCourses: async () => {
    let db
    let courses = []
    try {
      db = await connectDB()
      courses = await db.collection('Courses').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return courses
  },
  getCourse: async (root, { id }) => {
    let db
    let course
    try {
      db = await connectDB()
      course = await db.collection('Courses').findOne({ _id: new ObjectId(id) })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  getPeople: async () => {
    let db
    let people = []
    try {
      db = await connectDB()
      people = await db.collection('Students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return people
  },
  getPerson: async (root, { id }) => {
    let db
    let person
    try {
      db = await connectDB()
      person = await db.collection('Students').findOne({ _id: new ObjectId(id) })
    } catch (error) {
      errorHandler(error)
    }

    return person
  },
  // we need to create indexes into MongoDb in order to support this query
  // In mongosh
  // > use MyDatabase
  // > db.Courses.createIndex({"$**":"text"}) 
  // > db.Students.createIndex({"$**":"text"})
  // two indexes named "text" has been created for each collection and this will be use as argument in the funcion find as $text
  searchItems: async (root, { keyword }) => {
    let db
    let items
    let courses
    let people
    try {
      db = await connectDB()
      courses = await db.collection('Courses').find({ $text: {$search: keyword} }).toArray()
      people = await db.collection('Students').find({ $text: {$search: keyword} }).toArray()
      items = [...courses, ...people] // destructuring
    } catch (error) {
      errorHandler(error)
    }

    return items
  },
}
