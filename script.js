/**
 * Rudraksha - Cybersecurity Portfolio
 * Typing effect, scroll reveal, navbar, progress bars, loader
 */

(function () {
  'use strict';

  // ----- Typing effect (hero) -----
  const taglines = [
    'Securing systems and finding vulnerabilities.',
    'Turning weaknesses into strengths.',
    'Offensive security meets defensive operations.',
  ];
  let taglineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedEl = document.getElementById('typed');
  const cursorEl = document.querySelector('.hero-tagline .cursor');
  const typeSpeed = 80;
  const deleteSpeed = 50;
  const pauseEnd = 2000;
  const pauseStart = 800;

  function type() {
    const current = taglines[taglineIndex];
    if (isDeleting) {
      if (charIndex <= 0) {
        isDeleting = false;
        taglineIndex = (taglineIndex + 1) % taglines.length;
        charIndex = 0;
        setTimeout(type, pauseStart);
        return;
      }
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      setTimeout(type, deleteSpeed);
    } else {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
      setTimeout(type, typeSpeed);
    }
  }

  function startTyping() {
    if (!typedEl) return;
    setTimeout(() => {
      type();
    }, 500);
  }

  // ----- Loader -----
  function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }
    startTyping();
  }
  window.addEventListener('load', () => {
    setTimeout(hideLoader, 800);
  });

  // ----- Navbar on scroll -----
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ----- Mobile menu -----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = document.querySelectorAll('.nav-links a');
  function toggleMenu() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }
  if (navToggle) navToggle.addEventListener('click', toggleMenu);
  navAnchors.forEach((a) => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) toggleMenu();
    });
  });

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ----- Scroll reveal -----
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, revealOptions);
  revealEls.forEach((el) => revealObserver.observe(el));

  // ----- Animated skill bars -----
  const skillFills = document.querySelectorAll('.skill-fill');
  const barOptions = { threshold: 0.5 };
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const fill = entry.target;
      const progress = fill.getAttribute('data-progress');
      if (progress) {
        fill.style.setProperty('--progress', progress + '%');
        fill.classList.add('animated');
      }
      barObserver.unobserve(fill);
    });
  }, barOptions);
  skillFills.forEach((el) => barObserver.observe(el));

  // ----- Contact form submits to Formspree (no JS needed) -----

  // ----- Footer year -----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
