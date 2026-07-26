export interface ProjectButton {
  text: string;
  link: string;
  isEnabled: boolean;
  isPrimary?: boolean;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectData {
  id: string;
  title: string;
  desc: string;
  image?: string;
  video?: string;
  poster?: string;
  stats: ProjectStat[];
  isFeatured: boolean;
  order: number;
  cardLink?: string;
  contentAlign?: 'left' | 'center' | 'right';
  contentVerticalAlign?: 'top' | 'center';
  buttons: ProjectButton[];
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutExperience {
  role: string;
  company: string;
  year: string;
}

export interface AboutSkillCategory {
  category: string;
  items: string[];
}

export interface AboutEducation {
  degree: string;
  school: string;
  year: string;
}

export interface AboutData {
  stats: AboutStat[];
  story: string[];
  experience: AboutExperience[];
  skills: AboutSkillCategory[];
  education: AboutEducation[];
}

export interface SocialLink {
  platform: string;
  url: string;
  iconSvg: string;
  showOnNavbar?: boolean;
}

export interface DomainCard {
  title: string;
  desc: string;
}

export interface Tool {
  name: string;
  slug?: string;
  image: string;
}

export interface HomeConfig {
  maintenanceMode?: boolean;
  name: string;
  resume: {
    enabled: boolean;
    url: string;
  };
  hero: {
    title: string;
    photo: string;
  };
  contact: {
    email: string;
    phone: string;
    copyright: string;
  };
  socials: SocialLink[];
  domains: DomainCard[];
  tools?: Tool[];
  easterEggQuotes?: string[];
}

export const DEFAULT_EASTER_EGG_QUOTES: string[] = [
  "Bro... 😭",
  "Again?",
  "Still here?",
  "I'm not hiding anything.",
  "Curiosity level: 99%.",
  "Achievement: Unemployed Detective.",
  "You missed nothing. Try again.",
  "Imagine if this actually did something.",
  "Secret unlocked: There is no secret.",
  "You expected a different result?",
  "You can stop... or keep feeding my ego.",
  "This click has been added to my fan club.",
  "Mom, I'm famous!",
  "You found the invisible button.",
  "Loading my life story... 0%.",
  "Error 418: I'm a teapot.",
  "No loot dropped.",
  "You've been here more than I have.",
  "You're one click away from adoption.",
  "Go on... one more click.",
  "Are you testing my click handler?",
  "You must really like my name.",
  "Fun fact: CSS stands for Can't Stop Scrolling.",
  "Clicking intensifies! ⚡",
  "Legend says if you click 100 times, a wild bug appears.",
  "System Notice: User is dangerously bored.",
  "Keyboard breaks in 3... 2... 1...",
  "Congratulations, you earned 0 XP!",
  "Is your mouse okay?",
  "I promise, no secret level is opening.",
  "Maybe check out my work section instead? 😅",
  "You have great determination.",
  "Wait... did you hear that?",
  "That's click #34. Just keeping track.",
  "You're persistent. I respect that.",
  "404: Easter egg not found.",
  "My API rates are limit-free for you.",
  "Did we just become best friends?",
  "Who hurt you?",
  "I should charge per click.",
  "You vs My Codebase: Who gives up first?",
  "Plot twist: I am clicking you back.",
  "Stop it, it tickles!",
  "Are you trying to break production?",
  "Level 50 Click Master achieved.",
  "Your finger must be getting tired.",
  "Blinking twice if you need help.",
  "Searching for hidden features...",
  "Nope, still nothing.",
  "Halfway to 100! Keep going champion!",
  "I admire your dedication.",
  "Is this a bot or a human?",
  "Captive audience detected.",
  "You're officially a super fan.",
  "Pressing F to pay respects.",
  "You could be learning Rust right now.",
  "This is fine. 🔥🐶",
  "Are you doing QA testing for free?",
  "Console log: user_is_stubborn = true",
  "Error 200: OK but why?",
  "You win a free high-five! ✋",
  "I'm running out of jokes here...",
  "Seriously, my writer is exhausted.",
  "Okay fine, here's a cookie 🍪",
  "Still clicking? Respect.",
  "You must have a mechanical keyboard.",
  "Tactical click deployed.",
  "BRB, calling Guinness World Records.",
  "Nice click!",
  "Sleek, isn't it?",
  "You really like micro-interactions.",
  "What if I told you there are 100 of these?",
  "You're close to the end!",
  "Or are you?",
  "Dun dun dun...",
  "Why build apps when you can click name tags?",
  "Your mouse switch: *cries in copper*",
  "npm install endless-clicking",
  "git commit -m 'User won't stop clicking'",
  "System overheating... 🔥",
  "Just 19 clicks left...",
  "You're actually gonna reach the end?!",
  "Mad respect, honestly.",
  "Top 1% most active user.",
  "Final boss loading...",
  "Almost there...",
  "Don't give up now!",
  "Clicking fast = 200 FPS.",
  "What are you expecting at #100?",
  "A confetti celebration?",
  "A secret discount code?",
  "The meaning of life?",
  "It's 42 by the way.",
  "Count down: 6...",
  "Count down: 5...",
  "Count down: 4...",
  "Count down: 3...",
  "Count down: 2...",
  "Count down: 1...",
  "🏆 ULTIMATE CHAMPION! You completed all 100 clicks! 🎉"
];

export interface GistData {
  config?: HomeConfig;
  projects: ProjectData[];
  about?: AboutData;
}

// Use env variable or fallback to the provided gist URL
const GIST_URL = process.env.NEXT_PUBLIC_GIST_URL || "https://gist.githubusercontent.com/Jadu07/56e3a47bb662c0e4c939be6d6044abdc/raw";

const defaultHomeConfig: HomeConfig = {
  name: "Yashraj Chouhan",
  resume: {
    enabled: true,
    url: "https://my.newtonschool.co/template/user/yashrajchouhan14/resume/"
  },
  hero: {
    title: "I'm a Software Engineer building scalable digital products and architecting reliable backend systems, APIs, and cloud-native applications.",
    photo: "https://i.ibb.co/Kz96mbmW/Gemini-Generated-Image-xf19yyxf19yyxf19.jpg"
  },
  contact: {
    email: "yashrajchouhan14@gmail.com",
    phone: "+91 9131211880",
    copyright: "© 2026 Yashraj Chouhan. All Rights Reserved. Crafted with precision."
  },
  socials: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/yash-raj-chouhan",
      iconSvg: '<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />',
      showOnNavbar: true
    },
    {
      platform: "GitHub",
      url: "https://github.com/jadu07",
      iconSvg: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>',
      showOnNavbar: true
    }
  ],
  domains: [
    { title: "SaaS & Enterprise Platforms", desc: "for business automation, analytics, and operations" },
    { title: "Admin Dashboards", desc: "for CRM, analytics and operational workflows" },
    { title: "Developer Tools & Integrations", desc: "for browser extensions, ID verification, and third-party APIs" }
  ]
};

const fallbackData: GistData = {
  config: defaultHomeConfig,
  projects: [],
  about: undefined
};

export async function fetchGistData(): Promise<GistData> {
  if (!GIST_URL) {
    console.warn("No GIST_URL provided, falling back to empty static data.");
    return fallbackData;
  }

  try {
    // 1. Fetch the cached version (updates every 60 seconds in the background)
    const cachedRes = await fetch(GIST_URL, { next: { revalidate: 60 } }); 
    
    if (!cachedRes.ok) {
      throw new Error(`Failed to fetch from gist. Status: ${cachedRes.status}`);
    }
    const cachedData = await cachedRes.json();

    // 2. MAINTENANCE MODE (DEVELOPER MODE)
    // If maintenance mode is enabled in the cached JSON, we bypass the cache entirely!
    // This allows you to see all subsequent JSON edits instantly on every page refresh.
    if (cachedData.config?.maintenanceMode) {
      const freshRes = await fetch(`${GIST_URL}?t=${Date.now()}`, { cache: 'no-store' });
      if (freshRes.ok) {
        const freshData = await freshRes.json();
        return Array.isArray(freshData) ? { projects: freshData as ProjectData[] } : freshData as GistData;
      }
    }
    
    // Backward compatibility for when the gist was just an array of projects
    if (Array.isArray(cachedData)) {
      return { projects: cachedData as ProjectData[] };
    }
    
    return cachedData as GistData;
  } catch (error) {
    console.error("Error fetching gist data:", error);
    return fallbackData;
  }
}

export async function fetchProjects(): Promise<ProjectData[]> {
  const data = await fetchGistData();
  return data.projects || [];
}

export async function fetchAbout(): Promise<AboutData | null> {
  const data = await fetchGistData();
  return data.about || null;
}

export async function fetchConfig(): Promise<HomeConfig> {
  const data = await fetchGistData();
  return data.config || defaultHomeConfig;
}
