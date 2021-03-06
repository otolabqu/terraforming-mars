import {IActionCard} from '../ICard';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CorporationCard} from './../corporation/CorporationCard';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Game} from '../../Game';

export class UtopiaInvest implements IActionCard, CorporationCard {
    public name = CardName.UTOPIA_INVEST;
    public tags = [Tags.STEEL];
    public startingMegaCredits: number = 40;
    public cardType = CardType.CORPORATION;
    public play(player: Player) {
      player.addProduction(Resources.STEEL);
      player.addProduction(Resources.TITANIUM);
      return undefined;
    }
    public canAct(player: Player): boolean {
      return player.getProduction(Resources.MEGACREDITS) +
                player.getProduction(Resources.STEEL) +
                player.getProduction(Resources.TITANIUM) +
                player.getProduction(Resources.PLANTS) +
                player.getProduction(Resources.ENERGY) +
                player.getProduction(Resources.HEAT) > -5;
    }
    private log(player: Player, game: Game, type: string) {
      game.log('${0} decreased ${1} production 1 step to gain 4 ${2}', (b) => b.player(player).string(type).string(type));
    }
    public action(player: Player, game: Game) {
      const result = new OrOptions();
      result.title = 'Select production to decrease one step and gain 4 resources';

      const options: Array<SelectOption> = [];

      const reduceMegacredits = new SelectOption('Decrease MC production', 'Decrease production', () => {
        player.addProduction(Resources.MEGACREDITS, -1);
        player.megaCredits += 4;
        this.log(player, game, 'megacredit');
        return undefined;
      });

      const reduceSteel = new SelectOption('Decrease steel production', 'Decrease production', () => {
        player.addProduction(Resources.STEEL, -1);
        player.steel += 4;
        this.log(player, game, 'steel');
        return undefined;
      });

      const reduceTitanium = new SelectOption('Decrease titanium production', 'Decrease production', () => {
        player.addProduction(Resources.TITANIUM, -1);
        player.titanium += 4;
        this.log(player, game, 'titanium');
        return undefined;
      });

      const reducePlants = new SelectOption('Decrease plants production', 'Decrease production', () => {
        player.addProduction(Resources.PLANTS, -1);
        player.plants += 4;
        this.log(player, game, 'plant');
        return undefined;
      });

      const reduceEnergy = new SelectOption('Decrease energy production', 'Decrease production', () => {
        player.addProduction(Resources.ENERGY, -1);
        player.energy += 4;
        this.log(player, game, 'energy');
        return undefined;
      });

      const reduceHeat = new SelectOption('Decrease heat production', 'Decrease production', () => {
        player.addProduction(Resources.HEAT, -1);
        player.heat += 4;
        this.log(player, game, 'heat');
        return undefined;
      });

      if (player.getProduction(Resources.MEGACREDITS) > -5) {
        options.push(reduceMegacredits);
      }
      if (player.getProduction(Resources.STEEL) > 0) {
        options.push(reduceSteel);
      }
      if (player.getProduction(Resources.TITANIUM) > 0) {
        options.push(reduceTitanium);
      }
      if (player.getProduction(Resources.PLANTS) > 0) {
        options.push(reducePlants);
      }
      if (player.getProduction(Resources.ENERGY) > 0) {
        options.push(reduceEnergy);
      }
      if (player.getProduction(Resources.HEAT) > 0) {
        options.push(reduceHeat);
      }

      result.options = options;
      return result;
    }
}
