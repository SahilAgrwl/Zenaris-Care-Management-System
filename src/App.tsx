import { useState } from 'react';
import { User } from 'lucide-react';
import MealPreferencesForm from './components/MealPreferencesForm';
import Header from './components/Header';
import { FormData } from './types';

function App() {
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    favoritefoods: [],
    dislikedFoods: [],
    allergiesIntolerances: [],
    specialInstructions: ''
  });

  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to a server
    alert('Meal preferences saved successfully!');
  };

  return (
    <div className="min-h-screen bg-zenaris-light">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-zenaris-blue to-blue-600 px-6 py-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-8 h-8" />
              <h1 className="text-2xl font-semibold">Meal Preferences</h1>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              Help us understand dietary preferences and requirements to provide the best possible care
            </p>
          </div>
          
          <MealPreferencesForm 
            initialData={formData}
            onSubmit={handleFormSubmit}
            onChange={setFormData}
          />
        </div>
      </main>
    </div>
  );
}

export default App; 