"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import './BlocknoteEditor.css'

import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

interface Props {
    value?: any[];
    onChange: (name: string, value: any[]) => void;
    name: string;
}

export default function LessonEditor({
    name, value, onChange
}: Props) {


    const editor = useCreateBlockNote({
        initialContent:
            value && value.length > 0
                ? value
                : [
                    {
                        type: "paragraph",
                        content: [],
                    },
                ],
    });

    return (
        <div className="h-[700px] overflow-y-auto rounded-xl border">
            <BlockNoteView
                editor={editor}
                onChange={() =>
                    onChange(name, editor.document)
                }
            />
        </div>
    );
}