const chai = require('chai');
const expect = chai.expect;

const Round = require('../src/Round');
const Deck = require('../src/Deck');
const Card = require('../src/Card');
const Turn = require('../src/Turn');

describe('Round', function() {

  let card1;
  let card2;
  let card3;
  let deck;
  let round1;

  beforeEach(function() {

    card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

    deck = new Deck([card1, card2, card3]);

    round1 = new Round(deck);

  })

  it('should be a function', function() {
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Deck', function() {
    expect(round1).to.be.an.instanceof(Round);
  });

  it('should return the current card in play', function() {
    expect(round1.returnCurrentCard()).to.equal(round1.currentCard);
  });

  it('should keep track of how many turns have been taken', function() {
    expect(round1.turns).to.equal(0);

    round1.takeTurn();
    round1.takeTurn();
    round1.takeTurn();

    expect(round1.turns).to.equal(3);
  });

  it('should instantiate a new turn when a guess is made', function() {
    let round2 = this.turn;
    round1.takeTurn('dust bunny');
    expect(round2).to.not.equal(round1.turn);
  })

  it('should evaluate answer and give feedback when it a turn is taken', function() {
    expect(round1.takeTurn('porcupine')).to.equal('Incorrect!');
  });

  it('should store the id of incorrect guesses', function() {
    round1.takeTurn();

    expect(round1.incorrectGuesses).to.deep.equal([1]);
  });

  it('should calculate and return percentage of correct guesses', function() {

    round1.takeTurn('chupacabra');
    round1.takeTurn('gallbladder');

    expect(round1.calculatePercentageCorrect()).to.equal(50);
  });

  it('should end round with a message showing percentage correct', function() {

    round1.takeTurn('chupacabra');
    round1.takeTurn('gallbladder');

    expect(round1.endRound()).to.equal('**Round over!** You answered 50% of the questions correctly!');
  })
});
