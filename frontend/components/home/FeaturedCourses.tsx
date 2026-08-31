import Image from "next/image";
import Link from "next/link";

const featuredCourses = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "John Doe",
        image: "/images/courses/web-development.jpg",
        students: "12,540",
        lessons: 42,
        duration: "24 Hours",
        price: "$49",
    },
    {
        id: 2,
        title: "Mastering UI/UX Design",
        instructor: "Jane Smith",
        image: "/images/courses/uiux.jpg",
        students: "8,720",
        lessons: 30,
        duration: "18 Hours",
        price: "$39",
    },
    {
        id: 3,
        title: "Data Structures & Algorithms",
        instructor: "Alex Johnson",
        image: "/images/courses/dsa.jpg",
        students: "15,200",
        lessons: 56,
        duration: "35 Hours",
        price: "$59",
    },
];

export default function FeaturedCourses() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-blue-600">
                            Featured Courses
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-slate-900">
                            Learn from the Best
                        </h2>

                        <p className="mt-3 max-w-2xl text-slate-600">
                            Explore our most popular courses designed by
                            industry experts to help you achieve your learning
                            goals.
                        </p>
                    </div>

                    <Link
                        href="/courses"
                        className="hidden rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:border-blue-600 hover:text-blue-600 md:block"
                    >
                        View All
                    </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {featuredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-56">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                    Bestseller
                                </span>

                                <h3 className="mt-4 line-clamp-2 text-xl font-bold text-slate-900">
                                    {course.title}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Instructor:{" "}
                                    <span className="font-medium text-slate-700">
                                        {course.instructor}
                                    </span>
                                </p>

                                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="font-bold text-slate-900">
                                            {course.students}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Students
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-bold text-slate-900">
                                            {course.lessons}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Lessons
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-bold text-slate-900">
                                            {course.duration}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Duration
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <span className="text-2xl font-bold text-blue-600">
                                        {course.price}
                                    </span>

                                    <Link
                                        href={`/courses/${course.id}`}
                                        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                                    >
                                        View Course
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center md:hidden">
                    <Link
                        href="/courses"
                        className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                    >
                        View All Courses
                    </Link>
                </div>
            </div>
        </section>
    );
}