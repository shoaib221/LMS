export default {
    routes: [

        {
            method: "GET",
            path: "/courses/my",
            handler: "course.fetchInstructorCourses",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "POST",
            path: "/courses",
            handler: "course.createCourse",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "GET",
            path: "/courses",
            handler: "course.fetchCourses",
            config: {
                auth: false,
            },
        },



    ],
};

