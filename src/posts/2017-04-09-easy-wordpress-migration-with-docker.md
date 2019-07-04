---
title: "Easy WordPress Migration with Docker"
subtitle: "Local environments in 5 minutes or less"
categories: engineering
date: 2017-04-09 14:00:00 -0500
tags: development WordPress docker process tools
excerpt: "I've recently upgraded to a new laptop, and wanted to take that opportunity to see if Docker is as great as everyone says it is. One of the first projects I took on was seeing if I could power local WordPress environments entirely with docker containers. Good news, not only does it work, but it's incredibly simple."
slug: 2017/04/09/easy-wordpress-migration-with-docker
status: published
---

### Intro

If you've build sites on WordPress, chances are, you've used one or many local development environments to allow your team to work in parallel.

Onboarding a new team member or new computer can be time consuming as it has historically taken a decent amount of effort to get a servicable copy of a production WordPress site onto a local machine. Whether you used a service like MAMP or just fired up Apache some other way, the most painful piece of work was always migrating the database.

I've recently upgraded to a new laptop, and wanted to take that opportunity to see if Docker is as great as everyone says it is. One of the first projects I took on was seeing if I could power local WordPress environments entirely with docker containers. Good news, not only does it work, but it's incredibly simple.

### Install Docker

The first thing you need to do is install Docker on your local machine. If you're using a [Mac](https://www.docker.com/docker-mac) or [Windows](https://www.docker.com/docker-windows), Docker provideds a great little installer to make that simple. Docker also provides distributions for all flavors of Linux.

### Pull Images

Once Docker is installed succesfully, you'll need to pull the images you'll need for your environment. If you've worked with virtual machines in the past, the term "image" is probably familiar, and it's a similar concept. An image is just a stack of all the requisite software to run your application. Generally, each image represents once piece of technology (i.e. WordPress or MySQL) but it may include underlying technology that helps that thing run (i.e. linux, apache, etc.)

#### WordPress

If you check out the [Docker Store](https://store.docker.com) you can find all sorts of public images. There's an [official WordPress image](https://store.docker.com/images/WordPress?tab=description) provided by the Docker team that we'll be using for our local environments.

From your terminal, run `docker pull WordPress`. Don't worry about what directory you're in, as pulling images from Docker keeps them all together in one place, irrespective of where you are in the filesystem.

#### MySQL

There's an [official MySQL image](https://hub.docker.com/_/mysql/) on the Docker Store as well. From your terminal, run `docker pull mysql`.

Now that we have our images, we can configure our environment.

### Docker Composer

Docker Composer is a tool in the Docker ecosystem that allows us to configure an application that uses multiple images and containers. In this case, we need both our MySQL container and our WordPress container to work together to power our WordPress instance.

#### Docker vs. Docker Composer

Theoretically, you could run this instance just using a plain-old `docker` command. However, you'd need to pass a bunch of options into the command to let Docker know how to configure each container. With Docker Composer we can write a `docker-compose.yaml` file that's used by Docker to store all of our configuration. That way, when it's time to run our containers, we don't have to remember any configuration options.

### Configuring our Project

So, let's look at our `docker-compose.yaml` file. Now it's time to navigate to your project folder and add this file to the root. If your wordpress site includes core files in the repo, that's ok! We'll tell Docker which files are important to reference from our project in our composer file.

Check out the comments to understand what's going on:

```yaml
# docker-compose.yaml

version: '2' # version of docker-compose to use

services: # configuring each container
  db: # name of our mysql container
    image: mysql:5.7 # which image to pull, in this case specifying v. 5.7
    volumes: # data to map to the container
      - ./data:/docker-entrypoint-initdb.d # where to find our data -- we'll talk more about this
    restart: always # always restart the container after reboot
    environment: # environment variables -- mysql options in this case
      MYSQL_ROOT_PASSWORD: wordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress: # name of our wordpress container
    depends_on: # container dependencies that need to be running first
      - db
    image: wordpress:latest # image used by our container
    ports:
      - "8000:80" # setting our ports for networking
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306 # default mysql port
      WORDPRESS_DB_PASSWORD: wordpress # matches the password set in the db container
    volumes: # this is where we tell Docker what to pay attention to
      - ./wp-content/themes/my-theme:/var/www/html/wp-content/themes/my-theme # mapping our custom theme to the container
      - ./wp-content/plugins:/var/www/html/wp-content/plugins # map our plugins to the container
      - ./wp-content/uploads:/var/www/html/wp-content/uploads # map our uploads to the container
```

I know that looks like a lot, but hopefully my comments help you parse it. You can [learn more about docker-compose files by reading the docs](https://docs.docker.com/compose/compose-file/).

### Migrating Our Database

This has always been the biggest painpoint with migrating any CMS, and WordPress is no exception.

But good news! Docker makes it easier for us to migrate databases moving forward!

#### Get an Export File

Wherever the database you want to migrate lives (for our example we'll call it the production db), hop over to it and get an export `.sql` of the whole thing. This is easy to do with a tool like PHPMyAdmin.

1. Navigate to PHPMyAdmin
2. Click on the database name in the list of databases on the left.
3. Click "Export" in the top row of tabs on the right.
4. Ensure "Export method:" is set to "quick" and "Format:" is set to "SQL".
5. Press "Go"

That should download a database dump/export file for your production database.

#### Change URLs in the Data

One of the tricky things about migrating a WordPress database is that the site url can be saved in countless places, and you generally need to do SQL queries to update all instances of the old url with the new url you'll use locally.

Since we've got our database dump as an SQL file, I've found that it's simpler (without having to look up SQL functions) to open our .sql in a text editor, and change instances there.

So open up your export file in your favorite text editor and do a find and replace for `http://oldurl.com` to `http://localhost:8000`. Notice that the port here matches the port we've set for WordPress in our `docker-compose.yaml` file. If you're using a different port, you'll need to match that up here as well.

Once you're done with the find and replace, save your file.

#### Import the Database

This is where things are AWESOME. In the root of your wordpress project, create a folder called `data`. Copy your your export file that you just saved inside of that folder.

Now, if you look back at our `docker-compose.yaml` file, you'll notice we reference that folder.

```yaml
# docker-compose.yaml
...
db:
  ...
  volumes:
    - ./data:/docker-entrypoint-initdb.d
  ...
```

Here we're telling the `db` container to look in that `data` folder for a `.sql` export and to use it to populate our database.

That's all it takes! Now every time you spin up a container, it'll use that same database info to populate it, without needing to manually import data.

_**Note: It's worth exporting a basic set of data and keeping that file inside of your project repo. If you do that work up-front, your team won't need to worry about migrating data into their local database ever again!**_

### Migrate our Uploads

The final piece is to move our images and uploads to our local environment. Generally I just FTP the uploads folders I want from production and copy them into our local instance. You could probably find an easier way to do this if you needed to stamp out environments quickly/frequently, but this works OK for most of my projects.

_**Note: If you want your team to spin up their own environments, I'd highly recommend saving your base uploads somewhere OTHER than the production environment. Having people FTPing into a live instance is a surefire way to accidentally delete all sorts of things.**_

### Mapping Important Files

Looking at our `docker-compose.yaml` again, we see the following in our `wordpress` container config:

```yaml
# docker-compose.yaml
...
  wordpress:
    ...
    volumes: # this is where we tell Docker what to pay attention to
      - ./wp-content/themes/my-theme:/var/www/html/wp-content/themes/my-theme # mapping our custom theme to the container
      - ./wp-content/plugins:/var/www/html/wp-content/plugins # map our plugins to the container
      - ./wp-content/uploads:/var/www/html/wp-content/uploads # map our uploads to the container
...
```

This segment tells the container which files to use from our local project. In this case, I'm pointing to a theme, my plugins folder, and my uploads folder. However your project is organized, just update the left side of those arguments 
(everything before the colon) to match your filesystem.

### Fire It Up

OK - that's it! Now, pop over to your terminal, navigate to the folder your project is in, and run `docker-compose up`. This should load up the containers you've defined in your `docker-compose.yaml`. Navigate in your browser to `http://localhsot:8000` or whatever port you've assigned in your configuration, and you should see WordPress!

### Conclusion

If you've migrated as many Wordpress sites as I have, you'll immediately love the simplicity of this approach. After a bit of tailoring to your own organization to optimize the db_export and uploads folder process, you could really do an install in just a couple of minutes flat!