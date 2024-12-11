# Fullstack Typescript - Frontend Template

A template for a TypeScript frontend.

## Technologies

- React as the framework
- Vite as the bundler
- Style enforced with ESLint

This app expects the following endpoints:

- `POST /login`, accepting inputs `username` and `password`
- `POST /signup`, accepting inputs `username`, `password`, and `confirmPassword`
- `GET /me`, returning data of type `{ username: string, id: number }`
- `PUT /me`, accepting inputs `username`, `password`, `confirmPassword`, and `currentPassword`
