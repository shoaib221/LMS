export default {
    routes: [
        {
            method: "POST",
            path: "/courses",
            handler: "enrollment.createCourse",
            config: {
                auth: {},
            },
        },
        {
            method: "GET",
            path: "/courses",
            handler: "enrollment.fetchCourses",
            config: {
                auth: false,
            },
        },
        {
            method: "GET",
            path: "/courses/by-instructor",
            handler: "enrollment.fetchInstructorCourses",
            config: {
                auth: {},
            },
        },
        {
            method: "POST",
            path: "/courses/enroll",
            handler: "enrollment.enroll",
            config: {
                auth: {},
            },
        },
        {
            method: "GET",
            path: "/courses/enrolled-courses",
            handler: "enrollment.enrolledCourses",
            config: {
                auth: {},
            },
        },



    ],
};

