import { ArrowLeft, Calendar, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-zenaris-gray" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-zenaris-dark">Zenaris</h1>
              <p className="text-sm text-zenaris-gray">Care Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Calendar className="w-5 h-5 text-zenaris-gray" />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-zenaris-gray" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 