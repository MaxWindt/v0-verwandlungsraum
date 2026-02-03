# AI_RULES.md

## Tech Stack Overview

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS (with custom theme and utility classes)
- **UI Components:** shadcn/ui (Radix UI-based), custom components in `/components`
- **Icons:** lucide-react
- **State Management:** React Context (for language and global state)
- **Internationalization:** Custom context using `/lib/translations.ts`
- **Image Handling:** next/image (for optimized images)
- **Dialog/Modal:** Radix UI Dialog via shadcn/ui
- **Form Handling:** Native React state, hCaptcha for spam protection
- **Animation:** Tailwind CSS, tw-animate-css, and custom CSS keyframes

## Library Usage Rules

- **UI Components:**  
  - Use shadcn/ui components (imported from `/components/ui/`) for all dialogs, buttons, and form elements.
  - Only create custom components in `/components/` if the design or logic cannot be achieved with shadcn/ui.

- **Styling:**  
  - Use Tailwind CSS utility classes for all layout, spacing, color, and typography.
  - Add custom styles to `app/globals.css` only for global or reusable design patterns.

- **Icons:**  
  - Use lucide-react for all icons. Do not use other icon libraries.

- **State & Context:**  
  - Use React Context for global state (e.g., language selection).
  - Do not use Redux, Zustand, or other state management libraries.

- **Internationalization:**  
  - Use the custom language context and `/lib/translations.ts` for all text translations.
  - Do not use next-intl or other i18n libraries.

- **Forms:**  
  - Use native React state for form handling.
  - Use hCaptcha for spam protection on forms.
  - Do not use Formik or other form libraries unless specifically required.

- **Routing:**  
  - Use Next.js App Router conventions for all routing.
  - Do not use React Router or other routing libraries.

- **Images:**  
  - Use next/image for all images where possible for optimization.
  - Place all static images in the `/public/images/` directory.

- **Modals/Dialogs:**  
  - Use shadcn/ui Dialog (Radix UI) for all modal dialogs.

- **Animation:**  
  - Use Tailwind CSS animation utilities and tw-animate-css for simple animations.
  - Add custom keyframes to `app/globals.css` for unique animation needs.

- **Dependencies:**  
  - Only add new dependencies if absolutely necessary and not already covered by the above stack.

---
This file defines the rules for consistent, maintainable, and modern development in this project.