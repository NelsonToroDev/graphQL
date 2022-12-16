'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
    Course: {
        // Resolves people field into Courses
        people: async ({people}) => {
            let db
            let peopleData;
            let ids

            try {
                db = await connectDB()
                // when there is not people field in the DB then use an empty array
                ids = people ? people.map(id => ObjectID(id)) : []
                // $in operator will look for specific id into a collection of ids
                peopleData = ids.length > 0 
                    ? await db.collection('Students').find({ _id: { $in: ids }}).toArray()
                    : []

            } catch (error) {
                console.error(error);
            }

            return peopleData;
        }
    }
}