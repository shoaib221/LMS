export default {
    async enroll(ctx: any) {
        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized("Authentication required.");
        }

        if (user.user_role !== "student") {
            return ctx.unauthorized("Unauthorized action");
        }

        const { courseId } = ctx.request.body;

        if (!courseId) {
            return ctx.badRequest("courseId is required.");
        }

        // Check course exists
        const course = await strapi.db
            .query("api::course.course")
            .findOne({
                where: {
                    id: courseId,
                },
            });

        if (!course) {
            return ctx.notFound("Course not found.");
        }

        const updatedUser = await strapi.db
            .query("plugin::users-permissions.user")
            .update({
                where: {
                    id: user.id,
                },
                data: {
                    enrolled_courses: {
                        connect: [courseId],
                    },
                },
            });

        ctx.body = {
            message: "Student enrolled successfully.",
        };
    },

    async enrolledCourses(ctx: any) {
        console.log("enrolledCourses");
        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized("Authentication required.");
        }

        // console.log("enroll", user)

        if (user.user_role !== "student") {
            return ctx.unauthorized("Unauthorized action");
        }

        const currentUser = await strapi.db
            .query("plugin::users-permissions.user")
            .findOne({
                where: {
                    id: user.id,
                },
                populate: {
                    enrolled_courses: true,
                },
            });

        ctx.body = {
            message: "Student enrolled successfully.",
            courses: currentUser.enrolled_courses
        };
    },

    async fetchCourses(ctx: any) {
        console.log("enrolledCourses");
        const user = ctx.state.user;

        const courses = await strapi.db
            .query("api::course.course")
            .findMany({
                populate: {
                    instructor: true,
                },
            });


        ctx.body = {
            message: "Student enrolled successfully.",
            courses
        };
    },

    async fetchInstructorCourses(ctx: any) {

        try {


            console.log("fetchInstructorCourses");
            const user = ctx.state.user;

            const courses = await strapi.db
                .query("api::course.course")
                .findMany({
                    where: {
                        instructor: {
                            id: user.id,
                        },
                    },
                    populate: {

                    },
                });


            ctx.body = {
                message: "Student enrolled successfully.",
                courses
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async createCourse(ctx: any) {

        try {
            console.log("createCourse");
            const user = ctx.state.user;



            if (!user || user.user_role === "student") {
                return ctx.unauthorized("Unauthorized action.");
            }


            const { title, description } = ctx.request.body;


            if (!title) {
                return ctx.badRequest("Title is required.");
            }

            const today = new Date().toISOString().split("T")[0];
            const course = await strapi.db
                .query("api::course.course")
                .create({
                    data: {
                        title,
                        description,
                        instructor: user.id,
                        published: today
                    },
                });


            ctx.body = {
                message: "Course created successfully.",
                course
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }

    },

    async test(ctx: any) {
        console.log("test");
        const user = ctx.state.user;

        ctx.body = {
            message: "Test",
            user
        };
    },
};

