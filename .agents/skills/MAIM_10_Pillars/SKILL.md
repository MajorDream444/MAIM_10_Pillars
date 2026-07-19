```markdown
# MAIM_10_Pillars Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill provides guidance on contributing to the MAIM_10_Pillars TypeScript codebase. It covers repository-specific coding conventions, commit patterns, testing practices, and key workflows—especially around production readiness documentation. The goal is to help maintain code consistency, streamline collaboration, and ensure production standards are met.

## Coding Conventions

### File Naming
- Use **snake_case** for all file names.
  - Example: `user_profile.ts`, `data_utils.test.ts`

### Import Style
- Use **relative imports** for referencing modules.
  - Example:
    ```typescript
    import { fetchData } from './data_utils';
    ```

### Export Style
- Use **named exports** for all modules.
  - Example:
    ```typescript
    // In data_utils.ts
    export function fetchData() { ... }
    ```

### Commit Messages
- Follow **Conventional Commits** with the `chore` prefix.
  - Example:  
    ```
    chore: update production readiness documentation for agents
    ```

## Workflows

### Add Production Readiness Control Documentation
**Trigger:** When you need to ensure or document production readiness for a component, agent, or the repository as a whole.  
**Command:** `/add-production-readiness-doc`

1. **Identify** the component or area that needs production readiness documentation.
2. **Create or update** the relevant markdown file:
    - `AGENTS.md`
    - `CLAUDE.md`
    - `.github/PRODUCTION_READINESS.md`
    - `.github/pull_request_template.md`
3. **Document** the necessary production readiness controls or information.
4. **Commit** your changes with a message indicating the addition of production readiness control.
    - Example commit message:
      ```
      chore: add production readiness checklist to CLAUDE.md
      ```
5. **Open a pull request** for review.

#### Example: Adding a Checklist to AGENTS.md
```markdown
## Production Readiness Checklist

- [x] Error handling implemented
- [x] Logging enabled
- [ ] Monitoring configured
```

## Testing Patterns

- **Test File Naming:** Use `*.test.*` pattern for test files.
  - Example: `data_utils.test.ts`
- **Testing Framework:** Not explicitly detected; follow standard TypeScript testing practices.
- **Test Example:**
    ```typescript
    // data_utils.test.ts
    import { fetchData } from './data_utils';

    test('fetchData returns expected result', () => {
      expect(fetchData()).toBeDefined();
    });
    ```

## Commands

| Command                        | Purpose                                                        |
|--------------------------------|----------------------------------------------------------------|
| /add-production-readiness-doc  | Initiate or update production readiness documentation workflow. |
```
