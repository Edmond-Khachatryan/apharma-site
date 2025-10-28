import { redirect } from 'next/navigation';

export default function AddBlogPostPage() {
  redirect('/admin/blog/new');
}

