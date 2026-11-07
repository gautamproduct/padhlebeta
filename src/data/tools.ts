/**
 * Tool catalogue. Every tool page, the tools index, the footer, the sitemap
 * and the JSON-LD are generated from this list.
 *
 * `seoTitle` / `metaDescription` are written for the SERP (≤60 / ≤155 chars).
 * `name` is the on-page H1.
 */

/** `advanced` options are tucked under "More options" to keep the tool simple. */
export type ToolOption = { advanced?: boolean } & (
  | { type: 'select'; name: string; label: string; default: string; choices: readonly { value: string; label: string }[] }
  | { type: 'text'; name: string; label: string; placeholder?: string; default?: string; hint?: string }
  | { type: 'number'; name: string; label: string; default: number; min?: number; max?: number; step?: number }
  | { type: 'checkbox'; name: string; label: string; default: boolean }
);

export type ToolCategory = 'print' | 'organize' | 'convert' | 'optimize';

export type Tool = {
  slug: string;
  name: string;
  shortName: string;
  seoTitle: string;
  metaDescription: string;
  category: ToolCategory;
  description: string;
  longDescription: string;
  accept: 'pdf' | 'image';
  multiple: boolean;
  /** Tool renders its own interactive UI (e.g. page thumbnails) after a file is chosen. */
  customUi?: boolean;
  options: readonly ToolOption[];
  benefits: readonly string[];
  faq: readonly { q: string; a: string }[];
  steps: readonly string[];
  keywords: readonly string[];
};

const PAGES_OPTION: ToolOption = {
  type: 'text',
  name: 'pages',
  label: 'Pages (leave empty for all)',
  placeholder: 'e.g. 1-5, 8, 11-13',
};

export const toolCategories: Record<ToolCategory, string> = {
  print: 'Print & save ink',
  organize: 'Organise pages',
  convert: 'Convert',
  optimize: 'Optimise & share',
};

export const tools: readonly Tool[] = [
  {
    slug: 'dark-to-light',
    name: 'Dark PDF to Light PDF',
    shortName: 'Dark → Light',
    seoTitle: 'Dark PDF to Light PDF Converter – Free, Save 60% Ink',
    metaDescription:
      'Convert black-background PDFs (PW, Unacademy, Allen slides) to white, print-ready notes. Auto-detects dark pages, 2 or 4 slides per sheet. Free, no upload.',
    category: 'print',
    description:
      'Turn black-background lecture slides into white, ink-saving printables. Auto-skips pages that are already light.',
    longDescription:
      'Coaching slides are designed for screens — black background, white text. Printing them as-is drains a cartridge in a few chapters. This tool inverts every dark page to black-on-white, cleans leftover grey haze to pure white, and can fit 2 or 4 slides on one sheet so you use less paper too.',
    accept: 'pdf',
    multiple: false,
    options: [
      {
        type: 'select',
        name: 'mode',
        advanced: true,
        label: 'Which pages to invert',
        default: 'auto',
        choices: [
          { value: 'auto', label: 'Auto — only dark pages (recommended)' },
          { value: 'all', label: 'All pages' },
        ],
      },
      {
        type: 'select',
        name: 'paper',
        label: 'Paper size',
        default: 'a4',
        choices: [
          { value: 'a4', label: 'A4 — ready to print' },
          { value: 'original', label: 'Keep original page size' },
        ],
      },
      {
        type: 'select',
        name: 'perSheet',
        label: 'Slides per A4 sheet',
        default: '1',
        choices: [
          { value: '1', label: '1 — one slide per page' },
          { value: '2', label: '2 per sheet — half the paper' },
          { value: '4', label: '4 per sheet — quarter the paper' },
          { value: '6', label: '6 per sheet' },
        ],
      },
      { type: 'checkbox', name: 'grayscale', label: 'Black & white (uses no colour ink)', default: false },
      { type: 'checkbox', name: 'clean', advanced: true, label: 'Clean background (remove grey haze → pure white)', default: true },
      {
        type: 'select',
        name: 'quality',
        advanced: true,
        label: 'Print quality',
        default: '150',
        choices: [
          { value: '110', label: 'Draft — smallest file' },
          { value: '150', label: 'Standard' },
          { value: '220', label: 'High — sharpest text' },
        ],
      },
    ],
    benefits: [
      'Save up to 60% printer ink on every dark page',
      'Output is A4 and print-ready — widescreen slides are fitted and centred automatically',
      'Auto mode leaves already-white pages (covers, questions) untouched',
      '2, 4 or 6 slides per sheet cuts paper cost by up to 83%',
      '“Clean background” removes the grey toner haze other converters leave',
      'Runs in your browser — your notes never leave your device',
    ],
    steps: [
      'Choose your dark-background PDF.',
      'Pick how many slides per sheet and whether you want black & white.',
      'Click “Run tool”.',
      'Your light, print-ready PDF downloads automatically.',
    ],
    faq: [
      {
        q: 'How do I convert a dark PDF to a white background for printing?',
        a: 'Open this page, choose your PDF, keep “Auto” selected and click Run tool. Every page with a dark background is inverted to black text on white, and the new PDF downloads straight away. It takes a few seconds for a 100-page file.',
      },
      {
        q: 'Will it also invert pages that are already white?',
        a: 'Not in Auto mode. Each page is measured first, and only pages that are mostly dark are inverted. Choose “All pages” if you want every page flipped.',
      },
      {
        q: 'Can I print 4 slides on one page?',
        a: 'Yes. Set “Slides per printed sheet” to 4. The tool lays the converted slides out on A4 in a neat grid, so a 120-slide lecture prints on 30 sheets.',
      },
      {
        q: 'Will diagrams and photos look odd?',
        a: 'Line diagrams, formulas and handwriting invert cleanly. Photographs on a dark slide will look like negatives after inversion — that is expected, and for revision notes it is rarely a problem.',
      },
      {
        q: 'Is my PDF uploaded anywhere?',
        a: 'No. The conversion runs in your browser with PDF.js and pdf-lib. Nothing is uploaded, logged or stored. You can even switch off Wi-Fi after the page loads and it still works.',
      },
      {
        q: 'Is the output text-searchable?',
        a: 'The output is image-based so it prints exactly as it looks. If you need to search the text, keep the original PDF for reading on screen and use this version for printing.',
      },
    ],
    keywords: [
      'dark pdf to light pdf',
      'convert black background pdf to white',
      'invert pdf colors for printing',
      'print dark slides without wasting ink',
      'pdf background white kaise kare',
    ],
  },
  {
    slug: 'pages-per-sheet',
    name: 'Print Multiple Pages per Sheet',
    shortName: 'Pages per Sheet',
    seoTitle: 'Print Multiple PDF Pages per Sheet (2, 4, 6, 9-up) – Free',
    metaDescription:
      'Put 2, 4, 6 or 9 PDF pages on one A4 sheet to cut printing cost. Perfect for lecture slides and revision notes. Free, works in your browser, no upload.',
    category: 'print',
    description: 'Fit 2, 4, 6 or 9 slides on one A4 sheet. Cut your printing bill by up to 89%.',
    longDescription:
      'Lecture slides have huge margins and big fonts, so one slide per sheet wastes most of the paper. This tool arranges several pages on each A4 sheet in reading order, with optional borders, so a 200-slide chapter becomes a slim, flip-able booklet.',
    accept: 'pdf',
    multiple: false,
    options: [
      {
        type: 'select',
        name: 'perSheet',
        label: 'Pages per sheet',
        default: '4',
        choices: [
          { value: '2', label: '2 per sheet' },
          { value: '4', label: '4 per sheet' },
          { value: '6', label: '6 per sheet' },
          { value: '9', label: '9 per sheet' },
        ],
      },
      { type: 'checkbox', name: 'border', label: 'Draw a thin border around each page', default: true },
      { type: 'number', name: 'margin', label: 'Sheet margin (mm)', default: 8, min: 0, max: 30, step: 1 },
    ],
    benefits: [
      '4 slides per sheet = 75% less paper, 9 per sheet = 89% less',
      'Automatic portrait / landscape choice for the best fit',
      'Keeps vector text sharp — pages are placed, not screenshotted',
      'Combine with Dark → Light for maximum savings',
    ],
    steps: [
      'Choose your PDF.',
      'Pick 2, 4, 6 or 9 pages per sheet.',
      'Click “Run tool”.',
      'Print the downloaded PDF at 100% scale.',
    ],
    faq: [
      {
        q: 'How do I print 4 pages on one sheet from a PDF?',
        a: 'Choose your PDF here, select “4 per sheet” and run the tool. You get a new PDF where every A4 page holds four of your original pages. Print it normally — no printer settings needed.',
      },
      {
        q: 'Will the text be too small to read?',
        a: 'For typical 16:9 lecture slides, 4 per sheet is very readable. 6 and 9 per sheet are best for formula sheets and quick revision. Text stays vector-sharp, so it does not blur.',
      },
      {
        q: 'Does it work with dark slides?',
        a: 'It does, but you will still use a lot of ink. Run Dark → Light first (it has a built-in slides-per-sheet option), or run this tool on the light version.',
      },
    ],
    keywords: ['print multiple pages per sheet pdf', '4 slides per page pdf', 'pdf n-up online', 'print 2 pages on one sheet'],
  },
  {
    slug: 'grayscale-pdf',
    name: 'Grayscale PDF (Black & White)',
    shortName: 'Grayscale',
    seoTitle: 'Convert PDF to Grayscale / Black & White Online – Free',
    metaDescription:
      'Convert colour PDFs to black & white so your printer uses only black ink. Keeps diagrams readable. Free, no signup, files never leave your device.',
    category: 'print',
    description: 'Strip colour so your printer uses black ink only. Colour cartridges stay untouched.',
    longDescription:
      'Many printers quietly mix colour ink into “black” and drain colour cartridges on every page. Converting to true grayscale first guarantees black-only printing and makes highlighted slides easier to photocopy.',
    accept: 'pdf',
    multiple: false,
    options: [
      {
        type: 'select',
        name: 'quality',
        label: 'Quality',
        default: '150',
        choices: [
          { value: '110', label: 'Draft — smallest file' },
          { value: '150', label: 'Standard' },
          { value: '220', label: 'High' },
        ],
      },
      { type: 'checkbox', name: 'clean', label: 'Whiten light backgrounds', default: true },
    ],
    benefits: [
      'Zero colour ink used on printing',
      'Perceptual conversion keeps red/green diagram labels distinguishable',
      'Great before photocopying or Xerox shop prints',
      'Private — processed in your browser',
    ],
    steps: ['Choose your PDF.', 'Pick a quality level.', 'Click “Run tool”.', 'Download the black & white PDF.'],
    faq: [
      {
        q: 'Why convert to grayscale if my printer has a “black & white” setting?',
        a: 'Printer drivers vary: many still use composite colour for dark greys. A true grayscale PDF prints identically on every printer and at every Xerox shop.',
      },
      {
        q: 'Will coloured text become hard to read?',
        a: 'Colours are mapped by perceived brightness, so red and blue text become distinct shades of grey rather than the same tone.',
      },
    ],
    keywords: ['convert pdf to grayscale', 'pdf to black and white online', 'remove color from pdf'],
  },
  {
    slug: 'merge',
    name: 'Merge PDFs',
    shortName: 'Merge',
    seoTitle: 'Merge PDF Online Free – Combine PDF Files, No Upload',
    metaDescription:
      'Combine multiple PDFs into one file in seconds. Drag to reorder, no watermark, no signup, no file limit. Everything runs in your browser.',
    category: 'organize',
    description: 'Combine several PDFs into one document, in the order you choose.',
    longDescription:
      'Stop juggling ten chapter PDFs. Choose them all, arrange the order, and download a single file — ready to print or send.',
    accept: 'pdf',
    multiple: true,
    options: [],
    benefits: [
      'Combine an entire subject’s notes into one file',
      'Files are merged in the order shown — reorder before running',
      'No upload, no signup, no watermarks',
      'Handles large files — tested with 1000+ pages',
    ],
    steps: [
      'Choose two or more PDFs.',
      'Use the arrows to put them in order.',
      'Click “Run tool”.',
      'Download the combined file.',
    ],
    faq: [
      {
        q: 'Is there a limit on how many files I can merge?',
        a: 'No hard limit — it depends on your device. Most phones handle 10+ files of 200 pages each.',
      },
      {
        q: 'Can I reorder pages inside a single PDF?',
        a: 'This tool merges whole files. To rearrange, rotate or delete individual pages, use Organise PDF.',
      },
      {
        q: 'Are my files uploaded to a server?',
        a: 'No. Merging happens in your browser. Nothing leaves your device.',
      },
    ],
    keywords: ['merge pdf online free', 'combine pdf files', 'join pdf'],
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF',
    shortName: 'Split',
    seoTitle: 'Split PDF Online Free – By Page Range or Every N Pages',
    metaDescription:
      'Split a big PDF into chapters: by page ranges, every N pages, or one file per page. Downloads as a ZIP. Free, private, no signup.',
    category: 'organize',
    description: 'Break one big PDF into several smaller files — by range, every N pages, or page by page.',
    longDescription:
      'Got a 600-page module? Split it into chapter-sized files so they are easy to share on WhatsApp, print separately, or revise one at a time.',
    accept: 'pdf',
    multiple: false,
    options: [
      {
        type: 'select',
        name: 'mode',
        label: 'How to split',
        default: 'ranges',
        choices: [
          { value: 'ranges', label: 'By page ranges (one file per range)' },
          { value: 'every', label: 'Every N pages' },
          { value: 'each', label: 'Every page as its own file' },
        ],
      },
      { type: 'text', name: 'ranges', label: 'Ranges (for “by page ranges”)', placeholder: 'e.g. 1-40, 41-95, 96-130' },
      { type: 'number', name: 'every', label: 'N (for “every N pages”)', default: 10, min: 1, max: 1000, step: 1 },
    ],
    benefits: [
      'Three split modes cover every use case',
      'Multiple outputs come as one ZIP download',
      'Pages are copied losslessly — no quality change',
      'Browser-based and private',
    ],
    steps: ['Choose your PDF.', 'Pick a split mode and enter ranges or N.', 'Click “Run tool”.', 'Download the ZIP of split files.'],
    faq: [
      {
        q: 'How is Split different from Extract Pages?',
        a: 'Extract Pages produces one file containing the pages you pick. Split produces several files at once — for example one per chapter.',
      },
      {
        q: 'Does splitting reduce quality?',
        a: 'No. Pages are copied byte-for-byte from the original.',
      },
    ],
    keywords: ['split pdf online free', 'split pdf by pages', 'divide pdf into chapters'],
  },
  {
    slug: 'extract-pages',
    name: 'Extract Pages from PDF',
    shortName: 'Extract',
    seoTitle: 'Extract Pages from PDF Online Free – Pick Any Pages',
    metaDescription:
      'Pull only the pages you need from a long PDF into a new file. Enter ranges like 1-5, 12, 18-22. Free, lossless, no upload.',
    category: 'organize',
    description: 'Pull out only the pages you need into a new PDF — one chapter, one topic, one formula sheet.',
    longDescription:
      'Got a 600-page PDF but only need pages 142 to 178? Enter the range and get a new PDF with exactly those pages — no re-uploading, no signups.',
    accept: 'pdf',
    multiple: false,
    options: [{ type: 'text', name: 'ranges', label: 'Pages to extract', placeholder: 'e.g. 1-5, 12, 18-22' }],
    benefits: [
      'Pull a single chapter or topic from a large PDF',
      'Ranges like 12-25, 40, 55-60',
      'Browser-based, no upload, no waiting',
      'Preserves original quality',
    ],
    steps: [
      'Choose your PDF.',
      'Enter the pages you want (e.g. 1-5, 12, 18-22).',
      'Click “Run tool”.',
      'Download the new PDF.',
    ],
    faq: [
      {
        q: 'What page range formats are supported?',
        a: 'Comma-separated pages and ranges like “1-5, 10, 15-20”.',
      },
      {
        q: 'Are original pages preserved?',
        a: 'Yes. Pages are copied byte-perfect from the source PDF.',
      },
    ],
    keywords: ['extract pages from pdf', 'pdf page extractor', 'save certain pages of pdf'],
  },
  {
    slug: 'organize-pdf',
    name: 'Organise PDF Pages',
    shortName: 'Organise',
    seoTitle: 'Organise PDF Pages – Reorder, Rotate & Delete Online Free',
    metaDescription:
      'See every page as a thumbnail, drag to reorder, rotate, and delete ad or cover pages before printing. Free, no upload, works on mobile.',
    category: 'organize',
    description: 'Drag pages into order, rotate sideways ones, and delete covers or ad pages — visually.',
    longDescription:
      'Coaching PDFs often start with promo pages and end with ads. See every page as a thumbnail, tap to remove the ones you don’t need, rotate landscape pages, and drag the rest into the order you want.',
    accept: 'pdf',
    multiple: false,
    customUi: true,
    options: [],
    benefits: [
      'Visual thumbnail grid — see what you are keeping',
      'Delete promo, blank or duplicate pages in one tap',
      'Rotate individual pages',
      'Drag and drop to reorder',
    ],
    steps: [
      'Choose your PDF — thumbnails appear.',
      'Drag to reorder; use ⟳ to rotate and ✕ to delete.',
      'Click “Run tool”.',
      'Download the organised PDF.',
    ],
    faq: [
      {
        q: 'Can I undo a deletion?',
        a: 'Yes. Deleted pages are only greyed out until you run the tool — tap ✕ again to restore one.',
      },
      {
        q: 'Does it work on phones?',
        a: 'Yes. On touch screens use the ← → buttons on each thumbnail to move pages.',
      },
    ],
    keywords: ['reorder pdf pages', 'delete pages from pdf', 'organize pdf online free', 'rearrange pdf pages'],
  },
  {
    slug: 'rotate-pdf',
    name: 'Rotate PDF',
    shortName: 'Rotate',
    seoTitle: 'Rotate PDF Pages Online Free – Permanently Save Rotation',
    metaDescription:
      'Rotate all or selected PDF pages by 90°, 180° or 270° and save the result permanently. Free, instant, no upload, no watermark.',
    category: 'organize',
    description: 'Rotate every page, or just the sideways ones, and save the rotation permanently.',
    longDescription:
      'Scanned notes and phone-captured pages often come in sideways. Rotate the whole PDF or only specific pages and download a file that opens the right way up everywhere.',
    accept: 'pdf',
    multiple: false,
    options: [
      {
        type: 'select',
        name: 'angle',
        label: 'Rotate by',
        default: '90',
        choices: [
          { value: '90', label: '90° clockwise' },
          { value: '180', label: '180°' },
          { value: '270', label: '90° anti-clockwise' },
        ],
      },
      PAGES_OPTION,
    ],
    benefits: ['Rotate all pages or a selection', 'Rotation is saved in the file', 'Lossless — nothing is re-encoded', 'Instant, even for huge files'],
    steps: ['Choose your PDF.', 'Pick an angle and (optionally) pages.', 'Click “Run tool”.', 'Download the rotated PDF.'],
    faq: [
      {
        q: 'Will the rotation stick when I share the file?',
        a: 'Yes. The rotation is written into the PDF itself, so it opens correctly in every viewer and on every phone.',
      },
    ],
    keywords: ['rotate pdf online free', 'rotate pdf pages permanently', 'turn pdf sideways'],
  },
  {
    slug: 'crop-pdf',
    name: 'Crop PDF Margins',
    shortName: 'Crop',
    seoTitle: 'Crop PDF Margins Online Free – Trim White Space',
    metaDescription:
      'Trim the margins or watermark strips off PDF pages so content prints bigger. Set top, bottom, left and right in mm. Free and private.',
    category: 'organize',
    description: 'Trim wide margins or header/footer strips so the content prints larger.',
    longDescription:
      'Many coaching PDFs carry thick margins or a branded header and footer strip on every page. Crop them off and the actual notes print bigger and clearer on the same paper.',
    accept: 'pdf',
    multiple: false,
    options: [
      { type: 'number', name: 'top', label: 'Top (mm)', default: 10, min: 0, max: 200, step: 1 },
      { type: 'number', name: 'bottom', label: 'Bottom (mm)', default: 10, min: 0, max: 200, step: 1 },
      { type: 'number', name: 'left', label: 'Left (mm)', default: 10, min: 0, max: 200, step: 1 },
      { type: 'number', name: 'right', label: 'Right (mm)', default: 10, min: 0, max: 200, step: 1 },
      PAGES_OPTION,
    ],
    benefits: ['Content prints larger on the same sheet', 'Remove header/footer strips', 'Lossless — vector text stays sharp', 'Apply to all pages or a selection'],
    steps: ['Choose your PDF.', 'Enter how much to trim from each side.', 'Click “Run tool”.', 'Download the cropped PDF.'],
    faq: [
      {
        q: 'Is the cropped content deleted?',
        a: 'It is hidden via the PDF crop box, which every viewer and printer respects. The file stays lossless.',
      },
    ],
    keywords: ['crop pdf online free', 'remove margins from pdf', 'trim pdf pages'],
  },
  {
    slug: 'add-page-numbers',
    name: 'Add Page Numbers to PDF',
    shortName: 'Page Numbers',
    seoTitle: 'Add Page Numbers to PDF Online Free – No Watermark',
    metaDescription:
      'Add page numbers to any PDF online: pick position, format (1, Page 1, 1 of N) and start number. Works on phone, free, no watermark, no upload.',
    category: 'organize',
    description: 'Stamp page numbers on every page so printed notes stay in order.',
    longDescription:
      'Printed notes get shuffled. Page numbers make them easy to put back in order and easy to reference — “revise pages 40–55 tonight”.',
    accept: 'pdf',
    multiple: false,
    options: [
      {
        type: 'select',
        name: 'position',
        label: 'Position',
        default: 'bottom-center',
        choices: [
          { value: 'bottom-center', label: 'Bottom centre' },
          { value: 'bottom-right', label: 'Bottom right' },
          { value: 'bottom-left', label: 'Bottom left' },
          { value: 'top-right', label: 'Top right' },
          { value: 'top-center', label: 'Top centre' },
        ],
      },
      {
        type: 'select',
        name: 'format',
        label: 'Format',
        default: 'n',
        choices: [
          { value: 'n', label: '1' },
          { value: 'page-n', label: 'Page 1' },
          { value: 'n-of-total', label: '1 / 24' },
          { value: 'page-n-of-total', label: 'Page 1 of 24' },
        ],
      },
      { type: 'number', name: 'start', label: 'Start at', default: 1, min: 0, max: 100000, step: 1 },
      { type: 'number', name: 'size', label: 'Font size (pt)', default: 11, min: 6, max: 36, step: 1 },
    ],
    benefits: ['Five positions, four formats', 'Custom starting number', 'Text stays vector-sharp', 'Private and instant'],
    steps: ['Choose your PDF.', 'Pick position, format and start number.', 'Click “Run tool”.', 'Download the numbered PDF.'],
    faq: [
      {
        q: 'Can I start numbering from a number other than 1?',
        a: 'Yes — set “Start at”. Handy when a PDF is part two of a larger module.',
      },
      {
        q: 'How do I add page numbers to a PDF on my phone?',
        a: 'Open this page in Chrome (Android) or Safari (iPhone), choose the PDF from your files, pick a position and tap “Run tool”. The numbered PDF downloads straight to your phone — no app needed.',
      },
      {
        q: 'Can I add page numbers to a PDF without Adobe Acrobat?',
        a: 'Yes. This tool numbers pages right in your browser, for free. No Acrobat, no signup and no watermark on the output.',
      },
      {
        q: 'How do I add “Page 1 of 20” style numbering?',
        a: 'Choose the “Page 1 of 24” format. The total updates to your PDF’s real page count automatically. “1 / 24” is a shorter option.',
      },
      {
        q: 'Is my PDF uploaded anywhere?',
        a: 'No. The numbers are added on your own device, so private files like answer sheets or assignments never leave it.',
      },
    ],
    keywords: ['add page numbers to pdf', 'pdf page numbering online', 'number pdf pages free', 'add page no in pdf', 'page number to pdf online', 'add page numbers to pdf free'],
  },
  {
    slug: 'compress',
    name: 'Compress PDF',
    shortName: 'Compress',
    seoTitle: 'Compress PDF Online Free – Reduce PDF Size for WhatsApp',
    metaDescription:
      'Shrink big coaching PDFs by up to 80% so they send on WhatsApp, email and upload portals. Three strength levels. Free, private, no upload.',
    category: 'optimize',
    description: 'Shrink big PDFs so they send on WhatsApp, email or upload portals.',
    longDescription:
      'Coaching PDFs are often 50 MB+ per subject. Pick a strength: Lossless repacks the file without touching quality, Balanced and Strong re-render image-heavy pages at a lower resolution for big savings.',
    accept: 'pdf',
    multiple: false,
    options: [
      {
        type: 'select',
        name: 'level',
        label: 'Compression strength',
        default: 'balanced',
        choices: [
          { value: 'lossless', label: 'Lossless — small saving, text stays selectable' },
          { value: 'balanced', label: 'Balanced — big saving, good quality' },
          { value: 'strong', label: 'Strong — smallest file' },
        ],
      },
    ],
    benefits: [
      'Up to 80% smaller on image-heavy slides',
      'Shows before/after size',
      'Lossless mode keeps text selectable',
      'Browser-based — files stay on your device',
    ],
    steps: ['Choose your PDF.', 'Pick a compression strength.', 'Click “Run tool”.', 'Download the smaller file.'],
    faq: [
      {
        q: 'Which level should I choose?',
        a: 'Try Balanced first. If the file is still too big, use Strong. Use Lossless when you need to keep text selectable or the PDF is mostly text.',
      },
      {
        q: 'Why did my PDF barely shrink?',
        a: 'Text-only PDFs are already small. Balanced and Strong help most on scanned or image-heavy slides.',
      },
      {
        q: 'Can I compress a PDF for an exam application form (under 200 KB)?',
        a: 'For short documents, Strong usually gets well under 200 KB. If not, extract only the pages you need first.',
      },
    ],
    keywords: ['compress pdf online free', 'reduce pdf size', 'pdf size kam kaise kare', 'compress pdf for whatsapp'],
  },
  {
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG',
    shortName: 'PDF → JPG',
    seoTitle: 'PDF to JPG Converter Online Free – High Quality Images',
    metaDescription:
      'Convert every PDF page (or selected pages) to JPG or PNG images. Choose resolution, download as ZIP. Free, no upload, no watermark.',
    category: 'convert',
    description: 'Turn PDF pages into JPG or PNG images — for WhatsApp status, slides or flashcards.',
    longDescription:
      'Need one diagram as an image, or every page as a picture to scroll through on your phone? Convert pages to JPG or PNG at the resolution you choose.',
    accept: 'pdf',
    multiple: false,
    options: [
      {
        type: 'select',
        name: 'format',
        label: 'Image format',
        default: 'jpg',
        choices: [
          { value: 'jpg', label: 'JPG — smaller files' },
          { value: 'png', label: 'PNG — lossless' },
        ],
      },
      {
        type: 'select',
        name: 'dpi',
        label: 'Resolution',
        default: '150',
        choices: [
          { value: '100', label: '100 DPI — phone viewing' },
          { value: '150', label: '150 DPI — standard' },
          { value: '220', label: '220 DPI — print quality' },
        ],
      },
      PAGES_OPTION,
    ],
    benefits: ['JPG or PNG', 'Choose your resolution', 'Multiple pages download as one ZIP', 'Private — nothing uploaded'],
    steps: ['Choose your PDF.', 'Pick format, resolution and (optionally) pages.', 'Click “Run tool”.', 'Download the image or ZIP.'],
    faq: [
      {
        q: 'How do I convert only one page of a PDF to JPG?',
        a: 'Type the page number in the “Pages” box, e.g. 7. A single page downloads as an image rather than a ZIP.',
      },
    ],
    keywords: ['pdf to jpg', 'convert pdf to image', 'pdf to png online free'],
  },
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    shortName: 'Image → PDF',
    seoTitle: 'JPG to PDF Converter – Photos of Notes to PDF, Free',
    metaDescription:
      'Turn phone photos of handwritten notes, textbook pages or whiteboards into one clean PDF. JPG and PNG supported. Free, private, no upload.',
    category: 'convert',
    description: 'Combine photos of handwritten notes, textbook pages or whiteboards into one PDF.',
    longDescription:
      'Snap a chapter with your phone, choose the photos, and get one tidy A4 PDF back. Perfect for handwritten notes, textbook pages, or whiteboard captures.',
    accept: 'image',
    multiple: true,
    options: [
      {
        type: 'select',
        name: 'fit',
        label: 'Page size',
        default: 'a4',
        choices: [
          { value: 'a4', label: 'A4 with margins' },
          { value: 'original', label: 'Same as image' },
        ],
      },
    ],
    benefits: [
      'Turn phone photos into clean, shareable notes',
      'Auto-fit each image to A4 with margins',
      'Put images in order before converting',
      'Works offline once loaded',
    ],
    steps: ['Choose your images (JPG, PNG, WebP).', 'Arrange the order.', 'Click “Run tool”.', 'Download the PDF.'],
    faq: [
      {
        q: 'Will my photos be cropped?',
        a: 'No. Each image is fit inside the page with its aspect ratio preserved.',
      },
      {
        q: 'Can I convert iPhone (HEIC) photos?',
        a: 'Safari converts HEIC to JPG automatically when you pick photos. On other browsers, export as JPG first.',
      },
    ],
    keywords: ['image to pdf online free', 'jpg to pdf', 'photo to pdf converter'],
  },
] as const;

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
