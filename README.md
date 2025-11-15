# Klasindeling.be - Educational Tools Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/a89dcf00-5dd0-4690-9492-e8e80bb470fc/deploy-status)](https://app.netlify.com/projects/klasindeling-generator/deploys)

A comprehensive React application built with Vite and TypeScript, providing multiple educational tools for teachers. The platform features a clean, responsive interface using Tailwind CSS and includes various utilities for classroom management and physics education.

## 🎯 Features

### 1. Klasindeling (Classroom Seating)
- Input student names with gender selection
- Customize grid size (rows and columns)
- Mark students as "difficult" for strategic placement
- Block specific seats in the classroom
- Generate random seating arrangements with gender balance
- Drag-and-drop students to empty spaces
- Save and load multiple classroom layouts
- Print-friendly layout
- Download as PDF
- Persistent storage with LocalStorage

### 2. Groepjesmaker (Group Generator)
- Create random student groups
- Two distribution methods: by group size or number of groups
- Smart distribution algorithm ensuring equal group sizes
- Automatic distribution of "difficult" students across groups
- Gender balance in groups
- Edit mode for manual adjustments
- Move students between groups
- Add new groups dynamically
- Download as PDF with custom title and extra text
- Print functionality without opening new tab
- Save group configurations

### 3. Namenkiezer (Name Picker)
- Load student lists from saved classes
- Add or remove students on the fly
- Animated random name selection
- Perfect for calling on students randomly
- Fair selection algorithm
- Clean, simple interface

### 4. Timer
- Quick preset buttons: 1, 2, 5, 10, and 15 minutes
- Custom time input (minutes and seconds)
- Large, visible countdown display
- Audio alert when time is up
- Pause and resume functionality
- Perfect for classroom activities and tests

### 5. EVRB Simulator (Uniformly Accelerated Motion)
- Simulate uniformly accelerated rectilinear motion
- Adjustable parameters:
  - Starting position (x₀)
  - Initial velocity (v₀)
  - Acceleration (a)
  - Start time (t₀)
- Real-time animation with 60 FPS
- Interactive speed control (1x and 2x)
- Live graphs showing position and velocity over time
- Visual car animation on dynamic track
- Responsive display for mobile and desktop
- Educational tool for physics lessons

### 6. Archimedeskracht Simulator (Archimedes' Principle)
- Demonstrate Archimedes' principle with interactive visualization
- Preset materials: Wood, Ice, Water, Brick, Aluminum, Iron
- Preset fluids: Kerosene, Fresh water, Salt water, Glycerin, Mercury
- Adjustable parameters:
  - Fluid density with emoji presets
  - Block density with emoji presets
  - Gravity (Moon, Mars, Earth, Jupiter, Sun)
  - Volume (0.001 m³ to 1 m³)
- Manual submersion control:
  - Automatic mode: Calculated based on densities
  - Manual mode: Push block underwater or hold it up
  - Visual feedback showing force differences
- Real-time calculations:
  - Block weight (F_g)
  - Buoyant force (F_a)
  - Net force
  - Submerged percentage
- Visual animation showing floating/sinking behavior
- Dynamic block size based on volume
- Color-coded fluids and materials

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🛠 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library
- **Recharts** - Data visualization for simulators
- **jsPDF & html2canvas** - PDF generation
- **LocalStorage** - Data persistence

## 📱 Responsive Design

- Mobile-friendly sidebar with hamburger menu
- Responsive grid layouts
- Touch-optimized controls
- Print-optimized layouts

## 🎨 Design System

- Unified indigo color theme
- Consistent spacing and shadows
- Smooth animations and transitions
- Accessible components
- Print-friendly layouts

## 💾 Data Persistence

All classroom data and configurations are saved locally using LocalStorage:
- Classroom layouts persist between sessions
- Room configurations are preserved
- Saved classes can be loaded across all tools

## 🖨 Print & Export Features

- **Print**: Optimized print layouts for all pages
- **PDF Export**: Groepjesmaker includes downloadable PDF with custom titles
- **Portrait mode**: All exports use portrait orientation

## 🧮 Physics Accuracy

Both simulators use proper physics formulas and conventions:
- **EVRB**: x(t) = x₀ + v₀(t-t₀) + ½a(t-t₀)²
- **Archimedeskracht**: 
  - Buoyant force: F_a = ρ_v × V × g × (submerged fraction)
  - Net force: F_net = F_a - F_g
  - Automatic calculation of equilibrium position
  - Manual override for educational demonstrations

## 🌐 Pages

- **Klasindeling** - Main classroom seating tool
- **Groepjesmaker** - Group generator
- **Namenkiezer** - Random name picker
- **Timer** - Classroom timer with presets
- **EVRB Simulator** - Physics motion simulator
- **Archimedeskracht Simulator** - Buoyancy demonstrator
- **Over** - About page with tool descriptions
- **Contact** - Contact form and information

## 💖 Support

If you find these tools useful, consider supporting the project:
[Ko-fi donation link](https://ko-fi.com/Z8Z01G7O8R)

## 📄 License

This project is open source and available for educational purposes.

## 👨‍🏫 Author

Created by **Dietrich Janssens** for educational use in Belgian schools.