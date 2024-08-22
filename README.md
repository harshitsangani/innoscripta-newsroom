<div align='center'>
    <h1><b>📰 InnoScripta NewsRoom 📰</b></h1>
    <img src='./public/screenshot.png' width='400' height='210' />
    <p>The InnoScripta NewsRoom is a web application that allows users to view news articles from various sources. The application is built using the React framework and the News API from <a href="https://newsapi.org/">newsapi.org</a>.</p>

![JavaScript](https://badgen.net/badge/JavaScript/ES2020/yellow?)
![TypeScript](https://badgen.net/badge/TypeScript/^5.5.3/blue?)
![Node.js](https://badgen.net/badge/Node.js/18/green?)
![React](https://badgen.net/badge/React/18.3.1/cyan?)
![Docker](https://badgen.net/badge/Docker/27.1.1/cyan?)
![Size](https://img.shields.io/github/languages/code-size/harshitsangani/innoscripta-newsroom.svg)
![Top Language](https://img.shields.io/github/languages/top/harshitsangani/innoscripta-newsroom.svg)
![GitHub version](https://badge.fury.io/gh/harshitsangani%2Finnoscripta-newsroom.svg)

</div>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisities

In order to run this container you'll need docker installed.

- [Windows](https://docs.docker.com/desktop/install/windows-install/)
- [OS X](https://docs.docker.com/desktop/install/mac-install/)
- [Linux](https://docs.docker.com/desktop/install/linux-install/)

## 🗒️ **INSTALLATION**

### local installation:

1. clone the repo

```
git clone https://github.com/harshitsangani/innoscripta-newsroom.git
```

2. cd into cloned repo

```
cd repo
```

3. install dependencies

```
yarn
```

4. run the app

```
yarn dev
```

<br />

### local installation via docker:

1. clone the repo

```
git clone https://github.com/harshitsangani/innoscripta-newsroom.git
```

2. cd into cloned repo

```
cd repo
```

3. build the app

```
docker build -t innoscripta-newsroom .
```

4. run the app

```
docker run -p 3000:3000 -ti innoscripta-newsroom
```

<br/>

### run remotely via docker:

1. run the app

```
docker run -ti harshitsangani/innoscripta-newsroom
```

<br />

---

#### Environment Variables

- `VITE_NEWS_API_API_KEY` - API key for the News API

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- NewsAPI.org
