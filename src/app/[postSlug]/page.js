import React from 'react';

import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import CircularColorsDemo from '@/components/CircularColorsDemo/CircularColorsDemo';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo/DivisionGroupsDemo';

import { loadBlogPost } from '@/helpers/file-helpers';

import { BLOG_TITLE } from '@/constants';

import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);
  const { title, abstract } = frontmatter;
  return {
    title: `${title} • ${BLOG_TITLE}`,
    description: abstract,
  };
}

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);
  if (content === null) {
    notFound();
  }
  const { title, publishedOn } = frontmatter;
  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            CircularColorsDemo,
            DivisionGroupsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
