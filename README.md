# Project - professional portfolio website with blog

# Distinctiveness and Complexity

## Requirements:
- app is mobile responsive,
- has two apps: card and blog,
    - in card app there are models with important fields: Project, Skill, Testimonial,
    - in blog app there are models: Category, Post;
- database data should be loaded asynchronously and managed by JavaScript.
- admin should be able to login with his email and manage the content in django admin panel

## Files overview
Files are divided into categories: static, blog, card, templates, other.
### static
In static folder there are three directories: js, css, images and also a font file.
#### In js folder there are:
- blog.js - contains function to create a view by loading the content. This file is also responsible for managing the content (pagination [for test purposes the quantity is set to 1]) connected with posts (getAllPosts), filtering the posts using categories (getAllCategories). There is also a function used to display one post with all content (getPost).
- card.js - contains three asynchronous functions which load the data from server and manage it using dom manipulation (getAllTestimonials, getAllSkills and getAllProjects). It also contains the "animationWriting" function to make the custom "writing" animation.
The above .js files export some functionalities to be used in manageContent.js file.
- manageContent.js - checks the url and choose the content to display and add a event listener to a tags, also the hamburger menu functionality is here(in event listener of document), window has its event listener for changing the url. The file contains the function prepareATag which is used to prevent the default behavior of a tag, push state to history and manage the content by checking the url; scroll to some specific element is here implemented.

#### In css folder there are:
- style.scss - contains all styles.
- other files are created by sass compiler.

#### In images folder there are:
- images used on the website

### card
It is an app folder which contains views and api used to load data and send it to clients.
- models.py - contains models (see requirements above) with necessary fields.
- urls.py - all urls used in card app (api urls also).
- views.py - contains api views created for returning the data and one for returning the html.
- tests.py - some simple tests to see if api works fine.

### blog
It is an app folder which contains all files used for blog application.
- models.py - there are two models Post and Category.
- urls.py - all urls used in blog app (api urls also).
- views.py - contains api views created for returning the data.
- tests.py - some simple tests to see if api and view works fine.
### templates
- layout.html - contains the header, footer, css link and important blocks like body or script (separately for future development).
- index.html - contains HTML blocks for card and blog app created for managing the content by .js files. Some like section hero are static (the content is not downloaded from database).

### media
Folder created by django to manage files like images.

## How to run the application
1. Clone the repository (git clone https://github.com/Krzesimir04/portfolio)
2. Create new virtual environment (ython3 -m venv env)
3. Run your env (source env/bin/activate)
4. Go to portfolio directory (cd portfolio)
5. Install all packages from requirements.txt file (pip install -r requirements.txt)
6. Run the server (python3 manage.py runserver)

## Additional notes
You can see there already is the db.sqlite3 database file. There are some initially created object to be shown in the card (index/main) and blog pages.

There is also created a super user with credentials:
- email: admin@gmail.com
- password: admin

So you can log into the django admin panel and see the starter data.