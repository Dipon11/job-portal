import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';

const CategoryCompany = () => {
  const { id } = useParams();
  const [categoryIndustry, setIndustry] = useState(null);
  const data = useLoaderData();

  useEffect(() => {
    const company = data.find(item => item.id === id);
    setIndustry(company);
  }, [data, id]);

  if (!categoryIndustry) {
    return <p>Loading or Company not found...</p>;
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <img src={categoryIndustry.logo} alt={categoryIndustry.name} className="h-16 w-16 object-contain mr-4" />
          <div>
            <h1 className="text-xl font-bold">{categoryIndustry.name}</h1>
            <p className="text-gray-600 text-sm">Industry: {categoryIndustry.industry}</p>
            <p className="text-gray-600 text-sm">Location: {categoryIndustry.location}</p>
          </div>
        </div>
        <a href={categoryIndustry.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline block mb-4 text-sm">
          Visit Website
        </a>
      </div>

      <h2 className="text-xl font-semibold mb-4">Job Openings:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryIndustry.jobs.map(job => (
          <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={job.bannerImage} alt={job.title} className="h-32 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
              <p className="text-sm text-gray-700 mb-2 line-clamp-2">{job.description}</p>
              <p className="text-xs text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
              <p className="text-xs text-gray-600 mb-1"><strong>Salary:</strong> {job.salary}</p>
              <p className="text-xs text-gray-600 mb-2"><strong>Type:</strong> {job.jobType}</p>
              <p className="text-xs text-gray-600">
                <strong>Requirements:</strong> {job.requirements.slice(0, 3).join(', ')}
                {job.requirements.length > 3 && <span className="italic text-gray-500"> and more...</span>}
              </p>
              <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCompany;