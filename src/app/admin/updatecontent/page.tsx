// /app/admin/updatecontent/page.tsx
import { cookies } from 'next/headers';
import ClientUpdateContentPage from './ClientUpdateContentPage';

export default async function UpdateContentWrapper() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get('admin_auth')?.value === 'true';

  if (!isLoggedIn) {
    return <div className="p-10 text-red-500">Access Denied</div>;
  }

  return <ClientUpdateContentPage />;
}
