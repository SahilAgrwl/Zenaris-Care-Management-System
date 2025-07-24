import { useState } from 'react';
import { Plus, X, AlertTriangle, Shield, Edit2, Check, X as Cancel } from 'lucide-react';
import { AllergyIntolerance, SeverityLevel } from '../types';

interface Props {
  allergies: AllergyIntolerance[];
  onChange: (allergies: AllergyIntolerance[]) => void;
}

const commonAllergies = [
  'Nuts (Tree nuts)',
  'Peanuts',
  'Dairy/Milk',
  'Eggs',
  'Wheat/Gluten',
  'Soy',
  'Fish',
  'Shellfish',
  'Sesame',
];

const severityLevels = {
  mild: { label: 'Mild', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  moderate: { label: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-100' },
  severe: { label: 'Severe', color: 'text-red-600', bg: 'bg-red-100' },
};

const AllergiesSection = ({ allergies, onChange }: Props) => {
  const [newAllergy, setNewAllergy] = useState('');
  const [selectedType, setSelectedType] = useState<'allergy' | 'intolerance'>('allergy');
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityLevel>('moderate');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingType, setEditingType] = useState<'allergy' | 'intolerance'>('allergy');
  const [editingSeverity, setEditingSeverity] = useState<SeverityLevel>('moderate');

  const addAllergy = (name?: string) => {
    const allergyName = name || newAllergy.trim();
    if (!allergyName) return;
    
    // Check if already exists
    if (allergies.some(a => a.name.toLowerCase() === allergyName.toLowerCase())) {
      alert('This allergy/intolerance is already in the list');
      return;
    }
    
    const allergy: AllergyIntolerance = {
      id: Date.now().toString(),
      name: allergyName,
      type: selectedType,
      severity: selectedSeverity,
      isCommon: commonAllergies.includes(allergyName),
    };
    
    onChange([...allergies, allergy]);
    setNewAllergy('');
  };

  const removeAllergy = (id: string) => {
    onChange(allergies.filter(allergy => allergy.id !== id));
  };

  const updateSeverity = (id: string, severity: SeverityLevel) => {
    onChange(allergies.map(allergy => 
      allergy.id === id ? { ...allergy, severity } : allergy
    ));
  };

  const updateType = (id: string, type: 'allergy' | 'intolerance') => {
    onChange(allergies.map(allergy => 
      allergy.id === id ? { ...allergy, type } : allergy
    ));
  };

  const startEditing = (allergy: AllergyIntolerance) => {
    setEditingId(allergy.id);
    setEditingName(allergy.name);
    setEditingType(allergy.type);
    setEditingSeverity(allergy.severity);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
    setEditingType('allergy');
    setEditingSeverity('moderate');
  };

  const saveEdit = () => {
    if (!editingName.trim() || !editingId) return;
    
    // Check if the new name conflicts with existing allergies (except the one being edited)
    if (allergies.some(a => a.id !== editingId && a.name.toLowerCase() === editingName.trim().toLowerCase())) {
      alert('This allergy/intolerance is already in the list');
      return;
    }
    
    onChange(allergies.map(allergy => 
      allergy.id === editingId 
        ? { 
            ...allergy, 
            name: editingName.trim(), 
            type: editingType,
            severity: editingSeverity,
            isCommon: commonAllergies.includes(editingName.trim())
          }
        : allergy
    ));
    cancelEditing();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAllergy();
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  const availableCommonAllergies = commonAllergies.filter(
    common => !allergies.some(a => a.name.toLowerCase() === common.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <h2 className="text-lg font-semibold text-zenaris-dark">Allergies & Intolerances</h2>
        <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded-full">Critical</span>
      </div>

      {/* Warning */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-red-800 mb-1">Medical Alert</h3>
            <p className="text-sm text-red-700">
              Accurate allergy and intolerance information is essential for patient safety. 
              Severe allergies can be life-threatening.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Select Common Allergies */}
      {availableCommonAllergies.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-800">Quick Add Common Allergies</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {availableCommonAllergies.map((allergy) => (
              <button
                key={allergy}
                type="button"
                onClick={() => addAllergy(allergy)}
                className="text-left text-sm p-3 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                {allergy}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add Custom Allergy */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-800">Add Custom Allergy/Intolerance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="newAllergy" className="block text-sm font-medium text-gray-700 mb-2">
                Food/Ingredient
              </label>
              <input
                type="text"
                id="newAllergy"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="e.g., Strawberries, MSG..."
              />
            </div>
            <div>
              <label htmlFor="allergyType" className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                id="allergyType"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'allergy' | 'intolerance')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="allergy">Allergy</option>
                <option value="intolerance">Intolerance</option>
              </select>
            </div>
            <div>
              <label htmlFor="allergySeverity" className="block text-sm font-medium text-gray-700 mb-2">
                Severity
              </label>
              <select
                id="allergySeverity"
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value as SeverityLevel)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {Object.entries(severityLevels).map(([value, config]) => (
                  <option key={value} value={value}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => addAllergy()}
            disabled={!newAllergy.trim()}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Allergy/Intolerance
          </button>
        </div>
      </div>

      {/* Severity Guide */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h3 className="font-medium text-gray-800 mb-3">Severity Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span><strong>Mild:</strong> Digestive discomfort, minor symptoms</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span><strong>Moderate:</strong> Clear symptoms, requires avoidance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span><strong>Severe:</strong> Dangerous reaction, medical emergency risk</span>
          </div>
        </div>
      </div>

      {/* Display Allergies */}
      {allergies.length > 0 && (
        <div className="space-y-3">
          {allergies.map((allergy) => {
            const severityConfig = severityLevels[allergy.severity];
            return (
              <div
                key={allergy.id}
                className="bg-white border-2 border-red-200 rounded-lg p-4 hover:bg-red-50 transition-colors"
              >
                {editingId === allergy.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyPress={handleEditKeyPress}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      autoFocus
                      placeholder="Enter allergy/intolerance name"
                    />
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                      <select
                        value={editingType}
                        onChange={(e) => setEditingType(e.target.value as 'allergy' | 'intolerance')}
                        className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      >
                        <option value="allergy">Allergy</option>
                        <option value="intolerance">Intolerance</option>
                      </select>
                      <select
                        value={editingSeverity}
                        onChange={(e) => setEditingSeverity(e.target.value as SeverityLevel)}
                        className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      >
                        {Object.entries(severityLevels).map(([value, config]) => (
                          <option key={value} value={value}>
                            {config.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col xs:flex-row gap-2">
                      <button
                        type="button"
                        onClick={saveEdit}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                      >
                        <Cancel className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Mobile and Desktop Layout */}
                    <div className="flex flex-col gap-3">
                      {/* Header with name and badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-gray-800 break-words">{allergy.name}</span>
                        {allergy.isCommon && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full whitespace-nowrap">
                            Common
                          </span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${severityConfig.bg} ${severityConfig.color}`}>
                          {severityConfig.label}
                        </span>
                      </div>
                      
                      {/* Controls row - mobile responsive */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-col xs:flex-row gap-2">
                          <select
                            value={allergy.type}
                            onChange={(e) => updateType(allergy.id, e.target.value as 'allergy' | 'intolerance')}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-red-500 focus:border-transparent flex-shrink-0"
                          >
                            <option value="allergy">Allergy</option>
                            <option value="intolerance">Intolerance</option>
                          </select>
                          <select
                            value={allergy.severity}
                            onChange={(e) => updateSeverity(allergy.id, e.target.value as SeverityLevel)}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-red-500 focus:border-transparent flex-shrink-0"
                          >
                            {Object.entries(severityLevels).map(([value, config]) => (
                              <option key={value} value={value}>
                                {config.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => startEditing(allergy)}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                            aria-label={`Edit ${allergy.name}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeAllergy(allergy.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                            aria-label={`Remove ${allergy.name}`}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {allergies.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No allergies or intolerances recorded</p>
          <p className="text-sm">Add any known allergies or food intolerances</p>
        </div>
      )}
    </div>
  );
};

export default AllergiesSection; 