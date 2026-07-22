# Portfolio JSON Schema Documentation

This document serves as the comprehensive guide to the `combined_template.json` structure that powers the entire portfolio. This schema is designed to be fully dynamic, making it the perfect foundation for a future Admin Panel or CMS.

The root JSON object contains three main keys:
1. `config` (Global Settings & Homepage Data)
2. `projects` (Work/Portfolio Items)
3. `about` (About Me Page Data)

---

## 1. `config` Object
Controls global settings (Navbar, Footer, Contact) and the Homepage Hero section.

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Your full name, displayed in the Navbar and used as fallback alt text. |
| `resume` | `Object` | Controls the Resume button in the Navbar. |
| `resume.enabled` | `boolean` | If `true`, the Resume button is visible. If `false`, it is hidden entirely. |
| `resume.url` | `string` | The URL to redirect to when the Resume button is clicked. |
| `hero` | `Object` | Data for the main Hero section on the Homepage. |
| `hero.title` | `string` | The large tagline/introductory text in the Hero section. |
| `hero.photo` | `string` | URL to your profile picture (displayed in a squircle). |
| `contact` | `Object` | Contact details displayed in the Footer and Contact Form. |
| `contact.email` | `string` | Your email address (used for the `mailto:` link). |
| `contact.phone` | `string` | Your phone number (used for the `tel:` link). |
| `contact.copyright` | `string` | The copyright string displayed at the very bottom of the footer. |
| `socials` | `Array<SocialLink>` | List of social media profiles. |
| `domains` | `Array<DomainCard>` | The three domain expertise cards displayed below the Hero section. |

### `SocialLink` Object
| Field | Type | Description |
|---|---|---|
| `platform` | `string` | Name of the platform (e.g., "LinkedIn", "GitHub"). |
| `url` | `string` | The URL to your profile. |
| `iconSvg` | `string` | Raw SVG path or string to render the icon. The app injects this directly into the DOM. |
| `showOnNavbar` | `boolean` (Optional) | If `true`, the icon appears in both the Navbar and Footer. If `false` or omitted, it only appears in the Footer. |

### `DomainCard` Object
| Field | Type | Description |
|---|---|---|
| `title` | `string` | The title of the domain card. |
| `desc` | `string` | The description text. |

---

## 2. `projects` Array
An array of objects representing your portfolio work. Rendered on both the Homepage (if featured) and the Work page.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier for the project. |
| `title` | `string` | Project title. |
| `desc` | `string` | Project description. |
| `image` | `string` (Optional) | URL to a static image for the project card. |
| `video` | `string` (Optional) | URL to an MP4 video to loop in the project card (e.g., from Framer). |
| `poster` | `string` (Optional) | URL to a fallback image shown while the video loads. |
| `stats` | `Array<ProjectStat>` | List of highlight statistics to show on the card (max 2 recommended). |
| `isFeatured` | `boolean` | If `true`, this project is displayed on the Homepage. All projects show on the Work page. |
| `order` | `number` | Controls the sorting order of the projects (ascending). |
| `cardLink` | `string` (Optional) | URL to redirect to when the entire card is clicked. |
| `contentAlign` | `'left' \| 'center' \| 'right'` | (Optional) Alignment of the text content inside the card. |
| `buttons` | `Array<ProjectButton>` | Call to action buttons displayed on the card. |

### `ProjectStat` Object
| Field | Type | Description |
|---|---|---|
| `label` | `string` | The small label (e.g., "Time Efficiency Savings"). |
| `value` | `string` | The large value (e.g., "$3M+"). |

### `ProjectButton` Object
| Field | Type | Description |
|---|---|---|
| `text` | `string` | Button text. |
| `link` | `string` | URL to redirect to. |
| `isEnabled` | `boolean` | If `false`, the button is hidden. |
| `isPrimary` | `boolean` (Optional) | If `true`, rendered as a solid primary button. If `false`, rendered as an outlined secondary button. |

---

## 3. `about` Object
Data specifically for the `/about-me` page.

| Field | Type | Description |
|---|---|---|
| `stats` | `Array<AboutStat>` | Three large statistics shown at the top of the About page. |
| `story` | `Array<string>` | An array of paragraphs for the "My Story" section. Each string is rendered as a separate `<p>` tag. |
| `experience` | `Array<Experience>` | Your work experience history. |
| `skills` | `Array<SkillCategory>` | Your categorized technical skills. |
| `education` | `Array<Education>` | Your educational background. |

### `AboutStat` Object
| Field | Type | Description |
|---|---|---|
| `label` | `string` | The small label (e.g., "Projects shipped"). |
| `value` | `string` | The large value (e.g., "20+"). |

### `Experience` Object
| Field | Type | Description |
|---|---|---|
| `role` | `string` | Your job title. |
| `company` | `string` | The company name and location. |
| `year` | `string` | The duration or year. |

### `SkillCategory` Object
| Field | Type | Description |
|---|---|---|
| `category` | `string` | The name of the skill group (e.g., "Full Stack Development"). |
| `items` | `Array<string>` | A list of specific skills within this category. |

### `Education` Object
| Field | Type | Description |
|---|---|---|
| `degree` | `string` | The degree or certification obtained. |
| `school` | `string` | The institution name. |
| `year` | `string` | The duration or graduation year. |
