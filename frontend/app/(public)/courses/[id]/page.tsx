import Image from "next/image";
import Link from "next/link";
import {
    CheckCircle,
    Clock,
    FileText,
    GraduationCap,
    PlayCircle,
    Star,
    Users,
} from "lucide-react";


const course = {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description:
        "Learn modern web development from scratch. Build real-world applications using HTML, CSS, JavaScript, React, Next.js, and backend technologies.",
    instructor: "John Doe",
    category: "Programming",
    level: "Beginner",
    duration: "24 Hours",
    students: "12,540",
    lessons: 42,
    rating: 4.9,
    reviews: 2450,
    price: "$49",
    image: "/images/courses/web-development.jpg",

    learn: [
        "Build responsive websites using HTML and CSS",
        "Master JavaScript fundamentals",
        "Create modern React applications",
        "Build full-stack applications",
        "Deploy applications to production",
    ],

    curriculum: [
        {
            title: "Introduction to Web Development",
            lessons: 5,
        },
        {
            title: "HTML & CSS Fundamentals",
            lessons: 8,
        },
        {
            title: "JavaScript Essentials",
            lessons: 10,
        },
        {
            title: "React & Next.js",
            lessons: 12,
        },
        {
            title: "Deployment & Best Practices",
            lessons: 7,
        },
    ],
};


interface PageProps {
    params: Promise<{
        id: string;
    }>;
}


export default async function CourseDetailsPage({
    params,
}: PageProps) {

    const { id } = await params;


    return (
        <main className="min-h-screen bg-slate-50">

            {/* Hero */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">

                    <div className="text-white">

                        <span className="rounded-full bg-white/20 px-4 py-1 text-sm">
                            {course.category}
                        </span>


                        <h1 className="mt-6 text-4xl font-bold lg:text-5xl">
                            {course.title}
                        </h1>


                        <p className="mt-6 text-lg text-blue-100">
                            {course.description}
                        </p>


                        <div className="mt-8 flex flex-wrap gap-6 text-sm">

                            <div className="flex items-center gap-2">
                                <Star
                                    size={18}
                                    fill="currentColor"
                                />
                                {course.rating} ({course.reviews})
                            </div>


                            <div className="flex items-center gap-2">
                                <Users size={18} />
                                {course.students} students
                            </div>


                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                {course.duration}
                            </div>

                        </div>


                        <p className="mt-6">
                            Instructor:
                            <span className="ml-2 font-semibold">
                                {course.instructor}
                            </span>
                        </p>

                    </div>


                    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

                        <div className="relative h-72">
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                        </div>


                        <div className="p-6">

                            <h2 className="text-3xl font-bold text-slate-900">
                                {course.price}
                            </h2>


                            <button className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700">
                                Enroll Now
                            </button>


                            <div className="mt-6 space-y-3 text-sm text-slate-600">

                                <p className="flex items-center gap-2">
                                    <PlayCircle size={18} />
                                    {course.lessons} lessons
                                </p>

                                <p className="flex items-center gap-2">
                                    <FileText size={18} />
                                    Quizzes included
                                </p>

                                <p className="flex items-center gap-2">
                                    <GraduationCap size={18} />
                                    Certificate after completion
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* Content */}
            <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-3">


                {/* Main */}
                <div className="space-y-10 lg:col-span-2">


                    {/* What learn */}
                    <div className="rounded-2xl bg-white p-8 shadow-sm">

                        <h2 className="text-3xl font-bold text-slate-900">
                            What You'll Learn
                        </h2>


                        <div className="mt-6 grid gap-4 md:grid-cols-2">

                            {course.learn.map((item) => (
                                <div
                                    key={item}
                                    className="flex gap-3 text-slate-700"
                                >
                                    <CheckCircle
                                        className="shrink-0 text-green-600"
                                    />

                                    {item}
                                </div>
                            ))}

                        </div>

                    </div>



                    {/* Curriculum */}
                    <div className="rounded-2xl bg-white p-8 shadow-sm">

                        <h2 className="text-3xl font-bold text-slate-900">
                            Course Curriculum
                        </h2>


                        <div className="mt-6 space-y-4">

                            {course.curriculum.map((section, index) => (

                                <div
                                    key={section.title}
                                    className="flex items-center justify-between rounded-xl border p-5"
                                >

                                    <div>
                                        <p className="font-semibold text-slate-900">
                                            {index + 1}. {section.title}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {section.lessons} lessons
                                        </p>
                                    </div>


                                    <PlayCircle
                                        className="text-blue-600"
                                    />

                                </div>

                            ))}

                        </div>

                    </div>


                </div>


                {/* Sidebar */}
                <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">

                    <h3 className="text-xl font-bold text-slate-900">
                        Course Details
                    </h3>


                    <div className="mt-6 space-y-4 text-slate-600">

                        <p>
                            Level:
                            <span className="ml-2 font-medium text-slate-900">
                                {course.level}
                            </span>
                        </p>


                        <p>
                            Duration:
                            <span className="ml-2 font-medium text-slate-900">
                                {course.duration}
                            </span>
                        </p>


                        <p>
                            Lessons:
                            <span className="ml-2 font-medium text-slate-900">
                                {course.lessons}
                            </span>
                        </p>

                    </div>


                    <Link
                        href="/profile"
                        className="mt-8 block rounded-xl bg-slate-900 py-3 text-center font-semibold text-white"
                    >
                        Track Progress
                    </Link>

                </aside>

            </section>

        </main>
    );
}