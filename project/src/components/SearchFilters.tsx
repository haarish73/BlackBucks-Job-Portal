import React, { useState } from 'react'
import { Search, MapPin, Filter } from 'lucide-react'

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void
}

interface SearchFilters {
  search: string
  location: string
  type: string
  remote: string
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    search: '',
    location: '',
    type: '',
    remote: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(filters)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="card mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="search"
              placeholder="Job title, company, or keywords"
              value={filters.search}
              onChange={handleChange}
              className="input-field pl-10"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleChange}
              className="input-field pl-10"
            />
          </div>

          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>

          <select
            name="remote"
            value={filters.remote}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">All Locations</option>
            <option value="true">Remote Only</option>
            <option value="false">On-site Only</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn-primary flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Search Jobs</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchFilters