# Raycast & DevUtils Workspace Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Omnikit from a marketing-style landing page into a high-craft, two-column desktop utility workspace inspired by Raycast and DevUtils.

**Architecture:** A persistent, collapsible sidebar on the left handles search, favorites, recents, and the 125-tool category tree. The main canvas on the right renders the active tool workspace (or a Raycast-style command overview when no tool is active), with zero page reloads and instant switching.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Web Audio API.

---

## File Structure & Responsibilities

1. `src/components/Sidebar.tsx` (New):
   - Persistent left sidebar with real-time tool filtering.
   - Pinned / Favorites shelf at the top.
   - Recently used utilities.
   - 5 discipline category trees with item counts and active selection indicators.
   - Collapsible state (`Ctrl+B` / `⌘B`) and mobile responsive drawer.
2. `src/components/DashboardOverview.tsx` (New):
   - Welcome / Home state when no tool is selected.
   - Fast universal command bar.
   - Pinned daily drivers shelf with quick launch.
   - High-density discipline trays (Dev, Design, Text, Video, Audio) for fast scanning.
   - Keyboard navigation shortcuts helper.
3. `src/components/Header.tsx` (Update):
   - Add sidebar toggle button (`PanelLeftClose` / `PanelLeft`).
   - Breadcrumb navigation when a tool is active.
   - Retain search trigger (`Ctrl+K`), sound toggle, offline status, and GitHub link.
4. `src/components/ToolShell.tsx` (Update):
   - Clean, full-bleed tool canvas layout matching the two-column workspace.
   - Integrated action ribbon (Pin, Share direct link, Reset, Esc to close).
   - Companion utilities tray at the bottom.
5. `src/App.tsx` (Update):
   - Integrate `Sidebar` and `DashboardOverview` in a flexible two-column layout.
   - Handle sidebar collapse state and mobile drawer state.
   - Retain URL hash routing (`#tool-id`) and `localStorage` persistence.
6. Verification & Tests:
   - Run unit tests (`node --test tests/*.test.ts`).
   - Run TypeScript typecheck (`npx tsc --noEmit`).
   - Run Vite production build (`npm run build`).

---

## Tasks

### Task 1: Create `src/components/Sidebar.tsx`
- [ ] Build the searchable left sidebar component.
- [ ] Implement Favorites, Recents, and 5 Category tree sections.
- [ ] Add active tool highlighting with discipline indicator bar.
- [ ] Support collapse state and keyboard shortcut `Ctrl+B`.

### Task 2: Create `src/components/DashboardOverview.tsx`
- [ ] Build the overview screen shown when `activeToolId === null`.
- [ ] Include quick search bar, pinned daily drivers, and compact discipline trays.
- [ ] Connect selection callbacks to launch tools.

### Task 3: Update `src/components/Header.tsx` & `src/components/ToolShell.tsx`
- [ ] Add sidebar toggle control in header.
- [ ] Refine breadcrumbs and action buttons in `ToolShell`.
- [ ] Ensure full responsiveness on desktop and mobile.

### Task 4: Integrate Workspace in `src/App.tsx`
- [ ] Wire two-column layout with sidebar and main canvas.
- [ ] Ensure hash navigation, favorites, and recents work seamlessly.
- [ ] Support keyboard shortcuts (`Ctrl+K`, `/`, `Ctrl+B`, `Esc`).

### Task 5: Verification & Deploy
- [ ] Verify TypeScript compilation with `npx tsc --noEmit`.
- [ ] Verify all 232 unit tests pass.
- [ ] Build production bundle with `npm run build`.
- [ ] Commit and push to `main` for GitHub Pages deployment.
