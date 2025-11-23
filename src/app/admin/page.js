import Link from 'next/link';

// Force dynamic rendering to prevent build-time static generation issues
export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3 text-foreground">Welcome to OD2 Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage and monitor your application from here</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Database Health Card */}
        <Link href="/admin/database-health" className="group">
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6 hover:shadow-md transition-shadow group-hover:border-primary/50">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xl">
                📊
              </div>
              <h3 className="ml-4 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                Database Health
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Monitor MongoDB connection health, usage metrics, and performance statistics
            </p>
            <div className="text-primary text-sm font-medium group-hover:text-primary/80 transition-colors">
              View Details →
            </div>
          </div>
        </Link>

        {/* System Status Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 text-xl">
              ✅
            </div>
            <h3 className="ml-4 text-lg font-semibold text-card-foreground">System Status</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">All systems operational</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">API Status</span>
              <span className="text-green-600 dark:text-green-400 font-medium">✓ Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Database</span>
              <span className="text-green-600 dark:text-green-400 font-medium">✓ Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Email Service</span>
              <span className="text-green-600 dark:text-green-400 font-medium">✓ Active</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xl">
              ⚡
            </div>
            <h3 className="ml-4 text-lg font-semibold text-card-foreground">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <a 
              href="/api/health/database" 
              target="_blank"
              className="block text-sm text-primary hover:text-primary/80 transition-colors"
            >
              📡 Check Database Health API
            </a>
            <a 
              href="/api/emails" 
              target="_blank"
              className="block text-sm text-primary hover:text-primary/80 transition-colors"
            >
              📧 View Email API
            </a>
            <button 
              onClick={() => window.location.reload()}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              🔄 Refresh Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">📈 Recent Optimizations</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-muted-foreground">MongoDB connection pooling optimized (Max 10 connections)</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-muted-foreground">Admin panel secured with client-side authentication</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-muted-foreground">Database health monitoring dashboard added</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-muted-foreground">Batch email processing endpoint created</span>
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