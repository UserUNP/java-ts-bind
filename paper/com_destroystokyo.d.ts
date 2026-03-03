declare module 'com.destroystokyo.paper.exception' {
import { BukkitTask } from 'org.bukkit.scheduler';
import { Throwable, Exception } from 'java.lang';
import { Command, CommandSender } from 'org.bukkit.command';
import { Listener, Event } from 'org.bukkit.event';
import { Plugin } from 'org.bukkit.plugin';
import { Player } from 'org.bukkit.entity';
/**
 * Thrown when the internal server throws a recoverable exception.
*/
export class ServerInternalException extends ServerException {
  constructor(message: string);
  constructor(message: string, cause: Throwable);
  constructor(cause: Throwable);
  static reportInternalException(cause: Throwable): void;
}
/**
 * Thrown when an incoming plugin message channel throws an exception
*/
export class ServerPluginMessageException extends ServerPluginException {
  constructor(message: string, cause: Throwable, responsiblePlugin: Plugin, player: Player, channel: string, data: number[]);
  constructor(cause: Throwable, responsiblePlugin: Plugin, player: Player, channel: string, data: number[]);
  /**
   * Gets the channel to which the error occurred from receiving data from
   *
   * @return exception channel
  */
  get channel(): string;
  /**
   * Gets the data to which the error occurred from
   *
   * @return exception data
  */
  get data(): number[];
  /**
   * Gets the player which the plugin message causing the exception originated from
   *
   * @return exception player
  */
  get player(): Player;
}
/**
 * Thrown when a plugin's scheduler fails with an exception
*/
export class ServerSchedulerException extends ServerPluginException {
  constructor(message: string, cause: Throwable, task: BukkitTask);
  constructor(cause: Throwable, task: BukkitTask);
  /**
   * Gets the task which threw the exception
   *
   * @return exception throwing task
  */
  get task(): BukkitTask;
}
/**
 * Called when a tab-complete request throws an exception
*/
export class ServerTabCompleteException extends ServerCommandException {
  constructor(message: string, cause: Throwable, command: Command, commandSender: CommandSender, arguments: string[]);
  constructor(cause: Throwable, command: Command, commandSender: CommandSender, arguments: string[]);
}
/**
 * Exception thrown when a server event listener throws an exception
*/
export class ServerEventException extends ServerPluginException {
  constructor(message: string, cause: Throwable, responsiblePlugin: Plugin, listener: Listener, event: Event);
  constructor(cause: Throwable, responsiblePlugin: Plugin, listener: Listener, event: Event);
  /**
   * Gets the listener which threw the exception
   *
   * @return event listener
  */
  get listener(): Listener;
  /**
   * Gets the event which caused the exception
   *
   * @return event
  */
  get event(): Event;
}
/**
 * Wrapper exception for all cases to which a plugin can be immediately blamed for
*/
export class ServerPluginException extends ServerException {
  constructor(message: string, cause: Throwable, responsiblePlugin: Plugin);
  constructor(cause: Throwable, responsiblePlugin: Plugin);
  /**
   * Gets the plugin which is directly responsible for the exception being thrown
   *
   * @return plugin which is responsible for the exception throw
  */
  get responsiblePlugin(): Plugin;
}
/**
 * Wrapper exception for all exceptions that are thrown by the server.
*/
export class ServerException extends Exception {
  constructor(message: string);
  constructor(message: string, cause: Throwable);
  constructor(cause: Throwable);
}
/**
 * Thrown when a command throws an exception
*/
export class ServerCommandException extends ServerException {
  constructor(message: string, cause: Throwable, command: Command, commandSender: CommandSender, arguments: string[]);
  constructor(cause: Throwable, command: Command, commandSender: CommandSender, arguments: string[]);
  /**
   * Gets the command which threw the exception
   *
   * @return exception throwing command
  */
  get command(): Command;
  /**
   * Gets the command sender which executed the command request
   *
   * @return command sender of exception thrown command request
  */
  get commandSender(): CommandSender;
  /**
   * Gets the arguments which threw the exception for the command
   *
   * @return arguments of exception thrown command request
  */
  get arguments(): string[];
}
/**
 * Thrown whenever there is an exception with any enabling or disabling of plugins.
*/
export class ServerPluginEnableDisableException extends ServerPluginException {
  constructor(message: string, cause: Throwable, responsiblePlugin: Plugin);
  constructor(cause: Throwable, responsiblePlugin: Plugin);
}

}
declare module 'com.destroystokyo.paper.event.server.GS4QueryEvent.QueryResponse' {
import { Collection, List } from 'java.util';
import { QueryResponse } from 'com.destroystokyo.paper.event.server.GS4QueryEvent';
/**
 * A builder for {@link QueryResponse} objects.
*/
export class Builder {
  motd(motd: string): Builder;
  gameVersion(gameVersion: string): Builder;
  map(map: string): Builder;
  currentPlayers(currentPlayers: number): Builder;
  maxPlayers(maxPlayers: number): Builder;
  hostname(hostname: string): Builder;
  port(port: number): Builder;
  players(players: Collection<string>): Builder;
  players(...players: string[]): Builder;
  clearPlayers(): Builder;
  serverVersion(serverVersion: string): Builder;
  plugins(plugins: Collection<PluginInformation>): Builder;
  plugins(...plugins: PluginInformation[]): Builder;
  clearPlugins(): Builder;
  /**
   * Builds new {@link QueryResponse} with supplied data.
   *
   * @return response
  */
  build(): QueryResponse;
}
/**
 * Plugin information
*/
export class PluginInformation {
  constructor(name: string, version: string);
  get name(): string;
  set name(name: string);
  set version(version: string);
  get version(): string;
  static of(name: string, version: string): PluginInformation;
}

}
declare module 'com.destroystokyo.paper.SkinParts' {
import { SkinParts } from 'com.destroystokyo.paper';
export class Mutable extends SkinParts {
  setCapeEnabled(enabled: boolean): void;
  setJacketEnabled(enabled: boolean): void;
  setLeftSleeveEnabled(enabled: boolean): void;
  setRightSleeveEnabled(enabled: boolean): void;
  setLeftPantsEnabled(enabled: boolean): void;
  setRightPantsEnabled(enabled: boolean): void;
  setHatsEnabled(enabled: boolean): void;
  immutableCopy(): SkinParts;
}

}
declare module 'com.destroystokyo.paper.event.inventory' {
import { PrepareInventoryResultEvent } from 'org.bukkit.event.inventory';
import { InventoryView, GrindstoneInventory, ItemStack } from 'org.bukkit.inventory';
/**
 * Called when an item is put in a slot for grinding in a Grindstone
 *
 * @deprecated use {@link org.bukkit.event.inventory.PrepareGrindstoneEvent}
*/
export class PrepareGrindstoneEvent extends PrepareResultEvent {
  constructor(inventory: InventoryView, result: ItemStack | null);
  get inventory(): GrindstoneInventory;
}
/**
 * Called when an item is put in an inventory containing a result slot
*/
export class PrepareResultEvent extends PrepareInventoryResultEvent {
  constructor(inventory: InventoryView, result: ItemStack | null);
  /**
   * Get result item, may be `null`.
   *
   * @return result item
  */
  get result(): ItemStack | null;
  /**
   * Set result item, may be `null`.
   *
   * @param result result item
  */
  set result(result: ItemStack | null);
}

}
declare module 'com.destroystokyo.paper.block.TargetBlockInfo' {
import { Enum } from 'java.lang';
import { FluidCollisionMode } from 'org.bukkit';
/**
 * @deprecated use {@link org.bukkit.FluidCollisionMode}
*/
export class FluidMode extends Enum<FluidMode> {
  static readonly NEVER: FluidMode;
  static readonly SOURCE_ONLY: FluidMode;
  static readonly ALWAYS: FluidMode;
  static valueOf(name: string): FluidMode;
  static values(): FluidMode[];
  readonly bukkit: FluidCollisionMode;
}

}
declare module 'com.destroystokyo.paper' {
import { Collection, List } from 'java.util';
import { Builder } from 'com.destroystokyo.paper.Title';
import { BaseComponent } from 'net.md_5.bungee.api.chat';
import { BaseTag } from 'io.papermc.paper.tag';
import { MainHand, ItemStack } from 'org.bukkit.inventory';
import { Particle, NamespacedKey, Color, Material, World, Location } from 'org.bukkit';
import { ParticleVisibility, ChatVisibility } from 'com.destroystokyo.paper.ClientOption';
import { Cloneable, Class } from 'java.lang';
import { Pattern } from 'java.util.regex';
import { BlockState, Block } from 'org.bukkit.block';
import { Mutable } from 'com.destroystokyo.paper.SkinParts';
import { Plugin } from 'org.bukkit.plugin';
import { BlockData } from 'org.bukkit.block.data';
import { Predicate } from 'java.util.function';
import { Player } from 'org.bukkit.entity';
/**
 * Helps prepare a particle to be sent to players.
 * 
 * Usage of the builder is preferred over the super long {@link World#spawnParticle(Particle, Location, int, double, double, double, double, Object)} API
*/
export class ParticleBuilder extends Cloneable {
  constructor(particle: Particle);
  /**
   * Sends the particle to all receiving players (or all). This method is safe to use
   * Asynchronously
   *
   * @return a reference to this object.
  */
  spawn(): ParticleBuilder;
  /**
   * @return The particle going to be sent
  */
  particle(): Particle;
  /**
   * Changes what particle will be sent
   *
   * @param particle The particle
   * @return a reference to this object.
  */
  particle(particle: Particle): ParticleBuilder;
  /**
   * @return List of players who will receive the particle, or null for all in world
  */
  receivers(): Player[] | null;
  /**
   * Example use:
   * 
   * builder.receivers(16); if (builder.hasReceivers()) { sendParticleAsync(builder); }
   *
   * @return If this particle is going to be sent to someone
  */
  hasReceivers(): boolean;
  /**
   * Sends this particle to all players in the world. This is rather silly, and you should likely not
   * be doing this.
   * 
   * Just be a logical person and use receivers by radius or collection.
   *
   * @return a reference to this object.
  */
  allPlayers(): ParticleBuilder;
  /**
   * @param receivers List of players to receive this particle, or null for all players in the
   *                  world
   * @return a reference to this object.
  */
  receivers(receivers: Player[] | null): ParticleBuilder;
  /**
   * @param receivers List of players to receive this particle, or null for all players in the
   *                  world
   * @return a reference to this object.
  */
  receivers(receivers: Collection<Player> | null): ParticleBuilder;
  /**
   * @param receivers List of players to receive this particle, or null for all players in the
   *                  world
   * @return a reference to this object.
  */
  receivers(...receivers: Player[]): ParticleBuilder;
  /**
   * Selects all players within a cuboid selection around the particle location, within the
   * specified bounding box. If you want a more spherical check, see {@link #receivers(int,
   * boolean)}
   *
   * @param radius amount to add on all axis
   * @return a reference to this object.
  */
  receivers(radius: number): ParticleBuilder;
  /**
   * Selects all players within the specified radius around the particle location. If byDistance is
   * false, behavior uses cuboid selection the same as {@link #receivers(int, int)} If byDistance is
   * true, radius is tested by distance in a spherical shape
   *
   * @param radius     amount to add on each axis
   * @param byDistance true to use a spherical radius, false to use a cuboid
   * @return a reference to this object.
  */
  receivers(radius: number, byDistance: boolean): ParticleBuilder;
  /**
   * Selects all players within a cuboid selection around the particle location, within the
   * specified bounding box. Allows specifying a different Y size than X and Z If you want a more
   * cylinder check, see {@link #receivers(int, int, boolean)} If you want a more spherical check,
   * see {@link #receivers(int, boolean)}
   *
   * @param xzRadius amount to add on the x/z axis
   * @param yRadius  amount to add on the y axis
   * @return a reference to this object.
  */
  receivers(xzRadius: number, yRadius: number): ParticleBuilder;
  /**
   * Selects all players within the specified radius around the particle location. If byDistance is
   * false, behavior uses cuboid selection the same as {@link #receivers(int, int)} If byDistance is
   * true, radius is tested by distance on the y plane and on the x/z plane, in a cylinder shape.
   *
   * @param xzRadius   amount to add on the x/z axis
   * @param yRadius    amount to add on the y axis
   * @param byDistance true to use a cylinder shape, false to use cuboid
   * @return a reference to this object.
   * @throws IllegalStateException if a location hasn't been specified yet
  */
  receivers(xzRadius: number, yRadius: number, byDistance: boolean): ParticleBuilder;
  /**
   * Selects all players within a cuboid selection around the particle location, within the
   * specified bounding box. If you want a more cylinder check, see {@link #receivers(int, int,
   * boolean)} If you want a more spherical check, see {@link #receivers(int, boolean)}
   *
   * @param xRadius amount to add on the x axis
   * @param yRadius amount to add on the y axis
   * @param zRadius amount to add on the z axis
   * @return a reference to this object.
  */
  receivers(xRadius: number, yRadius: number, zRadius: number): ParticleBuilder;
  /**
   * @return The player considered the source of this particle (for Visibility concerns), or null
  */
  source(): Player | null;
  /**
   * Sets the source of this particle for visibility concerns (Vanish API)
   *
   * @param source The player who is considered the source
   * @return a reference to this object.
  */
  source(source: Player | null): ParticleBuilder;
  /**
   * @return Location of where the particle will spawn
  */
  location(): Location | null;
  /**
   * Sets the location of where to spawn the particle
   *
   * @param location The location of the particle
   * @return a reference to this object.
  */
  location(location: Location): ParticleBuilder;
  /**
   * Sets the location of where to spawn the particle
   *
   * @param world World to spawn particle in
   * @param x     X location
   * @param y     Y location
   * @param z     Z location
   * @return a reference to this object.
  */
  location(world: World, x: number, y: number, z: number): ParticleBuilder;
  /**
   * @return Number of particles to spawn
  */
  count(): number;
  /**
   * Sets the number of particles to spawn
   *
   * @param count Number of particles
   * @return a reference to this object.
  */
  count(count: number): ParticleBuilder;
  /**
   * Particle offset X. Varies by particle on how this is used
   *
   * @return Particle offset X.
  */
  offsetX(): number;
  /**
   * Particle offset Y. Varies by particle on how this is used
   *
   * @return Particle offset Y.
  */
  offsetY(): number;
  /**
   * Particle offset Z. Varies by particle on how this is used
   *
   * @return Particle offset Z.
  */
  offsetZ(): number;
  /**
   * Sets the particle offset. Varies by particle on how this is used
   *
   * @param offsetX Particle offset X
   * @param offsetY Particle offset Y
   * @param offsetZ Particle offset Z
   * @return a reference to this object.
  */
  offset(offsetX: number, offsetY: number, offsetZ: number): ParticleBuilder;
  /**
   * Gets the Particle extra data. Varies by particle on how this is used
   *
   * @return the extra particle data
  */
  extra(): number;
  /**
   * Sets the particle extra data. Varies by particle on how this is used
   *
   * @param extra the extra particle data
   * @return a reference to this object.
  */
  extra(extra: number): ParticleBuilder;
  /**
   * Gets the particle custom data. Varies by particle on how this is used
   *
   * @param  The Particle data type
   * @return the ParticleData for this particle
  */
  data<T>(): T | null;
  /**
   * Sets the particle custom data. Varies by particle on how this is used
   *
   * @param data The new particle data
   * @param   The Particle data type
   * @return a reference to this object.
  */
  data<T>(data: T | null): ParticleBuilder;
  /**
   * @return whether the particle is forcefully shown to players.
  */
  force(): boolean;
  /**
   * Sets whether the particle is forcefully shown to the player. If forced, the particle will show
   * faraway, as far as the player's view distance allows. If false, the particle will show
   * according to the client's particle settings.
   *
   * @param force true to force, false for normal
   * @return a reference to this object.
  */
  force(force: boolean): ParticleBuilder;
  /**
   * Sets the particle Color.
   * Only valid for particles with a data type of {@link Color}, {@link Particle.DustOptions} or {@link Particle.Spell}.
   *
   * @param color the new particle color
   * @return a reference to this object.
  */
  color(color: Color | null): ParticleBuilder;
  /**
   * Sets the particle Color and size or power.
   * Only valid for particles with a data type of {@link Particle.DustOptions} or {@link Particle.Spell}.
   *
   * @param color the new particle color
   * @param value the size or power of the particle
   * @return a reference to this object.
  */
  color(color: Color | null, value: number): ParticleBuilder;
  /**
   * Sets the particle Color.
   * Only valid for particles with a data type of {@link Color}, {@link Particle.DustOptions} or {@link Particle.Spell}.
   *
   * @param r red color component
   * @param g green color component
   * @param b blue color component
   * @return a reference to this object.
  */
  color(r: number, g: number, b: number): ParticleBuilder;
  /**
   * Sets the particle Color.
   * Only valid for particles with a data type of {@link Color}, {@link Particle.DustOptions} or {@link Particle.Spell}.
   * 
   * This method detects if the provided color integer is in RGB or ARGB format.
   * If the alpha channel is zero, it treats the color as RGB. Otherwise, it treats it as ARGB.
   *
   * @param color an integer representing the color components. If the highest byte (alpha channel) is zero,
   *              the color is treated as RGB. Otherwise, it is treated as ARGB.
   * @return a reference to this object.
  */
  color(color: number): ParticleBuilder;
  /**
   * Sets the particle Color.
   * Only valid for particles with a data type of {@link Color}, {@link Particle.DustOptions} or {@link Particle.Spell}.
   *
   * @param a alpha color component
   * @param r red color component
   * @param g green color component
   * @param b blue color component
   * @return a reference to this object.
  */
  color(a: number, r: number, g: number, b: number): ParticleBuilder;
  /**
   * Sets the particle Color Transition.
   * Only valid for {@link Particle#DUST_COLOR_TRANSITION}.
   *
   * @param fromColor the new particle from color
   * @param toColor   the new particle to color
   * @return a reference to this object.
   * @throws IllegalArgumentException if the particle builder's {@link #particle()} isn't {@link Particle#DUST_COLOR_TRANSITION}.
  */
  colorTransition(fromColor: Color, toColor: Color): ParticleBuilder;
  /**
   * Sets the particle Color Transition.
   * Only valid for {@link Particle#DUST_COLOR_TRANSITION}.
   *
   * @param fromRed   red color component for the "from" color
   * @param fromGreen green color component for the "from" color
   * @param fromBlue  blue color component for the "from" color
   * @param toRed     red color component for the to color
   * @param toGreen   green color component for the to color
   * @param toBlue    blue color component for the to color
   * @return a reference to this object.
   * @throws IllegalArgumentException if the particle builder's {@link #particle()} isn't {@link Particle#DUST_COLOR_TRANSITION}.
  */
  colorTransition(fromRed: number, fromGreen: number, fromBlue: number, toRed: number, toGreen: number, toBlue: number): ParticleBuilder;
  /**
   * Sets the particle Color Transition.
   * Only valid for {@link Particle#DUST_COLOR_TRANSITION}.
   *
   * @param fromRgb an integer representing the red, green, and blue color components for the "from" color
   * @param toRgb   an integer representing the red, green, and blue color components for the "to" color
   * @return a reference to this object.
   * @throws IllegalArgumentException if the particle builder's {@link #particle()} isn't {@link Particle#DUST_COLOR_TRANSITION}.
  */
  colorTransition(fromRgb: number, toRgb: number): ParticleBuilder;
  /**
   * Sets the particle Color Transition and size.
   * Only valid for {@link Particle#DUST_COLOR_TRANSITION}.
   *
   * @param fromColor the new particle color for the "from" color.
   * @param toColor   the new particle color for the "to" color.
   * @param size      the size of the particle
   * @return a reference to this object.
   * @throws IllegalArgumentException if the particle builder's {@link #particle()} isn't {@link Particle#DUST_COLOR_TRANSITION}.
  */
  colorTransition(fromColor: Color, toColor: Color, size: number): ParticleBuilder;
  clone(): ParticleBuilder;
}
/**
 * Represents a title to may be sent to a {@link Player}.
 *
 * A title can be sent without subtitle text.
 *
 * @deprecated use {@link net.kyori.adventure.title.Title}
*/
export class Title {
  /**
   * The default number of ticks for the title to fade in.
  */
  static readonly DEFAULT_FADE_IN: number;
  /**
   * The default number of ticks for the title to stay.
  */
  static readonly DEFAULT_STAY: number;
  /**
   * The default number of ticks for the title to fade out.
  */
  static readonly DEFAULT_FADE_OUT: number;
  /**
   * Create a title with the default time values and no subtitle.
   *
   * Times use default values.
   *
   * @param title the main text of the title
   * @throws NullPointerException if the title is null
  */
  constructor(title: BaseComponent);
  /**
   * Create a title with the default time values and no subtitle.
   *
   * Times use default values.
   *
   * @param title the main text of the title
   * @throws NullPointerException if the title is null
  */
  constructor(title: BaseComponent[]);
  /**
   * Create a title with the default time values and no subtitle.
   *
   * Times use default values.
   *
   * @param title the main text of the title
   * @throws NullPointerException if the title is null
  */
  constructor(title: string);
  /**
   * Create a title with the default time values.
   *
   * Times use default values.
   *
   * @param title    the main text of the title
   * @param subtitle the secondary text of the title
  */
  constructor(title: BaseComponent, subtitle: BaseComponent | null);
  /**
   * Create a title with the default time values.
   *
   * Times use default values.
   *
   * @param title    the main text of the title
   * @param subtitle the secondary text of the title
  */
  constructor(title: BaseComponent[], subtitle: BaseComponent[] | null);
  /**
   * Create a title with the default time values.
   *
   * Times use default values.
   *
   * @param title    the main text of the title
   * @param subtitle the secondary text of the title
  */
  constructor(title: string, subtitle: string | null);
  /**
   * Creates a new title.
   *
   * @param title    the main text of the title
   * @param subtitle the secondary text of the title
   * @param fadeIn   the number of ticks for the title to fade in
   * @param stay     the number of ticks for the title to stay on screen
   * @param fadeOut  the number of ticks for the title to fade out
   * @throws IllegalArgumentException if any of the times are negative
  */
  constructor(title: BaseComponent, subtitle: BaseComponent | null, fadeIn: number, stay: number, fadeOut: number);
  /**
   * Creates a new title.
   *
   * @param title    the main text of the title
   * @param subtitle the secondary text of the title
   * @param fadeIn   the number of ticks for the title to fade in
   * @param stay     the number of ticks for the title to stay on screen
   * @param fadeOut  the number of ticks for the title to fade out
   * @throws IllegalArgumentException if any of the times are negative
  */
  constructor(title: BaseComponent[] | null, subtitle: BaseComponent[], fadeIn: number, stay: number, fadeOut: number);
  /**
   * Creates a new title.
   *
   * It is recommended to use the {@link BaseComponent} constructors.
   *
   * @param title    the main text of the title
   * @param subtitle the secondary text of the title
   * @param fadeIn   the number of ticks for the title to fade in
   * @param stay     the number of ticks for the title to stay on screen
   * @param fadeOut  the number of ticks for the title to fade out
  */
  constructor(title: string, subtitle: string | null, fadeIn: number, stay: number, fadeOut: number);
  /**
   * Gets the text of this title
   *
   * @return the text
  */
  get title(): BaseComponent[];
  /**
   * Gets the text of this title's subtitle
   *
   * @return the text
  */
  get subtitle(): BaseComponent[] | null;
  /**
   * Gets the number of ticks to fade in.
   *
   * The returned value is never negative.
   *
   * @return the number of ticks to fade in
  */
  get fadeIn(): number;
  /**
   * Gets the number of ticks to stay.
   *
   * The returned value is never negative.
   *
   * @return the number of ticks to stay
  */
  get stay(): number;
  /**
   * Gets the number of ticks to fade out.
   *
   * The returned value is never negative.
   *
   * @return the number of ticks to fade out
  */
  get fadeOut(): number;
  /**
   * Sends the title directly to a player
   *
   * @param player the receiver of the title
  */
  send(player: Player): void;
  /**
   * Sends the title directly to the defined players
   *
   * @param players the receivers of the title
  */
  send(players: Collection<Player>): void;
  /**
   * Sends the title directly to the defined players
   *
   * @param players the receivers of the title
  */
  send(players: Player[]): void;
  /**
   * Sends the title directly to all online players
  */
  broadcast(): void;
  static builder(): Builder;
}
export class ClientOption<T> {
  static readonly SKIN_PARTS: ClientOption<SkinParts>;
  static readonly CHAT_COLORS_ENABLED: ClientOption<boolean>;
  static readonly CHAT_VISIBILITY: ClientOption<ChatVisibility>;
  static readonly LOCALE: ClientOption<string>;
  static readonly MAIN_HAND: ClientOption<MainHand>;
  static readonly VIEW_DISTANCE: ClientOption<number>;
  static readonly TEXT_FILTERING_ENABLED: ClientOption<boolean>;
  static readonly ALLOW_SERVER_LISTINGS: ClientOption<boolean>;
  static readonly PARTICLE_VISIBILITY: ClientOption<ParticleVisibility>;
  get type(): Class<T>;
}
/**
 * Represents a namespaced resource, see {@link org.bukkit.NamespacedKey} for single elements
 * or {@link com.destroystokyo.paper.NamespacedTag} for a collection of elements
 *
 * Namespaces may only contain lowercase alphanumeric characters, periods,
 * underscores, and hyphens.
 * 
 * Keys may only contain lowercase alphanumeric characters, periods,
 * underscores, hyphens, and forward slashes.
 * 
 * You should not be implementing this interface yourself, use {@link org.bukkit.NamespacedKey}
 * or {@link com.destroystokyo.paper.NamespacedTag} as needed instead.
*/
export class Namespaced {
  /**
   * Gets the namespace this resource is a part of
   * 
   * This is contractually obligated to only contain lowercase alphanumeric characters,
   * periods, underscores, and hyphens.
   *
   * @return resource namespace
  */
  get namespace(): string;
  /**
   * Gets the key corresponding to this resource
   * 
   * This is contractually obligated to only contain lowercase alphanumeric characters,
   * periods, underscores, hyphens, and forward slashes.
   *
   * @return resource key
  */
  get key(): string;
}
/**
 * Represents the different parts of a player's skin that can be toggled on or off.
*/
export class SkinParts {
  /**
   * Creates a new instance of {@link SkinParts} with all parts enabled.
   *
   * @return a new {@link SkinParts} instance
  */
  static allParts(): Mutable;
  hasCapeEnabled(): boolean;
  hasJacketEnabled(): boolean;
  hasLeftSleeveEnabled(): boolean;
  hasRightSleeveEnabled(): boolean;
  hasLeftPantsEnabled(): boolean;
  hasRightPantsEnabled(): boolean;
  hasHatsEnabled(): boolean;
  get raw(): number;
  mutableCopy(): Mutable;
}
export class NamespacedTag extends Namespaced {
  /**
   * The namespace representing all inbuilt keys.
  */
  static readonly MINECRAFT: string;
  /**
   * The namespace representing all keys generated by Bukkit for backwards
   * compatibility measures.
  */
  static readonly BUKKIT: string;
  /**
   * Create a key in a specific namespace.
   *
   * @param namespace String representing a grouping of keys
   * @param key Name for this specific key
   * @deprecated should never be used by plugins, for internal use only!!
  */
  constructor(namespace: string, key: string);
  /**
   * Create a key in the plugin's namespace.
   * 
   * Namespaces may only contain lowercase alphanumeric characters, periods,
   * underscores, and hyphens.
   * 
   * Keys may only contain lowercase alphanumeric characters, periods,
   * underscores, hyphens, and forward slashes.
   *
   * @param plugin the plugin to use for the namespace
   * @param key the key to create
  */
  constructor(plugin: Plugin, key: string);
  get namespace(): string;
  get key(): string;
  hashCode(): number;
  equals(obj: any): boolean;
  toString(): string;
  /**
   * Return a new random key in the {@link #BUKKIT} namespace.
   *
   * @return new key
   * @deprecated should never be used by plugins, for internal use only!!
  */
  static randomKey(): NamespacedTag;
  /**
   * Get a key in the Minecraft namespace.
   *
   * @param key the key to use
   * @return new key in the Minecraft namespace
  */
  static minecraft(key: string): NamespacedTag;
}
export class MaterialSetTag extends BaseTag<Material,MaterialSetTag> {
  /**
   * @deprecated Use NamespacedKey version of constructor
  */
  constructor(filter: Predicate<Material>);
  /**
   * @deprecated Use NamespacedKey version of constructor
  */
  constructor(materials: Collection<Material>);
  /**
   * @deprecated Use NamespacedKey version of constructor
  */
  constructor(...materials: Material[]);
  constructor(key: NamespacedKey | null, filter: Predicate<Material>);
  constructor(key: NamespacedKey | null, ...materials: Material[]);
  constructor(key: NamespacedKey | null, materials: Collection<Material>);
  constructor(key: NamespacedKey | null, materials: Collection<Material>, ...globalPredicates: Predicate[]);
  isTagged(block: BlockData): boolean;
  isTagged(block: BlockState): boolean;
  isTagged(block: Block): boolean;
  isTagged(item: ItemStack): boolean;
  isTagged(material: Material): boolean;
}
/**
 * Represents a collection tags to identify materials that share common properties.
 * Will map to minecraft for missing tags, as well as custom ones that may be useful.
 * 
 * All tags in this class are unmodifiable, attempting to modify them will throw an
 * {@link UnsupportedOperationException}.
*/
export class MaterialTags {
  /**
   * @deprecated in favour of {@link Tag#ITEMS_ARROWS}
  */
  static readonly ARROWS: MaterialSetTag;
  /**
   * Covers all colors of beds.
   *
   * @deprecated in favour of {@link Tag#BEDS}
  */
  static readonly BEDS: MaterialSetTag;
  /**
   * Covers all bucket items.
  */
  static readonly BUCKETS: MaterialSetTag;
  /**
   * Covers coal and charcoal.
   *
   * @deprecated in favour of {@link Tag#ITEMS_COALS}
  */
  static readonly COALS: MaterialSetTag;
  /**
   * Covers both cobblestone wall variants.
  */
  static readonly COBBLESTONE_WALLS: MaterialSetTag;
  /**
   * Covers both cobblestone and mossy Cobblestone.
  */
  static readonly COBBLESTONES: MaterialSetTag;
  /**
   * Covers all colors of concrete.
  */
  static readonly CONCRETES: MaterialSetTag;
  /**
   * Covers all colors of concrete powder.
   *
   * @deprecated in favour of {@link Tag#CONCRETE_POWDER}
  */
  static readonly CONCRETE_POWDER: MaterialSetTag;
  /**
   * Covers the two types of cooked fish.
  */
  static readonly COOKED_FISH: MaterialSetTag;
  /**
   * Covers all variants of doors.
   *
   * @deprecated in favour of {@link Tag#DOORS}
  */
  static readonly DOORS: MaterialSetTag;
  /**
   * Covers all dyes.
  */
  static readonly DYES: MaterialSetTag;
  /**
   * Covers all variants of gates.
   *
   * @deprecated in favour of {@link Tag#FENCE_GATES}
  */
  static readonly FENCE_GATES: MaterialSetTag;
  /**
   * Covers all variants of fences.
   *
   * @deprecated in favour of {@link Tag#FENCES}
  */
  static readonly FENCES: MaterialSetTag;
  /**
   * Covers all variants of fish buckets.
  */
  static readonly FISH_BUCKETS: MaterialSetTag;
  /**
   * Covers the non-colored glass and 16 stained glasses (not panes).
  */
  static readonly GLASS: MaterialSetTag;
  /**
   * Covers the non-colored glass panes and stained glass panes (panes only).
  */
  static readonly GLASS_PANES: MaterialSetTag;
  /**
   * Covers all glazed terracotta blocks.
  */
  static readonly GLAZED_TERRACOTTA: MaterialSetTag;
  /**
   * Covers the colors of stained terracotta.
  */
  static readonly STAINED_TERRACOTTA: MaterialSetTag;
  /**
   * Covers terracotta along with the stained variants.
  */
  static readonly TERRACOTTA: MaterialSetTag;
  /**
   * Covers both golden apples.
  */
  static readonly GOLDEN_APPLES: MaterialSetTag;
  /**
   * Covers the variants of horse armor.
  */
  static readonly HORSE_ARMORS: MaterialSetTag;
  /**
   * Covers the variants of infested blocks.
  */
  static readonly INFESTED_BLOCKS: MaterialSetTag;
  /**
   * Covers the variants of mushroom blocks.
  */
  static readonly MUSHROOM_BLOCKS: MaterialSetTag;
  /**
   * Covers all mushrooms.
  */
  static readonly MUSHROOMS: MaterialSetTag;
  /**
   * Covers all music disc items.
  */
  static readonly MUSIC_DISCS: MaterialSetTag;
  /**
   * Covers all ores.
  */
  static readonly ORES: MaterialSetTag;
  /**
   * Covers all piston typed items and blocks including the piston head and moving piston.
  */
  static readonly PISTONS: MaterialSetTag;
  /**
   * Covers all potato items.
  */
  static readonly POTATOES: MaterialSetTag;
  /**
   * Covers all wooden pressure plates and the weighted pressure plates and the stone pressure plate.
   *
   * @deprecated in favour of {@link Tag#PRESSURE_PLATES}
  */
  static readonly PRESSURE_PLATES: MaterialSetTag;
  /**
   * Covers the variants of prismarine blocks.
  */
  static readonly PRISMARINE: MaterialSetTag;
  /**
   * Covers the variants of prismarine slabs.
  */
  static readonly PRISMARINE_SLABS: MaterialSetTag;
  /**
   * Covers the variants of prismarine stairs.
  */
  static readonly PRISMARINE_STAIRS: MaterialSetTag;
  /**
   * Covers the variants of pumpkins.
  */
  static readonly PUMPKINS: MaterialSetTag;
  /**
   * Covers the variants of quartz blocks.
  */
  static readonly QUARTZ_BLOCKS: MaterialSetTag;
  /**
   * Covers all uncooked fish items.
  */
  static readonly RAW_FISH: MaterialSetTag;
  /**
   * Covers the variants of red sandstone blocks.
  */
  static readonly RED_SANDSTONES: MaterialSetTag;
  /**
   * Covers the variants of sandstone blocks.
  */
  static readonly SANDSTONES: MaterialSetTag;
  /**
   * Covers sponge and wet sponge.
  */
  static readonly SPONGES: MaterialSetTag;
  /**
   * Covers the non-colored and colored shulker boxes.
   *
   * @deprecated in favour of {@link Tag#SHULKER_BOXES}
  */
  static readonly SHULKER_BOXES: MaterialSetTag;
  /**
   * Covers zombie, creeper, skeleton, dragon, and player heads.
  */
  static readonly SKULLS: MaterialSetTag;
  /**
   * Covers all spawn egg items.
  */
  static readonly SPAWN_EGGS: MaterialSetTag;
  /**
   * Covers all colors of stained glass.
  */
  static readonly STAINED_GLASS: MaterialSetTag;
  /**
   * Covers all colors of stained glass panes.
  */
  static readonly STAINED_GLASS_PANES: MaterialSetTag;
  /**
   * Covers all variants of trapdoors.
   *
   * @deprecated in favour of {@link Tag#TRAPDOORS}
  */
  static readonly TRAPDOORS: MaterialSetTag;
  /**
   * Covers all wood variants of doors.
   *
   * @deprecated in favour of {@link Tag#WOODEN_DOORS}
  */
  static readonly WOODEN_DOORS: MaterialSetTag;
  /**
   * Covers all wood variants of fences.
   *
   * @deprecated in favour of {@link Tag#WOODEN_FENCES}
  */
  static readonly WOODEN_FENCES: MaterialSetTag;
  /**
   * Covers all wood variants of trapdoors.
   *
   * @deprecated in favour of {@link Tag#WOODEN_TRAPDOORS}
  */
  static readonly WOODEN_TRAPDOORS: MaterialSetTag;
  /**
   * Covers the wood variants of gates.
   *
   * @deprecated in favour of {@link Tag#FENCE_GATES}
  */
  static readonly WOODEN_GATES: MaterialSetTag;
  /**
   * Covers the variants of purpur.
  */
  static readonly PURPUR: MaterialSetTag;
  /**
   * Covers the variants of signs.
   *
   * @deprecated in favour of {@link Tag#ALL_SIGNS}
  */
  static readonly SIGNS: MaterialSetTag;
  /**
   * Covers the variants of a regular torch.
  */
  static readonly TORCH: MaterialSetTag;
  /**
   * Covers the variants of a redstone torch.
  */
  static readonly REDSTONE_TORCH: MaterialSetTag;
  /**
   * Covers the variants of a soul torch.
  */
  static readonly SOUL_TORCH: MaterialSetTag;
  /**
   * Covers the variants of a copper torch.
  */
  static readonly COPPER_TORCH: MaterialSetTag;
  /**
   * Covers the variants of torches.
  */
  static readonly TORCHES: MaterialSetTag;
  /**
   * Covers the variants of lanterns.
   *
   * @deprecated in favour of {@link Tag#LANTERNS}
  */
  static readonly LANTERNS: MaterialSetTag;
  /**
   * Covers the variants of rails.
   *
   * @deprecated in favour of {@link Tag#RAILS}
  */
  static readonly RAILS: MaterialSetTag;
  /**
   * Covers the variants of swords.
   *
   * @deprecated in favour of {@link Tag#ITEMS_SWORDS}
  */
  static readonly SWORDS: MaterialSetTag;
  /**
   * Covers the variants of shovels.
   *
   * @deprecated in favour of {@link Tag#ITEMS_SHOVELS}
  */
  static readonly SHOVELS: MaterialSetTag;
  /**
   * Covers the variants of pickaxes.
   *
   * @deprecated in favour of {@link Tag#ITEMS_PICKAXES}
  */
  static readonly PICKAXES: MaterialSetTag;
  /**
   * Covers the variants of axes.
   *
   * @deprecated in favour of {@link Tag#ITEMS_AXES}
  */
  static readonly AXES: MaterialSetTag;
  /**
   * Covers the variants of hoes.
   *
   * @deprecated in favour of {@link Tag#ITEMS_HOES}
  */
  static readonly HOES: MaterialSetTag;
  /**
   * Covers the variants of helmets.
   *
   * @deprecated in favour of {@link Tag#ITEMS_HEAD_ARMOR}
  */
  static readonly HELMETS: MaterialSetTag;
  /**
   * Covers the variants of items that can be equipped in the helmet slot.
   *
   * @deprecated any item can be equippable with the right data component set on it
  */
  static readonly HEAD_EQUIPPABLE: MaterialSetTag;
  /**
   * Covers the variants of chestplate.
   *
   * @deprecated in favour of {@link Tag#ITEMS_CHEST_ARMOR}
  */
  static readonly CHESTPLATES: MaterialSetTag;
  /**
   * Covers the variants of items that can be equipped in the chest slot.
   *
   * @deprecated any item can be equippable with the right data component set on it
  */
  static readonly CHEST_EQUIPPABLE: MaterialSetTag;
  /**
   * Covers the variants of leggings.
   *
   * @deprecated in favour of {@link Tag#ITEMS_LEG_ARMOR}
  */
  static readonly LEGGINGS: MaterialSetTag;
  /**
   * Covers the variants of boots.
   *
   * @deprecated in favour of {@link Tag#ITEMS_FOOT_ARMOR}
  */
  static readonly BOOTS: MaterialSetTag;
  /**
   * Covers all variants of armor.
  */
  static readonly ARMOR: MaterialSetTag;
  /**
   * Covers the variants of bows.
  */
  static readonly BOWS: MaterialSetTag;
  /**
   * Covers the variants of player-throwable projectiles (not requiring a bow or any other "assistance").
  */
  static readonly THROWABLE_PROJECTILES: MaterialSetTag;
  /**
   * Covers materials that can be colored, such as wool, shulker boxes, stained glasses etc.
  */
  static readonly COLORABLE: MaterialSetTag;
  /**
   * Covers the variants of coral.
  */
  static readonly CORAL: MaterialSetTag;
  /**
   * Covers the variants of coral fans.
  */
  static readonly CORAL_FANS: MaterialSetTag;
  /**
   * Covers the variants of coral blocks.
  */
  static readonly CORAL_BLOCKS: MaterialSetTag;
  /**
   * Covers all items that can be enchanted from the enchantment table or anvil.
   *
   * @deprecated in favour of {@link Tag#ITEMS_ENCHANTABLE_VANISHING} and other similar enchantable tags
  */
  static readonly ENCHANTABLE: MaterialSetTag;
  /**
   * Covers the variants of raw ores.
  */
  static readonly RAW_ORES: MaterialSetTag;
  /**
   * Covers all command block types.
  */
  static readonly COMMAND_BLOCKS: MaterialSetTag;
  /**
   * Covers the variants of deepslate ores.
  */
  static readonly DEEPSLATE_ORES: MaterialSetTag;
  /**
   * Covers the variants of raw ore blocks.
  */
  static readonly RAW_ORE_BLOCKS: MaterialSetTag;
  /**
   * Covers all oxidized copper blocks.
  */
  static readonly OXIDIZED_COPPER_BLOCKS: MaterialSetTag;
  /**
   * Covers all weathered copper blocks.
  */
  static readonly WEATHERED_COPPER_BLOCKS: MaterialSetTag;
  /**
   * Covers all exposed copper blocks.
  */
  static readonly EXPOSED_COPPER_BLOCKS: MaterialSetTag;
  /**
   * Covers all un-weathered copper blocks.
  */
  static readonly UNAFFECTED_COPPER_BLOCKS: MaterialSetTag;
  /**
   * Covers all waxed copper blocks.
   * 
   * Combine with other copper-related tags to filter is-waxed or not.
  */
  static readonly WAXED_COPPER_BLOCKS: MaterialSetTag;
  /**
   * Covers all un-waxed copper blocks.
   * 
   * Combine with other copper-related tags to filter is-un-waxed or not.
  */
  static readonly UNWAXED_COPPER_BLOCKS: MaterialSetTag;
  /**
   * Covers all copper block variants.
  */
  static readonly COPPER_BLOCKS: MaterialSetTag;
  /**
   * Covers all weathering/waxed states of the plain copper block.
  */
  static readonly FULL_COPPER_BLOCKS: MaterialSetTag;
  /**
   * Covers all weathering/waxed states of the cut copper block.
  */
  static readonly CUT_COPPER_BLOCKS: MaterialSetTag;
  /**
   * Covers all weathering/waxed states of the cut copper stairs.
  */
  static readonly CUT_COPPER_STAIRS: MaterialSetTag;
  /**
   * Covers all weathering/waxed states of the cut copper slab.
  */
  static readonly CUT_COPPER_SLABS: MaterialSetTag;
  /**
   * Covers all Wooden Tools.
  */
  static readonly WOODEN_TOOLS: MaterialSetTag;
  /**
   * Covers all Stone Tools.
  */
  static readonly STONE_TOOLS: MaterialSetTag;
  /**
   * Covers all copper Tools.
  */
  static readonly COPPER_TOOLS: MaterialSetTag;
  /**
   * Covers all Iron Tools.
  */
  static readonly IRON_TOOLS: MaterialSetTag;
  /**
   * Covers all Gold Tools.
  */
  static readonly GOLDEN_TOOLS: MaterialSetTag;
  /**
   * Covers all Diamond Tools.
  */
  static readonly DIAMOND_TOOLS: MaterialSetTag;
  /**
   * Covers all Netherite Tools.
  */
  static readonly NETHERITE_TOOLS: MaterialSetTag;
}

}
declare module 'com.destroystokyo.paper.event.entity' {
import { PlayerEvent } from 'org.bukkit.event.player';
import { Reason } from 'com.destroystokyo.paper.event.entity.EndermanEscapeEvent';
import { Collection, List } from 'java.util';
import { SpawnReason } from 'org.bukkit.event.entity.CreatureSpawnEvent';
import { EntityEvent, EntityTransformEvent, EntityTeleportEvent } from 'org.bukkit.event.entity';
import { EntityPushedByEntityAttackEvent } from 'io.papermc.paper.event.entity';
import { ItemStack } from 'org.bukkit.inventory';
import { World, Location } from 'org.bukkit';
import { EndGateway } from 'org.bukkit.block';
import { Cause } from 'io.papermc.paper.event.entity.EntityKnockbackEvent';
import { Vector } from 'org.bukkit.util';
import { HandlerList, Cancellable, Event } from 'org.bukkit.event';
import { LightningStrike, Turtle, Entity, Player, Egg, Creeper, ExperienceOrb, Slime, AreaEffectCloud, Projectile, EntityType, LivingEntity, EnderDragon, DragonFireball, Enderman, HumanEntity, Witch, SkeletonHorse } from 'org.bukkit.entity';
/**
 * WARNING: This event only fires for a limited number of cases, and not for every case that {@link CreatureSpawnEvent} does.
 * 
 * You should still listen to {@link CreatureSpawnEvent} as a backup, and only use this event as an "enhancement".
 * The intent of this event is to improve server performance, so it fires even if the spawning might fail later, for
 * example when the entity would be unable to spawn due to limited space or lighting.
 * 
 * Currently: NATURAL and SPAWNER based reasons. 
 * Also, Plugins that replace Entity Registrations with their own custom entities might not fire this event.
*/
export class PreCreatureSpawnEvent extends Event {
  constructor(location: Location, type: EntityType, reason: SpawnReason);
  /**
   * @return The location this creature is being spawned at
  */
  get spawnLocation(): Location;
  /**
   * @return The type of creature being spawned
  */
  get type(): EntityType;
  /**
   * @return Reason this creature is spawning (ie, NATURAL vs SPAWNER)
  */
  get reason(): SpawnReason;
  /**
   * @return If the spawn process should be aborted vs trying more attempts
  */
  shouldAbortSpawn(): boolean;
  /**
   * Set this if you are more blanket blocking all types of these spawns, and wish to abort the spawn process from
   * trying more attempts after this cancellation.
   *
   * @param shouldAbortSpawn Set if the spawn process should be aborted vs trying more attempts
  */
  setShouldAbortSpawn(shouldAbortSpawn: boolean): void;
  /**
   * @return If the spawn of this creature is cancelled or not
  */
  isCancelled(): boolean;
  /**
   * Cancelling this event is more efficient than cancelling {@link CreatureSpawnEvent}
   *
   * @param cancel `true` if you wish to cancel this event, and abort the spawn of this creature
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PreCreatureSpawnEvent extends Event, Cancellable {}
/**
 * Fired when a Slime decides to start jumping while swimming in water/lava.
 * 
 * This event does not fire for the entity's actual movement. Only when it
 * is choosing to start jumping.
*/
export class SlimeSwimEvent extends SlimeWanderEvent {
  constructor(slime: Slime);
}
/**
 * Fired when a Slime decides to start pathfinding.
 * 
 * This event does not fire for the entity's actual movement. Only when it
 * is choosing to start moving.
*/
export class SlimePathfindEvent extends EntityEvent {
  constructor(slime: Slime);
  /**
   * The Slime that is pathfinding.
   *
   * @return The Slime that is pathfinding.
  */
  get entity(): Slime;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface SlimePathfindEvent extends EntityEvent, Cancellable {}
/**
 * Fired when a Turtle decides to go home
*/
export class TurtleGoHomeEvent extends EntityEvent {
  constructor(turtle: Turtle);
  /**
   * The turtle going home
   *
   * @return The turtle
  */
  get entity(): Turtle;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface TurtleGoHomeEvent extends EntityEvent, Cancellable {}
/**
 * Fired any time an entity is being removed from a world for any reason (including a chunk unloading).
 * Note: The entity is updated prior to this event being called, as such, the entity's world may not be equal to {@link #getWorld()}.
*/
export class EntityRemoveFromWorldEvent extends EntityEvent {
  constructor(entity: Entity, world: World);
  /**
   * @return The world that the entity is being removed from
  */
  get world(): World;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Fired when a Turtle lays eggs
*/
export class TurtleLayEggEvent extends EntityEvent {
  constructor(turtle: Turtle, location: Location, eggCount: number);
  /**
   * The turtle laying the eggs
   *
   * @return The turtle
  */
  get entity(): Turtle;
  /**
   * Get the location where the eggs are being laid
   *
   * @return Location of eggs
  */
  get location(): Location;
  /**
   * Get the number of eggs being laid
   *
   * @return Number of eggs
  */
  get eggCount(): number;
  /**
   * Set the number of eggs being laid
   *
   * @param eggCount Number of eggs
  */
  set eggCount(eggCount: number);
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface TurtleLayEggEvent extends EntityEvent, Cancellable {}
export class WitchReadyPotionEvent extends EntityEvent {
  constructor(witch: Witch, potion: ItemStack | null);
  get entity(): Witch;
  /**
   * @return the potion the witch is readying to use
  */
  get potion(): ItemStack | null;
  /**
   * Sets the potion the which is going to hold and use
   *
   * @param potion The potion
  */
  set potion(potion: ItemStack | null);
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface WitchReadyPotionEvent extends EntityEvent, Cancellable {}
/**
 * Fired when lightning strikes an entity
*/
export class EntityZapEvent extends EntityTransformEvent {
  constructor(entity: Entity, bolt: LightningStrike, replacementEntity: Entity);
  /**
   * Gets the lightning bolt that is striking the entity.
   *
   * @return The lightning bolt responsible for this event
  */
  get bolt(): LightningStrike;
  /**
   * Gets the entity that will replace the struck entity.
   *
   * @return The entity that will replace the struck entity
  */
  get replacementEntity(): Entity;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface EntityZapEvent extends EntityTransformEvent, Cancellable {}
/**
 * Fired any time an entity is being added to the world for any reason (including a chunk loading).
 * 
 * Not to be confused with {@link CreatureSpawnEvent}
*/
export class EntityAddToWorldEvent extends EntityEvent {
  constructor(entity: Entity, world: World);
  /**
   * @return The world that the entity is being added to
  */
  get world(): World;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Fired when a witch throws a potion at a player
*/
export class WitchThrowPotionEvent extends EntityEvent {
  constructor(witch: Witch, target: LivingEntity, potion: ItemStack | null);
  get entity(): Witch;
  /**
   * @return The target of the potion
  */
  get target(): LivingEntity;
  /**
   * @return The potion the witch will throw at a player
  */
  get potion(): ItemStack | null;
  /**
   * Sets the potion to be thrown at a player
   *
   * @param potion The potion
  */
  set potion(potion: ItemStack | null);
  /**
   * @return Event was cancelled or potion was `null`
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface WitchThrowPotionEvent extends EntityEvent, Cancellable {}
/**
 * Fired when a witch consumes the potion in their hand to buff themselves.
*/
export class WitchConsumePotionEvent extends EntityEvent {
  constructor(witch: Witch, potion: ItemStack | null);
  get entity(): Witch;
  /**
   * @return the potion the witch will consume and have the effects applied.
  */
  get potion(): ItemStack | null;
  /**
   * Sets the potion to be consumed and applied to the witch.
   *
   * @param potion The potion
  */
  set potion(potion: ItemStack | null);
  /**
   * @return Event was cancelled or potion was `null`
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface WitchConsumePotionEvent extends EntityEvent, Cancellable {}
export class EndermanEscapeEvent extends EntityEvent {
  constructor(entity: Enderman, reason: Reason);
  get entity(): Enderman;
  /**
   * Gets the reason the enderman is trying to escape.
   *
   * @return The reason
  */
  get reason(): Reason;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Cancels the escape.
   * 
   * If this escape normally had resulted in damage avoidance such as indirect,
   * the enderman will now take damage. However, this does not change the Enderman's
   * innate immunities or damage behavior like arrows where the damage never happens.
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface EndermanEscapeEvent extends EntityEvent, Cancellable {}
/**
 * Called when a projectile collides with an entity
 * 
 * This event is called before {@link EntityDamageByEntityEvent}, and cancelling it will allow the projectile to continue flying
 *
 * @deprecated Deprecated, use {@link org.bukkit.event.entity.ProjectileHitEvent} and check if there is a hit entity
*/
export class ProjectileCollideEvent extends EntityEvent {
  constructor(projectile: Projectile, collidedWith: Entity);
  /**
   * Get the projectile that collided
   *
   * @return the projectile that collided
  */
  get entity(): Projectile;
  /**
   * Get the entity the projectile collided with
   *
   * @return the entity collided with
  */
  get collidedWith(): Entity;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  static get handlerList(): HandlerList;
  get handlers(): HandlerList;
}
export interface ProjectileCollideEvent extends EntityEvent, Cancellable {}
/**
 * Fired when an EnderDragon spawns an AreaEffectCloud by shooting flames
*/
export class EnderDragonFlameEvent extends EntityEvent {
  constructor(enderDragon: EnderDragon, areaEffectCloud: AreaEffectCloud);
  /**
   * The enderdragon involved in this event
  */
  get entity(): EnderDragon;
  /**
   * @return The area effect cloud spawned in this collision
  */
  get areaEffectCloud(): AreaEffectCloud;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface EnderDragonFlameEvent extends EntityEvent, Cancellable {}
/**
 * Fired when a DragonFireball collides with a block/entity and spawns an AreaEffectCloud
*/
export class EnderDragonFireballHitEvent extends EntityEvent {
  constructor(fireball: DragonFireball, targets: Collection<LivingEntity>, areaEffectCloud: AreaEffectCloud);
  /**
   * The fireball involved in this event
  */
  get entity(): DragonFireball;
  /**
   * The living entities hit by fireball
   *
   * @return the targets
  */
  get targets(): Collection<LivingEntity>;
  /**
   * @return The area effect cloud spawned in this collision
  */
  get areaEffectCloud(): AreaEffectCloud;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface EnderDragonFireballHitEvent extends EntityEvent, Cancellable {}
/**
 * Fired when a Slime decides to change its facing direction.
 * 
 * This event does not fire for the entity's actual movement. Only when it
 * is choosing to change direction.
*/
export class SlimeChangeDirectionEvent extends SlimePathfindEvent {
  constructor(slime: Slime, yaw: number);
  /**
   * Get the new chosen yaw
   *
   * @return Chosen yaw
  */
  get newYaw(): number;
  /**
   * Set the new chosen yaw
   *
   * @param yaw Chosen yaw
  */
  set newYaw(newYaw: number);
}
/**
 * Called when an entity jumps
 * 
 * Cancelling the event will stop the entity from jumping
*/
export class EntityJumpEvent extends EntityEvent {
  constructor(entity: LivingEntity);
  get entity(): LivingEntity;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface EntityJumpEvent extends EntityEvent, Cancellable {}
/**
 * Called when a Creeper is ignited either by a
 * flint and steel, {@link Creeper#ignite()} or
 * {@link Creeper#setIgnited(boolean)}.
*/
export class CreeperIgniteEvent extends EntityEvent {
  constructor(creeper: Creeper, ignited: boolean);
  get entity(): Creeper;
  isIgnited(): boolean;
  setIgnited(ignited: boolean): void;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface CreeperIgniteEvent extends EntityEvent, Cancellable {}
/**
 * Fired when a Slime decides to change direction to target a LivingEntity.
 * 
 * This event does not fire for the entity's actual movement. Only when it
 * is choosing to start moving.
*/
export class SlimeTargetLivingEntityEvent extends SlimePathfindEvent {
  constructor(slime: Slime, target: LivingEntity);
  /**
   * Get the targeted entity
   *
   * @return Targeted entity
  */
  get target(): LivingEntity;
}
/**
 * Called before an entity is spawned into a world by a spawner.
 * 
 * This only includes the spawner's location and not the full BlockState snapshot for performance reasons.
 * If you really need it you have to get the spawner yourself.
*/
export class PreSpawnerSpawnEvent extends PreCreatureSpawnEvent {
  constructor(location: Location, type: EntityType, spawnerLocation: Location);
  get spawnerLocation(): Location;
}
/**
 * Called when a phantom is spawned for an exhausted player
*/
export class PhantomPreSpawnEvent extends PreCreatureSpawnEvent {
  constructor(location: Location, entity: Entity, reason: SpawnReason);
  /**
   * Get the entity this phantom is spawning for
   *
   * @return the Entity
  */
  get spawningEntity(): Entity;
}
/**
 * Fired when the server is calculating what chunks to try to spawn monsters in every Monster Spawn Tick event
*/
export class PlayerNaturallySpawnCreaturesEvent extends PlayerEvent {
  constructor(player: Player, radius: number);
  /**
   * @return The radius of chunks around this player to be included in natural spawn selection
  */
  get spawnRadius(): number;
  /**
   * @param radius The radius of chunks around this player to be included in natural spawn selection
  */
  set spawnRadius(spawnRadius: number);
  /**
   * @return If this player's chunks will be excluded from natural spawns
  */
  isCancelled(): boolean;
  /**
   * @param cancel `true` if you wish to cancel this event, and not include this player's chunks for natural spawning
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerNaturallySpawnCreaturesEvent extends PlayerEvent, Cancellable {}
/**
 * Fired when an Entity decides to start moving towards a location.
 * 
 * This event does not fire for the entities actual movement. Only when it
 * is choosing to start moving to a location.
*/
export class EntityPathfindEvent extends EntityEvent {
  constructor(entity: Entity, location: Location, targetEntity: Entity | null);
  /**
   * The Entity that is pathfinding.
   *
   * @return The Entity that is pathfinding.
  */
  get entity(): Entity;
  /**
   * If the Entity is trying to pathfind to an entity, this is the entity in relation.
   * 
   * Otherwise, this will return `null`.
   *
   * @return The entity target or `null`
  */
  get targetEntity(): Entity | null;
  /**
   * The Location of where the entity is about to move to.
   * 
   * Note that if the target happened to of been an entity
   *
   * @return Location of where the entity is trying to pathfind to.
  */
  get loc(): Location;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface EntityPathfindEvent extends EntityEvent, Cancellable {}
/**
 * Fired when an Entity is knocked back by the hit of another Entity. The acceleration
 * vector can be modified. If this event is cancelled, the entity is not knocked back.
*/
export class EntityKnockbackByEntityEvent extends EntityPushedByEntityAttackEvent {
  constructor(entity: LivingEntity, hitBy: Entity, cause: Cause, knockbackStrength: number, knockback: Vector);
  /**
   * @return the entity which was knocked back
  */
  get entity(): LivingEntity;
  /**
   * @return the original knockback strength.
   * @apiNote this value doesn't necessarily relate to {@link #getKnockback()}.
  */
  get knockbackStrength(): number;
  /**
   * Gets the causing entity. Same as {@link #getPushedBy()}.
   *
   * @return the Entity which hit
  */
  get hitBy(): Entity;
}
/**
 * Called when a thrown egg might hatch.
 * 
 * This event fires for all thrown eggs that may hatch, players, dispensers, etc.
*/
export class ThrownEggHatchEvent extends Event {
  constructor(egg: Egg, hatching: boolean, numHatches: number, hatchingType: EntityType);
  /**
   * Gets the egg involved in this event.
   *
   * @return the egg involved in this event
  */
  get egg(): Egg;
  /**
   * Gets whether the egg is hatching or not. Will be what the server
   * would've done without interaction.
   *
   * @return boolean Whether the egg is going to hatch or not
  */
  isHatching(): boolean;
  /**
   * Sets whether the egg will hatch or not.
   *
   * @param hatching `true` if you want the egg to hatch, `false` if you want it
   *                 not to
  */
  setHatching(hatching: boolean): void;
  /**
   * Get the type of the mob being hatched ({@link EntityType#CHICKEN} by default)
   *
   * @return The type of the mob being hatched by the egg
  */
  get hatchingType(): EntityType;
  /**
   * Change the type of mob being hatched by the egg
   *
   * @param hatchType The type of the mob being hatched by the egg
  */
  set hatchingType(hatchingType: EntityType);
  /**
   * Get the number of mob hatches from the egg. By default, the number will
   * be the number the server would've done
   * 
   *  7/8 chance of being 0
   *  31/256 ~= 1/8 chance to be 1
   *  1/256 chance to be 4
   * 
   *
   * @return The number of mobs going to be hatched by the egg
  */
  get numHatches(): number;
  /**
   * Change the number of mobs coming out of the hatched egg
   * 
   * The boolean hatching will override this number. I.e. If hatching is
   * `false`, this number will not matter
   *
   * @param numHatches The number of mobs coming out of the egg
  */
  set numHatches(numHatches: number);
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Fired anytime the server is about to merge 2 experience orbs into one
*/
export class ExperienceOrbMergeEvent extends EntityEvent {
  constructor(mergeTarget: ExperienceOrb, mergeSource: ExperienceOrb);
  /**
   * @return The orb that will absorb the other experience orb
  */
  get mergeTarget(): ExperienceOrb;
  /**
   * @return The orb that is subject to being removed and merged into the target orb
  */
  get mergeSource(): ExperienceOrb;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * @param cancel `true` if you wish to cancel this event, and prevent the orbs from merging
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface ExperienceOrbMergeEvent extends EntityEvent, Cancellable {}
/**
 * Fired when an EnderDragon shoots a fireball
*/
export class EnderDragonShootFireballEvent extends EntityEvent {
  constructor(entity: EnderDragon, fireball: DragonFireball);
  /**
   * The enderdragon shooting the fireball
  */
  get entity(): EnderDragon;
  /**
   * @return The fireball being shot
  */
  get fireball(): DragonFireball;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface EnderDragonShootFireballEvent extends EntityEvent, Cancellable {}
/**
 * Event called when a player gets close to a skeleton horse and triggers the lightning trap
*/
export class SkeletonHorseTrapEvent extends EntityEvent {
  constructor(horse: SkeletonHorse, eligibleHumans: HumanEntity[]);
  get entity(): SkeletonHorse;
  get eligibleHumans(): HumanEntity[];
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface SkeletonHorseTrapEvent extends EntityEvent, Cancellable {}
/**
 * Fired when a Turtle starts digging to lay eggs
*/
export class TurtleStartDiggingEvent extends EntityEvent {
  constructor(turtle: Turtle, location: Location);
  /**
   * The turtle digging
   *
   * @return The turtle
  */
  get entity(): Turtle;
  /**
   * Get the location where the turtle is digging
   *
   * @return Location where digging
  */
  get location(): Location;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface TurtleStartDiggingEvent extends EntityEvent, Cancellable {}
/**
 * Fired when a Slime decides to start wandering.
 * 
 * This event does not fire for the entity's actual movement. Only when it
 * is choosing to start moving.
*/
export class SlimeWanderEvent extends SlimePathfindEvent {
  constructor(slime: Slime);
}
/**
 * Fired when an Enderman determines if it should attack a player or not.
 * 
 * Starts off cancelled if the player is wearing a pumpkin head or is not looking
 * at the Enderman, according to Vanilla rules.
*/
export class EndermanAttackPlayerEvent extends EntityEvent {
  constructor(entity: Enderman, player: Player);
  /**
   * The enderman considering attacking
   *
   * @return The enderman considering attacking
  */
  get entity(): Enderman;
  /**
   * The player the Enderman is considering attacking
   *
   * @return The player the Enderman is considering attacking
  */
  get player(): Player;
  /**
   * @return If cancelled, the enderman will not attack
  */
  isCancelled(): boolean;
  /**
   * {@inheritDoc}
   * 
   * Cancels if the Enderman will attack this player
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface EndermanAttackPlayerEvent extends EntityEvent, Cancellable {}
/**
 * Fired any time an entity attempts to teleport in an end gateway
*/
export class EntityTeleportEndGatewayEvent extends EntityTeleportEvent {
  constructor(entity: Entity, from: Location, to: Location, gateway: EndGateway);
  /**
   * The gateway triggering the teleport
   *
   * @return EndGateway used
  */
  get gateway(): EndGateway;
}

}
declare module 'com.destroystokyo.paper.event.profile' {
import { Component } from 'net.kyori.adventure.text';
import { Set, Collection, UUID } from 'java.util';
import { HandlerList, Event } from 'org.bukkit.event';
import { ProfileProperty, PlayerProfile } from 'com.destroystokyo.paper.profile';
/**
 * Fired once a profiles additional properties (such as textures) has been filled
*/
export class FillProfileEvent extends Event {
  constructor(profile: PlayerProfile);
  /**
   * @return The Profile that had properties filled
  */
  get playerProfile(): PlayerProfile;
  /**
   * Same as .getPlayerProfile().getProperties()
   *
   * @return The new properties on the profile.
   * @see PlayerProfile#getProperties()
  */
  get properties(): Set<ProfileProperty>;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Allows a plugin to intercept a Profile Lookup for a Profile by name
 * 
 * At the point of event fire, the UUID and properties are unset.
 * 
 * If a plugin sets the UUID, and optionally the properties, the API call to look up the profile may be skipped.
 * 
 * No guarantees are made about thread execution context for this event. If you need to know, check
 * {@link Event#isAsynchronous()}
*/
export class PreLookupProfileEvent extends Event {
  constructor(name: string);
  /**
   * @return Name of the profile
  */
  get name(): string;
  /**
   * If this value is left `null` by the completion of the event call, then the server will
   * trigger a call to the Mojang API to look up the UUID (Network Request), and subsequently, fire a
   * {@link LookupProfileEvent}
   *
   * @return The UUID of the profile if it has already been provided by a plugin
  */
  get uUID(): UUID | null;
  /**
   * Sets the UUID for this player name. This will skip the initial API call to find the players UUID.
   * 
   * However, if Profile Properties are needed by the server, you must also set them or else an API call might still be made.
   *
   * @param uuid the UUID to set for the profile or `null` to reset
  */
  set uUID(uUID: UUID | null);
  /**
   * @return The currently pending pre-populated properties.
   * Any property in this Set will be automatically prefilled on this Profile
   * @deprecated This event is only called for UUID lookups, properties set here will be ignored. Use {@link PreFillProfileEvent} for setting properties.
  */
  get profileProperties(): Set<ProfileProperty>;
  /**
   * Clears any existing pre-populated properties and uses the supplied properties
   * Any property in this Set will be automatically prefilled on this Profile
   *
   * @param properties The properties to add
   * @deprecated This event is only called for UUID lookups, properties set here will be ignored. Use {@link PreFillProfileEvent} for setting properties.
  */
  set profileProperties(profileProperties: Set<ProfileProperty>);
  /**
   * Adds any properties currently missing to the pre-populated properties set, replacing any that already were set. Use {@link PreFillProfileEvent} for setting properties.
   * Any property in this Set will be automatically prefilled on this Profile
   *
   * @param properties The properties to add
   * @deprecated This event is only called for UUID lookups, properties set here will be ignored.
  */
  addProfileProperties(properties: Set<ProfileProperty>): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Fires when the server needs to verify if a player is whitelisted.
 * 
 * Plugins may override/control the servers whitelist with this event,
 * and dynamically change the kick message.
*/
export class ProfileWhitelistVerifyEvent extends Event {
  constructor(profile: PlayerProfile, whitelistEnabled: boolean, whitelisted: boolean, isOp: boolean, kickMessage: Component | null);
  /**
   * @return the currently planned message to send to the user if they are not whitelisted
   * @deprecated use {@link #kickMessage()}
  */
  getKickMessage(): string | null;
  /**
   * @param kickMessage The message to send to the player on kick if not whitelisted. May set to `null` to use the server configured default
   * @deprecated Use {@link #kickMessage(Component)}
  */
  setKickMessage(kickMessage: string | null): void;
  /**
   * @param kickMessage The message to send to the player on kick if not whitelisted. May set to `null` to use the server configured default
  */
  kickMessage(kickMessage: Component | null): void;
  /**
   * @return The profile of the player trying to connect
  */
  get playerProfile(): PlayerProfile;
  /**
   * @return Whether the player is whitelisted to play on this server (whitelist may be off is why it's true)
  */
  isWhitelisted(): boolean;
  /**
   * Changes the players whitelisted state. `false` will deny the login
   *
   * @param whitelisted The new whitelisted state
  */
  setWhitelisted(whitelisted: boolean): void;
  /**
   * @return if the player obtained whitelist status by having op
  */
  isOp(): boolean;
  /**
   * @return if the server even has whitelist on
  */
  isWhitelistEnabled(): boolean;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Fired when the server is requesting to fill in properties of an incomplete profile, such as textures.
 * 
 * Allows plugins to pre-populate cached properties and avoid a call to the Mojang API
*/
export class PreFillProfileEvent extends Event {
  constructor(profile: PlayerProfile);
  /**
   * @return The profile that needs its properties filled
  */
  get playerProfile(): PlayerProfile;
  /**
   * Sets the properties on the profile, avoiding the call to the Mojang API
   * Same as .getPlayerProfile().setProperties(properties);
   *
   * @param properties The properties to set/append
   * @see PlayerProfile#setProperties(Collection)
  */
  set properties(properties: Collection<ProfileProperty>);
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Allows a plugin to be notified anytime AFTER a Profile has been looked up from the Mojang API
 * This is an opportunity to view the response and potentially cache things.
 * 
 * No guarantees are made about thread execution context for this event. If you need to know, check
 * {@link Event#isAsynchronous()}
*/
export class LookupProfileEvent extends Event {
  constructor(profile: PlayerProfile);
  /**
   * Gets the name of the profile that was looked up.
   *
   * @return the name of the profile
  */
  get name(): string;
  /**
   * Gets the UUID of the profile that was looked up.
   *
   * @return the UUID of the profile
  */
  get id(): UUID;
  /**
   * @return The profile that was recently looked up. This profile can be mutated
   * @deprecated This event is only called after UUID lookups, properties set here will be ignored. Use {@link FillProfileEvent} for setting properties.
  */
  get playerProfile(): PlayerProfile;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}

}
declare module 'com.destroystokyo.paper.event.block.TNTPrimeEvent' {
import { Enum } from 'java.lang';
export class PrimeReason extends Enum<PrimeReason> {
  /**
   * When TNT prime was caused by other explosion (chain reaction)
  */
  static readonly EXPLOSION: PrimeReason;
  /**
   * When TNT prime was caused by fire
  */
  static readonly FIRE: PrimeReason;
  /**
   * When {@link Player} used {@link Material#FLINT_AND_STEEL} or
   * {@link Material#FIRE_CHARGE} on given TNT block
  */
  static readonly ITEM: PrimeReason;
  /**
   * When TNT prime was caused by an {@link Entity} shooting TNT
   * using a bow with {@link Enchantment#FLAME} enchantment
  */
  static readonly PROJECTILE: PrimeReason;
  /**
   * When redstone power triggered the TNT prime
  */
  static readonly REDSTONE: PrimeReason;
  static valueOf(name: string): PrimeReason;
  static values(): PrimeReason[];
}

}
declare module 'com.destroystokyo.paper.event.block' {
import { PotionEffect } from 'org.bukkit.potion';
import { Block } from 'org.bukkit.block';
import { InventoryEvent } from 'org.bukkit.event.inventory';
import { HandlerList, Cancellable } from 'org.bukkit.event';
import { BlockData } from 'org.bukkit.block.data';
import { PrimeReason } from 'com.destroystokyo.paper.event.block.TNTPrimeEvent';
import { DamageState } from 'com.destroystokyo.paper.event.block.AnvilDamagedEvent';
import { BlockExpEvent, BlockEvent } from 'org.bukkit.event.block';
import { InventoryView, AnvilInventory } from 'org.bukkit.inventory';
import { Entity, Player } from 'org.bukkit.entity';
/**
 * Called when TNT block is about to turn into {@link TNTPrimed}
 * 
 * Cancelling it won't turn TNT into {@link TNTPrimed} and leaves
 * the TNT block as-is
 *
 * @author Mark Vainomaa
 * @deprecated use {@link org.bukkit.event.block.TNTPrimeEvent}
*/
export class TNTPrimeEvent extends BlockEvent {
  constructor(block: Block, reason: PrimeReason, primerEntity: Entity | null);
  /**
   * Gets the TNT prime reason
   *
   * @return Prime reason
  */
  get reason(): PrimeReason;
  /**
   * Gets the TNT primer {@link Entity}.
   * 
   * It's `null` if {@link #getReason()} is {@link PrimeReason#REDSTONE} or {@link PrimeReason#FIRE}.
   * It's not `null` if {@link #getReason()} is {@link PrimeReason#ITEM} or {@link PrimeReason#PROJECTILE}
   * It might be `null` if {@link #getReason()} is {@link PrimeReason#EXPLOSION}
   *
   * @return The {@link Entity} who primed the TNT
  */
  get primerEntity(): Entity | null;
  /**
   * Gets whether spawning {@link TNTPrimed} should be cancelled or not
   *
   * @return Whether spawning {@link TNTPrimed} should be cancelled or not
  */
  isCancelled(): boolean;
  /**
   * Sets whether to cancel spawning {@link TNTPrimed} or not
   *
   * @param cancel whether spawning {@link TNTPrimed} should be cancelled or not
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface TNTPrimeEvent extends BlockEvent, Cancellable {}
/**
 * Fired anytime the server intends to 'destroy' a block through some triggering reason.
 * This does not fire anytime a block is set to air, but only with more direct triggers such
 * as physics updates, pistons, entities changing blocks, commands set to "Destroy".
 * 
 * This event is associated with the game playing a sound effect at the block in question, when
 * something can be described as "intend to destroy what is there",
 * 
 * Events such as leaves decaying, pistons retracting (where the block is moving), does NOT fire this event.
*/
export class BlockDestroyEvent extends BlockExpEvent {
  constructor(block: Block, newState: BlockData, effectBlock: BlockData, xp: number, willDrop: boolean);
  /**
   * Gets the effect that will be played when the block is broken.
   *
   * @return block break effect
  */
  get effectBlock(): BlockData;
  /**
   * Sets the effect that will be played when the block is broken.
   * Note: {@link BlockDestroyEvent#playEffect()} must be `true` in order for this effect to be
   * played.
   *
   * @param effectBlock block effect
  */
  set effectBlock(effectBlock: BlockData);
  /**
   * @return The new state of this block (Air, or a Fluid type)
  */
  get newState(): BlockData;
  /**
   * @return If the server is going to drop the block in question with this destroy event
  */
  willDrop(): boolean;
  /**
   * @param willDrop If the server is going to drop the block in question with this destroy event
  */
  setWillDrop(willDrop: boolean): void;
  /**
   * @return If the server is going to play the sound effect for this destruction
  */
  playEffect(): boolean;
  /**
   * @param playEffect If the server should play the sound effect for this destruction
  */
  setPlayEffect(playEffect: boolean): void;
  /**
   * @return If the event is cancelled, meaning the block will not be destroyed
  */
  isCancelled(): boolean;
  /**
   * If the event is cancelled, the block will remain in its previous state.
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface BlockDestroyEvent extends BlockExpEvent, Cancellable {}
/**
 * Called when a beacon effect is being applied to a player.
*/
export class BeaconEffectEvent extends BlockEvent {
  constructor(beacon: Block, effect: PotionEffect, player: Player, primary: boolean);
  /**
   * Gets the potion effect being applied.
   *
   * @return Potion effect
  */
  get effect(): PotionEffect;
  /**
   * Sets the potion effect that will be applied.
   *
   * @param effect Potion effect
  */
  set effect(effect: PotionEffect);
  /**
   * Gets the player who the potion effect is being applied to.
   *
   * @return Affected player
  */
  get player(): Player;
  /**
   * Gets whether the effect is a primary beacon effect.
   *
   * @return `true` if this event represents a primary effect
  */
  isPrimary(): boolean;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface BeaconEffectEvent extends BlockEvent, Cancellable {}
/**
 * Called when an anvil is damaged from being used
*/
export class AnvilDamagedEvent extends InventoryEvent {
  constructor(inventory: InventoryView, blockData: BlockData | null);
  get inventory(): AnvilInventory;
  /**
   * Gets the new state of damage on the anvil
   *
   * @return Damage state
  */
  get damageState(): DamageState;
  /**
   * Sets the new state of damage on the anvil
   *
   * @param damageState Damage state
  */
  set damageState(damageState: DamageState);
  /**
   * Gets if anvil is breaking on this use
   *
   * @return `true` if breaking
  */
  isBreaking(): boolean;
  /**
   * Sets if anvil is breaking on this use
   *
   * @param breaking `true` if breaking
  */
  setBreaking(breaking: boolean): void;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface AnvilDamagedEvent extends InventoryEvent, Cancellable {}

}
declare module 'com.destroystokyo.paper.event.server.GS4QueryEvent' {
import { Builder, PluginInformation } from 'com.destroystokyo.paper.event.server.GS4QueryEvent.QueryResponse';
import { Collection } from 'java.util';
import { Enum } from 'java.lang';
/**
 * The type of query
*/
export class QueryType extends Enum<QueryType> {
  /**
   * Basic query asks only a subset of information, such as motd, game type (hardcoded to MINECRAFT), map,
   * current players, max players, server port and server motd
  */
  static readonly BASIC: QueryType;
  /**
   * Full query asks pretty much everything present on this event (only hardcoded values cannot be modified here).
  */
  static readonly FULL: QueryType;
  static valueOf(name: string): QueryType;
  static values(): QueryType[];
}
export class QueryResponse {
  /**
   * Get motd which will be used to reply to the query. By default, it is {@link Server#getMotd()}.
   *
   * @return motd
  */
  get motd(): string;
  /**
   * Get game version which will be used to reply to the query. By default, supported Minecraft versions range is sent.
   *
   * @return game version
  */
  get gameVersion(): string;
  /**
   * Get map name which will be used to reply to the query. By default `world` is sent.
   *
   * @return map name
  */
  get map(): string;
  /**
   * Get current online player count which will be used to reply to the query.
   *
   * @return online player count
  */
  get currentPlayers(): number;
  /**
   * Get max player count which will be used to reply to the query.
   *
   * @return max player count
  */
  get maxPlayers(): number;
  /**
   * Get server (public facing) hostname.
   *
   * @return server hostname
  */
  get hostname(): string;
  /**
   * Get server (public facing) port.
   *
   * @return server port
  */
  get port(): number;
  /**
   * Get collection of players which will be used to reply to the query.
   *
   * @return collection of players
  */
  get players(): Collection<string>;
  /**
   * Get server software (name and version) which will be used to reply to the query.
   *
   * @return server software
  */
  get serverVersion(): string;
  /**
   * Get list of plugins which will be used to reply to the query.
   *
   * @return collection of plugins
  */
  get plugins(): Collection<PluginInformation>;
  /**
   * Creates a new {@link Builder} instance from data represented by this response.
   *
   * @return {@link QueryResponse} builder
  */
  toBuilder(): Builder;
  /**
   * Creates a new {@link Builder} instance.
   *
   * @return {@link QueryResponse} builder
  */
  static builder(): Builder;
}

}
declare module 'com.destroystokyo.paper.event.server' {
import { List } from 'java.util';
import { InetAddress } from 'java.net';
import { CommandSender } from 'org.bukkit.command';
import { QueryResponse, QueryType } from 'com.destroystokyo.paper.event.server.GS4QueryEvent';
import { HandlerList, Cancellable, Event } from 'org.bukkit.event';
import { Completion } from 'com.destroystokyo.paper.event.server.AsyncTabCompleteEvent';
import { ServerException } from 'com.destroystokyo.paper.exception';
import { Location } from 'org.bukkit';
/**
 * This event is fired if server is getting queried over GS4 Query protocol.
 * 
 * Adapted from Velocity's ProxyQueryEvent
 *
 * @author Mark Vainomaa
*/
export class GS4QueryEvent extends Event {
  constructor(queryType: QueryType, querierAddress: InetAddress, response: QueryResponse);
  /**
   * Get query type
   *
   * @return query type
  */
  get queryType(): QueryType;
  /**
   * Get querier address
   *
   * @return querier address
  */
  get querierAddress(): InetAddress;
  /**
   * Get query response
   *
   * @return query response
  */
  get response(): QueryResponse;
  /**
   * Set query response
   *
   * @param response query response
  */
  set response(response: QueryResponse);
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * This event is fired when whitelist is toggled
 *
 * @author Mark Vainomaa
*/
export class WhitelistToggleEvent extends Event {
  constructor(enabled: boolean);
  /**
   * Gets whether whitelist is going to be enabled or not
   *
   * @return Whether whitelist is going to be enabled or not
  */
  isEnabled(): boolean;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Allows plugins to compute tab completion results asynchronously.
 * 
 * If this event provides completions, then the standard synchronous process
 * will not be fired to populate the results.
 * However, the synchronous TabCompleteEvent will fire with the Async results.
 * 
 * Only 1 process will be allowed to provide completions, the Async Event, or the standard process.
*/
export class AsyncTabCompleteEvent extends Event {
  constructor(sender: CommandSender, buffer: string, isCommand: boolean, loc: Location | null);
  constructor(sender: CommandSender, completions: string[], buffer: string, isCommand: boolean, loc: Location | null);
  /**
   * Get the sender completing this command.
   *
   * @return the {@link CommandSender} instance
  */
  get sender(): CommandSender;
  /**
   * The list of completions which will be offered to the sender, in order.
   * This list is mutable and reflects what will be offered.
   * 
   * If this collection is not empty after the event is fired, then
   * the standard process of calling {@link Command#tabComplete(CommandSender, String, String[])}
   * or current player names will not be called.
   *
   * @return a list of offered completions
  */
  get completions(): string[];
  /**
   * Set the completions offered, overriding any already set.
   * If this collection is not empty after the event is fired, then
   * the standard process of calling {@link Command#tabComplete(CommandSender, String, String[])}
   * or current player names will not be called.
   * 
   * The passed collection will be cloned to a new `List`. You must call {@link #getCompletions()} to mutate from here
   *
   * @param completions the new completions
  */
  set completions(completions: string[]);
  /**
   * Return the entire buffer which formed the basis of this completion.
   *
   * @return command buffer, as entered
  */
  get buffer(): string;
  /**
   * @return `true` if it is a command being tab completed, `false` if it is a chat message.
  */
  isCommand(): boolean;
  /**
   * @return The position looked at by the sender, or `null` if none
  */
  get location(): Location | null;
  /**
   * If `true`, the standard process of calling {@link Command#tabComplete(CommandSender, String, String[])}
   * or current player names will not be called.
   *
   * @return Is completions considered handled. Always `true` if completions is not empty.
  */
  isHandled(): boolean;
  /**
   * Sets whether to consider the completion request handled.
   * If `true`, the standard process of calling {@link Command#tabComplete(CommandSender, String, String[])}
   * or current player names will not be called.
   *
   * @param handled if this completion should be marked as being handled
  */
  setHandled(handled: boolean): void;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * {@inheritDoc}
   * 
   * Will provide no completions, and will not fire the synchronous process
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface AsyncTabCompleteEvent extends Event, Cancellable {}
/**
 * Called when the server has finished ticking the main loop
*/
export class ServerTickEndEvent extends Event {
  constructor(tickNumber: number, tickDuration: number, timeRemaining: number);
  /**
   * @return What tick this was since start (first tick = 1)
  */
  get tickNumber(): number;
  /**
   * @return Time in milliseconds of how long this tick took
  */
  get tickDuration(): number;
  /**
   * Amount of nanoseconds remaining before the next tick should start.
   * 
   * If this value is negative, then that means the server has exceeded the tick time limit and TPS has been lost.
   * 
   * Method will continuously return the updated time remaining value. (return value is not static)
   *
   * @return Amount of nanoseconds remaining before the next tick should start
  */
  get timeRemaining(): number;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Called whenever an exception is thrown in a recoverable section of the server.
*/
export class ServerExceptionEvent extends Event {
  constructor(exception: ServerException);
  /**
   * Gets the wrapped exception that was thrown.
   *
   * @return Exception thrown
  */
  get exception(): ServerException;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export class ServerTickStartEvent extends Event {
  constructor(tickNumber: number);
  /**
   * @return What tick this is going be since start (first tick = 1)
  */
  get tickNumber(): number;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}

}
declare module 'com.destroystokyo.paper.util' {
import { Component } from 'net.kyori.adventure.text';
import { Throwable } from 'java.lang';
/**
 * @hidden
*/
export class SneakyThrow {
  static sneaky(exception: Throwable): void;
}
export class VersionFetcher {
  /**
   * Amount of time to cache results for in milliseconds
   * 
   * Negative values will never cache.
   *
   * @return cache time
  */
  get cacheTime(): number;
  /**
   * Gets the version message to cache and show to command senders.
   *
   * @return the message to show when requesting a version
   * @apiNote This method may involve a web request which will block the executing thread
  */
  get versionMessage(): Component;
  /**
   * Gets the version message to cache and show to command senders.
   *
   * @param serverVersion the current version of the server (will match {@link Bukkit#getVersion()})
   * @return the message to show when requesting a version
   * @apiNote This method may involve a web request which will block the current thread
   * @see #getVersionMessage()
   * @deprecated `serverVersion` is not required
  */
  getVersionMessage(serverVersion: string): Component;
}

}
declare module 'com.destroystokyo.paper.entity' {
import { PathResult } from 'com.destroystokyo.paper.entity.Pathfinder';
import { Vector } from 'org.bukkit.util';
import { Location } from 'org.bukkit';
import { LivingEntity, Mob, Entity } from 'org.bukkit.entity';
/**
 * Handles pathfinding operations for an Entity
*/
export class Pathfinder {
  /**
   * @return The entity that is controlled by this pathfinder
  */
  get entity(): Mob;
  /**
   * Instructs the Entity to stop trying to navigate to its current desired location
  */
  stopPathfinding(): void;
  /**
   * If the entity is currently trying to navigate to a destination, this will return true
   *
   * @return true if the entity is navigating to a destination
  */
  hasPath(): boolean;
  /**
   * @return The location the entity is trying to navigate to, or null if there is no destination
  */
  get currentPath(): PathResult | null;
  /**
   * Calculates a destination for the Entity to navigate to, but does not set it
   * as the current target. Useful for calculating what would happen before setting it.
   *
   * @param loc Location to navigate to
   * @return The closest Location the Entity can get to for this navigation, or null if no path could be calculated
  */
  findPath(loc: Location): PathResult | null;
  /**
   * Calculates a destination for the Entity to navigate to reach the target entity,
   * but does not set it as the current target.
   * Useful for calculating what would happen before setting it.
   * 
   * The behavior of this PathResult is subject to the games pathfinding rules, and may
   * result in the pathfinding automatically updating to follow the target Entity.
   * 
   * However, this behavior is not guaranteed, and is subject to the game's behavior.
   *
   * @param target the Entity to navigate to
   * @return The closest Location the Entity can get to for this navigation, or null if no path could be calculated
  */
  findPath(target: LivingEntity): PathResult | null;
  /**
   * Calculates a destination for the Entity to navigate to reach the target entity,
   * but does not set it as the current target.
   * Useful for calculating what would happen before setting it.
   * 
   * The behavior of this PathResult is subject to the games pathfinding rules, and may
   * result in the pathfinding automatically updating to follow the target Entity.
   * 
   * However, this behavior is not guaranteed, and is subject to the game's behavior.
   *
   * @param target the Entity to navigate to
   * @return The closest Location the Entity can get to for this navigation, or null if no path could be calculated
  */
  findPath(target: Entity): PathResult | null;
  /**
   * Calculates a destination for the Entity to navigate to, and sets it with default speed
   * as the current target.
   *
   * @param loc Location to navigate to
   * @return If the pathfinding was successfully started
  */
  moveTo(loc: Location): boolean;
  /**
   * Calculates a destination for the Entity to navigate to, with desired speed
   * as the current target.
   *
   * @param loc   Location to navigate to
   * @param speed Speed multiplier to navigate at, where 1 is 'normal'
   * @return If the pathfinding was successfully started
  */
  moveTo(loc: Location, speed: number): boolean;
  /**
   * Calculates a destination for the Entity to navigate to reach the target entity,
   * and sets it with default speed.
   * 
   * The behavior of this PathResult is subject to the games pathfinding rules, and may
   * result in the pathfinding automatically updating to follow the target Entity.
   * 
   * However, this behavior is not guaranteed, and is subject to the game's behavior.
   *
   * @param target the Entity to navigate to
   * @return If the pathfinding was successfully started
  */
  moveTo(target: LivingEntity): boolean;
  /**
   * Calculates a destination for the Entity to navigate to reach the target entity,
   * and sets it with specified speed.
   * 
   * The behavior of this PathResult is subject to the games pathfinding rules, and may
   * result in the pathfinding automatically updating to follow the target Entity.
   * 
   * However, this behavior is not guaranteed, and is subject to the game's behavior.
   *
   * @param target the Entity to navigate to
   * @param speed  Speed multiplier to navigate at, where 1 is 'normal'
   * @return If the pathfinding was successfully started
  */
  moveTo(target: LivingEntity, speed: number): boolean;
  /**
   * Calculates a destination for the Entity to navigate to reach the target entity,
   * and sets it with default speed.
   * 
   * The behavior of this PathResult is subject to the games pathfinding rules, and may
   * result in the pathfinding automatically updating to follow the target Entity.
   * 
   * However, this behavior is not guaranteed, and is subject to the game's behavior.
   *
   * @param target the Entity to navigate to
   * @return If the pathfinding was successfully started
  */
  moveTo(target: Entity): boolean;
  /**
   * Calculates a destination for the Entity to navigate to reach the target entity,
   * and sets it with specified speed.
   * 
   * The behavior of this PathResult is subject to the games pathfinding rules, and may
   * result in the pathfinding automatically updating to follow the target Entity.
   * 
   * However, this behavior is not guaranteed, and is subject to the game's behavior.
   *
   * @param target the Entity to navigate to
   * @param speed  Speed multiplier to navigate at, where 1 is 'normal'
   * @return If the pathfinding was successfully started
  */
  moveTo(target: Entity, speed: number): boolean;
  /**
   * Takes the result of a previous pathfinding calculation and sets it
   * as the active pathfinding with default speed.
   *
   * @param path The Path to start following
   * @return If the pathfinding was successfully started
  */
  moveTo(path: PathResult): boolean;
  /**
   * Takes the result of a previous pathfinding calculation and sets it
   * as the active pathfinding,
   *
   * @param path  The Path to start following
   * @param speed Speed multiplier to navigate at, where 1 is 'normal'
   * @return If the pathfinding was successfully started
  */
  moveTo(path: PathResult, speed: number): boolean;
  /**
   * Checks if this pathfinder allows passing through closed doors.
   *
   * @return if this pathfinder allows passing through closed doors
  */
  canOpenDoors(): boolean;
  /**
   * Allows this pathfinder to pass through closed doors, or not
   *
   * @param canOpenDoors if the mob can pass through closed doors, or not
  */
  setCanOpenDoors(canOpenDoors: boolean): void;
  /**
   * Checks if this pathfinder allows passing through open doors.
   *
   * @return if this pathfinder allows passing through open doors
  */
  canPassDoors(): boolean;
  /**
   * Allows this pathfinder to pass through open doors, or not
   *
   * @param canPassDoors if the mob can pass through open doors, or not
  */
  setCanPassDoors(canPassDoors: boolean): void;
  /**
   * Checks if this pathfinder assumes that the mob can float
   *
   * @return if this pathfinder assumes that the mob can float
  */
  canFloat(): boolean;
  /**
   * Makes this pathfinder assume that the mob can float, or not
   *
   * @param canFloat if the mob can float, or not
  */
  setCanFloat(canFloat: boolean): void;
}
export class RangedEntity extends Mob {
  /**
   * Attack the specified entity using a ranged attack.
   *
   * @param target the entity to target
   * @param charge How "charged" the attack is (how far back the bow was pulled for Bow attacks).
   *               This should be a value between 0 and 1, represented as targetDistance/maxDistance.
  */
  rangedAttack(target: LivingEntity, charge: number): void;
  /**
   * Sets that the Entity is "charging" up an attack, by raising its hands
   *
   * @param raiseHands Whether the entities hands are raised to charge attack
   * @deprecated use {@link #setAggressive(boolean)}
  */
  setChargingAttack(raiseHands: boolean): void;
  /**
   * Alias to {@link LivingEntity#isHandRaised()}, if the entity is charging an attack
   * @return If entities hands are raised
   * @deprecated use {@link #isHandRaised()}
  */
  isChargingAttack(): boolean;
}
/**
 * Represents information about a targeted entity
 * @deprecated use {@link org.bukkit.util.RayTraceResult}
*/
export class TargetEntityInfo {
  constructor(entity: Entity, hitVec: Vector);
  /**
   * Get the entity that is targeted
   *
   * @return Targeted entity
  */
  get entity(): Entity;
  /**
   * Get the position the entity is targeted at
   *
   * @return Targeted position
  */
  get hitVector(): Vector;
}

}
declare module 'com.destroystokyo.paper.event.brigadier' {
import { PlayerEvent } from 'org.bukkit.event.player';
import { CommandSourceStack } from 'io.papermc.paper.command.brigadier';
import { ServerEvent } from 'org.bukkit.event.server';
import { ArgumentCommandNode, LiteralCommandNode, RootCommandNode } from 'com.mojang.brigadier.tree';
import { Command } from 'org.bukkit.command';
import { BukkitBrigadierCommand, BukkitBrigadierCommandSource } from 'com.destroystokyo.paper.brigadier';
import { HandlerList, Cancellable } from 'org.bukkit.event';
import { Suggestions } from 'com.mojang.brigadier.suggestion';
import { Player } from 'org.bukkit.entity';
/**
 * Called when sending {@link Suggestions} to the client. Will be called asynchronously if a plugin
 * marks the {@link com.destroystokyo.paper.event.server.AsyncTabCompleteEvent} event handled asynchronously,
 * otherwise called synchronously.
*/
export class AsyncPlayerSendSuggestionsEvent extends PlayerEvent {
  constructor(player: Player, suggestions: Suggestions, buffer: string);
  /**
   * Gets the input buffer sent to request these suggestions.
   *
   * @return the input buffer
  */
  get buffer(): string;
  /**
   * Gets the suggestions to be sent to client.
   *
   * @return the suggestions
  */
  get suggestions(): Suggestions;
  /**
   * Sets the suggestions to be sent to client.
   *
   * @param suggestions suggestions
  */
  set suggestions(suggestions: Suggestions);
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Cancels sending suggestions to the client.
   * 
   * {@inheritDoc}
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface AsyncPlayerSendSuggestionsEvent extends PlayerEvent, Cancellable {}
/**
 * Fired anytime the server synchronizes Bukkit commands to Brigadier.
 *
 * Allows a plugin to control the command node structure for its commands.
 * This is done at Plugin Enable time after commands have been registered, but may also
 * run at a later point in the server lifetime due to plugins, a server reload, etc.
 *
 * @deprecated For removal, use the new brigadier api.
*/
export class CommandRegisteredEvent<S> extends ServerEvent {
  constructor(commandLabel: string, brigadierCommand: BukkitBrigadierCommand<S>, command: Command, root: RootCommandNode<S>, literal: LiteralCommandNode<S>, defaultArgs: ArgumentCommandNode<S,string>);
  /**
   * Gets the command label of the {@link Command} being registered.
   *
   * @return the command label
  */
  get commandLabel(): string;
  /**
   * Gets the {@link BukkitBrigadierCommand} for the {@link Command} being registered. This can be used
   * as the {@link com.mojang.brigadier.Command command executor} or
   * {@link com.mojang.brigadier.suggestion.SuggestionProvider} of a {@link com.mojang.brigadier.tree.CommandNode}
   * to delegate to the {@link Command} being registered.
   *
   * @return the {@link BukkitBrigadierCommand}
  */
  get brigadierCommand(): BukkitBrigadierCommand<S>;
  /**
   * Gets the {@link Command} being registered.
   *
   * @return the {@link Command}
  */
  get command(): Command;
  /**
   * Gets the {@link RootCommandNode} which is being registered to.
   *
   * @return the {@link RootCommandNode}
  */
  get root(): RootCommandNode<S>;
  /**
   * Gets the Bukkit APIs default arguments node (greedy string), for if
   * you wish to reuse it.
   *
   * @return default arguments node
  */
  get defaultArgs(): ArgumentCommandNode<S,string>;
  /**
   * Gets the {@link LiteralCommandNode} to be registered for the {@link Command}.
   *
   * @return the {@link LiteralCommandNode}
  */
  get literal(): LiteralCommandNode<S>;
  /**
   * Sets the {@link LiteralCommandNode} used to register this command. The default literal is mutable, so
   * this is primarily if you want to completely replace the object.
   *
   * @param literal new node
  */
  set literal(literal: LiteralCommandNode<S>);
  /**
   * Gets whether this command should is treated as "raw".
   *
   * @see #setRawCommand(boolean)
   * @return whether this command is treated as "raw"
  */
  isRawCommand(): boolean;
  /**
   * Sets whether this command should be treated as "raw".
   *
   * A "raw" command will only use the node provided by this event for
   * sending the command tree to the client. For execution purposes, the default
   * greedy string execution of a standard Bukkit {@link Command} is used.
   *
   * On older versions of Paper, this was the default and only behavior of this
   * event.
   *
   * @param rawCommand whether this command should be treated as "raw"
  */
  setRawCommand(rawCommand: boolean): void;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Cancels registering this command to Brigadier, but will remain in Bukkit Command Map. Can be used to hide a
   * command from all players.
   * 
   * {@inheritDoc}
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface CommandRegisteredEvent<S> extends ServerEvent, Cancellable {}
/**
 * Fired any time a Brigadier RootCommandNode is generated for a player to inform the client of commands.
 * You may manipulate this CommandNode to change what the client sees.
 *
 * This event may fire on login, world change, and permission rebuilds, by plugin request, and potentially future means.
 *
 * This event will fire before {@link org.bukkit.event.player.PlayerCommandSendEvent}, so no filtering has been done by
 * other plugins yet.
 *
 * WARNING: This event will potentially (and most likely) fire twice! Once for Async, and once again for Sync.
 * It is important that you check event.isAsynchronous() and event.hasFiredAsync() to ensure you only act once.
 * If for some reason we are unable to send this asynchronously in the future, only the sync method will fire.
 *
 * Your logic should look like this:
 * `if (event.isAsynchronous() || !event.hasFiredAsync()) { // do stuff `}
 *
 * If your logic is not safe to run asynchronously, only react to the synchronous version.
 *
 * This is a draft/experimental API and is subject to change.
*/
export class AsyncPlayerSendCommandsEvent<S> extends PlayerEvent {
  constructor(player: Player, node: RootCommandNode<S>, hasFiredAsync: boolean);
  /**
   * Gets the full Root Command Node being sent to the client, which is mutable.
   *
   * @return the root command node
  */
  get commandNode(): RootCommandNode<S>;
  /**
   * Gets if this event has already fired asynchronously.
   *
   * @return whether this event has already fired asynchronously
  */
  hasFiredAsync(): boolean;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}

}
declare module 'com.destroystokyo.paper.utils' {
import { Logger } from 'java.util.logging';
import { PluginDescriptionFile } from 'org.bukkit.plugin';
import { PluginMeta } from 'io.papermc.paper.plugin.configuration';
/**
 * Prevents plugins (e.g. Essentials) from changing the parent of the plugin logger.
*/
export class PaperPluginLogger extends Logger {
  static getLogger(description: PluginDescriptionFile): Logger;
  static getLogger(meta: PluginMeta): Logger;
  set parent(parent: Logger);
}

}
declare module 'com.destroystokyo.paper.loottable' {
import { PlayerEvent } from 'org.bukkit.event.player';
import { UUID } from 'java.util';
import { Block } from 'org.bukkit.block';
import { Lootable } from 'org.bukkit.loot';
import { HandlerList, Cancellable } from 'org.bukkit.event';
import { Entity, Player } from 'org.bukkit.entity';
/**
 * Represents an Inventory that can generate loot, such as Minecarts inside of Mineshafts
*/
export class LootableEntityInventory extends LootableInventory {
  /**
   * Gets the entity that is lootable
   * @return The Entity
  */
  get entity(): Entity;
}
/**
 * Represents an Inventory that can generate loot, such as Chests inside of Fortresses and Mineshafts
*/
export class LootableBlockInventory extends LootableInventory {
  /**
   * Gets the block that is lootable
   * @return The Block
  */
  get block(): Block;
}
/**
 * Represents an Inventory that contains a Loot Table associated to it that will
 * automatically fill on first open.
 * 
 * A new feature and API is provided to support automatically refreshing the contents
 * of the inventory based on that Loot Table after a configurable amount of time has passed.
 * 
 * The behavior of how the Inventory is filled based on the loot table may vary based
 * on Minecraft versions and the Loot Table feature.
*/
export class LootableInventory extends Lootable {
  /**
   * Server owners have to enable whether an object in a world should refill
   *
   * @return If the world this inventory is currently in has Replenishable Lootables enabled
  */
  isRefillEnabled(): boolean;
  /**
   * Whether this object has ever been filled
   *
   * @return Has ever been filled
  */
  hasBeenFilled(): boolean;
  /**
   * Has this player ever looted this block
   *
   * @param player The player to check
   * @return Whether this player has looted this block
  */
  hasPlayerLooted(player: Player): boolean;
  /**
   * Checks if this player can loot this block. Takes into account the "restrict player reloot" settings
   *
   * @param player the player to check
   * @return Whether this player can loot this block
  */
  canPlayerLoot(player: UUID): boolean;
  /**
   * Has this player ever looted this block
   *
   * @param player The player to check
   * @return Whether this player has looted this block
  */
  hasPlayerLooted(player: UUID): boolean;
  /**
   * Gets the timestamp, in milliseconds, of when the player last looted this object
   *
   * @param player The player to check
   * @return Timestamp last looted, or null if player has not looted this object
  */
  getLastLooted(player: Player): number | null;
  /**
   * Gets the timestamp, in milliseconds, of when the player last looted this object
   *
   * @param player The player to check
   * @return Timestamp last looted, or null if player has not looted this object
  */
  getLastLooted(player: UUID): number | null;
  /**
   * Change the state of whether a player has looted this block
   *
   * @param player The player to change state for
   * @param looted true to add player to looted list, false to remove
   * @return The previous state of whether the player had looted this or not
  */
  setHasPlayerLooted(player: Player, looted: boolean): boolean;
  /**
   * Change the state of whether a player has looted this block
   *
   * @param player The player to change state for
   * @param looted true to add player to looted list, false to remove
   * @return The previous state of whether the player had looted this or not
  */
  setHasPlayerLooted(player: UUID, looted: boolean): boolean;
  /**
   * Returns Whether this object has been filled and now has a pending refill
   *
   * @return Has pending refill
  */
  hasPendingRefill(): boolean;
  /**
   * Gets the timestamp in milliseconds that the Lootable object was last refilled
   *
   * @return -1 if it was never refilled, or timestamp in milliseconds
  */
  get lastFilled(): number;
  /**
   * Gets the timestamp in milliseconds that the Lootable object will refill
   *
   * @return -1 if it is not scheduled for refill, or timestamp in milliseconds
  */
  get nextRefill(): number;
  /**
   * Sets the timestamp in milliseconds of the next refill for this object
   *
   * @param refillAt timestamp in milliseconds. -1 to clear next refill
   * @return The previous scheduled time to refill, or -1 if was not scheduled
  */
  set nextRefill(nextRefill: number);
}
export class LootableInventoryReplenishEvent extends PlayerEvent {
  constructor(player: Player, inventory: LootableInventory);
  get inventory(): LootableInventory;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface LootableInventoryReplenishEvent extends PlayerEvent, Cancellable {}

}
declare module 'com.destroystokyo.paper.inventory.meta' {
import { ItemMeta } from 'org.bukkit.inventory.meta';
export class ArmorStandMeta extends ItemMeta {
  /**
   * Gets whether the ArmorStand should be invisible when spawned
   *
   * @return true if this should be invisible
  */
  isInvisible(): boolean;
  /**
   * Gets whether this ArmorStand should have no base plate when spawned
   *
   * @return true if it will not have a base plate
  */
  hasNoBasePlate(): boolean;
  /**
   * Gets whether this ArmorStand should show arms when spawned
   *
   * @return true if it will show arms
  */
  shouldShowArms(): boolean;
  /**
   * Gets whether this ArmorStand will be small when spawned
   *
   * @return true if it will be small
  */
  isSmall(): boolean;
  /**
   * Gets whether this ArmorStand will be a marker when spawned
   * The exact details of this flag are an implementation detail
   *
   * @return true if it will be a marker
  */
  isMarker(): boolean;
  /**
   * Sets that this ArmorStand should be invisible when spawned
   *
   * @param invisible true if set invisible
  */
  setInvisible(invisible: boolean): void;
  /**
   * Sets that this ArmorStand should have no base plate when spawned
   *
   * @param noBasePlate true if no base plate
  */
  setNoBasePlate(noBasePlate: boolean): void;
  /**
   * Sets that this ArmorStand should show arms when spawned
   *
   * @param showArms true if show arms
  */
  setShowArms(showArms: boolean): void;
  /**
   * Sets that this ArmorStand should be small when spawned
   *
   * @param small true if small
  */
  setSmall(small: boolean): void;
  /**
   * Sets that this ArmorStand should be a marker when spawned
   * The exact details of this flag are an implementation detail
   *
   * @param marker true if a marker
  */
  setMarker(marker: boolean): void;
}

}
declare module 'com.destroystokyo.paper.entity.ai' {
import { SchoolableFish } from 'io.papermc.paper.entity';
import { EnumSet, Collection } from 'java.util';
import { Enum, Class } from 'java.lang';
import { RangedEntity } from 'com.destroystokyo.paper.entity';
import { NamespacedKey } from 'org.bukkit';
import { AbstractHorse, Vindicator, AbstractSkeleton, Creature, Dolphin, HappyGhast, Creeper, Rabbit, Vex, Silverfish, IronGolem, Shulker, Illager, Squid, Strider, Monster, Spellcaster, Phantom, Fish, WanderingTrader, Guardian, Wolf, AbstractVillager, SkeletonHorse, Wither, PolarBear, Turtle, Mob, Raider, Bee, Tameable, PufferFish, Zombie, Parrot, Evoker, Slime, Fox, Panda, Illusioner, Ocelot, Animals, Drowned, Llama, Enderman, Blaze, Cat, Ghast, Spider } from 'org.bukkit.entity';
/**
 * Represents a part of the "brain" of a mob. It tracks all tasks (running or not), allows adding and removing goals
*/
export class MobGoals {
  addGoal<T>(mob: T, priority: number, goal: Goal<T>): void;
  removeGoal<T>(mob: T, goal: Goal<T>): void;
  removeAllGoals<T>(mob: T): void;
  removeAllGoals<T>(mob: T, type: GoalType): void;
  removeGoal<T>(mob: T, key: GoalKey<T>): void;
  hasGoal<T>(mob: T, key: GoalKey<T>): boolean;
  getGoal<T>(mob: T, key: GoalKey<T>): Goal<T> | null;
  getGoals<T>(mob: T, key: GoalKey<T>): Collection<Goal<T>>;
  getAllGoals<T>(mob: T): Collection<Goal<T>>;
  getAllGoals<T>(mob: T, type: GoalType): Collection<Goal<T>>;
  getAllGoalsWithout<T>(mob: T, type: GoalType): Collection<Goal<T>>;
  getRunningGoals<T>(mob: T): Collection<Goal<T>>;
  getRunningGoals<T>(mob: T, type: GoalType): Collection<Goal<T>>;
  getRunningGoalsWithout<T>(mob: T, type: GoalType): Collection<Goal<T>>;
}
/**
 * Used to identify a Goal. Consists of a {@link NamespacedKey} and the type of mob the goal can be applied to
 *
 * @param  the type of mob the goal can be applied to
*/
export class GoalKey<T> {
  get entityClass(): Class<T>;
  get namespacedKey(): NamespacedKey;
  equals(o: any | null): boolean;
  hashCode(): number;
  toString(): string;
  static of<A>(type: Class<A>, key: NamespacedKey): GoalKey<A>;
}
/**
 * Represents the subtype of a goal. Used by minecraft to disable certain types of goals if needed.
*/
export class GoalType extends Enum<GoalType> {
  static readonly MOVE: GoalType;
  static readonly LOOK: GoalType;
  static readonly JUMP: GoalType;
  static readonly TARGET: GoalType;
  /**
   * Used to map vanilla goals, that are a behavior goal but don't have a type set...
  */
  static readonly UNKNOWN_BEHAVIOR: GoalType;
  static valueOf(name: string): GoalType;
  static values(): GoalType[];
}
/**
 * Vanilla keys for Mob Goals.
 *
 * @apiNote The fields provided here are a direct representation of
 * what is available from the vanilla game source. They may be
 * changed (including removals) on any Minecraft version
 * bump, so cross-version compatibility is not provided on the
 * same level as it is on most of the other API.
*/
export class VanillaGoal<T> extends Goal<T> {
  static readonly HORSE_MOUNT_PANIC: GoalKey<AbstractHorse>;
  static readonly HORSE_RANDOM_STAND: GoalKey<AbstractHorse>;
  static readonly HORSE_RUN_AROUND_LIKE_CRAZY: GoalKey<AbstractHorse>;
  static readonly SKELETON_MELEE: GoalKey<AbstractSkeleton>;
  static readonly VILLAGER_LOOK_AT_TRADING_PLAYER: GoalKey<AbstractVillager>;
  static readonly VILLAGER_TRADE_WITH_PLAYER: GoalKey<AbstractVillager>;
  static readonly BREED: GoalKey<Animals>;
  static readonly FOLLOW_PARENT: GoalKey<Animals>;
  static readonly BEE_ATTACK: GoalKey<Bee>;
  static readonly BEE_BECOME_ANGRY: GoalKey<Bee>;
  static readonly BEE_ENTER_HIVE: GoalKey<Bee>;
  static readonly BEE_GO_TO_HIVE: GoalKey<Bee>;
  static readonly BEE_GO_TO_KNOWN_FLOWER: GoalKey<Bee>;
  static readonly BEE_GROW_CROP: GoalKey<Bee>;
  static readonly BEE_HURT_BY_OTHER: GoalKey<Bee>;
  static readonly BEE_LOCATE_HIVE: GoalKey<Bee>;
  static readonly BEE_POLLINATE: GoalKey<Bee>;
  static readonly BEE_VALIDATE_FLOWER: GoalKey<Bee>;
  static readonly BEE_VALIDATE_HIVE: GoalKey<Bee>;
  static readonly BEE_WANDER: GoalKey<Bee>;
  static readonly BLAZE_ATTACK: GoalKey<Blaze>;
  static readonly CAT_AVOID_ENTITY: GoalKey<Cat>;
  static readonly CAT_LIE_ON_BED: GoalKey<Cat>;
  static readonly CAT_RELAX_ON_OWNER: GoalKey<Cat>;
  static readonly CAT_SIT_ON_BLOCK: GoalKey<Cat>;
  static readonly CAT_TEMPT: GoalKey<Cat>;
  static readonly AVOID_ENTITY: GoalKey<Creature>;
  static readonly BREATH_AIR: GoalKey<Creature>;
  static readonly DROWNED_GO_TO_WATER: GoalKey<Creature>;
  static readonly FLEE_SUN: GoalKey<Creature>;
  static readonly FOLLOW_BOAT: GoalKey<Creature>;
  static readonly GOLEM_RANDOM_STROLL_IN_VILLAGE: GoalKey<Creature>;
  static readonly HURT_BY: GoalKey<Creature>;
  static readonly MELEE_ATTACK: GoalKey<Creature>;
  static readonly MOVE_BACK_TO_VILLAGE: GoalKey<Creature>;
  static readonly MOVE_THROUGH_VILLAGE: GoalKey<Creature>;
  static readonly MOVE_TOWARDS: GoalKey<Creature>;
  static readonly MOVE_TOWARDS_RESTRICTION: GoalKey<Creature>;
  static readonly PANIC: GoalKey<Creature>;
  static readonly PARROT_WANDER: GoalKey<Creature>;
  static readonly RANDOM_STROLL: GoalKey<Creature>;
  static readonly RANDOM_SWIMMING: GoalKey<Creature>;
  static readonly REMOVE_BLOCK: GoalKey<Creature>;
  static readonly RESTRICT_SUN: GoalKey<Creature>;
  static readonly STROLL_THROUGH_VILLAGE: GoalKey<Creature>;
  static readonly TEMPT: GoalKey<Creature>;
  static readonly TRY_FIND_WATER: GoalKey<Creature>;
  static readonly WATER_AVOIDING_RANDOM_FLYING: GoalKey<Creature>;
  static readonly WATER_AVOIDING_RANDOM_STROLL: GoalKey<Creature>;
  static readonly CREEPER_SWELL: GoalKey<Creeper>;
  static readonly DOLPHIN_JUMP: GoalKey<Dolphin>;
  static readonly DOLPHIN_PLAY_WITH_ITEMS: GoalKey<Dolphin>;
  static readonly DOLPHIN_SWIM_TO_TREASURE: GoalKey<Dolphin>;
  static readonly DOLPHIN_SWIM_WITH_PLAYER: GoalKey<Dolphin>;
  static readonly DROWNED_ATTACK: GoalKey<Drowned>;
  static readonly DROWNED_GO_TO_BEACH: GoalKey<Drowned>;
  static readonly DROWNED_SWIM_UP: GoalKey<Drowned>;
  static readonly ENDERMAN_FREEZE_WHEN_LOOKED_AT: GoalKey<Enderman>;
  static readonly ENDERMAN_LEAVE_BLOCK: GoalKey<Enderman>;
  static readonly ENDERMAN_LOOK_FOR_PLAYER: GoalKey<Enderman>;
  static readonly ENDERMAN_TAKE_BLOCK: GoalKey<Enderman>;
  static readonly EVOKER_ATTACK_SPELL: GoalKey<Evoker>;
  static readonly EVOKER_CASTING_SPELL: GoalKey<Evoker>;
  static readonly EVOKER_SUMMON_SPELL: GoalKey<Evoker>;
  static readonly EVOKER_WOLOLO_SPELL: GoalKey<Evoker>;
  static readonly FISH_SWIM: GoalKey<Fish>;
  static readonly FOX_BREED: GoalKey<Fox>;
  static readonly FOX_DEFEND_TRUSTED: GoalKey<Fox>;
  static readonly FOX_EAT_BERRIES: GoalKey<Fox>;
  static readonly FOX_FACEPLANT: GoalKey<Fox>;
  static readonly FOX_FLOAT: GoalKey<Fox>;
  static readonly FOX_FOLLOW_PARENT: GoalKey<Fox>;
  static readonly FOX_LOOK_AT_PLAYER: GoalKey<Fox>;
  static readonly FOX_MELEE_ATTACK: GoalKey<Fox>;
  static readonly FOX_PANIC: GoalKey<Fox>;
  static readonly FOX_PERCH_AND_SEARCH: GoalKey<Fox>;
  static readonly FOX_POUNCE: GoalKey<Fox>;
  static readonly FOX_SEARCH_FOR_ITEMS: GoalKey<Fox>;
  static readonly FOX_SEEK_SHELTER: GoalKey<Fox>;
  static readonly FOX_SLEEP: GoalKey<Fox>;
  static readonly FOX_STALK_PREY: GoalKey<Fox>;
  static readonly FOX_STROLL_THROUGH_VILLAGE: GoalKey<Fox>;
  static readonly GHAST_SHOOT_FIREBALL: GoalKey<Ghast>;
  static readonly GUARDIAN_ATTACK: GoalKey<Guardian>;
  static readonly HAPPY_GHAST_FLOAT: GoalKey<HappyGhast>;
  static readonly ILLAGER_HOLD_GROUND_ATTACK: GoalKey<Illager>;
  static readonly RAIDER_OPEN_DOOR: GoalKey<Illager>;
  static readonly ILLUSIONER_BLINDNESS_SPELL: GoalKey<Illusioner>;
  static readonly ILLUSIONER_MIRROR_SPELL: GoalKey<Illusioner>;
  static readonly IRON_GOLEM_DEFEND_VILLAGE: GoalKey<IronGolem>;
  static readonly IRON_GOLEM_OFFER_FLOWER: GoalKey<IronGolem>;
  static readonly LLAMA_ATTACK_WOLF: GoalKey<Llama>;
  static readonly LLAMA_FOLLOW_CARAVAN: GoalKey<Llama>;
  static readonly LLAMA_HURT_BY: GoalKey<Llama>;
  static readonly TRADER_LLAMA_DEFEND_WANDERING_TRADER: GoalKey<Llama>;
  static readonly BREAK_DOOR: GoalKey<Mob>;
  static readonly CLIMB_ON_TOP_OF_POWDER_SNOW: GoalKey<Mob>;
  static readonly EAT_BLOCK: GoalKey<Mob>;
  static readonly FLOAT: GoalKey<Mob>;
  static readonly FOLLOW_MOB: GoalKey<Mob>;
  static readonly GHAST_LOOK: GoalKey<Mob>;
  static readonly INTERACT: GoalKey<Mob>;
  static readonly LEAP_AT: GoalKey<Mob>;
  static readonly LOOK_AT_PLAYER: GoalKey<Mob>;
  static readonly NEAREST_ATTACKABLE: GoalKey<Mob>;
  static readonly OCELOT_ATTACK: GoalKey<Mob>;
  static readonly OPEN_DOOR: GoalKey<Mob>;
  static readonly RANDOM_FLOAT_AROUND: GoalKey<Mob>;
  static readonly RANDOM_LOOK_AROUND: GoalKey<Mob>;
  static readonly RESET_UNIVERSAL_ANGER: GoalKey<Mob>;
  static readonly TEMPT_FOR_NON_PATHFINDERS: GoalKey<Mob>;
  static readonly USE_ITEM: GoalKey<Mob>;
  static readonly VINDICATOR_BREAK_DOOR: GoalKey<Mob>;
  static readonly RANGED_BOW_ATTACK: GoalKey<Monster>;
  static readonly RANGED_CROSSBOW_ATTACK: GoalKey<Monster>;
  static readonly SPEAR_USE: GoalKey<Monster>;
  static readonly OCELOT_AVOID_ENTITY: GoalKey<Ocelot>;
  static readonly OCELOT_TEMPT: GoalKey<Ocelot>;
  static readonly PANDA_ATTACK: GoalKey<Panda>;
  static readonly PANDA_AVOID: GoalKey<Panda>;
  static readonly PANDA_BREED: GoalKey<Panda>;
  static readonly PANDA_HURT_BY: GoalKey<Panda>;
  static readonly PANDA_LIE_ON_BACK: GoalKey<Panda>;
  static readonly PANDA_LOOK_AT_PLAYER: GoalKey<Panda>;
  static readonly PANDA_PANIC: GoalKey<Panda>;
  static readonly PANDA_ROLL: GoalKey<Panda>;
  static readonly PANDA_SIT: GoalKey<Panda>;
  static readonly PANDA_SNEEZE: GoalKey<Panda>;
  static readonly PARROT_LAND_ON_OWNERS_SHOULDER: GoalKey<Parrot>;
  static readonly PHANTOM_ATTACK_PLAYER: GoalKey<Phantom>;
  static readonly PHANTOM_ATTACK_STRATEGY: GoalKey<Phantom>;
  static readonly PHANTOM_CIRCLE_AROUND_ANCHOR: GoalKey<Phantom>;
  static readonly PHANTOM_SWEEP_ATTACK: GoalKey<Phantom>;
  static readonly POLAR_BEAR_ATTACK_PLAYERS: GoalKey<PolarBear>;
  static readonly POLAR_BEAR_HURT_BY: GoalKey<PolarBear>;
  static readonly POLAR_BEAR_MELEE_ATTACK: GoalKey<PolarBear>;
  static readonly PUFFERFISH_PUFF: GoalKey<PufferFish>;
  static readonly RABBIT_AVOID_ENTITY: GoalKey<Rabbit>;
  static readonly RABBIT_PANIC: GoalKey<Rabbit>;
  static readonly RABBIT_RAID_GARDEN: GoalKey<Rabbit>;
  static readonly RAIDER_CELEBRATION: GoalKey<Raider>;
  static readonly RAIDER_LONG_DISTANCE_PATROL: GoalKey<Raider>;
  static readonly RAIDER_MOVE_THROUGH_VILLAGE: GoalKey<Raider>;
  static readonly RAIDER_NEAREST_ATTACKABLE_WITCH: GoalKey<Raider>;
  static readonly RAIDER_NEAREST_HEALABLE_RAIDER: GoalKey<Raider>;
  static readonly RAIDER_OBTAIN_RAID_LEADER_BANNER: GoalKey<Raider>;
  static readonly RAIDER_PATHFIND_TO_RAID: GoalKey<Raider>;
  static readonly DROWNED_TRIDENT_ATTACK: GoalKey<RangedEntity>;
  static readonly RANGED_ATTACK: GoalKey<RangedEntity>;
  static readonly SCHOOLABLE_FISH_FOLLOW_FLOCK_LEADER: GoalKey<SchoolableFish>;
  static readonly SHULKER_ATTACK: GoalKey<Shulker>;
  static readonly SHULKER_DEFENSE_ATTACK: GoalKey<Shulker>;
  static readonly SHULKER_NEAREST_ATTACK: GoalKey<Shulker>;
  static readonly SHULKER_PEEK: GoalKey<Shulker>;
  static readonly SILVERFISH_MERGE_WITH_STONE: GoalKey<Silverfish>;
  static readonly SILVERFISH_WAKE_UP_FRIENDS: GoalKey<Silverfish>;
  static readonly SKELETON_HORSE_SKELETON_TRAP: GoalKey<SkeletonHorse>;
  static readonly SLIME_ATTACK: GoalKey<Slime>;
  static readonly SLIME_FLOAT: GoalKey<Slime>;
  static readonly SLIME_KEEP_ON_JUMPING: GoalKey<Slime>;
  static readonly SLIME_RANDOM_DIRECTION: GoalKey<Slime>;
  static readonly SPELLCASTER_CASTING_SPELL: GoalKey<Spellcaster>;
  static readonly SPIDER: GoalKey<Spider>;
  static readonly SPIDER_ATTACK: GoalKey<Spider>;
  static readonly SQUID_FLEE: GoalKey<Squid>;
  static readonly SQUID_RANDOM_MOVEMENT: GoalKey<Squid>;
  static readonly STRIDER_GO_TO_LAVA: GoalKey<Strider>;
  static readonly FOLLOW_OWNER: GoalKey<Tameable>;
  static readonly NON_TAME_RANDOM: GoalKey<Tameable>;
  static readonly OWNER_HURT: GoalKey<Tameable>;
  static readonly OWNER_HURT_BY: GoalKey<Tameable>;
  static readonly SIT_WHEN_ORDERED_TO: GoalKey<Tameable>;
  static readonly TAMABLE_ANIMAL_PANIC: GoalKey<Tameable>;
  static readonly TURTLE_BREED: GoalKey<Turtle>;
  static readonly TURTLE_GO_HOME: GoalKey<Turtle>;
  static readonly TURTLE_GO_TO_WATER: GoalKey<Turtle>;
  static readonly TURTLE_LAY_EGG: GoalKey<Turtle>;
  static readonly TURTLE_PANIC: GoalKey<Turtle>;
  static readonly TURTLE_RANDOM_STROLL: GoalKey<Turtle>;
  static readonly TURTLE_TRAVEL: GoalKey<Turtle>;
  static readonly VEX_CHARGE_ATTACK: GoalKey<Vex>;
  static readonly VEX_COPY_OWNER: GoalKey<Vex>;
  static readonly VEX_RANDOM_MOVE: GoalKey<Vex>;
  static readonly VINDICATOR_JOHNNY_ATTACK: GoalKey<Vindicator>;
  static readonly WANDERING_TRADER_WANDER_TO_POSITION: GoalKey<WanderingTrader>;
  static readonly WITHER_DO_NOTHING: GoalKey<Wither>;
  static readonly WOLF_AVOID_ENTITY: GoalKey<Wolf>;
  static readonly WOLF_BEG: GoalKey<Wolf>;
  static readonly ZOMBIE_ATTACK: GoalKey<Zombie>;
  static readonly ZOMBIE_ATTACK_TURTLE_EGG: GoalKey<Zombie>;
  static create<T>(key: string, type: Class<T>): GoalKey<T>;
}
/**
 * Represents an AI goal of an entity
*/
export class Goal<T> {
  /**
   * Checks if this goal should be activated
   *
   * @return if this goal should be activated
  */
  shouldActivate(): boolean;
  /**
   * Checks if this goal should stay active, defaults to {@link Goal#shouldActivate()}
   *
   * @return if this goal should stay active
  */
  shouldStayActive(): boolean;
  /**
   * Called when this goal gets activated
  */
  start(): void;
  /**
   * Called when this goal gets stopped
  */
  stop(): void;
  /**
   * Called each tick the goal is activated
  */
  tick(): void;
  /**
   * A unique key that identifies this type of goal. Plugins should use their own namespace, not the minecraft
   * namespace. Additionally, this key also specifies to what mobs this goal can be applied to
   *
   * @return the goal key
  */
  get key(): GoalKey<T>;
  /**
   * Returns a list of all applicable flags for this goal.
   * 
   * This method is only called on construction.
   *
   * @return the subtypes.
  */
  get types(): EnumSet<GoalType>;
}

}
declare module 'com.destroystokyo.paper.entity.Pathfinder' {
import { List } from 'java.util';
import { Location } from 'org.bukkit';
/**
 * Represents the result of a pathfinding calculation
*/
export class PathResult {
  /**
   * All currently calculated points to follow along the path to reach the destination location
   * 
   * Will return points the entity has already moved past, see {@link #getNextPointIndex()}
   *
   * @return List of points
  */
  get points(): Location[];
  /**
   * @return Returns the index of the current point along the points returned in {@link #getPoints()} the entity
   * is trying to reach. This value will be higher than the maximum index of {@link #getPoints()} if this path finding is done.
  */
  get nextPointIndex(): number;
  /**
   * @return The next location in the path points the entity is trying to reach, or null if there is no next point
  */
  get nextPoint(): Location | null;
  /**
   * @return The closest point the path can get to the target location
  */
  get finalPoint(): Location | null;
  /**
   * Checks whether the final point can be reached
   *
   * @return whether the final point can be reached
   * @see #getFinalPoint()
  */
  canReachFinalPoint(): boolean;
}

}
declare module 'com.destroystokyo.paper.profile' {
import { Set, Collection, UUID } from 'java.util';
import { CompletableFuture } from 'java.util.concurrent';
import { PlayerTextures, PlayerProfile as org_bukkit_profile_PlayerProfile } from 'org.bukkit.profile';
import { SkinSource, Builder } from 'net.kyori.adventure.text.object.PlayerHeadObjectContents';
/**
 * Represents a property on a {@link PlayerProfile}
*/
export class ProfileProperty {
  constructor(name: string, value: string);
  constructor(name: string, value: string, signature: string | null);
  /**
   * @return The property name, ie "textures"
  */
  get name(): string;
  /**
   * @return The property value, likely to be base64 encoded
  */
  get value(): string;
  /**
   * @return A signature from Mojang for signed properties
  */
  get signature(): string | null;
  /**
   * @return If this property has a signature or not
  */
  isSigned(): boolean;
  equals(o: any | null): boolean;
  hashCode(): number;
}
/**
 * Represents a players profile for the game, such as UUID, Name, and textures.
*/
export class PlayerProfile extends org_bukkit_profile_PlayerProfile {
  /**
   * @return The players name, if set
  */
  get name(): string | null;
  /**
   * Sets this profiles Name
   *
   * @param name The new Name
   * @return The previous Name
  */
  set name(name: string | null);
  /**
   * @return The players unique identifier, if set
  */
  get id(): UUID | null;
  /**
   * Sets this profiles UUID
   *
   * @param uuid The new UUID
   * @return The previous UUID
  */
  set id(id: UUID | null);
  /**
   * Gets the {@link PlayerTextures} of this profile.
   * This will build a snapshot of the current texture data once
   * requested inside PlayerTextures.
   *
   * @return the textures
  */
  get textures(): PlayerTextures;
  /**
   * Copies the given textures.
   *
   * @param textures the textures to copy, or `null` to clear the
   * textures
  */
  set textures(textures: PlayerTextures | null);
  /**
   * @return A Mutable set of this player's properties, such as textures.
   * Values specified here are subject to implementation details.
  */
  get properties(): Set<ProfileProperty>;
  /**
   * Check if the Profile has the specified property
   *
   * @param property Property name to check
   * @return If the property is set
  */
  hasProperty(property: string | null): boolean;
  /**
   * Sets a property. If the property already exists, the previous one will be replaced
   *
   * @param property Property to set.
   * @throws IllegalArgumentException if setting the property results in more than 16 properties
  */
  set property(property: ProfileProperty);
  /**
   * Sets multiple properties. If any of the set properties already exist, it will be replaced
   *
   * @param properties The properties to set
   * @throws IllegalArgumentException if the number of properties exceeds 16
  */
  set properties(properties: Collection<ProfileProperty>);
  /**
   * Removes a specific property from this profile
   *
   * @param property The property to remove
   * @return If a property was removed
  */
  removeProperty(property: string | null): boolean;
  /**
   * Removes a specific property from this profile
   *
   * @param property The property to remove
   * @return If a property was removed
  */
  removeProperty(property: ProfileProperty): boolean;
  /**
   * Removes all properties in the collection
   *
   * @param properties The properties to remove
   * @return If any property was removed
  */
  removeProperties(properties: Collection<ProfileProperty>): boolean;
  /**
   * Clears all properties on this profile
  */
  clearProperties(): void;
  /**
   * @return If the profile is now complete (has UUID and Name)
  */
  isComplete(): boolean;
  /**
   * Like {@link #complete(boolean)} but will try only from cache, and not make network calls
   * Does not account for textures.
   *
   * @return If the profile is now complete (has UUID and Name)
  */
  completeFromCache(): boolean;
  /**
   * Like {@link #complete(boolean)} but will try only from cache, and not make network calls
   * Does not account for textures.
   *
   * @param onlineMode Treat this as online mode or not
   * @return If the profile is now complete (has UUID and Name)
  */
  completeFromCache(onlineMode: boolean): boolean;
  /**
   * Like {@link #complete(boolean)} but will try only from cache, and not make network calls
   * Does not account for textures.
   *
   * @param lookupUUID If only name is supplied, should we do a UUID lookup
   * @param onlineMode Treat this as online mode or not
   * @return If the profile is now complete (has UUID and Name)
  */
  completeFromCache(lookupUUID: boolean, onlineMode: boolean): boolean;
  /**
   * If this profile is not complete, then make the API call to complete it.
   * This is a blocking operation and should be done asynchronously.
   * 
   * This will also complete textures. If you do not want to load textures, use {{@link #complete(boolean)}}
   *
   * @return If the profile is now complete (has UUID and Name) (if you get rate limited, this operation may fail)
  */
  complete(): boolean;
  /**
   * If this profile is not complete, then make the API call to complete it.
   * This is a blocking operation and should be done asynchronously.
   * 
   * Optionally will also fill textures.
   * 
   * Online mode will be automatically determined
   *
   * @param textures controls if we should fill the profile with texture properties
   * @return If the profile is now complete (has UUID and Name) (if you get rate limited, this operation may fail)
  */
  complete(textures: boolean): boolean;
  /**
   * If this profile is not complete, then make the API call to complete it.
   * This is a blocking operation and should be done asynchronously.
   * 
   * Optionally will also fill textures.
   *
   * @param textures controls if we should fill the profile with texture properties
   * @param onlineMode Treat this server as online mode or not
   * @return If the profile is now complete (has UUID and Name) (if you get rate limited, this operation may fail)
  */
  complete(textures: boolean, onlineMode: boolean): boolean;
  /**
   * Produces an updated player profile based on this profile.
   * 
   * This tries to produce a completed profile by filling in missing
   * properties (name, unique id, textures, etc.), and updates existing
   * properties (e.g. name, textures, etc.) to their official and up-to-date
   * values. This operation does not alter the current profile, but produces a
   * new updated {@link PlayerProfile}.
   * 
   * If no player exists for the unique id or name of this profile, this
   * operation yields a profile that is equal to the current profile, which
   * might not be complete.
   * 
   * This is an asynchronous operation: Updating the profile can result in an
   * outgoing connection in another thread in order to fetch the latest
   * profile properties. The returned {@link CompletableFuture} will be
   * completed once the updated profile is available. In order to not block
   * the server's main thread, you should not wait for the result of the
   * returned CompletableFuture on the server's main thread. Instead, if you
   * want to do something with the updated player profile on the server's main
   * thread once it is available, you could do something like this:
   *      * profile.update().thenAcceptAsync(updatedProfile -> {
   *     // Do something with the updated profile:
   *     // ...
   * }, runnable -> Bukkit.getScheduler().runTask(plugin, runnable));
   * 
  */
  update(): CompletableFuture<PlayerProfile>;
  /**
   * Whether this Profile has textures associated to it
   *
   * @return If it has a textures property
  */
  hasTextures(): boolean;
  /**
   * {@inheritDoc}
   *
   * @return the cloned player profile.
  */
  clone(): PlayerProfile;
  applySkinToPlayerHeadContents(builder: Builder): void;
}
export interface PlayerProfile extends org_bukkit_profile_PlayerProfile, SkinSource {}

}
declare module 'com.destroystokyo.paper.util.VersionFetcher' {
import { VersionFetcher } from 'com.destroystokyo.paper.util';
import { Component } from 'net.kyori.adventure.text';
/**
 * @hidden
*/
export class DummyVersionFetcher extends VersionFetcher {
  /**
   * Amount of time to cache results for in milliseconds
   * 
   * Negative values will never cache.
   *
   * @return cache time
  */
  get cacheTime(): number;
  /**
   * Gets the version message to cache and show to command senders.
   *
   * @return the message to show when requesting a version
   * @apiNote This method may involve a web request which will block the executing thread
  */
  get versionMessage(): Component;
}

}
declare module 'com.destroystokyo.paper.Title' {
import { BaseComponent } from 'net.md_5.bungee.api.chat';
import { Title } from 'com.destroystokyo.paper';
/**
 * A builder for creating titles
*/
export class Builder {
  /**
   * Sets the title to the given text.
   *
   * @param title the title text
   * @return this builder instance
   * @throws NullPointerException if the title is null
  */
  title(title: BaseComponent): Builder;
  /**
   * Sets the title to the given text.
   *
   * @param title the title text
   * @return this builder instance
   * @throws NullPointerException if the title is null
  */
  title(title: BaseComponent[]): Builder;
  /**
   * Sets the title to the given text.
   *
   * It is recommended to use the {@link BaseComponent} methods.
   *
   * @param title the title text
   * @return this builder instance
   * @throws NullPointerException if the title is null
  */
  title(title: string): Builder;
  /**
   * Sets the subtitle to the given text.
   *
   * @param subtitle the title text
   * @return this builder instance
  */
  subtitle(subtitle: BaseComponent | null): Builder;
  /**
   * Sets the subtitle to the given text.
   *
   * @param subtitle the title text
   * @return this builder instance
  */
  subtitle(subtitle: BaseComponent[] | null): Builder;
  /**
   * Sets the subtitle to the given text.
   *
   * It is recommended to use the {@link BaseComponent} methods.
   *
   * @param subtitle the title text
   * @return this builder instance
  */
  subtitle(subtitle: string | null): Builder;
  /**
   * Sets the number of ticks for the title to fade in
   *
   * @param fadeIn the number of ticks to fade in
   * @return this builder instance
   * @throws IllegalArgumentException if it is negative
  */
  fadeIn(fadeIn: number): Builder;
  /**
   * Sets the number of ticks for the title to stay.
   *
   * @param stay the number of ticks to stay
   * @return this builder instance
   * @throws IllegalArgumentException if it is negative
  */
  stay(stay: number): Builder;
  /**
   * Sets the number of ticks for the title to fade out.
   *
   * @param fadeOut the number of ticks to fade out
   * @return this builder instance
   * @throws IllegalArgumentException if it is negative
  */
  fadeOut(fadeOut: number): Builder;
  /**
   * Create a title based on the values in the builder.
   *
   * @return a title from the values in this builder
   * @throws IllegalStateException if title isn't specified
  */
  build(): Title;
}

}
declare module 'com.destroystokyo.paper.event.block.AnvilDamagedEvent' {
import { Enum } from 'java.lang';
import { BlockData } from 'org.bukkit.block.data';
import { Material } from 'org.bukkit';
/**
 * Represents the amount of damage on an anvil block
*/
export class DamageState extends Enum<DamageState> {
  static readonly FULL: DamageState;
  static readonly CHIPPED: DamageState;
  static readonly DAMAGED: DamageState;
  static readonly BROKEN: DamageState;
  static valueOf(name: string): DamageState;
  static values(): DamageState[];
  /**
   * Get block material of this state
   *
   * @return Material
  */
  get material(): Material;
  /**
   * Get damaged state by block data
   *
   * @param blockData Block data
   * @return DamageState
   * @throws IllegalArgumentException If non anvil block data is given
  */
  static getState(blockData: BlockData | null): DamageState;
  /**
   * Get damaged state by block material
   *
   * @param material Block material
   * @return DamageState
   * @throws IllegalArgumentException If non anvil material is given
  */
  static getState(material: Material | null): DamageState;
}

}
declare module 'com.destroystokyo.paper.event.entity.EndermanEscapeEvent' {
import { Enum } from 'java.lang';
export class Reason extends Enum<Reason> {
  /**
   * The enderman has stopped attacking and ran away
  */
  static readonly RUNAWAY: Reason;
  /**
   * The enderman has teleported away due to indirect damage (ranged)
  */
  static readonly INDIRECT: Reason;
  /**
   * The enderman has teleported away due to a critical hit
  */
  static readonly CRITICAL_HIT: Reason;
  /**
   * The enderman has teleported away due to the player staring at it during combat
  */
  static readonly STARE: Reason;
  /**
   * Specific case for {@link #CRITICAL_HIT} where the enderman is taking damage by drowning (ex: rain)
  */
  static readonly DROWN: Reason;
  static valueOf(name: string): Reason;
  static values(): Reason[];
}

}
declare module 'com.destroystokyo.paper.brigadier' {
import { CommandSender } from 'org.bukkit.command';
import { SuggestionProvider } from 'com.mojang.brigadier.suggestion';
import { Command } from 'com.mojang.brigadier';
import { Predicate } from 'java.util.function';
import { World, Location } from 'org.bukkit';
import { Entity } from 'org.bukkit.entity';
/**
 * @deprecated For removal, see {@link io.papermc.paper.command.brigadier.Commands} on how to use the new Brigadier API.
*/
export class BukkitBrigadierCommandSource {
  get bukkitEntity(): Entity | null;
  get bukkitWorld(): World | null;
  get bukkitLocation(): Location | null;
  get bukkitSender(): CommandSender;
}
/**
 * Brigadier {@link Command}, {@link SuggestionProvider}, and permission checker for Bukkit {@link Command}s.
 *
 * @param  command source type
 * @deprecated For removal, see {@link io.papermc.paper.command.brigadier.Commands} on how to use the new Brigadier API.
*/
export class BukkitBrigadierCommand<S> extends Command<S> {

}
export interface BukkitBrigadierCommand<S> extends Command<S>, Predicate<S>, SuggestionProvider<S> {}

}
declare module 'com.destroystokyo.paper.event.server.AsyncTabCompleteEvent' {
import { Component } from 'net.kyori.adventure.text';
import { Stream } from 'java.util.stream';
import { ExaminableProperty, Examinable } from 'net.kyori.examination';
/**
 * A rich tab completion, consisting of a string suggestion, and a nullable {@link Component} tooltip.
 * 
 * Warning: In a future update, this class will no longer implement {@link Examinable}.
*/
export class Completion extends Examinable {
  /**
   * Get the suggestion string for this {@link Completion}.
   *
   * @return suggestion string
  */
  suggestion(): string;
  /**
   * Get the suggestion tooltip for this {@link Completion}.
   *
   * @return tooltip component
  */
  tooltip(): Component | null;
  examinableProperties(): Stream<ExaminableProperty>;
  /**
   * Create a new {@link Completion} from a suggestion string.
   *
   * @param suggestion suggestion string
   * @return new completion instance
  */
  static completion(suggestion: string): Completion;
  /**
   * Create a new {@link Completion} from a suggestion string and a tooltip {@link Component}.
   * 
   * If the provided component is `null`, the suggestion will not have a tooltip.
   *
   * @param suggestion suggestion string
   * @param tooltip    tooltip component, or `null`
   * @return new completion instance
  */
  static completion(suggestion: string, tooltip: Component | null): Completion;
}

}
declare module 'com.destroystokyo.paper.ClientOption' {
import { Enum } from 'java.lang';
import { Index } from 'net.kyori.adventure.util';
export class ChatVisibility extends Enum<ChatVisibility> {
  static readonly FULL: ChatVisibility;
  static readonly SYSTEM: ChatVisibility;
  static readonly HIDDEN: ChatVisibility;
  /**
   * @deprecated no longer used anymore since 1.15.2, the value fallback
   * to the default value of the setting when unknown on the server.
   * In this case {@link #FULL} will be returned.
  */
  static readonly UNKNOWN: ChatVisibility;
  static valueOf(name: string): ChatVisibility;
  static values(): ChatVisibility[];
  static readonly NAMES: Index<string,ChatVisibility>;
  translationKey(): string;
}
export class ParticleVisibility extends Enum<ParticleVisibility> {
  static readonly ALL: ParticleVisibility;
  static readonly DECREASED: ParticleVisibility;
  static readonly MINIMAL: ParticleVisibility;
  static valueOf(name: string): ParticleVisibility;
  static values(): ParticleVisibility[];
  static readonly NAMES: Index<string,ParticleVisibility>;
  translationKey(): string;
}

}
declare module 'com.destroystokyo.paper.event.player' {
import { PlayerTeleportEvent, PlayerEvent } from 'org.bukkit.event.player';
import { Component } from 'net.kyori.adventure.text';
import { UUID, Map } from 'java.util';
import { SlotType } from 'com.destroystokyo.paper.event.player.PlayerArmorChangeEvent';
import { AbstractRespawnEvent } from 'io.papermc.paper.event.player';
import { AdvancementProgress, Advancement } from 'org.bukkit.advancement';
import { RespawnReason } from 'org.bukkit.event.player.PlayerRespawnEvent';
import { Cause } from 'com.destroystokyo.paper.event.player.PlayerSetSpawnEvent';
import { EquipmentSlot, MainHand, ItemStack } from 'org.bukkit.inventory';
import { NamespacedKey, Location } from 'org.bukkit';
import { ParticleVisibility, ChatVisibility } from 'com.destroystokyo.paper.ClientOption';
import { Exception } from 'java.lang';
import { EndGateway } from 'org.bukkit.block';
import { InetAddress } from 'java.net';
import { SkinParts, ClientOption } from 'com.destroystokyo.paper';
import { Vector } from 'org.bukkit.util';
import { HandlerList, Cancellable, Event } from 'org.bukkit.event';
import { Entity, Player, Firework, ExperienceOrb, Projectile } from 'org.bukkit.entity';
/**
 * Called when the player changes their client settings
*/
export class PlayerClientOptionsChangeEvent extends PlayerEvent {
  constructor(player: Player, options: Map<ClientOption<any>,any>);
  get locale(): string;
  hasLocaleChanged(): boolean;
  get viewDistance(): number;
  hasViewDistanceChanged(): boolean;
  get chatVisibility(): ChatVisibility;
  hasChatVisibilityChanged(): boolean;
  hasChatColorsEnabled(): boolean;
  hasChatColorsEnabledChanged(): boolean;
  get skinParts(): SkinParts;
  hasSkinPartsChanged(): boolean;
  get mainHand(): MainHand;
  hasMainHandChanged(): boolean;
  hasTextFilteringEnabled(): boolean;
  hasTextFilteringChanged(): boolean;
  allowsServerListings(): boolean;
  hasAllowServerListingsChanged(): boolean;
  get particleVisibility(): ParticleVisibility;
  hasParticleVisibilityChanged(): boolean;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * @deprecated Not used
*/
export class IllegalPacketEvent extends PlayerEvent {
  constructor(player: Player, type: string | null, kickMessage: string | null, e: Exception);
  isShouldKick(): boolean;
  setShouldKick(shouldKick: boolean): void;
  get kickMessage(): string | null;
  set kickMessage(kickMessage: string | null);
  get type(): string | null;
  get exceptionMessage(): string | null;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Fired when a player boosts elytra flight with a firework
*/
export class PlayerElytraBoostEvent extends PlayerEvent {
  constructor(player: Player, itemStack: ItemStack, firework: Firework, hand: EquipmentSlot);
  /**
   * Get the firework itemstack used
   *
   * @return ItemStack of firework
  */
  get itemStack(): ItemStack;
  /**
   * Get the firework entity that was spawned
   *
   * @return Firework entity
  */
  get firework(): Firework;
  /**
   * Get whether to consume the firework or not
   *
   * @return `true` to consume
  */
  shouldConsume(): boolean;
  /**
   * Set whether to consume the firework or not
   *
   * @param consume `true` to consume
  */
  setShouldConsume(consume: boolean): void;
  /**
   * Gets the hand holding the firework used for boosting this player.
   *
   * @return interaction hand
  */
  get hand(): EquipmentSlot;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerElytraBoostEvent extends PlayerEvent, Cancellable {}
/**
 * Called when a player clicks a recipe in the recipe book
*/
export class PlayerRecipeBookClickEvent extends PlayerEvent {
  constructor(player: Player, recipe: NamespacedKey, makeAll: boolean);
  /**
   * Gets the namespaced key of the recipe that was clicked by the player
   *
   * @return The namespaced key of the recipe
  */
  get recipe(): NamespacedKey;
  /**
   * Changes what recipe is requested. This sets the requested recipe to the recipe with the given key
   *
   * @param recipe The key of the recipe that should be requested
  */
  set recipe(recipe: NamespacedKey);
  /**
   * Gets a boolean which indicates whether the player requested to make the maximum amount of results. This is
   * `true` if shift is pressed while the recipe is clicked in the recipe book
   *
   * @return `true` if shift is pressed while the recipe is clicked
  */
  isMakeAll(): boolean;
  /**
   * Sets whether the maximum amount of results should be made. If this is `true`, the request is handled as if
   * the player had pressed shift while clicking on the recipe
   *
   * @param makeAll `true` if the request should attempt to make the maximum amount of results
  */
  setMakeAll(makeAll: boolean): void;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerRecipeBookClickEvent extends PlayerEvent, Cancellable {}
/**
 * Fired when a player is attempting to pick up an experience orb
*/
export class PlayerPickupExperienceEvent extends PlayerEvent {
  constructor(player: Player, experienceOrb: ExperienceOrb);
  /**
   * @return Returns the Orb that the player is picking up
  */
  get experienceOrb(): ExperienceOrb;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * {@inheritDoc}
   * 
   * If `true`, cancels picking up the experience orb, leaving it in the world
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerPickupExperienceEvent extends PlayerEvent, Cancellable {}
/**
 * Called when the player themselves change their armor items
 * 
 * Not currently called for environmental factors though it MAY BE IN THE FUTURE
 * @apiNote Use {@link io.papermc.paper.event.entity.EntityEquipmentChangedEvent} for all entity equipment changes
*/
export class PlayerArmorChangeEvent extends PlayerEvent {
  constructor(player: Player, slotType: SlotType, oldItem: ItemStack, newItem: ItemStack);
  /**
   * Gets the type of slot being altered.
   *
   * @return type of slot being altered
   * @deprecated {@link SlotType} does not accurately represent what item types are valid in each slot. Use {@link #getSlot()} instead.
  */
  get slotType(): SlotType;
  /**
   * Gets the slot being altered.
   *
   * @return slot being altered
  */
  get slot(): EquipmentSlot;
  /**
   * Gets the existing item that's being replaced
   *
   * @return old item
  */
  get oldItem(): ItemStack;
  /**
   * Gets the new item that's replacing the old
   *
   * @return new item
  */
  get newItem(): ItemStack;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Fired when a teleport is triggered for an End Gateway
*/
export class PlayerTeleportEndGatewayEvent extends PlayerTeleportEvent {
  constructor(player: Player, from: Location, to: Location, gateway: EndGateway);
  /**
   * The gateway triggering the teleport
   *
   * @return EndGateway used
  */
  get gateway(): EndGateway;
}
/**
 * 
 * This event is invoked when a player has disconnected. It is guaranteed that,
 * if the server is in online-mode, that the provided uuid and username have been
 * validated.
 * 
 * The event is invoked for players who have not yet logged into the world, whereas
 * {@link PlayerQuitEvent} is only invoked on players who have logged into the world.
 * 
 * The event is invoked for players who have already logged into the world,
 * although whether or not the player exists in the world at the time of
 * firing is undefined. (That is, whether the plugin can retrieve a Player object
 * using the event parameters is undefined). However, it is guaranteed that this
 * event is invoked AFTER {@link PlayerQuitEvent}, if the player has already logged into the world.
 * 
 * This event is guaranteed to never fire unless {@link AsyncPlayerPreLoginEvent} has
 * been fired beforehand, and this event may not be called in parallel with
 * {@link AsyncPlayerPreLoginEvent} for the same connection.
 * 
 * Cancelling the {@link AsyncPlayerPreLoginEvent} guarantees the corresponding
 * `PlayerConnectionCloseEvent` is never called.
 * 
 * The event may be invoked asynchronously or synchronously. Plugins should check
 * {@link Event#isAsynchronous()} and handle accordingly.
*/
export class PlayerConnectionCloseEvent extends Event {
  constructor(playerUniqueId: UUID, playerName: string, ipAddress: InetAddress, async: boolean);
  /**
   * Returns the `UUID` of the player disconnecting.
  */
  get playerUniqueId(): UUID;
  /**
   * Returns the name of the player disconnecting.
  */
  get playerName(): string;
  /**
   * Returns the player's IP address.
  */
  get ipAddress(): InetAddress;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Fired after a player has respawned
*/
export class PlayerPostRespawnEvent extends AbstractRespawnEvent {
  constructor(respawnPlayer: Player, respawnLocation: Location, isBedSpawn: boolean, isAnchorSpawn: boolean, missingRespawnBlock: boolean, respawnReason: RespawnReason);
  /**
   * Returns the location of the respawned player.
   *
   * @return location of the respawned player
   * @see #getRespawnLocation()
  */
  get respawnedLocation(): Location;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * Triggered when a player starts spectating an entity in spectator mode.
*/
export class PlayerStartSpectatingEntityEvent extends PlayerEvent {
  constructor(player: Player, currentSpectatorTarget: Entity, newSpectatorTarget: Entity);
  /**
   * Gets the entity that the player is currently spectating or themselves if they weren't spectating anything
   *
   * @return The entity the player is currently spectating (before they start spectating the new target).
  */
  get currentSpectatorTarget(): Entity;
  /**
   * Gets the new entity that the player will now be spectating
   *
   * @return The entity the player is now going to be spectating.
  */
  get newSpectatorTarget(): Entity;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerStartSpectatingEntityEvent extends PlayerEvent, Cancellable {}
/**
 * Called when a player is firing a bow and the server is choosing an arrow to use.
*/
export class PlayerReadyArrowEvent extends PlayerEvent {
  constructor(player: Player, bow: ItemStack, arrow: ItemStack);
  /**
   * @return the player is using to fire the arrow
  */
  get bow(): ItemStack;
  /**
   * @return the arrow that is attempting to be used
  */
  get arrow(): ItemStack;
  /**
   * {@inheritDoc}
   * 
   * Whether use of this arrow is cancelled. On cancel, the server will try the next arrow available and fire another event.
  */
  isCancelled(): boolean;
  /**
   * Cancel use of this arrow. On cancel, the server will try the next arrow available and fire another event.
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerReadyArrowEvent extends PlayerEvent, Cancellable {}
/**
 * Called when processing a player's attack on an entity when the player's attack strength cooldown is reset
*/
export class PlayerAttackEntityCooldownResetEvent extends PlayerEvent {
  constructor(player: Player, attackedEntity: Entity, cooledAttackStrength: number);
  /**
   * Get the value of the players cooldown attack strength when they initiated the attack
   *
   * @return returns the original player cooldown value
  */
  get cooledAttackStrength(): number;
  /**
   * Returns the entity attacked by the player
   *
   * @return the entity attacked by the player
  */
  get attackedEntity(): Entity;
  /**
   * {@inheritDoc}
   * 
   * If an attack cooldown event is cancelled, the players attack strength will remain at the same value instead of being reset.
  */
  isCancelled(): boolean;
  /**
   * {@inheritDoc}
   * 
   * Cancelling this event will prevent the target player from having their cooldown reset from attacking this entity
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerAttackEntityCooldownResetEvent extends PlayerEvent, Cancellable {}
/**
 * Called when a player's spawn is set, either by themselves or otherwise.
 * 
 * Cancelling this event will prevent the spawn from being set.
*/
export class PlayerSetSpawnEvent extends PlayerEvent {
  constructor(player: Player, cause: Cause, location: Location | null, forced: boolean, notifyPlayer: boolean, notification: Component | null);
  /**
   * Gets the cause of this event.
   *
   * @return the cause
  */
  get cause(): Cause;
  /**
   * Gets the location that the spawn is set to. The yaw
   * of this location is the spawn angle. Mutating this location
   * will change the resulting spawn point of the player. Use
   * {@link Location#clone()} to get a copy of this location.
   *
   * @return the spawn location, or `null` if removing the location
  */
  get location(): Location | null;
  /**
   * Sets the location to be set as the spawn location. The yaw
   * of this location is the spawn angle.
   *
   * @param location the spawn location, or `null` to remove the spawn location
  */
  set location(location: Location | null);
  /**
   * Gets if this is a force spawn location
   *
   * @return `true` if forced
  */
  isForced(): boolean;
  /**
   * Sets if this is a forced spawn location
   *
   * @param forced `true` to force
  */
  setForced(forced: boolean): void;
  /**
   * Gets if this action will notify the player their spawn
   * has been set.
   *
   * @return `true` to notify
  */
  willNotifyPlayer(): boolean;
  /**
   * Sets if this action will notify the player that their spawn
   * has been set.
   *
   * @param notifyPlayer `true` to notify
  */
  setNotifyPlayer(notifyPlayer: boolean): void;
  /**
   * Gets the notification message that will be sent to the player
   * if {@link #willNotifyPlayer()} returns `true`.
   *
   * @return `null` if no notification
  */
  get notification(): Component | null;
  /**
   * Sets the notification message that will be sent to the player.
   *
   * @param notification `null` to send no message
  */
  set notification(notification: Component | null);
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerSetSpawnEvent extends PlayerEvent, Cancellable {}
/**
 * Represents an event that is called when a player clicks an unknown entity.
 * Useful for plugins dealing with virtual entities (entities that aren't actually spawned on the server).
 * 
 * This event may be called multiple times per interaction with different interaction hands
 * and with or without the clicked position.
*/
export class PlayerUseUnknownEntityEvent extends PlayerEvent {
  constructor(player: Player, entityId: number, attack: boolean, hand: EquipmentSlot, clickedPosition: Vector | null);
  /**
   * Returns the entity id of the unknown entity that was interacted with.
   *
   * @return the entity id of the entity that was interacted with
  */
  get entityId(): number;
  /**
   * Returns whether the interaction was an attack.
   *
   * @return `true` if the player is attacking the entity, `false` if the player is interacting with the entity
  */
  isAttack(): boolean;
  /**
   * Returns the hand used to perform this interaction.
   *
   * @return the hand used to interact
  */
  get hand(): EquipmentSlot;
  /**
   * Returns the position relative to the entity that was clicked, or `null` if not available.
   * See {@link PlayerInteractAtEntityEvent} for more details.
   *
   * @return the position relative to the entity that was clicked, or `null` if not available
   * @see PlayerInteractAtEntityEvent
  */
  get clickedRelativePosition(): Vector | null;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
/**
 * This event is fired during a player handshake.
 * 
 * If there are no listeners listening to this event, the logic default
 * to your server platform will be run.
 *
 * WARNING: TAMPERING WITH THIS EVENT CAN BE DANGEROUS
*/
export class PlayerHandshakeEvent extends Event {
  constructor(originalHandshake: string, cancelled: boolean);
  constructor(originalHandshake: string, originalSocketAddressHostname: string, cancelled: boolean);
  /**
   * Gets the original handshake string.
   *
   * @return the original handshake string
  */
  get originalHandshake(): string;
  /**
   * Gets the original socket address hostname.
   *
   * This does not include the port.
   * In cases where this event is manually fired and the plugin wasn't updated yet, the default is `"127.0.0.1"`.
   *
   * @return the original socket address hostname
  */
  get originalSocketAddressHostname(): string;
  /**
   * Gets the server hostname string.
   *
   * This should not include the port.
   *
   * @return the server hostname string
  */
  get serverHostname(): string | null;
  /**
   * Sets the server hostname string.
   *
   * This should not include the port.
   *
   * @param serverHostname the server hostname string
  */
  set serverHostname(serverHostname: string);
  /**
   * Gets the socket address hostname string.
   *
   * This should not include the port.
   *
   * @return the socket address hostname string
  */
  get socketAddressHostname(): string | null;
  /**
   * Sets the socket address hostname string.
   *
   * This should not include the port.
   *
   * @param socketAddressHostname the socket address hostname string
  */
  set socketAddressHostname(socketAddressHostname: string);
  /**
   * Gets the unique id.
   *
   * @return the unique id
  */
  get uniqueId(): UUID | null;
  /**
   * Sets the unique id.
   *
   * @param uniqueId the unique id
  */
  set uniqueId(uniqueId: UUID);
  /**
   * Gets the profile properties.
   *
   * This should be a valid JSON string.
   *
   * @return the profile properties, as JSON
  */
  get propertiesJson(): string | null;
  /**
   * Determines if authentication failed.
   * 
   * When `true`, the client connecting will be disconnected
   * with the {@link #getFailMessage() fail message}.
   *
   * @return `true` if authentication failed, `false` otherwise
  */
  isFailed(): boolean;
  /**
   * Sets if authentication failed and the client should be disconnected.
   * 
   * When `true`, the client connecting will be disconnected
   * with the {@link #getFailMessage() fail message}.
   *
   * @param failed `true` if authentication failed, `false` otherwise
  */
  setFailed(failed: boolean): void;
  /**
   * Sets the profile properties.
   *
   * This should be a valid JSON string.
   *
   * @param propertiesJson the profile properties, as JSON
  */
  set propertiesJson(propertiesJson: string);
  /**
   * Gets the message to display to the client when authentication fails.
   *
   * @return the message to display to the client
  */
  failMessage(): Component;
  /**
   * Sets the message to display to the client when authentication fails.
   *
   * @param failMessage the message to display to the client
  */
  failMessage(failMessage: Component): void;
  /**
   * Sets the message to display to the client when authentication fails.
   *
   * @param failMessage the message to display to the client
   * @deprecated use {@link #failMessage(Component)}
  */
  setFailMessage(failMessage: string): void;
  /**
   * {@inheritDoc}
   * 
   * When this event is cancelled, custom handshake logic will not
   * be processed.
  */
  isCancelled(): boolean;
  /**
   * {@inheritDoc}
   * 
   * When this event is cancelled, custom handshake logic will not
   * be processed.
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerHandshakeEvent extends Event, Cancellable {}
/**
 * Called when the server detects the player is jumping.
 * 
 * Added to avoid the overhead and special case logic that many plugins use
 * when checking for jumps via {@link PlayerMoveEvent}, this event is fired whenever
 * the server detects that the player is jumping.
*/
export class PlayerJumpEvent extends PlayerEvent {
  constructor(player: Player, from: Location, to: Location);
  /**
   * {@inheritDoc}
   * 
   * If this event is cancelled, the player will be moved or
   * teleported back to the Location as defined by {@link #getFrom()}. This will not
   * fire an event
  */
  isCancelled(): boolean;
  /**
   * {@inheritDoc}
   * 
   * If this event is cancelled, the player will be moved or
   * teleported back to the Location as defined by {@link #getFrom()}. This will not
   * fire an event
  */
  setCancelled(cancel: boolean): void;
  /**
   * Gets the location this player jumped from
   *
   * @return Location the player jumped from
  */
  get from(): Location;
  /**
   * Sets the location to mark as where the player jumped from
   *
   * @param from New location to mark as the players previous location
  */
  set from(from: Location);
  /**
   * Gets the location this player jumped to
   * 
   * This information is based on what the client sends, it typically
   * has little relation to the arc of the jump at any given point.
   *
   * @return Location the player jumped to
  */
  get to(): Location;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerJumpEvent extends PlayerEvent, Cancellable {}
/**
 * Triggered when a player stops spectating an entity in spectator mode.
*/
export class PlayerStopSpectatingEntityEvent extends PlayerEvent {
  constructor(player: Player, spectatorTarget: Entity);
  /**
   * Gets the entity that the player is spectating
   *
   * @return The entity the player is currently spectating (before they will stop).
  */
  get spectatorTarget(): Entity;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerStopSpectatingEntityEvent extends PlayerEvent, Cancellable {}
/**
 * Called after a player is granted a criteria in an advancement.
 * If cancelled the criteria will be revoked.
*/
export class PlayerAdvancementCriterionGrantEvent extends PlayerEvent {
  constructor(player: Player, advancement: Advancement, criterion: string);
  /**
   * Get the advancement which has been affected.
   *
   * @return affected advancement
  */
  get advancement(): Advancement;
  /**
   * Get the criterion which has been granted.
   *
   * @return granted criterion
  */
  get criterion(): string;
  /**
   * Gets the current AdvancementProgress.
   *
   * @return advancement progress
  */
  get advancementProgress(): AdvancementProgress;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerAdvancementCriterionGrantEvent extends PlayerEvent, Cancellable {}
/**
 * Called when a player shoots a projectile.
 * 
 * Notably this event is not called for arrows as the player does not launch them, rather shoots them with the help
 * of a bow or crossbow. A plugin may listen to {@link EntityShootBowEvent}
 * for these actions instead.
*/
export class PlayerLaunchProjectileEvent extends PlayerEvent {
  constructor(shooter: Player, itemStack: ItemStack, projectile: Projectile);
  /**
   * Gets the projectile which will be launched by this event
   *
   * @return the launched projectile
  */
  get projectile(): Projectile;
  /**
   * Get the ItemStack used to fire the projectile
   *
   * @return The ItemStack used
  */
  get itemStack(): ItemStack;
  /**
   * Get whether to consume the ItemStack or not
   *
   * @return `true` to consume
  */
  shouldConsume(): boolean;
  /**
   * Set whether to consume the ItemStack or not
   *
   * @param consumeItem `true` to consume
  */
  setShouldConsume(consumeItem: boolean): void;
  /**
   * Gets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins
   *
   * @return `true` if this event is cancelled
  */
  isCancelled(): boolean;
  /**
   * Sets the cancellation state of this event. A cancelled event will not
   * be executed in the server, but will still pass to other plugins.
   *
   * @param cancel `true` if you wish to cancel this event
  */
  setCancelled(cancel: boolean): void;
  get handlers(): HandlerList;
  static get handlerList(): HandlerList;
}
export interface PlayerLaunchProjectileEvent extends PlayerEvent, Cancellable {}

}
declare module 'com.destroystokyo.paper.event.player.PlayerArmorChangeEvent' {
import { Set } from 'java.util';
import { Enum } from 'java.lang';
import { Material } from 'org.bukkit';
/**
 * @deprecated {@link SlotType} does not accurately represent what item types are valid in each slot.
*/
export class SlotType extends Enum<SlotType> {
  static readonly HEAD: SlotType;
  static readonly CHEST: SlotType;
  static readonly LEGS: SlotType;
  static readonly FEET: SlotType;
  static valueOf(name: string): SlotType;
  static values(): SlotType[];
  /**
   * Gets an immutable set of all allowed material types that can be placed in an
   * armor slot.
   *
   * @return immutable set of material types
  */
  get types(): Set<Material>;
  /**
   * Gets the type of slot via the specified material
   *
   * @param material material to get slot by
   * @return slot type the material will go in, or `null` if it won't
  */
  static getByMaterial(material: Material): SlotType | null;
  /**
   * Gets whether this material can be equipped to a slot
   *
   * @param material material to check
   * @return whether this material can be equipped
  */
  static isEquipable(material: Material): boolean;
}

}
declare module 'com.destroystokyo.paper.network' {
import { InetSocketAddress } from 'java.net';
/**
 * Represents a client connected to the server.
*/
export class NetworkClient {
  /**
   * Returns the socket address of the client.
   *
   * @return The client's socket address
  */
  get address(): InetSocketAddress;
  /**
   * Returns the protocol version of the client.
   *
   * @return The client's protocol version, or `-1` if unknown
   * @see List of protocol
   *     version numbers
  */
  get protocolVersion(): number;
  /**
   * Returns the virtual host the client is connected to.
   *
   * The virtual host refers to the hostname/port the client used to
   * connect to the server.
   *
   * @return The client's virtual host, or `null` if unknown
  */
  get virtualHost(): InetSocketAddress | null;
}
/**
 * Represents a client requesting the current status from the server (e.g. from
 * the server list).
 *
 * @see PaperServerListPingEvent
*/
export class StatusClient extends NetworkClient {
  /**
   * Returns whether the client is using an older version that doesn't
   * support all the features in {@link PaperServerListPingEvent}.
   *
   * For Vanilla, this returns `true` for all clients older than 1.7.
   *
   * @return `true` if the client is using legacy ping
  */
  isLegacy(): boolean;
}

}
declare module 'com.destroystokyo.paper.block' {
import { BlockFace, Block } from 'org.bukkit.block';
import { Sound } from 'org.bukkit';
/**
 * Represents the sounds that a {@link Block} makes in certain situations
 * 
 * The sound group includes break, step, place, hit, and fall sounds.
 * @deprecated use {@link org.bukkit.SoundGroup}
*/
export class BlockSoundGroup {
  /**
   * Gets the sound that plays when breaking this block
   *
   * @return The break sound
   * @deprecated use {@link org.bukkit.SoundGroup#getBreakSound()}
  */
  get breakSound(): Sound;
  /**
   * Gets the sound that plays when stepping on this block
   *
   * @return The step sound
   * @deprecated use {@link org.bukkit.SoundGroup#getStepSound()}
  */
  get stepSound(): Sound;
  /**
   * Gets the sound that plays when placing this block
   *
   * @return The place sound
   * @deprecated use {@link org.bukkit.SoundGroup#getPlaceSound()}
  */
  get placeSound(): Sound;
  /**
   * Gets the sound that plays when hitting this block
   *
   * @return The hit sound
   * @deprecated use {@link org.bukkit.SoundGroup#getHitSound()}
  */
  get hitSound(): Sound;
  /**
   * Gets the sound that plays when this block falls
   *
   * @return The fall sound
   * @deprecated use {@link org.bukkit.SoundGroup#getFallSound()}
  */
  get fallSound(): Sound;
}
/**
 * Represents information about a targeted block
 * @deprecated use {@link org.bukkit.util.RayTraceResult}
*/
export class TargetBlockInfo {
  constructor(block: Block, blockFace: BlockFace);
  /**
   * Get the block that is targeted
   *
   * @return Targeted block
  */
  get block(): Block;
  /**
   * Get the targeted BlockFace
   *
   * @return Targeted blockface
  */
  get blockFace(): BlockFace;
  /**
   * Get the relative Block to the targeted block on the side it is targeted at
   *
   * @return Block relative to targeted block
  */
  get relativeBlock(): Block;
}

}
declare module 'com.destroystokyo.paper.entity.villager' {
import { Map } from 'java.util';
import { Enum } from 'java.lang';
/**
 * A type of reputation gained with a {@link org.bukkit.entity.Villager Villager}.
 * 
 * All types but {@link #MAJOR_POSITIVE} are shared to other villagers.
*/
export class ReputationType extends Enum<ReputationType> {
  /**
   * A gossip with a majorly negative effect. This is only gained through killing a nearby
   * villager.
  */
  static readonly MAJOR_NEGATIVE: ReputationType;
  /**
   * A gossip with a minor negative effect. This is only gained through damaging a villager.
  */
  static readonly MINOR_NEGATIVE: ReputationType;
  /**
   * A gossip with a minor positive effect. This is only gained through curing a zombie
   * villager.
  */
  static readonly MINOR_POSITIVE: ReputationType;
  /**
   * A gossip with a major positive effect. This is only gained through curing a zombie
   * villager.
  */
  static readonly MAJOR_POSITIVE: ReputationType;
  /**
   * A gossip with a minor positive effect. This is only gained through trading with a villager.
  */
  static readonly TRADING: ReputationType;
  static valueOf(name: string): ReputationType;
  static values(): ReputationType[];
}
/**
 * A reputation score for a player on a villager.
*/
export class Reputation {
  constructor();
  constructor(reputation: Map<ReputationType,number>);
  /**
   * Gets the reputation value for a specific {@link ReputationType}.
   *
   * @param type The {@link ReputationType type} of reputation to get.
   * @return The value of the {@link ReputationType type}.
  */
  getReputation(type: ReputationType): number;
  /**
   * Sets the reputation value for a specific {@link ReputationType}.
   *
   * @param type The {@link ReputationType type} of reputation to set.
   * @param value The value of the {@link ReputationType type}.
  */
  setReputation(type: ReputationType, value: number): void;
  /**
   * Gets if a reputation value is currently set for a specific {@link ReputationType}.
   *
   * @param type The {@link ReputationType type} to check
   * @return If there is a value for this {@link ReputationType type} set.
  */
  hasReputationSet(type: ReputationType): boolean;
}

}
declare module 'com.destroystokyo.paper.event.player.PlayerSetSpawnEvent' {
import { Enum } from 'java.lang';
export class Cause extends Enum<Cause> {
  /**
   * When a player interacts successfully with a bed.
  */
  static readonly BED: Cause;
  /**
   * When a player interacts successfully with a respawn anchor.
  */
  static readonly RESPAWN_ANCHOR: Cause;
  /**
   * When a player respawns.
  */
  static readonly PLAYER_RESPAWN: Cause;
  /**
   * When the `/spawnpoint` command is used on a player.
  */
  static readonly COMMAND: Cause;
  /**
   * When a plugin uses {@link Player#setRespawnLocation(Location)} or
   * {@link Player#setRespawnLocation(Location, boolean)}.
  */
  static readonly PLUGIN: Cause;
  /**
   * Fallback cause.
  */
  static readonly UNKNOWN: Cause;
  static valueOf(name: string): Cause;
  static values(): Cause[];
}

}
