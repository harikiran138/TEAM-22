"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Download, Calendar, User, Clock, Loader2 } from 'lucide-react';

export default function AssignmentSubmissionsPage() {
    const params = useParams();
    const router = useRouter();
    const assignmentId = params.id as string;

    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, [assignmentId]);

    const fetchSubmissions = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/assignments/${assignmentId}/submissions`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setSubmissions(data);
            }
        } catch (e) {
            console.error("Failed to fetch submissions", e);
        } finally {
            setLoading(false);
        }
    };

    const getFileUrl = (filePath: string) => {
        // filePath is like "data/uploads/filename.ext" or absolute path
        // We need to extract filename and prepend backend URL
        const filename = filePath.split(/[\\/]/).pop();
        return `http://localhost:8000/uploads/${filename}`;
    };

    return (
        <div className="p-6 md:p-8 space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/teacher/assignments"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Submissions</h1>
                    <p className="text-gray-400">Assignment ID: <span className="font-mono text-amber-500">{assignmentId}</span></p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                </div>
            ) : submissions.length === 0 ? (
                <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
                    <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No submissions yet</h3>
                    <p className="text-gray-400">Students haven't submitted any work for this assignment.</p>
                </div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/20">
                                    <th className="p-6 text-sm font-semibold text-gray-300">Student</th>
                                    <th className="p-6 text-sm font-semibold text-gray-300">Submitted At</th>
                                    <th className="p-6 text-sm font-semibold text-gray-300">File</th>
                                    <th className="p-6 text-sm font-semibold text-gray-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {submissions.map((sub: any) => (
                                    <tr key={sub.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                                                    {sub.student_id.substring(0, 2).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-white">{sub.student_id}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Clock className="w-4 h-4 text-gray-500" />
                                                {new Date(sub.timestamp).toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 text-gray-300 font-mono text-xs">
                                                <FileText className="w-4 h-4 text-gray-500" />
                                                {sub.file_path.split(/[\\/]/).pop()}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <a
                                                href={getFileUrl(sub.file_path)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-amber-500 hover:bg-amber-400 rounded-lg transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                                            >
                                                <Download size={16} />
                                                Review Document
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
