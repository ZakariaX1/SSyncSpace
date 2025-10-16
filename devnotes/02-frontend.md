# 2. Frontend Foundations (Next.js App Router + Tailwind + TypeScript)

---

## ✨ Goal
Set up frontend structure, pages, navigation, and basic styling using TailwindCSS.

---

## ⚙️ Step 1: Install TailwindCSS
```bash
cd apps/web
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
}
```

`src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Restart dev server:
```bash
npm run dev
```

---

## ⚙️ Step 2: Root Layout & Navigation
`src/app/layout.tsx`:
```tsx
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'SSyncSpace',
  description: 'A place to sync and explore modular spaces.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <header className="flex justify-between items-center p-4 shadow-sm bg-white">
          <h1 className="text-xl font-bold">SSyncSpace</h1>
          <nav className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/discord">Discord</Link>
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
```

---

## ⚙️ Step 3: Pages

`src/app/page.tsx`:
```tsx
export default function HomePage() {
  return (
    <section className="text-center mt-20">
      <h2 className="text-4xl font-bold mb-4">Welcome to SSyncSpace</h2>
      <p className="text-gray-600">Explore the different spaces and sync up your world.</p>
    </section>
  )
}
```

`src/app/about/page.tsx`:
```tsx
export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto mt-10 text-center">
      <h2 className="text-3xl font-semibold mb-4">About SSyncSpace</h2>
      <p className="text-gray-700">
        SSyncSpace is a modular web environment designed to bring together creative,
        technical, and community-driven projects under one roof.
      </p>
    </section>
  )
}
```

`src/app/portfolio/page.tsx`:
```tsx
export default function PortfolioPage() {
  return (
    <section className="max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-4">Portfolio</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 border rounded-lg">Project 1</div>
        <div className="p-4 border rounded-lg">Project 2</div>
      </div>
    </section>
  )
}
```

---

## 🧩 Reference
| Command | Description |
|---------|-------------|
| `npm install -D tailwindcss postcss autoprefixer` | Install Tailwind |
| `npx tailwindcss init -p` | Initialize config |
| `npm run dev` | Start frontend dev server |
