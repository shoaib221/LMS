"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CirclePlus, Loader2, Save, Trash2 } from "lucide-react";
import api from "@/lib/axios";

interface Question {
    question: string;
    options: [string, string, string, string];
    correctAnswer: 0 | 1 | 2 | 3;
}

interface Quiz {
    title: string;
    questions: Question[];
}

export default function EditQuizPage() {
    const router = useRouter();

    const { id, quizId } = useParams<{
        id: string;
        quizId: string;
    }>();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [title, setTitle] = useState("");

    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        async function fetchQuiz() {
            try {
                const res = await api.get(
                    `/api/courses/${id}/quizzes/${quizId}`
                );

                const quiz: Quiz = res.data;

                setTitle(quiz.title);
                setQuestions(quiz.questions);
            } catch {
                setError("Failed to load quiz.");
            } finally {
                setLoading(false);
            }
        }

        fetchQuiz();
    }, [id, quizId]);

    function updateQuestion(index: number, value: string) {
        const copy = [...questions];
        copy[index].question = value;
        setQuestions(copy);
    }

    function updateOption(
        questionIndex: number,
        optionIndex: number,
        value: string
    ) {
        const copy = [...questions];
        copy[questionIndex].options[optionIndex] = value;
        setQuestions(copy);
    }

    function updateCorrectAnswer(
        questionIndex: number,
        optionIndex: number
    ) {
        const copy = [...questions];
        copy[questionIndex].correctAnswer =
            optionIndex as 0 | 1 | 2 | 3;

        setQuestions(copy);
    }

    function addQuestion() {
        setQuestions([
            ...questions,
            {
                question: "",
                options: ["", "", "", ""],
                correctAnswer: 0,
            },
        ]);
    }

    function removeQuestion(index: number) {
        setQuestions(
            questions.filter((_, i) => i !== index)
        );
    }

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            await api.put(
                `/api/courses/${id}/quizzes/${quizId}`,
                {
                    title,
                    questions,
                }
            );

            router.push(`/course-analytics/${id}`);
        } catch (err: any) {
            setError(
                err.response?.data?.error?.message ??
                "Failed to update quiz."
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
        <main className="mx-auto max-w-6xl p-8">

            <h1 className="mb-8 text-4xl font-bold">
                Edit Quiz
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <section className="rounded-3xl bg-white p-8 shadow">

                    <label className="mb-2 block font-semibold">
                        Quiz Title
                    </label>

                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        className="w-full rounded-xl border p-4"
                        required
                    />

                </section>

                {questions.map((question, index) => (

                    <section
                        key={index}
                        className="rounded-3xl bg-white p-8 shadow"
                    >

                        <div className="mb-6 flex items-center justify-between">

                            <h2 className="text-2xl font-semibold">
                                Question {index + 1}
                            </h2>

                            {questions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeQuestion(index)
                                    }
                                    className="text-red-500"
                                >
                                    <Trash2 />
                                </button>
                            )}

                        </div>

                        <textarea
                            rows={3}
                            value={question.question}
                            onChange={(e) =>
                                updateQuestion(
                                    index,
                                    e.target.value
                                )
                            }
                            className="mb-8 w-full rounded-xl border p-4"
                            required
                        />

                        <div className="space-y-4">

                            {question.options.map(
                                (option, optionIndex) => (

                                    <div
                                        key={optionIndex}
                                        className="flex items-center gap-4"
                                    >

                                        <input
                                            type="radio"
                                            checked={
                                                question.correctAnswer ===
                                                optionIndex
                                            }
                                            onChange={() =>
                                                updateCorrectAnswer(
                                                    index,
                                                    optionIndex
                                                )
                                            }
                                        />

                                        <input
                                            value={option}
                                            onChange={(e) =>
                                                updateOption(
                                                    index,
                                                    optionIndex,
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 rounded-xl border p-4"
                                            required
                                        />

                                    </div>

                                )
                            )}

                        </div>

                    </section>

                ))}

                <button
                    type="button"
                    onClick={addQuestion}
                    className="flex items-center gap-2 rounded-xl border px-6 py-3"
                >
                    <CirclePlus />
                    Add Question
                </button>

                {error && (
                    <div className="rounded-xl bg-red-100 p-4 text-red-700">
                        {error}
                    </div>
                )}

                <div className="flex justify-end">

                    <button
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
                                <Save />
                                Update Quiz
                            </>
                        )}
                    </button>

                </div>

            </form>

        </main>
    );
}