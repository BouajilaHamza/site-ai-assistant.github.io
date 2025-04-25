// Add smooth scrolling for nav links and highlight active section

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
});
