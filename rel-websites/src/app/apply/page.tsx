export const metadata = {
  title: 'Apply - Rutgers Economics Labs',
  description: 'Apply to join Rutgers Economics Labs or join our mailing list.',
};

export default function ApplyPage() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8 ">Apply Now!</h3>
          <p className="text-xl text-gray-600 ">
            Applications for the Spring 2025 semester are now open and will close on Wednesday, February 12 at 11:59 pm.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Application CTA */}
          <div className="">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center">
              <h4 className="text-2xl font-bold text-red-800 mb-4">Ready to Join?</h4>
              <p className="text-red-700 mb-6">Click below to access our application form and take the first step toward impactful economic research.</p>
              <button className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 w-full">
                Apply Here
              </button>
            </div>
          </div>
          {/* Mailing List */}
          <div className="">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Join Our Mailing List</h4>
              <p className="text-gray-600 mb-6">Stay updated on application openings, events, and important news.</p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300" />
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 