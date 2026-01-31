# My Portfolio

A modern, dynamic personal portfolio website built with React, Vite, and Firebase. This project showcases my professional journey, technical skills, and educational background with an admin panel for easy content management.

## Features

- **Dynamic Content**: Portfolio data is stored in Firebase Realtime Database, allowing for easy updates without redeployment
- **Responsive Design**: Built with Tailwind CSS for a mobile-first, responsive experience
- **Admin Panel**: Secure admin interface to manage portfolio content, profile information, tech stack, and education details
- **Image Upload**: Support for profile picture uploads with HEIC format conversion
- **Resume Download**: Cloud-hosted resume PDF download functionality
- **Real-time Updates**: Changes made in the admin panel reflect immediately on the portfolio
- **Smooth Animations**: Framer Motion powered entrance animations and scroll-triggered effects for enhanced user experience

## Tech Stack

- **Frontend**: React 19, React Router DOM
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend/Database**: Firebase Realtime Database
- **Image Processing**: react-easy-crop, heic2any
- **Linting**: ESLint

## Project Structure

```
my-portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── HomeAssets/
│   │       ├── AdminSettings.jsx
│   │       ├── EducationalJourney.jsx
│   │       ├── Hero.jsx
│   │       └── TechStack.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── firebase.js
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Realtime Database
   - Copy your Firebase config to `src/firebase.js`

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- **View Portfolio**: Navigate to the home page to see the portfolio
- **Admin Panel**: Access admin settings to update content (authentication required)
- **Build for Production**: Run `npm run build` to create a production build
- **Preview Build**: Run `npm run preview` to preview the production build

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and not licensed for public use.
