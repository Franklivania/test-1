import React from 'react';
import ItemLayout from './layout';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <ItemLayout params={params}>
      <div>
        <h1 className='text-neutral-800 text-3xl font-semibold py-5 border-b border-slate-300'>{params.slug.replace('-', ' ').toUpperCase()}</h1>
        <section className='mt-5'>
          <p>Dynamic content related to {params.slug} goes here.</p>
        </section>
      </div>
    </ItemLayout>
  );
}
