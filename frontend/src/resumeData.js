const resumeData = {
  profile: {
    name: "Dima Mykytiuk",
    title: "Python Developer",
    location: "Kyiv, Ukraine",
    phone: "+380506074864",
    email: "dima.mykytiuk1998@gmail.com"
  },
  links: [
    { label: "GitHub", url: "https://github.com" },
    { label: "Telegram", url: "https://t.me" },
    { label: "LinkedIn", url: "https://linkedin.com" }
  ],
  summary:
    "Python Backend Developer with 2+ years of experience building high-load systems and large-scale integrations. Experienced in FastAPI and RESTful services, designing scalable architectures and asynchronous processing pipelines. Contributed to nationwide logistics and fiscal systems handling high daily throughput.",
  projects: [
    {
      title: "E-commerce & Order Management Systems",
      details:
        "Designed and developed backend systems supporting the full order and customer lifecycle for national-scale e-commerce platforms. Implemented order processing, customer data management, ERP integrations, and automated shipment workflows."
    },
    {
      title: "Fiscal & Payment Systems",
      details:
        "Developed high-load fiscalization and payment orchestration systems. Implemented online/offline fiscalization, receipt lifecycle management, and event-driven processing with Kafka, Celery, Redis, and PostgreSQL."
    },
    {
      title: "Logistics & Warehouse Systems",
      details:
        "Designed WMS and Pick-Up/Drop-Off management systems automating inventory tracking, cargo lifecycle management, and client verification across logistics operations."
    },
    {
      title: "Government & National Program Integrations",
      details:
        "Implemented backend integrations for nationwide initiatives, supporting secure data exchange, high-load beneficiary processing, and large-scale logistics coordination."
    }
  ],
  workHistory: [
    {
      role: "Software Developer",
      company: "JSC Ukrposhta",
      city: "Kyiv",
      period: "Jul 2023 — Present",
      details:
        "Collaborated with product and project managers on system design and implementation. Contributed to modernization of legacy systems, improving performance, stability, and operational efficiency."
    }
  ],
  education: [
    {
      degree: "Bachelor’s Degree in Software Engineering",
      institution: "National Transport University, Kyiv",
      period: "Sep 2016 — Jun 2020"
    },
    {
      degree: "Master’s Degree in Computer Science",
      institution: "National Transport University, Kyiv",
      period: "Sep 2020 — Dec 2021"
    }
  ],
  courses: [
    {
      title: "Python Web and Data Science",
      provider: "GoIT",
      period: "Aug 2021 — Oct 2022"
    },
    {
      title: "Fullstack Developer",
      provider: "GoIT",
      period: "Mar 2023 — Dec 2023"
    }
  ],
  skills: [
    "MySQL",
    "PostgreSQL",
    "Django",
    "Django REST Framework",
    "Celery",
    "RabbitMQ",
    "Redis",
    "Pandas",
    "Frappe Framework",
    "Docker",
    "ReactJS",
    "FastAPI",
    "Kafka"
  ],
  qualities: ["Desire to learn", "Hardworking", "Calm", "Polite", "Creative", "Flexible", "Honest"],
  languages: ["Ukrainian", "English"]
};

export default resumeData;
