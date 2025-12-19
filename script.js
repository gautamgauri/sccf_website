(function () {
    'use strict';

    function smoothScrollTo(targetSelector) {
        if (!targetSelector) return;
        var target = document.querySelector(targetSelector);
        if (!target) return;
        try {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (e) {
            target.scrollIntoView();
        }
    }

    function setupNavScrollButtons() {
        var buttons = document.querySelectorAll('[data-scroll-target]');
        if (!buttons) return;
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                var target = e.currentTarget.getAttribute('data-scroll-target');
                smoothScrollTo(target);
                var mobileMenu = document.getElementById('navbar-links-mobile');
                var toggle = document.querySelector('.navbar-toggle');
                if (mobileMenu && toggle && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenu.setAttribute('hidden', '');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    function setupMobileNav() {
        var toggle = document.querySelector('.navbar-toggle');
        var mobileMenu = document.getElementById('navbar-links-mobile');
        if (!toggle || !mobileMenu) return;
        toggle.addEventListener('click', function () {
            var isActive = mobileMenu.classList.toggle('active');
            if (isActive) {
                mobileMenu.removeAttribute('hidden');
            } else {
                mobileMenu.setAttribute('hidden', '');
            }
            toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    }

    function setupOncoTalksCard() {
        var thumb = document.querySelector('.onco-video-thumb');
        if (!thumb) return;
        var link = thumb.getAttribute('data-youtube-link');
        if (!link) return;
        function openLink() {
            window.open(link, '_blank', 'noopener');
        }
        thumb.addEventListener('click', function () {
            openLink();
        });
        thumb.addEventListener('keypress', function (e) {
            var key = e.key || e.keyCode;
            if (key === 'Enter' || key === 13 || key === ' ') {
                e.preventDefault();
                openLink();
            }
        });
    }

    function setupContactForm() {
        var form = document.getElementById('contact-form');
        if (!form) return;
        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var messageInput = document.getElementById('message');
        var nameError = document.getElementById('name-error');
        var emailError = document.getElementById('email-error');
        var messageError = document.getElementById('message-error');
        var successEl = document.getElementById('form-success');

        function clearErrors() {
            if (nameError) nameError.textContent = '';
            if (emailError) emailError.textContent = '';
            if (messageError) messageError.textContent = '';
            if (successEl) successEl.textContent = '';
            if (nameInput) nameInput.classList.remove('error');
            if (emailInput) emailInput.classList.remove('error');
            if (messageInput) messageInput.classList.remove('error');
        }

        function validateEmail(value) {
            if (!value) return false;
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(value).toLowerCase());
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();
            var hasError = false;

            if (nameInput && !nameInput.value.trim()) {
                hasError = true;
                if (nameError) nameError.textContent = 'Please enter your name.';
                nameInput.classList.add('error');
            }

            if (emailInput) {
                var emailVal = emailInput.value.trim();
                if (!emailVal) {
                    hasError = true;
                    if (emailError) emailError.textContent = 'Please enter your email.';
                    emailInput.classList.add('error');
                } else if (!validateEmail(emailVal)) {
                    hasError = true;
                    if (emailError) emailError.textContent = 'Please enter a valid email address.';
                    emailInput.classList.add('error');
                }
            }

            if (messageInput && !messageInput.value.trim()) {
                hasError = true;
                if (messageError) messageError.textContent = 'Please share a brief message so we can understand your query.';
                messageInput.classList.add('error');
            }

            if (hasError) return;

            form.reset();
            if (successEl) {
                successEl.textContent = 'Thank you for reaching out. SCCF will review your message and respond by email where possible.';
            }
        });
    }

    // New menu functionality
    function setupNewMenu() {
        const toggle = document.querySelector(".sccf-nav-toggle");
        const panel = document.getElementById("sccf-nav-panel");
        const backdrop = document.getElementById("sccf-nav-backdrop");

        if (!toggle || !panel || !backdrop) return;

        const body = document.body;

        function openMenu() {
            toggle.setAttribute("aria-expanded", "true");
            toggle.setAttribute("aria-label", "Close main menu");
            panel.hidden = false;
            backdrop.hidden = false;
            panel.classList.add("is-open");
            backdrop.classList.add("is-open");
            body.style.overflow = "hidden";
        }

        function closeMenu() {
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open main menu");
            panel.classList.remove("is-open");
            backdrop.classList.remove("is-open");
            body.style.overflow = "";
            window.setTimeout(function() {
                panel.hidden = true;
                backdrop.hidden = true;
            }, 220);
        }

        function isOpen() {
            return toggle.getAttribute("aria-expanded") === "true";
        }

        toggle.addEventListener("click", function() {
            if (isOpen()) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        backdrop.addEventListener("click", function() {
            if (isOpen()) closeMenu();
        });

        window.addEventListener("keydown", function(event) {
            if (event.key === "Escape" && isOpen()) {
                closeMenu();
            }
        });

        panel.addEventListener("click", function(event) {
            const link = event.target.closest("a");
            if (!link) return;
            closeMenu();
        });
    }

    // Enhanced smooth scroll for new menu links
    function setupNewMenuScroll() {
        // Handle all nav links (both desktop and mobile)
        var navLinks = document.querySelectorAll('.sccf-nav-link, .sccf-nav-panel-item a, .sccf-nav-cta-chip');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    var targetSelector = href;
                    smoothScrollTo(targetSelector);
                    
                    // Close mobile menu if open
                    var panel = document.getElementById('sccf-nav-panel');
                    var toggle = document.querySelector('.sccf-nav-toggle');
                    if (panel && toggle && toggle.getAttribute('aria-expanded') === 'true') {
                        toggle.click();
                    }
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        setupNavScrollButtons();
        setupMobileNav();
        setupOncoTalksCard();
        setupContactForm();
        setupNewMenu();
        setupNewMenuScroll();
    });
})();
