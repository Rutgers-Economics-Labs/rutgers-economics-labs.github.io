import React, { useEffect } from 'react';
import { ExternalLink, Calendar, Users, BarChart3 } from 'lucide-react';

const Projects = () => {
  useEffect(() => {
    // Add fade-in effect to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 200);
    });
  }, []);

  const projects = [
    {
      title: "Labor Market Analysis for NJ Department of Labor",
      description: "Comprehensive analysis of employment trends and wage disparities across different sectors in New Jersey, providing insights for workforce development policies.",
      partner: "NJ Department of Labor",
      year: "2024",
      team: 6,
      status: "Completed",
      tags: ["Labor Economics", "Policy Analysis", "Python"]
    },
    {
      title: "Housing Affordability Study",
      description: "Examining the relationship between housing costs, income levels, and demographic factors to inform affordable housing initiatives.",
      partner: "Regional Planning Commission",
      year: "2024",
      team: 6,
      status: "In Progress",
      tags: ["Housing Policy", "Econometrics", "R"]
    },
    {
      title: "Economic Impact of Infrastructure Investment",
      description: "Evaluating the economic effects of transportation infrastructure projects on local communities and business development.",
      partner: "Transportation Authority",
      year: "2023",
      team: 6,
      status: "Completed",
      tags: ["Infrastructure", "Economic Impact", "Statistical Analysis"]
    }
  ];

  const partners = [
    {
      name: "New Jersey Department of Labor",
      type: "Government Agency",
      description: "Collaborating on workforce development and employment policy research."
    },
    {
      name: "Regional Planning Commission",
      type: "Public Organization",
      description: "Providing analysis for regional development and housing policy initiatives."
    },
    {
      name: "Transportation Authority",
      type: "Public Agency",
      description: "Supporting infrastructure planning through economic impact studies."
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8 fade-in">Our Research Projects</h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto fade-in">
            Discover the impactful research projects we've conducted in partnership with government agencies, think tanks, and policy organizations.
          </p>
        </div>

        {/* Current & Recent Projects */}
        <div className="mb-20">
          <h4 className="text-2xl font-bold text-gray-900 mb-8 fade-in">Featured Projects</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="card-hover bg-white p-8 rounded-xl shadow-lg border fade-in">
                <div className="flex items-start justify-between mb-4">
                  <h5 className="text-xl font-semibold text-gray-900 flex-1">{project.title}</h5>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{project.team} Students</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-sm text-gray-600">
                  <strong>Partner:</strong> {project.partner}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-20 fade-in">
          <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">Research Areas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <BarChart3 className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-900 mb-2">Labor Economics</h5>
              <p className="text-sm text-gray-600">Employment, wages, and workforce development</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <BarChart3 className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-900 mb-2">Housing Policy</h5>
              <p className="text-sm text-gray-600">Affordability, development, and urban planning</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <BarChart3 className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-900 mb-2">Public Finance</h5>
              <p className="text-sm text-gray-600">Government spending and fiscal policy</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <BarChart3 className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-900 mb-2">Economic Development</h5>
              <p className="text-sm text-gray-600">Infrastructure and regional growth</p>
            </div>
          </div>
        </div>

        {/* Partner Organizations */}
        <div className="mb-20 fade-in">
          <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Partners</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                <h5 className="text-lg font-semibold text-red-800 mb-2">{partner.name}</h5>
                <p className="text-red-600 text-sm font-medium mb-3">{partner.type}</p>
                <p className="text-red-700 text-sm">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 p-8 rounded-2xl fade-in">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">Partner with Us</h4>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Are you a government agency, think tank, or policy organization looking for rigorous economic research? 
            We'd love to collaborate with you on your next project.
          </p>
          <div className="space-x-4">
            <a 
              href="/contact" 
              className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Contact Us
            </a>
            <a 
              href="/about" 
              className="bg-gray-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;