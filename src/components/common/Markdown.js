"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { toast } from "sonner";

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  }

  return (
    <div className="my-3 overflow-hidden rounded-md border border-border bg-[#0d1117] dark:bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
          {language || "text"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[10px] font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={11} />
              Copied
            </>
          ) : (
            <>
              <Copy size={11} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed">
        <code className={`hljs language-${language || "text"}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

export default function Markdown({ content, className = "" }) {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Code: handle inline vs block
          code(props) {
            const { children, className: codeClass, ...rest } = props;
            const match = /language-(\w+)/.exec(codeClass || "");
            const isInline = !(match && String(children).includes("\n"));

            if (isInline) {
              return (
                <code
                  className="rounded-sm border border-border bg-surface-hover px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
                  {...rest}
                >
                  {children}
                </code>
              );
            }

            // Block code → custom card
            const code = String(children).replace(/\n$/, "");
            return (
              <CodeBlock
                language={match ? match[1] : null}
                code={code}
              />
            );
          },
          // Pre: prevent double wrapping (we handle it in code block)
          pre({ children }) {
            return <>{children}</>;
          },
          // Headings
          h1({ children }) {
            return (
              <h1 className="mb-2 mt-4 text-xl font-semibold tracking-tight text-fg">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="mb-2 mt-4 text-lg font-semibold tracking-tight text-fg">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="mb-2 mt-3 text-base font-semibold text-fg">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="mb-1 mt-3 text-sm font-semibold text-fg">
                {children}
              </h4>
            );
          },
          // Paragraphs
          p({ children }) {
            return (
              <p className="mb-2.5 leading-relaxed text-fg last:mb-0">
                {children}
              </p>
            );
          },
          // Lists
          ul({ children }) {
            return (
              <ul className="mb-3 ml-5 list-disc space-y-1 marker:text-muted-foreground">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="mb-3 ml-5 list-decimal space-y-1 marker:text-muted-foreground">
                {children}
              </ol>
            );
          },
          li({ children }) {
            return <li className="leading-relaxed text-fg">{children}</li>;
          },
          // Links
          a({ children, href }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-2 transition hover:underline"
              >
                {children}
              </a>
            );
          },
          // Blockquote
          blockquote({ children }) {
            return (
              <blockquote className="my-3 border-l-2 border-accent bg-accent-soft px-3 py-2 text-sm italic text-muted">
                {children}
              </blockquote>
            );
          },
          // Tables (gfm)
          table({ children }) {
            return (
              <div className="my-3 overflow-x-auto rounded-md border border-border">
                <table className="w-full text-xs">{children}</table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="border-b border-border bg-surface">
                {children}
              </thead>
            );
          },
          th({ children }) {
            return (
              <th className="px-3 py-2 text-left font-semibold text-fg">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="border-t border-border px-3 py-2 text-fg">
                {children}
              </td>
            );
          },
          // Horizontal rule
          hr() {
            return <hr className="my-4 border-border" />;
          },
          // Strong / emphasis
          strong({ children }) {
            return (
              <strong className="font-semibold text-fg">{children}</strong>
            );
          },
          em({ children }) {
            return <em className="italic">{children}</em>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
