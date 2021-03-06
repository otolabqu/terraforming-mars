import {expect} from 'chai';
import {MicroMills} from '../../../src/cards/base/MicroMills';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestingUtils';

describe('MicroMills', function() {
  it('Should play', function() {
    const card = new MicroMills();
    const player = TestPlayers.BLUE.newPlayer();
    const game = new Game('foobar', [player, player], player);
    const action = card.play(player, game);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.HEAT)).to.eq(1);
  });
});
