"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
    CirclePlus,
    Save,
    Trash2,
    Loader2,
} from "lucide-react";

import api from "@/lib/axios";

interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
}

export default function AddQuizPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [title, setTitle] = useState("");

    const [questions, setQuestions] = useState<Question[]>([
        {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
        },
    ]);

    function updateQuestion(
        index: number,
        value: string
    ) {
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
        copy[questionIndex].options[optionIndex] =
            value;
        setQuestions(copy);
    }

    function updateCorrectAnswer(
        questionIndex: number,
        optionIndex: number
    ) {
        const copy = [...questions];
        copy[questionIndex].correctAnswer =
            optionIndex;
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
            setLoading(true);
            setError("");

            await api.post("/api/quizzes", {
                title,
                questions,
            });

            router.back();
        } catch (err: any) {
            setError(
                err.response?.data?.error?.message ??
                "Failed to create quiz."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="mx-auto max-w-6xl p-8">

            <h1 className="mb-8 text-4xl font-bold">
                Create Quiz
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
                        placeholder="Quiz 1"
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
                                        removeQuestion(
                                            index
                                        )
                                    }
                                    className="text-red-500"
                                >
                                    <Trash2 />
                                </button>
                            )}

                        </div>

                        <textarea
                            value={question.question}
                            onChange={(e) =>
                                updateQuestion(
                                    index,
                                    e.target.value
                                )
                            }
                            className="mb-8 w-full rounded-xl border p-4"
                            rows={3}
                            placeholder="Question..."
                            required
                        />

                        <div className="space-y-4">

                            {question.options.map(
                                (
                                    option,
                                    optionIndex
                                ) => (

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
                                                    e.target
                                                        .value
                                                )
                                            }
                                            className="flex-1 rounded-xl border p-4"
                                            placeholder={`Option ${optionIndex +
                                                1
                                                }`}
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
                        disabled={loading}
                        className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save />
                                Create Quiz
                            </>
                        )}
                    </button>

                </div>

            </form>

        </main>
    );
}