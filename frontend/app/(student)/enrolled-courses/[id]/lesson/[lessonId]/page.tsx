import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    CheckCircle,
    Clock,
    Download,
    FileText,
    PlayCircle,
} from "lucide-react";

interface PageProps {
    params: Promise<{
        id: string;
        lessonId: string;
    }>;
}

export default async function LessonPage({
    params,
}: PageProps) {
    const { id, lessonId } = await params;

    // TODO:
    // Fetch lesson from Strapi using course id & lesson id

    const lesson = {
        id: Number(lessonId),
        title: `Lesson ${lessonId}: Introduction to React`,
        duration: "18 min",
        videoUrl: "",
        description:
            "In this lesson you'll learn the core concepts and understand how React components work.",
        notes: `
React lets you build user interfaces using reusable components.

Topics covered:

• JSX
• Components
• Props
• Rendering
• Component hierarchy
        `,
        attachments: [
            {
                id: 1,
                name: "Lesson Notes.pdf",
            },
            {
                id: 2,
                name: "Source Code.zip",
            },
        ],
    };

    return (
        <div className="mx-auto max-w-5xl space-y-8">

            {/* Header */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="flex flex-wrap items-center gap-4">

                    <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                        <BookOpen size={28} />
                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            {lesson.title}
                        </h1>

                        <div className="mt-2 flex items-center gap-6 text-sm text-slate-500">

                            <span className="flex items-center gap-2">
                                <Clock size={16} />
                                {lesson.duration}
                            </span>

                            <span>
                                Lesson #{lesson.id}
                            </span>

                        </div>

                    </div>

                </div>

            </section>

            {/* Video */}
            <section className="overflow-hidden rounded-3xl bg-white shadow-sm">

                <div className="aspect-video flex items-center justify-center bg-slate-900">

                    {/* Replace with your video player */}
                    <div className="text-center text-white">

                        <PlayCircle
                            size={80}
                            className="mx-auto"
                        />

                        <p className="mt-4 text-lg">
                            Video Player Placeholder
                        </p>

                    </div>

                </div>

            </section>

            {/* Lesson Description */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <h2 className="text-2xl font-semibold text-slate-900">
                    About this lesson
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                    {lesson.description}
                </p>

            </section>

            {/* Lesson Notes */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="flex items-center gap-3">

                    <FileText className="text-blue-600" />

                    <h2 className="text-2xl font-semibold">
                        Lesson Notes
                    </h2>

                </div>

                <pre className="mt-6 whitespace-pre-wrap font-sans leading-8 text-slate-600">
                    {lesson.notes}
                </pre>

            </section>

            {/* Attachments */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <h2 className="text-2xl font-semibold">
                    Attachments
                </h2>

                <div className="mt-6 space-y-4">

                    {lesson.attachments.map((file) => (

                        <div
                            key={file.id}
                            className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                        >

                            <div className="flex items-center gap-3">

                                <FileText className="text-blue-600" />

                                <span className="font-medium">
                                    {file.name}
                                </span>

                            </div>

                            <button className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 hover:bg-slate-200">

                                <Download size={18} />

                                Download

                            </button>

                        </div>

                    ))}

                </div>

            </section>

            {/* Footer */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="flex flex-wrap items-center justify-between gap-4">

                    <Link
                        href={`/enrolled-courses/${id}/lesson/${Math.max(
                            1,
                            Number(lessonId) - 1
                        )}`}
                        className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
                    >
                        <ArrowLeft size={18} />
                        Previous Lesson
                    </Link>

                    <button className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">

                        <CheckCircle size={18} />

                        Mark as Completed

                    </button>

                    <Link
                        href={`/enrolled-courses/${id}/lesson/${Number(
                            lessonId
                        ) + 1}`}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                    >
                        Next Lesson
                        <ArrowRight size={18} />
                    </Link>

                </div>

            </section>

        </div>
    );
}