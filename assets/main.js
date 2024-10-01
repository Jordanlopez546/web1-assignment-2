document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sideNav = document.getElementById('sideNav');
  const content = document.querySelector('.content');

  mobileMenuBtn.addEventListener('click', function() {
    sideNav.classList.toggle('active');
  });

  document.addEventListener('click', function(event) {
    if (!sideNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
      sideNav.classList.remove('active');
    }
  });

  const topics = document.querySelectorAll('.topic');
  topics.forEach(topic => {
    topic.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');

      history.pushState(null, '', targetId);

      document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
      });
      document.querySelector(targetId).style.display = 'block';

      content.scrollTop = 0;

      if (window.innerWidth <= 768) {
        sideNav.classList.remove('active');
      }
    });
  });

  document.querySelectorAll('.topic-container').forEach(container => {
    container.addEventListener('click', function(event) {
      const link = this.querySelector('a');
      if (link) {
        event.preventDefault();
        link.click();
      }
    });
  });

  window.addEventListener('popstate', function() {
    const targetId = window.location.hash;
    if (targetId) {
      document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
      });
      document.querySelector(targetId).style.display = 'block';
      content.scrollTop = 0;
    }
  });

  document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const pre = button.closest('pre');
      const code = pre.querySelector('code');
      const textToCopy = code.innerText;
        
      navigator.clipboard.writeText(textToCopy).then(() => {
        const icon = button.querySelector('i');
        const text = button.childNodes[1];
        
        icon.className = 'bx bxs-copy';
        text.textContent = 'Copied!';
        
        setTimeout(() => {
            icon.className = 'bx bx-copy';
            text.textContent = 'Copy';
        }, 2000);
      }).catch(err => {
          console.error('Failed to copy text: ', err);
      });
    });
  });
});