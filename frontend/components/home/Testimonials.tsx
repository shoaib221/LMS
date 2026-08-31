import {
    Quote,
    Star,
} from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Ahmed",
        role: "Frontend Developer",
        company: "Tech Solutions Ltd.",
        initials: "SA",
        rating: 5,
        review:
            "This platform completely transformed my learning experience. The courses are practical, easy to follow, and helped me land my first developer job.",
    },
    {
        id: 2,
        name: "Michael Johnson",
        role: "UI/UX Designer",
        company: "Creative Studio",
        initials: "MJ",
        rating: 5,
        review:
            "The instructors explain complex topics in a very simple way. The quizzes and progress tracking kept me motivated throughout every course.",
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        role: "Computer Science Student",
        company: "University Student",
        initials: "NJ",
        rating: 5,
        review:
            "I love the clean interface and structured learning path. It feels like having a personal mentor guiding me from beginner to advanced.",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="font-semibold text-blue-600">
                        Testimonials
                    </span>

                    <h2 className="mt-3 text-4xl font-bold text-slate-900">
                        What Our Learners Say
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        Thousands of learners have improved their skills and
                        advanced their careers through our platform.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex gap-1 text-amber-400">
                                    {Array.from({
                                        length: testimonial.rating,
                                    }).map((_, index) => (
                                        <Star
                                            key={index}
                                            size={18}
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>

                                <Quote
                                    size={34}
                                    className="text-blue-200"
                                />
                            </div>

                            <p className="mt-6 leading-8 text-slate-600">
                                "{testimonial.review}"
                            </p>

                            <div className="mt-8 flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                                    {testimonial.initials}
                                </div>

                                <div>
                                    <h4 className="font-semibold text-slate-900">
                                        {testimonial.name}
                                    </h4>

                                    <p className="text-sm text-slate-500">
                                        {testimonial.role}
                                    </p>

                                    <p className="text-sm text-blue-600">
                                        {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 grid grid-cols-2 gap-8 rounded-3xl bg-blue-600 px-8 py-12 text-center text-white md:grid-cols-4">
                    <div>
                        <h3 className="text-4xl font-bold">4.9/5</h3>
                        <p className="mt-2 text-blue-100">
                            Average Rating
                        </p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-bold">50K+</h3>
                        <p className="mt-2 text-blue-100">
                            Happy Students
                        </p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-bold">98%</h3>
                        <p className="mt-2 text-blue-100">
                            Satisfaction Rate
                        </p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-bold">500+</h3>
                        <p className="mt-2 text-blue-100">
                            Courses Available
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}