"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    BookOpen,
    Clock,
    FileText,
    Loader2,
    Save,
    Video,
} from "lucide-react";

import api from "@/lib/axios";

interface Lesson {
    title: string;
    description: string;
    videoUrl: string;
    duration: string;
    notes: string;
}

export default function EditLessonPage() {
    const router = useRouter();

    const { id, lessonId } = useParams<{
        id: string;
        lessonId: string;
    }>();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState<Lesson>({
        title: "",
        description: "",
        videoUrl: "",
        duration: "",
        notes: "",
    });

    useEffect(() => {
        async function fetchLesson() {
            try {
                const response = await api.get(
                    `/api/courses/${id}/lessons/${lessonId}`
                );

                setFormData(response.data);
            } catch {
                setError("Failed to load lesson.");
            } finally {
                setLoading(false);
            }
        }

        fetchLesson();
    }, [id, lessonId]);

    function handleChange(
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            await api.put(
                `/api/courses/${id}/lessons/${lessonId}`,
                formData
            );

            router.push(`/course-analytics/${id}`);
        } catch (err: any) {
            setError(
                err.response?.data?.error?.message ??
                "Failed to update lesson."
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-4xl p-8">

            <h1 className="mb-8 text-4xl font-bold">
                Edit Lesson
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >
                <section className="rounded-3xl bg-white p-8 shadow">

                    <div className="space-y-6">

                        <div>
                            <label className="mb-2 block font-medium">
                                Lesson Title
                            </label>

                            <div className="flex items-center rounded-xl border px-4">

                                <BookOpen
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-4 outline-none"
                                    required
                                />

                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Description
                            </label>

                            <textarea
                                rows={5}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-4"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Video URL
                            </label>

                            <div className="flex items-center rounded-xl border px-4">

                                <Video
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleChange}
                                    className="w-full p-4 outline-none"
                                />

                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Duration
                            </label>

                            <div className="flex items-center rounded-xl border px-4">

                                <Clock
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full p-4 outline-none"
                                />

                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Lesson Notes
                            </label>

                            <div className="rounded-xl border">

                                <div className="flex items-center gap-2 border-b px-4 py-3">

                                    <FileText
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <span className="font-medium">
                                        Notes
                                    </span>

                                </div>

                                <textarea
                                    rows={10}
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full resize-none p-4 outline-none"
                                />

                            </div>
                        </div>

                    </div>

                </section>

                {error && (
                    <div className="rounded-xl bg-red-100 p-4 text-red-700">
                        {error}
                    </div>
                )}

                <div className="flex justify-end">

                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Update Lesson
                            </>
                        )}
                    </button>

                </div>

            </form>

        </main>
    );
}