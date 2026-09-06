# cannon-es

This is a maintained fork of [cannon.js](https://github.com/schteppe/cannon.js), originally created by Stefan Hedman [@schteppe](https://github.com/schteppe).

It's a type-safe flatbundle (esm and cjs) which allows for **tree shaking** and usage in modern environments.

These minor changes and improvements were also made:

- These PRs from the original repo were merged: [schteppe/cannon.js#433](https://github.com/schteppe/cannon.js/pull/433), [schteppe/cannon.js#430](https://github.com/schteppe/cannon.js/pull/430), [schteppe/cannon.js#418](https://github.com/schteppe/cannon.js/pull/418), [schteppe/cannon.js#360](https://github.com/schteppe/cannon.js/pull/360), [schteppe/cannon.js#265](https://github.com/schteppe/cannon.js/pull/265), [schteppe/cannon.js#392](https://github.com/schteppe/cannon.js/pull/392), [schteppe/cannon.js#424](https://github.com/schteppe/cannon.js/pull/424)
- The `ConvexPolyhedron` constructor now accepts an object instead of a list of arguments. [#6](https://github.com/pmndrs/cannon-es/pull/6)
- The `Cylinder` is now oriented on the Y axis. [#30](https://github.com/pmndrs/cannon-es/pull/30)
- The `type` property of the `Cylinder` is now equal to `Shape.types.CYLINDER`. [#59](https://github.com/pmndrs/cannon-es/pull/59)
- `Body.applyImpulse()` and `Body.applyForce()` are now relative to the center of the body instead of the center of the world [86b0444](https://github.com/schteppe/cannon.js/commit/86b0444c93356aeaa25dd1af795fa162574c6f4b)
- Sleeping bodies now wake up if a force or an impulse is applied to them [#61](https://github.com/pmndrs/cannon-es/pull/61)
- Added a property `World.hasActiveBodies: boolean` which will be false when all physics bodies are sleeping. This allows for invalidating frames when physics aren't active for increased performance.
- Add support for [Trigger bodies](https://pmndrs.github.io/cannon-es/examples/trigger). [#83](https://github.com/pmndrs/cannon-es/pull/83)
- Deprecated properties and methods have been removed.
- The [original cannon.js debugger](https://github.com/schteppe/cannon.js/blob/master/tools/threejs/CannonDebugRenderer.js), which shows the wireframes of each body, has been moved to its own repo [cannon-es-debugger](https://github.com/pmndrs/cannon-es-debugger).
- Added optional property `World.frictionGravity: Vec3` which can be set to customize the force used when computing the friction between two colliding bodies. If `undefined`, `World.gravity` will be used. This property is useful to enable friction in zero gravity. This addresses issue [#224](https://github.com/schteppe/cannon.js/issues/224) and follows the [pattern established for p2.js](https://github.com/schteppe/p2.js/blob/master/src/world/World.js#L88-L92).

If instead you're using three.js in a **React** environment with [react-three-fiber](https://github.com/pmndrs/react-three-fiber), check out [use-cannon](https://github.com/pmndrs/use-cannon)! It's a wrapper around cannon-es.

## Installation

```
yarn add cannon-es
```

## Usage

```js
import { World } from 'cannon-es'

// ...
```

or, if you're using webpack, you can import it like this while still taking advantage of tree shaking:

```js
import * as CANNON from 'cannon-es'

// ...
```

## [Documentation](https://pmndrs.github.io/cannon-es/docs/)

[![](screenshots/docs.png)](https://pmndrs.github.io/cannon-es/docs/)

## [Examples](https://pmndrs.github.io/cannon-es/)

[![](screenshots/examples.png)](https://pmndrs.github.io/cannon-es/)

#### TO DO:

- Fix Octree `as any` assertions, and remove `as any` type assertions wherever possible
- Remove use of defined assertion (!) where possible (profile performance to ensure no degradation)
- Convert to abstract classes where possible (Equation, Solver, etc.?)
- V-HACD support (https://github.com/pmndrs/use-cannon/issues/35#issuecomment-600188994)
- Explore performance enhancements:
  - https://github.com/RandyGaul/qu3e
  - https://github.com/RandyGaul/cute_headers
  - https://github.com/TheRohans/dapao/issues?q=is%3Aissue
  - https://github.com/swift502/Sketchbook/commits/master/src/lib/cannon/cannon.js
  - https://github.com/schteppe/cannon.js/pulls


## 🌐 Web Resources & Interactive Index
- [BIRD SORT CHALLENGES](https://thequizzone.pages.dev/bird-sort-challenges.html)
- [ARROWS PUZZLE ESCAPE](https://themindzone.pages.dev/arrows-puzzle-escape.html)
- [ONE SHOT TOWER PHYSICS DESTROYER](https://thequizzone.pages.dev/one-shot-tower-physics-destroyer.html)
- [LOL SURPRISE OMG BB DRIVER](https://thequizzone.pages.dev/lol-surprise-omg-bb-driver.html)
- [BALLS VS LASERS](https://thequizzone.pages.dev/balls-vs-lasers.html)
- [HAPPY FLUFFY CUBES](https://themindzone.pages.dev/happy-fluffy-cubes.html)
- [ONU LIVE](https://thequizzone.pages.dev/onu-live.html)
- [MARSHMALLOW RUSH](https://theskillquest.pages.dev/marshmallow-rush.html)
- [CHAOS ROAD COMBAT CAR RACING](https://themindplay.github.io/chaos-road-combat-car-racing.html)
- [COSMIC TETRIZ PUZZLES](https://iskillquest.pages.dev/cosmic-tetriz-puzzles.html)
- [PAPERIO 2](https://themindzone.pages.dev/paperio-2.html)
- [POCKET PARKING](https://theskillquest.pages.dev/pocket-parking.html)
- [WOODEN BOLTS AND NUTS](https://theskillquest.pages.dev/wooden-bolts-and-nuts.html)
- [ESCAPE THE ALIEN PRISON](https://theskillquest.pages.dev/escape-the-alien-prison.html)
- [FRUIT NINJA](https://themindplays.pages.dev/fruit-ninja.html)
- [CATEGORY PLATFORM260](https://skillplay.github.io/category-platform260.html)
- [CATEGORY MERGE](https://themindplaying.web.app/category-merge.html)
- [SAMURAI VS YAKUZA BEAT EM UP](https://themindskillplayplay.pages.dev/samurai-vs-yakuza-beat-em-up.html)
- [MAGIC KINGDOM HEX MATCH](https://iskillquest.pages.dev/magic-kingdom-hex-match.html)
- [GOAL IO](https://themindplay.github.io/goal-io.html)
- [CATEGORY MOUSE1 699](https://themindplay.github.io/category-mouse1-699.html)
- [TILE GURU](https://themindskillplayplay.pages.dev/tile-guru.html)
- [MARATHON RACE IO](https://themindplay.github.io/marathon-race-io.html)
- [CATEGORY AGILITY](https://themindplaying.web.app/category-agility.html)
- [CATEGORY CONTROLLER 2](https://skillplay.github.io/category-controller-2.html)
- [STEAL ITEMS IO](https://themindzone.pages.dev/steal-items-io.html)
- [MR LONG HAND](https://themindzone.pages.dev/mr-long-hand.html)
- [LEXY](https://thequizzone.pages.dev/lexy.html)
- [STICKMAN VS ZOMBIES WORLDCRAFT](https://thequizzone.pages.dev/stickman-vs-zombies-worldcraft.html)
- [BLOCK CUT CLEANER](https://iskillplay.web.app/block-cut-cleaner.html)
- [BASKETBALL RUSH](https://iskillquest.pages.dev/basketball-rush.html)
- [BANG BANG MAHJONG](https://skillplay.github.io/bang-bang-mahjong.html)
- [LOL SURPRISE GAME ZONE](https://themindplaying.web.app/lol-surprise-game-zone.html)
- [CATEGORY STICKMAN 2](https://themindplay.github.io/category-stickman-2.html)
- [ZOMBIE RAFT](https://iskillplay.web.app/zombie-raft.html)
- [MAJESTIC DRAGONS MERGE](https://themindplay.pages.dev/majestic-dragons-merge.html)
- [OFFROAD JEEP GAME SIMULATOR](https://thequizzone.pages.dev/offroad-jeep-game-simulator.html)
- [3DASH](https://theskillquest.pages.dev/3dash.html)
- [SPACE SHIFT](https://themindzone.pages.dev/space-shift.html)
- [CATEGORY MAKEUP](https://skillplay.github.io/category-makeup.html)
- [CATEGORY FASHION105](https://themindskillplayplay.pages.dev/category-fashion105.html)
- [CATEGORY AGILITY 2](https://themindskillplayplay.pages.dev/category-agility-2.html)
- [CONTACT](https://themindplaying.web.app/contact.html)
- [EARTH DEFENDER](https://themindzone.pages.dev/earth-defender.html)
- [CATEGORY CASUAL 6](https://themindplays.pages.dev/category-casual-6.html)
- [MINI GAMES CASUAL COLLECTION](https://themindskillplayplay.pages.dev/mini-games-casual-collection.html)
- [CATEGORY RACING DRIVING](https://themindskillplayplay.pages.dev/category-racing-driving.html)
- [CATEGORY IDLE445](https://themindplay.github.io/category-idle445.html)
- [SAVE THE CATS BUBBLE SHOOTER](https://themindskillplayplay.pages.dev/save-the-cats-bubble-shooter.html)
- [CANNONS BLAST 3D](https://iskillquest.pages.dev/cannons-blast-3d.html)
- [MOTO STUNT BIKER](https://theskillquest.pages.dev/moto-stunt-biker.html)
- [MAGECLASH IO](https://thequizzone.pages.dev/mageclash-io.html)
- [STICKMAN FOOTBALL](https://iskillquest.pages.dev/stickman-football.html)
- [DYNAMONS 7](https://themindzone.pages.dev/dynamons-7.html)
- [MAHJONG SOLITAIRE ZODIAC](https://themindskillplayplay.pages.dev/mahjong-solitaire-zodiac.html)
- [BUBLIX BUBBLE HIT](https://iskillquest.pages.dev/bublix-bubble-hit.html)
- [CODE MAZE](https://theskillquest.pages.dev/code-maze.html)
- [COLLEGE GIRL COLORING DRESS UP](https://iskillplay.web.app/college-girl-coloring-dress-up.html)
- [HORSE CHAMPS](https://themindskillplayplay.pages.dev/horse-champs.html)
- [SUPER SNIPER MISSIONS](https://theskillquest.pages.dev/super-sniper-missions.html)
- [DUNGEON MASTER KNIGHT](https://skillplay.github.io/dungeon-master-knight.html)
- [MINI GAMES RELAX COLLECTION 2](https://themindzone.pages.dev/mini-games-relax-collection-2.html)
- [HOW TO DRESS YOUR DRAGON](https://skillplay.github.io/how-to-dress-your-dragon.html)
- [CATEGORY SIMULATION](https://iskillplay.web.app/category-simulation.html)
- [IDLE ANIMAL ANATOMY](https://theskillquest.pages.dev/idle-animal-anatomy.html)
- [TILE MATCH THE IMMERSIVE PUZZLE](https://themindzone.pages.dev/tile-match-the-immersive-puzzle.html)
- [CATEGORY CAR376](https://themindplay.github.io/category-car376.html)
- [JEWEL DRESS UP](https://iskillquest.pages.dev/jewel-dress-up.html)
- [EGGY BEATS](https://thequizzone.pages.dev/eggy-beats.html)
- [SOCCER SNAKES](https://thequizzone.pages.dev/soccer-snakes.html)
- [SAVE BABY CAPYBARAS PULL PIN](https://themindskillplayplay.pages.dev/save-baby-capybaras-pull-pin.html)
- [MONSTER IMPACT](https://themindplay.github.io/monster-impact.html)
- [CREEPY DRESS UP](https://themindplay.github.io/creepy-dress-up.html)
- [LOST THINGS HIDDEN OBJECTS](https://themindskillplayplay.pages.dev/lost-things-hidden-objects.html)
- [PORTAL MASTER](https://themindplaying.web.app/portal-master.html)
- [ZOMBIE DEFENSE WAR](https://themindplay.pages.dev/zombie-defense-war.html)
- [INDEX30](https://themindplay.pages.dev/index30.html)
- [CATEGORY LOGIC538](https://iskillplay.web.app/category-logic538.html)
- [GOLF MINI](https://iskillquest.pages.dev/golf-mini.html)
- [CATEGORY WATER39](https://themindzone.pages.dev/category-water39.html)
- [DEATH BALL](https://themindplay.pages.dev/death-ball.html)
- [MINEBLOCKS 3D MAZE](https://themindzone.pages.dev/mineblocks-3d-maze.html)
- [IDLE MONEY FACTORY](https://iskillplay.web.app/idle-money-factory.html)
- [CELEBRITY THANKSGIVING PREP](https://thequizzone.pages.dev/celebrity-thanksgiving-prep.html)
- [BUBLIX BUBBLE HIT](https://iskillplay.web.app/bublix-bubble-hit.html)
- [CATEGORY CASUAL 11](https://themindzone.pages.dev/category-casual-11.html)
- [SPRUNKI 3D ESCAPE](https://skillplay.github.io/sprunki-3d-escape.html)
- [FASHIONISTA AVATAR STUDIO DRESS UP](https://iskillplay.web.app/fashionista-avatar-studio-dress-up.html)
- [CATEGORY GROW99](https://iskillplay.web.app/category-grow99.html)
- [WOOD BLOCK JAM](https://thequizzone.pages.dev/wood-block-jam.html)
- [CATEGORY RACING DRIVING 3](https://themindplays.pages.dev/category-racing-driving-3.html)
- [DONUT BOX](https://theskillquest.pages.dev/donut-box.html)
- [DTA 2 MANIAC](https://themindplay.pages.dev/dta-2-maniac.html)
- [PIN MASTER SCREW PUZZLE QUEST BRAIN GAMES](https://theskillquest.pages.dev/pin-master-screw-puzzle-quest-brain-games.html)
- [CATEGORY 2D1 070](https://themindplaying.web.app/category-2d1-070.html)
- [CATEGORY SPACE](https://thequizzone.pages.dev/category-space.html)
- [LAST UFO DEFENSE](https://themindplay.pages.dev/last-ufo-defense.html)
- [BRICK BREAKER](https://themindplay.pages.dev/brick-breaker.html)
- [STELLAR FUSION](https://skillplay.github.io/stellar-fusion.html)
- [REALDRIVE FEEL THE REAL DRIVE](https://quizverses-9d2f2.web.app/realdrive-feel-the-real-drive.html)
- [CATEGORY MERGE GAMES](https://skillplay.github.io/category-merge-games.html)
- [CATEGORY CASUAL 2](https://themindplay.pages.dev/category-casual-2.html)
- [DINOSAUR RAMPAGE](https://studyquests.github.io/dinosaur-rampage.html)
- [RELAY RACE](https://iskillquest.pages.dev/relay-race.html)
- [CATEGORY SECURLY BYPASS](https://quizverses.pages.dev/category-securly-bypass.html)
- [RUN NOW](https://quizverses-9d2f2.web.app/run-now.html)
- [PACKING LINE](https://quizverses.github.io/packing-line.html)
- [STRONGBLADE](https://iskillplay.web.app/strongblade.html)
- [POOL MASTER](https://thequizzone.pages.dev/pool-master.html)
- [TILE FRUITS](https://theskillquest.pages.dev/tile-fruits.html)
- [CATEGORY BUILDING179](https://studyquests.github.io/category-building179.html)
- [THE GRENCH COUPLE HOLIDAY DRESS UP](https://quizverses-9d2f2.web.app/the-grench-couple-holiday-dress-up.html)
- [WORLD WARS TANKS](https://themindplay.pages.dev/world-wars-tanks.html)
- [NUMBER COLLECTOR BRAINTEASER](https://iskillplay.web.app/number-collector-brainteaser.html)
- [POLYGON SPACE](https://quizverses.github.io/polygon-space.html)
- [CATEGORY UNBLOCKED WEBSITES](https://themindplay.pages.dev/category-unblocked-websites.html)
- [CATEGORY MAKEUP CATEGORY](https://skillplay.github.io/category-makeup-category.html)
- [OHPEACH IT](https://quizverses.github.io/ohpeach-it.html)
- [CUBE CONNECT](https://iskillquest.pages.dev/cube-connect.html)
- [LAST UFO DEFENSE](https://quizverses.github.io/last-ufo-defense.html)
- [CATEGORY PHYSICS371](https://themindplays.pages.dev/category-physics371.html)
- [SCARY TEACHER 3D RETURNS](https://quizverses.github.io/scary-teacher-3d-returns.html)
- [TAP GO DELUXE](https://quizverses.github.io/tap-go-deluxe.html)
- [CATEGORY BATTLE](https://skillplay.github.io/category-battle.html)
- [SMASHDOLL](https://themindskillplayplay.pages.dev/smashdoll.html)
- [CATEGORY PUZZLE 7](https://studyquests.github.io/category-puzzle-7.html)
- [TANGRAM PUZZLE](https://theskillquest.pages.dev/tangram-puzzle.html)
- [ROYAL GARDEN MATCH](https://quizverses-9d2f2.web.app/royal-garden-match.html)
- [INDEX21](https://themindskillplayplay.pages.dev/index21.html)
- [SUDOKU VAULT](https://quizverses.github.io/sudoku-vault.html)
