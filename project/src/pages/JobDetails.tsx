import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner'
import { MapPin, DollarSign, Clock, Building, CheckCircle } from 'lucide-react'

interface Job {
  _id: string
  title: string
  company: string
  location: string
  description: string
  requirements: string[]
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
    email: string
  }
}

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/jobs/${id}`)
        setJob(response.data)
      } catch (error) {
        console.error('Error fetching job:', error)
        setError('Job not found')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchJob()
    }
  }, [id])

  const handleApply = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setApplying(true)
    try {
      await axios.post(`/jobs/${id}/apply`)
      setApplied(true)
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to apply')
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !job) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error || 'Job not found'}</p>
      </div>
    )
  }

  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <Building className="w-5 h-5 mr-2" />
              <span className="text-lg">{job.company}</span>
            </div>
          </div>
          <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
            {job.type}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{job.location}</span>
            {job.remote && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Remote
              </span>
            )}
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-5 h-5 mr-2" />
            <span>{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span>Posted {formatDate(job.createdAt)}</span>
          </div>
        </div>

        {user?.role === 'jobseeker' && (
          <div className="mb-6">
            {applied ? (
              <div className="flex items-center justify-center bg-green-100 text-green-800 py-3 px-4 rounded-lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Application submitted successfully!</span>
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={applying}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {applying ? 'Applying...' : 'Apply Now'}
              </button>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Description</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>
          </div>

          {job.requirements.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Info</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-gray-800">Company</h3>
                <p className="text-gray-600">{job.company}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Posted by</h3>
                <p className="text-gray-600">{job.postedBy.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Contact</h3>
                <p className="text-gray-600">{job.postedBy.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails