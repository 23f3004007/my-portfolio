import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import DarkVeil from './DarkVeil';
import GradualBlur from './GradualBlur';

const HEADER_HEIGHT = 100;
const App = () => {
    useEffect(() => {
        function createParticles(x: number, y: number) {
            for (let i = 0; i < 18; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                document.body.appendChild(particle);
                const angle = (Math.PI * 2 * i) / 18;
                const radius = 40 + Math.random() * 20;
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                particle.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
                setTimeout(() => {
                    particle.style.transform = `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px) scale(0.5)`;
                    particle.style.opacity = '0';
                }, 10);
                setTimeout(() => {
                    particle.remove();
                }, 700);
            }
        }
        // Attach particle effect to nav links and buttons
        const interactiveElements = document.querySelectorAll('a, button');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', (e: any) => {
                const rect = el.getBoundingClientRect();
                createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
            });
        });
        // Header Scroll Effect
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
            }
        });

        // Fade-in on Scroll
        const fadeInElements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });
        fadeInElements.forEach(el => observer.observe(el));
        
        // Active Nav Link on Scroll
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const sectionObserver = new IntersectionObserver((entries) => {
             entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href')?.substring(1) === entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-30% 0px -70% 0px' });

        sections.forEach(section => sectionObserver.observe(section));
    }, []);
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href')?.substring(1);
        const section = document.getElementById(targetId!);
        if (section) {
            // section.scrollIntoView({ behavior: "smooth", block: "center" });
            const sectionRect = section.getBoundingClientRect();
            const absoluteY = window.scrollY + sectionRect.top;
            const centerY = absoluteY - window.innerHeight / 2 + sectionRect.height / 2 + HEADER_HEIGHT / 2;
            window.scrollTo({ top: centerY, behavior: "smooth" });
        }
    };
    return (
        <>
        <DarkVeil hueShift={23} warpAmount={5} speed={1.7}/>
        <GradualBlur target="page" position="bottom" height="6rem"/>
        <div style={{ width: '100%', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
            
            <header>
                <nav>
                    <div className="logo">Veditha R</div>
                    <ul>
                        <li><a href="#about" className="nav-link" onClick={handleNavClick}>About</a></li>
                        <li><a href="#experience" className="nav-link" onClick={handleNavClick}>Experience</a></li>
                        <li><a href="#projects" className="nav-link" onClick={handleNavClick}>Projects</a></li>
                        <li><a href="#skills" className="nav-link" onClick={handleNavClick}>Skills</a></li>
                        <li><a href="#certificates" className="nav-link" onClick={handleNavClick}>Certificates</a></li>
                        <li><a href="#education" className="nav-link" onClick={handleNavClick}>Education</a></li>
                        <li><a href="#clubs" className="nav-link" onClick={handleNavClick}>Clubs</a></li>
                        <li><a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <section id="hero">
                    <div className="hero-text">
                        <h1>Hi :) I'm Veditha</h1>
                        <p>a 20 year old exploring life</p>
                        <div className="social-links">
                            <a href="https://www.linkedin.com/in/veditharv/" target="_blank" aria-label="LinkedIn Profile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>
                            <a href="https://github.com/23f3004007" target="_blank" aria-label="GitHub Profile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            </a>
                        </div>
                    </div>
                </section>
                
                <section id="about" className="card fade-in">
                    <h2>ABOUT ME</h2>
                    <p>Computer Science student with experience in cloud computing, web development, and algorithms, skilled in GCP, Python, Flask, and SQLite. Interested in applying problem-solving and technical skills to cloud, software, and AI projects.</p>
                </section>

                <section id="experience" className="card fade-in">
                    <h2>WORK EXPERIENCE</h2>
                    <div className="item">
                        <h3>Summer Research Intern - VIT Chennai</h3>
                        <p className="date">May 2025 - July 2025</p>
                        <p>Conducted in-depth exploration of various LLMs and leveraged the knowledge to optimize data processing workflows and develop a chatbot with Hybrid RAG implementation, improving retrieval accuracy and response efficiency.</p>
                    </div>
                    <div className="item">
                        <h3>Trainee + Intern - LearnNex</h3>
                        <p className="date">May 2024 - August 2024</p>
                        <p>Completed training and internship in Artificial Intelligence, successfully delivering two AIML capstone projects and gaining extensive hands-on experience in Python programming for building, training, and deploying machine learning models.</p>
                    </div>
                </section>
                
                {/* <section id="projects" className="card fade-in">
                    <h2>PROJECTS</h2>
                    <div className="item">
                        <h3>Quiz Master</h3>
                        <p>A Flask-based e-learning platform that facilitates quiz management and assessment across multiple subjects. Quiz Master is a web application that enables administrators to create and manage quizzes while allowing users to participate in timed assessments.</p>
                    </div>
                    <div className="item">
                        <h3>Parking Management System</h3>
                        <p>A Flask-based multi-user web application for managing parking lots, spots, and reservations, featuring role-based access for administrators and registered users.</p>
                    </div>
                </section> */}
                <section id="projects" className="projects-section">
                    <h2 className="projects-heading">Projects</h2>
                    <div className="projects-carousel">
                        <div className="carousel-track">
            {/* Repeat cards for infinite effect */}
                        {[
                {
                    name: "Quiz Master",
                    img: "https://raw.githubusercontent.com/23f3004007/quiz-master/main/quizmaster-preview.png",
                    desc: "A Flask-based e-learning platform for quiz management and assessment across multiple subjects.",
                    link: "https://github.com/23f3004007/quiz-master"
                },
                {
                    name: "Parking Management System",
                    img: "https://raw.githubusercontent.com/23f3004007/parking-management/main/parking-preview.png",
                    desc: "A Flask-based multi-user web application for managing parking lots, spots, and reservations.",
                    link: "https://github.com/23f3004007/parking-management"
                },
                // Add more projects here
            ].map((project, idx) => (
                <div className="project-card" key={project.name + idx}>
                    <img src={project.img} alt={project.name} className="project-img" />
                    <div className="project-content">
                        <h3>{project.name}</h3>
                        <p>{project.desc}</p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub</a>
                    </div>
                </div>
            ))}
            {/* Duplicate for infinite scroll */}
            {[
                {
                    name: "Quiz Master",
                    img: "https://raw.githubusercontent.com/23f3004007/quiz-master/main/quizmaster-preview.png",
                    desc: "A Flask-based e-learning platform for quiz management and assessment across multiple subjects.",
                    link: "https://github.com/23f3004007/quiz-master-v1"
                },
                {
                    name: "Parking Management System",
                    img: "https://raw.githubusercontent.com/23f3004007/parking-management/main/parking-preview.png",
                    desc: "A Flask-based multi-user web application for managing parking lots, spots, and reservations.",
                    link: "https://github.com/23f3004007/vehicle-parking-v1"
                },
                // Add more projects here
            ].map((project, idx) => (
                <div className="project-card" key={project.name + "dup" + idx}>
                    <img src={project.img} alt={project.name} className="project-img" />
                    <div className="project-content">
                        <h3>{project.name}</h3>
                        <p>{project.desc}</p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub</a>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>

                <section id="skills" className="card fade-in">
                    <h2>SKILLS</h2>
                    <div className="skills-container">
                        <span>Python</span><span>C++/C</span><span>Java</span><span>JavaScript</span><span>HTML/CSS</span><span>Flask</span><span>Jinja2</span><span>SQL</span><span>Bash</span><span>DSA</span><span>Algorithms</span><span>LLMs</span><span>GIT</span><span>GCP</span><span>AWS</span><span>Event Management</span><span>Graphic Design</span><span>Leadership</span><span>Figma</span><span>Gen AI</span><span>Digital Art</span>
                    </div>
                </section>

                <section id="certificates" className="card fade-in">
                    <h2>CERTIFICATES</h2>
                    <div className="item">
                        <h3>Advanced Certificate in Programming and Application Development</h3>
                        <p className="date">IIT Madras</p>
                    </div>
                    <div className="item">
                        <h3>Foundation level in programming and Data Science</h3>
                        <p className="date">IIT Madras</p>
                    </div>
                    <div className="item">
                        <h3>Internship and Training</h3>
                        <p className="date">LearnNex</p>
                    </div>
                    <div className="item">
                        <h3>Credly badges</h3>
                    </div>
                </section>

                <section id="education" className="card fade-in">
                    <h2>EDUCATION</h2>
                    <div className="item">
                        <h3>Vellore Institute of Technology, Chennai</h3>
                        <p>Bachelor of Technology in Computer Science Engineering (2023-2027)</p>
                        <p>CGPA: 9.02</p>
                    </div>
                    <div className="item">
                        <h3>Indian Institute of Technology, Madras</h3>
                        <p>Bachelor of Science in Data Science and Applications (2023-Present)</p>
                        <p>CGPA: 7.34</p>
                    </div>
                     <div className="item">
                        <h3>Sri Chaitanya Techno School, Bangalore</h3>
                        <p>CBSE 12th Board (2021-2022)</p>
                        <p>Percentage: 81%</p>
                    </div>
                    <div className="item">
                        <h3>Atomic Engery Central School, Kaiga</h3>
                        <p>CBSE 10th Board (2019-2020)</p>
                        <p>Percentage: 93.4%</p>
                    </div>
                </section>

                <section id="clubs" className="card fade-in">
                    <h2>CLUBS AND EXTRA CURRICULAR</h2>
                    <div className="item">
                        <h3>Graphic Designer</h3>
                        <p>Google Developers Group on Campus, Fraternity of Leaders, TedX VIT Chennai, Kannada Literary Association - VIT Chennai</p>
                    </div>
                    <div className="item">
                        <h3>Basketball Player</h3>
                        <p>University team member and was the captain in highschool.</p>
                    </div>
                </section>

                <section id="contact" className="card fade-in">
                    <h2>CONTACT</h2>
                    <div className="contact-info">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
                            veditharv@gmail.com
                        </p>
                         <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
                            Bangalore, Karnataka
                        </p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.105 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/></svg>
                            +91 7837830532
                        </p>
                    </div>
                </section>
            </main>
            
            <footer>
                <p>&copy; 2025 Veditha R. All Rights Reserved.</p>
            </footer>
            </div>
        </>
    );
};

const container = document.getElementById("root");
const root = createRoot(container!);

const styles = `
    .darkveil-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 0;
        pointer-events: none;
        display: block;
    }
    :root {
        --bg-color: #000000;
        --card-color: #121212;
        --text-color: #EAEAEA;
        --text-secondary: #A0A0A0;
        --accent-color: #3550F7;
        --font-family: 'Poppins', sans-serif;

    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    body {
        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: var(--font-family);
        line-height: 1.6;
        cursor: default;
    }

    .particle {
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        pointer-events: none;
        opacity: 1;
        z-index: 9999;
        transition: transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s;
        will-change: transform, opacity;
    }
    
    a {
        color: var(--accent-color);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    a:hover {
        color: white;
    }
    
    h1, h2, h3 {
        color: var(--text-color);
        font-weight: 600;
        margin-bottom: 1rem;
    }

    header {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 100;
        background-color: transparent;
        padding: 1.5rem 5%;
        transition: background-color 0.3s ease, padding 0.3s ease, backdrop-filter 0.3s ease;
    }
    
    header.scrolled {
        background-color: rgba(18, 18, 18, 0.85);
        backdrop-filter: blur(10px);
        padding: 1rem 5%;
        box-shadow: 0 10px 30px -10px rgba(0,0,0,0.7);
    }
    
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav .logo {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--accent-color);
    }

    nav ul {
        display: flex;
        list-style: none;
    }

    nav ul li {
        margin-left: 2rem;
    }

    nav ul li a {
        font-weight: 400;
        padding: 0.5rem;
        position: relative;
    }
    
    nav ul li a.active {
        color: var(--accent-color);
    }
    
    nav ul li a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--accent-color);
        transition: width 0.3s ease;
    }

    nav ul li a:hover::after, nav ul li a.active::after {
        width: 100%;
    }

    main {
        padding: 8rem 15% 2rem;
        flex-grow: 1;
    }
    
    section {
        margin-bottom: 4rem;
        padding: 2rem;
    }
    
    #hero {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0;
    }

    #hero h1 {
        font-size: 4rem;
        margin-bottom: 0.5rem;
    }

    #hero p {
        font-size: 1.5rem;
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
    }
    
    #hero .social-links {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
    }

    #hero .social-links a svg {
        width: 28px;
        height: 28px;
        fill: var(--text-secondary);
        transition: all 0.3s ease;
    }
    
    #hero .social-links a:hover svg {
        fill: var(--accent-color);
        transform: translateY(-5px);
    }

    .card {
        background-color: var(--card-color);
        border: 1px solid #222;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 16px 48px #3550F7, 0 0 32px #3550F7, 0 0 40px #3550F7;
    }

    .card h2 {
        color: var(--accent-color);
        position: relative;
        padding-bottom: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .card h2::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50px;
        height: 2px;
        background-color: var(--accent-color);
    }
    
    .item {
        margin-bottom: 1.5rem;
    }
    .item:last-child {
        margin-bottom: 0;
    }

    .item h3 {
        font-size: 1.2rem;
        margin-bottom: 0.25rem;
    }
    
    .item .date {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }

    #skills .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    #skills .skills-container span {
        background-color: #000;
        color: var(--accent-color);
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        border: 1px solid var(--accent-color);
        font-weight: 600;
    }

    #contact .contact-info p {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        color: var(--text-secondary);
    }

    #contact .contact-info svg {
        fill: var(--accent-color);
    }

    footer {
        text-align: center;
        padding: 2rem 0;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .fade-in.is-visible {
        opacity: 1;
        transform: translateY(0);
    }

    .projects-section {
        background: transparent;
        box-shadow: none;
        padding: 0;
    }

    .projects-heading {
        text-align: center;
        font-size: 2.5rem;
        color: var(--accent-color);
        margin-bottom: 2.5rem;
        font-weight: 700;
        letter-spacing: 2px;
    }

    .projects-carousel {
        width: 100%;
        overflow: hidden;
        position: relative;
        padding: 2rem 0;
    }

    .carousel-track {
        display: flex;
        gap: 2rem;
        animation: scroll-horizontal 18s linear infinite;
        will-change: transform;
    }

    .project-card {
        flex: 0 0 260px;
        height: 340px;
        background: var(--card-color);
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        transition: transform 0.3s, box-shadow 0.3s;
        margin-bottom: 1rem;
        position: relative;
    }

    .project-card:hover {
        transform: scale(1.05);
        box-shadow: 0 20px 60px #3550F7, 0 0 40px #3550F7, 0 0 60px #3550F7;
        z-index: 2;
    }

    .project-img {
        width: 90%;
        height: 160px;
        object-fit: cover;
        border-radius: 10px;
        margin-top: 1rem;
        margin-bottom: 1rem;
        background: #222;
    }

    .project-content {
        text-align: center;
        padding: 0 1rem;
    }

    .project-content h3 {
        margin-bottom: 0.7rem;
        color: var(--accent-color);
        font-size: 1.2rem;
    }

    .project-content p {
        color: var(--text-secondary);
        margin-bottom: 1.2rem;
        font-size: 0.95rem;
    }

    .project-link {
        display: inline-block;
        padding: 0.5rem 1.2rem;
        background: var(--accent-color);
        color: #fff;
        border-radius: 6px;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.2s;
    }

    .project-link:hover {
        background: #1a2fa0;
    }

    @keyframes scroll-horizontal {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }

    /* Pause animation on hover */
    .projects-carousel:hover .carousel-track {
        animation-play-state: paused;
    }

    /* Responsive */
    @media (max-width: 900px) {
        .carousel-track {
            gap: 1rem;
        }
        .project-card {
            flex: 0 0 210px;
            height: 270px;
        }
        .project-img {
            height: 110px;
        }
    }

    @media (max-width: 768px) {
        body {
            cursor: auto;
        }

        .cursor-ring {
            display: none;
        }

        main {
            padding: 6rem 5% 2rem;
        }

        #hero h1 {
            font-size: 2.5rem;
        }

        #hero p {
            font-size: 1.2rem;
        }

        nav ul {
            display: none; /* Hide for simplicity, could be replaced with a hamburger menu */
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

root.render(<App />);