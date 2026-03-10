# AGENTS.md - Development Guidelines for Quack the System Game

This file provides guidance for agentic coding agents working in this repository.

## Project Overview

- **Type**: Browser-based 2D game built with TypeScript + Vite + Excalibur game engine
- **Entry point**: `src/main.ts`
- **Output**: SPA served via Vite (runs in browser)

---

## Build & Development Commands

```bash
npm run dev       # Start Vite dev server with hot reload
npm run build     # Run TypeScript compiler (tsc) then build with Vite
npm run preview   # Preview production build locally
```

### Running a Single Test

No test framework is currently configured. If you add tests, typical commands would be:

```bash
npm test                    # Run all tests
npm test -- --run <file>   # Run specific test file (Vitest)
npm test <pattern>         # Run tests matching pattern (Jest)
```

To run a single test in Jest: `npx jest --testPathPattern=filename`
To run a single test in Vitest: `npx vitest run --reporter=verbose filename`

---

## Linting & Type Checking

No linting (ESLint/Prettier) is currently configured.

```bash
npx tsc --noEmit           # Type-check without emitting files
```

For type checking on save, use VS Code's TypeScript server or run `tsc --watch`.

---

## Code Style Guidelines

### Formatting & Layout

- **Indentation**: 2 spaces
- **Quotes**: Single quotes (`'`) for strings
- **Semicolons**: Use semicolons at end of statements
- **Line length**: Keep lines under 120 characters when practical
- **Trailing commas**: Optional in multi-line objects/arrays

### TypeScript Conventions

- **Always use explicit types** on function parameters and return types
- **Use `type` for unions/intersections**, `interface` for object shapes
- **Avoid `any`** - use `unknown` if type is truly unknown
- **Enable strict mode** in tsconfig.json for new code

```typescript
// Good
function greet(name: string): string {
  return `Hello, ${name}`;
}

// Avoid
function greet(name) {
  return `Hello, ${name}`;
}
```

### Naming Conventions

- **Classes & Types**: PascalCase (`Player`, `GameLevel`)
- **Interfaces**: PascalCase with optional `I` prefix if desired (`Actor`, `IActorConfig`)
- **Constants (compile-time)**: SCREAMING_SNAKE_CASE (`GROUND_HEIGHT`, `MAX_SPEED`)
- **Variables & Functions**: camelCase (`player`, `updatePosition`)
- **Files**: kebab-case (`game-scene.ts`, `player-actor.ts`)

### Imports

- **Prefer namespace imports** for Excalibur: `import * as ex from "excalibur"`
- **Use named imports** for local modules:

```typescript
import * as ex from "excalibur";
import { Ground } from "./actors/ground";
import { Level1 } from "./scenes/level1";
```

- **Group imports**: External first, then blank line, then local
- **Avoid barrel files** (`index.ts`) unless necessary for re-exports

### Excalibur-Specific Patterns

- **Engine setup**: Configure in `main.ts`, set physics, gravity, display mode
- **Actors**: Extend `ex.Actor` class, define position, dimensions, color, collision type
- **Scenes**: Extend `ex.Scene`, implement `onInitialize(engine)` for setup
- **Vectors**: Use `ex.vec(x, y)` factory function
- **Colors**: Use `ex.Color.White`, `ex.Color.fromHex("#RRGGBB")`, or `new ex.Color(r, g, b, a)`
- **Collision**: Set `collisionType` to `ex.CollisionType.Fixed`, `Active`, or `Passive`

```typescript
export class Ground extends ex.Actor {
  constructor(screenWidth: number) {
    super({
      pos: ex.vec(screenWidth / 2, 600 - GROUND_HEIGHT / 2),
      width: screenWidth,
      height: GROUND_HEIGHT,
      color: GROUND_COLOR,
      collisionType: ex.CollisionType.Fixed,
      anchor: ex.vec(0.5, 0.5),
    });
  }
}
```

### Error Handling

- **Use try/catch** for async operations and asset loading
- **Log meaningful errors** with context (what failed, why)
- **Avoid swallowing errors silently** - at minimum log to console

```typescript
try {
  const sprite = await loadSprite(path);
  return sprite;
} catch (err) {
  console.error(`Failed to load sprite from ${path}:`, err);
  throw err;
}
```

- **Prefer explicit error messages** over generic ones

### File Organization

```
src/
├── main.ts              # Entry point, engine setup
├── resources.ts         # Asset loading (sprites, sounds)
├── actors/              # Game actors (Player, Ground, Enemies)
├── scenes/              # Level scenes (Level1, MenuScene)
├── utils/               # Helper functions
└── types/               # Shared type definitions
```

- **One class per file** (except very small related classes)
- **Group related functionality** in directories
- **Keep scene logic in scenes/, actors in actors/**

### Git Conventions

- **Commits**: Use clear, descriptive messages (imperative mood)
- **Branches**: `feature/description` or `fix/description` format
- **Never commit** secrets, credentials, or `.env` files
- **Run `npm run build`** before committing to catch type errors

---

## Adding New Dependencies

1. Identify the package needed (e.g., `excalibur` already installed)
2. Run: `npm install <package>` (or `npm install -D <package>` for dev deps)
3. Update this file if new commands/scripts are needed

---

## Common Patterns

### Creating an Actor

```typescript
import * as ex from "excalibur";

export class MyActor extends ex.Actor {
  constructor(x: number, y: number) {
    super({
      pos: ex.vec(x, y),
      width: 32,
      height: 32,
      color: ex.Color.Red,
      collisionType: ex.CollisionType.Active,
    });
  }

  onInitialize(): void {
    // Called once when actor is added to scene
  }

  update(engine: ex.Engine, delta: number): void {
    // Called every frame
    super.update(engine, delta);
  }
}
```

### Creating a Scene

```typescript
import * as ex from "excalibur";
import { MyActor } from "../actors/my-actor";

export class MyScene extends ex.Scene {
  onInitialize(engine: ex.Engine): void {
    const actor = new MyActor(100, 100);
    this.add(actor);
  }
}
```

### Adding Scene to Engine

```typescript
game.addScene("myscene", new MyScene());
game.goToScene("myscene");
```

---

## Further Reading

- [Excalibur Documentation](https://excaliburjs.com/)
- [Vite Guide](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
