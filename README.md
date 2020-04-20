# Express.js-Premiere
My first encounter with express.js. A small school project for practicing very basic back-end in Node.js and Express. A REST API with GET/POST/PUT/DELETE methods (CRUD) and a total of 5 endpoints.

## Register your dog!
My rest api can store dogs in a json-file; you can add dogs, delete dogs (sadness), change dogs (although all dogs are perfect) and ID-search for a special dog.

You can test the rest api in my project through the request.rest-file in VSCode (if you use VSCode and has the "REST Client" extension installed), or you can open the project in the browser for the full dog-register experience. It's even responsive! So you can add dogs on the go! :D (even though pixel perfect UX responsiveness is under construction, but it's an ok mobile-version). We have the hopes for add-a-picture-feature in the future for easy, more fun collection-point for all your favourite dogs and dog-breeds.

Other features I would have liked but is not there for this version: 
- hitting enter to submit for all input-field-sections.
- search-ID-div: When specific dog is active in search-div, and updated with the PUPDATE-button in search-div, the dog's info should be live-updated in the search-ID-div as well. Right now a pupdate through the search-div updates the dog's info in the dog-list-div (and in dogs.json) but not in the "search specific dog"-div...very confusing for a user. Not good!
- My IDGenerator() is not 100% bulletproof, but bulletproof enough for this assignment.


Repo: **https://github.com/Anne-Lie-Back/Express.js-Premiere**

## How to run project

###### First:

**npm install**


###### Then:
for live-update (recommended):
**nodemon app.js**


else:
**node app.js**


You should now see it at: **http://localhost:5000**
