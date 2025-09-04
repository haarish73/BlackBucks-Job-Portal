import React, { useState, useEffect } from 'react'
import axios from 'axios'
import JobCard from '../components/JobCard'
import SearchFilters from '../components/SearchFilters'
import LoadingSpinner from '../components/LoadingSpinner'

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

interface SearchFilters {
  search: string
  location: string
  type: string
  remote: string
}

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<SearchFilters>({
    search: '',
    location: '',
    type: '',
    remote: ''
  })

  const fetchJobs = async (page = 1, searchFilters = filters) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9',
        ...Object.fromEntries(
          Object.entries(searchFilters).filter(([_, value]) => value !== '')
        )
      })

      const response = await axios.get(`/jobs?${params}`)
      setJobs(response.data.jobs)
      setTotalPages(response.data.totalPages)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleSearch = (searchFilters: SearchFilters) => {
    setFilters(searchFilters)
    fetchJobs(1, searchFilters)
  }

  const handlePageChange = (page: number) => {
    fetchJobs(page, filters)
  }

  if (loading && jobs.length === 0) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover thousands of job opportunities from top companies around the world
        </p>
      </div>

      <SearchFilters onSearch={handleSearch} />

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-colors`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home