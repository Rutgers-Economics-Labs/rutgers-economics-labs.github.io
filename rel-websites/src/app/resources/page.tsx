export const metadata = {
  title: 'Resources - Rutgers Economics Labs',
  description: 'Learning resources for economic analysis, data science, and research methodologies.',
};

export default function ResourcesPage() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8 ">Learning Resources</h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto ">
            Explore our curated collection of resources to learn more about economic analysis, data science, and research methodologies.
          </p>
        </div>
        {/* Articles Section */}
        <div className="mb-16">
          <h4 className="text-2xl font-bold text-gray-900 mb-8 ">Articles & Papers</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-hover bg-white p-6 rounded-xl shadow-lg ">
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Introduction to Econometrics</h5>
              <p className="text-gray-600 mb-4">A comprehensive guide to understanding econometric methods and their applications.</p>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium">Read More →</a>
            </div>
            <div className="card-hover bg-white p-6 rounded-xl shadow-lg ">
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Data Analysis in Python</h5>
              <p className="text-gray-600 mb-4">Learn how to use Python for economic data analysis and visualization.</p>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium">Read More →</a>
            </div>
            <div className="card-hover bg-white p-6 rounded-xl shadow-lg ">
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Research Methodology</h5>
              <p className="text-gray-600 mb-4">Best practices for conducting economic research and writing papers.</p>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium">Read More →</a>
            </div>
          </div>
        </div>
        {/* Videos Section */}
        <div className="mb-16">
          <h4 className="text-2xl font-bold text-gray-900 mb-8 ">Video Tutorials</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-hover bg-white p-6 rounded-xl shadow-lg ">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe src="https://www.youtube.com/embed/placeholder1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Introduction to Economic Analysis"></iframe>
              </div>
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Introduction to Economic Analysis</h5>
              <p className="text-gray-600">Learn the fundamentals of economic analysis and data interpretation.</p>
            </div>
            <div className="card-hover bg-white p-6 rounded-xl shadow-lg ">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe src="https://www.youtube.com/embed/placeholder2" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Data Visualization Techniques"></iframe>
              </div>
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Data Visualization Techniques</h5>
              <p className="text-gray-600">Master the art of creating compelling data visualizations for economic research.</p>
            </div>
          </div>
        </div>
        {/* Tools Section */}
        <div>
          <h4 className="text-2xl font-bold text-gray-900 mb-8 ">Recommended Tools</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-hover bg-white p-6 rounded-xl shadow-lg  flex flex-col items-center">
              <i className="fa-brands fa-python text-4xl text-red-600 mb-4"></i>
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Python</h5>
              <p className="text-gray-600">Essential programming language for data analysis and econometrics.</p>
            </div>
            <div className="card-hover bg-white p-6 rounded-xl shadow-lg  flex flex-col items-center">
              <i className="fa-solid fa-chart-line text-4xl text-red-600 mb-4"></i>
              <h5 className="text-xl font-semibold text-gray-900 mb-3">R</h5>
              <p className="text-gray-600">Statistical computing and graphics for economic research.</p>
            </div>
            <div className="card-hover bg-white p-6 rounded-xl shadow-lg  flex flex-col items-center">
              <i className="fa-solid fa-database text-4xl text-red-600 mb-4"></i>
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Stata</h5>
              <p className="text-gray-600">Statistical software for data analysis and econometrics.</p>
            </div>
            <div className="card-hover bg-white p-6 rounded-xl shadow-lg  flex flex-col items-center">
              <i className="fa-solid fa-file-excel text-4xl text-red-600 mb-4"></i>
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Excel</h5>
              <p className="text-gray-600">Basic data manipulation and analysis tool.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 