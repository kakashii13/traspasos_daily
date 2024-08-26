# TRASPASOS DAILY

## Description

This project is a scraper of the page Traspasos of SSS. It downloads the files of Traspasos daily.

## Table of contents

- [Installation](#installation)

## Installation

1. Clone the repository:

```
 git clone https://github.com/kakashii13/traspasos_daily.git
```

2. Navigate to the project directory

```
  cd traspasos_daily
```

3. Install dependencies

```
npm install
```

4. Create tsconfig.json

```
 tsc --init
```

5. Create and setup .env file

```
    There are some fixed variables
    URL = "https://www.sssalud.gob.ar/login.php?menuOpciones=Menu+Principal+de+Opciones"
    OS_USER = ""
    OS_PASSWORD = ""
    PATH_DOWNLOADS = ""
    FILE_LOGGER = ""
    PATH_RG = ""
    PATH_MONO = ""
```

6. Start the application

```
 npm run start
```

## Usage

- Start the application with the propers .env variables and receive the request data
- The default date will always be the day before the current day. If you want a custom date, you can pass as parameter in scraper function call

  e.g

```
    await scraper(0, pathToDownload, {day: '01', month: '05', year: '2024'})
```
