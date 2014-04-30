mtgdb-wrapper
=============

A simple wrapper for the MtgDB API Project (found here: http://api.mtgdb.info/)

## Installation

	npm install mtgdb-wrapper --save

## Usage

	var mtgDb = require('mtgdb-wrapper');

	//Get card by ID
	mtgdb.getSingleCard(380449, function(card) {
		//Launch the Fleet
		console.log(card);
	});

	//Get random card
	mtgdb.getRandomCard(function(card) {
		//Random card
		console.log(card);
	});

	//Get cards by name
	mtgdb.getCardByName('Circle of Protection: Red', {}, function(cards) {
		//Array containing all versions of card called 'Circle of Protection: Red'
		console.log(cards);
	});

	//Get cards by name from a specific set
	mtgdb.getCardByName('Circle of Protection: Red', {set : 'Fifth Edition'}, function(cards) {
		//Array containing Circle of Protection: Red card object from Fifth Edition
		console.log(cards);
	});

## Tests

	npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
