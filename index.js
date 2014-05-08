var rest = require('restler');
var baseUrl = 'http://api.mtgdb.info';

module.exports = {

	/**
	 * Looks up a single card by ID and returns an 
	 * object representing that card, and its image
	 * @param {int} cardId The ID of the card to look up
	 * @param {function} callback Callback function called when rest call returns
	 * @return {object} An object containing the card data and image
	 */
	getSingleCard : function(cardId, callback) {
		var endPoint = '/cards';
		var url = baseUrl + endPoint + '/' + cardId;
		rest.get(url).on('complete', function(card) {
			if (callback && typeof(callback) === "function") {  
				var cardImage = 'http://api.mtgdb.info/content/card_images/' + card.id + '.jpeg';
        			return callback({'cardData' : card, 'cardImage' : cardImage});  
    			}
		});
	},

	/**
	 * Looks up cards by name, and returns an array of all matching cards (This accounts 
	 * for reprints across various sets)
	 * @param {string} cardName The name of the card to look up
	 * @param {object} options An object containing any additional filter options, such as set
	 * @param {function} callback Callback function called when rest call returns
	 * @return {array} An array of card objects
	 */
	getCardByName : function(cardName, options, callback) {
		var options = options || null;
		var cleanName = cardName.replace(/\W/g, '');
		var endPoint = '/cards';
		var url = baseUrl + endPoint + '/' + cleanName;
		rest.get(url).on('complete', function(cards) {
			if (callback && typeof(callback) === "function") {
				if (options) {
					var filteredCards = cards;
					if (options['set']) {
						cards.forEach(function(card) {
							if (card.cardSetName === options['set']) {
								filteredCards = [card];
							}
						});
					}
					return callback(filteredCards);
				}
				return callback(cards);
			}
		});
	},

	/**
	 * Gets a random card, and the associated card image (low quality)
	 * @param {function} callback Callback function called when rest call returns
	 * @return {object} An object containing the card object, and the card image
	 **/
	getRandomCard : function(callback) {
		var endPoint = '/cards/random';
		var url = baseUrl + endPoint;
		rest.get(url).on('complete', function(card) {
			if (callback && typeof(callback) === 'function') {
				var cardImage = 'http://api.mtgdb.info/content/card_images/' + card.id + '.jpeg';
				return callback({'cardData' : card, 'cardImage' : cardImage});
			}
		});
	}
}
