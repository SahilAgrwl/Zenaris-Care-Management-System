import { FileText, Info } from 'lucide-react';

interface Props {
  instructions: string;
  onChange: (instructions: string) => void;
}

const SpecialInstructionsSection = ({ instructions, onChange }: Props) => {
  const characterCount = instructions.length;
  const maxLength = 500;
  const isNearLimit = characterCount > maxLength * 0.8;
  const isOverLimit = characterCount > maxLength;

  const suggestions = [
    "Prefers food served warm",
    "Needs soft textures only",
    "Enjoys smaller, frequent meals",
    "Prefers familiar foods",
    "Cultural dietary preferences",
    "Religious dietary restrictions",
    "Liquid consistency needed",
    "Finger foods preferred"
  ];

  const addSuggestion = (suggestion: string) => {
    const newInstructions = instructions ? `${instructions}\n• ${suggestion}` : `• ${suggestion}`;
    if (newInstructions.length <= maxLength) {
      onChange(newInstructions);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-zenaris-blue" />
        <h2 className="text-lg font-semibold text-zenaris-dark">Special Instructions</h2>
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-blue-800 mb-1">Additional Considerations</h3>
            <p className="text-sm text-blue-700">
              Include any special dietary requirements, texture preferences, cultural restrictions, 
              or other important meal-related information.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-800">Common Instructions (Click to Add)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addSuggestion(suggestion)}
              className="text-left text-sm p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              disabled={instructions.length + suggestion.length + 3 > maxLength}
            >
              • {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Text Area */}
      <div className="space-y-2">
        <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700">
          Special Instructions & Notes
        </label>
        <textarea
          id="specialInstructions"
          value={instructions}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-3 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors resize-none ${
            isOverLimit 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-zenaris-blue'
          }`}
          placeholder="Enter any special dietary requirements, texture preferences, cultural or religious restrictions, feeding instructions, or other important meal-related information...

Examples:
• Prefers food served at room temperature
• Needs assistance with eating
• Kosher dietary requirements
• Soft foods only due to swallowing difficulties
• Small frequent meals preferred over large portions"
          rows={8}
          maxLength={maxLength}
        />
        
        {/* Character Counter */}
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-500">
            Use bullet points for clarity. Include cultural, religious, or medical dietary needs.
          </div>
          <div className={`font-medium ${
            isOverLimit ? 'text-red-600' : isNearLimit ? 'text-orange-600' : 'text-gray-500'
          }`}>
            {characterCount}/{maxLength} characters
          </div>
        </div>
        
        {isOverLimit && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
            Character limit exceeded. Please shorten your instructions.
          </div>
        )}
      </div>

      {/* Preview */}
      {instructions.trim() && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <h3 className="font-medium text-gray-800 mb-2">Preview</h3>
          <div className="text-sm text-gray-700 whitespace-pre-wrap">
            {instructions}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialInstructionsSection; 