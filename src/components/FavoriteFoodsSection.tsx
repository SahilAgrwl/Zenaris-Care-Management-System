import { useState } from 'react';
import { Plus, X, Heart, Coffee, Utensils, Cookie, Edit2, Check, X as Cancel } from 'lucide-react';
import { FoodItem, MealCategory } from '../types';

interface Props {
  foods: FoodItem[];
  onChange: (foods: FoodItem[]) => void;
}

const categoryIcons = {
  breakfast: Coffee,
  lunch: Utensils,
  dinner: Utensils,
  snacks: Cookie,
  beverages: Coffee,
};

const categoryLabels = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snacks: 'Snacks',
  beverages: 'Beverages',
};

const FavoriteFoodsSection = ({ foods, onChange }: Props) => {
  const [newFood, setNewFood] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MealCategory>('breakfast');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingCategory, setEditingCategory] = useState<MealCategory>('breakfast');

  const addFood = () => {
    if (!newFood.trim()) return;
    
    const food: FoodItem = {
      id: Date.now().toString(),
      name: newFood.trim(),
      category: selectedCategory,
    };
    
    onChange([...foods, food]);
    setNewFood('');
  };

  const removeFood = (id: string) => {
    onChange(foods.filter(food => food.id !== id));
  };

  const startEditing = (food: FoodItem) => {
    setEditingId(food.id);
    setEditingName(food.name);
    setEditingCategory(food.category || 'snacks');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
    setEditingCategory('breakfast');
  };

  const saveEdit = () => {
    if (!editingName.trim() || !editingId) return;
    
    onChange(foods.map(food => 
      food.id === editingId 
        ? { ...food, name: editingName.trim(), category: editingCategory }
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

  const groupedFoods = foods.reduce((acc, food) => {
    const category = food.category || 'snacks';
    if (!acc[category]) acc[category] = [];
    acc[category].push(food);
    return acc;
  }, {} as Record<MealCategory, FoodItem[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-zenaris-dark">Favorite Foods</h2>
      </div>

      {/* Add New Food */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="newFood" className="block text-sm font-medium text-gray-700 mb-2">
                Add Favorite Food
              </label>
              <input
                type="text"
                id="newFood"
                value={newFood}
                onChange={(e) => setNewFood(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Chocolate ice cream, Grilled chicken..."
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as MealCategory)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={addFood}
            disabled={!newFood.trim()}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Food
          </button>
        </div>
      </div>

      {/* Display Foods by Category */}
      {Object.entries(groupedFoods).map(([category, categoryFoods]) => {
        const Icon = categoryIcons[category as MealCategory];
        return (
          <div key={category} className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-zenaris-gray" />
              <h3 className="font-medium text-gray-800">
                {categoryLabels[category as MealCategory]} ({categoryFoods.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {categoryFoods.map((food) => (
                <div
                  key={food.id}
                  className="bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  {editingId === food.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyPress={handleEditKeyPress}
                        className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        autoFocus
                      />
                      <select
                        value={editingCategory}
                        onChange={(e) => setEditingCategory(e.target.value as MealCategory)}
                        className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {Object.entries(categoryLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={saveEdit}
                          className="flex-1 flex items-center justify-center gap-1 text-green-600 hover:bg-green-50 py-1 rounded transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="flex-1 flex items-center justify-center gap-1 text-gray-600 hover:bg-gray-50 py-1 rounded transition-colors"
                        >
                          <Cancel className="w-3 h-3" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-gray-800 break-words flex-1 min-w-0">{food.name}</span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => startEditing(food)}
                          className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label={`Edit ${food.name}`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFood(food.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label={`Remove ${food.name}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {foods.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No favorite foods added yet</p>
          <p className="text-sm">Add foods that the patient enjoys eating</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteFoodsSection; 