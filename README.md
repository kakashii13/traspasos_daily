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
   # SSS config
URL = "https://www.sssalud.gob.ar/login.php?menuOpciones=Menu+Principal+de+Opciones"
OS_USER = ""
OS_PASSWORD = ""

# Path: downloads
PATH_DOWNLOADS = ""
PATH_RG = ""
PATH_MONO = ""

# Path: files
PATH_RG_A = ""
PATH_RG_B = ""
PATH_MONO_A = ""
PATH_MONO_B = ""

# Path: logs
FILE_LOGGER = ""
```

6. Start the application

```
 npm run start
```

## Usage

- Start the application with the propers .env variables and receive the request data
