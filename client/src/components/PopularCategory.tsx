import React from 'react';

interface Category {
  image: string;
  jobCategory: string;
  text: string;
}

const categories: Category[] = [
  {
    image: '/coding.png',
    jobCategory: 'Coding and Programming',
    text: '357 open positions'
  },
  {
    image: '/pen-tool.png',
    jobCategory: 'Graphic and Design',
    text: '434 open positions'
  },
  {
    image: '/health-care.png',
    jobCategory: 'Health and Care',
    text: '871 open positions'
  },
  {
    image: '/data-science.png',
    jobCategory: 'Data Science',
    text: '467 open positions'
  },
  {
    image: '/music.png',
    jobCategory: 'Music',
    text: '298 open positions'
  },
  {
    image: '/accounts.png',
    jobCategory: 'Accounts',
    text: '545 open positions'
  },
  {
    image: '/cyber-security.png',
    jobCategory: 'Cyber Security',
    text: '712 open positions'
  },
  {
    image: '/accounts.png',
    jobCategory: 'Warehouse',
    text: '304 open positions.'
  },
];

export default function PopularCategory() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Popular Job Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card bg-white  rounded-lg p-4 text-center transition-transform transform hover:scale-105"
          >
            <div className="flex items-center gap-4">
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={category.image}
                  alt={category.jobCategory}
                  className="w-[68px] h-[68px] rounded-tl-[8px] opacity-100"
                />
              </div>

              {/* Title and Text */}
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800">{category.jobCategory}</h3>
                <p className="text-gray-600">{category.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
