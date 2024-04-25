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

// queries
// eq - equal
// ne - not equal
// gt - greater than
// gte - greater than or equal to
// lt - less than
// lte - less than or equal to
// in - inside
// nin - not inside

async function getCoursesQueries() {
    const courses = await Course
        .find({ name: { $eq: 'Angular Course' } })
        .limit(10)
        .sort({ name: 1}) // 1 is ascending order
        .select({ name: 1, tags: 1}) // 1 is true
    console.log(courses)
}
// count
async function getCoursesCount() {
    const courses = await Course
        .find({ name: { $eq: 'Angular Course' } })
        .limit(10)
        .sort({ name: 1}) // 1 is ascending order
        .count()
    console.log(courses)
}

// pagination
async function getCoursesPagination() {
    // this params should be recieved
    const pageNumber = 1;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Julian', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1}) // 1 is ascending order
        .select({ name: 1, tags: 1})
    console.log(courses)
}

//getCourses();
//getCoursesQueries();
//getCoursesCount();
//getCoursesPagination();


//updae coruses query first
async function updateCourse1(id) {
    const course = await Course.findById(id);
    if(!course) return;
    // update properties
    course.set({
        isPublished: true,
        author: 'Another Author',
    });
    const result = await course.save();
    console.log(result);
}

//updateCourse1('6626fa14f80b8d02d4db59a4');

// update first - directly
async function updateCourse2(id) {
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: 'Coffee',
            isPublished: false
        }
    });
    console.log(result)
}

//updateCourse2('6626fa14f80b8d02d4db59a4');

// update first - directly findbyID
async function updateCourse3(id) {
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Tekila',
            isPublished: true
        }
    }, {new: true});
    console.log(result)
}

updateCourse3('6626fa14f80b8d02d4db59a4');