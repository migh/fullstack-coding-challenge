# Unbabel Fullstack Challenge

## Challenge

We're going to build a very simple translation web app based on the Unbabel API.

You can find more info about the api at [https://developers.unbabel.com](https://developers.unbabel.com)

1) Request an API Key to your hiring manager or point of contact for the hiring process at Unbabel so you can use the API for this tutorial.  
2) Build a basic web app with a simple input field that takes an English (EN) input translates it to Spanish (ES).  
3) When a new translation is requested it should add to a list below the input field (showing one of three status: requested, pending or translated) - (note: always request human translation)   
4) The list should be dynamically ordered by the size of the translated messages   

### Requirements
* Use Flask web framework
* Use Bootstrap
* Use PostgreSQL
* Create a scalable application. 
* Only use Unbabel's Translation API on sandbox mode
* Have tests

## Solution

### Setting up and running

Assuming you have Docker installed and the latest version of the postgres container:

```
# Run docker postgres instance and db_setup content.
export FLASK_ENV=develoment
export FLASK_APP=unbabeler
flask init_db
flask run
```

### Frontend

The project uses React with Typescript for the frontend part. It was decided to go with a very basic configuration built from the ground up instead of a common starter pack for the sake of the challenge.
The architecture is based on React usual component approach, there is only one container that handles all the connection and for the sake of simplicity all other components are function components and have nostate, some components could be further subdivided for a bigger project. The interaction with the backend is isolated in a single service called api, it has relative paths, is promise-based and is easily extensible. It is just a set of functions but could be integrated into a class if desired.

For styling Bootstrap was used almost exclusively (there is one case of inline styling), default css classes were used for making clear bootstrap's layout process. Bootstrap and other libraries (React) were left out of the bundle and included as statics in Flask, it would be recommended to have those from a CDN.

Fetch was used for the requests, as backwards compatibility was not a requirement it is assumed that there is no need for libraries and native implementation is good enough, it should run ok in any modern browser.

### Backend

The database configuration is included in `db_setup.sql`, includes just a database called site and a role admin for not having access to the whole system. For the project a Docker postgresql instance was used, not much effort was put in security, that said, there is no `config.py` and the db string is hardcoded with the user and password into `db.py`. Unbabel API endpoints are also hardcoded in `unbabel.py` were requests to the api are made.

All main routes are inside 'site.py' but there is a `/help` route that is more a way to ping the server than part of the app itself. Flask's template system was not used in favor of leaving all the HTML to the front-end React app.

For interacting with the database the decision to use Alchemy was made, even the main table is created through flask-cli `init_db` task using Alchemy. For now, front-end code was bundled by webpack into flask's static js directory, but the decision could be taken tto use flask-cli for getting latest code and drive building instead of webpack (webpack should still be used to build the js code, but the build and copy process could be triggered by a flask-cli task).

### Scalability

The application is very modular both in front-end and back-end and that means it can be easily used in a bigger architecture. I believe the best approach for scalability would be to create a Docker container with Python and PostgreSQL and use instances as needed, but that is a more devops approach.

Regarding app's architecture, scalability is achieved by a clear separation of concerns and modularity.

### Testing

Extensive testing was not made, but some tests were written for both front-end and back-end, less for back-end.
