import { useEffect, useState } from "react";
import resumeData from "./resumeData";

function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage === "uk" ? "uk" : "en";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const resume = resumeData.resumes[language];
  const ui = resumeData.ui[language];
  const { profile } = resume;
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <div className="page">
      <div className="controls">
        <div className="control-group theme-group">
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(nextTheme)}
            title={theme === "light" ? ui.dark : ui.light}
            aria-label={theme === "light" ? ui.dark : ui.light}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="control-group language-group">
          <button
            type="button"
            className={language === "en" ? "active" : ""}
            onClick={() => setLanguage("en")}
            title={ui.english}
            aria-label={ui.english}
          >
            🇬🇧
          </button>
          <button
            type="button"
            className={language === "uk" ? "active" : ""}
            onClick={() => setLanguage("uk")}
            title={ui.ukrainian}
            aria-label={ui.ukrainian}
          >
            🇺🇦
          </button>
        </div>
      </div>

      <header className="hero">
        <h1>{profile.name}</h1>
        <div className="hero-meta">
          <span>{profile.title}</span>
          <span>{profile.location}</span>
          <a href={`tel:${profile.phone}`}>{profile.phone}</a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </header>

      <main className="grid">
        <aside className="left-column">
          <Section title={ui.contact}>
            <ul>
              <li>{profile.location}</li>
              <li>
                <a href={`tel:${profile.phone}`}>{profile.phone}</a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
            </ul>
          </Section>

          <Section title={ui.links}>
            <ul>
              {resume.links.map((link) => (
                <li key={link.label}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={ui.professionalSkills}>
            <ul>
              {resume.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </Section>

          <Section title={ui.personalQualities}>
            <ul>
              {resume.qualities.map((quality) => (
                <li key={quality}>{quality}</li>
              ))}
            </ul>
          </Section>

          <Section title={ui.languages}>
            <ul>
              {resume.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </Section>
        </aside>

        <section className="right-column">
          <Section title={ui.summary}>
            <p>{resume.summary}</p>
          </Section>

          <Section title={ui.projects}>
            <ul className="details-list">
              {resume.projects.map((project) => (
                <li key={project.title}>
                  <strong>{project.title}.</strong> {project.details}
                </li>
              ))}
            </ul>
          </Section>

          <Section title={ui.workHistory}>
            {resume.workHistory.map((job) => (
              <article key={`${job.company}-${job.period}`} className="timeline-item">
                <h3>
                  {job.role} {ui.at} {job.company}, {job.city}
                </h3>
                <p className="muted">{job.period}</p>
                <p>{job.details}</p>
              </article>
            ))}
          </Section>

          <Section title={ui.education}>
            {resume.education.map((item) => (
              <article key={`${item.degree}-${item.period}`} className="timeline-item">
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
                <p className="muted">{item.period}</p>
              </article>
            ))}
          </Section>

          <Section title={ui.courses}>
            {resume.courses.map((course) => (
              <article key={`${course.title}-${course.period}`} className="timeline-item">
                <h3>
                  {course.title}, {course.provider}
                </h3>
                <p className="muted">{course.period}</p>
              </article>
            ))}
          </Section>
        </section>
      </main>
    </div>
  );
}

export default App;
