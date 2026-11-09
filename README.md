# ARWATS 2027 — Official Conference Website

A modern, responsive website for **ARWATS 2027**, a conference centred on business, entrepreneurship, and leadership.

The website is designed to introduce the conference, communicate its purpose, showcase speakers and programme information, answer visitor questions, and provide a way for interested participants to register their interest.

## Overview

ARWATS 2027 aims to create a platform for meaningful conversations, professional connections, knowledge sharing, and new perspectives on business and leadership.

This website serves as the conference's digital presence, giving visitors access to key event information through a clean, engaging, and accessible experience.

## Features

- **Modern Landing Page:** An engaging introduction to ARWATS 2027.
- **About Section:** Information about the conference and its purpose.
- **Why Attend:** Highlights the value and opportunities of participating.
- **Speakers Section:** Space to introduce confirmed speakers and contributors.
- **Programme Section:** Presents the conference programme and session information.
- **Registration Section:** Allows visitors to express their interest.
- **FAQ Section:** Provides answers to common visitor questions.
- **Responsive Navigation:** Navigation experience for desktop and mobile devices.
- **Responsive Design:** Layouts optimised for different screen sizes.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application structure |
| React | Component-based user interface |
| TypeScript | Type safety and maintainability |
| Tailwind CSS | Responsive styling and design system |
| Lucide React | Interface icons |

## Project Structure

```text
arwats-2027/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── WhyAttend.tsx
│   │   ├── Speakers.tsx
│   │   ├── Programme.tsx
│   │   ├── Registration.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   │
│   └── ui/
│
├── data/
│   └── hero.content.ts
│
├── public/
│   └── images/
│
├── package.json
└── README.md
```

*The structure above is a suggested reference. Adjust it to match the actual repository.*

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm, pnpm, or yarn
- Git

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate into the project

```bash
cd arwats-2027
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

The project follows a component-based architecture. Each major homepage section is maintained independently under `components/sections/`.

This approach supports:

- Easier maintenance and updates.
- Reusable interface components.
- Consistent styling across sections.
- Better organisation as the website grows.

## Design Direction

The visual identity uses a bold editorial approach, combining:

- Clean white and dark backgrounds.
- Bright lime accents.
- Strong typography and visual hierarchy.
- Spacious layouts.
- Clear navigation and calls to action.

The goal is to deliver a professional digital experience that communicates the identity and purpose of ARWATS 2027.

## Content and Event Information

Event dates, venue details, speaker announcements, programme information, and registration arrangements should be updated only when officially confirmed by the organisers.

## Production Build

To create a production build:

```bash
npm run build
```

To run the production application locally:

```bash
npm run start
```

## Project Status

**Development in progress.**

The website structure and primary conference sections are being developed. Final content verification, registration functionality, responsive testing, and deployment preparation remain part of the project workflow.

## Licence

Copyright © 2027 ARWATS. All rights reserved.

Unless otherwise stated, the website's branding, content, and design assets are the property of their respective owners.
