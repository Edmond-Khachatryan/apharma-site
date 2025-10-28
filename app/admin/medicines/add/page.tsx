import { redirect } from 'next/navigation';

export default function AddMedicinePage() {
  redirect('/admin/medicines/new');
}

