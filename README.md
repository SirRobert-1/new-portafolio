# Portfolio Landing Page

> Professional portfolio landing page built with Next.js 15, Tailwind CSS 4, Sanity CMS, and Aceternity UI components.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)
![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=flat&logo=sanity)

## Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and Tailwind CSS 4
- **CMS Integration**: Content managed through Sanity CMS
- **Stunning UI**: Aceternity UI components for beautiful animations and interactions
- **Internationalization**: Full support for Spanish and English
- **Contact Form**: Integrated email functionality with Resend
- **Responsive Design**: Mobile-first approach, works on all devices
- **Dark Theme**: Beautiful dark color scheme throughout
- **Performance Optimized**: Lazy loading, image optimization, and ISR
- **SEO Ready**: Dynamic meta tags and Open Graph support

## Tech Stack

### Frontend
- **Next.js 15** - React framework with Pages Router
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Motion** - Advanced animation library

### UI Components
- **Aceternity UI** - Premium component library
  - Hero Highlight
  - Text Generate Effect
  - Animated Tooltip
  - 3D Card
  - Animated Modal
  - Stylized Inputs

### CMS & Data
- **Sanity** - Headless CMS for content management
- **Next Sanity** - Sanity integration for Next.js
- **@sanity/image-url** - Image optimization

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Email
- **Resend** - Email service for contact form
- **React Email** - Email template components

### Icons & UI
- **React Icons** - Icon library
- **Lucide React** - Additional icons
- **ShadCn** - Component development tool

## Project Structure

```
new-portafolio/
├── src/
│   ├── components/
│   │   ├── sections/          # Main sections
│   │   │   ├── Hero.jsx       # Hero section with highlight effect
│   │   │   ├── About.jsx      # About section with text animation
│   │   │   ├── Technologies.jsx # Tech stack with tooltips
│   │   │   ├── Projects.jsx   # Projects grid with modal
│   │   │   └── Contact.jsx    # Contact form
│   │   ├── ui/                # Aceternity UI components
│   │   ├── Layout.jsx         # Main layout wrapper
│   │   ├── LanguageSwitcher.jsx # i18n toggle
│   │   ├── ProjectCard.jsx    # 3D project card
│   │   ├── ProjectModal.jsx   # Project details modal
│   │   └── PortableText.jsx   # Sanity content renderer
│   ├── context/
│   │   └── LanguageContext.js # i18n context
│   ├── lib/
│   │   ├── sanity.js          # Sanity client
│   │   ├── sanityQueries.js   # GROQ queries
│   │   ├── imageUrl.js        # Image optimization helpers
│   │   ├── translations.js    # Translation helpers
│   │   └── utils.js           # Utility functions
│   ├── locales/
│   │   ├── es.json            # Spanish translations
│   │   └── en.json            # English translations
│   ├── emails/
│   │   └── ContactEmail.jsx   # Email template
│   ├── pages/
│   │   ├── api/
│   │   │   └── contact.js     # Contact API endpoint
│   │   ├── _app.js            # App wrapper
│   │   ├── _document.js       # HTML document
│   │   └── index.js           # Homepage
│   └── styles/
│       └── globals.css        # Global styles
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── components.json           # ShadCn configuration
└── package.json              # Dependencies

```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Sanity account (for CMS)
- Resend account (for email functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/new-portafolio.git
cd new-portafolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"

# Resend Email
RESEND_API_KEY="re_your_api_key_here"
NEXT_PUBLIC_RESEND_FROM_EMAIL="noreply@yourdomain.com"
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Sanity CMS

1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Set up the following schemas in your Sanity Studio:

**Technology Schema:**
```javascript
{
  name: 'tecnologia',
  type: 'document',
  fields: [
    { name: 'nombre', type: 'string' },
    { name: 'icono', type: 'string' },
    { name: 'color', type: 'string' },
    { name: 'categoria', type: 'string' }
  ]
}
```

**Project Schema:**
```javascript
{
  name: 'proyecto',
  type: 'document',
  fields: [
    { name: 'titulo', type: 'string' },
    { name: 'descripcionCorta', type: 'text' },
    { name: 'descripcionLarga', type: 'array', of: [{type: 'block'}] },
    { name: 'imagenPrincipal', type: 'image' },
    { name: 'galeria', type: 'array', of: [{type: 'image'}] },
    { name: 'tecnologias', type: 'array', of: [{type: 'reference', to: [{type: 'tecnologia'}]}] },
    { name: 'linkDemo', type: 'url' },
    { name: 'linkGitHub', type: 'url' },
    { name: 'destacado', type: 'boolean' },
    { name: 'orden', type: 'number' }
  ]
}
```

### Resend Email

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify your domain or use `onboarding@resend.dev` for testing
4. Add the credentials to `.env.local`

### Internationalization

The app supports Spanish (es_MX) and English (en_US). Translation files are located in:
- `src/locales/es.json` - Spanish translations
- `src/locales/en.json` - English translations

To add a new translation:
1. Add the key-value pair to both files
2. Use `t('key')` in your component with the `useLanguage` hook

## Build & Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables for Production

Make sure to set these variables in your hosting platform:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_RESEND_FROM_EMAIL`

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/new-portafolio)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables
4. Deploy

## Features Breakdown

### Hero Section
- Eye-catching hero with highlight text effect
- Animated gradient background
- Call-to-action button with smooth scroll
- Fully responsive

### About Section
- Text generation animation effect
- Professional biography
- Experience highlights
- Statistics cards

### Technologies Section
- Interactive technology grid
- Animated tooltips on hover
- Categorized by tech stack
- Dynamic content from Sanity

### Projects Section
- 3D card effect on hover
- Modal with full project details
- Image gallery
- Technology badges
- Demo and GitHub links
- Portable Text support for rich descriptions

### Contact Section
- Validated contact form
- Real-time validation with Zod
- Email integration with Resend
- Success/error feedback
- Loading states

## Performance

- **Lazy Loading**: Non-critical sections lazy loaded
- **Image Optimization**: Next.js Image component with AVIF/WebP
- **ISR**: Incremental Static Regeneration (60s revalidate)
- **Code Splitting**: Automatic by Next.js
- **Compression**: GZIP enabled
- **First Load JS**: ~215 kB

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

1. Use ShadCn to add Aceternity components:
```bash
npx shadcn@latest add @aceternity/component-name
```

2. Import and use in your code:
```jsx
import { Component } from "@/components/ui/component-name"
```

## Troubleshooting

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check environment variables are set correctly

### Sanity Connection Issues
- Verify project ID and dataset name
- Check CORS settings in Sanity dashboard
- Ensure API version is correct

### Email Not Sending
- Verify Resend API key is valid
- Check sender email is verified
- Review API logs in Resend dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sanity](https://www.sanity.io/)
- [Aceternity UI](https://ui.aceternity.com/)
- [Resend](https://resend.com/)
- [ShadCn](https://ui.shadcn.com/)

---

**Built with ❤️ using Next.js and modern web technologies**
