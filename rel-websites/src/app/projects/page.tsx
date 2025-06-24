export default function ProjectsPage() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8">Projects</h3>
        </div>
        <div className="space-y-8">
          {/* USDA Project */}
          <div className="project-card card-hover p-8 rounded-2xl">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src="/images/logo/usda.png" alt="USDA Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">US Department of Agriculture</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We worked with the United States Department of Agriculture (USDA) to identify potential anticompetitive practices in the meat industry through a time series analysis of price spreads. 
                </p>
                <div className="flex items-center space-x-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Paper Completed</span>
                  <span className="text-sm text-gray-500">Spring 2025</span>
                </div>
              </div>
            </div>
          </div>
          {/* NJDCA Project */}
          <div className="project-card card-hover p-8 rounded-2xl">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src="/images/logo/njdca.png" alt="NJDCA Logo" className="w-full" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">New Jersey Department of Community Affairs</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We worked with the New Jersey Department of Community Affairs to evaluate the impact of the Zone Assistance Fund (ZAF) program on Urban Enterprize Zones (UEZs) in New Jersey.
                </p>
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Paper Withheld</span>
                  <span className="text-sm text-gray-500">Spring 2025</span>
                </div>
              </div>
            </div>
          </div>
          {/* NJEDA Project */}
          <div className="project-card card-hover p-8 rounded-2xl">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src="/images/logo/njeda.jpg" alt="NJEDA Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">New Jersey Economic Development Authority</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  In our first project, we worked with the New Jersey Economic Development Authority (NJEDA) to evaluate the impact of the NJ ZIP program on medium and heavy duty electric vehicle (MDHEV) sales and model how the price premium for MDHEVs will change over time.
                </p>
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Paper Withheld</span>
                  <span className="text-sm text-gray-500">Fall 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 