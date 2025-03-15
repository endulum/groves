# Groves

Groves is an arboreal semiclone of Reddit.

![A screenshot of the landing page of Groves. The client is not logged in.](https://github.com/endulum/groves/blob/main/src/assets/previews/frontpreview.png?raw=true)

![A screenshot of a post on Groves, with a tree of replies. The client is logged in, and has voted on the post and a reply.](https://github.com/endulum/groves/blob/main/src/assets/previews/repliespreview.png)

[Project Spec](https://www.theodinproject.com/lessons/node-path-nodejs-odin-book)

## Technologies

- React as the framework
- Vite as the bundler
- Style enforced with ESLint

## Installation

This project is a frontend for the [Groves API](https://github.com/endulum/groves-api). You should have the Groves API installed, and running somewhere.

Navigate to the root directory where you'd like this project to be, and clone this repo:

```
git clone https://github.com/endulum/groves
```

Install all required packages:

```
npm install
```

### Environment

This project uses two env files: `development` and `production`. The repo supplies a file `.env.example` with the variables necessary for the project to run. Copy this file to the three envs described. A handy script for this is provided for you:

```
npm run initenv
```

For development, at minimum you need:

- `VITE_APP_NAME`, the name of this app, `Groves` or whichever you like.
- `VITE_API_URL`, the URL on which the Groves API is running.

Following that, you should be ready to `npm run dev`.

### Github App

The Groves API optionally supports plugging in a GitHub App to allow users to authenticate using their GitHub accounts. In this project, if the env var `VITE_GH_CLIENT_ID` is absent, the frontend features for GitHub authentication will not be present. If your clone of the Groves API supports GitHub authentication, you should copy that clone's `GH_CLIENT_ID` var to this project's `VITE_GH_CLIENT_ID` var to enable this feature on the frontend.
