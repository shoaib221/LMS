


export const apiRoutes = [
    {
        path: "/auth/register",
        method: "POST",
        required_fields: [
            "username", "email", "password"
        ],
        access: ["public"],
        response_format: {
            message: "Registered successfully",
            user: {},
            jwtToken: ""
        }
    },
    {
        path: "/auth/login",
        method: "POST",
        required_fields: [
            "email", "password"
        ],
        access: ["public"],
        response_format: {
            jwtToken: "",
            user: {}
        }
    },
    {
        method: "GET",
        path: "/auth/me",
        description: "get logged in user",
        access: [
            "all users"
        ],
        response_format: {
            user: {},
        }
    },
    {
        method: "POST",
        path: "/course",
        description: "create course",
        body_format: { "title": "string", "description": "string" },
        access: [
            "instructor", "admin", "content-manager"
        ],
        response_format: {
            message: "",
            course: {}
        }
    },
    {
        method: "GET",
        path: "/instructed-courses",
        description: "instructed courses of an instructor",
        access: [
            "instructor", "admin", "content-manager"
        ],
        response_format: {
            courses: [
                {
                    id: 0,
                    title: "",
                    description: "",
                    coverImage: "",
                }
            ]
        }
    },
    {
        method: "GET",
        path: "/courses",
        description: "fetch all courses",
        access: [
            "public"
        ],
        response_format: {
            message: "",
            courses: {}
        }
    },
    {
        method: "GET",
        path: "/enrolled-courses",
        description: "fetch enrolled courses of a student",
        access: [
            "student"
        ],
        response_format: {
            message: "",
            courses: {}
        }
    },
    {
        method: "POST",
        path: "/course/:courseId/lesson",
        description: "create lesson",
        body_format: {
            title: "",
            content: {},
            videoURL: "",
            order: 1
        },
        access: [
            "admin", "instructor", "content-manager"
        ],
        response_format: {
            lesson: {}
        }
    },
    {
        method: "POST",
        path: "/quiz",
        action: "create quiz",
        body_format: {
            "title": "", "description": "", "courseId": 0
        },
        access: [
            "admin", "instructor", "content-manager"
        ],
        response_format: {
            quiz: {}
        }
    },
    {
        method: "GET",
        path: "/course/:courseId/lessons",
        action: "course lessons",
        access: [
            "admin", "instructor", "content-manager", "enrolled students"
        ],
        response_format: {
            course: {},
            lessons: []
        }
    },
    {
        method: "DELETE",
        path: "/course/:courseId/lesson/:order",
        action: "delete lesson",
        access: [
            "admin", "instructor", "content-manager"
        ],
        response_format: {
            deletedLesson: {}
        }
    },
    {
        method: "GET",
        path: "/course/:courseId/lesson/:order",
        action: "fetch lesson",
        access: [
            "admin", "instructor", "content-manager", "enrolled students"
        ],
        response_format: {
            lesson: {}
        }
    },
    {
        action: "update lesson",
        method: "PATCH",
        path: "/course/:courseId/lesson/:order",
        body_format: {
            title: "",
            content: {},
            videoURL: "",
            order: 1
        },
        access: [
            "admin", "instructor", "content-manager"
        ],
        response_format: {
            updatedLesson: {}
        }
    },
    {
        action: "delete quiz",
        method: "DELETE",
        path: "/quiz/:quizId",
        access: [
            "admin", "instructor", "content-manager"
        ],
        response_format: {
            message: "Quiz deleted successfully.",
            quiz: {}
        }
    },
    {
        method: "GET",
        path: "/course/:courseId/quizzes",
        action: "fetch quizzes of a given course",
        access: [
            "admin", "instructor", "content-manager", "enrolled students"
        ],
        response_format: {
            quizzes: []
        }
    },
    {
        method: "PATCH",
        path: "/quiz/:quizId",
        description: "update quiz",
        body_format: {
            title: "", description: ""
        },
        access: [
            "admin", "instructor", "content-manager"
        ],
        response_format: {
            updatedQuiz: {}
        }
    },
    {
        action: "create question",
        method: "POST",
        path: "/quiz/:quizId/question",
        body_format: {
            order: 1,
            statement: "",
            options: ["", "", "", ""],
            correctAnswer: 1
        },
        access: [
            "admin", "instructor", "content-manager"
        ],
        response_format: {
            createdQuestion: {
                "id": 8,
                "documentId": "veubv29vc7ulncdwii9ojdw6",
                "createdAt": "2026-09-02T15:39:39.611Z",
                "updatedAt": "2026-09-02T15:39:39.611Z",
                "publishedAt": "2026-09-02T15:39:39.612Z",
                "locale": null,
                "order": 4,
                "correctAnswer": 1,
                "options": null,
                "statement": null
            }
        }
    },
    {
        action: "delete question",
        method: "DELETE",
        path: "/question/:questionId",
        access: [
            "admin", "instructor", "content-manager"
        ],
        response_format: {
            deletedQuestion: {}
        }
    },
    {
        action: "fetch questions",
        method: "GET",
        path: "/quiz/:quizId/questions",
        access: [
            "admin", "instructor", "content-manager", "enrolled students"
        ],
        response_format: {
            questions: []
        }
    },
    {
        method: "POST",
        path: "/quiz-test/:quizId",
        description: "submit quiz test",
        body_format: [
            {
                "order": 1,
                "answer": 0
            },
        ],
        access: [
            "enrolled students"
        ],
        response_format: {
            quizResult: {}
        }
    },
    {
        action: "fetch quiz result",
        method: "GET",
        path: "/quiz-result/:quizId",
        access: [
            "admin", "instructor", "content-manager", "enrolled students"
        ],
        response_format: {
            quizResult: {}
        }
    },
    {
        method: "POST",
        path: "/course/:courseId/enroll",
        description: "enroll for course",
        access: [
            "enrolled students"
        ],
        response_format: {
            message: "Course enrolled successfully.",
        }
    },
    {
        method: "GET",
        path: "/courses",
        description: "fetch courses",
        access: [
            "public"
        ],
        response_format: {
            message: "Student enrolled successfully.",
            courses: {}
        }
    },

]

