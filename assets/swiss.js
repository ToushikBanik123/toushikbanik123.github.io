// ════════════════════════════════════════════════
// SWISS PORTFOLIO — SHARED INTERACTIONS
// ════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Mobile menu ──
  const hamburger = document.getElementById('swiss-hamburger');
  const mobileMenu = document.getElementById('swiss-mobile-menu');
  const mobileClose = document.getElementById('swiss-mobile-close');

  function openMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  // ── Contact popup — inject HTML ──
  // Single source of truth: the markup lives here and is stamped into every page.
  var popupContainer = document.createElement('div');
  popupContainer.innerHTML = '<div id="contact-popup" class="contact-popup-overlay" aria-hidden="true">'
    + '  <div class="contact-popup-panel" role="dialog" aria-label="Contact options">'
    + '    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:28px;">'
    + '      <div>'
    + '        <div class="t-label" style="color:var(--swiss-accent); margin-bottom:4px;">Get in touch</div>'
    + '        <div class="t-h3" style="margin:0;">Choose how to reach me</div>'
    + '      </div>'
    + '      <button id="contact-close" class="contact-popup-close" aria-label="Close">✕</button>'
    + '    </div>'
    + '    <div class="contact-popup-grid">'
    + '      <a href="https://www.linkedin.com/in/toushikbanik/" target="_blank" rel="noopener" class="contact-option">'
    + '        <div class="contact-option-icon">in</div>'
    + '        <div>'
    + '          <div class="t-label" style="margin-bottom:4px;">LinkedIn</div>'
    + '          <div style="font-weight:700; font-size:0.95rem;">linkedin.com/in/toushikbanik</div>'
    + '          <div style="font-size:0.82rem; opacity:0.6; margin-top:2px;">Message or connect</div>'
    + '        </div>'
    + '        <div class="contact-option-arrow">↗</div>'
    + '      </a>'
    + '      <a href="mailto:toushikbanikofficial@gmail.com" class="contact-option">'
    + '        <div class="contact-option-icon">@</div>'
    + '        <div>'
    + '          <div class="t-label" style="margin-bottom:4px;">Email</div>'
    + '          <div style="font-weight:700; font-size:0.95rem;">toushikbanikofficial@gmail.com</div>'
    + '          <div style="font-size:0.82rem; opacity:0.6; margin-top:2px;">Responds within 24h</div>'
    + '        </div>'
    + '        <div class="contact-option-arrow">→</div>'
    + '      </a>'
    + '      <a href="https://wa.me/919800515347" target="_blank" rel="noopener" class="contact-option">'
    + '        <div class="contact-option-icon">W</div>'
    + '        <div>'
    + '          <div class="t-label" style="margin-bottom:4px;">WhatsApp</div>'
    + '          <div style="font-weight:700; font-size:0.95rem;">+91 9800515347</div>'
    + '          <div style="font-size:0.82rem; opacity:0.6; margin-top:2px;">Quick messages welcome</div>'
    + '        </div>'
    + '        <div class="contact-option-arrow">↗</div>'
    + '      </a>'
    + '      <a href="tel:+919800515347" class="contact-option">'
    + '        <div class="contact-option-icon">☎</div>'
    + '        <div>'
    + '          <div class="t-label" style="margin-bottom:4px;">Call</div>'
    + '          <div style="font-weight:700; font-size:0.95rem;">+91 9800515347</div>'
    + '          <div style="font-size:0.82rem; opacity:0.6; margin-top:2px;">Delhi NCR / IST</div>'
    + '        </div>'
    + '        <div class="contact-option-arrow">→</div>'
    + '      </a>'
    + '    </div>'
    + '    <div style="margin-top:24px; padding-top:20px; border-top:1px solid rgba(0,0,0,0.1); display:flex; gap:24px; flex-wrap:wrap;">'
    + '      <a href="https://github.com/ToushikBanik123" target="_blank" rel="noopener" class="t-label" style="color:var(--swiss-accent); text-decoration:none;">GitHub ↗</a>'
    + '      <a href="https://leetcode.com/u/toushikbanikeducation/" target="_blank" rel="noopener" class="t-label" style="color:rgba(0,0,0,0.45); text-decoration:none;">LeetCode ↗</a>'
    + '      <a href="https://takeuforward.org/profile/Toushik" target="_blank" rel="noopener" class="t-label" style="color:rgba(0,0,0,0.45); text-decoration:none;">TakeUForward ↗</a>'
    + '    </div>'
    + '  </div>'
    + '</div>';
  document.body.appendChild(popupContainer.firstElementChild);

  // ── Contact popup — upgrade nav CTA anchor → button ──
  // On every page the nav CTA is either already a <button id="contact-trigger">
  // (index.html legacy) or an <a class="swiss-nav-cta"> (all other pages).
  // Normalise to a button so a single event listener path works everywhere.
  var navCta = document.querySelector('.swiss-nav-cta');
  if (navCta && navCta.tagName === 'A') {
    var triggerBtn = document.createElement('button');
    triggerBtn.id = 'contact-trigger';
    triggerBtn.className = navCta.className;
    triggerBtn.setAttribute('type', 'button');
    triggerBtn.setAttribute('aria-label', 'Open contact options');
    triggerBtn.innerHTML = navCta.innerHTML;
    navCta.parentNode.replaceChild(triggerBtn, navCta);
  } else if (navCta && navCta.tagName === 'BUTTON') {
    // Already a button (index.html); just ensure it has the right id.
    navCta.id = 'contact-trigger';
  }

  // ── Contact popup — wire listeners ──
  var contactTrigger = document.getElementById('contact-trigger');
  var contactPopup   = document.getElementById('contact-popup');
  var contactClose   = document.getElementById('contact-close');

  function openContactPopup() {
    contactPopup.classList.add('open');
    contactPopup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeContactPopup() {
    contactPopup.classList.remove('open');
    contactPopup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (contactTrigger) contactTrigger.addEventListener('click', openContactPopup);
  if (contactClose)   contactClose.addEventListener('click', closeContactPopup);
  if (contactPopup) {
    contactPopup.addEventListener('click', function (e) {
      if (e.target === contactPopup) closeContactPopup();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeContactPopup();
  });

  // ── Intercept ALL contact-intent clicks site-wide ──
  // Catches: mailto: links, [data-open-contact] buttons, and any anchor/button
  // whose visible text contains "get in touch" or "contact".
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    // Skip the nav CTA (already handled above) and popup-internal links
    if (el.id === 'contact-trigger' || el.id === 'contact-close') return;
    if (el.closest('#contact-popup')) return;

    var isMailto = el.tagName === 'A' && (el.getAttribute('href') || '').indexOf('mailto:toushikbanikofficial') !== -1;
    var isTagged = el.hasAttribute('data-open-contact');
    var text = (el.textContent || '').trim().toLowerCase();
    var isContactText = text === 'get in touch' || text === '→ get in touch' || text === 'contact' || text === '→ contact';

    if (isMailto || isTagged || isContactText) {
      e.preventDefault();
      openContactPopup();
    }
  });

  // ── Email copy ──
  document.querySelectorAll('[data-copy-email]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var email = 'toushikbanikofficial@gmail.com';
      try {
        navigator.clipboard.writeText(email).then(function () {
          var original = btn.textContent;
          btn.textContent = '✓ COPIED';
          setTimeout(function () { btn.textContent = original; }, 1800);
        });
      } catch (_) {
        window.location.href = 'mailto:' + email;
      }
    });
  });

  // ── Mark current page in nav ──
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.swiss-nav-link, .swiss-mobile-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // ── Timeline Animation ──
  var timelineItems = document.querySelectorAll('.swiss-timeline-item');
  if (timelineItems.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    timelineItems.forEach(function (item) { observer.observe(item); });

    var timelineProgress = document.querySelector('.swiss-timeline-progress');
    if (timelineProgress) {
      window.addEventListener('scroll', function () {
        var timeline = document.querySelector('.swiss-timeline');
        var rect = timeline.getBoundingClientRect();
        var windowHeight = window.innerHeight;

        // Start filling when top of timeline enters middle of screen
        var startFill = windowHeight * 0.75;
        var progress = (startFill - rect.top) / rect.height;
        progress = Math.max(0, Math.min(1, progress));

        timelineProgress.style.transform = 'scaleY(' + progress + ')';
      });
    }
  }
})();
