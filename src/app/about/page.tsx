export default function AboutPage() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8">What We Do</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="">
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We partner with government agencies, think tanks, and other public policy organizations to produce data-driven research using statistical and econometric methods. Our work is completely pro bono and designed to help policymakers where they have the greatest need.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Each semester, our students work in teams of six to write research papers for our partner organizations using tools such as Python and R. Papers include a literature review, statistical analysis, and interpretation of results.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Students from all majors are encouraged to apply, including but not limited to Economics, Data Science, Statistics, Computer Science, Public Policy, Political Science, Business Analytics, Finance, and Math. While no previous experience in economic research is required, a strong quantitative aptitude and comfort with data are essential.
            </p>
          </div>
          <div className="">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-red-800 mb-6">Our Process</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h5 className="font-semibold text-red-800">Partner Collaboration</h5>
                    <p className="text-red-700">Work directly with government agencies and think tanks</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h5 className="font-semibold text-red-800">Team Formation</h5>
                    <p className="text-red-700">Students work in collaborative teams of six</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h5 className="font-semibold text-red-800">Research & Analysis</h5>
                    <p className="text-red-700">Conduct statistical analysis using Python and R</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <h5 className="font-semibold text-red-800">Policy Impact</h5>
                    <p className="text-red-700">Deliver actionable insights to policymakers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-16">
          <a href="/apply" className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 inline-block">
            Interested? Apply Now
          </a>
        </div>
      </div>
    </div>
  );
} 