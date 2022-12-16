# GraphQL with NodeJS project

## Some Example of Queries and Mutations supported
+ Query with Alias and Fragments
<pre><code>
{
  AllCourses: getCourses {
    _id
    ...CourseFields
  }
  
  GraphQLCourse: getCourse(id: "639bbfd73cab3e6d46500fb0") {
    _id
    ...CourseFields
  }
  
  NodeCourse: getCourse(id: "639bbfd73cab3e6d46500fb1") {
    _id
    ...CourseFields
    teacher
  }
}

fragment CourseFields on Course{
  title
  description
  people {
    _id
    name
  }
}
</code></pre>

## Mutation with variables
<pre><code>
mutation AddPersonToCourse($courseid: ID!, $personid: ID!)
{
	addPerson(courseId: $courseid, personId: $personid){
    _id
    title
    description
    people{
      name
    }
  }
}
</code></pre>
#### Variables
<pre><code>
{
  "courseid": "639bbfd73cab3e6d46500fb1",
  "personid": "639bd9e639b3cdc8712277c4"
}
</code></pre>




