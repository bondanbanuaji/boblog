import { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Youtube } from "@tiptap/extension-youtube";

interface TipTapEditorProps {
    content?: string;
    onChange?: (html: string) => void;
    placeholder?: string;
}

const MenuButton = ({
    onClick,
    isActive = false,
    disabled = false,
    title,
    children,
}: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`btn btn-xs btn-ghost ${isActive ? "btn-active bg-primary/20 text-primary" : ""}`}
    >
        {children}
    </button>
);

export default function TipTapEditor({
    content = "",
    onChange,
    placeholder = "Mulai menulis artikelmu...",
}: TipTapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3, 4] },
            }),
            Image.configure({ inline: false, allowBase64: true }),
            Link.configure({ openOnClick: false, autolink: true }),
            Placeholder.configure({ placeholder }),
            Underline,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Table.configure({ resizable: true }),
            TableRow,
            TableCell,
            TableHeader,
            Youtube.configure({ width: 640, height: 360 }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class:
                    "prose prose-lg max-w-none min-h-[400px] p-4 focus:outline-none",
            },
        },
    });

    const addImage = useCallback(() => {
        const url = window.prompt("URL Gambar:");
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const addLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL Link:", previousUrl);
        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }, [editor]);

    const addYoutube = useCallback(() => {
        const url = window.prompt("URL Video YouTube:");
        if (url && editor) {
            editor.chain().focus().setYoutubeVideo({ src: url }).run();
        }
    }, [editor]);

    const addTable = useCallback(() => {
        if (editor) {
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        }
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="border border-base-300 rounded-xl overflow-hidden bg-base-100">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 bg-base-200 border-b border-base-300 sticky top-0 z-10">
                {/* Text formatting */}
                <div className="flex gap-0.5 border-r border-base-300 pr-2 mr-1">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive("bold")}
                        title="Bold"
                    >
                        <strong>B</strong>
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive("italic")}
                        title="Italic"
                    >
                        <em>I</em>
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive("underline")}
                        title="Underline"
                    >
                        <u>U</u>
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive("strike")}
                        title="Strikethrough"
                    >
                        <s>S</s>
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        isActive={editor.isActive("code")}
                        title="Inline Code"
                    >
                        {"</>"}
                    </MenuButton>
                </div>

                {/* Headings */}
                <div className="flex gap-0.5 border-r border-base-300 pr-2 mr-1">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive("heading", { level: 2 })}
                        title="Heading 2"
                    >
                        H2
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive("heading", { level: 3 })}
                        title="Heading 3"
                    >
                        H3
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        isActive={editor.isActive("heading", { level: 4 })}
                        title="Heading 4"
                    >
                        H4
                    </MenuButton>
                </div>

                {/* Alignment */}
                <div className="flex gap-0.5 border-r border-base-300 pr-2 mr-1">
                    <MenuButton
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                        isActive={editor.isActive({ textAlign: "left" })}
                        title="Rata Kiri"
                    >
                        ≡
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                        isActive={editor.isActive({ textAlign: "center" })}
                        title="Rata Tengah"
                    >
                        ≡
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                        isActive={editor.isActive({ textAlign: "right" })}
                        title="Rata Kanan"
                    >
                        ≡
                    </MenuButton>
                </div>

                {/* Lists */}
                <div className="flex gap-0.5 border-r border-base-300 pr-2 mr-1">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive("bulletList")}
                        title="Bullet List"
                    >
                        •
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive("orderedList")}
                        title="Numbered List"
                    >
                        1.
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive("blockquote")}
                        title="Blockquote"
                    >
                        ❝
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        isActive={editor.isActive("codeBlock")}
                        title="Code Block"
                    >
                        {"{ }"}
                    </MenuButton>
                </div>

                {/* Insert */}
                <div className="flex gap-0.5 border-r border-base-300 pr-2 mr-1">
                    <MenuButton onClick={addImage} title="Sisipkan Gambar">
                        🖼️
                    </MenuButton>
                    <MenuButton onClick={addLink} isActive={editor.isActive("link")} title="Sisipkan Link">
                        🔗
                    </MenuButton>
                    <MenuButton onClick={addYoutube} title="Sisipkan Video YouTube">
                        ▶️
                    </MenuButton>
                    <MenuButton onClick={addTable} title="Sisipkan Tabel">
                        📊
                    </MenuButton>
                </div>

                {/* Misc */}
                <div className="flex gap-0.5">
                    <MenuButton
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        title="Garis Horizontal"
                    >
                        ―
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        title="Undo"
                    >
                        ↩
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        title="Redo"
                    >
                        ↪
                    </MenuButton>
                </div>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />

            {/* Word count */}
            <div className="flex justify-between items-center px-4 py-2 bg-base-200 border-t border-base-300 text-xs opacity-60">
                <span>
                    {editor.storage.characterCount?.characters?.() ?? editor.getText().length} karakter
                </span>
                <span>
                    {editor.getText().split(/\s+/).filter(Boolean).length} kata
                </span>
            </div>
        </div>
    );
}
