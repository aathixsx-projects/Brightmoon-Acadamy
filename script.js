

const hero = document.querySelector(".bm-hero");

for (let i = 0; i < 15; i++) {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");

  bubble.style.left = Math.random() * 100 + "%";
  bubble.style.animationDuration = (3 + Math.random() * 5) + "s";

  hero.appendChild(bubble);
}

document.addEventListener("mousemove", (e) => {
  const kids = document.querySelectorAll(".kid");

  kids.forEach((kid, index) => {
    const speed = (index + 1) * 0.02;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;

    kid.style.transform = `translate(${x}px, ${y}px)`;
  });
});


/* 
JavaScript Document

TemplateMo 613 Frost Bakery

https://templatemo.com/tm-613-frost-bakery

*/

    (function () {
      'use strict';

      /* -------------------------------------------
         Mobile Menu Toggle
         ------------------------------------------- */
      const hamburger   = document.getElementById('hamburger');
      const sidebar     = document.getElementById('sidebar');
      const overlay     = document.getElementById('sidebarOverlay');
      const navLinks    = sidebar.querySelectorAll('.bm-sidebar__nav a');

      function openMenu() {
        sidebar.classList.add('is-open');
        overlay.style.display = 'block';
        hamburger.classList.add('is-active');
        hamburger.setAttribute('aria-expanded', 'true');
        // Trigger reflow for transition
        requestAnimationFrame(function () {
          overlay.classList.add('is-visible');
        });
      }

      function closeMenu() {
        sidebar.classList.remove('is-open');
        overlay.classList.remove('is-visible');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        setTimeout(function () {
          overlay.style.display = 'none';
        }, 300);
      }

      hamburger.addEventListener('click', function () {
        if (sidebar.classList.contains('is-open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      overlay.addEventListener('click', closeMenu);

      // Close mobile menu when a nav link is clicked
      navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          if (window.innerWidth <= 1024) {
            closeMenu();
          }
        });
      });

      /* -------------------------------------------
         Active Navigation Highlighting on Scroll
         ------------------------------------------- */
      const sections = document.querySelectorAll('section[id]');

      function updateActiveNav() {
        var scrollY = window.scrollY + 120;

        sections.forEach(function (section) {
          var top    = section.offsetTop;
          var height = section.offsetHeight;
          var id     = section.getAttribute('id');

          if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
              }
            });
          }
        });
      }

      window.addEventListener('scroll', updateActiveNav, { passive: true });

      /* -------------------------------------------
         Scroll-Triggered Reveal Animations
         (IntersectionObserver)
         ------------------------------------------- */
      var revealElements = document.querySelectorAll('.reveal');

      if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
          revealObserver.observe(el);
        });
      } else {
        // Fallback: show all elements immediately
        revealElements.forEach(function (el) {
          el.classList.add('is-visible');
        });
      }

      /* -------------------------------------------
         Smooth Scroll for Sidebar Links
         (enhanced for offset with sidebar)
         ------------------------------------------- */
      document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
          var target = document.querySelector(this.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Set active class on click
            navLinks.forEach(function (link) {
              link.classList.remove('active');
            });
            this.classList.add('active');
          }
        });
      });

      /* -------------------------------------------
         Seasonal Tabs
         ------------------------------------------- */
      var seasonTabs   = document.querySelectorAll('.seasonal-tab');
      var seasonPanels = document.querySelectorAll('.seasonal-panel');

      seasonTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var season = this.getAttribute('data-season');

          // Update tabs
          seasonTabs.forEach(function (t) {
            t.classList.remove('is-active');
            t.setAttribute('aria-selected', 'false');
          });
          this.classList.add('is-active');
          this.setAttribute('aria-selected', 'true');

          // Update panels
          seasonPanels.forEach(function (panel) {
                      panel.classList.remove('is-active');
          });
          document.getElementById('panel-' + season).classList.add('is-active');
        });
      });

      /* -------------------------------------------
         ENROLLMENT MODAL FUNCTIONALITY
         ------------------------------------------- */
      const enrollmentModal = document.getElementById('enrollmentModal');
      const modalClose = document.getElementById('modalClose');
      const enrollmentForm = document.getElementById('enrollmentForm');
      const successMessage = document.getElementById('successMessage');
      const successCloseBtn = document.querySelector('.success-close-btn');
      const submitBtn = document.querySelector('.enroll-submit-btn');
      const submitBtnText = document.querySelector('.btn-text');
      const submitBtnLoading = document.querySelector('.btn-loading');

      // Get all enroll buttons
      const enrollButtons = document.querySelectorAll('a[href="#register"], .bm-sidebar__btn, .bm-btn--primary, .bm-btm--primary, .bm-btn');

      // Function to open modal
      function openModal() {
        enrollmentModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        // Reset form and hide success message
        enrollmentForm.style.display = 'block';
        successMessage.style.display = 'none';
        enrollmentForm.reset();
      }

      // Function to close modal
      function closeModal() {
        enrollmentModal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }

      // Add click event to all enroll buttons
      enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          // Prevent default behavior for buttons that link to #register
          if (this.getAttribute('href') === '#register') {
            e.preventDefault();
          }
          openModal();
        });
      });

      // Close modal events
      modalClose.addEventListener('click', closeModal);

      enrollmentModal.addEventListener('click', function(e) {
        if (e.target === enrollmentModal) {
          closeModal();
        }
      });

      // Close on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && enrollmentModal.classList.contains('show')) {
          closeModal();
        }
      });

      // Form submission
      enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        submitBtn.disabled = true;
        submitBtnText.style.display = 'none';
        submitBtnLoading.style.display = 'inline';

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
          // Hide form and show success message
          enrollmentForm.style.display = 'none';
          successMessage.style.display = 'block';

          // Reset button state
          submitBtn.disabled = false;
          submitBtnText.style.display = 'inline';
          submitBtnLoading.style.display = 'none';
        }, 2000); // Simulate 2 second processing time
      });

      // Success message close
      successCloseBtn.addEventListener('click', closeModal);

      /* -------------------------------------------
         CONTACT FORM FUNCTIONALITY
         ------------------------------------------- */
      const contactForm = document.getElementById('contactForm');
      const contactSuccess = document.getElementById('contactSuccess');
      const contactSubmitBtn = document.querySelector('.contact-submit-btn');
      const contactBtnText = contactSubmitBtn.querySelector('.btn-text');
      const contactBtnLoading = contactSubmitBtn.querySelector('.btn-loading');

      // Contact form submission
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        contactSubmitBtn.disabled = true;
        contactBtnText.style.display = 'none';
        contactBtnLoading.style.display = 'inline';

        // Simulate form submission
        setTimeout(() => {
          // Hide form and show success message
          contactForm.style.display = 'none';
          contactSuccess.style.display = 'block';

          // Reset button state
          contactSubmitBtn.disabled = false;
          contactBtnText.style.display = 'inline';
          contactBtnLoading.style.display = 'none';
        }, 2000);
      });

    })();