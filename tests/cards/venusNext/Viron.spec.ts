import {expect} from 'chai';
import {RestrictedArea} from '../../../src/cards/base/RestrictedArea';
import {Viron} from '../../../src/cards/venusNext/Viron';
import {Game} from '../../../src/Game';
import {SelectCard} from '../../../src/inputs/SelectCard';
import {TestPlayers} from '../../TestingUtils';

describe('Viron', function() {
  it('Should act', function() {
    const card = new Viron();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = new Game('foobar', [player, player2], player);
    const action = card.play();
    expect(action).is.undefined;
    player.corporationCard = card;
    player.playedCards.push(new RestrictedArea());
    player.setActionsThisGeneration(new RestrictedArea().name);
    expect(card.canAct(player, game)).is.not.true;
    player.megaCredits += 2;
    expect(card.canAct(player, game)).is.true;
    const action2 = card.action(player, game);
    expect(action2).is.not.undefined;
    expect(action2 instanceof SelectCard).is.true;
  });
});
