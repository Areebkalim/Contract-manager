'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Save } from 'lucide-react';
import { useContractStore } from '@/store/useContractStore';
import { FieldType } from '@/types';

export default function CreateBlueprintPage() {
  const router = useRouter();
  const addBlueprint = useContractStore((state) => state.addBlueprint);

  const [name, setName] = useState('');
  const [fields, setFields] = useState<Array<{ id: string; type: FieldType; label: string }>>([]);

  const handleAddField = () => {
    setFields([
      ...fields,
      { id: crypto.randomUUID(), type: 'text', label: '' },
    ]);
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleFieldChange = (id: string, key: 'label' | 'type', value: string) => {
    setFields(
      fields.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    );
  };

  const handleSave = () => {
    if (!name.trim()) return alert('Please enter a blueprint name');
    if (fields.length === 0) return alert('Please add at least one field');

    const newBlueprint = {
      id: crypto.randomUUID(),
      name,
      fields: fields.map((f, index) => ({ ...f, position: index })),
    };

    addBlueprint(newBlueprint);
    router.push('/'); // Go back to dashboard after saving
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create New Blueprint</h1>
        <p className="text-slate-500">Define the structure for your future contracts.</p>
      </div>

      <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Blueprint Name
          </label>
          <input
            type="text"
            placeholder="e.g. Non-Disclosure Agreement"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Fields</h2>
            <button
              onClick={handleAddField}
              className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus size={16} />
              <span>Add Field</span>
            </button>
          </div>

          {fields.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300 text-slate-500">
              No fields added yet. Click "Add Field" to start.
            </div>
          )}

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="mt-3 text-xs font-bold text-slate-400">#{index + 1}</span>
              
              <div className="flex-1 space-y-1">
                <label className="text-xs font-medium text-slate-500">Field Label</label>
                <input
                  type="text"
                  placeholder="e.g. Full Name"
                  value={field.label}
                  onChange={(e) => handleFieldChange(field.id, 'label', e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </div>

              <div className="w-32 space-y-1">
                <label className="text-xs font-medium text-slate-500">Type</label>
                <select
                  value={field.type}
                  onChange={(e) => handleFieldChange(field.id, 'type', e.target.value as FieldType)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white text-slate-900"
                >
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                  <option value="signature">Signature</option>
                  <option value="checkbox">Checkbox</option>
                </select>
              </div>

              <button
                onClick={() => handleRemoveField(field.id)}
                className="mt-6 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Save size={18} />
          <span>Save Blueprint</span>
        </button>
      </div>
    </div>
  );
}