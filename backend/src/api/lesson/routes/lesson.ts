export default {
    routes: [
        {
            method: "GET",
            path: "/lessons/:courseId",
            handler: "lesson.courseLessons",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "POST",
            path: "/lessons/:courseId",
            handler: "lesson.createLesson",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "DELETE",
            path: "/lessons/:courseId/:order",
            handler: "lesson.deleteLesson",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "PATCH",
            path: "/lessons/:courseId/:order",
            handler: "lesson.updateLesson",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
    ],
};
