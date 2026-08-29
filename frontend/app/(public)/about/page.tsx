import {
    BookOpen,
    Users,
    Award,
    Target,
} from "lucide-react";

export default function AboutPage() {
    return (
        <main className="bg-slate-50">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-20 text-white">
                <div className="mx-auto max-w-7xl text-center">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Empowering Learning Through Technology
                    </h1>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-blue-100">
                        LMS is a modern online learning platform designed to help
                        students gain practical skills, learn from expert instructors,
                        and achieve their career goals.
                    </p>
                </div>
            </section>


            {/* About */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2">

                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Who We Are
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600">
                            LMS is a comprehensive Learning Management System that
                            connects students and instructors in one place.
                            Our platform provides high-quality courses, interactive
                            lessons, quizzes, and learning resources.
                        </p>

                        <p className="mt-4 leading-8 text-slate-600">
                            We focus on practical education, helping learners develop
                            real-world skills through structured courses and expert
                            guidance.
                        </p>
                    </div>


                    <div className="rounded-2xl bg-white p-8 shadow">
                        <h3 className="text-xl font-semibold text-slate-900">
                            Our Mission
                        </h3>

                        <p className="mt-4 text-slate-600">
                            To make quality education accessible by providing an
                            engaging, flexible, and technology-driven learning
                            environment.
                        </p>

                        <h3 className="mt-8 text-xl font-semibold text-slate-900">
                            Our Vision
                        </h3>

                        <p className="mt-4 text-slate-600">
                            To become a trusted learning ecosystem where anyone can
                            learn, teach, and grow.
                        </p>
                    </div>

                </div>
            </section>


            {/* Features */}
            <section className="bg-white px-6 py-16">
                <div className="mx-auto max-w-7xl">

                    <h2 className="text-center text-3xl font-bold text-slate-900">
                        Why Choose LMS?
                    </h2>


                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        <FeatureCard
                            icon={<BookOpen />}
                            title="Quality Courses"
                            description="Learn from structured courses designed by experienced instructors."
                        />


                        <FeatureCard
                            icon={<Users />}
                            title="Expert Instructors"
                            description="Connect with skilled teachers and industry professionals."
                        />


                        <FeatureCard
                            icon={<Award />}
                            title="Skill Development"
                            description="Build practical skills through projects and assessments."
                        />


                        <FeatureCard
                            icon={<Target />}
                            title="Career Focused"
                            description="Learn skills that help you achieve your professional goals."
                        />

                    </div>

                </div>
            </section>


            {/* Stats */}
            <section className="px-6 py-16">
                <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">

                    <Stat
                        number="100+"
                        label="Courses"
                    />

                    <Stat
                        number="50+"
                        label="Expert Instructors"
                    />

                    <Stat
                        number="10K+"
                        label="Students"
                    />

                </div>
            </section>


            {/* CTA */}
            <section className="bg-blue-600 px-6 py-16 text-center text-white">

                <h2 className="text-3xl font-bold">
                    Ready to Start Learning?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-blue-100">
                    Join thousands of learners and start building your future
                    with LMS.
                </p>

                <a
                    href="/courses"
                    className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                    Explore Courses
                </a>

            </section>

        </main>
    );
}


function FeatureCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-xl bg-slate-50 p-6 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                {icon}
            </div>

            <h3 className="mt-5 font-semibold text-slate-900">
                {title}
            </h3>

            <p className="mt-3 text-sm text-slate-600">
                {description}
            </p>

        </div>
    );
}


function Stat({
    number,
    label,
}: {
    number: string;
    label: string;
}) {
    return (
        <div className="rounded-xl bg-white p-8 text-center shadow">

            <h3 className="text-4xl font-bold text-blue-600">
                {number}
            </h3>

            <p className="mt-2 text-slate-600">
                {label}
            </p>

        </div>
    );
}