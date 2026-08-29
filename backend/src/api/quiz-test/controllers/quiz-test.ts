
export default {


    async submitQuizTest(ctx: any) {

        try {
            console.log("submitQuizTest");
            const user = ctx.state.user;

            if (user.user_role !== "student") {
                throw new Error("Unauthorized action")
            }

            let answers = ctx.request.body;
            answers.sort((a: any, b: any) => a.order - b.order);
            answers = answers.map((elem: any) => elem.answer)

            const { quizId } = ctx.params;

            let correctAnswers = await strapi.db
                .query("api::question.question")
                .findMany({
                    where: {
                        quiz: {
                            id: Number(quizId),
                        }
                    },
                    orderBy: {
                        order: "asc"
                    }
                });

            correctAnswers = correctAnswers.map(elem => elem.correctAnswer);

            let score = 0;

            for (let i = 0; i < correctAnswers.length; i++) {
                if (answers[i] === correctAnswers[i]) {
                    score++;
                }
            }

            const quizTest = await strapi.db
                .query("api::quiz-test.quiz-test")
                .create({
                    data: {
                        answers,
                        score,
                        examinee: user.id,      // User database id
                        quiz: Number(quizId),   // Quiz database id
                    },
                });

            ctx.body = {
                quizTest
            };

        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async getQuizResult(ctx: any) {

        try {

            console.log("fetchInstructorCourses");
            const user = ctx.state.user;

            const { quizId } = ctx.params;

            console.log(quizId, Number(quizId))

            const quizResult = await strapi.db
                .query("api::quiz-test.quiz-test")
                .findOne({
                    where: {
                        quiz: {
                            id: Number(quizId)
                        }
                    },
                    populate: {
                        quiz: true
                    }

                })


            ctx.body = {
                quizResult
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

};




