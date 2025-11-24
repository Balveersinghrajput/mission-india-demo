// app/dashboard/page.jsx
import LogoutButton from '@/components/LogoutButton'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.email}</span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome to your Dashboard!</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <p className="text-gray-700">
                  <span className="font-semibold">User ID:</span> {user.userId}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                  🎉 Successfully Authenticated!
                </h3>
                <p className="text-indigo-700">
                  You are now logged in and can access protected routes. 
                  This page is only accessible to authenticated users.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Profile</h4>
                  <p className="text-sm text-blue-700">Manage your account settings</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900">Activity</h4>
                  <p className="text-sm text-green-700">View your recent activity</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900">Settings</h4>
                  <p className="text-sm text-purple-700">Customize your preferences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}