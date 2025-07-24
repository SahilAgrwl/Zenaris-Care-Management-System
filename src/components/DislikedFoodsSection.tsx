import { useState } from 'react';
import { Plus, X, ThumbsDown, AlertCircle, Edit2, Check, X as Cancel } from 'lucide-react';
import { DislikedFood } from '../types';

interface Props {
  foods: DislikedFood[];
  onChange: (foods: DislikedFood[]) => void;
}

const severityLevels = {
  mild_dislike: { label: 'Mild Dislike', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  strong_dislike: { label: 'Strong Dislike', color: 'text-orange-600', bg: 'bg-orange-100' },
  absolutely_wont_eat: { label: 'Absolutely Won\'t Eat', color: 'text-red-600', bg: 'bg-red-100' },
};

const DislikedFoodsSection = ({ foods, onChange }: Props) => {
  const [newFood, setNewFood] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<DislikedFood['severity']>('mild_dislike');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingSeverity, setEditingSeverity] = useState<DislikedFood['severity']>('mild_dislike');

  const addFood = () => {
    if (!newFood.trim()) return;
    
    const food: DislikedFood = {
      id: Date.now().toString(),
      name: newFood.trim(),
      severity: selectedSeverity,
    };
    
    onChange([...foods, food]);
    setNewFood('');
  };

  const removeFood = (id: string) => {
    onChange(foods.filter(food => food.id !== id));
  };

  const updateSeverity = (id: string, severity: DislikedFood['severity']) => {
    onChange(foods.map(food => 
      food.id === id ? { ...food, severity } : food
    ));
  };

  const startEditing = (food: DislikedFood) => {
    setEditingId(food.id);
    setEditingName(food.name);
    setEditingSeverity(food.severity);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
    setEditingSeverity('mild_dislike');
  };

  const saveEdit = () => {
    if (!editingName.trim() || !editingId) return;
    
    onChange(foods.map(food => 
      food.id === editingId 
        ? { ...food, name: editingName.trim(), severity: editingSeverity }
        : food
    ));
    cancelEditing();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFood();
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

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2">
        <ThumbsDown className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
        <h2 className="text-base sm:text-lg font-semibold text-zenaris-dark">Disliked Foods</h2>
      </div>

      {/* Add New Food */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="lg:col-span-2">
              <label htmlFor="newDislikedFood" className="block text-sm font-medium text-gray-700 mb-2">
                Add Disliked Food
              </label>
              <input
                type="text"
                id="newDislikedFood"
                value={newFood}
                onChange={(e) => setNewFood(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                placeholder="e.g., Brussels sprouts, Spicy food..."
              />
            </div>
            <div>
              <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level
              </label>
              <select
                id="severity"
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value as DislikedFood['severity'])}
                className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
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
            onClick={addFood}
            disabled={!newFood.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Disliked Food
          </button>
        </div>
      </div>

      {/* Severity Level Guide */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
        <h3 className="font-medium text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Severity Levels
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mt-0.5 flex-shrink-0"></div>
            <span><strong>Mild Dislike:</strong> Prefers to avoid but will eat if necessary</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full mt-0.5 flex-shrink-0"></div>
            <span><strong>Strong Dislike:</strong> Very resistant, likely to refuse</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full mt-0.5 flex-shrink-0"></div>
            <span><strong>Won't Eat:</strong> Will absolutely refuse, may cause distress</span>
          </div>
        </div>
      </div>

      {/* Display Foods */}
      {foods.length > 0 && (
        <div className="space-y-3">
          {foods.map((food) => {
            const severityConfig = severityLevels[food.severity];
            return (
              <div
                key={food.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                {editingId === food.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyPress={handleEditKeyPress}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      autoFocus
                    />
                    <select
                      value={editingSeverity}
                      onChange={(e) => setEditingSeverity(e.target.value as DislikedFood['severity'])}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {Object.entries(severityLevels).map(([value, config]) => (
                        <option key={value} value={value}>
                          {config.label}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={saveEdit}
                        className="flex-1 flex items-center justify-center gap-1 bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="flex-1 flex items-center justify-center gap-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
                      >
                        <Cancel className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-800">{food.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${severityConfig.bg} ${severityConfig.color}`}>
                          {severityConfig.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={food.severity}
                        onChange={(e) => updateSeverity(food.id, e.target.value as DislikedFood['severity'])}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {Object.entries(severityLevels).map(([value, config]) => (
                          <option key={value} value={value}>
                            {config.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => startEditing(food)}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        aria-label={`Edit ${food.name}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFood(food.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${food.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {foods.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ThumbsDown className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No disliked foods added yet</p>
          <p className="text-sm">Add foods that the patient prefers to avoid</p>
        </div>
      )}
    </div>
  );
};

export default DislikedFoodsSection; 