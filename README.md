# Groves

Groves is a semiclone of Reddit with an arboreal flavor.

This is the frontend repo. See the [repo for the API here](https://github.com/endulum/groves-api).

### Feature rundown

- Create accounts using traditional username or password, or quickly authenticate using an existing GitHub account
- Create communities, share posts in them, follow them, and manage them using robust moderation and administration abilities
- Engage in threaded commentary by writing replies to posts or other replies
- Vote on posts and replies, use a variety of vote scores to rank content, and accumulate a total voting score from others' votes on your content
- Toggleable light and dark mode, with preference remembered

### Tech rundown

- **Language:** TypeScript
- **Framework:** Express.js on backend, React on frontend
- **Database:** PostgreSQL with Prisma ORM
- **Testing:** Vitest
- **Other:** JSON Web Token, GitHub Apps API, Redis, Docker

[Project Spec](https://www.theodinproject.com/lessons/node-path-nodejs-odin-book)

[Live Deployment](https://groves.up.railway.app)

![A screenshot of the landing page of Groves. The client is not logged in.](https://github.com/endulum/groves/blob/main/src/assets/previews/frontpreview.png?raw=true)

![A screenshot of a post on Groves, with a tree of replies. The client is logged in, and has voted on the post and a reply.](https://github.com/endulum/groves/blob/main/src/assets/previews/repliespreview.png?raw=true)

### Installation

This is a Node.js project, so you will need Node installed.

This repo hosts a frontend that interacts with the [Groves API](https://github.com/endulum/groves-api). It will need to be installed and running on a port.

Navigate to the root directory where you'd like this project to be, and clone this repo:

```sh
git clone https://github.com/endulum/bonfires
```

Navigate to the root of the newly created `/groves`, and install all required packages.

```sh
npm install
```

### Integrations and environment

This project uses two env files: `development` and `production`. This project supplies a file `.env.example` with the variables necessary to run; copy this file to the two envs specified.

```sh
cp -n .env.example .env.development && cp -n .env.example .env.production
```

This frontend uses very few variables:

- `VITE_APP_NAME`: A string representing the name of this app, set to `Groves` by default.
- `VITE_API_URL`: You should have the [Bonfires API](https://github.com/endulum/bonfires-api) up and running somewhere; this var represents the API's URL.
- `VITE_GH_CLIENT_ID`: If you've connected a GitHub App to the Groves API, you should add its client ID here, too.

### Graphics acknowledgements

Background pattern is ["Green Deco" from DinPattern](https://dinpattern.com/2011/03/02/green-deco/).

UI colors are borrowed from [Tailwind Colors](https://tailscan.com/colors).
