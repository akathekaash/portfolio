const iconMap = {
    "React": "fa-brands fa-react",
    "JavaScript": "fa-brands fa-js",
    "HTML5": "fa-brands fa-html5",
    "CSS3": "fa-brands fa-css3-alt",
    "Tailwind": "fa-solid fa-wind",
    "Node.js": "fa-brands fa-node",
    "Python": "fa-brands fa-python",
    "SQL": "fa-solid fa-database",
    "MongoDB": "fa-solid fa-leaf",
    "Git": "fa-brands fa-git-alt",
    "Docker": "fa-brands fa-docker",
    "AWS": "fa-brands fa-aws",
    "VS Code": "fa-solid fa-code",
    "Appian": "fa-solid fa-cube",
    "Mendix": "fa-solid fa-layer-group",
    "UiPath": "fa-solid fa-robot",
    "Databases": "fa-solid fa-database",
    "Java": "fa-brands fa-java",
    "Spring": "fa-brands fa-leaf"
};

function getIcon(skillName) {
    if (iconMap[skillName]) return `<i class="${iconMap[skillName]}"></i>`;
    for (const key in iconMap) {
        if (skillName.includes(key)) return `<i class="${iconMap[key]}"></i>`;
    }
    return '';
}

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + "%";
    });

    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // ScrollSpy Logic
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const scrollSpy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        scrollSpy.observe(section);
    });

    // Update Page Title
    document.title = `${profileData.name} | Portfolio`;
    document.getElementById('nav-logo').textContent = 'A_K_A_THE_KAASH';

    // Hero Section
    document.getElementById('hero-name').textContent = profileData.name;
    document.getElementById('hero-title').textContent = profileData.title;
    document.getElementById('hero-bio').textContent = profileData.location;

    // Hero Social Icons
    const heroSocials = document.getElementById('social-icons-hero');
    const heroLinks = [
        { icon: 'fa-brands fa-github', url: profileData.contact.github },
        { icon: 'fa-brands fa-linkedin', url: profileData.contact.linkedin },
        { icon: 'fa-brands fa-twitter', url: profileData.contact.twitter }
    ];

    heroLinks.forEach(link => {
        if (link.url && !link.url.includes('example.com') && link.url !== '#') {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.innerHTML = `<i class="${link.icon}"></i>`;
            heroSocials.appendChild(a);
        }
    });

    // Stats Section
    if (profileData.stats) {
        document.getElementById('stat-experience').textContent = profileData.stats.experience;
        document.getElementById('stat-projects').textContent = profileData.stats.projects;
        document.getElementById('stat-certs').textContent = profileData.stats.certifications;
    }

    // About Section
    document.getElementById('about-text').textContent = profileData.about;

    // Experience Section (Tabs)
    const tabsList = document.getElementById('jobs-tabs');
    const tabsContent = document.getElementById('jobs-content');

    if (profileData.experience && profileData.experience.length > 0) {
        profileData.experience.forEach((exp, index) => {
            // Create Tab Button
            const button = document.createElement('button');
            button.className = `tab-button ${index === 0 ? 'active' : ''}`;
            button.textContent = exp.company;
            button.onclick = () => openTab(index);
            tabsList.appendChild(button);

            // Create Tab Panel
            const panel = document.createElement('div');
            panel.className = `tab-panel ${index === 0 ? 'active' : ''}`;
            panel.id = `panel-${index}`;

            // Format description
            const descItems = exp.description.includes('. ')
                ? exp.description.split('. ').filter(item => item.trim().length > 0).map(item => `<li>${item.trim()}${item.endsWith('.') ? '' : '.'}</li>`).join('')
                : `<li>${exp.description}</li>`;

            panel.innerHTML = `
                <h3 class="job-title">
                    <span>${exp.role}</span>
                    <span class="job-company"> @ ${exp.company}</span>
                </h3>
                <p class="job-range">${exp.period}</p>
                <div class="job-desc">
                    <ul>
                        ${descItems}
                    </ul>
                </div>
            `;
            tabsContent.appendChild(panel);
        });
    }

    function openTab(index) {
        const buttons = document.querySelectorAll('.tab-button');
        buttons.forEach((btn, i) => {
            if (i === index) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        const panels = document.querySelectorAll('.tab-panel');
        panels.forEach((panel, i) => {
            if (i === index) panel.classList.add('active');
            else panel.classList.remove('active');
        });
    }

    // Projects Section
    const projGrid = document.getElementById('projects-grid');
    profileData.projects.forEach((proj, index) => {
        const card = document.createElement('div');
        card.className = 'card fade-up';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);

        card.innerHTML = `
            <div class="card-header">
                <div class="folder-icon">
                    <i class="fa-regular fa-folder" style="font-size: 40px; color: var(--accent-color);"></i>
                </div>
                <div class="external-links">
                    <a href="#" aria-label="GitHub Link"><i class="fa-brands fa-github"></i></a>
                    <a href="#" aria-label="External Link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>
            </div>
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            <div class="skill-tags" style="margin-top: auto;">
                ${proj.tech.map(t => `<span style="font-family: 'Fira Code', monospace; font-size: 12px; margin-right: 15px; color: var(--text-secondary);">${t}</span>`).join('')}
            </div>
        `;
        projGrid.appendChild(card);
    });

    // Skills Section
    const skillsGrid = document.getElementById('skills-grid');
    profileData.skills.forEach((cat, index) => {
        const div = document.createElement('div');
        div.className = 'skill-category fade-up';
        div.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(div);

        div.innerHTML = `
            <h3>${cat.category}</h3>
            <div class="skill-tags">
                ${cat.items.map(s => `<span class="skill-tag">${getIcon(s)} ${s}</span>`).join('')}
            </div>
        `;
        skillsGrid.appendChild(div);
    });

    // Certifications Section
    const certGrid = document.getElementById('certifications-grid');
    if (profileData.certifications) {
        profileData.certifications.forEach((cert, index) => {
            const card = document.createElement('div');
            card.className = 'card fade-up';
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);

            card.innerHTML = `
                <div class="card-header">
                    <i class="fa-solid fa-certificate" style="font-size: 30px; color: var(--accent-color);"></i>
                </div>
                <h3>${cert.name}</h3>
                <h4>${cert.issuer}</h4>
                <span class="date">${cert.date}</span>
            `;
            certGrid.appendChild(card);
        });
    }

    // Education Section
    const eduGrid = document.getElementById('education-grid');
    if (profileData.education) {
        profileData.education.forEach((edu, index) => {
            const card = document.createElement('div');
            card.className = 'card fade-up';
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);

            card.innerHTML = `
                <div class="card-header">
                    <i class="fa-solid fa-graduation-cap" style="font-size: 30px; color: var(--accent-color);"></i>
                </div>
                <h3>${edu.degree}</h3>
                <h4>${edu.school}</h4>
                <span class="date">${edu.period}</span>
            `;
            eduGrid.appendChild(card);
        });
    }

    // Side Socials & Contact
    const sideSocials = document.getElementById('side-socials');
    const socialLinks = document.getElementById('social-links');

    const links = [
        { icon: 'fa-brands fa-github', url: profileData.contact.github },
        { icon: 'fa-brands fa-linkedin', url: profileData.contact.linkedin },
        { icon: 'fa-brands fa-twitter', url: profileData.contact.twitter }
    ];

    links.forEach(link => {
        if (link.url && !link.url.includes('example.com')) {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${link.url}" target="_blank"><i class="${link.icon}"></i></a>`;
            sideSocials.appendChild(li);

            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.innerHTML = `<i class="${link.icon}"></i>`;
            socialLinks.appendChild(a);
        }
    });

    // Side Email
    const sideEmail = document.getElementById('side-email');
    if (sideEmail && profileData.contact.email) {
        sideEmail.href = `mailto:${profileData.contact.email}`;
        sideEmail.textContent = profileData.contact.email;
    }

    // Mail Button
    const mailBtn = document.getElementById('mail-btn');
    if (mailBtn && profileData.contact.email) {
        mailBtn.href = `mailto:${profileData.contact.email}`;
    }

    // Footer
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('footer-name').textContent = profileData.name;
});
