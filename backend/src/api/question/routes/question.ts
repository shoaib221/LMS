

export default {
    routes: [
        {
            method: "POST",
            path: "/question/:quizId",
            handler: "question.createQuestion",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "GET",
            path: "/question/:quizId",
            handler: "question.quizQuestions",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "DELETE",
            path: "/question/:questionId",
            handler: "question.deleteQuestion",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },

    ],
};



