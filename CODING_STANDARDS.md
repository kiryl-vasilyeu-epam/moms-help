# Coding Standards & Rules for co-parser

## Overview
This document outlines the coding standards and conventions that should be followed throughout the co-parser project.

## File & Folder Structure

### 1. Folder Organization Rules
✅ **REQUIRED**: Each feature (component, hook, utility) must have its own folder with an `index.ts` file

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.styles.ts
│   │   ├── Button.types.ts
│   │   ├── Button.hooks.ts (if needed)
│   │   ├── Button.constants.ts (if needed)
│   │   ├── Button.helpers.ts (if needed)
│   │   └── index.ts (exports)
│   └── Modal/
│       ├── Modal.tsx
│       ├── Modal.styles.ts
│       ├── Modal.types.ts
│       └── index.ts
├── features/
│   └── itemsMatcher/
│       ├── itemsMatcher.ts
│       ├── itemsMatcher.types.ts
│       ├── itemsMatcher.constants.ts
│       └── index.ts
├── hooks/
│   └── useCounter/
│       ├── useCounter.ts
│       ├── useCounter.types.ts
│       └── index.ts
├── utils/
│   └── createStyle/
│       ├── createStyle.ts
│       ├── createStyle.types.ts
│       └── index.ts
├── App.tsx
├── App.styles.ts
├── App.types.ts (if needed)
└── main.tsx
```

### 2. Component File Types

#### `Component.tsx` (Required)
The main React component file
```tsx
import { createStyle } from '@utils'
import type { ComponentProps } from './Component.types'
import { Component as ComponentContent } from './Component.constants'

const Component = ({ prop1, prop2 }: ComponentProps) => {
  return <div>Component</div>
}

export default Component
```

#### `Component.styles.ts` (If component has styles)
Panda CSS styles for the component
```tsx
import { createStyle } from '@utils'

export const styles = createStyle({
  root: { p: '2rem' },
  title: { fontSize: '2rem' }
})
```

#### `Component.types.ts` (If component has props or types)
Type definitions for the component
```tsx
export interface ComponentProps {
  title: string
  onClick?: () => void
}

export interface ComponentState {
  isOpen: boolean
}
```

#### `Component.hooks.ts` (If component has custom hooks)
Custom hooks used only by this component
```tsx
export const useComponentLogic = () => {
  // hook implementation
}
```

#### `Component.constants.ts` (If component has constants)
Constants and default values
```tsx
export const DEFAULT_TIMEOUT = 5000
export const COMPONENT_LABELS = {
  title: 'My Component',
  submit: 'Submit'
}
```

#### `Component.helpers.ts` (If component has helper functions)
Pure utility functions used by the component
```tsx
export const formatComponentData = (data: unknown) => {
  // helper implementation
}
```

#### `index.ts` (Required)
Central export file
```tsx
export { default as Component } from './Component'
export type { ComponentProps, ComponentState } from './Component.types'
```

### 3. Utility/Feature Folder Structure

Similar to components but without `.tsx`:
```
utils/
└── createStyle/
    ├── createStyle.ts (implementation)
    ├── createStyle.types.ts (types)
    └── index.ts (exports)
```

```
features/
└── itemsMatcher/
    ├── itemsMatcher.ts (implementation)
    ├── itemsMatcher.types.ts (types)
    ├── itemsMatcher.constants.ts (constants)
    └── index.ts (exports)
```

### 4. Index File Best Practices

Always provide a central `index.ts` for easy imports:

❌ Bad - Complex relative imports
```tsx
import { createStyle } from '../utils/createStyle/createStyle'
import type { StyleObject } from '../utils/createStyle/createStyle.types'
```

✅ Good - Simple alias imports
```tsx
import { createStyle } from '@utils/createStyle'
```

The `index.ts` handles the re-exports:
```tsx
// src/utils/createStyle/index.ts
export { createStyle, cn } from './createStyle'
export type { StyleResult, StyleObject } from './createStyle.types'

// src/utils/index.ts
export * from './createStyle'
```

## Code Style

### 1. Function Declarations
✅ **REQUIRED**: Use arrow function syntax for all function declarations
```tsx
// Good
export const myFunction = (param: string): void => {
  // implementation
}

const helper = () => {
  // implementation
}

// Bad - Never use function declaration
export function myFunction(param: string): void { }
function helper() { }
```

### 2. React Components
✅ **REQUIRED**: Use arrow function syntax for all React components
```tsx
// Good
export const MyComponent = () => {
  return <div>Content</div>
}

const SubComponent = ({ prop }: Props) => {
  return null
}

// Bad
export function MyComponent() { }
function SubComponent() { }
```

### 3. Type Annotations
✅ **REQUIRED**: Always add explicit type annotations
```tsx
// Good
export const createStyle = (styles: StyleObject): StyleResult => {
  return {}
}

const count: number = 0

// Bad
export const createStyle = (styles) => {
  return {}
}
```

### 4. Imports & Path Aliases
✅ **REQUIRED**: Use path aliases for imports
```tsx
// Good
import { createStyle } from '@utils/createStyle'
import { Button } from '@components/Button'
import { useCounter } from '@hooks/useCounter'

// Acceptable (same directory)
import { styles } from './Component.styles'

// Bad - Relative paths with ../ (unless same directory)
import { createStyle } from '../../../utils/createStyle'
```

### 5. Styling
✅ **REQUIRED**: Use `createStyle` utility for component styles
```tsx
// Good - Separate file
// Component.styles.ts
import { createStyle } from '@utils'

export const styles = createStyle({
  container: { padding: '2rem', maxWidth: '1280px' },
  button: { padding: '0.6em', cursor: 'pointer' }
})

// Good - Inline when simple
import { createStyle } from '@utils'
export const styles = createStyle({...})

// Bad - Direct css() calls
import { css } from '../../../styled-system/css'
export const styles = {
  container: css({ ... }),
  button: css({ ... })
}
```

### 6. Naming Conventions
- **Folders**: `camelCase` or `PascalCase` for main feature folders
  - ✅ `src/components/Button`, `src/utils/createStyle`, `src/hooks/useCounter`
- **Files**: 
  - Components: `PascalCase.tsx` (e.g., `Button.tsx`, `Button.styles.ts`)
  - Utils/Helpers: `camelCase.ts` (e.g., `createStyle.ts`)
  - Types: `*.types.ts` suffix
- **Variables**: `camelCase`
  - ✅ `const userName = 'John'`
- **Constants**: `UPPER_SNAKE_CASE` (only for true constants)
  - ✅ `const MAX_ATTEMPTS = 5`
- **Types/Interfaces**: `PascalCase`
  - ✅ `type StyleObject = { ... }`
  - ✅ `interface ComponentProps { ... }`
- **Functions**: `camelCase`
  - ✅ `const createStyle = () => { }`
- **Components**: `PascalCase`
  - ✅ `const MyComponent = () => { }`

### 7. Comments
- Use comments only when code logic is not immediately clear
- Prefer self-documenting code with clear names
- Use JSDoc for public functions and exported components

```tsx
// Good - Self-documenting
const isValidEmail = (email: string): boolean => email.includes('@')

// Good - JSDoc for exported functions
/**
 * Creates Panda CSS classes from style object
 * @param styles Style definitions
 * @returns Object with className strings
 */
export const createStyle = (styles: StyleObject): StyleResult => {}

// Bad - Unnecessary comment
// increment count
count++
```

### 8. Imports Order
1. React & external packages first
2. Internal aliases (@utils, @components, etc)
3. Local relative imports (same directory, for types and styles)

```tsx
import { useState } from 'react'
import { Button } from '@mui/material'

import { createStyle } from '@utils/createStyle'
import { MyComponent } from '@components/MyComponent'
import type { ComponentProps } from './Component.types'

import { styles } from './Component.styles'
```

## TypeScript Rules

### 1. Strict Mode
Project uses `strict: true`. All code must be strictly typed.
- No `any` types without explicit comment explaining why
- Always provide return types for functions

### 2. Unused Code
- No unused imports: `noUnusedLocals: true`
- No unused parameters: `noUnusedParameters: true`
- All imports must be used or removed

## Panda CSS Rules

### 1. Style Definition
Always use `createStyle()` utility for component styles:
```tsx
// Component.styles.ts
import { createStyle } from '@utils'

export const styles = createStyle({
  root: { p: '2rem', maxW: '100%' },
  button: { px: '1rem', py: '0.5rem' }
})
```

### 2. Pseudo-states
Use underscore prefix for pseudo-states:
```tsx
{ 
  _hover: { color: 'blue' },
  _focus: { outline: '2px' },
  _active: { transform: 'scale(0.98)' }
}
```

## Linting & Formatting

The project uses ESLint with React and TypeScript plugins. Run:
```bash
npm run lint  # Check for issues
npm run build # Type check and build
```

All code must pass linting before committing.

## PR/Commit Guidelines

1. Ensure all code follows these standards
2. Remove any console.log or debug statements
3. Update types when modifying interfaces
4. Test that build succeeds: `npm run build`
5. Use arrow functions consistently throughout changes
6. Create proper folder structure with index files
7. Separate concerns into appropriate files (types, styles, helpers, etc)

---

**Last Updated**: Feb 20, 2026

