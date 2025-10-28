import { redirect } from 'next/navigation';

export default function AddPharmacyPage() {
  redirect('/admin/pharmacies/new');
}

