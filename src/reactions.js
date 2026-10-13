/* GAME-SP1.1-D3: approved expression vocabulary and stable beat-ID lookup.
 * These are acting cues, not permission to use unapproved seated artwork.
 * A missing approved sprite is intentionally rendered as Neutral.
 */
(function () {
  "use strict";
  window.SMP_EXPRESSION_KEYS = {
  "Stephen": [
    "neutral",
    "amused",
    "confused",
    "annoyed",
    "exasperated",
    "laughing"
  ],
  "David": [
    "neutral",
    "confident",
    "serious",
    "frustrated",
    "shocked",
    "systems-expert"
  ],
  "Paul": [
    "blank",
    "confused",
    "pleased"
  ]
};
  window.SMP_REACTIONS = Object.fromEntries(window.SMP_OFFICE_SHOTS.flatMap(
    shot => shot.lines.map(beat => [beat.id, beat.reactions])
  ));
})();
