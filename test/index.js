var should = require('chai').should(),
	mtdb = require('../index');

describe('Individual Card Functions', function() {
	it ('Gets a single card by ID', function(done) {
		mtdb.getSingleCard(380449, function(card) {
			card.name.should.equal('Launch the Fleet');
			done();
		});
	});

	it ('Gets a single random card', function(done) {
		mtdb.getRandomCard(function(card) {
			card.should.have.ownProperty('name');
			done();
		})
	})
});

describe('Looking up cards by name', function() {
	it ('Gets a single card by name', function(done) {
		mtdb.getCardByName('Launch the Fleet', {}, function(card) {
			card[0].name.should.equal('Launch the Fleet');
			done();
		});
	});

	it ('Should handle non alphanumeric characters in card names', function(done) {
		mtdb.getCardByName('Circle of Protection: Red', {}, function(cards) {
			cards.length.should.above(0);
			cards[0].name.should.equal('Circle of Protection: Red');
			done();
		});
	});

	it ('Should find the correct card by set when searching by name', function(done) {
		mtdb.getCardByName('Circle of Protection: Red', {set : 'Fifth Edition'}, function(cards) {
			cards.length.should.equal(1);
			cards[0].name.should.equal('Circle of Protection: Red');
			done();
		})
	})
})