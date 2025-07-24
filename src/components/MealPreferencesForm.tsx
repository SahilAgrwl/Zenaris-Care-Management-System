import { useState } from 'react';
import { Save, User, AlertTriangle } from 'lucide-react';
import { FormData } from '../types';
import FavoriteFoodsSection from './FavoriteFoodsSection';
import DislikedFoodsSection from './DislikedFoodsSection';
import AllergiesSection from './AllergiesSection';
import SpecialInstructionsSection from './SpecialInstructionsSection';

interface Props {
  initialData: FormData;
  onSubmit: (data: FormData) => void;
  onChange: (data: FormData) => void;
}

const MealPreferencesForm = ({ initialData, onSubmit, onChange }: Props) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (updates: Partial<FormData>) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    onChange(newData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientName.trim()) {
      alert('Please enter the patient name');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      {/* Patient Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-zenaris-blue" />
          <h2 className="text-lg font-semibold text-zenaris-dark">Patient Information</h2>
        </div>
        <div>
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
            Patient Name *
          </label>
          <input
            type="text"
            id="patientName"
            value={formData.patientName}
            onChange={(e) => updateFormData({ patientName: e.target.value })}
            className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-zenaris-blue focus:border-transparent transition-colors"
            placeholder="Enter patient's full name"
            required
          />
        </div>
      </div>

      {/* Warning Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-amber-800 mb-1">Important Notice</h3>
            <p className="text-sm text-amber-700">
              Please ensure all allergies and intolerances are accurately recorded. This information is critical for patient safety.
            </p>
          </div>
        </div>
      </div>

      {/* Form Sections */}
      <FavoriteFoodsSection 
        foods={formData.favoritefoods}
        onChange={(foods) => updateFormData({ favoritefoods: foods })}
      />

      <DislikedFoodsSection 
        foods={formData.dislikedFoods}
        onChange={(foods) => updateFormData({ dislikedFoods: foods })}
      />

      <AllergiesSection 
        allergies={formData.allergiesIntolerances}
        onChange={(allergies) => updateFormData({ allergiesIntolerances: allergies })}
      />

      <SpecialInstructionsSection 
        instructions={formData.specialInstructions}
        onChange={(instructions) => updateFormData({ specialInstructions: instructions })}
      />

      {/* Submit Button */}
      <div className="pt-6 border-t border-gray-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-zenaris-blue text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-5 h-5" />
          {isSubmitting ? 'Saving...' : 'Save Meal Preferences'}
        </button>
      </div>
    </form>
  );
};

export default MealPreferencesForm; 