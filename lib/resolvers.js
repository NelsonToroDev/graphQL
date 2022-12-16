'use strict'
const connectDB = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
  Query: {
    getCourses: async () => {
      let db;
      let courses = [];
      try {
        db = await connectDB();
        courses = await db.collection('Courses').find().toArray();
      } catch (error) {
        console.error(error);
      }
        return courses;
    },
    getCourse: async (root, { id }) => {
        let db;
        let course;
        try {
            db = await connectDB();
            course = await db.collection('Courses').findOne({ _id: ObjectID(id)});
        } catch (error) {
            
        }

        return course;
    }
  }
}
