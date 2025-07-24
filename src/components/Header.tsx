import { ArrowLeft, Calendar, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-zenaris-gray" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-zenaris-dark">Zenaris</h1>
              <p className="text-xs sm:text-sm text-zenaris-gray hidden xs:block">Care Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-zenaris-gray" />
            </button>
            <button className="p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-zenaris-gray" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 