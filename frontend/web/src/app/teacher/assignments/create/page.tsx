"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function CreateAssignment() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.append("created_by", "Teacher"); // Mock auth

        try {
            const res = await fetch("http://localhost:8000/api/assignments/create", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("Assignment Created Successfully!");
                (e.target as HTMLFormElement).reset();
            } else {
                alert("Failed to create assignment");
            }
        } catch (err) {
            console.error(err);
            alert("Error creating assignment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create New Assignment</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input name="title" required placeholder="e.g. Calculus Chapter 1" className="w-full p-2 border rounded dark:bg-gray-700" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Course ID</label>
                    <select name="course_id" className="w-full p-2 border rounded dark:bg-gray-700">
                        <option value="math101">Math 101</option>
                        <option value="phy101">Physics 101</option>
                        <option value="cs101">CS 101</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Due Date</label>
                    <input name="due_date" type="datetime-local" required className="w-full p-2 border rounded dark:bg-gray-700" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea name="description" required rows={4} className="w-full p-2 border rounded dark:bg-gray-700" placeholder="Instructions..."></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex justify-center items-center gap-2"
                >
                    {loading && <Loader2 className="animate-spin w-4 h-4" />}
                    Create Assignment
                </button>
            </form>
        </div>
    );
}
