// import React, { useState, useEffect } from 'react'
// import { useAuth } from '../contexts/AuthContext'
// import axios from 'axios'
// import JobCard from '../components/JobCard'
// import LoadingSpinner from '../components/LoadingSpinner'
// import { Briefcase, Users, Eye } from 'lucide-react'
// import { Link } from "react-router-dom";
// interface Job {
//   _id: string
//   title: string
//   company: string
//   location: string
//   description: string
//   salary: {
//     min: number
//     max: number
//     currency: string
//   }
//   type: string
//   remote: boolean
//   createdAt: string
//   postedBy: {
//     name: string
//     company: string
//   }
//   applications?: Array<{
//     user: {
//       name: string
//       email: string
//     }
//     appliedAt: string
//   }>
// }

// const Dashboard: React.FC = () => {
//   const { user } = useAuth()
//   const [jobs, setJobs] = useState<Job[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchUserJobs = async () => {
//       try {
//         const endpoint = user?.role === 'employer' ? '/jobs/my/posted' : '/jobs/my/applications'
//         const response = await axios.get(endpoint)
//         setJobs(response.data)
//       } catch (error) {
//         console.error('Error fetching jobs:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUserJobs()
//   }, [user?.role])

//   if (loading) {
//     return <LoadingSpinner />
//   }

//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           {user?.role === 'employer' ? 'Employer Dashboard' : 'Job Seeker Dashboard'}
//         </h1>
//         <p className="text-gray-600">
//           {user?.role === 'employer' 
//             ? 'Manage your job postings and view applications'
//             : 'Track your job applications and find new opportunities'
//           }
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="card text-center">
//           <Briefcase className="w-8 h-8 text-primary-600 mx-auto mb-2" />
//           <h3 className="text-lg font-semibold text-gray-800">
//             {user?.role === 'employer' ? 'Jobs Posted' : 'Applications'}
//           </h3>
//           <p className="text-2xl font-bold text-primary-600">{jobs.length}</p>
//         </div>

//         {user?.role === 'employer' && (
//           <>
//             <div className="card text-center">
//               <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
//               <h3 className="text-lg font-semibold text-gray-800">Total Applications</h3>
//               <p className="text-2xl font-bold text-green-600">
//                 {jobs.reduce((total, job) => total + (job.applications?.length || 0), 0)}
//               </p>
//             </div>
//             <div className="card text-center">
//               <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
//               <h3 className="text-lg font-semibold text-gray-800">Active Jobs</h3>
//               <p className="text-2xl font-bold text-blue-600">
//                 {jobs.filter(job => job.applications !== undefined).length}
//               </p>
//             </div>
//           </>
//         )}
//       </div>

//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           {user?.role === 'employer' ? 'Your Job Postings' : 'Your Applications'}
//         </h2>
//       </div>

//       {jobs.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg mb-4">
//             {user?.role === 'employer' 
//               ? "You haven't posted any jobs yet."
//               : "You haven't applied to any jobs yet."
//             }
//           </p>
//           {user?.role === 'employer' && (
//             <Link to="/post-job" className="btn-primary">
//               Post Your First Job
//             </Link>
//           )}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {jobs.map((job) => (
//             <div key={job._id} className="relative">
//               <JobCard job={job} />
//               {user?.role === 'employer' && job.applications && (
//                 <div className="mt-2 text-sm text-gray-600">
//                   <span className="font-medium">{job.applications.length}</span> applications
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Dashboard

import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import JobCard from '../components/JobCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { Briefcase, Users, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

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
  applications?: Array<{
    user: {
      name: string
      email: string
    }
    appliedAt: string
  }>
}

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const endpoint = user?.role === 'employer' ? '/jobs/my/posted' : '/jobs/my/applications'
        const response = await axios.get(endpoint)
        setJobs(response.data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserJobs()
  }, [user?.role])

  if (loading) return <LoadingSpinner />

  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {user?.role === 'employer' ? 'Employer Dashboard' : 'Job Seeker Dashboard'}
        </h1>
        <p className="text-gray-600">
          {user?.role === 'employer'
            ? 'Manage your job postings and view applications'
            : 'Track your job applications and find new opportunities'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <Briefcase className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            {user?.role === 'employer' ? 'Jobs Posted' : 'Applications'}
          </h3>
          <p className="text-2xl font-bold text-primary-600">{jobs.length}</p>
        </div>

        {user?.role === 'employer' && (
          <>
            <div className="card text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-800">Total Applications</h3>
              <p className="text-2xl font-bold text-green-600">
                {jobs.reduce((total, job) => total + (job.applications?.length || 0), 0)}
              </p>
            </div>
            <div className="card text-center">
              <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-800">Active Jobs</h3>
              <p className="text-2xl font-bold text-blue-600">
                {jobs.filter(job => job.applications !== undefined).length}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Job Listings */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {user?.role === 'employer' ? 'Your Job Postings' : 'Your Applications'}
        </h2>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            {user?.role === 'employer'
              ? "You haven't posted any jobs yet."
              : "You haven't applied to any jobs yet."}
          </p>
          {user?.role === 'employer' && (
            <Link to="/post-job" className="btn-primary">
              Post Your First Job
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div key={job._id} className="relative p-4 border rounded-lg shadow-sm bg-white">
              <JobCard job={job} />

              {/* Show applications for employer */}
              {user?.role === 'employer' && job.applications && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Applications ({job.applications.length})
                  </h4>
                  <ul className="space-y-2">
                    {job.applications.map((app, idx) => (
                      <li key={idx} className="p-2 bg-gray-50 rounded border">
                        <p className="text-sm font-medium">{app.user.name}</p>
                        <p className="text-xs text-gray-500">{app.user.email}</p>
                        <p className="text-xs text-gray-400">
                          Applied on {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
