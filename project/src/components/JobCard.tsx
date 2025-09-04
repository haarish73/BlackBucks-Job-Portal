import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, DollarSign, Building } from 'lucide-react'

interface Job {
  _id: string
  title: string
  company: string
  location: string
  description: string
  salary: {
    min: number
    max: number
    currency: string
  }
  type: string
  remote: boolean
  createdAt: string
  postedBy: {
    name: string
    company: string
  }
}

interface JobCardProps {
  job: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {job.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Building className="w-4 h-4 mr-1" />
            <span>{job.company}</span>
          </div>
        </div>
        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {job.type}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{job.location}</span>
          {job.remote && (
            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              Remote
            </span>
          )}
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-4 h-4 mr-2" />
          <span>{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>Posted {formatDate(job.createdAt)}</span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">
        {job.description.substring(0, 150)}...
      </p>

      <Link
        to={`/job/${job._id}`}
        className="btn-primary inline-block text-center w-full"
      >
        View Details
      </Link>
    </div>
  )
}

export default JobCard