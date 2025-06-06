import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, BarChart3, Globe } from 'lucide-react';

const About = () => {
  useEffect(() => {
    // Add fade-in effect to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 200);
    });
  }, []);

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8 fade-in">What We Do</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
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
          
          <div className="fade-in">
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

        {/* Mission & Values */}
        <div className="mt-20 fade-in">
          <div className="text-center mb-12">
            <h4 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h4>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in the power of rigorous economic research to inform public policy and create positive social impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center card-hover bg-white p-8 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Student Development</h5>
              <p className="text-gray-600">Providing Rutgers students with hands-on research experience and professional development opportunities</p>
            </div>
            <div className="text-center card-hover bg-white p-8 rounded-xl shadow-lg">
              <BarChart3 className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Data-Driven Insights</h5>
              <p className="text-gray-600">Producing rigorous, evidence-based research that informs critical policy decisions</p>
            </div>
            <div className="text-center card-hover bg-white p-8 rounded-xl shadow-lg">
              <Globe className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Public Service</h5>
              <p className="text-gray-600">Contributing to the public good through pro bono research for government and policy organizations</p>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mt-20 bg-gray-50 p-8 rounded-2xl fade-in">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Impact</h4>
            <p className="text-gray-600">Making a difference through economic research</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Research Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
              <div className="text-gray-600 font-medium">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">5+</div>
              <div className="text-gray-600 font-medium">Partner Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Pro Bono Work</div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16 fade-in">
          <Link 
            to="/apply" 
            className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Interested? Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;