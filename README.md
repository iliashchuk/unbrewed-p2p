# Unbrewed P2P

This aims to recreate unbrewed.xyz but with webrtc and typescript. This will allow players to connect directly to each other without need for a server. This also makes it easier to fork and remix to your liking without relying on the unbrewed server for games.

- [x] setup typescript: to auto-document code
- [x] setup jest (unit tests): to make refactoring and PRs easier
- [ ] add [webrtc](https://michal-wrzosek.github.io/p2p-chat/)
- [ ] add card template
- [ ] add game actions

## Add Fonts

1. add file to `public/fonts`
1. update `styles/fonts.css`
1. update `styles/styles.ts`

## Journal

random notes/design decisions made

### 2023-4-19

The import worked suprisingly well. Only had 1 issue but still requires a huge rework.

Had an issue measuring the text width in the svg with node-canvas & ssg/hydration issues.
Solution: use functional components instead of a class so that I can use hooks (useEffect)
Buzzkill: have to refactor the entire 600+ lines
