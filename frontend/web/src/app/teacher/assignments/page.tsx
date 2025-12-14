
import { Metadata } from 'next';
import Link from 'next/link';
import { PlusCircle, FileText, Calendar, Users, BarChart } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Assignments | Lumina Teacher',
    description: 'Manage assignments and view student submissions',
};

async function getAssignments() {
    try {
        const res = await fetch('http://localhost:8000/api/assignments/list', { cache: 'no-store' });
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Failed to fetch assignments", e);
        return [];
    }
}

export default async function AssignmentsPage() {
    const assignments = await getAssignments();

    return (
        <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Assignments</h1>
                    <p className="text-gray-400">Manage course work and track student progress</p>
                </div>
                <Link 
                    href="/teacher/assignments/create" 
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                >
                    <PlusCircle className="w-5 h-5" />
                    Create New Assignment
                </Link>
            </div>

            {/* Assignments Grid */}
            <div className="grid grid-cols-1 gap-6">
                {assignments.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
                        <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No assignments yet</h3>
                        <p className="text-gray-400 max-w-sm mx-auto mb-6">Get started by creating your first assignment for your students.</p>
                        <Link 
                            href="/teacher/assignments/create" 
                            className="text-amber-500 hover:text-amber-400 font-medium hover:underline"
                        >
                            Create Assignment
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/10 bg-black/20">
                                        <th className="p-6 text-sm font-semibold text-gray-300">Assignment</th>
                                        <th className="p-6 text-sm font-semibold text-gray-300">Course</th>
                                        <th className="p-6 text-sm font-semibold text-gray-300">Due Date</th>
                                        <th className="p-6 text-sm font-semibold text-gray-300">Status</th>
                                        <th className="p-6 text-sm font-semibold text-gray-300 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {assignments.map((assignment: any) => (
                                        <tr key={assignment.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{assignment.title}</h3>
                                                        <p className="text-sm text-gray-400 line-clamp-1">{assignment.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                                                    {assignment.course_id}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <Calendar className="w-4 h-4 text-gray-500" />
                                                    {new Date(assignment.due_date).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 pl-6">
                                                    {new Date(assignment.due_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-white">{assignment.submission_count || 0}</span>
                                                        <span className="text-xs text-gray-500">Submissions</span>
                                                    </div>
                                                    <div className="w-px h-8 bg-white/10"></div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-green-400">Active</span>
                                                        <span className="text-xs text-gray-500">Status</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <button className="px-4 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
