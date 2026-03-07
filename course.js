/* =============================================
   LocEssentials Course — course.js
   Handles: language toggle, nav rendering,
   Markdown fetch + render via marked.js,
   dynamic <title> + <meta> per lesson
   ============================================= */

(function () {
  'use strict';

  let courseData  = null;
  let currentLang = 'eng-usa';
  let currentUrl  = null;

  let mainEl, contentEl, lessonsNav, mainLinksNav, lessonsTitleEl;

  // ================================================
  // Init
  // ================================================
  document.addEventListener('DOMContentLoaded', async () => {
    mainEl         = document.getElementById('main');
    document.getElementById('course-number').textContent = '';
    document.getElementById('course-title').textContent  = '';
    contentEl      = document.getElementById('content');
    lessonsNav     = document.getElementById('lessons-nav');
    mainLinksNav   = document.getElementById('main-links-nav');
    lessonsTitleEl = document.getElementById('lessons-title');

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => switchLang(btn.dataset.lang));
    });

    const saved = localStorage.getItem('locessentials-lang');
    if (saved && (saved === 'eng-usa' || saved === 'esp-mex')) currentLang = saved;

    try {
      const res = await fetch('course.json');
      courseData = await res.json();
    } catch (e) {
      showError('Could not load course.json. Make sure you are running this on a server.');
      return;
    }

    renderNav();
    updateLangButtons();

    const hash = window.location.hash.slice(1);
    const urlToLoad = hash ? decodeURI(hash) : courseData[currentLang].lessons[0].url;
    loadPage(urlToLoad);
  });

  // ================================================
  // Language Switch
  // ================================================
  function switchLang(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('locessentials-lang', lang);
    updateLangButtons();
    renderNav();
    const equivalentUrl = findEquivalentUrl(currentUrl, lang);
    loadPage(equivalentUrl || courseData[lang].lessons[0].url);
  }

  function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === currentLang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
    document.documentElement.lang = currentLang === 'esp-mex' ? 'es-MX' : 'en-US';
  }

  function findEquivalentUrl(url, lang) {
    if (!url || !courseData) return null;
    const prevLang = currentLang === 'eng-usa' ? 'esp-mex' : 'eng-usa';
    const prevLessons = courseData[prevLang].lessons;
    const newLessons  = courseData[lang].lessons;
    const li = prevLessons.findIndex(l => l.url === url);
    if (li >= 0 && newLessons[li]) return newLessons[li].url;
    const prevLinks = courseData[prevLang].mainLinks;
    const newLinks  = courseData[lang].mainLinks;
    const mi = prevLinks.findIndex(l => l.url === url);
    if (mi >= 0 && newLinks[mi]) return newLinks[mi].url;
    return null;
  }

  // ================================================
  // Render Navigation
  // ================================================
  function renderNav() {
    const data = courseData[currentLang];
    lessonsTitleEl.textContent = data.lessonsTitle;

    // Course title block
    const numEl   = document.getElementById('course-number');
    const titleEl = document.getElementById('course-title');
    if (numEl)   numEl.textContent   = data.courseNumber || '';
    if (titleEl) titleEl.textContent = data.courseTitle  || '';

    mainLinksNav.innerHTML = '';
    data.mainLinks.forEach(link => {
      const a = document.createElement('a');
      a.className = 'nav-link' + (link.url === currentUrl ? ' active' : '');
      a.innerHTML = '<span class="nav-icon">' + link.icon + '</span>' + link.label;
      a.href = '#' + encodeURI(link.url);
      a.addEventListener('click', e => { e.preventDefault(); loadPage(link.url); });
      mainLinksNav.appendChild(a);
    });

    lessonsNav.innerHTML = '';
    data.lessons.forEach(lesson => {
      const a = document.createElement('a');
      a.className = 'lesson-link' + (lesson.url === currentUrl ? ' active' : '');
      a.href = '#' + encodeURI(lesson.url);
      a.innerHTML =
        '<span class="lesson-number">' + lesson.number + '</span>' +
        '<span class="lesson-title">' + lesson.title + '</span>';
      a.addEventListener('click', e => { e.preventDefault(); loadPage(lesson.url); });
      lessonsNav.appendChild(a);
    });
  }

  // ================================================
  // Update <title> and <meta> tags dynamically
  // ================================================
  function updatePageMeta(url) {
    const data   = courseData[currentLang];
    const lesson = data.lessons.find(l => l.url === url)
                || data.mainLinks.find(l => l.url === url);

    if (lesson) {
      document.title = lesson.title + ' — ' + data.siteName;
      setMeta('name',     'description', lesson.description  || data.siteDescription);
      setMeta('name',     'keywords',    lesson.focusKeyword || '');
      setMeta('property', 'og:title',       lesson.title + ' — ' + data.siteName);
      setMeta('property', 'og:description', lesson.description || data.siteDescription);
      setMeta('property', 'og:url',         window.location.href);
      setOrCreateCanonical(window.location.href);
    } else {
      document.title = data.siteName;
      setMeta('name', 'description', data.siteDescription);
    }
  }

  function setMeta(attrName, attrValue, content) {
    let el = document.querySelector('meta[' + attrName + '="' + attrValue + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setOrCreateCanonical(href) {
    let el = document.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  // ================================================
  // Load & Render a Page
  // ================================================
  async function loadPage(url) {
    currentUrl = url;
    window.history.replaceState(null, '', '#' + encodeURI(url));
    updatePageMeta(url);

    document.querySelectorAll('.nav-link, .lesson-link').forEach(el => {
      el.classList.remove('active');
      const href = decodeURI((el.getAttribute('href') || '').slice(1));
      if (href === url) el.classList.add('active');
    });

    mainEl.classList.add('loading');
    contentEl.innerHTML = '<div class="spinner"></div>';

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const markdown = await res.text();
      renderMarkdown(markdown);
    } catch (e) {
      showError('Could not load <code>' + url + '</code>.<br>If running locally, use <code>npx serve .</code> or <code>python3 -m http.server 8000</code>');
    } finally {
      mainEl.classList.remove('loading');
    }
  }

  // ================================================
  // Markdown Rendering
  // ================================================
  function renderMarkdown(markdown) {
    if (typeof marked === 'undefined') {
      contentEl.innerHTML = '<div class="error-message">marked.js failed to load.</div>';
      return;
    }
    marked.setOptions({ breaks: true, gfm: true });
    contentEl.innerHTML = marked.parse(markdown);

    // Open all external links in a new tab
    contentEl.querySelectorAll('a[href^="http"]').forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });

    window.scrollTo(0, 0);
  }

  function showError(message) {
    mainEl.classList.remove('loading');
    contentEl.innerHTML = '<div class="error-message">⚠️ ' + message + '</div>';
  }

})();