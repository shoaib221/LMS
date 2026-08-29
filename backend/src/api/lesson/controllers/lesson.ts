export default {


    async courseLessons(ctx: any) {

        try {
            console.log("courseLessons");
            const user = ctx.state.user;

            const { courseId } = ctx.params

            const course = await strapi.db
                .query("api::course.course")
                .findMany({
                    where: {

                        id: Number(courseId),

                    }
                });

            const lessons = await strapi.db
                .query("api::lesson.lesson")
                .findMany({
                    where: {
                        course: {
                            id: Number(courseId),
                        },
                    },
                    orderBy: {
                        order: "asc",
                    },
                });

            ctx.body = {
                course,
                lessons
            }

        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async createLesson(ctx: any) {

        try {

            console.log("createLesson");
            const user = ctx.state.user;

            if (user.user_role === "student") {
                throw new Error("Unauthorized action")
            }

            const { courseId } = ctx.params;

            const course = await strapi.db
                .query("api::course.course")
                .findOne({
                    where: {
                        id: Number(courseId),
                        instructor: {
                            id: user.id,
                        },
                    },
                });

            if (!course) {
                return ctx.notFound("Course not found or you are not its instructor.");
            }

            const {
                title, content, videoURL, order
            } = ctx.request.body;

            if (!title || !content || !order) {
                return ctx.badRequest("Invalid request body.");
            }

            const lesson = await strapi.db
                .query("api::lesson.lesson")
                .create({
                    data: {
                        title,
                        content,
                        videoURL,
                        order,
                        course: courseId, // numeric database id
                    },
                });


            ctx.body = {
                lesson
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async deleteLesson(ctx: any) {

        try {
            console.log("deleteLesson");
            const user = ctx.state.user;

            const { courseId, order } = ctx.params;

            const course = await strapi.db
                .query("api::course.course")
                .findOne({
                    where: {
                        id: courseId,
                        instructor: {
                            id: user.id
                        }
                    },
                });

            if (!course) {
                return ctx.notFound("No such course.");
            }

            const deletedLesson = await strapi.db
                .query("api::lesson.lesson")
                .delete({
                    where: {
                        order: Number(order),
                        course: {
                            id: courseId
                        }
                    },
                });



            ctx.body = {
                deletedLesson
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async updateLesson(ctx: any) {

        try {

            console.log("updateLesson");

            const user = ctx.state.user;

            const { courseId, order } = ctx.params;

            const course = await strapi.db
                .query("api::course.course")
                .findOne({
                    where: {
                        id: courseId,
                        instructor: {
                            id: user.id
                        }
                    },
                });

            if (!course) {
                return ctx.notFound("No such course.");
            }

            const updation = ctx.request.body;

            const updatedLesson = await strapi.db
                .query("api::lesson.lesson")
                .update({
                    where: {
                        course: {
                            id: courseId
                        }
                    },
                    data: {
                        ...updation
                    },
                });

            ctx.body = {
                updatedLesson
            };

        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },
};

