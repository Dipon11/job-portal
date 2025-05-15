import React from 'react';
import { NavLink } from 'react-router';
import { FaChartLine, FaBullhorn, FaUniversity, FaUserTie, FaStore, FaPenNib } from 'react-icons/fa';

// Optional: map industry names to icons
const industryIcons = {
  Management: <FaChartLine className="text-blue-500 text-xl" />,
  "Marketing & Sale": <FaBullhorn className="text-blue-500 text-xl" />,
  Finance: <FaUniversity className="text-blue-500 text-xl" />,
  "Human Resource": <FaUserTie className="text-blue-500 text-xl" />,
  "Retail & Products": <FaStore className="text-blue-500 text-xl" />,
  "Content Writer": <FaPenNib className="text-blue-500 text-xl" />,
};

const industryPromise = fetch("/data.json").then(res => res.json());

const Categories = () => {
  const industries = React.use(industryPromise);

  return (
    <div className="mt-20 mb-10 text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-2">Jobs of the day</h2>
      <p className="text-gray-500 text-lg mb-8">Search and connect with the right candidates faster.</p>

      <div className="flex flex-wrap justify-center gap-4">
        {industries.map(industry => (
          <NavLink
            key={industry.id}
            to={`/category/${industry.id}`}
            className="flex items-center gap-2 px-5 py-3 border rounded-lg text-blue-700 bg-white hover:bg-blue-50 hover:shadow transition duration-200"
          >
            {industryIcons[industry.industry] || <FaChartLine className="text-blue-500" />}
            <span className="font-medium">{industry.industry}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Categories;
