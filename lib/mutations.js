'use strict'
const connectDB = require('./db')
const { ObjectID } = require('mongodb')

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
      console.error(error)
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
      console.error(error)
    }

    return course
  },
  deleteCourse: async (root, { _id }) => {
    let db
    let courses
    try {
      db = await connectDB()
      await db.collection('Courses').deleteOne({ _id: ObjectID(_id) })

      courses = await db.collection('Courses').find().toArray()
    } catch (error) {
      console.error(error)
    }

    return courses
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
      console.error(error)
    }

    return course
  },

  createStudent: async (root, { input }) => {
    const defaults = {
      alias: '',
    }

    const newStudent = Object.assign(defaults, input)

    let db
    let student
    try {
      db = await connectDB()
      student = await db.collection('Students').insertOne(newStudent)
      newStudent._id = student.insertedId
    } catch (error) {
      console.error(error)
    }

    return newStudent
  },
  editStudent: async (root, { _id, input }) => {
    let db
    let student
    try {
      db = await connectDB()
      await db
        .collection('Students')
        .updateOne({ _id: ObjectID(_id) }, { $set: input })

      student = await db.collection('Students').findOne({ _id: ObjectID(_id) })
    } catch (error) {
      console.error(error)
    }

    return student
  },
  deleteStudent: async (root, { _id }) => {
    let db
    let students
    try {
      db = await connectDB()
      await db.collection('Students').deleteOne({ _id: ObjectID(_id) })

      students = await db.collection('Students').find().toArray()
    } catch (error) {
      console.error(error)
    }

    return students
  },
}
