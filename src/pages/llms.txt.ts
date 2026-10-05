/**
 * llms.txt (https://llmstxt.org) — a plain-Markdown map of the site for AI
 * assistants and answer engines, generated from the same data as the pages.
 */
import { getCollection } from 'astro:content';
import { site, tools } from '~/data/site';
import { ncertClasses, ncertPath, totalChapters, SESSION } from '~/data/ncert';
import { absUrl } from '~/lib/url';

export async function GET() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const ncert = ncertClasses
    .map((c) => {
      const subjects = c.subjects
        .map((s) => {
          const chapters = s.chapters
            .map((ch) => `  - [Chapter ${ch.n}: ${ch.title}${ch.book ? ` (${ch.book})` : ''}](${absUrl(ncertPath.chapter(c.cls, s.slug, ch.slug))}) — ${ch.pages} pages, PDF: ${absUrl(ch.file)}`)
            .join('\n');
          return `- [NCERT Class ${c.cls} ${s.name}](${absUrl(ncertPath.subject(c.cls, s.slug))}): ${s.chapters.length} chapters\n${chapters}`;
        })
        .join('\n');
      return `### [NCERT Class ${c.cls}](${absUrl(ncertPath.cls(c.cls))})\n\n${subjects}`;
    })
    .join('\n\n');

  const body = `# ${site.name}

> ${site.name} (padhlebeta.live) is a free study site for Indian students: free NCERT textbook PDFs for Class 9–12, chapter-wise, plus browser-based PDF tools — most notably converting black-background coaching notes (PW, Unacademy, ALLEN) into white, A4, ink-saving printable PDFs. No login, no uploads, no cost.

Key facts:
- NCERT PDFs: ${totalChapters} chapters from the current ${SESSION} NCERT textbooks for Class 9, 10, 11 and 12 (Physics, Chemistry, Maths, Biology, Science, Social Science, English). Each chapter can be read online in a built-in reader or downloaded as a PDF; each subject can be downloaded as one full-book PDF.
- PDF tools run entirely in the browser; files never leave the user's device.
- Everything is free, with no signup and no download limits.

## NCERT PDFs

- [NCERT books PDF — Class 9 to 12](${absUrl(ncertPath.hub())}): hub with search across all chapters

${ncert}

## PDF tools

${tools.map((t) => `- [${t.name}](${absUrl(`/tools/${t.slug}/`)}): ${t.description}`).join('\n')}

## Guides

- [Print guides by coaching platform](${absUrl('/print/')})
${posts.map((p) => `- [${p.data.title}](${absUrl(`/blog/${p.id}/`)}): ${p.data.description}`).join('\n')}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
