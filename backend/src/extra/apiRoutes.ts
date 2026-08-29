


export const apiRoutes = [
    {
        path: "/auth/register",
        method: "POST",
        required_fields: [
            "username", "email", "password"
        ],
        access: ["public"]
    },
    {
        path: "/auth/login",
        method: "POST",
        required_fields: [
            "email", "password"
        ],
        access: ["public"]
    },
    {
        method: "GET",
        path: "/auth/me",
        required_fields: [],
        access: [
            "all users"
        ]
    },
    {
        method: "POST",
        path: "/api/courses",
        description: "create course",
        required_fields: ["title", "description"],
        access: [
            "instructor", "admin", "content-manager"
        ]
    },
    {
        method: "GET",
        path: "/api/courses/my",
        description: "instructed courses",
        required_fields: [],
        access: [
            "instructor", "admin", "content-manager"
        ]
    },
    {
        method: "GET",
        path: "/api/courses",
        description: "fetch courses",
        required_fields: [],
        access: [
            "public"
        ]
    },
    {
        method: "GET",
        path: "/api/courses/enrolled-courses",
        description: "fetch enrolled courses",
        required_fields: [],
        access: [
            "student"
        ]
    },
    {
        method: "POST",
        path: "/api/lessons/:courseId",
        description: "create lesson",
        required_fields: ["title", "content", "videoURL", "order"],
        access: [
            "admin", "instructor", "content-manager"
        ]
    },
    {
        method: "POST",
        path: "/api/quiz",
        description: "create quiz",
        required_fields: ["title", "description", "courseId"],
        access: [
            "admin", "instructor", "content-manager"
        ]
    },
    {
        method: "GET",
        path: "/api/lessons/:courseId",
        description: "course lessons",
        required_fields: [],
        access: [
            "admin", "instructor", "content-manager", "enrolled students"
        ]
    },
    {
        method: "DELETE",
        path: "/api/lessons/:courseId/:order",
        description: "delete lesson",
        required_fields: [],
        access: [
            "admin", "instructor", "content-manager"
        ]
    },
    {
        method: "PATCH",
        path: "/api/lessons/:courseId/:order",
        description: "update lesson",
        required_fields: [],
        access: [
            "admin", "instructor", "content-manager"
        ]
    },
    {
        method: "DELETE",
        path: "/api/quiz/:quizId",
        description: "delete quiz",
        required_fields: [],
        access: [
            "admin", "instructor", "content-manager"
        ]
    },
    {
        method: "GET",
        path: "/api/quiz/:courseId",
        description: "fetch quizzes",
        required_fields: [],
        access: [
            "admin", "instructor", "content-manager", "enrolled students"
        ]
    },
    {
        method: "PATCH",
        path: "/api/quiz/:quizId",
        description: "update quiz",
        required_fields: [],
        access: [
            "admin", "instructor", "content-manager"
        ]
    },
    {
        method: "POST",
        path: "/api/question/:quizId",
        description: "create question",
        required_fields: [
            "question", "optionA", "optionB",
            "optionC", "optionD", "correctAnswer",
            "order"
        ],
        access: [
            "admin", "instructor", "content-manager"
        ]
    },
    {
        method: "DELETE",
        path: "/api/question/:questionId",
        description: "delete question",
        required_fields: [

        ],
        access: [
            "admin", "instructor", "content-manager"
        ]
    },
    {
        method: "GET",
        path: "/api/question/:quizId",
        description: "fetch questions",
        required_fields: [

        ],
        access: [
            "admin", "instructor", "content-manager", "enrolled students"
        ]
    },
    {
        method: "POST",
        path: "/api/quiz-test/:quizId",
        description: "submit quiz test",
        request_body_format: [
            [
                {
                    "order": 1,
                    "answer": "optionC"
                },
            ]
        ],
        access: [
            "enrolled students"
        ]
    },
    {
        method: "GET",
        path: "/api/quiz-result/:quizId",
        description: "quiz result",
        request_body_format: null,
        access: [
            "admin", "instructor", "content-manager", "enrolled students"
        ]
    },
    {
        method: "POST",
        path: "/api/courses/enroll",
        description: "enroll for quiz",
        request_body_format: {
            "courseId": 8
        },
        access: [
            "enrolled students"
        ]
    },
    {
        method: "GET",
        path: "/api/courses",
        description: "fetch courses",
        request_body_format: null,
        access: [
            "public"
        ]
    },

]

