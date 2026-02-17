import resume from "./resumeData";

function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function App() {
  const { profile } = resume;

  return (
    <div className="page">
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
          <Section title="Contact">
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

          <Section title="Links">
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

          <Section title="Professional Skills">
            <ul>
              {resume.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </Section>

          <Section title="Personal Qualities">
            <ul>
              {resume.qualities.map((quality) => (
                <li key={quality}>{quality}</li>
              ))}
            </ul>
          </Section>

          <Section title="Languages">
            <ul>
              {resume.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </Section>
        </aside>

        <section className="right-column">
          <Section title="Summary">
            <p>{resume.summary}</p>
          </Section>

          <Section title="Projects">
            <ul className="details-list">
              {resume.projects.map((project) => (
                <li key={project.title}>
                  <strong>{project.title}.</strong> {project.details}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Work History">
            {resume.workHistory.map((job) => (
              <article key={`${job.company}-${job.period}`} className="timeline-item">
                <h3>
                  {job.role} at {job.company}, {job.city}
                </h3>
                <p className="muted">{job.period}</p>
                <p>{job.details}</p>
              </article>
            ))}
          </Section>

          <Section title="Education">
            {resume.education.map((item) => (
              <article key={`${item.degree}-${item.period}`} className="timeline-item">
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
                <p className="muted">{item.period}</p>
              </article>
            ))}
          </Section>

          <Section title="Courses">
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
