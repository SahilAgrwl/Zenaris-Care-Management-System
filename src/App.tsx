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
      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-zenaris-blue to-blue-600 px-4 sm:px-6 py-6 sm:py-8 text-white">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <User className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              <h1 className="text-xl sm:text-2xl font-semibold leading-tight">Meal Preferences</h1>
            </div>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
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