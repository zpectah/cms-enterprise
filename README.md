# Enterprise CMS

**!!! In development !!!**

## Description
Simple content managing system with common content features with Crm and Market options.

## Requirements
* Must be installed globally on machine:
    - Node.js (Node Package Manager)
    - Yarn
    - Gulp CLI
* PHP and Composer (For Windows may be different stack)
* Apache Server with MySQL database. Prefer (XAMP / MAMP / LAMP / ...)

## Dependencies
* JavaScript:
    - TypeScript
    - Babel
    - React
    - styled-components (https://styled-components.com/)
    - JSS (https://cssinjs.org/styled-jss?v=v2.2.3)
    - Material UI (https://mui.com/)
    - Redux
    - i18n (https://react.i18next.com/)
    - lodash
    - moment.js
    - swr (https://swr.vercel.app/)      
    - ...more
* PHP 7+:
    - bladeone (https://github.com/EFTEC/BladeOne)
    - php-image-resize (https://github.com/gumlet/php-image-resize)
    - mysqldump-php (https://github.com/ifsnop/mysqldump-php)
* Styles:
    - Sass/SCSS
* Tests:
    - Jest (https://jestjs.io/)
    - Webdriver (https://webdriver.io/)
    - Selenium (https://www.selenium.dev/documentation/webdriver/)

## Development configuration
### Apache Server for development
#### Virtual Host
```
<VirtualHost *:80>
    DocumentRoot "/path-to-project-root/.../cms-enterprise/dev/"
    ServerName enterprise
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "/path-to-project-root/.../cms-enterprise/test/"
    ServerName test.enterprise
</VirtualHost>
```
#### Hosts
```
127.0.0.1		enterprise
127.0.0.1		test.enterprise
```

### Note
- (!) If you config correctly and open your browser with ``http://enterprise/`` or ``http://test.enterprise/`` you will see current build
- (!) Configuration paths may be different for Windows or MacOS/Linux system users

## Development
### Install & prepare
- ``% yarn install`` - Install node packages
- ``% yarn initial`` - Prepare PHP vendors

### Watch
- ``% yarn start`` - Watching changes for whole project

### Build
- ``% yarn build:dev`` - Create development bundle
- ``% yarn build:test`` - Create test bundle
- ``% yarn build:prod`` - Create production bundle

### Tests
- ``% yarn test:jest`` - Run test scripts for Jest
- ... todo

## Tests
... todo

## Environment directories

Location | Description
--- | ---
``./src`` | Source directory
``./dev`` | Created **development** directory
``./test`` | Created **test** directory (prepared for local test)
``./prod`` | Created **production** directory (prepared for deploy)

## File structure

Location | Description
--- | ---
``/admin`` | Root admin directory (endpoint)
``/api`` | Root api directory (endpoint)
``/web`` | Root web directory (endpoint)
``/config`` | Config files
``/core`` | PHP Core files
``/libs`` | Extended libraries (Only for imports)
``/assets`` | Static files (images or whatever)
``/vendor`` | Vendor directory (Composer)
``/uploads`` | Uploaded files from system
``/logs`` | Log files, if any

## Configuration and Options files

Name | Type | Location | Description
--- | --- | --- | ---
Development | All | ``gulp.config.js`` | Development configuration file
Config | Admin | ``./src/admin/scripts/config.js`` | Admin config file imports


## Api
- See ``./docs.api.md`` file for more info