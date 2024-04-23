import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log("Error: ", err))

// create schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

// Classes, Objects
// Course, modeCourse

// Models
const Course = mongoose.model('Course', courseSchema); // Course is a class

// create the object
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Julian',
        tags: ['angular', 'frontEnd'],
        isPublished: true,
    })

    const result = await course.save();
    console.log(result);
}

//createCourse();


async function getCourses() {
    const courses = await Course
        .find({ author: 'Julian', isPublished: true})
        .limit(10)
        .sort({ name: 1}) // 1 is ascending order
        .select({ name: 1, tags: 1}) // 1 is true
    console.log(courses)
    
}

getCourses();