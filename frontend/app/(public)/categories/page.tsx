import Link from "next/link";
import {
    Code2,
    Palette,
    BriefcaseBusiness,
    Database,
    Brain,
    Megaphone,
    Languages,
    Camera,
} from "lucide-react";


const categories = [
    {
        title: "Programming",
        description:
            "Learn web development, mobile apps, backend systems, and programming fundamentals.",
        courses: 120,
        icon: Code2,
    },
    {
        title: "Design",
        description:
            "Master UI/UX design, graphics design, and creative tools.",
        courses: 45,
        icon: Palette,
    },
    {
        title: "Business",
        description:
            "Develop business, management, and entrepreneurship skills.",
        courses: 70,
        icon: BriefcaseBusiness,
    },
    {
        title: "Data Science",
        description:
            "Learn data analysis, machine learning, and artificial intelligence.",
        courses: 55,
        icon: Database,
    },
    {
        title: "Artificial Intelligence",
        description:
            "Explore AI tools, deep learning, and automation.",
        courses: 35,
        icon: Brain,
    },
    {
        title: "Marketing",
        description:
            "Learn SEO, digital marketing, and social media marketing.",
        courses: 40,
        icon: Megaphone,
    },
    {
        title: "Languages",
        description:
            "Improve communication and language skills.",
        courses: 25,
        icon: Languages,
    },
    {
        title: "Photography",
        description:
            "Learn photography, editing, and visual storytelling.",
        courses: 20,
        icon: Camera,
    },
];


export default function CategoriesPage() {
    return (
        <main className="min-h-screen bg-slate-50">

            {/* Header */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
                <div className="mx-auto max-w-7xl px-6 text-center">

                    <h1 className="text-5xl font-bold text-white">
                        Course Categories
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
                        Explore courses from different fields and choose the
                        learning path that matches your goals.
                    </p>

                </div>
            </section>


            {/* Categories */}
            <section className="py-16">

                <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">

                    {categories.map((category) => {

                        const Icon = category.icon;

                        return (
                            <Link
                                key={category.title}
                                href={`/courses?category=${category.title}`}
                                className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >

                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                    <Icon size={32} />
                                </div>


                                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                                    {category.title}
                                </h2>


                                <p className="mt-3 text-slate-600">
                                    {category.description}
                                </p>


                                <p className="mt-5 font-semibold text-blue-600">
                                    {category.courses}+ Courses
                                </p>


                                <span className="mt-4 inline-block text-sm font-medium text-slate-500">
                                    View Courses →
                                </span>

                            </Link>
                        );

                    })}

                </div>

            </section>

        </main>
    );
}