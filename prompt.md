# 🎮 PROJECT: Pikachu Matching Game (Onet Connect)

## 1. 🎯 OBJECTIVE
Build a complete Pikachu (Onet Connect) game where players match identical tiles using a maximum of 3-line connections.

The game must be:
- Smooth, responsive
- Visually appealing (cute, modern UI)
- Addictive gameplay loop
- Easy to scale with more levels

---

## 2. 🧠 CORE GAMEPLAY LOGIC

### Matching Rules:
- Player selects 2 identical tiles
- Tiles can be connected if:
  - Path has ≤ 3 straight segments (≤ 2 turns)
  - Path is not blocked by other tiles
- If valid → remove both tiles
- If invalid → reset selection

### Board:
- Grid size: default 8x12 (configurable)
- Tiles placed in pairs randomly
- Always ensure solvable board

---

## 3. 🕹️ GAME FEATURES

### Basic Features:
- Timer countdown
- Score system:
  - + points per match
  - combo bonus for fast matches
- Hint system (limited uses)
- Shuffle system (when stuck)

### Advanced Features:
- Multiple levels (increasing difficulty)
- Tile movement modes:
  - Static (level 1–3)
  - Falling tiles
  - Random shifting
- Sound effects + background music
- Pause / Resume

---

## 4. 🎨 UI/UX DESIGN

### Style:
- Cute, modern, vibrant
- Inspired by classic Pikachu but cleaner UI

### Screens:
1. Start Screen
2. Game Screen
3. Pause Menu
4. Game Over Screen
5. Victory Screen

### Animations:
- Tile selection highlight
- Connection line animation
- Tile removal effect
- Combo effect

---

## 5. ⚙️ TECH REQUIREMENTS

### Suggested Stack:
- Web: HTML5 Canvas / React / Phaser.js
OR
- Mobile: Flutter / Unity

### Code Structure:
- Separate modules:
  - Game logic
  - Rendering
  - UI
  - State management

---

## 6. 🧩 ALGORITHMS REQUIRED

### Pathfinding:
- Implement algorithm to check valid path with ≤ 2 turns
- Use BFS or DFS with constraints

### Board Generation:
- Generate pairs randomly
- Ensure at least 1 valid move exists

### Shuffle:
- Re-randomize tiles but keep solvable state

---

## 7. 📈 SCALABILITY

- Easily add new tile themes (food, emoji, animals)
- Level config via JSON
- Support leaderboard integration

---

## 8. 🎁 OPTIONAL (NICE TO HAVE)

- Daily challenge mode
- Power-ups:
  - Freeze time
  - Auto-match
- Online multiplayer (race mode)

---

## 9. 📦 OUTPUT REQUIREMENTS

Generate:
- Full source code
- Clear folder structure
- Instructions to run locally
- Comments explaining core logic

---

## 10. 🚀 PRIORITY

Focus on:
1. Smooth gameplay
2. Accurate matching algorithm
3. Good UX feedback
4. Clean, maintainable code