"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";

interface Assignment {
    id: string;
    title: string;
    course_id: string;
    description: string;
    due_date: string;
    created_by: string;
}

export default function StudentAssignmentsPage() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState<string | null>(null);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/assignments/list");
            const data = await res.json();
            setAssignments(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, assignmentId: string) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        setSubmitting(assignmentId);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "assignment");
        formData.append("user_id", "student_demo"); // Mock user
        formData.append("course_id", "demo_course"); // Mock course
        formData.append("assignment_id", assignmentId);

        try {
            const res = await fetch("http://localhost:8000/api/handwriting/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("Assignment submitted successfully!");
            } else {
                alert("Submission failed.");
            }
        } catch (err) {
            console.error(err);
            alert("Error uploading file.");
        } finally {
            setSubmitting(null);
            // Optionally refresh state to show "Submitted" status if we successfully tracked it
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-2">My Assignments</h1>
            <p className="text-gray-400 mb-8">View and submit your course work.</p>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
                </div>
            ) : (
                <div className="grid gap-6">
                    {assignments.length === 0 && <p className="text-gray-400">No assignments due.</p>}

                    {assignments.map((asm) => (
                        <div key={asm.id} className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 hover:border-blue-500/30 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-blue-900/40 text-blue-400 text-xs px-2 py-1 rounded uppercase tracking-wide font-semibold">
                                        {asm.course_id}
                                    </span>
                                    <span className="text-gray-400 text-sm flex items-center gap-1">
                                        Due: {new Date(asm.due_date).toLocaleDateString()}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-white mb-2">{asm.title}</h2>
                                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{asm.description}</p>
                            </div>

                            <div className="flex flex-col gap-3 justify-center min-w-[200px]">
                                <label className={`
                                    flex items-center justify-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-all font-medium text-sm
                                    ${submitting === asm.id
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20'}
                                `}>
                                    {submitting === asm.id ? (
                                        <>
                                            <Loader2 className="animate-spin w-4 h-4" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4" />
                                            Upload Submission
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*,.pdf"
                                        disabled={submitting === asm.id}
                                        onChange={(e) => handleFileUpload(e, asm.id)}
                                    />
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
