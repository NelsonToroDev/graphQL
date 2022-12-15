const courses = [
  {
    _id: 'anyId01',
    title: 'GraphQL course',
    teacher: 'nekTeacher',
    description: 'any description',
    topic: 'any topic',
  },
  {
    _id: 'anyId02',
    title: 'Node course',
    teacher: 'nekTeacher',
    description: 'any description',
    topic: 'any topic',
  },
]

module.exports = {
  Query: {
    getCourses: () => {
      return courses
    },
    getCourse: (root, args) => {
        const course = courses.filter((course) => course._id === args.id);
        return course.pop();
    }
  }
}
