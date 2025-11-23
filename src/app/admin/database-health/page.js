import DatabaseHealth from '../../../components/database-health';

// Force dynamic rendering to prevent build-time static generation issues
export const dynamic = 'force-dynamic';

export default function DatabaseHealthPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3 text-foreground">Database Monitoring</h1>
        <p className="text-muted-foreground">Monitor MongoDB connection health and performance metrics</p>
      </div>
      
      <div className="grid gap-6">
        <DatabaseHealth />
        
        {/* MongoDB Atlas Information Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-lg mr-3">
              📊
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">MongoDB Atlas M0 Connection Limits</h3>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• M0 clusters have a maximum of <strong className="text-foreground">500 concurrent connections</strong></p>
            <p>• Our application is configured to use maximum <strong className="text-foreground">10 connections</strong></p>
            <p>• Connections are automatically closed after <strong className="text-foreground">30 seconds</strong> of inactivity</p>
            <p>• Connection counts shown above are <strong className="text-foreground">estimated</strong> (exact monitoring requires paid Atlas tiers)</p>
            <p>• If utilization exceeds 80%, consider optimizing your queries or upgrading your cluster</p>
          </div>
        </div>

        {/* Optimization Tips Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-lg mr-3">
              💡
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Optimization Tips</h3>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Monitor email processing performance in real-time</p>
            <p>• Implement caching for frequently accessed data</p>
            <p>• Add database indexes for commonly queried fields</p>
            <p>• Consider upgrading to M2+ for higher connection limits</p>
          </div>
        </div>

        {/* Security Status Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-lg mr-3">
              🛡️
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Security Status</h3>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Admin panel is now protected with client-side authentication</p>
            <p>• Session expires automatically after 24 hours</p>
            <p>• Connection monitoring is active and optimized</p>
            <p>• All API endpoints are secured against connection overflow</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Database Health - OD2',
  description: 'Monitor MongoDB connection health and performance metrics',
};