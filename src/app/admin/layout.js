import AdminAuthWrapper from '../../components/admin/AdminAuthWrapper';

// Force dynamic rendering for all admin routes
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminLayout({ children }) {
  return (
    <AdminAuthWrapper>
      {children}
    </AdminAuthWrapper>
  );
}

export const metadata = {
  title: 'Admin Panel - OD2',
  description: 'OD2 Administration Dashboard',
};