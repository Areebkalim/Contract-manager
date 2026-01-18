'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContractStore } from '@/store/useContractStore';
import { Save } from 'lucide-react';

export default function CreateContractPage() {
  const router = useRouter();
  const blueprints = useContractStore((state) => state.blueprints);
  const addContract = useContractStore((state) => state.addContract);

  const [selectedBlueprintId, setSelectedBlueprintId] = useState('');
  const [contractName, setContractName] = useState('');
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  const selectedBlueprint = blueprints.find((b) => b.id === selectedBlueprintId);

  const handleSave = () => {
    if (!selectedBlueprint || !contractName) return alert('Please complete all fields');

    const newContract = {
      id: crypto.randomUUID(),
      name: contractName,
      blueprintId: selectedBlueprint.id,
      blueprintName: selectedBlueprint.name,
      status: 'Created' as const,
      createdDate: new Date().toISOString(),
      fieldValues: fieldValues, // Saves the user's answers
    };

    addContract(newContract);
    router.push('/'); // Go to dashboard
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Draft New Contract</h1>
        <p className="text-slate-500">Select a blueprint to generate a contract.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
        {/* Step 1: Select Template */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Select Blueprint
          </label>
          <select
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900"
            value={selectedBlueprintId}
            onChange={(e) => setSelectedBlueprintId(e.target.value)}
          >
            <option value="">-- Choose a Template --</option>
            {blueprints.map((bp) => (
              <option key={bp.id} value={bp.id}>
                {bp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Fill Details (Only shows after selection) */}
        {selectedBlueprint && (
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Contract Name
              </label>
              <input
                type="text"
                placeholder="e.g. NDA for John Doe"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900"
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
              />
            </div>

            <h3 className="font-semibold text-slate-900 pt-2">Contract Details</h3>
            
            {/* Dynamic Fields Generator */}
            {selectedBlueprint.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {field.label}
                </label>
                {field.type === 'date' ? (
                  <input
                    type="date"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900"
                    onChange={(e) => setFieldValues({ ...fieldValues, [field.label]: e.target.value })}
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900"
                    placeholder={`Enter ${field.label}`}
                    onChange={(e) => setFieldValues({ ...fieldValues, [field.label]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={!selectedBlueprint}
          className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          <span>Create Contract</span>
        </button>
      </div>
    </div>
  );
}