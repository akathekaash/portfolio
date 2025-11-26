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
    "Appian": "fa-solid fa-cube", // Generic cube for Appian
    "Mendix": "fa-solid fa-layer-group", // Generic layers for Mendix
    "UiPath": "fa-solid fa-robot", // Robot for RPA
    "Databases": "fa-solid fa-database",
    "Java": "fa-brands fa-java",
    "Spring": "fa-brands fa-leaf"
};

function getIcon(skillName) {
    // Try exact match
    if (iconMap[skillName]) return `<i class="${iconMap[skillName]}"></i>`;

    // Try partial match (e.g. "Appian BPM" -> "Appian")
    for (const key in iconMap) {
        if (skillName.includes(key)) return `<i class="${iconMap[key]}"></i>`;
    }

    return ''; // No icon found
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

    // Helper to add animation class
    const addAnim = (el) => {
        el.classList.add('fade-up');
        observer.observe(el);
        return el;
        el.classList.add('fade-up');
        observer.observe(el);
        return el;
    };

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
    }, { threshold: 0.5 }); // Trigger when 50% of section is visible

    sections.forEach(section => {
        scrollSpy.observe(section);
    });

    // Update Page Title
    document.title = `${profileData.name} | Portfolio`;
    document.getElementById('nav-logo').textContent = profileData.name.split(' ')[0];

    // Hero Section
    document.getElementById('hero-name').textContent = profileData.name;
    document.getElementById('hero-title').textContent = profileData.title;
    document.getElementById('hero-bio').textContent = profileData.location; // Using location as short bio/tagline

    // About Section
    document.getElementById('about-text').textContent = profileData.about;

    // Experience Section
    const expGrid = document.getElementById('experience-grid');
    profileData.experience.forEach((exp, index) => {
        const card = document.createElement('div');
        card.className = 'card fade-up';
        card.style.transitionDelay = `${index * 0.1}s`; // Stagger effect
        observer.observe(card);

        card.innerHTML = `
            <div class="card-header">
                <h3>${exp.role}</h3>
                <span class="date">${exp.period}</span>
            </div>
            <h4>${exp.company}</h4>
            <p>${exp.description}</p>
        `;
        expGrid.appendChild(card);
    });

    // Projects Section
    const projGrid = document.getElementById('projects-grid');
    profileData.projects.forEach((proj, index) => {
        const card = document.createElement('div');
        card.className = 'card fade-up';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);

        card.innerHTML = `
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            <div class="skill-tags" style="margin-top: 1rem;">
                ${proj.tech.map(t => `<span class="skill-tag">${getIcon(t)} ${t}</span>`).join('')}
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
                <h3>${edu.degree}</h3>
                <h4>${edu.school}</h4>
                <span class="date">${edu.period}</span>
            `;
            eduGrid.appendChild(card);
        });
    }

    // Contact/Socials
    const socialLinks = document.getElementById('social-links');
    const links = [
        { icon: 'fa-envelope', url: `mailto:${profileData.contact.email}` },
        { icon: 'fa-brands fa-linkedin', url: profileData.contact.linkedin },
        { icon: 'fa-brands fa-github', url: profileData.contact.github },
        { icon: 'fa-brands fa-twitter', url: profileData.contact.twitter }
    ];

    links.forEach(link => {
        if (link.url && !link.url.includes('example')) {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.innerHTML = `<i class="${link.icon}"></i>`;
            socialLinks.appendChild(a);
        }
    });

    // Footer
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('footer-name').textContent = profileData.name;
});
