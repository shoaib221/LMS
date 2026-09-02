"use client";

import { ChangeEvent, useState } from "react";
import { Question } from "@/types/question";
import api from "@/lib/axios";
import ErrorProcessor from "@/lib/ErrorProcessor";


interface QuestionEditorProps {
    onCreation: () => void;
    quizId: string;
}

export default function QuestionCreator({
    onCreation,
    quizId,
}: QuestionEditorProps) {

    const [formData, setFormData] = useState<Question>({
        statement: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        order: 0,
        quiz: 0,
    });

    const [error, setError] = useState("");

    async function CreateQuestion() {
        try {
            const response = await api.post(`/question/${quizId}`, formData);
            onCreation();

            setFormData({
                statement: "",
                options: ["", "", "", ""],
                correctAnswer: 0,
                order: 0,
                quiz: 0,
            });
        } catch (error) {
            setError(ErrorProcessor(error));
        }
    }



    return (
        <div className="space-y-6 rounded-2xl bg-white p-6 shadow">

            <div>
                <label className="mb-2 block font-semibold">
                    Statement
                </label>

                <textarea
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border p-3"
                    placeholder="Enter question..."
                />
            </div>



            <div className="space-y-3">

                <label className="block font-semibold">
                    Options
                </label>

                {formData.options.map((option, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3"
                    >
                        <input
                            type="radio"
                            checked={
                                formData.correctAnswer ===
                                index
                            }
                            onChange={() =>
                                setFormData({ ...formData, correctAnswer: index })
                            }
                        />

                        <input
                            value={option}
                            onChange={(e) =>
                                setFormData({ ...formData, options: formData.options.map((o, i) => i === index ? e.target.value : o) })
                            }
                            className="flex-1 rounded-xl border p-3"
                            placeholder={`Option ${index + 1}`}
                        />
                    </div>
                ))}

            </div>

            {error && (
                <div className="rounded-xl bg-red-100 p-4 text-red-700">
                    {error}
                </div>
            )}

            <button onClick={CreateQuestion} className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
                Create Question
            </button>

        </div>
    );
}