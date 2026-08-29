
export default {
    routes: [
        {
            method: "POST",
            path: "/quiz-test/:quizId",
            handler: "quiz-test.submitQuizTest",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "GET",
            path: "/quiz-result/:quizId",
            handler: "quiz-test.getQuizResult",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
    ],
};


