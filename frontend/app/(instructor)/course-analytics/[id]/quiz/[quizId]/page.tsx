"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CirclePlus, Loader2, Save, Trash2 } from "lucide-react";
import api from "@/lib/axios";
import QuestionCreator from "@/components/question/QuestionInput";
import { Question } from "@/types/question";
import { Quiz } from "@/types/quiz";
import { Circle, CircleDot } from "lucide-react";



export default function EditQuizPage() {
    const router = useRouter();

    const { id, quizId } = useParams<{
        id: string;
        quizId: string;
    }>();

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quiz, setQuiz] = useState<Quiz | null>(null);

    useEffect(() => {
        if (!id || !quizId) {
            return;
        }

        async function fetchQuiz() {
            try {
                setLoading(true);
                const response = await api.get(
                    `/api/courses/${id}/quizzes/${quizId}`
                );
                setQuiz(response.data.quiz);
                setTitle(response.data.quiz.title);
                setDescription(response.data.quiz.description);
            } catch (err) {
                setError(
                    "Failed to fetch quiz data. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchQuiz();
    }, [id, quizId]);


    async function fetchQuestions() {
        try {
            setLoading(true);
            const response = await api.get(
                `/question/${quizId}`
            );

            console.log("Fetched questions:", response);

            setQuestions(response.data.questions);
        } catch (err) {
            setError(
                "Failed to fetch quiz data. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        if (!id || !quizId) {

            return;
        }

        fetchQuestions();


    }, [id, quizId]);

    async function deleteQuestion(questionId: number) {

        try {
            const response = await api.delete(
                `/question/${questionId}`
            );
        }
        catch (err) {
            setError(
                "Failed to delete question. Please try again later."
            );
        }
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

                    <label className="mb-2 block font-semibold">
                        Description
                    </label>

                    <input
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        className="w-full rounded-xl border p-4"
                        required
                    />

                </section>

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

            <QuestionCreator quizId={quizId} onCreation={fetchQuestions} />


            {questions.map((question) => (

                <div
                    key={question.id}
                    className="items-center justify-between rounded-xl bg-white p-5 shadow"
                >

                    <p className="flex items-center justify-between gap-3 text-lg font-semibold">

                        <div>
                            {question.statement || "Untitled Question"}
                        </div>


                        <button
                            onClick={() =>
                                deleteQuestion(question.id || 0)
                            }
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 />
                        </button>
                    </p>


                    <ul className="space-y-2">
                        {question.options?.map((option, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-3 rounded-lg px-3 py-2"
                            >
                                {question.correctAnswer === index ? (
                                    <CircleDot className="h-5 w-5 text-green-600" />
                                ) : (
                                    <Circle className="h-5 w-5 text-slate-400" />
                                )}

                                <span
                                    className={
                                        question.correctAnswer === index
                                            ? "font-medium text-green-700"
                                            : "text-slate-700"
                                    }
                                >
                                    {option}
                                </span>
                            </li>
                        ))}
                    </ul>




                </div>

            ))}


        </main>
    );
}