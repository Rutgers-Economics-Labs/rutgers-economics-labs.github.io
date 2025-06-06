import React, { useEffect, useState } from 'react';
import { BookOpen, Video, Code, FileText, ExternalLink, Download, Search, Filter } from 'lucide-react';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Add fade-in effect to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 200);
    });
  }, []);

  const resources = {
    articles: [
      {
        title: "Introduction to Econometrics",
        description: "A comprehensive guide to understanding econometric methods and their applications in economic research.",
        url: "https://www.econometrics-guide.com",
        difficulty: "Beginner",
        tags: ["econometrics", "statistics", "basics"]
      },
      {
        title: "Causal Inference in Economics",
        description: "Understanding how to establish causality in economic relationships and avoid common pitfalls.",
        url: "https://www.causal-inference.org",
        difficulty: "Advanced",
        tags: ["causal inference", "research design", "methodology"]
      },
      {
        title: "Panel Data Analysis Techniques",
        description: "Master panel data methods including fixed effects, random effects, and difference-in-differences.",
        url: "https://panel-data-guide.com",
        difficulty: "Intermediate",
        tags: ["panel data", "fixed effects", "econometrics"]
      },
      {
        title: "Time Series Analysis for Policy",
        description: "Apply time series techniques to analyze economic policies and forecast outcomes.",
        url: "https://time-series-policy.edu",
        difficulty: "Advanced",
        tags: ["time series", "policy analysis", "forecasting"]
      }
    ],
    tutorials: [
      {
        title: "Python for Economic Analysis",
        description: "Step-by-step tutorials on using Python for economic data analysis and visualization.",
        url: "https://python-econ-tutorials.com",
        difficulty: "Beginner",
        tags: ["python", "data analysis", "programming"]
      },
      {
        title: "R for Econometrics",
        description: "Comprehensive R tutorials covering econometric analysis and statistical modeling.",
        url: "https://r-econometrics.org",
        difficulty: "Intermediate",
        tags: ["r", "econometrics", "statistics"]
      },
      {
        title: "Stata Programming Guide",
        description: "Master Stata for economic research with practical examples and best practices.",
        url: "https://stata-guide.edu",
        difficulty: "Intermediate",
        tags: ["stata", "programming", "research"]
      },
      {
        title: "Data Visualization for Economics",
        description: "Create compelling visualizations for economic data using modern tools and techniques.",
        url: "https://econ-viz.com",
        difficulty: "Beginner",
        tags: ["visualization", "data", "graphics"]
      }
    ],
    datasets: [
      {
        title: "Federal Reserve Economic Data (FRED)",
        description: "Comprehensive macroeconomic data from the Federal Reserve Bank of St. Louis.",
        url: "https://fred.stlouisfed.org",
        difficulty: "All Levels",
        tags: ["macroeconomic", "federal reserve", "time series"]
      },
      {
        title: "World Bank Open Data",
        description: "Global development data covering economics, demographics, and social indicators.",
        url: "https://data.worldbank.org",
        difficulty: "All Levels",
        tags: ["international", "development", "global"]
      },
      {
        title: "Bureau of Labor Statistics",
        description: "Labor market data including employment, wages, inflation, and productivity statistics.",
        url: "https://www.bls.gov/data/",
        difficulty: "All Levels",
        tags: ["labor", "employment", "wages"]
      },
      {
        title: "American Community Survey",
        description: "Detailed demographic and socioeconomic data from the U.S. Census Bureau.",
        url: "https://www.census.gov/programs-surveys/acs/",
        difficulty: "Intermediate",
        tags: ["demographics", "census", "microdata"]
      }
    ],
    tools: [
      {
        title: "Jupyter Notebooks",
        description: "Interactive computing environment perfect for data analysis and research documentation.",
        url: "https://jupyter.org",
        difficulty: "Beginner",
        tags: ["python", "interactive", "documentation"]
      },
      {
        title: "GitHub for Research",
        description: "Version control and collaboration platform essential for reproducible research.",
        url: "https://github.com",
        difficulty: "Beginner",
        tags: ["version control", "collaboration", "reproducible research"]
      },
      {
        title: "LaTeX for Academic Writing",
        description: "Professional typesetting system for creating high-quality academic papers and presentations.",
        url: "https://www.latex-project.org",
        difficulty: "Intermediate",
        tags: ["writing", "typesetting", "academic"]
      },
      {
        title: "Tableau Public",
        description: "Free data visualization tool for creating interactive dashboards and charts.",
        url: "https://public.tableau.com",
        difficulty: "Beginner",
        tags: ["visualization", "dashboard", "interactive"]
      }
    ]
  };

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'articles', label: 'Articles & Papers', icon: FileText },
    { id: 'tutorials', label: 'Tutorials', icon: Video },
    { id: 'datasets', label: 'Datasets', icon: Download },
    { id: 'tools', label: 'Tools & Software', icon: Code }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterResources = (categoryResources) => {
    if (!searchTerm) return categoryResources;
    return categoryResources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const getResourcesForCategory = () => {
    if (selectedCategory === 'all') {
      return Object.entries(resources).flatMap(([category, items]) =>
        filterResources(items).map(item => ({ ...item, category }))
      );
    }
    return filterResources(resources[selectedCategory] || []);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8 fade-in">Learning Resources</h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto fade-in">
            Explore our curated collection of resources to master economic analysis, data science, and research methodologies. From beginner tutorials to advanced econometric techniques.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 fade-in">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <span className="text-gray-600 font-medium">Filter by:</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-12 fade-in">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getResourcesForCategory().map((resource, index) => (
            <div key={index} className="card-hover bg-white p-6 rounded-xl shadow-lg border fade-in">
              <div className="flex items-start justify-between mb-4">
                <h5 className="text-xl font-semibold text-gray-900 flex-1">{resource.title}</h5>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                  {resource.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{resource.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-red-600 hover:text-red-700 font-medium transition-colors duration-300"
              >
                <span>Access Resource</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          ))}
        </div>

        {/* Getting Started Section */}
        <div className="mt-20 bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl fade-in">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-red-800 mb-6">New to Economic Research?</h4>
            <p className="text-red-700 mb-8 max-w-3xl mx-auto">
              Start your journey with our recommended learning path. These resources are specifically chosen for beginners who want to build a strong foundation in economic analysis and data science.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-2">1</div>
                <h5 className="font-semibold text-red-800 mb-2">Learn the Basics</h5>
                <p className="text-red-700 text-sm">Start with introductory econometrics and statistical concepts</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-2">2</div>
                <h5 className="font-semibold text-red-800 mb-2">Choose Your Tools</h5>
                <p className="text-red-700 text-sm">Pick Python, R, or Stata and complete basic tutorials</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-2">3</div>
                <h5 className="font-semibold text-red-800 mb-2">Practice with Data</h5>
                <p className="text-red-700 text-sm">Work with real datasets from FRED or World Bank</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-2">4</div>
                <h5 className="font-semibold text-red-800 mb-2">Join REL</h5>
                <p className="text-red-700 text-sm">Apply your skills to real-world policy research</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-16 text-center fade-in">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">Need Additional Help?</h4>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our team is here to help you find the right resources for your research needs.
          </p>
          <a
            href="/contact"
            className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resources;