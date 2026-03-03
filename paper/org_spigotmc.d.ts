declare module 'org.spigotmc' {
import { Timing } from 'co.aikar.timings';
/**
 * This is here for legacy purposes incase any plugin used it.
 *
 * If you use this, migrate ASAP as this will be removed in the future!
 *
 * @deprecated
 * @see co.aikar.timings.Timings#of
*/
export class CustomTimingsHandler {
  constructor(name: string);
  startTiming(): void;
  stopTiming(): void;
}

}
declare module 'org.spigotmc.event.player' {
import { PlayerEvent } from 'org.bukkit.event.player';
import { HandlerList } from 'org.bukkit.event';
import { Player } from 'org.bukkit.entity';
import { Location } from 'org.bukkit';
/**
 * Called when player is about to spawn in a world after joining the server.
 *
 * @deprecated The spawn location is selected during the configuration phase, before a player entity is normally
 * created. Using the result of {@link #getPlayer()} for anything related to the player entity is unreliable and may
 * cause issues. Retrieving {@link Player#getUniqueId()} and {@link Player#getName()} is safe. Prefer using
 * {@link io.papermc.paper.event.player.AsyncPlayerSpawnLocationEvent}.
*/
export class PlayerSpawnLocationEvent extends PlayerEvent {
  constructor(player: Player, spawnLocation: Location);
  /**
   * Gets player's spawn location.
   * If the player {@link Player#hasPlayedBefore()}, it's going to default to the location inside player.dat file.
   * For new players, the default spawn location is the {@link World#getSpawnLocation() spawn location}
   * of the {@link Server#getRespawnWorld() respawn world}.
   *
   * @return the spawn location
  */
  get spawnLocation(): Location;
  /**
   * Sets player's spawn location.
   *
   * @param location the spawn location
  */
  set spawnLocation(spawnLocation: Location);
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}

}
