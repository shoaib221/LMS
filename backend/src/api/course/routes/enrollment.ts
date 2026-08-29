export default {
    routes: [
        {
            method: "POST",
            path: "/courses/enroll",
            handler: "enrollment.enroll",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "GET",
            path: "/courses/enrolled-courses",
            handler: "enrollment.enrolledCourses",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
    ],
};

