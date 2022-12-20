'use strict'
const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler');

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: '',
    }

    const newCourse = Object.assign(defaults, input)

    let db
    let course
    try {
      db = await connectDB()
      course = await db.collection('Courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return newCourse
  },
  editCourse: async (root, { _id, input }) => {
    let db
    let course
    try {
      db = await connectDB()
      await db
        .collection('Courses')
        .updateOne({ _id: ObjectID(_id) }, { $set: input })

      course = await db.collection('Courses').findOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  deleteCourse: async (root, { _id }) => {
    let db

    try {
      db = await connectDB()
      await db.collection('Courses').deleteOne({ _id: ObjectID(_id) })

    } catch (error) {
      errorHandler(error)
    }

    return true
  },

  addPerson: async (root, { courseId, personId }) => {
    let db
    let course
    let person

    try {
      db = await connectDB()
      course = await db
        .collection('Courses')
        .findOne({ _id: ObjectID(courseId) })
      person = await db
        .collection('Students')
        .findOne({ _id: ObjectID(personId) })

      if (!course || !person) throw new Error('Invalid courseId or personId')

      await db.collection('Courses').updateOne(
        { _id: ObjectID(courseId) },
        // addToSet operator look for existing personId in the arrray if it doesn't exist then personId will be added
        { $addToSet: { people: ObjectID(personId) } }
      )

      course = await db
        .collection('Courses')
        .findOne({ _id: ObjectID(courseId) })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  createPerson: async (root, { input }) => {
    const defaults = {
      alias: '',
    }

    const newPerson = Object.assign(defaults, input)

    let db
    let person
    try {
      db = await connectDB()
      person = await db.collection('Students').insertOne(newPerson)
      newPerson._id = person.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return newPerson
  },
  editPerson: async (root, { _id, input }) => {
    let db
    let person
    try {
      db = await connectDB()
      await db
        .collection('Students')
        .updateOne({ _id: ObjectID(_id) }, { $set: input })

      person = await db.collection('Students').findOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }

    return person
  },
  deletePerson: async (root, { _id }) => {
    let db

    try {
      db = await connectDB()
      await db.collection('Students').deleteOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }

    return true
  },
}
