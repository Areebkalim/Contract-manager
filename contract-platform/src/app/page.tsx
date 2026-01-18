'use client';

import Link from 'next/link';
import { useContractStore } from '@/store/useContractStore';
import { FileText, Plus } from 'lucide-react';
import clsx from 'clsx';

export default function Dashboard() {
  const contracts = useContractStore((state) => state.contracts);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contracts</h1>
          <p className="text-slate-500 mt-1">Manage and track your active contracts.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/blueprints/new"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
          >
            <Plus size={18} />
            <span>New Blueprint</span>
          </Link>
          <Link 
            href="/contracts/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm"
          >
            <FileText size={18} />
            <span>Draft Contract</span>
          </Link>
        </div>
      </div>

      {/* Contracts Table */}
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
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  No contracts found. Click "Draft Contract" to start!
                </td>
              </tr>
            ) : (
              contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{contract.name}</td>
                  <td className="px-6 py-4 text-slate-600">{contract.blueprintName}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      'px-2.5 py-1 rounded-full text-xs font-medium border',
                      contract.status === 'Created' && 'bg-blue-50 text-blue-700 border-blue-200',
                      contract.status === 'Signed' && 'bg-green-50 text-green-700 border-green-200',
                    )}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(contract.createdDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}