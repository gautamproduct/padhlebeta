/**
 * NCERT chapter PDFs (Class 9–12), served from /public/ncert/.
 * ncert.json is generated: one entry per chapter, in textbook order.
 */
import raw from './ncert.json';

export interface NcertChapter {
  n: number;
  title: string;
  slug: string;
  file: string;
  pages: number;
  kb: number;
  /** Set when a subject spans more than one textbook (Class 10 English / SST). */
  book?: string;
  /** Opening lines of the chapter, extracted from the PDF (may be empty). */
  excerpt?: string;
}
export interface NcertSubject {
  slug: string;
  name: string;
  chapters: NcertChapter[];
}
export interface NcertClass {
  cls: number;
  subjects: NcertSubject[];
}

export const ncertClasses = raw as NcertClass[];

export const SESSION = '2026–27';

/** Per-subject accent + short blurb, used on cards. */
export const subjectMeta: Record<string, { hue: string; blurb: string; exams: string }> = {
  physics: { hue: '#2563EB', blurb: 'Mechanics, optics, electricity, modern physics', exams: 'Boards · JEE · NEET' },
  chemistry: { hue: '#16A34A', blurb: 'Physical, organic and inorganic chemistry', exams: 'Boards · JEE · NEET' },
  maths: { hue: '#9333EA', blurb: 'Algebra, calculus, geometry, probability', exams: 'Boards · JEE' },
  biology: { hue: '#DB2777', blurb: 'Botany, zoology, genetics, ecology', exams: 'Boards · NEET' },
  science: { hue: '#0891B2', blurb: 'Physics, chemistry and biology together', exams: 'Boards · Olympiads' },
  'social-science': { hue: '#CA8A04', blurb: 'History, geography, political science, economics', exams: 'Boards' },
  english: { hue: '#EA580C', blurb: 'Prose, stories and supplementary reader', exams: 'Boards' },
};

export const allChapters = ncertClasses.flatMap((c) =>
  c.subjects.flatMap((s) => s.chapters.map((ch) => ({ cls: c.cls, subject: s, chapter: ch }))),
);

export const totalChapters = allChapters.length;

export const ncertPath = {
  hub: () => '/ncert-pdf/',
  cls: (cls: number) => `/ncert-pdf/class-${cls}/`,
  subject: (cls: number, s: string) => `/ncert-pdf/class-${cls}/${s}/`,
  chapter: (cls: number, s: string, ch: string) => `/ncert-pdf/class-${cls}/${s}/${ch}/`,
};

/** "Chapter 12" or "First Flight Ch 3" — how a chapter is labelled in lists. */
export function chapterLabel(ch: NcertChapter): string {
  return ch.book ? `${ch.book.split(' – ')[0]} · Ch ${ch.n}` : `Chapter ${ch.n}`;
}

/** Nice filename for the download attribute. */
export function downloadName(cls: number, s: NcertSubject, ch: NcertChapter): string {
  const book = ch.book ? ` ${ch.book.split(' – ')[0]}` : '';
  return `NCERT Class ${cls} ${s.name}${book} Ch ${ch.n} - ${ch.title.replace(/[\\/:*?"<>|]/g, '')}.pdf`;
}

export function formatKb(kb: number): string {
  return kb < 1024 ? `${kb} KB` : `${(kb / 1024).toFixed(1)} MB`;
}

export function subjectTotals(s: NcertSubject) {
  return {
    pages: s.chapters.reduce((a, c) => a + c.pages, 0),
    kb: s.chapters.reduce((a, c) => a + c.kb, 0),
  };
}
