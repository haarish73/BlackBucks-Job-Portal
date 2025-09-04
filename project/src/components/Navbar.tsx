// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'
// import { Briefcase, User, LogOut, Plus } from 'lucide-react'

// const Navbar: React.FC = () => {
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     logout()
//     navigate('/')
//   }

//   return (
//     <nav className="bg-white shadow-lg border-b border-gray-200">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <Briefcase className="w-8 h-8 text-primary-600" />
//             <span className="text-xl font-bold text-gray-800">JobPortal</span>
//           </Link>

//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <span className="text-gray-600">
//                   Welcome, {user.name}
//                 </span>
//                 {user.role === 'employer' && (
//                   <Link
//                     to="/post-job"
//                     className="flex items-center space-x-1 btn-primary"
//                   >
//                     <Plus className="w-4 h-4" />
//                     <span>Post Job</span>
//                   </Link>
//                 )}
//                 <Link
//                   to="/dashboard"
//                   className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
//                 >
//                   <User className="w-4 h-4" />
//                   <span>Dashboard</span>
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   <span>Logout</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-600 hover:text-primary-600 transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="btn-primary"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Briefcase, User, LogOut, Plus, Menu } from 'lucide-react'

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
   <nav className="bg-white shadow-lg border-l border-gray-400 h-90">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-800">JobPortal</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            {!user && (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </NavLink>
              </>
            )}

            {user && (
              <div className="flex items-center space-x-3">
                {user.role === 'employer' && (
                  <NavLink
                    to="/post-job"
                    className="flex items-center space-x-1 btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Post Job</span>
                  </NavLink>
                )}

                {/* User dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{user.name}</span>
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block px-4 py-2 btn-primary rounded"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <>
                {user.role === 'employer' && (
                  <NavLink
                    to="/post-job"
                    className="block px-4 py-2 btn-primary rounded"
                  >
                    Post Job
                  </NavLink>
                )}
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
