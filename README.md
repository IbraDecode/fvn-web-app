# FVN - Free Virtual Number

![FVN Banner](https://img.shields.io/badge/FVN-Free%20Virtual%20Number-00F0FF?style=for-the-badge&logo=smartphone&logoColor=white)

## 🚀 Overview

FVN (Free Virtual Number) adalah platform modern untuk mendapatkan nomor virtual gratis untuk keperluan verifikasi SMS OTP. Dibangun dengan teknologi terdepan untuk memberikan pengalaman pengguna yang optimal.

## ✨ Features

### 🎯 Core Features
- **Instant & Fast** - Dapatkan nomor virtual dalam hitungan detik
- **Secure & Private** - Data Anda aman dengan enkripsi end-to-end
- **Global Coverage** - Nomor dari berbagai negara di seluruh dunia
- **Realtime OTP** - Terima OTP secara realtime tanpa delay

### 🌟 Enhanced UI/UX
- **3D Interactive Smartphone** - Model smartphone 3D yang dapat diinteraksi
- **Glassmorphism Design** - Efek kaca modern dengan backdrop blur
- **Neon Glow Effects** - Efek cahaya neon yang menarik
- **Floating Particles** - Animasi partikel mengambang
- **Smooth Animations** - Transisi dan animasi yang halus menggunakan Framer Motion
- **Responsive Design** - Optimal di semua perangkat

### 🎨 Visual Enhancements
- **Dark Theme** - Tema gelap yang elegan dengan aksen cyan dan purple
- **Interactive Elements** - Hover effects dan micro-interactions
- **Modern Typography** - Font Geist untuk keterbacaan optimal
- **Custom Scrollbar** - Scrollbar kustom yang sesuai dengan tema

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Three Fiber** - 3D graphics dengan Three.js
- **React Three Drei** - Useful helpers untuk R3F
- **Lottie Web** - Animasi Lottie
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icons

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **Prisma** - Database ORM

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Geist Font** - Modern typography

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Git

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/IbraDecode/fvn-web-app.git
   cd fvn-web-app
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Setup environment variables**
   
   Buat file `.env` di root directory:
   ```env
   POSTGRES_URL=your_postgres_url
   POSTGRES_PRISMA_URL=your_postgres_prisma_url
   SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   POSTGRES_URL_NON_POLLING=your_postgres_url_non_polling
   SUPABASE_JWT_SECRET=your_jwt_secret
   POSTGRES_USER=your_postgres_user
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   POSTGRES_PASSWORD=your_postgres_password
   POSTGRES_DATABASE=your_postgres_database
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   POSTGRES_HOST=your_postgres_host
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   
   Buka [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
fvn-web-app/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # Shadcn/ui components
│   ├── 3d/                      # 3D components
│   │   ├── smartphone-canvas.tsx
│   │   └── enhanced-smartphone.tsx
│   └── animations/              # Animation components
│       ├── floating-elements.tsx
│       ├── floating-particles.tsx
│       └── lottie-animation.tsx
├── lib/                         # Utility functions
├── styles/                      # CSS files
│   └── globals.css             # Global styles with custom CSS
├── public/                      # Static assets
├── package.json                 # Dependencies
└── README.md                   # Documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: `oklch(0.7 0.3 195)` - Cyan blue
- **Secondary**: `oklch(0.6 0.25 280)` - Purple
- **Background**: `oklch(0.05 0.02 240)` - Dark blue
- **Accent**: `oklch(0.15 0.02 240)` - Darker blue

### Typography
- **Font Family**: Geist Sans & Geist Mono
- **Headings**: Bold, large sizes with proper hierarchy
- **Body**: Regular weight, optimized for readability

### Effects
- **Glassmorphism**: `backdrop-blur-xl` with transparent backgrounds
- **Neon Glow**: Custom box-shadow with cyan and purple colors
- **Animations**: Smooth transitions with `cubic-bezier` easing

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio
```

### Code Style
- TypeScript untuk type safety
- ESLint untuk code quality
- Prettier untuk code formatting
- Conventional commits untuk git messages

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository di Vercel
3. Set environment variables
4. Deploy automatically

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 Changelog

### Version 2.0.0 (Latest)
- ✨ Enhanced 3D smartphone model with interactive features
- 🎨 Improved glassmorphism design with better visual effects
- 🌟 Added floating particles animation
- 🔧 Fixed React Three Fiber compatibility issues
- 🎯 Better responsive design for mobile devices
- 🚀 Performance optimizations

### Version 1.0.0
- 🎉 Initial release
- 📱 Basic virtual number functionality
- 🎨 Initial UI design
- 🔐 Supabase integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**IbraDecode**
- GitHub: [@IbraDecode](https://github.com/IbraDecode)
- Project: [FVN Web App](https://github.com/IbraDecode/fvn-web-app)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - 3D graphics
- [Supabase](https://supabase.com/) - Backend platform
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Lucide](https://lucide.dev/) - Icon library

---

<div align="center">
  <p>Made with ❤️ by IbraDecode</p>
  <p>
    <a href="https://github.com/IbraDecode/fvn-web-app">⭐ Star this repo</a> •
    <a href="https://github.com/IbraDecode/fvn-web-app/issues">🐛 Report Bug</a> •
    <a href="https://github.com/IbraDecode/fvn-web-app/issues">💡 Request Feature</a>
  </p>
</div>