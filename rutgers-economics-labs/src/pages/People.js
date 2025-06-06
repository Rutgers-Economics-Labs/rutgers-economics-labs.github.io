import React, { useEffect } from 'react';
import { Linkedin, Mail, GraduationCap, Award } from 'lucide-react';

const People = () => {
  useEffect(() => {
    // Add fade-in effect to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 200);
    });
  }, []);

  const leadership = [
    {
      name: "Dr. Sarah Johnson",
      role: "Faculty Advisor",
      department: "Economics Department",
      image: "/images/people/placeholder-faculty.jpg",
      bio: "Dr. Johnson specializes in labor economics and public policy. She has published extensively on workforce development and economic inequality.",
      email: "sarah.johnson@rutgers.edu",
      linkedin: "https://linkedin.com/in/sarahjohnson"
    },
    {
      name: "Alex Chen",
      role: "Executive Director",
      year: "Senior, Economics & Data Science",
      image: "/images/people/placeholder-student.jpg",
      bio: "Alex leads REL's strategic initiatives and coordinates with partner organizations. Previously interned at the Federal Reserve Bank of New York.",
      email: "alex.chen@rutgers.edu",
      linkedin: "https://linkedin.com/in/alexchen"
    },
    {
      name: "Maria Rodriguez",
      role: "Research Director",
      year: "Junior, Statistics & Public Policy",
      image: "/images/people/placeholder-student.jpg",
      bio: "Maria oversees research methodology and quality assurance. She has experience in econometric analysis and statistical modeling.",
      email: "maria.rodriguez@rutgers.edu",
      linkedin: "https://linkedin.com/in/mariarodriguez"
    }
  ];

  const currentMembers = [
    {
      name: "David Kim",
      role: "Senior Analyst",
      year: "Senior, Computer Science",
      specialization: "Machine Learning & Econometrics"
    },
    {
      name: "Emily Brown",
      role: "Research Analyst",
      year: "Junior, Economics",
      specialization: "Labor Economics"
    },
    {
      name: "James Wilson",
      role: "Data Analyst",
      year: "Sophomore, Statistics",
      specialization: "Statistical Analysis"
    },
    {
      name: "Sophie Zhang",
      role: "Research Analyst",
      year: "Junior, Public Policy",
      specialization: "Policy Analysis"
    },
    {
      name: "Michael Thompson",
      role: "Data Analyst",
      year: "Senior, Mathematics",
      specialization: "Quantitative Methods"
    },
    {
      name: "Jessica Lee",
      role: "Research Analyst",
      year: "Sophomore, Economics",
      specialization: "Development Economics"
    }
  ];

  const alumni = [
    {
      name: "Ryan Patel",
      graduationYear: "2024",
      currentRole: "Economic Analyst at Federal Reserve Bank",
      relRole: "Former Executive Director"
    },
    {
      name: "Amanda Foster",
      graduationYear: "2023",
      currentRole: "Data Scientist at McKinsey & Company",
      relRole: "Former Research Director"
    },
    {
      name: "Kevin Chang",
      graduationYear: "2023",
      currentRole: "Policy Analyst at Urban Institute",
      relRole: "Former Senior Analyst"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8 fade-in">Meet Our Team</h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto fade-in">
            REL is powered by dedicated students and faculty who are passionate about using economic research to create positive policy impact.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <h4 className="text-2xl font-bold text-gray-900 mb-8 fade-in">Leadership Team</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((person, index) => (
              <div key={index} className="card-hover bg-white p-6 rounded-xl shadow-lg border fade-in">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap className="w-12 h-12 text-red-600" />
                  </div>
                  <h5 className="text-xl font-semibold text-gray-900">{person.name}</h5>
                  <p className="text-red-600 font-medium">{person.role}</p>
                  <p className="text-gray-600 text-sm">{person.department || person.year}</p>
                </div>
                <p className="text-gray-600 text-sm mb-4">{person.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a href={`mailto:${person.email}`} className="text-gray-400 hover:text-red-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Members */}
        <div className="mb-20">
          <h4 className="text-2xl font-bold text-gray-900 mb-8 fade-in">Current Members</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl fade-in">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-lg">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h5 className="font-semibold text-gray-900">{member.name}</h5>
                  <p className="text-red-600 text-sm font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.year}</p>
                  <p className="text-gray-500 text-xs mt-2">{member.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Section */}
        <div className="mb-20 fade-in">
          <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">Alumni Success Stories</h4>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alumni.map((alum, index) => (
                <div key={index} className="bg-white p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Award className="w-5 h-5 text-red-600 mr-2" />
                    <h5 className="font-semibold text-gray-900">{alum.name}</h5>
                  </div>
                  <p className="text-red-600 text-sm font-medium mb-1">{alum.relRole}</p>
                  <p className="text-gray-600 text-sm mb-2">Class of {alum.graduationYear}</p>
                  <p className="text-gray-700 text-sm font-medium">{alum.currentRole}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="mb-20 fade-in">
          <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Team by the Numbers</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-red-600 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Active Members</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-red-600 mb-2">8</div>
              <div className="text-gray-600 font-medium">Different Majors</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
              <div className="text-gray-600 font-medium">Alumni Network</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-red-600 mb-2">3</div>
              <div className="text-gray-600 font-medium">Years Established</div>
            </div>
          </div>
        </div>

        {/* Join the Team CTA */}
        <div className="text-center bg-gray-50 p-8 rounded-2xl fade-in">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h4>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to make an impact through economic research? We're always looking for motivated students who are passionate about data analysis and public policy.
          </p>
          <div className="space-x-4">
            <a 
              href="/apply" 
              className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Apply Now
            </a>
            <a 
              href="/contact" 
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

export default People;