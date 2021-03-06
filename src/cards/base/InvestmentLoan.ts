
import {Tags} from '../Tags';
import {IProjectCard} from '../IProjectCard';
import {CardType} from '../CardType';
import {Game} from '../../Game';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';

export class InvestmentLoan implements IProjectCard {
    public cost = 3;
    public tags = [Tags.EARTH];
    public cardType = CardType.EVENT;
    public name = CardName.INVESTMENT_LOAN;
    public hasRequirements = false;
    public canPlay(player: Player): boolean {
      return player.getProduction(Resources.MEGACREDITS) >= -4;
    }
    public play(player: Player, _game: Game) {
      player.addProduction(Resources.MEGACREDITS, -1);
      player.megaCredits += 10;
      return undefined;
    }
}
