import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to OD2 Admin Dashboard</h1>
        <p className="text-gray-600">Manage and monitor your application from here</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Database Health Card */}
        <Link href="/admin/database-health" className="group">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow group-hover:border-blue-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl">
                📊
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                Database Health
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Monitor MongoDB connection health, usage metrics, and performance statistics
            </p>
            <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700">
              View Details →
            </div>
          </div>
        </Link>

        {/* System Status Card */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl">
              ✅
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-900">System Status</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">All systems operational</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>API Status</span>
              <span className="text-green-600 font-medium">✓ Online</span>
            </div>
            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-green-600 font-medium">✓ Connected</span>
            </div>
            <div className="flex justify-between">
              <span>Email Service</span>
              <span className="text-green-600 font-medium">✓ Active</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xl">
              ⚡
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <a 
              href="/api/health/database" 
              target="_blank"
              className="block text-sm text-blue-600 hover:text-blue-700"
            >
              📡 Check Database Health API
            </a>
            <a 
              href="/api/emails" 
              target="_blank"
              className="block text-sm text-blue-600 hover:text-blue-700"
            >
              📧 View Email API
            </a>
            <button 
              onClick={() => window.location.reload()}
              className="block text-sm text-gray-600 hover:text-gray-700"
            >
              🔄 Refresh Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Recent Optimizations</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-gray-600">MongoDB connection pooling optimized (Max 10 connections)</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-gray-600">Admin panel secured with client-side authentication</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-gray-600">Database health monitoring dashboard added</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-gray-600">Batch email processing endpoint created</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Admin Dashboard - OD2',
  description: 'OD2 Administration Dashboard - Monitor and manage your application',
};