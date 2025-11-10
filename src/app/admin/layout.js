import AdminAuthWrapper from '../../components/admin/AdminAuthWrapper';

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