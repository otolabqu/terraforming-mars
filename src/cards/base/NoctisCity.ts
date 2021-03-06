
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Game} from '../../Game';
import {SpaceName} from '../../SpaceName';
import {Resources} from '../../Resources';
import {SelectSpace} from '../../inputs/SelectSpace';
import {ISpace} from '../../ISpace';
import {BoardName} from '../../BoardName';
import {CardName} from '../../CardName';

export class NoctisCity implements IProjectCard {
    public cost = 18;
    public tags = [Tags.CITY, Tags.STEEL];
    public name = CardName.NOCTIS_CITY;
    public cardType = CardType.AUTOMATED;
    public hasRequirements = false;
    public canPlay(player: Player, game: Game): boolean {
      if (game.gameOptions.boardName === BoardName.ORIGINAL) {
        return player.getProduction(Resources.ENERGY) >= 1;
      } else {
        return player.getProduction(Resources.ENERGY) >= 1 &&
            game.board.getAvailableSpacesForCity(player).length > 0; ;
      }
    }
    public play(player: Player, game: Game) {
      const noctisSpace = game.getSpace(SpaceName.NOCTIS_CITY);
      player.addProduction(Resources.ENERGY, -1);
      player.addProduction(Resources.MEGACREDITS, 3);
      if (game.gameOptions.boardName === BoardName.ORIGINAL) {
        game.addCityTile(player, noctisSpace.id);
        return undefined;
      } else {
        return new SelectSpace('Select space for Noctis city', game.board.getAvailableSpacesForCity(player), (space: ISpace) => {
          game.addCityTile(player, space.id);
          return undefined;
        });
      }
    }
}
