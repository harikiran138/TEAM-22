"use client";

import { useEffect, useState } from "react";
import { Loader2, Calendar, CheckCircle } from "lucide-react";
import HandwritingUpload from "@/components/HandwritingUpload";

interface Assignment {
    id: string;
    title: string;
    course_id: string;
    description: string;
    due_date: string;
}

export default function StudentAssignments() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8000/api/assignments/list")
            .then(res => res.json())
            .then(data => setAssignments(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Homework & Assignments</h1>

            {loading ? <Loader2 className="animate-spin" /> : (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* List */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">To Do</h2>
                        {assignments.length === 0 && <p className="text-gray-500">No pending assignments.</p>}
                        {assignments.map(asm => (
                            <div
                                key={asm.id}
                                onClick={() => setSelectedId(asm.id)}
                                className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedId === asm.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold">{asm.title}</h3>
                                    <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 uppercase font-mono">{asm.course_id}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{asm.description}</p>
                                <div className="flex items-center text-xs text-red-500 gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Due: {new Date(asm.due_date).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submission Panel */}
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border h-fit sticky top-8">
                        {selectedId ? (
                            <>
                                <h2 className="text-xl font-semibold mb-2">Submit Assignment</h2>
                                <p className="text-sm text-gray-500 mb-6">Upload your handwritten work for <strong>{assignments.find(a => a.id === selectedId)?.title}</strong></p>

                                {/* Need to update HandwritingUpload to support assignmentId prop, checking... it wasn't there before, I need to update it */}
                                <HandwritingUploadWrapper assignmentId={selectedId} />
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
                                <p>Select an assignment to submit work.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Wrapper to inject assignment Id since the component prop was originally just type/user
// Wait, I haven't updated the React Component props yet in the file, only the backend.
// I will update the HandwritingUpload component file next.
function HandwritingUploadWrapper({ assignmentId }: { assignmentId: string }) {
    return <HandwritingUpload type="assignment" userId="student" assignmentId={assignmentId} />;
}
