# Project Guidelines

## Code Style

- Use TypeScript for all source files in `src/`.
- React function components with arrow function syntax (see [src/components/Button/Button.tsx](src/components/Button/Button.tsx)).
- **Do not use inline styles or inline functions in JSX.**
- Move all logic (state, effects, handlers) out of components and into hooks (see [ItemsMatcher.hooks.ts](src/features/ItemsMatcher/ItemsMatcher.hooks.ts)).
- Styling is handled via Emotion (`@emotion/react`) and `createStyles` utility ([src/utils/createStyles/createStyles.ts](src/utils/createStyles/createStyles.ts)).
- Enforced 2-space indentation, semicolons, and strict linting via ESLint ([eslint.config.js](eslint.config.js)).
- Prefer named exports; use type imports for types.
- Path aliases are defined in [tsconfig.json](tsconfig.json) and [vite.config.ts](vite.config.ts).

## Architecture

- Main app code is in `src/`.
- Features are organized in `src/features/`, components in `src/components/`.
- Utilities and hooks are in `src/utils/` and `src/hooks/`.
- Theming is centralized in [src/styles/theme.ts](src/styles/theme.ts).
- Use the `createStyles` utility for consistent styling.
- Prop types should be created in [Component].types.ts file.

## Build and Test

- Install: `yarn install`
- Start dev server: `yarn dev`
- Build: `yarn build`
- Lint: `yarn lint` (auto-fix: `yarn lint --fix`)
- Preview build: `yarn preview`

## Project Conventions

- Use Emotion's `css` prop for component styles.
- **No inline styles or inline functions in JSX.**
- Use `StrictCssObjectWithSelectors` for style typing.
- All button variants/styles are defined in [Button.styles.ts](src/components/Button/Button.styles.ts).
- Use `@` and other aliases for imports (see [tsconfig.json](tsconfig.json)).
- Prefer functional, stateless components.
- **Component and feature folder structure, file naming, and types should follow the ItemsMatcher example:**
  - Main component: `FeatureName.tsx`
  - Types: `FeatureName.types.ts`
  - Hooks: `FeatureName.hooks.ts[x]`
  - Styles: `FeatureName.styles.ts[x]`
  - Constants: `FeatureName.constants.ts[x]`
  - Helpers: `FeatureName.helpers.ts[x]`
  - Subcomponents in a `components/` folder with their own `index.ts`, `.tsx`, `.styles.ts`, etc.
  - See [src/features/ItemsMatcher/](src/features/ItemsMatcher/) for reference.

## Integration Points

- Uses Vite for build/dev ([vite.config.ts](vite.config.ts)).
- Integrates with MUI (`@mui/material`, `@mui/icons-material`), Emotion, and i18next for localization.
- Excel file handling via `xlsx` package.

## Security

- No authentication or sensitive data handling in the current codebase.
- Review dependencies for vulnerabilities before production deployment.
