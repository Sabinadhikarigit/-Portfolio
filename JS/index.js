    // --------------------------
    // Theme toggle + persistence
    // --------------------------
    (function(){
      const root = document.documentElement;
      const toggle = document.getElementById('theme-toggle');
      const label = document.getElementById('toggle-label');
      const icon = document.getElementById('toggle-icon');

      // apply saved theme (or system preference)
      const saved = localStorage.getItem('sab_theme');
      if(saved){
        root.setAttribute('data-theme', saved);
        updateToggle(saved);
      } else {
        // prefer dark by default (since background requested is dark)
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        const defaultTheme = prefersLight ? 'light' : 'dark';
        root.setAttribute('data-theme', defaultTheme);
        updateToggle(defaultTheme);
      }

      function updateToggle(theme){
        const isLight = theme === 'light';
        toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
        label.textContent = isLight ? 'Light' : 'Dark';
        icon.className = isLight ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
      }

      toggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        localStorage.setItem('sab_theme', next);
        updateToggle(next);
      });
    })();

    // Smooth scroll for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
      anchor.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth'});
        }
      });
    });