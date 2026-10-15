# GAME-SP2.3C — Chapter Two Branching Story V2 (locked 14 October 2026)

**Status:** Owner-approved replacement for the **invitation logic, day spacing and branch progression** described in `GAME-SP2.1-STEVE-HOLIDAY-STORY-V1.md`. That original screenplay is retained as the historical dialogue and visual reference; unchanged individual Great Wall, Forbidden City and Night Market dialogue lines remain canon. This document supersedes V1 wherever progression differs.

## Revised travel calendar and decision structure

- **Two days later… In China:** Existing approved opening card → Great Wall. Play all five `china.wall.001–005` lines. Stephen chooses **accept The Summit** (route `cult`) or **decline**.
- **Accept Great Wall:** The Summit accepted → Stephen goes directly to its fictional incident handoff. **Forbidden City and Night Market are not played.** No other offers or late booking replacements.
- **Decline Great Wall:** Intermission card **A FEW DAYS LATER… / THE FORBIDDEN CITY** → Forbidden City. Play four `china.palace.001–004` lines. Stephen chooses **accept honorary banquet** (route `detention`) or **decline**.
- **Accept Forbidden City:** Play the five approved banquet follow-up lines and Paul's wrong photograph gag. Then attend the banquet and enter its fictional incident handoff. **Night Market is not played.**
- **Decline Forbidden City:** Intermission card **THE NEXT EVENING… / THE NIGHT MARKET** → Night Market.
- **Night Market:** Play all six locked `china.market.001–006` lines and the fictional **TOTAL RENEWAL SPA — 90% OFF** advert. There are **no accept/decline buttons**. Stephen inevitably takes the irresistible deal; this selects `reassemble`. No all-declined fallback exists.
- The setting is an invented Chinese market. No real tourist business, historic site, authority or spa is implicated by the jokes.

## Incident handoffs and final phone

Accepting a route takes Stephen directly to a route-specific **incident handoff**: The Summit, the fictional Cultural Excellence Banquet, or Total Renewal Spa. The full cult / detention / reassembly incidents and their mini-games are not yet implemented and must not appear to be playable. For the current vertical slice, the handoff explicitly says what work comes next, and a Continue control shows the approved truncated Stephen Rescue Group message.

The final message uses the selected route only:
- `cult`: “This place is unreal. They've asked me to be their...”
- `detention`: “I've just been introduced as the official...”
- `reassemble`: “This spa is incredible. They're taking my entire...”

The 1% battery drops to 0%, Stephen says “Oh, for fuck's sake.”, and **BACK IN ENGLAND…** introduces the future David/Paul rescue chapter. No full rescue chapter is implemented by SP2.3C.

## State and replay contract

Keep existing V3 local-save key and office progress intact. The holiday subflow is tagged `holidayFlowVersion=2`. The game tracks the active `holidayPhase`, `intermissionTarget`, the approved short scene cursor(s), `wallDecision` and `palaceDecision`, and exactly one final `route`. `marketDecision` is not a player choice; it records the inevitable acceptance when the six market beats complete. An acceptance is definitive for the current playthrough and commits its route **at the relevant incident handoff**.

Back/Replay never allows reaching a later sightseeing location after an accepted earlier invitation. **Choose another ending** explicitly resets to the Great Wall decision checkpoint (not the previous mandatory market), clears downstream choices and route, and lets the player experience a different branch without replaying the 67-beat voiced office opening.

Historical multi-accept V3 saves from earlier previews migrate to the **first accepted invitation**, or the mandatory market route when both earlier invitations were declined; they must not resume inside an inaccessible scene.

## Owner-approved presentation constraints

Retain existing approved full-body art, the exact Great Wall/Forbidden City/Night Market backgrounds, the standing Stephen variants, desktop 16:9 viewport fit, and side-by-side first/second invitation buttons on laptops. The two intermissions and incident handoffs are HTML/CSS overlays using previously approved background images rather than newly generated, unreviewed illustrations.

**No game-engine expansion or extra long story branch.** Complete GAME-SP2.3C through its stacked draft preview/visual owner gate before adding the three incident mini-games.
