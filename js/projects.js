/**
 * Dynamic project card renderer with spotlight hover effect
 */

async function initProjects() {
    const container = document.querySelector('#projects-container');
    if (!container) return;

    let projects;
    try {
        const res = await fetch('data/projects.json');
        if (!res.ok) throw new Error(res.status);
        projects = await res.json();
    } catch {
        projects = [
            { id: 1, title: "Personal Portfolio Website", category: "Web Development", description: "A responsive, modular personal portfolio built with semantic HTML5, modern CSS3, and vanilla JavaScript.", tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"], github: "#", demo: "#" },
            { id: 2, title: "Python Web Scraper & Data Extractor", category: "Python", description: "Automated data extraction tool written in Python to fetch, parse, and save structured website data.", tags: ["Python", "Web Scraping", "JSON", "Automation"], github: "#", demo: "" },
            { id: 3, title: "Python Task & File Automation Scripts", category: "Python", description: "Collection of productivity scripts for batch file renaming, data transformation, and routine automation.", tags: ["Python", "File I/O", "CLI", "Automation"], github: "#", demo: "" },
            { id: 4, title: "Roblox Adventure / Mechanics Demo", category: "Game Development", description: "Interactive Roblox game prototype with custom inventory, leaderboards, and gameplay mechanics.", tags: ["Roblox Studio", "Luau", "Game Design", "UI"], github: "", demo: "#" }
        ];
    }

    renderProjects(projects, container);
    attachSpotlightEffect(container);
}

function renderProjects(projects, container) {
    if (!Array.isArray(projects) || !projects.length) {
        container.innerHTML = '<p style="color:var(--text-muted);">No projects yet.</p>';
        return;
    }

    container.innerHTML = projects.map(p => `
        <div class="card project-card animate-on-scroll">
            <div class="card-spotlight"></div>
            <div>
                <span class="project-category">${p.category || 'Project'}</span>
                <h3>${p.title || 'Untitled'}</h3>
                <p>${p.description || ''}</p>
            </div>
            <div>
                <div class="project-tags">
                    ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-outline btn-sm"><i class="fa-brands fa-github"></i> Code</a>` : ''}
                    ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Preview</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

/** Creates a radial-gradient spotlight that follows the mouse on each card */
function attachSpotlightEffect(container) {
    const cards = container.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const spotlight = card.querySelector('.card-spotlight');
            if (spotlight) {
                spotlight.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(99,102,241,0.08), transparent)`;
            }
        });
    });
}
