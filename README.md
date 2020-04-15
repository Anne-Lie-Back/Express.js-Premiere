## Express.js-Premiere
My first encounter with express.js. A small school project for practicing very basic back-end. REST API with GET/POST/PUT/DELETE methods.

# Register your dog!
My rest api can store dogs in a json-file; you can add dogs, delete dogs (sadness), change dogs (although all dogs are perfect) and ID-search for a special dog.

You can test the rest api in my project through the .rest-file in VSCode, or you can open the project in the browser for the full dog-register experience. It's even responsive! So you can add dogs on the go (even though pixel perfect UX responsiveness is under construction, but it's an ok mobile-version). We have the hopes for add-a-picture-feature in the future for easy, more fun collection-point for all your favourite dogs or dog-breeds.

Other features I would have liked but is not there for this version: 
- hitting enter to submit for all input-field-sections 
- search-ID-div: When specific dog is active and updated it should be live-updated in the search-ID-div as well.

## How to run project
FIRST:

npm install

THEN:

for live-update (recommended):
nodemon app.js

else:
node app.js
