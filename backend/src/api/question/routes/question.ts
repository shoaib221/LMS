

export default {
    routes: [
        {
            method: "POST",
            path: "/quiz/:quizId/question",
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
            path: "/quiz/:quizId/questions",
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



