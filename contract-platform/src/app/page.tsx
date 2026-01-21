'use client';

import Link from 'next/link';
import { FileText, Plus } from 'lucide-react';

const contracts = [
  { id: '1', name: 'Vendor Agreement - Alpha', blueprintName: 'Standard Service Agreement', status: 'Draft', createdDate: new Date().toISOString() },
  { id: '2', name: 'Employee Contract - John Doe', blueprintName: 'Employment Template', status: 'Pending Signature', createdDate: new Date().toISOString() },
  { id: '3', name: 'NDA - Project X', blueprintName: 'Non-Disclosure Agreement', status: 'Signed', createdDate: new Date().toISOString() },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contracts</h1>
          <p className="text-slate-500 mt-1">Manage and track your active contracts.</p>
        </div>
        <div className="flex gap-3">
          
          {/* FIXED: Now uses Link instead of button */}
          <Link 
            href="/blueprints/new" 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors"
          >
             <Plus size={18} /> <span>New Blueprint</span>
          </Link>

          {/* FIXED: Now uses Link instead of button */}
          <Link 
            href="/contracts/new" 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
          >
             <FileText size={18} /> <span>Draft Contract</span>
          </Link>

        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Contract Name</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Blueprint</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {contracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{contract.name}</td>
                <td className="px-6 py-4 text-slate-600">{contract.blueprintName}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${contract.status === 'Signed' ? 'bg-green-100 text-