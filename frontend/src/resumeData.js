const resumeData = {
  ui: {
    en: {
      contact: "Contact",
      links: "Links",
      professionalSkills: "Professional Skills",
      personalQualities: "Personal Qualities",
      languages: "Languages",
      summary: "Summary",
      keyModules: "Key Modules & Business Domains",
      projects: "Projects",
      workHistory: "Work History",
      education: "Education",
      courses: "Courses",
      viewCertificate: "View Certificate",
      closeCertificate: "Close",
      downloadCertificate: "Download",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      language: "Language",
      at: "at",
      english: "English",
      ukrainian: "Ukrainian",
      downloadPdf: "Download PDF"
    },
    uk: {
      contact: "Контакти",
      links: "Посилання",
      professionalSkills: "Професійні навички",
      personalQualities: "Особисті якості",
      languages: "Мови",
      summary: "Профіль",
      keyModules: "Ключові модулі та бізнес-напрямки",
      projects: "Проєкти",
      workHistory: "Досвід роботи",
      education: "Освіта",
      courses: "Курси",
      viewCertificate: "Переглянути сертифікат",
      closeCertificate: "Закрити",
      downloadCertificate: "Завантажити",
      theme: "Тема",
      light: "Світла",
      dark: "Темна",
      language: "Мова",
      at: "в",
      english: "Англійська",
      ukrainian: "Українська",
      downloadPdf: "Завантажити PDF"
    }
  },
  resumes: {
    en: {
      profile: {
        name: "Dmytro Mykytiuk",
        title: "Python Developer",
        location: "Kyiv, Ukraine",
        phone: "+380506074864",
        email: "dima.mykytiuk1998@gmail.com"
      },
      links: [
        { label: "GitHub", url: "https://github.com/dima-mykytiuk" },
        { label: "Telegram", url: "https://t.me/dima_mykytiuk" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/dmytro-mykytiuk-9ab167253/" }
      ],
      summary:
        "Python Backend Developer with 2+ years of experience building high-load systems and large-scale integrations. Experienced in FastAPI and RESTful services, designing scalable architectures and asynchronous processing pipelines. Contributed to nationwide logistics and fiscal systems handling high daily throughput.",
      keyModules: [
        "Fiscalization (Receipt Processing)",
        "Payment Orchestration",
        "OMS (Order Management)",
        "ERP System Integrations",
        "WMS (Warehouse Management)",
        "CRM (Customer Data Management)",
        "API for Partner Integrations",
        "High-Volume Transaction Processing",
        "Asynchronous Event-Driven Processing",
        "Client Verification"
      ],
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
          period: "Aug 2021 — Oct 2022",
          certificateUrl: "./Dmytro Mykytiuk Python.pdf"
        },
        {
          title: "Fullstack Developer",
          provider: "GoIT",
          period: "Mar 2023 — Dec 2023",
          certificateUrl: "./Dmytro Mykytiuk Full_Stack.pdf"
        },
        {
          title: "AI-agents Pro",
          provider: "Fwdays Academy",
          period: "Mar 2026",
          certificateUrl: "./Dmytro Mykytiuk dwdays_AI PRO.pdf"
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
    },
    uk: {
      profile: {
        name: "Дмитро Микитюк",
        title: "Python Розробник",
        location: "Київ, Україна",
        phone: "+380506074864",
        email: "dima.mykytiuk1998@gmail.com"
      },
      links: [
        { label: "GitHub", url: "https://github.com/dima-mykytiuk" },
        { label: "Telegram", url: "https://t.me/dima_mykytiuk" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/dmytro-mykytiuk-9ab167253/" }
      ],
      summary:
        "Python Backend-розробник із понад 2 роками досвіду побудови високонавантажених систем і масштабних інтеграцій. Маю досвід із FastAPI та RESTful сервісами, проєктуванням масштабованих архітектур і асинхронних конвеєрів обробки. Брав участь у розвитку національних логістичних і фіскальних систем із великим щоденним навантаженням.",
      keyModules: [
        "Фіскалізація (обробка чеків)",
        "Платіжна оркестрація",
        "OMS (управління замовленнями)",
        "Інтеграції з ERP-системами",
        "WMS (складський облік)",
        "CRM (управління клієнтськими даними)",
        "API для партнерських інтеграцій",
        "Обробка великих масивів транзакцій",
        "Асинхронна event-driven обробка",
        "Верифікація клієнтів"
      ],
      projects: [
        {
          title: "Системи e-commerce та управління замовленнями",
          details:
            "Спроєктував і розробив backend-системи, що підтримують повний життєвий цикл замовлень і клієнтів для e-commerce платформ національного масштабу. Реалізував обробку замовлень, керування клієнтськими даними, інтеграції з ERP та автоматизовані сценарії відправлень."
        },
        {
          title: "Фіскальні та платіжні системи",
          details:
            "Розробляв високонавантажені системи фіскалізації та платіжної оркестрації. Реалізував онлайн/офлайн фіскалізацію, керування життєвим циклом чеків та event-driven обробку на Kafka, Celery, Redis і PostgreSQL."
        },
        {
          title: "Логістичні та складські системи",
          details:
            "Спроєктував WMS та системи керування пунктами видачі/прийому, що автоматизують облік запасів, керування життєвим циклом вантажів і верифікацію клієнтів у логістичних процесах."
        },
        {
          title: "Інтеграції з державними та національними програмами",
          details:
            "Реалізував backend-інтеграції для національних ініціатив із підтримкою безпечного обміну даними, обробки великих масивів отримувачів і масштабної логістичної координації."
        }
      ],
      workHistory: [
        {
          role: "Розробник програмного забезпечення",
          company: "АТ Укрпошта",
          city: "Київ",
          period: "Лип 2023 — Дотепер",
          details:
            "Співпрацював із продукт- та проєкт-менеджерами щодо проєктування і реалізації систем. Брав участь у модернізації легасі-систем, покращуючи продуктивність, стабільність і операційну ефективність."
        }
      ],
      education: [
        {
          degree: "Бакалавр з інженерії програмного забезпечення",
          institution: "Національний транспортний університет, Київ",
          period: "Вер 2016 — Чер 2020"
        },
        {
          degree: "Магістр з комп'ютерних наук",
          institution: "Національний транспортний університет, Київ",
          period: "Вер 2020 — Гру 2021"
        }
      ],
      courses: [
        {
          title: "Python Web та Data Science",
          provider: "GoIT",
          period: "Сер 2021 — Жов 2022",
          certificateUrl: "./Dmytro Mykytiuk Python.pdf"
        },
        {
          title: "Fullstack Developer",
          provider: "GoIT",
          period: "Бер 2023 — Гру 2023",
          certificateUrl: "./Dmytro Mykytiuk Full_Stack.pdf"
        },
        {
          title: "AI-agents Pro",
          provider: "Fwdays Academy",
          period: "Бер 2026",
          certificateUrl: "./Dmytro Mykytiuk dwdays_AI PRO.pdf"
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
      qualities: ["Бажання вчитися", "Працьовитість", "Спокій", "Ввічливість", "Креативність", "Гнучкість", "Чесність"],
      languages: ["Українська", "Англійська"]
    }
  }
};

export default resumeData;
