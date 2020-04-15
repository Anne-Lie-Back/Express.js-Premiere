# Express.js-Premiere
My first encounter with express.js. A small school project for practicing very basic back-end in Node.js and Express. A REST API with GET/POST/PUT/DELETE methods (CRUD) and a total of 5 endpoints.

## Register your dog!
My rest api can store dogs in a json-file; you can add dogs, delete dogs (sadness), change dogs (although all dogs are perfect) and ID-search for a special dog.

You can test the rest api in my project through the .rest-file in VSCode, or you can open the project in the browser for the full dog-register experience. It's even responsive! So you can add dogs on the go (even though pixel perfect UX responsiveness is under construction, but it's an ok mobile-version). We have the hopes for add-a-picture-feature in the future for easy, more fun collection-point for all your favourite dogs or dog-breeds.

Other features I would have liked but is not there for this version: 
- hitting enter to submit for all input-field-sections 
- search-ID-div: When specific dog is active and updated it should be live-updated in the search-ID-div as well. Right now it updates in the dog-list (and in dogs.json) but not in the "search specific dog"-div...very confusing for a user. Not good!


Repo: **https://github.com/Anne-Lie-Back/Express.js-Premiere**

## How to run project

###### First:

**npm install**


###### Then:
for live-update (recommended):
**nodemon app.js**


else:
**node app.js**
