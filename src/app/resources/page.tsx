import { Database, FileSpreadsheet } from 'lucide-react';
import { BookOpen, Code } from 'lucide-react';

export const metadata = {
  title: 'Resources - Rutgers Economics Labs',
  description: 'Learning resources for economic analysis, data science, and research methodologies.',
};

export default function ResourcesPage() {
  return (
    <div className="py-20 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-[var(--text-primary)] mb-8 ">Learning Resources</h3>
          <p className="text-xl text-[var(--text-secondary)] max-w-4xl mx-auto ">
            Explore our curated collection of resources to learn more about economic analysis, data science, and research methodologies.
          </p>
        </div>
        {/* Articles Section */}
        <div className="mb-16">
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">Articles & Papers</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Introduction to Econometrics</h5>
              <p className="text-[var(--text-secondary)] mb-4">A comprehensive guide to understanding econometric methods and their applications.</p>
              <a href="https://sites.google.com/site/econometricsacademy/" className="text-red-600 hover:text-red-700 font-medium">Read More →</a>
            </div>
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Data Analysis in Python</h5>
              <p className="text-[var(--text-secondary)] mb-4">Learn how to use Python for economic data analysis and visualization.</p>
              <a href="https://bashtage.github.io/kevinsheppard.com/files/teaching/python/notes/python_introduction_2020.pdf" className="text-red-600 hover:text-red-700 font-medium">Read More →</a>
            </div>
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Research Methodology</h5>
              <p className="text-[var(--text-secondary)] mb-4">Best practices for conducting economic research and writing papers.</p>
              <a href="https://libguides.wpi.edu/researchmethod/resources" className="text-red-600 hover:text-red-700 font-medium">Read More →</a>
            </div>
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Getting Census Data</h5>
              <p className="text-[var(--text-secondary)] mb-4">Official U.S. Census Bureau video on how to search and download census data.</p>
              <a href="https://www.census.gov/library/video/2025/adrm/getting-started-with-your-search-on-data-census-gov.html" className="text-red-600 hover:text-red-700 font-medium" target="_blank" rel="noopener noreferrer">Read More →</a>
            </div>
          </div>
        </div>
        {/* Video Tutorials Section - Updated */}
        <div className="mb-16">
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">Video Tutorials</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Panel Regression</h5>
              <p className="text-[var(--text-secondary)] mb-4">A YouTube tutorial on panel regression methods and applications.</p>
              <a href="https://www.youtube.com/watch?v=TYTvLgi4mVc" className="text-red-600 hover:text-red-700 font-medium" target="_blank" rel="noopener noreferrer">Watch Video →</a>
            </div>
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Mastering Econometrics</h5>
              <p className="text-[var(--text-secondary)] mb-4">A YouTube playlist for mastering econometrics concepts and techniques.</p>
              <a href="https://www.youtube.com/watch?v=WwW8y5dZs80&list=PL-uRhZ_p-BM5ovNRg-G6hDib27OCvcyW8" className="text-red-600 hover:text-red-700 font-medium" target="_blank" rel="noopener noreferrer">Watch Playlist →</a>
            </div>
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">GitHub Overview</h5>
              <p className="text-[var(--text-secondary)] mb-4">A beginner-friendly overview of GitHub and version control.</p>
              <a href="https://youtu.be/8Dd7KRpKeaE?si=k0RepfbaMcdH-I3X" className="text-red-600 hover:text-red-700 font-medium" target="_blank" rel="noopener noreferrer">Watch Video →</a>
            </div>
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Pandas Tutorial</h5>
              <p className="text-[var(--text-secondary)] mb-4">A YouTube tutorial on using pandas for data analysis in Python.</p>
              <a href="https://youtu.be/2uvysYbKdjM?si=Q6kEaR-TALQRQS9z" className="text-red-600 hover:text-red-700 font-medium" target="_blank" rel="noopener noreferrer">Watch Video →</a>
            </div>
          </div>
        </div>
        {/* Tools Section */}
        <div>
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">Recommended Tools</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center mx-auto w-full max-w-xs">
              <BookOpen className="text-red-600 mb-4" size={40} />
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Python</h5>
              <p className="text-[var(--text-secondary)]">Essential programming language for data analysis and econometrics.</p>
            </div>
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center mx-auto w-full max-w-xs">
              <Code className="text-red-600 mb-4" size={40} />
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">R</h5>
              <p className="text-[var(--text-secondary)]">Statistical computing and graphics for economic research.</p>
            </div>
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center mx-auto w-full max-w-xs">
              <Database className="text-red-600 mb-4" size={40} />
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Stata</h5>
              <p className="text-[var(--text-secondary)]">Statistical software for data analysis and econometrics.</p>
            </div>
            <div className="card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg flex flex-col items-center text-center mx-auto w-full max-w-xs">
              <FileSpreadsheet className="text-red-600 mb-4" size={40} />
              <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Excel</h5>
              <p className="text-[var(--text-secondary)]">Basic data manipulation and analysis tool.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}