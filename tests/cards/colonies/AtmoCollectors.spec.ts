import {expect} from 'chai';
import {AtmoCollectors} from '../../../src/cards/colonies/AtmoCollectors';
import {Game} from '../../../src/Game';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestingUtils';

describe('AtmoCollectors', function() {
  let card : AtmoCollectors; let player : Player; let game : Game;

  beforeEach(function() {
    card = new AtmoCollectors();
    player = TestPlayers.BLUE.newPlayer();
    game = new Game('foobar', [player, player], player);
  });

  it('Should play', function() {
    const action = card.play(player, game);
    expect(action).is.undefined;
  });

  it('Should act', function() {
    player.playedCards.push(card);
    const action = card.action(player, game);
    expect(action).is.undefined;
    expect(card.resourceCount).to.eq(1);

    const orOptions = card.action(player, game) as OrOptions;
    expect(orOptions).is.not.undefined;
    expect(orOptions instanceof OrOptions).is.true;

    orOptions.options[0].cb();
    expect(card.resourceCount).to.eq(0);
    expect(player.titanium).to.eq(2);
  });
});
