
export default {
    routes: [
        {
            method: "POST",
            path: "/quiz",
            handler: "quiz.createQuiz",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "GET",
            path: "/course/:courseId/quizzes",
            handler: "quiz.courseQuizes",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "DELETE",
            path: "/quiz/:quizId",
            handler: "quiz.deleteQuiz",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "PATCH",
            path: "/quiz/:quizId",
            handler: "quiz.updateQuiz",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "GET",
            path: "/quiz/:quizId",
            handler: "quiz.getQuiz",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
    ],
};


