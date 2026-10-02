import type { ResumeData } from "@/lib/types";

export const RESUME_DATA: ResumeData = {
  name: "Sharifah Rahmah",
  initials: "SR",

  location: "Kuala Lumpur, Malaysia",

  locationLink: "https://www.google.com/maps/place/Kuala+Lumpur,+Malaysia",

  about: "Junior Cloud Engineer | Cloud Support | Cloud Operations",

  summary:
    "Entry-level Cloud and IT professional with hands-on experience building and deploying AWS serverless, containerized, and infrastructure-as-code projects. Experienced in IT systems maintenance, technical troubleshooting, system monitoring, access management, backup and recovery, and incident resolution. CompTIA Security+ and ISO/IEC 27001:2022 Lead Auditor certified, with prior experience in web application security testing and responsible disclosure of 20+ vulnerabilities.",

  avatarUrl: "https://avatars.githubusercontent.com/u/62753914?v=4",

  personalWebsiteUrl: "",

  contact: {
    email: "stinkifolk@gmail.com",
    tel: "016-940 2402",

    social: [
      {
        name: "GitHub",
        url: "https://github.com/stinkifolk",
        icon: "github",
      },
    ],
  },

  certifications: [
    {
      title: "CompTIA Security+",
      issuer: "Credly",
      date: "May 2026",
    },
    {
      title: "ISO/IEC 27001:2022 Lead Auditor",
      issuer: "Credly",
      date: "May 2025",
    },
    {
      title: "AWS Re/Start Certified Cloud Practitioner",
      issuer: "AWS",
      date: "Exam preparation in progress",
    },
  ],

  keyCertification: {
    title: "CompTIA Security+",
    issuer: "Credly",
    date: "May 2026",
  },

  skills: [
    "AWS",
    "S3",
    "Lambda",
    "API Gateway",
    "DynamoDB",
    "CloudFront",
    "EC2",
    "VPC",
    "RDS",
    "Route 53",
    "ECS",
    "ECR",
    "IAM",
    "CloudWatch",
    "SNS",
    "Python",
    "SQL",
    "Bash",
    "Terraform",
    "Infrastructure as Code (IaC)",
    "Docker",
    "Git",
    "GitHub Actions",
    "CI/CD",
    "System Monitoring",
    "Technical Troubleshooting",
    "Backup & Recovery",
    "Access Management",
    "Incident Resolution",
    "System Maintenance",
    "Cloud Security Fundamentals",
    "Vulnerability Assessment",
    "OWASP",
    "Burp Suite",
    "OWASP ZAP",
    "Team Leadership",
    "Stakeholder Management",
    "Strategic Partnerships",
    "Vendor Management",
  ],

  skillsByCategory: [
    {
      name: "Cloud and Software",
      skills: [
        "AWS",
        "S3",
        "Lambda",
        "API Gateway",
        "DynamoDB",
        "CloudFront",
        "EC2",
        "VPC",
        "RDS",
        "Route 53",
        "ECS",
        "ECR",
        "IAM",
        "CloudWatch",
        "SNS",
      ],
    },
    {
      name: "Programming & Automation",
      skills: ["Python", "SQL", "Bash"],
    },
    {
      name: "DevOps & Tools",
      skills: [
        "Terraform",
        "Infrastructure as Code (IaC)",
        "Docker",
        "Git",
        "GitHub Actions",
        "CI/CD",
      ],
    },
    {
      name: "IT Operations",
      skills: [
        "System Monitoring",
        "Technical Troubleshooting",
        "Backup & Recovery",
        "Access Management",
        "Incident Resolution",
        "System Maintenance",
      ],
    },
    {
      name: "Security",
      skills: [
        "Cloud Security Fundamentals",
        "IAM",
        "Vulnerability Assessment",
        "OWASP",
        "Burp Suite",
        "OWASP ZAP",
      ],
    },
    {
      name: "Leadership",
      description:
        "Lead and developed highly trained teams in the design firm ranging in size from 25",
    },
    {
      name: "Agile and Project Management",
      description:
        "Managed IT Migration and Contract Manufacturing projects in Public and Private Sectors using both Waterfall, Agile, and SAFe framework,",
    },
    {
      name: "Leadership & Business",
      skills: [
        "Team Leadership",
        "Stakeholder Management",
        "Strategic Partnerships",
        "Vendor Management",
      ],
    },
  ],

  projects: [
    {
      title: "AWS Cloud Resume Challenge",
      techStack: [
        "S3",
        "CloudFront",
        "Lambda",
        "API Gateway",
        "DynamoDB",
        "Python",
        "GitHub Actions",
        "Infrastructure as Code",
      ],
      description:
        "Built and deployed a serverless resume website on AWS using S3, CloudFront, API Gateway, Lambda, and DynamoDB.",
      highlights: [
        "Implemented a visitor counter with a serverless API and DynamoDB backend.",
        "Automated testing and deployment using GitHub Actions and Infrastructure as Code.",
      ],
      attribution: {
        text: "Built and deployed as part of the",
        linkText: "AWS Cloud Resume Challenge",
        href: "https://github.com/stinkifolk",
      },
      link: {
        label: "GitHub",
        href: "https://github.com/stinkifolk",
      },
    },
    {
      title: "AWS Cloud Cost Calculator",
      techStack: [
        "Lambda",
        "Cost Explorer API",
        "SNS",
        "CloudWatch",
        "Python",
        "Terraform",
      ],
      description:
        "Built a serverless AWS cost analysis tool using Cost Explorer API and Lambda to analyze usage trends and trigger alerts.",
      highlights: [
        "Built a serverless AWS cost analysis tool using Cost Explorer API and Lambda to analyze usage trends, estimate monthly spend, and trigger automated cost alerts.",
        "Provisioned infrastructure with Terraform for repeatable deployment and teardown.",
      ],
      link: {
        label: "GitHub",
        href: "https://github.com/stinkifolk",
      },
    },
    {
      title: "Automated Backup System",
      techStack: ["S3", "Backup", "IAM", "CloudWatch", "Python"],
      description:
        "Built an automated AWS backup and restore workflow using S3 versioning, lifecycle policies, and event-driven automation.",
      highlights: [
        "Built an automated AWS backup and restore workflow using S3 versioning, lifecycle policies, IAM, and event-driven automation.",
        "Provisioned storage, IAM policies, and event triggers with Terraform and validated recovery by restoring previous object versions.",
      ],
      link: {
        label: "GitHub",
        href: "https://github.com/stinkifolk",
      },
    },
    {
      title: "Website Uptime Monitor",
      techStack: ["Lambda", "SNS", "CloudWatch", "Python"],
      description:
        "Built a serverless website monitoring service using Lambda, CloudWatch, and SNS to periodically check endpoint availability.",
      highlights: [
        "Built a serverless website monitoring service using Lambda, CloudWatch, and SNS to periodically check endpoint availability and send failure notifications.",
        "Implemented GitHub Actions CI/CD to automatically test and deploy Lambda function updates.",
      ],
      link: {
        label: "GitHub",
        href: "https://github.com/stinkifolk",
      },
    },
  ],

  work: [
    {
      company: "Career Development",
      link: null,
      badges: [
        "AWS",
        "Serverless",
        "Lambda",
        "API Gateway",
        "DynamoDB",
        "EC2",
        "RDS",
        "VPC",
        "Route 53",
        "Auto Scaling",
        "ECS",
        "ECR",
        "S3",
        "CloudFront",
      ],
      title: "Cloud Engineering Career Development",
      start: "Feb 2023",
      end: null,
      description:
        "Developed practical AWS experience across serverless computing, containers, networking, databases, monitoring, security, and infrastructure as code.",
      highlights: [
        "Developed practical AWS experience across serverless computing, containers, networking, databases, monitoring, security, and infrastructure as code.",
        "Designed and deployed learning architectures using Lambda, API Gateway, DynamoDB, EC2, RDS, VPC, Route 53, Auto Scaling, ECS, ECR, S3, and CloudFront.",
        "Applied AWS Well-Architected principles covering security, reliability, performance efficiency, and cost optimization through hands-on labs and projects.",
      ],
    },
    {
      company: "Globe Tech Services Sdn Bhd",
      link: null,
      badges: [
        "IT Infrastructure",
        "System Monitoring",
        "Network Services",
        "Hardware & Software",
        "Troubleshooting",
        "Access Management",
        "Backup & Recovery",
      ],
      title: "IT Systems Maintenance Officer",
      start: "Jan 2020",
      end: "Jan 2023",
      description:
        "Maintained and monitored IT infrastructure, systems, network services, hardware, and software to support system availability and reliable day-to-day operations.",
      highlights: [
        "Maintained and monitored IT infrastructure, systems, network services, hardware, and software to support system availability and reliable day-to-day operations.",
        "Troubleshot system, network, and application issues using structured diagnostic approaches and escalated complex incidents when required.",
        "Managed user access, system configurations, software updates, backups, and preventive maintenance to support security, reliability, and business continuity.",
        "Monitored system performance and availability, investigated incidents, and implemented corrective actions to minimize service disruptions.",
      ],
    },
    {
      company: "AMA Interior Design",
      link: null,
      badges: [
        "Design Practice",
        "Project Management",
        "Team Leadership",
        "Stakeholder Communication",
      ],
      title: "Interior Designer",
      start: "Jan 2019",
      end: "Dec 2020",
      description:
        "Founded and managed a design practice, coordinating multidisciplinary teams, clients, consultants, and project delivery across residential, commercial, and hospitality projects.",
      highlights: [
        "Founded and managed a design practice, coordinating multidisciplinary teams, clients, consultants, and project delivery across residential, commercial, and hospitality projects.",
        "Managed project schedules, documentation, stakeholder communication, and delivery from concept through completion.",
      ],
    },
    {
      company: "Veritas Architect Sdn Bhd",
      link: null,
      badges: [
        "Architectural Drawings",
        "Technical Details",
        "Presentations",
        "Building Regulations",
      ],
      title: "Assistant Architect",
      start: "Aug 2017",
      end: "Dec 2019",
      description:
        "Prepare and coordinate architectural drawings, working drawings, technical details, presentations, and documentation.",
      highlights: [
        "Prepare and coordinate architectural drawings, working drawings, technical details, presentations, and documentation.",
        "Ensure project documentation and design work comply with building regulations, standards, and project requirements.",
      ],
    },
  ],

  education: [
    {
      school: "University Science of Malaysia",
      degree: "Bsc (H) Interior Design",
      start: "Sep 2014",
      end: "Jun 2017",
    },
  ],

  otherExperience: [
    {
      company: "Sabbatical (Europe, South-East Asia)",
      link: null,
      badges: ["Sabbatical", "Career Exploration", "Cloud & IT Transition"],
      title: "Career Break",
      start: "Sep 2022",
      end: "Jan 2023",
      description:
        "International travel and professional career exploration, followed by focused transition into cloud computing and IT.",
      highlights: [
        "International travel and professional career exploration, followed by focused transition into cloud computing and IT.",
      ],
    },
    {
      company: "HackerOne (Remote)",
      link: "https://www.hackerone.com/",
      badges: [
        "Web Security",
        "Vulnerability Disclosure",
        "IDOR",
        "XSS",
        "Broken Authentication",
        "PoC Reports",
      ],
      title: "Bug Bounty Hunter",
      start: "Mar 2017",
      end: "Apr 2019",
      description:
        "Conducted security testing of public-facing web applications through responsible vulnerability disclosure programs.",
      highlights: [
        "Conducted security testing of public-facing web applications through responsible vulnerability disclosure programs.",
        "Identified and responsibly disclosed 20+ vulnerabilities across 10+ application scopes, including IDOR, XSS, and broken authentication.",
        "Produced reproducible proof-of-concept reports documenting attack vectors, business impact, reproduction steps, and remediation guidance.",
      ],
    },
    {
      company: "STEM / LEGO Education Instructor",
      link: null,
      badges: [
        "STEM Education",
        "LEGO Education",
        "Design Thinking",
        "Problem Solving",
      ],
      title: "Professional Tutor",
      start: "Mar 2017",
      end: "Apr 2019",
      description:
        "Tutored and delivered STEM and design-thinking learning experiences using LEGO Education systems.",
      highlights: [
        "Tutored and delivered STEM and design-thinking learning experiences using LEGO Education systems.",
        "Designed instructional sessions covering STEM, problem-solving, and design-thinking concepts.",
        "Guided students through project-based development, iterative problem solving, and collaborative presentations.",
      ],
    },
  ],

  volunteering: [
    {
      role: "Economic Empowerment Volunteer",
      organization: "Hopes Malaysia Impact Hub",
      location: "Malaysia",
      start: "Jul 2019",
      end: "Aug 2019",
      description:
        "Led empowerment oriented initiatives in a local NGO in Malaysia by providing lectures to staff on team building exercises, effective communication techniques, and stress management tools, as a means to economically empower the local underprivileged women and children.",
      highlights: [
        "Led empowerment oriented initiatives in a local NGO in Malaysia by providing lectures to staff on team building exercises, effective communication techniques, and stress management tools, as a means to economically empower the local underprivileged women and children.",
      ],
    },
  ],

  interests: [
    "Rock climbing",
    "Marathon running",
    "International travel",
    "Volunteering",
  ],

  languages: [
    {
      name: "English",
      level: "Fluent",
    },
    {
      name: "Malay",
      level: "Fluent",
    },
  ],
} as const;
