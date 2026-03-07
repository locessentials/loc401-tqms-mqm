#!/usr/bin/env node
/* =============================================
   LocEssentials — build.js
   Pre-renders Markdown lessons to static HTML
   Generates sitemap.xml for search crawlers
   Run: node build.js
   ============================================= */

const fs   = require('fs');
const path = require('path');
const { marked } = require('marked');

const BASE_URL   = 'https://loc401.locessentials.com';
const COURSE_JSON = path.join(__dirname, 'course.json');
const SHELL_HTML  = path.join(__dirname, 'index.html');
const OUT_DIR     = path.join(__dirname, '_static');

// ------------------------------------------------
// Load course data
// ------------------------------------------------
const courseData = JSON.parse(fs.readFileSync(COURSE_JSON, 'utf8'));
const shellHtml  = fs.readFileSync(SHELL_HTML, 'utf8');

// ------------------------------------------------
// Ensure output directory exists
// ------------------------------------------------
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ------------------------------------------------
// Read shell and extract head/body wrapper
// ------------------------------------------------
function buildStaticPage(lang, lesson, contentHtml) {
  const data = courseData[lang];

  // Build sidebar HTML for this page
  const mainLinksHtml = data.mainLinks.map(link =>
    `<a class="nav-link${link.url === lesson.url ? ' active' : ''}" href="${link.url}">
      <span class="nav-icon">${link.icon}</span>${link.label}
    </a>`
  ).join('\n');

  const lessonsHtml = data.lessons.map(l =>
    `<a class="lesson-link${l.url === lesson.url ? ' active' : ''}" href="${l.url}">
      <span class="lesson-number">${l.number}</span>
      <span class="lesson-title">${l.title}</span>
    </a>`
  ).join('\n');

  const htmlLang = lang === 'esp-mex' ? 'es-MX' : 'en-US';
  const pageTitle = `${lesson.title} — ${data.siteName}`;
  const canonicalUrl = `${BASE_URL}/${lesson.url}`;

  return `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(lesson.description || data.siteDescription)}" />
  <meta name="keywords" content="${escapeHtml(lesson.focusKeyword || '')}" />
  <meta property="og:title" content="${escapeHtml(pageTitle)}" />
  <meta property="og:description" content="${escapeHtml(lesson.description || data.siteDescription)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:type" content="article" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.6/marked.min.js"></script>
  <link rel="stylesheet" href="/course.css" />
</head>
<body>
  <header id="topbar">
    <a id="topbar-logo" href="/">
      <img src="/assets/logo-tilted.png"
           alt="LocEssentials logo — two-toned blue baseball cap with LOC in white lettering"
           onerror="this.style.display='none'" />
      <span class="logo-text">LocEssentials</span>
    </a>
    <div id="topbar-right">
      <div id="lang-toggle" role="group" aria-label="Language selection">
        <button class="lang-btn${lang === 'eng-usa' ? ' active' : ''}" data-lang="eng-usa" aria-pressed="${lang === 'eng-usa'}">eng-usa</button>
        <button class="lang-btn${lang === 'esp-mex' ? ' active' : ''}" data-lang="esp-mex" aria-pressed="${lang === 'esp-mex'}">esp-mex</button>
      </div>
    </div>
  </header>

  <nav id="sidebar" aria-label="Course navigation">
    <p class="sidebar-section-label">Navigation</p>
    <div id="main-links-nav">${mainLinksHtml}</div>
    <div class="sidebar-divider"></div>
    <p class="sidebar-section-label" id="lessons-title">${data.lessonsTitle}</p>
    <div id="lessons-nav">${lessonsHtml}</div>
  </nav>

  <main id="main">
    <div id="content">
      ${contentHtml}
    </div>
  </main>

  <script src="/course.js"></script>
</body>
</html>`;
}

// ------------------------------------------------
// Escape HTML entities for meta attributes
// ------------------------------------------------
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ------------------------------------------------
// Build all lessons for both languages
// ------------------------------------------------
const sitemapUrls = [];
let builtCount = 0;
let errorCount  = 0;

['eng-usa', 'esp-mex'].forEach(lang => {
  const data = courseData[lang];

  data.lessons.forEach(lesson => {
    const mdPath = path.join(__dirname, lesson.url);

    if (!fs.existsSync(mdPath)) {
      console.warn(`  [SKIP] ${lesson.url} — file not found`);
      return;
    }

    try {
      const markdown    = fs.readFileSync(mdPath, 'utf8');
      const contentHtml = marked.parse(markdown);
      const pageHtml    = buildStaticPage(lang, lesson, contentHtml);

      // Mirror the source path under _static/
      const outPath = path.join(OUT_DIR, lesson.url);
      const outDir  = path.dirname(outPath);
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

      // Write .html alongside the .md path
      const htmlOutPath = outPath.replace(/\.md$/, '.html');
      fs.writeFileSync(htmlOutPath, pageHtml, 'utf8');

      console.log(`  [OK]   ${htmlOutPath.replace(__dirname, '')}`);
      sitemapUrls.push(`${BASE_URL}/${lesson.url.replace(/\.md$/, '.html')}`);
      builtCount++;
    } catch (err) {
      console.error(`  [ERR]  ${lesson.url} — ${err.message}`);
      errorCount++;
    }
  });
});

// ------------------------------------------------
// Generate sitemap.xml
// ------------------------------------------------
const today = new Date().toISOString().split('T')[0];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
${sitemapUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('\n  [OK]   sitemap.xml');

// ------------------------------------------------
// Summary
// ------------------------------------------------
console.log(`\n  Build complete — ${builtCount} pages built, ${errorCount} errors.\n`);
