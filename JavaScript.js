(() => {
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function safeURL(value) {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : '#'; }
    catch { return '#'; }
  }


  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    formStatus.textContent = '';
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const email = document.getElementById('contact-email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.setCustomValidity('Please enter a valid email address.');
      email.reportValidity();
      email.setCustomValidity('');
      return;
    }
    formStatus.textContent = 'Thank you! Your form passed validation. This demo does not send messages to a server.';
    form.reset();
  });

  // Keep navigation links working and highlight the section currently being viewed.
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', link.getAttribute('href'));
      }
    });
  });
  const sections = [...document.querySelectorAll('main section[id]')];
  const updateActiveNav = () => {
    let current = sections[0]?.id || 'home';
    sections.forEach(section => { if (window.scrollY + 130 >= section.offsetTop) current = section.id; });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // Make every skill pill clickable/tappable and keyboard accessible.
  const skillStatus = document.getElementById('skill-status');
  const skillDescriptions = {
    'Microsoft Word': 'Microsoft Word: creating and formatting documents.',
    'Microsoft Excel': 'Microsoft Excel: organizing information in spreadsheets.',
    'Microsoft PowerPoint': 'Microsoft PowerPoint: creating presentation slides.',
    'Hardworking': 'Hardworking: putting effort into tasks and responsibilities.',
    'Willingness to Learn': 'Willingness to Learn: being open to new knowledge and skills.',
    'Teamwork': 'Teamwork: cooperating and working well with others.',
    'Time Management': 'Time Management: organizing tasks and using time wisely.',
    'HTML': 'HTML: structuring the content of web pages.',
    'CSS': 'CSS: styling and designing web pages.',
    'JavaScript': 'JavaScript: adding interactive behavior to websites.',
    'MySQL': 'MySQL: working with relational databases and SQL queries.',
    'GitHub': 'GitHub: storing and managing code projects online.'
  };
  document.querySelectorAll('[data-skill]').forEach(skill => {
    const showSkill = () => {
      skillStatus.textContent = skillDescriptions[skill.dataset.skill] || skill.dataset.skill;
      skillStatus.classList.add('visible');
    };
    skill.addEventListener('click', showSkill);
    skill.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showSkill(); }
    });
  });

  const topButton = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => topButton.classList.toggle('visible', window.scrollY > 300));
  topButton.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
})();

(() => {
      const profile = document.querySelector('.clickable-profile');
      const lightbox = document.getElementById('profileLightbox');
      const enlarged = document.getElementById('enlargedProfile');
      const close = lightbox.querySelector('.close-lightbox');
      function openProfile() { enlarged.src = profile.src; lightbox.classList.add('open'); }
      function closeProfile() { lightbox.classList.remove('open'); enlarged.removeAttribute('src'); }
      profile.addEventListener('click', openProfile);
      profile.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProfile(); } });
      close.addEventListener('click', event => { event.stopPropagation(); closeProfile(); });
      lightbox.addEventListener('click', event => { if (event.target === lightbox) closeProfile(); });
      document.addEventListener('keydown', event => { if (event.key === 'Escape') closeProfile(); });
    })();
