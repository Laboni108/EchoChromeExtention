# EchoGPT — Multi-AI Chat Chrome Extension

A redesigned, reimagined concept for the EchoGPT Chrome Extension — a compact, dark-first popup that lets users chat with multiple AI models, use quick actions, revisit past conversations, and customize their experience, all built with React, Tailwind CSS, and Chrome's Manifest V3.

This project is a **frontend UI/UX redesign assignment**. It focuses on interface design, interaction patterns, component architecture, and Chrome extension packaging — not on live AI integration or backend services.

---

## Project Overview

EchoGPT's popup interface has been rebuilt from the ground up with three core screens accessible through a persistent navigation rail:

- **Chat** — Select an AI model, use quick-action prompts (Summarize, Explain, Rewrite, Brainstorm), and hold a full conversation with mocked AI responses, including copy and regenerate actions on each reply.
- **History** — Every conversation is automatically saved and searchable. Conversations can be reopened (restoring both the messages and the model that was used) or deleted.
- **Settings** — Switch between dark and light themes, choose a default AI model, view the keyboard shortcut, and see app version info.

The visual identity — a dark, rounded, purple/pink/orange gradient aesthetic with a cat-badge logo — is carried over directly from the companion EchoGPT web application, so the extension and the website feel like one cohesive product.

---

## Setup Instructions

**Prerequisites:** Node.js and npm installed.

1. **Clone or download the project folder**, then install dependencies:
   ```bash
   npm install
   ```

2. **Run in development mode** (hot-reload while building):
   ```bash
   npm run dev
   ```

3. **Build the extension** (required before loading into Chrome — a dev server alone will not behave like a real popup):
   ```bash
   npm run build
   ```
   This generates a `dist/` folder containing the packaged extension.

4. **Load into Chrome:**
   - Open `chrome://extensions/`
   - Enable **Developer mode** (top-right toggle)
   - Click **Load unpacked**
   - Select the `dist` folder

5. **Open the extension:**
   - Click the puzzle-piece icon in Chrome's toolbar and pin **EchoGPT** for quick access
   - Click the EchoGPT icon to open the popup
   - Or use the keyboard shortcut: `Ctrl+Shift+E` (Windows/Linux) / `Cmd+Shift+E` (Mac) — if that combination is already taken on your system, reassign it at `chrome://extensions/shortcuts`

**Note:** After making code changes, you must re-run `npm run build` and click the reload icon on the extension's card in `chrome://extensions/` to see updates.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| **React** | Component-based UI |
| **Vite** | Build tooling and dev server |
| **Tailwind CSS v4** | Utility-first styling, theme tokens via `@theme` |
| **@crxjs/vite-plugin** | Bridges Vite's build output with Chrome's Manifest V3 requirements |
| **lucide-react** | Icon set (cat logo, model icons, quick action icons, nav icons) |
| **Chrome Manifest V3** | Extension packaging, popup action, keyboard commands |
| **Chrome Storage API** (`chrome.storage.local`) | Persists theme, default model, and conversation history between popup sessions |

No backend, authentication provider, or real AI API is used — see Assumptions below.

---

## Assumptions

- **No backend or real AI integration.** Per the assignment scope, all AI responses are mocked (randomly selected from a small set of canned replies with a simulated ~500ms "typing" delay). The architecture is intentionally structured so a real API call could later replace the mock function (`getMockResponse`) with minimal changes elsewhere.
- **No authentication.** The real-world EchoGPT product requires sign-in; this redesign assumes an already-authenticated user and skips login/account UI entirely, as instructed.
- **Popup, not side panel.** The actual published EchoGPT extension uses Chrome's Side Panel API. This redesign intentionally uses a traditional popup instead, matching the assignment's explicit "Popup UI" requirement.
- **Local, per-device storage only.** Conversation history and preferences are saved via `chrome.storage.local`, meaning they persist across popup sessions on the same browser/device, but are not synced across devices or accounts (no backend exists to do so).
- **Icons are omitted from the manifest.** Since the logo is a live React component (not a source image file), and Chrome's toolbar/extensions-page icon requires static image files outside the page's control, no custom toolbar icon was generated for this submission. Chrome displays its default extension icon in that one specific location; every icon inside the actual UI is fully custom.
- **Keyboard shortcut availability varies by machine.** `Ctrl+Shift+E` is suggested in the manifest but Chrome will not override a conflicting shortcut already claimed by another extension or the OS; users may need to reassign it manually.

---

## Additional Features Implemented

Beyond the core assignment checklist, the following were added to improve usability and demonstrate more complete product thinking. These are additions not found in the original EchoGPT Chrome Web Store extension that this project reimagines:

- **Auto-generated conversation titles** — the first message of a new chat is used to generate a readable title, rather than requiring the user to name conversations manually.
- **Relative timestamps** — conversations display human-friendly times ("Just now," "2h ago," "Yesterday") that update based on when the conversation was last active.
- **Live conversation search** — the History page filters conversations in real time as you type.
- **Restores model context on reopen** — selecting a past conversation from History automatically re-selects whichever AI model was used in that conversation.
- **Typing indicator** — an animated three-dot indicator appears while the (mocked) AI response is being generated, rather than a silent delay.
- **Full keyboard accessibility** — every interactive element (nav rail, model selector, quick actions, prompt input, history rows, settings controls) is reachable and operable via keyboard alone, with visible focus rings and `aria-label`s on all icon-only buttons.
- **Reduced-motion support** — respects the OS-level "reduce motion" accessibility setting, minimizing transitions and animations for users who have that preference enabled.

---

## Keyboard Navigation

The entire popup is fully operable without a mouse, meeting accessibility best practices for interactive UI:

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move focus forward/backward through all interactive elements (nav icons, model selector, quick actions, prompt input, history items, settings controls) |
| `Enter` (on a focused button/history item) | Activate the focused element — open a conversation, click a nav tab, toggle a setting |
| `Space` (on a focused history item) | Also opens the conversation (same as `Enter`) |
| `Enter` (inside the prompt textarea) | Send the message |
| `Shift+Enter` (inside the prompt textarea) | Insert a new line without sending |
| `Ctrl+Shift+E` (Windows/Linux) / `Cmd+Shift+E` (Mac) | Open the EchoGPT popup from anywhere in the browser (configurable at `chrome://extensions/shortcuts` if already taken by another extension) |

Every focused element displays a visible purple focus ring (`focus-visible`), so keyboard users can always tell where they are. Icon-only buttons (Copy, Regenerate, Delete, nav items) all include `aria-label`s for screen reader support, and the interface respects the OS-level "reduce motion" setting.

---

## Project Structure

```
src/
├── components/       # Reusable UI components (Logo, NavRail, ChatMessage, etc.)
├── data/             # Mock data (models, quick actions, canned AI responses)
├── hooks/            # Custom hooks (useChromeStorage)
├── utils/            # Small helper functions (title generation, relative time)
├── App.jsx           # Root component — page routing and shared state
├── index.css         # Tailwind import + theme tokens + global styles
└── main.jsx          # React entry point
manifest.json          # Chrome Manifest V3 configuration
vite.config.js          # Vite + Tailwind + CRXJS plugin configuration
```
