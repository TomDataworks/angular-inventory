angular-inventory
=================

Inventory database implemented in Angular Javascript, Django, Grunt, etc.

About the Project
-----------------

The project has been implemented and tested in the following environment:

- Python 3.2.3 (GCC 4.7.2 on Linux 3.2.57)
- Python 2.7.3 (for compiling latest stable Node sources)
- Java Runtime Environment 1.7.0_65 (for running Protractor tests)
- virtualenv (Python Virtual Environments)
- nginx (Web Server)
- Node.js (for Node Package Manager, installed into virtualenv)
- pip (Python Package Manager)
- Bower (Web Application Package Manager)
- AngularJS (UX)
- Django (Python Web Service)
- uwsgi (CGI Middleware)
- Django Rest Framework
- Bootstrap Framework
- SASS (CSS Pre-Processing)
- Protractor (Testing Framework)
- Selenium (Protractor Web Driver)
- chromedriver (Selenium Interface)

Installing this Project
-----------------------

0. You will need to have the following software installed before you can begin:
- Python 3.2.3 (tested), needs -dev on Debian/Ubuntu
- Python 2.7.3 (tested), needs -dev on Debian/Ubuntu
- Java Runtime Environment 1.7.0_65 (tested)
- Pip Package Manager
- Python Virtualenv for 3.2.3
- nginx Web Server

1. You must install the Node.js software. Make sure to use Python 2, it will not build otherwise. Preferred if you install into the virtualenv with --prefix=/virtual/env/path
2. Enter the virtual environment: virtualenv /virtual/env/path
3. Install some dependencies with pip:

- pip install django
- pip install uwsgi

4. Enter the source directory.
5. Install the dependencies for the package:

- npm install
- npm install -g grunt-cli

6. Configure the uwsgi.ini in server/. You need to change chdir, daemonize, and socket to appropriate values for where you checked the repository into.

>[uwsgi]
>chdir=/home/arven/trucoin/angular-inventory/server
>wsgi-file=server/wsgi.py
>master=True
>pidfile=/tmp/project-master.pid
>vacuum=True
>max-requests=5000
>daemonize=/home/arven/trucoin/var/log/uwsgi/django_inventory.log (set a path for logging)
>socket=/home/arven/trucoin/var/run/uwsgi/app/django_inventory/django_inventory.socket (set a path for socket, you'll need this for the next step)
>chmod-socket=666

7. Configure the inventory_nginx.conf. If you change the listen value, you will also need to change the port in tests/e2e/e2e.conf.js

>uwsgi_pass  unix:///home/arven/trucoin/var/run/uwsgi/app/django_inventory/django_inventory.socket; (set this to the socket specified in uwsgi.ini)
>uwsgi_param UWSGI_PYHOME /home/arven/trucoin/invdb; (set this to your virtual environment path)
>uwsgi_param UWSGI_SCRIPT deploy.deploy;
>uwsgi_param UWSGI_CHDIR /home/arven/trucoin/angular-inventory/server; (set this to the directory the server is located in)
>include     /home/arven/trucoin/angular-inventory/server/uwsgi_params; (set this to the location of uwsgi_params, located in server)
>root        /home/arven/trucoin/angular-inventory/server; (set this to the directory the server is located in)
> 
>location / {
>    root        /home/arven/trucoin/angular-inventory/dist/; (set this to the grunt-created dist directory)
>}

8. Use Grunt to compile the distfiles

grunt

9. Start uwsgi

uwsgi uwsgi.ini

10. Use Grunt to test the project

grunt test

10. Now you can browse to the project path http://localhost:8000/app/index.html
