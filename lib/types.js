'use strict'

const connectDB = require('./db')
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorHandler');

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
                ids = people ? people.map(id => new ObjectId(id)) : []
                // $in operator will look for specific id into a collection of ids
                peopleData = ids.length > 0 
                    ? await db.collection('Students').find({ _id: { $in: ids }}).toArray()
                    : []

            } catch (error) {
                errorHandler(error)
            }

            return peopleData;
        }
    },
    Person: {
        // __resolveType is a property for interface to know the specific type
        __resolveType: (person, context, info) => {
            if(person.phone){
                return 'Monitor'
            }

            return 'Student'
        }
    },
    GlobalSearch: {
        __resolveType: (item, contect, infor) => {
            if (item.title){
                return 'Course'
            }

            if(item.phone){
                return 'Monitor'
            }

            return 'Student'
        }
    }
}