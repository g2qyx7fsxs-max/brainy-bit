import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 text-xl font-bold text-gray-900 first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 text-lg font-bold text-gray-900">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-base leading-relaxed text-gray-700">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 ml-5 list-disc space-y-1 text-gray-700">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-5 list-decimal space-y-1 text-gray-700">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <div className="mb-4 rounded-2xl bg-gray-50 px-5 py-4 text-gray-800">{children}</div>
  ),
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-medium text-violet-700 underline decoration-violet-300 underline-offset-2 hover:decoration-violet-600"
    >
      {children}
    </a>
  ),
};
