export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'beverages';

export type SeverityLevel = 'mild' | 'moderate' | 'severe';

export interface FoodItem {
  id: string;
  name: string;
  category?: MealCategory;
}

export interface DislikedFood extends FoodItem {
  severity: 'mild_dislike' | 'strong_dislike' | 'absolutely_wont_eat';
}

export interface AllergyIntolerance {
  id: string;
  name: string;
  type: 'allergy' | 'intolerance';
  severity: SeverityLevel;
  isCommon?: boolean;
}

export interface MealPreferences {
  favoritefoods: FoodItem[];
  dislikedFoods: DislikedFood[];
  allergiesIntolerances: AllergyIntolerance[];
  specialInstructions: string;
}

export interface FormData extends MealPreferences {
  patientName: string;
} 