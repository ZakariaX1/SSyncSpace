# 3. Design System by Hand
> Crafting reusable components and visual consistency without external UI libraries.

---

## ✨ Goal
Create a personal **design system**: colors, typography, spacing, and reusable components.

---

### ⚙️ Step 1: Colors
Extend Tailwind theme in `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: "#4f46e5",
      secondary: "#6366f1",
      accent: "#facc15",
      background: "#f9fafb",
      text: "#111827",
    },
  },
},
```

---

### ⚙️ Step 2: Typography
```js
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
},
```

---

### ⚙️ Step 3: Components
- **Button:**  
```tsx
<button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition">Click</button>
```

- **Card:**  
```tsx
<div className="p-4 border rounded-xl shadow hover:shadow-md transition">...</div>
```

- **Navbar:** Already implemented in `layout.tsx`, reuse classes consistently.

---

### ⚙️ Step 4: Spacing & Layout
Use Tailwind spacing scale (`p-4`, `m-2`, `gap-6`) consistently.  
Create a `components/` folder inside `/app` for reusable React components.

---

### 🧩 Reference
| Element | Example Classes |
|---------|----------------|
| Button | `px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary` |
| Card | `p-4 border rounded-xl shadow hover:shadow-md transition` |
| Layout | `max-w-3xl mx-auto mt-10` |
