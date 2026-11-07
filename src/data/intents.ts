/**
 * Search-intent landing pages (/<slug>/). One page per distinct way students
 * phrase the "dark notes → printable" problem. Each has the converter
 * embedded plus copy written for that phrasing — not keyword-swapped clones.
 */

export type Intent = {
  slug: string;
  lang: 'en-IN' | 'hi-IN';
  /** SERP title, ≤ 60 chars. */
  title: string;
  h1: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: readonly { h2: string; body: readonly string[] }[];
  faq: readonly { q: string; a: string }[];
  defaults?: Record<string, string | boolean>;
  /** Short label used when linking to this page. */
  linkText: string;
};

export const intents: readonly Intent[] = [
  {
    slug: 'black-background-pdf-to-white',
    lang: 'en-IN',
    title: 'Black Background PDF to White – Free Online Converter',
    h1: 'Convert a black-background PDF to white',
    description:
      'Turn black-background PDF notes into white pages with dark text, A4 and ready to print. Free, instant, works on phone, no upload or signup.',
    eyebrow: 'Black → white in seconds',
    linkText: 'Black background PDF to white',
    intro:
      'A PDF with a black background prints as a solid slab of toner. Converting it to a white background with dark text keeps every word and diagram, looks like a normal notebook page, and costs a fraction to print.',
    sections: [
      {
        h2: 'How the black-to-white conversion works',
        body: [
          'Each page is drawn at print resolution and its colours are flipped: black becomes white, white becomes black, and coloured ink shifts to its opposite shade so different colours stay different.',
          'Then a clean-up pass pushes the leftover dark-grey background to pure white. That step matters — most “invert” tools leave a grey haze that still eats toner.',
        ],
      },
      {
        h2: 'Mixed PDFs with some white pages',
        body: [
          'Coaching PDFs often mix black board pages with white question pages. In Auto mode each page is measured first and only dark pages are flipped, so white pages are never turned black by mistake.',
        ],
      },
    ],
    faq: [
      {
        q: 'How do I change a black PDF to white?',
        a: 'Choose the PDF in the converter on this page and click Convert. Dark pages become white with dark text and the new PDF downloads automatically.',
      },
      {
        q: 'Will white pages in the same PDF turn black?',
        a: 'Not in Auto mode — only pages that are mostly dark are inverted.',
      },
      {
        q: 'Is it free?',
        a: 'Yes, completely free with no signup, no watermark and no page limit.',
      },
    ],
  },
  {
    slug: 'invert-pdf-colors',
    lang: 'en-IN',
    title: 'Invert PDF Colors Online – Free, Print-Ready Output',
    h1: 'Invert PDF colours for printing',
    description:
      'Invert the colours of any PDF online: dark pages become light, with a cleaned pure-white background. Choose A4 output and pages per sheet. Free, private.',
    eyebrow: 'Colour inversion, done properly',
    linkText: 'Invert PDF colours',
    intro:
      'A plain colour inversion is easy; a printable one is not. This inverter flips the colours of dark pages, whitens the leftover grey, and lays the result out on A4 so it prints exactly as you expect.',
    sections: [
      {
        h2: 'Invert all pages, or only the dark ones',
        body: [
          'Pick “All pages” to invert everything, or keep “Auto” to invert only pages whose background is dark. Auto is what you want for coaching notes, where cover pages and question sheets are already white.',
        ],
      },
      {
        h2: 'Why not just use the printer’s “invert” option?',
        body: [
          'Most printers do not have one, and the PDF-viewer “night mode” options only change how the page looks on screen. To print light pages, the PDF itself has to be converted — which is what this tool does.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I invert only some pages?',
        a: 'Auto mode inverts only dark pages. To pick specific pages, first use Extract Pages or Organise PDF, then invert.',
      },
      {
        q: 'Does inverting reduce quality?',
        a: 'Pages are rendered at up to 220 DPI, which is sharper than most home printers need. Choose High quality for small text.',
      },
    ],
    defaults: { mode: 'all' },
  },
  {
    slug: 'dark-mode-pdf-to-light',
    lang: 'en-IN',
    title: 'Dark Mode PDF to Light (Normal) PDF – Free Converter',
    h1: 'Turn a dark-mode PDF into a normal, light PDF',
    description:
      'Convert dark-mode or night-mode PDFs back to a normal light theme for printing and reading. A4 output, keeps diagrams, free and fully in-browser.',
    eyebrow: 'Night mode → normal',
    linkText: 'Dark mode PDF to light',
    intro:
      'Notes made in dark mode — on a tablet app, a digital whiteboard or a dark slide theme — stay dark when exported. This converts them back to a normal light page so they print cleanly and read comfortably on paper.',
    sections: [
      {
        h2: 'Where dark-mode PDFs come from',
        body: [
          'Digital board recordings from coaching classes, note apps used in dark mode, dark PowerPoint themes, and screenshots of code editors. All of them export as dark pages.',
        ],
      },
      {
        h2: 'Reading vs printing',
        body: [
          'Dark mode is easier on the eyes at night on a screen. On paper it is the opposite: a black page is harder to annotate and uses far more ink. Keep the dark original for screen reading and print the light version.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I convert a dark-mode PDF on my phone?',
        a: 'Yes. Open this page in Chrome or Safari, choose the PDF from your downloads and convert.',
      },
      {
        q: 'Will the light version keep the same page order?',
        a: 'Yes — every page stays in its original order.',
      },
    ],
  },
  {
    slug: 'remove-black-background-from-pdf',
    lang: 'en-IN',
    title: 'Remove Black Background from PDF – Free, Keeps Text',
    h1: 'Remove the black background from a PDF',
    description:
      'Remove the black background from PDF notes and slides while keeping all text, handwriting and diagrams. Output is white, A4 and print-ready. Free.',
    eyebrow: 'Background removal for notes',
    linkText: 'Remove black background from PDF',
    intro:
      'You cannot simply “delete” the background from most note PDFs — the page is a picture of the board. What you can do is invert it and clean it, which removes the black background while keeping every stroke of writing.',
    sections: [
      {
        h2: 'What you get',
        body: [
          'A pure-white background, dark text and handwriting, and diagrams that stay readable. The page is fitted onto A4 so nothing is cut off when you print.',
        ],
      },
      {
        h2: 'Remove a black background from a PDF online, free',
        body: [
          'Choose the PDF above and download the cleaned version — that is all. Grey haze and smudges left after inverting are cleaned to pure white automatically, so the pages do not print grey. You can also erase header and footer strips (like coaching logos) in the editor before downloading.',
          'There is no page limit, no watermark and no signup, and the PDF never leaves your device.',
        ],
      },
    ],
    faq: [
      {
        q: 'How do I remove the black background from a PDF for free?',
        a: 'Open the PDF on this page. The black background is turned white and the writing dark, then you download the print-ready PDF. It is free, with no watermark.',
      },
      {
        q: 'Does removing the background delete any content?',
        a: 'No. Only the colours change — nothing on the page is removed.',
      },
      {
        q: 'Can I get a completely black-and-white result?',
        a: 'Yes, tick “Black & white output” to remove all colour as well.',
      },
    ],
    defaults: { grayscale: true },
  },
  {
    slug: 'change-pdf-background-color',
    lang: 'en-IN',
    title: 'Change PDF Background Color to White Online – Free',
    h1: 'Change a PDF’s background colour to white',
    description:
      'Change PDF background colour to white online for printing — black, navy, green or grey pages. Works on phone, A4 output, free, no signup, no upload.',
    eyebrow: 'Any dark background → white',
    linkText: 'Change PDF background colour',
    intro:
      'Navy, charcoal, deep green or pure black — if the background is dark, this converter turns it white and makes the writing dark, so the page prints like normal notes.',
    sections: [
      {
        h2: 'How to change the PDF background colour (3 steps)',
        body: [
          '1. Choose your PDF above — it opens on your device, nothing is uploaded. 2. Leave the mode on Auto: every dark page is detected and turned white, and pages that are already white are left alone. 3. Download the new PDF and print it at 100% scale.',
          'On a phone the steps are the same in Chrome or Safari. The whole PDF is processed in one go, so a 200-page module does not have to be done page by page.',
        ],
      },
      {
        h2: 'Which background colours it handles',
        body: [
          'Black, charcoal, dark grey, navy, dark blue, dark green and dark purple backgrounds all become white, and the text turns dark so it stays readable. Highlighted words and coloured diagrams keep a matching (lighter) colour unless you choose black & white output.',
        ],
      },
      {
        h2: 'Coloured but light backgrounds',
        body: [
          'If your background is a light colour (cream, pale blue) rather than dark, you do not need inversion. Use Grayscale PDF with “Whiten light backgrounds” instead — it turns pale backgrounds white without flipping the text.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I change the background to a colour other than white?',
        a: 'This tool is built for printing, so it always produces white. White is also the cheapest background to print.',
      },
      {
        q: 'How do I change a PDF background to white for printing?',
        a: 'Open the PDF in the converter on this page and download the result. Dark pages become white with dark text, fitted to A4, so the printer only uses ink for the writing.',
      },
      {
        q: 'Can I change the background colour of only some pages?',
        a: 'Yes. Auto mode only converts dark pages, and in the editor you can untick or invert individual pages before downloading.',
      },
      {
        q: 'Does it work on scanned or photographed PDFs?',
        a: 'Yes. Scans and phone photos are images, and the converter works on images — it turns the dark background white and keeps the writing.',
      },
    ],
  },
  {
    slug: 'convert-notes-to-a4-printable',
    lang: 'en-IN',
    title: 'Convert Notes PDF to A4 Printable Format – Free',
    h1: 'Convert notes to an A4 printable format',
    description:
      'Make any notes PDF A4 and print-ready: widescreen slides fitted to A4, dark pages turned white, 1–6 slides per sheet. Free, instant, private.',
    eyebrow: 'A4, print-ready',
    linkText: 'Convert notes to A4 printable',
    intro:
      'Coaching PDFs come in every size — widescreen 16:9 slides, tall phone screenshots, odd board exports. Printers and Xerox shops want A4. This converts your notes into proper A4 pages, turns dark pages white, and centres everything with clean margins.',
    sections: [
      {
        h2: 'A4 portrait or landscape — chosen automatically',
        body: [
          'For each layout the tool tries both A4 orientations and picks the one where your pages come out largest. Widescreen slides one-per-sheet go landscape; two-per-sheet go portrait, stacked.',
        ],
      },
      {
        h2: 'How many slides per A4 sheet?',
        body: [
          '1 per sheet for diagrams with small labels. 2 per sheet for board notes and slides — the best balance. 4 per sheet for revision. 6 per sheet for formula sheets and quick recap.',
        ],
      },
      {
        h2: 'Printing at a Xerox shop',
        body: [
          'Tell the shop to print at “actual size / 100%”. The file is already A4, so no scaling is needed and nothing gets cropped.',
        ],
      },
    ],
    faq: [
      {
        q: 'How do I convert a PDF to A4 size?',
        a: 'Choose the PDF in the converter on this page, keep Paper size set to A4 and click Convert. Every page is fitted and centred on A4.',
      },
      {
        q: 'My PDF is already white. Can I still make it A4?',
        a: 'Yes. Auto mode will not invert white pages; it just fits them onto A4.',
      },
      {
        q: 'Is A4 the same as “printable format”?',
        a: 'In India, yes — A4 (210 × 297 mm) is the standard paper for home printers and print shops.',
      },
    ],
    defaults: { paper: 'a4', perSheet: '2' },
  },
  {
    slug: 'print-notes-without-wasting-ink',
    lang: 'en-IN',
    title: 'Print Notes Without Wasting Ink – Save 60% (Free Tool)',
    h1: 'Print your notes without wasting ink',
    description:
      'Cut printer ink use by up to 60% on coaching notes: convert dark pages to white, print 2–4 slides per A4 sheet, go black & white. Free tool, no upload.',
    eyebrow: 'Ink saver for students',
    linkText: 'Print notes without wasting ink',
    intro:
      'Three changes make the biggest difference to your printing bill: stop printing black backgrounds, stop printing one slide per sheet, and stop using colour ink for notes. This converter does all three in one step.',
    sections: [
      {
        h2: 'The three biggest savings',
        body: [
          '1. Dark → light: a black page covers nearly all of the sheet in toner; the converted page prints only the writing.',
          '2. Slides per sheet: 2 per sheet halves paper, 4 per sheet quarters it.',
          '3. Black & white: stops your printer quietly mixing colour ink into dark greys.',
        ],
      },
      {
        h2: 'Printer settings that help too',
        body: [
          'Use “Draft” or “Eco” mode for practice prints, print double-sided, and keep “Grayscale” selected in the printer dialog for notes.',
        ],
      },
    ],
    faq: [
      {
        q: 'How much money can I save?',
        a: 'It depends on your printer, but students printing a few hundred dark pages a month typically cut ink and paper costs by more than half. Try the ink calculator on the home page for your own numbers.',
      },
    ],
    defaults: { perSheet: '2', grayscale: true },
  },
  {
    slug: 'handwritten-board-notes-black-to-white',
    lang: 'en-IN',
    title: 'Blackboard Notes PDF to White Paper – Free Converter',
    h1: 'Turn blackboard-style notes into white-paper notes',
    description:
      'Convert handwritten digital blackboard notes (white chalk on black) into dark writing on white paper, A4 and printable. Free for JEE & NEET students.',
    eyebrow: 'Chalk-on-black → pen-on-paper',
    linkText: 'Blackboard notes to white',
    intro:
      'Many online teachers write on a digital blackboard: white and coloured strokes on black. Converted, those pages look like neat handwritten notes on white paper — easy to annotate, highlight and file.',
    sections: [
      {
        h2: 'Keeping coloured pens distinct',
        body: [
          'Teachers use yellow for formulas, pink for warnings, blue for examples. After conversion the colours shift to their opposites but stay distinct. Prefer pure black writing? Tick “Black & white output”.',
        ],
      },
    ],
    faq: [
      {
        q: 'Will thin handwriting stay visible?',
        a: 'Yes. Choose High quality if strokes are very thin — it renders at 220 DPI.',
      },
    ],
    defaults: { perSheet: '2' },
  },
  {
    slug: 'negative-pdf-to-positive',
    lang: 'en-IN',
    title: 'Negative PDF to Positive – Convert Online Free',
    h1: 'Convert a negative-looking PDF to positive',
    description:
      'Flip a “negative” PDF (light text on dark) back to positive (dark text on light) for reading and printing. Free, fast, private, A4 output.',
    eyebrow: 'Negative → positive',
    linkText: 'Negative PDF to positive',
    intro:
      'Scans made with the wrong setting, dark exports and some photocopies come out looking like film negatives. Flip them back to positive in one click.',
    sections: [
      {
        h2: 'Scanned negatives',
        body: [
          'Choose “All pages” so every page is flipped, even if some look only partly dark. Tick “Black & white output” for scanned text for the crispest result.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I undo the conversion?',
        a: 'Your original file is never changed. The converted copy downloads as a new file.',
      },
    ],
    defaults: { mode: 'all', grayscale: true },
  },
  {
    slug: 'pdf-background-white-kaise-kare',
    lang: 'hi-IN',
    title: 'PDF का Background White कैसे करें – Free (Black to White)',
    h1: 'PDF ka black background white kaise kare?',
    description:
      'PW, Unacademy ke black background notes ko white A4 printable PDF me badlein — free, bina signup, file upload nahi hoti. 60% tak ink bachayein.',
    eyebrow: 'Hindi / Hinglish guide',
    linkText: 'PDF background white kaise kare',
    intro:
      'Coaching ke notes aksar kaale (black) background par hote hain — phone par achhe lagte hain, lekin print karne par poora cartridge khatam ho jata hai. Is page par diye gaye tool se aap notes ko white background aur kaale text wale A4 PDF me badal sakte hain. Sab kuch aapke browser me hota hai — file kahin upload nahi hoti.',
    sections: [
      {
        h2: 'पीडीएफ का बैकग्राउंड सफेद कैसे करें (Step by step)',
        body: [
          '1. Upar “Choose PDF” par click karke apni notes PDF chunein.',
          '2. “Auto” mode rehne dein — sirf kaale pages hi white honge.',
          '3. Paper size A4 rakhein, aur chahein to 2 slides per sheet chunein.',
          '4. “Convert to white PDF” dabayein — nayi PDF apne aap download ho jayegi.',
        ],
      },
      {
        h2: 'Print karte waqt ink kaise bachayein',
        body: [
          'Black & white output chunein, 2 ya 4 slides ek page par print karein, aur Xerox shop par “100% / actual size” bolein.',
        ],
      },
    ],
    faq: [
      {
        q: 'Kya ye tool free hai?',
        a: 'Haan, bilkul free hai — na signup, na watermark, na page limit.',
      },
      {
        q: 'Kya meri PDF kisi server par upload hoti hai?',
        a: 'Nahi. Conversion aapke phone ya laptop ke browser me hi hota hai.',
      },
      {
        q: 'Mobile par chalega?',
        a: 'Haan, Android par Chrome aur iPhone par Safari me chalta hai.',
      },
    ],
    defaults: { perSheet: '2' },
  },
  {
    slug: 'notes-print-karne-ka-tarika',
    lang: 'hi-IN',
    title: 'Coaching Notes Print Kaise Kare – Kam Ink Me (Free)',
    h1: 'Coaching notes kam kharche me print kaise kare',
    description:
      'PW, Unacademy, Allen ke notes ko kam ink aur kam kagaz me print karne ka tarika: black se white, A4, 2–4 slides per page. Free online tool.',
    eyebrow: 'Hinglish guide',
    linkText: 'Notes print karne ka tarika',
    intro:
      'Ek chapter ke 100 kaale pages print karwana mehenga padta hai. Teen cheezein karein: pages ko white karein, ek A4 page par 2–4 slides lagayein, aur black & white print karein. Niche diya tool teeno kaam ek saath karta hai.',
    sections: [
      {
        h2: 'Kitna bachega?',
        body: [
          '2 slides per sheet se kagaz aadha lagta hai, 4 per sheet se ek-chauthai. White background se ink sabse zyada bachti hai — aksar aadhe se bhi zyada.',
        ],
      },
    ],
    faq: [
      {
        q: 'Xerox shop par kya bolein?',
        a: 'Converted PDF bhejein aur “A4, black & white, 100% size” print karne ko kahein.',
      },
    ],
    defaults: { perSheet: '4', grayscale: true },
  },
];

export function getIntent(slug: string): Intent | undefined {
  return intents.find((i) => i.slug === slug);
}
