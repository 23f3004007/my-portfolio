import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import DarkVeil from './DarkVeil';
import GradualBlur from './GradualBlur';

type ProjectCardProps = {
    name: string;
    img: string;
    desc: string;
    link: string;
};

const ProjectCard = ({ name, img, desc, link }: ProjectCardProps) => (
    <div className="project-card">
        <img src={img} alt={name} className="project-img" />
        <div className="project-content">
            <h3>{name}</h3>
            <p>{desc}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
                Open
            </a>
        </div>
    </div>
);

const Projects = () => {
    const projects = [
        {
            name: "Quiz Master",
            img: process.env.PUBLIC_URL + "/quizmaster.png",
            desc: "A Flask-based e-learning platform for quiz management and assessment across multiple subjects.",
            link: "https://github.com/23f3004007/quiz-master-v1"
        },
        {
            name: "Parking Management System",
            img: process.env.PUBLIC_URL + "/vehicle-parking.png",
            desc: "A Flask-based multi-user web application for managing parking lots, spots, and reservations.",
            link: "https://github.com/23f3004007/vehicle-parking-app-v1"
        },
        {
            name: "LastDay",
            img: process.env.PUBLIC_URL + "/lastday.png",
            desc: "An ML based Android App that clasifies and finds deadlines from gmails.",
            link: "https://github.com/23f3004007/LastDay"
        },
        {
            name: "text-comp-analysis",
            img: process.env.PUBLIC_URL + "/textcomp.png",
            desc: "Python implementation and analysis of text compression algorithms.",
            link: "https://github.com/23f3004007/text-comp-analysis"
        },
        {
            name: "Connect 4",
            img: process.env.PUBLIC_URL + "/connect-4.png",
            desc: "Python Connect-4 game with AI-based strategic move selection.",
            link: "https://github.com/23f3004007/ai-connect-4"
        },
        {
            name: "Offline First Serverless Diary App",
            img: process.env.PUBLIC_URL + "/offline-diary.png",
            desc: "Serverless offline diary app using AWS for secure note storage.",
            link: "https://d1sdq76qx0vlaq.cloudfront.net/"
        }
    ];

    // Duplicate cards three times for seamless scroll
    const allProjects = [...projects, ...projects, ...projects];

    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (trackRef.current) {
            // Get width of one set of cards (not the whole track)
            let oneSetWidth = 0;
            const cards = trackRef.current.children;
            for (let i = 0; i < projects.length; i++) {
                oneSetWidth += (cards[i] as HTMLElement).offsetWidth + 32; // 32px gap (2rem)
            }
            trackRef.current.style.setProperty('--scroll-width', `${oneSetWidth}px`);
        }
    }, [projects.length]);

    return (
        <section id="projects" className="projects-section">
            <h2 className="projects-heading">Projects</h2>
            <div className="projects-carousel">
                <div className="carousel-track" ref={trackRef}>
                    {allProjects.map((project, idx) => (
                        <ProjectCard key={`card-${idx}`} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const HEADER_HEIGHT = 100;

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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
        setIsMenuOpen(false); // Close menu on click
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
            <DarkVeil hueShift={23} warpAmount={5} speed={1.7} />
            <GradualBlur target="page" position="bottom" height="6rem" />
            <div style={{ width: '100%', minHeight: '100vh', position: 'relative', zIndex: 1 }}>

                <header>
                    <nav>
                        <div className="logo">
                            <img src={process.env.PUBLIC_URL + "/cat.png"} alt="Logo" style={{ height: '100px', width: 'auto', position: 'absolute', top: '30px', left: '5%' }} />
                        </div>
                        <button
                            className="menu-toggle"
                            aria-label="Toggle Menu"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                {isMenuOpen ? (
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                ) : (
                                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                                )}
                            </svg>
                        </button>
                        <ul className={isMenuOpen ? 'active' : ''}>
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
                            <h2>welcome to my website</h2>
                            <div className="social-links">
                                <a href="https://www.linkedin.com/in/veditharv/" target="_blank" aria-label="LinkedIn Profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </a>
                                <a href="https://github.com/23f3004007" target="_blank" aria-label="GitHub Profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                </a>
                            </div>
                        </div>
                    </section>

                    <section id="about" className="card fade-in">
                        <h2>ABOUT ME</h2>
                        <p>
                            I am a passionate Computer Science student pursuing a double degree: a B.Tech in Computer Science and Engineering from VIT Chennai and a B.S. in Data Science and Applications from IIT Madras. My journey is driven by a curiosity for how things work, leading me to explore diverse fields from Cloud Computing and AI/ML to Full-Stack Web Development.
                        </p>
                        <p style={{ marginTop: '1rem' }}>
                            With a strong foundation in Python, Java, and C++, I love building scalable applications and intelligent systems. My experience includes developing a Hybrid RAG chatbot during my research internship and creating practical solutions like a parking management system and an offline-first diary app. I am constantly learning and applying new technologies to solve real-world problems.
                        </p>
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

                    <Projects />

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
                        <div className="item">
                            <h3>Certified Foundations Associate</h3>
                            <p className="date">Oracle University</p>
                        </div>
                        <div className="item">
                            <h3>Certified Essentials Automation Professional</h3>
                            <p className="date">Automation Anywhere</p>
                        </div>
                        <div className="item">
                            <h3>Responsive Web Design</h3>
                            <p className="date">freeCodeCamp</p>
                        </div>
                    </section>

                    <section id="education" className="card fade-in">
                        <h2>EDUCATION</h2>
                        <div className="item">
                            <h3>Vellore Institute of Technology, Chennai</h3>
                            <p>Bachelor of Technology in Computer Science Engineering (2023-2027)</p>
                            <p>CGPA: 9.07</p>
                        </div>
                        <div className="item">
                            <h3>Indian Institute of Technology, Madras</h3>
                            <p>Bachelor of Science in Data Science and Applications (2023-Present)</p>
                            <p>CGPA: 7.29</p>
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
                        <div className="contact-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                            <div className="contact-info" style={{ flex: '1 1 300px' }}>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" /></svg>
                                    veditharv@gmail.com
                                </p>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>
                                    Bangalore, Karnataka
                                </p>
                            </div>
                            <form
                                className="contact-form"
                                style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                                action="https://formspree.io/f/meelgegz"
                                method="POST"
                            >
                                <div className="form-group">
                                    <input type="text" name="name" placeholder="Your Name" required />
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" placeholder="Your Email" required />
                                </div>
                                <div className="form-group">
                                    <textarea name="message" placeholder="Your Message" rows={5} required></textarea>
                                </div>
                                <button type="submit" className="submit-btn" style={{ marginTop: '0px' }}>Send Message</button>
                            </form>
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
        overflow-x: hidden; /* Fix horizontal scroll */
        width: 100%;
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
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        padding: 0;
        background: transparent;
        box-shadow: none;
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
        max-width: 100vw;
        overflow: hidden;
        position: relative;
        padding: 2rem 0;
        margin: 0 auto;
    }

    .carousel-track {
        display: flex;
        gap: 2rem;
        animation: scroll-horizontal 18s linear infinite;
        will-change: transform;
    }

    .project-card {
        flex: 0 0 260px;
        height: 395px;
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
        box-shadow: 0 8px 24px #3550F7, 0 0 40px #3550F7, 0 0 60px #3550F7;
        z-index: 2;
    }

    .project-img {
        width: 100%;
        height: 160px;
        object-fit: cover;
        object-position: center;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        margin-top: 0;
        margin-bottom: 1rem;
        background: #222;
    }

    .project-content {
        text-align: center;
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;
        align-items: center;
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
        margin-bottom: 1rem;
        margin-top: auto;
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
            height: 340px;
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

        .menu-toggle {
            display: block; /* Show hamburger on mobile */
            background: none;
            border: none;
            color: var(--accent-color);
            cursor: pointer;
            z-index: 101;
        }

        nav ul {
            display: none;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            justify-content: center;
            align-items: center;
            z-index: 100;
            transition: transform 0.3s ease-in-out;
        }

        nav ul.active {
            display: flex;
        }

        nav ul li {
            margin: 1.5rem 0;
        }
        
        nav ul li a {
            font-size: 1.5rem;
        }
    }
    
    .menu-toggle {
        display: none; /* Hide on desktop */
    }

    /* Form Styles */
    .contact-form input,
    .contact-form textarea {
        width: 100%;
        padding: 0.8rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid #333;
        border-radius: 6px;
        color: var(--text-color);
        font-family: var(--font-family);
        transition: border-color 0.3s;
    }

    .contact-form input:focus,
    .contact-form textarea:focus {
        border-color: var(--accent-color);
        outline: none;
        background: rgba(255, 255, 255, 0.1);
    }

    .submit-btn {
        padding: 0.8rem 1.5rem;
        background: var(--accent-color);
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s, transform 0.2s;
        align-self: flex-start;
    }

    .submit-btn:hover {
        background: #1a2fa0;
        transform: translateY(-2px);
    }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

root.render(<App />);