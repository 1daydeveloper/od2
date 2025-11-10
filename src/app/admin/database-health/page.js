import DatabaseHealth from '../../../components/database-health';

export default function DatabaseHealthPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Database Monitoring</h1>
        <p className="text-gray-600">Monitor MongoDB connection health and performance metrics</p>
      </div>
      
      <div className="grid gap-6">
        <DatabaseHealth />
        
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">📊 MongoDB Atlas M0 Connection Limits</h3>
          <div className="text-sm text-blue-700 space-y-2">
            <p>• M0 clusters have a maximum of <strong>500 concurrent connections</strong></p>
            <p>• Our application is configured to use maximum <strong>10 connections</strong></p>
            <p>• Connections are automatically closed after <strong>30 seconds</strong> of inactivity</p>
            <p>• If utilization exceeds 80%, consider optimizing your queries or upgrading your cluster</p>
          </div>
        </div>

        <div className="p-6 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">💡 Optimization Tips</h3>
          <div className="text-sm text-amber-700 space-y-2">
            <p>• Use the <code className="bg-amber-100 px-1 rounded">/api/save-email-optimized</code> endpoint for batch processing</p>
            <p>• Implement caching for frequently accessed data</p>
            <p>• Add database indexes for commonly queried fields</p>
            <p>• Consider upgrading to M2+ for higher connection limits</p>
          </div>
        </div>

        <div className="p-6 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-3">🛡️ Security Status</h3>
          <div className="text-sm text-green-700 space-y-2">
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