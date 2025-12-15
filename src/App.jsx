import React, { useEffect, useRef, useState } from 'react';
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";
import { GoArrowUpRight } from "react-icons/go";

function useReveal() {
  const refs = useRef([]);
  const setRef = (el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    refs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return setRef;
}

const ThemeToggle = () => {
  // initialize theme from localStorage or prefer system
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      // default to light
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggle = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return <button onClick={toggle} className="btn btn-ghost btn-sm">Click me</button>;
};

export default function App() {
  const setRef = useReveal();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const PROFILE = {
    name: 'Julius Aako',
    title: 'Full-Stack Developer',
    location: 'Lagos, Nigeria',
    bio: 'I build fast, accessible and delightful web experiences. I love React, Node.js and clean, maintainable code.',
    avatar: 'images/CEO.jpeg'
  };

  const PROJECTS = [
    { id: 1, title: 'E-Commerce website', description: 'E-commerce platform with admin dashboard.', image: 'images/CEO.jpeg', url: 'https://example.com' },
    { id: 2, title: 'Real-Estate website', description: 'Realtime real-estate website.', image: 'images/CEO.jpeg', url: 'https://example.com' },
    { id: 3, title: 'Fintech App', description: 'Content engine with monetization.', image: 'images/CEO.jpeg', url: 'https://example.com' }
  ];

  const CONTACTS = {
    whatsapp: 'https://wa.me/2348037200529?text=Hi%20Dev%20AJ%20there!',
    facebook: 'https://facebook.com/YOURPROFILE',
    linkedin: 'https://www.linkedin.com/in/YOURPROFILE',
    email: 'mailto:aakojuliusoluwanifemi@gmail.com'
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content" loading="lazy">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-neutral-900/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={PROFILE.avatar} alt="avatar" loading="lazy" />
                </div>
              </div>
              <span className="font-semibold">{PROFILE.name}</span>
            </a>

            <div className="hidden md:flex items-center gap-6">
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="link link-hover">About</a>
              <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="link link-hover">Projects</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="link link-hover">Contact</a>
              <a href="#footer" onClick={(e) => handleNavClick(e, 'footer')} className="btn btn-primary btn-sm">Hire me</a>
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button className="btn btn-ghost btn-circle" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Toggle menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileNavOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>
            </div>
          </div>

          {mobileNavOpen && (
            <div className="md:hidden py-2">
              <div className="flex flex-col gap-2">
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="p-2">About</a>
                <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="p-2">Projects</a>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="p-2">Contact</a>
                <a href="#footer" onClick={(e) => handleNavClick(e, 'footer')} className="btn btn-primary btn-block">Hire me</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <header id="hero" className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div ref={setRef} className="reveal transform transition duration-700 delay-75">
            <p className="text-sm opacity-70">Hello, I'm</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-2">{PROFILE.name}</h1>
            <p className="text-xl mt-2 text-primary font-semibold">{PROFILE.title}</p>
            <p className="mt-6 text-lg max-w-prose">{PROFILE.bio} I focus on performance, accessibility and delightful UX.</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="btn btn-primary btn-lg">See projects</a>
              <a href={CONTACTS.email} className="btn btn-ghost btn-lg">Email me <BiLogoGmail /></a>
            </div>

            <div className="mt-8 flex gap-4 items-center">
              <a href={CONTACTS.linkedin} target="_blank" rel="noreferrer" className="btn bg-black btn-sm btn-circle"><FaLinkedinIn className='text-white' /></a>
              <a href={CONTACTS.facebook} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary btn-circle"><BsFacebook /></a>
              <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="btn btn-sm btn-circle btn-success"><FaWhatsapp className='text-white'/></a>
            </div>
          </div>

          <div ref={setRef} className="reveal flex justify-center md:justify-end">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-xl transform transition hover:scale-105 duration-500">
              <img src={PROFILE.avatar} alt="Profile" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div ref={setRef} className="reveal md:col-span-2">
            <h2 className="text-2xl font-bold">About me</h2>
            <p className="mt-4 max-w-prose">I build modern web applications using React, Node, and cloud services. My focus is on performance (lazy loading, code splitting), accessibility (ARIA, keyboard navigation), and delightful micro-interactions.</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4" loading="lazy">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Performance</h3>
                <p className="text-sm opacity-70">Images lazy-loaded, code splitting, optimized assets.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Accessibility</h3>
                <p className="text-sm opacity-70">Semantic HTML, keyboard friendly navigation, proper alt text.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Testing</h3>
                <p className="text-sm opacity-70">Unit and integration tests for reliable releases.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Design</h3>
                <p className="text-sm opacity-70">Clean, responsive UI with delightful interactions.</p>
              </div>
            </div>
          </div>

          <aside ref={setRef} className="reveal p-6 rounded-lg border">
            <h4 className="font-semibold">Quick facts</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><strong>Location:</strong> {PROFILE.location}</li>
              <li><strong>Available:</strong> For hire / contract</li>
              <li><strong>Stack:</strong> React, Node.js, MongoDB, Tailwind, MySQL, PostgreSQL, Flutter, Reactnative</li>
              <li><strong>Contact:</strong> <a className="link" href={CONTACTS.email}>Email</a></li>
            </ul>

            <div className="mt-6">
              <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="btn btn-block btn-success">Message on WhatsApp <FaWhatsapp /></a>
            </div>
          </aside>
        </div>
      </section>

      {/* SKILLS & EXPERIENCE */}
      <section id="skills" className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Skills & Experience</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div ref={setRef} className="reveal p-4 border rounded-lg">
            <h3 className="font-semibold">Core skills</h3>
            <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
              <li>React, Next.js, TailwindCSS</li>
              <li>React Native, Flutter Expo</li>
              <li>Node.js, Express, MongoDB</li>
              <li>Mysql, PostgreSql</li>
              <li>Testing, CI/CD, Deployment (Render, Vercel)</li>
            </ul>
          </div>
          <div ref={setRef} className="reveal p-4 border rounded-lg">
            <h3 className="font-semibold">Experience</h3>
            <p className="mt-3 text-sm">4+ years building production-ready applications, from MVPs to scalable products. Worked on payments, realtime features, admin dashboards and mobile apps.</p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Selected projects</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <article key={p.id} ref={setRef} className="reveal card card-compact bg-base-200 shadow-lg hover:shadow-xl transform transition hover:-translate-y-1">
              <figure>
                <img src={p.image} alt={p.title} loading="lazy" className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{p.title}</h3>
                <p className="text-sm opacity-70">{p.description}</p>
                <div className="card-actions justify-end">
                  <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm"><GoArrowUpRight className='text-xl' /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div ref={setRef} className="reveal">
            <h2 className="text-2xl font-bold">Get in touch</h2>
            <p className="mt-4 max-w-prose">Want to collaborate? Send me a quick message through any of the channels below. I'll usually respond within 24–48 hours.</p>

            <div className="mt-6 space-y-3">
              <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="btn btn-success btn-block"><FaWhatsapp /></a>
              <a href={CONTACTS.facebook} target="_blank" rel="noreferrer" className="btn btn-primary btn-block"><BsFacebook /></a>
              <a href={CONTACTS.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline btn-block"><FaLinkedinIn /></a>
              <a href={CONTACTS.email} className="btn btn-secondary btn-block"><BiLogoGmail /></a>
            </div>
          </div>

          <form ref={setRef} className="reveal p-6 rounded-lg border" onSubmit={(e) => { e.preventDefault(); window.open(CONTACTS.whatsapp, '_blank'); }}>
            <h3 className="font-semibold">Send a quick message</h3>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <input name="name" type="text" placeholder="Your name" className="input input-bordered w-full" required />
              <input name="email" type="email" placeholder="Your email" className="input input-bordered w-full" required />
              <textarea name="message" placeholder="Your message" className="textarea textarea-bordered w-full" rows={4} required />
              <button type="submit" className="btn btn-success">Send via WhatsApp <FaWhatsapp /></button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="border-t">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={PROFILE.avatar} alt="avatar small" loading="lazy" />
              </div>
            </div>
            <div>
              <div className="font-semibold">{PROFILE.name}</div>
              <div className="text-sm opacity-60">{PROFILE.title}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <a href={CONTACTS.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm"><FaLinkedinIn /></a>
            <a href={CONTACTS.facebook} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm"><BsFacebook/></a>
            <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm"><FaWhatsapp /></a>
          </div>
          <div className="text-sm opacity-70">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
