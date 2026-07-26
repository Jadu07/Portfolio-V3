"use client";

import { useState } from "react";
import { HomeConfig, Tool } from "@/lib/projects";

interface ToolsEditorProps {
  config: HomeConfig;
  onUpdate: (updatedConfig: HomeConfig) => void;
}

export const PRESET_TOOLS_LIBRARY: { name: string; slug: string; image: string; category: string }[] = [
  // 1. FRONTEND
  { name: "React", slug: "react", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
  { name: "Next.js", slug: "nextjs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend" },
  { name: "Vue.js", slug: "vuejs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", category: "Frontend" },
  { name: "Nuxt.js", slug: "nuxtjs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg", category: "Frontend" },
  { name: "Angular", slug: "angular", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg", category: "Frontend" },
  { name: "Svelte", slug: "svelte", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg", category: "Frontend" },
  { name: "SvelteKit", slug: "svelte", image: "https://cdn.simpleicons.org/svelte", category: "Frontend" },
  { name: "Remix", slug: "remix", image: "https://cdn.simpleicons.org/remix/white", category: "Frontend" },
  { name: "Astro", slug: "astro", image: "https://cdn.simpleicons.org/astro/white", category: "Frontend" },
  { name: "HTML5", slug: "html5", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Frontend" },
  { name: "CSS3", slug: "css3", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Frontend" },
  { name: "JavaScript", slug: "javascript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Frontend" },
  { name: "TypeScript", slug: "typescript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Frontend" },
  { name: "Tailwind CSS", slug: "tailwindcss", image: "https://cdn.simpleicons.org/tailwindcss", category: "Frontend" },
  { name: "Sass / SCSS", slug: "sass", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg", category: "Frontend" },
  { name: "Bootstrap", slug: "bootstrap", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", category: "Frontend" },
  { name: "Material UI", slug: "materialui", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg", category: "Frontend" },
  { name: "Chakra UI", slug: "chakraui", image: "https://cdn.simpleicons.org/chakraui", category: "Frontend" },
  { name: "Shadcn UI", slug: "shadcnui", image: "https://cdn.simpleicons.org/shadcnui/white", category: "Frontend" },
  { name: "Radix UI", slug: "radixui", image: "https://cdn.simpleicons.org/radixui/white", category: "Frontend" },
  { name: "Redux Toolkit", slug: "redux", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", category: "Frontend" },
  { name: "TanStack Query", slug: "reactquery", image: "https://cdn.simpleicons.org/reactquery", category: "Frontend" },
  { name: "Framer Motion", slug: "framer", image: "https://cdn.simpleicons.org/framer", category: "Frontend" },

  // 2. BACKEND & APIS
  { name: "Node.js", slug: "nodejs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" },
  { name: "Express.js", slug: "express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", category: "Backend" },
  { name: "NestJS", slug: "nestjs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg", category: "Backend" },
  { name: "Fastify", slug: "fastify", image: "https://cdn.simpleicons.org/fastify/white", category: "Backend" },
  { name: "Python", slug: "python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Backend" },
  { name: "Django", slug: "django", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", category: "Backend" },
  { name: "Flask", slug: "flask", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Backend" },
  { name: "FastAPI", slug: "fastapi", image: "https://cdn.simpleicons.org/fastapi", category: "Backend" },
  { name: "Go", slug: "go", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", category: "Backend" },
  { name: "Rust", slug: "rust", image: "https://cdn.simpleicons.org/rust/white", category: "Backend" },
  { name: "Java", slug: "java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Backend" },
  { name: "Spring Boot", slug: "spring", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", category: "Backend" },
  { name: "C++", slug: "cplusplus", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Backend" },
  { name: "C#", slug: "csharp", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", category: "Backend" },
  { name: ".NET", slug: "dot-net", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg", category: "Backend" },
  { name: "PHP", slug: "php", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", category: "Backend" },
  { name: "Laravel", slug: "laravel", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", category: "Backend" },
  { name: "Ruby", slug: "ruby", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg", category: "Backend" },
  { name: "Ruby on Rails", slug: "rails", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg", category: "Backend" },
  { name: "REST API", slug: "postman", image: "https://cdn.simpleicons.org/postman", category: "Backend" },
  { name: "GraphQL", slug: "graphql", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", category: "Backend" },
  { name: "gRPC", slug: "grpc", image: "https://cdn.simpleicons.org/grpc", category: "Backend" },
  { name: "Socket.IO", slug: "socketdotio", image: "https://cdn.simpleicons.org/socketdotio/white", category: "Backend" },
  { name: "WebSockets", slug: "websocket", image: "https://cdn.simpleicons.org/websocket", category: "Backend" },
  { name: "RabbitMQ", slug: "rabbitmq", image: "https://cdn.simpleicons.org/rabbitmq", category: "Backend" },
  { name: "Apache Kafka", slug: "apachekafka", image: "https://cdn.simpleicons.org/apachekafka/white", category: "Backend" },

  // 3. DATABASES & ORM
  { name: "PostgreSQL", slug: "postgresql", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Databases" },
  { name: "MongoDB", slug: "mongodb", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Databases" },
  { name: "MySQL", slug: "mysql", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Databases" },
  { name: "SQLite", slug: "sqlite", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", category: "Databases" },
  { name: "Redis", slug: "redis", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", category: "Databases" },
  { name: "Upstash Redis", slug: "upstash", image: "https://cdn.simpleicons.org/upstash", category: "Databases" },
  { name: "Prisma", slug: "prisma", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", category: "Databases" },
  { name: "Drizzle ORM", slug: "drizzle", image: "https://cdn.simpleicons.org/drizzle", category: "Databases" },
  { name: "Supabase", slug: "supabase", image: "https://cdn.simpleicons.org/supabase", category: "Databases" },
  { name: "Firebase", slug: "firebase", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "Databases" },
  { name: "DynamoDB", slug: "amazondynamodb", image: "https://cdn.simpleicons.org/amazondynamodb", category: "Databases" },
  { name: "Cassandra", slug: "apachecassandra", image: "https://cdn.simpleicons.org/apachecassandra", category: "Databases" },
  { name: "TypeORM", slug: "typeorm", image: "https://cdn.simpleicons.org/typeorm", category: "Databases" },
  { name: "Mongoose", slug: "mongoose", image: "https://cdn.simpleicons.org/mongoose", category: "Databases" },

  // 4. CLOUD & DEVOPS
  { name: "AWS", slug: "amazonwebservices", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "Cloud & DevOps" },
  { name: "Google Cloud", slug: "googlecloud", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", category: "Cloud & DevOps" },
  { name: "Microsoft Azure", slug: "azure", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", category: "Cloud & DevOps" },
  { name: "Vercel", slug: "vercel", image: "https://cdn.simpleicons.org/vercel/white", category: "Cloud & DevOps" },
  { name: "Netlify", slug: "netlify", image: "https://cdn.simpleicons.org/netlify", category: "Cloud & DevOps" },
  { name: "Cloudflare", slug: "cloudflare", image: "https://cdn.simpleicons.org/cloudflare", category: "Cloud & DevOps" },
  { name: "DigitalOcean", slug: "digitalocean", image: "https://cdn.simpleicons.org/digitalocean", category: "Cloud & DevOps" },
  { name: "Render", slug: "render", image: "https://cdn.simpleicons.org/render", category: "Cloud & DevOps" },
  { name: "Fly.io", slug: "flydotio", image: "https://cdn.simpleicons.org/flydotio", category: "Cloud & DevOps" },
  { name: "Docker", slug: "docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "Cloud & DevOps" },
  { name: "Kubernetes", slug: "kubernetes", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", category: "Cloud & DevOps" },
  { name: "CI / CD", slug: "githubactions", image: "https://cdn.simpleicons.org/githubactions", category: "Cloud & DevOps" },
  { name: "GitHub Actions", slug: "githubactions", image: "https://cdn.simpleicons.org/githubactions", category: "Cloud & DevOps" },
  { name: "Nginx", slug: "nginx", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg", category: "Cloud & DevOps" },
  { name: "PM2", slug: "pm2", image: "https://cdn.simpleicons.org/pm2", category: "Cloud & DevOps" },
  { name: "Terraform", slug: "terraform", image: "https://cdn.simpleicons.org/terraform", category: "Cloud & DevOps" },

  // 5. AUTHENTICATION & VALIDATION
  { name: "Clerk", slug: "clerk", image: "https://cdn.simpleicons.org/clerk", category: "Auth & Validation" },
  { name: "NextAuth.js", slug: "nextdotjs", image: "https://cdn.simpleicons.org/nextdotjs/white", category: "Auth & Validation" },
  { name: "Auth.js", slug: "auth0", image: "https://cdn.simpleicons.org/auth0", category: "Auth & Validation" },
  { name: "Zod", slug: "zod", image: "https://cdn.simpleicons.org/zod", category: "Auth & Validation" },
  { name: "React Hook Form", slug: "reacthookform", image: "https://cdn.simpleicons.org/reacthookform", category: "Auth & Validation" },
  { name: "Joi", slug: "joi", image: "https://cdn.simpleicons.org/joi", category: "Auth & Validation" },
  { name: "Bcrypt", slug: "security", image: "https://cdn.simpleicons.org/letsencrypt", category: "Auth & Validation" },
  { name: "Passport.js", slug: "passport", image: "https://cdn.simpleicons.org/passport", category: "Auth & Validation" },
  { name: "JWT", slug: "jsonwebtokens", image: "https://cdn.simpleicons.org/jsonwebtokens", category: "Auth & Validation" },

  // 6. TOOLS & IDES
  { name: "Git", slug: "git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tools" },
  { name: "GitHub", slug: "github", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "Tools" },
  { name: "GitLab", slug: "gitlab", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg", category: "Tools" },
  { name: "VS Code", slug: "vscode", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", category: "Tools" },
  { name: "Postman", slug: "postman", image: "https://cdn.simpleicons.org/postman", category: "Tools" },
  { name: "Insomnia", slug: "insomnia", image: "https://cdn.simpleicons.org/insomnia", category: "Tools" },
  { name: "Thunder Client", slug: "thunderclient", image: "https://cdn.simpleicons.org/thunderbird", category: "Tools" },
  { name: "Hoppscotch", slug: "hoppscotch", image: "https://cdn.simpleicons.org/hoppscotch", category: "Tools" },

  // 7. PACKAGE MANAGERS & BUNDLERS
  { name: "npm", slug: "npm", image: "https://cdn.simpleicons.org/npm", category: "Package Managers" },
  { name: "pnpm", slug: "pnpm", image: "https://cdn.simpleicons.org/pnpm", category: "Package Managers" },
  { name: "Yarn", slug: "yarn", image: "https://cdn.simpleicons.org/yarn", category: "Package Managers" },
  { name: "Bun", slug: "bun", image: "https://cdn.simpleicons.org/bun", category: "Package Managers" },
  { name: "Vite", slug: "vite", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg", category: "Package Managers" },
  { name: "Webpack", slug: "webpack", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg", category: "Package Managers" },
  { name: "Turbopack", slug: "turborepo", image: "https://cdn.simpleicons.org/turborepo", category: "Package Managers" },

  // 8. UTILITIES & DEV TOOLS
  { name: "ESLint", slug: "eslint", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg", category: "Utilities" },
  { name: "Prettier", slug: "prettier", image: "https://cdn.simpleicons.org/prettier", category: "Utilities" },
  { name: "Husky", slug: "husky", image: "https://cdn.simpleicons.org/git", category: "Utilities" },
  { name: "Lint Staged", slug: "lintstaged", image: "https://cdn.simpleicons.org/eslint", category: "Utilities" },
  { name: "Swagger", slug: "swagger", image: "https://cdn.simpleicons.org/swagger", category: "Utilities" },

  // 9. STORAGE & FILES
  { name: "AWS S3", slug: "amazonaws", image: "https://cdn.simpleicons.org/amazonaws", category: "Storage & Files" },
  { name: "Cloudinary", slug: "cloudinary", image: "https://cdn.simpleicons.org/cloudinary", category: "Storage & Files" },
  { name: "Supabase Storage", slug: "supabase", image: "https://cdn.simpleicons.org/supabase", category: "Storage & Files" },
  { name: "UploadThing", slug: "uploadthing", image: "https://cdn.simpleicons.org/uploadthing", category: "Storage & Files" },
  { name: "Firebase Storage", slug: "firebase", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "Storage & Files" },

  // 10. UI & ICONS
  { name: "Lucide Icons", slug: "lucide", image: "https://cdn.simpleicons.org/lucide", category: "UI & Icons" },
  { name: "Heroicons", slug: "heroicons", image: "https://cdn.simpleicons.org/heroicons", category: "UI & Icons" },
  { name: "React Icons", slug: "reacticons", image: "https://cdn.simpleicons.org/react", category: "UI & Icons" },
  { name: "Font Awesome", slug: "fontawesome", image: "https://cdn.simpleicons.org/fontawesome", category: "UI & Icons" },

  // 11. COMMUNICATION & COLLABORATION
  { name: "Slack", slug: "slack", image: "https://cdn.simpleicons.org/slack", category: "Collaboration" },
  { name: "Discord", slug: "discord", image: "https://cdn.simpleicons.org/discord", category: "Collaboration" },
  { name: "Microsoft Teams", slug: "microsoftteams", image: "https://cdn.simpleicons.org/microsoftteams", category: "Collaboration" },
  { name: "Notion", slug: "notion", image: "https://cdn.simpleicons.org/notion/white", category: "Collaboration" },
  { name: "Trello", slug: "trello", image: "https://cdn.simpleicons.org/trello", category: "Collaboration" },
  { name: "Figma", slug: "figma", image: "https://cdn.simpleicons.org/figma", category: "Collaboration" },
  { name: "Linear", slug: "linear", image: "https://cdn.simpleicons.org/linear/white", category: "Collaboration" },
  { name: "Jira", slug: "jira", image: "https://cdn.simpleicons.org/jira", category: "Collaboration" },

  // 12. CHARTS & DATA VISUALIZATION
  { name: "Recharts", slug: "recharts", image: "https://cdn.simpleicons.org/chartdotjs", category: "Charts" },
  { name: "Chart.js", slug: "chartdotjs", image: "https://cdn.simpleicons.org/chartdotjs", category: "Charts" },
  { name: "ApexCharts", slug: "apexcharts", image: "https://cdn.simpleicons.org/apexcharts", category: "Charts" },
  { name: "AG Grid", slug: "aggrid", image: "https://cdn.simpleicons.org/grid", category: "Charts" },
  { name: "D3.js", slug: "d3dotjs", image: "https://cdn.simpleicons.org/d3dotjs", category: "Charts" },

  // 13. MONITORING & ANALYTICS
  { name: "Sentry", slug: "sentry", image: "https://cdn.simpleicons.org/sentry", category: "Monitoring & Analytics" },
  { name: "LogRocket", slug: "logrocket", image: "https://cdn.simpleicons.org/logrocket", category: "Monitoring & Analytics" },
  { name: "Datadog", slug: "datadog", image: "https://cdn.simpleicons.org/datadog", category: "Monitoring & Analytics" },
  { name: "Google Analytics", slug: "googleanalytics", image: "https://cdn.simpleicons.org/googleanalytics", category: "Monitoring & Analytics" },
  { name: "PostHog", slug: "posthog", image: "https://cdn.simpleicons.org/posthog", category: "Monitoring & Analytics" },

  // 14. CMS & CONTENT
  { name: "Contentful", slug: "contentful", image: "https://cdn.simpleicons.org/contentful", category: "CMS & Content" },
  { name: "Strapi", slug: "strapi", image: "https://cdn.simpleicons.org/strapi", category: "CMS & Content" },
  { name: "Sanity", slug: "sanity", image: "https://cdn.simpleicons.org/sanity", category: "CMS & Content" },
  { name: "MDX", slug: "mdx", image: "https://cdn.simpleicons.org/mdx", category: "CMS & Content" },
  { name: "Payload CMS", slug: "payloadcms", image: "https://cdn.simpleicons.org/payloadcms/white", category: "CMS & Content" },
  { name: "WordPress", slug: "wordpress", image: "https://cdn.simpleicons.org/wordpress", category: "CMS & Content" },

  // 15. AI/ML & APIS
  { name: "OpenAI", slug: "openai", image: "https://cdn.simpleicons.org/openai/white", category: "AI / ML" },
  { name: "Gemini (Google AI)", slug: "googlegemini", image: "https://cdn.simpleicons.org/googlegemini", category: "AI / ML" },
  { name: "Hugging Face", slug: "huggingface", image: "https://cdn.simpleicons.org/huggingface", category: "AI / ML" },
  { name: "LangChain", slug: "langchain", image: "https://cdn.simpleicons.org/langchain", category: "AI / ML" },
  { name: "Pinecone", slug: "pinecone", image: "https://cdn.simpleicons.org/pinecone", category: "AI / ML" },
  { name: "PyTorch", slug: "pytorch", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", category: "AI / ML" },
  { name: "TensorFlow", slug: "tensorflow", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "AI / ML" },

  // 16. OPERATING SYSTEMS & BROWSERS
  { name: "Windows", slug: "windows", image: "https://cdn.simpleicons.org/windows11", category: "OS & Browsers" },
  { name: "macOS", slug: "apple", image: "https://cdn.simpleicons.org/apple/white", category: "OS & Browsers" },
  { name: "Linux", slug: "linux", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "OS & Browsers" },
  { name: "Chrome", slug: "googlechrome", image: "https://cdn.simpleicons.org/googlechrome", category: "OS & Browsers" },
  { name: "Firefox", slug: "firefox", image: "https://cdn.simpleicons.org/firefox", category: "OS & Browsers" },
  { name: "Edge", slug: "microsoftedge", image: "https://cdn.simpleicons.org/microsoftedge", category: "OS & Browsers" },
  { name: "Safari", slug: "safari", image: "https://cdn.simpleicons.org/safari", category: "OS & Browsers" },
  { name: "Brave", slug: "brave", image: "https://cdn.simpleicons.org/brave", category: "OS & Browsers" },

  // 17. LANGUAGES
  { name: "Python", slug: "python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Languages" },
  { name: "Java", slug: "java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Languages" },
  { name: "C++", slug: "cplusplus", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Languages" },
  { name: "Go", slug: "go", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", category: "Languages" },
  { name: "Rust", slug: "rust", image: "https://cdn.simpleicons.org/rust/white", category: "Languages" },
  { name: "Swift", slug: "swift", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", category: "Languages" },
  { name: "Kotlin", slug: "kotlin", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", category: "Languages" },
  { name: "Dart", slug: "dart", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", category: "Languages" },
  { name: "Shell / Bash", slug: "gnubash", image: "https://cdn.simpleicons.org/gnubash/white", category: "Languages" },
  { name: "SQL", slug: "sql", image: "https://cdn.simpleicons.org/sqlite", category: "Languages" }
];

export default function ToolsEditor({ config, onUpdate }: ToolsEditorProps) {
  const tools: Tool[] = (config.tools && config.tools.length > 0)
    ? config.tools.map(t => ({ ...t, isEnabled: t.isEnabled !== false }))
    : PRESET_TOOLS_LIBRARY.slice(0, 30).map(p => ({ ...p, isEnabled: true }));

  const [search, setSearch] = useState("");
  const [librarySearch, setLibrarySearch] = useState("");
  const [showLibrary, setShowLibrary] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = [
    "All", "Frontend", "Backend", "Databases", "Cloud & DevOps", 
    "Auth & Validation", "Tools", "Package Managers", "Utilities", 
    "Storage & Files", "UI & Icons", "Collaboration", "Charts", 
    "Monitoring & Analytics", "CMS & Content", "AI / ML", "OS & Browsers", "Languages"
  ];

  const handleToolChange = (index: number, field: keyof Tool, value: any) => {
    const updatedTools = [...tools];
    updatedTools[index] = { ...updatedTools[index], [field]: value };
    onUpdate({ ...config, tools: updatedTools });
  };

  const handleToggleEnable = (index: number) => {
    const updatedTools = [...tools];
    updatedTools[index] = { ...updatedTools[index], isEnabled: !updatedTools[index].isEnabled };
    onUpdate({ ...config, tools: updatedTools });
  };

  const handleAddCustomTool = () => {
    const newTool: Tool = { name: "New Tool", slug: "new-tool", image: "https://cdn.simpleicons.org/code/white", isEnabled: true };
    onUpdate({ ...config, tools: [...tools, newTool] });
  };

  const handleAddPreset = (preset: typeof PRESET_TOOLS_LIBRARY[0]) => {
    if (tools.some(t => t.name.toLowerCase() === preset.name.toLowerCase())) return;
    const newTool: Tool = { name: preset.name, slug: preset.slug, image: preset.image, isEnabled: true, category: preset.category };
    onUpdate({ ...config, tools: [...tools, newTool] });
  };

  const handleAddAllFromCategory = (cat: string) => {
    const categoryPresets = PRESET_TOOLS_LIBRARY.filter(p => cat === "All" || p.category === cat);
    const newTools = [...tools];
    categoryPresets.forEach(preset => {
      if (!newTools.some(t => t.name.toLowerCase() === preset.name.toLowerCase())) {
        newTools.push({ name: preset.name, slug: preset.slug, image: preset.image, isEnabled: true, category: preset.category });
      }
    });
    onUpdate({ ...config, tools: newTools });
  };

  const handleRemoveTool = (index: number) => {
    const updatedTools = tools.filter((_, i) => i !== index);
    onUpdate({ ...config, tools: updatedTools });
  };

  const handleMoveTool = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const updatedTools = [...tools];
      const temp = updatedTools[index];
      updatedTools[index] = updatedTools[index - 1];
      updatedTools[index - 1] = temp;
      onUpdate({ ...config, tools: updatedTools });
    } else if (direction === 'down' && index < tools.length - 1) {
      const updatedTools = [...tools];
      const temp = updatedTools[index];
      updatedTools[index] = updatedTools[index + 1];
      updatedTools[index + 1] = temp;
      onUpdate({ ...config, tools: updatedTools });
    }
  };

  const handleEnableAll = (enable: boolean) => {
    const updatedTools = tools.map(t => ({ ...t, isEnabled: enable }));
    onUpdate({ ...config, tools: updatedTools });
  };

  const handleResetDefaults = () => {
    if (confirm("Reset tools list back to 200+ curated presets library?")) {
      const defaultList = PRESET_TOOLS_LIBRARY.slice(0, 35).map(p => ({ ...p, isEnabled: true }));
      onUpdate({ ...config, tools: defaultList });
    }
  };

  const filteredTools = tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header & Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-semibold text-white">Tools Marquee (200+ Library)</h2>
          <p className="text-xs text-white/50 mt-1">
            Active: {tools.length} | Visible on Website: {tools.filter(t => t.isEnabled !== false).length}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowLibrary(!showLibrary)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Preset Library ({PRESET_TOOLS_LIBRARY.length} Tools)
          </button>
          <button
            onClick={handleAddCustomTool}
            className="bg-white/15 hover:bg-white/20 text-white px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border border-white/15"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            + Custom Tool
          </button>
        </div>
      </div>

      {/* Preset Library Quick Add Drawer */}
      {showLibrary && (
        <div className="bg-[#111622] p-5 rounded-2xl border border-blue-500/40 flex flex-col gap-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-sm text-blue-400 flex items-center gap-2">
                <span>📚 200+ Pre-Hardcoded Tools Library</span>
              </h3>
              <p className="text-xs text-white/40 mt-0.5">Click any tool to add it immediately to your marquee stack.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAddAllFromCategory(filterCategory)}
                className="text-xs bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-3 py-1.5 rounded-lg border border-blue-500/30 transition-all font-medium"
              >
                + Add All {filterCategory !== "All" ? filterCategory : "200+"} Tools
              </button>
              <button onClick={() => setShowLibrary(false)} className="text-xs text-white/50 hover:text-white px-2 py-1">
                Close ✕
              </button>
            </div>
          </div>

          {/* Search Library */}
          <input
            type="text"
            placeholder="Search preset tools library (e.g., Supabase, Docker, Framer Motion, Redis)..."
            value={librarySearch}
            onChange={(e) => setLibrarySearch(e.target.value)}
            className="bg-black/60 border border-blue-500/30 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-400 w-full"
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 max-h-[90px] overflow-y-auto pr-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  filterCategory === cat 
                    ? "bg-blue-500 text-white shadow" 
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of 200+ Tools */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-[320px] overflow-y-auto pr-1 pt-1 border-t border-white/10">
            {PRESET_TOOLS_LIBRARY
              .filter(p => filterCategory === "All" || p.category === filterCategory)
              .filter(p => p.name.toLowerCase().includes(librarySearch.toLowerCase()))
              .map((preset, pIdx) => {
                const isAdded = tools.some(t => t.name.toLowerCase() === preset.name.toLowerCase());
                return (
                  <button
                    key={pIdx}
                    onClick={() => handleAddPreset(preset)}
                    disabled={isAdded}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-all ${
                      isAdded 
                        ? "bg-white/[0.02] border-white/5 opacity-35 cursor-not-allowed text-white/30" 
                        : "bg-white/5 border-white/10 hover:bg-blue-500/20 hover:border-blue-500/40 text-white"
                    }`}
                  >
                    <img src={preset.image} alt={preset.name} className="w-4 h-4 object-contain shrink-0" />
                    <span className="truncate flex-1 font-medium">{preset.name}</span>
                    <span className="text-[10px] font-bold text-white/40">{isAdded ? "ADDED" : "+ ADD"}</span>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Global Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <input
          type="text"
          placeholder="Search your tools list..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-black/50 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30 w-full sm:w-[260px]"
        />

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => handleEnableAll(true)}
            className="text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-all"
          >
            Enable All
          </button>
          <button
            onClick={() => handleEnableAll(false)}
            className="text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-all"
          >
            Disable All
          </button>
          <button
            onClick={handleResetDefaults}
            className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/20 transition-all"
          >
            Restore Defaults
          </button>
        </div>
      </div>

      {/* Tools Cards List */}
      <div className="flex flex-col gap-3">
        {filteredTools.map((tool, index) => {
          const originalIndex = tools.findIndex(t => t.name === tool.name && t.image === tool.image);
          const idx = originalIndex !== -1 ? originalIndex : index;
          const isEnabled = tool.isEnabled !== false;

          return (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border flex flex-col gap-4 group transition-all ${
                isEnabled 
                  ? "bg-white/5 border-white/10 hover:border-white/20" 
                  : "bg-white/[0.02] border-white/5 opacity-60 hover:opacity-100"
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={() => handleToggleEnable(idx)}
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                    />
                    <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isEnabled ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40"
                    }`}>
                      {isEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </label>
                  <h3 className="font-medium text-white/90 text-sm">
                    {tool.name || `Tool #${idx + 1}`}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveTool(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMoveTool(idx, 'down')}
                    disabled={idx === tools.length - 1}
                    className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleRemoveTool(idx)}
                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-1"
                    title="Delete Tool"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Input Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-white/60">Tool Name</label>
                  <input
                    type="text"
                    value={tool.name}
                    onChange={(e) => handleToolChange(idx, "name", e.target.value)}
                    placeholder="e.g. Next.js"
                    className="bg-black/50 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-white/60">Icon URL (SVG / PNG / devicon / simpleicons)</label>
                  <input
                    type="text"
                    value={tool.image}
                    onChange={(e) => handleToolChange(idx, "image", e.target.value)}
                    placeholder="https://cdn.simpleicons.org/nextdotjs"
                    className="bg-black/50 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              {/* Icon Preview */}
              {tool.image && (
                <div className="flex items-center gap-3 p-2.5 bg-black/40 rounded-lg border border-white/5 shrink-0">
                  <span className="text-xs text-white/40">Preview Icon:</span>
                  <img src={tool.image} alt={tool.name} className="w-6 h-6 object-contain opacity-90" />
                </div>
              )}
            </div>
          );
        })}

        {filteredTools.length === 0 && (
          <div className="text-center py-12 text-white/40 bg-white/5 rounded-xl border border-white/10 border-dashed flex flex-col gap-2 items-center">
            <span>No tools match your filter.</span>
            <button onClick={handleAddCustomTool} className="text-xs text-blue-400 hover:underline">
              Add a new custom tool
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
