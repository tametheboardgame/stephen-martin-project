# GAME-SP2.1 — Stephen's three-location holiday: Story V1

**Status: LOCKED — owner-approved 14 October 2026.**
**Scope:** Narrative, choices and consequences only. No gameplay implementation, illustration or new voice clips in this work package.
**Authority:** Supersedes the `STEVE-HOLIDAY-01` single-city-kiosk material in `SP-WP1.2-GAME-TREATMENT.md` and the one-background Stephen mock-up in `SP-WP1.2-IMPLEMENTATION-HANDOFF.md`. The previously approved `OFFICE-ALARM`, David/Paul rescue hub, three route puzzles and all three ending payoffs remain canonical.

## 1. Intent, pacing and continuity

- The fully voiced office intro ends on its title card, then Stephen becomes playable.
- Three **sequential** short, illustrated, tap/click-friendly locations: the **Great Wall**, the **Forbidden City**, and a **fictional Beijing night market/hutong street**. The real tourist sites are stylised public settings; event promoters, offers, business names, companion messages and mishaps are invented.
- Each scene contains **one binary consequential choice**: accept the offered evening activity or decline it. No sprawling dialogue tree, map walking, inventory or extra tour-planning kiosk.
- Stephen sees a clear **Current evening plan** indicator. Accepting a new activity replaces his previous booking; declining preserves it. At the end of scene 3, if he has declined every offer, the player selects one of the three already-seen invitations before the story proceeds.
- `pendingPlan` remains provisional throughout the three scenes. `route` becomes **locked only at the final departure** and drives the existing rescue path and one of three endings. No hidden morality meter, dice roll or irreversible silent choice.
- The player should finish this chapter in **approximately 3–5 minutes** (planning target; verify once the office voices and new holiday scenes are timed), preserving the **15–25-minute complete-game cap**.
- Stephen's holiday is genuinely enjoyable; David catastrophises; Paul remains more interested in snacks. No real claims about travellers, actual authorities, private family or relationships, or particular organisations.

## 2. Transition — TWO DAYS LATER… IN CHINA

After the existing office cutscene/title, fade to black, music changes to playful travel/adventure, and present two readable title cards:

**CHAPTER TWO**

**TWO DAYS LATER…**

**IN CHINA**

*Meanwhile, Stephen is having an absolutely wonderful time.*

Fade into the Great Wall scene. Title is displayed rather than narrated. No extra transition decision.

## 3. Scene 1 — Great Wall: The mountain invitation

**Environment:** Scenic stylised Great Wall and mountains; Stephen happily taking a photograph. Phone message overlay; a fictional promoter arrives. No real business or identifiable traveller.

**Script in presentation order** (IDs are stable **new-chapter IDs**, distinct from the existing `office.*` recordings):

| Beat ID | Delivery | Locked copy or direction |
|---|---|---|
| `china.wall.phone.001` | David, **phone text** | “Please confirm you're safe. I've identified several geopolitical variables.” |
| `china.wall.001` | Stephen | “I'm on one of the wonders of the world and he's still being a prick.” |
| `china.wall.002` | Promoter | “You look like someone who'd enjoy The Summit. Exclusive mountain retreat. Very friendly gentlemen. Spectacular views.” |
| `china.wall.003` | Stephen | “How friendly?” |
| `china.wall.004` | Promoter | “Extremely.” |
| `china.wall.005` | Stephen | “Go on.” |

**Player choice — accept / decline:**

- **Accept:** “A mountain full of handsome men? Sign me up.” Stephen says: “Right. So, is it a social club or an actual cult? Actually, don't answer that.” Set `pendingPlan = cult`. Offer: **The Summit**, exclusively fictional mountain social club. Presentation confirms **The Summit booked**.
- **Decline:** “Tempting, but I've got more sightseeing to do.” Stephen says: “I'll regret this, won't I? Usually do.” Preserve current plan (normally `null` here). Save invitation as seen, not booked.

**Exit:** A further David status request appears as phone text; Stephen pockets the phone without replying. Move forward to the Forbidden City regardless of choice. **No separate phone Reply/Mute gameplay choice.**

## 4. Scene 2 — Forbidden City: The honorary appointment

**Environment:** A stylised scenic Forbidden City courtyard, then an imaginary promotional stand advertising an entirely fictional cultural banquet *outside* the historic attraction. It is not presented as an actual event or government institution.

| Beat ID | Delivery | Locked copy or direction |
|---|---|---|
| `china.palace.001` | Attendant | “Excuse me, sir. Would you like to be our guest of honour at tonight's International Cultural Excellence Banquet?” |
| `china.palace.002` | Stephen | “Why?” |
| `china.palace.003` | Attendant | “You're British. And you've got a very confident face.” |
| `china.palace.004` | Stephen | “That's genuinely the best qualification I've ever had.” |
| — | Visual | Huge badge: **VISITING INTERNATIONAL SPECIALIST**. |

**Player choice — accept / decline:**

- **Accept:** “Free dinner AND I get to feel important? Absolutely.” Stephen: “Do I need to prepare a speech?” Attendant: “No, sir. We have already prepared one in your name.” Stephen: “Outstanding.” Set `pendingPlan = detention`, overriding any earlier Summit booking. The attendant requests a photo for the slideshow. Stephen: “Sure, just use the first one on my phone.” A thumbnail reveals **Paul's silly original honey-bear picture**. Stephen fails to notice. This prepares the imaginary bureaucracy/bear misunderstanding, not an allegation about real authorities.
- **Decline:** “No thanks. This sounds suspiciously like a work event.” Stephen: “I've come thousands of miles to get away from meetings. Absolutely not.” Preserve `pendingPlan`.

Proceed to the night market. No actual detention occurs in this scene.

## 5. Scene 3 — Fictional Beijing night market: The irresistible bargain

**Environment:** A warmly lit invented hutong-inspired shopping street with food, souvenirs and a blatantly dubious but *fictional* spa advert. Don't misrepresent a named genuine market or real business.

| Beat ID | Delivery | Locked copy or direction |
|---|---|---|
| `china.market.001` | Stephen, looking at souvenir | “Paul asked for one with Wi-Fi. How the fuck would that even work?” |
| — | Visual | Stephen puts the magnet down. |
| — | Sign | **TOTAL RENEWAL SPA — 90% OFF — THE COMPLETE STEPHEN EXPERIENCE**; small print: **Replacement components sold separately.** |
| `china.market.002` | Stephen | “Ninety per cent off? Fucking hell.” |
| `china.market.003` | Spa representative | “Sir, would you be interested in our complete body-renewal package?” |
| `china.market.004` | Stephen | “What does complete mean?” |
| `china.market.005` | Spa representative | “Everything.” |
| `china.market.006` | Stephen | “That sounds brilliant.” |

**Player choice — accept / decline:**

- **Accept:** “Ninety per cent off? I'd be an idiot not to.” Stephen: “If this goes wrong, at least I've saved a fortune.” Set `pendingPlan = reassemble`, overriding any previous booking. Confirm **Spa booked**.
- **Decline:** “I think I'll stick with my existing plans.” Stephen: “Actually, no. I've already got somewhere to be.” Preserve `pendingPlan`.
- **Fallback only when `pendingPlan = null`:** Stephen must choose **one of the three previously encountered invitations**. This is a concise final resolution panel, **not a new scene or fourth opportunity with new dialogue**. It prevents dead ends without secretly overriding the player's preference.

**Explicit booking feedback:** After each choice, display the active booking or **No evening booking yet**. Earlier offers can be replaced, not stacked.

## 6. Closing beat — The truncated final message

Once the last booking is finalised:

1. Save `route = pendingPlan` with the chosen route; checkpoint before the phone goes dead.
2. Phone UI shows Stephen Rescue Group and **1% battery**. Stephen begins one route-specific message:

| Locked `route` | Message shown as Stephen's text | Leads to |
|---|---|---|
| `cult` | “This place is unreal. They've asked me to be their...” | The Cult of Stephen |
| `detention` | “I've just been introduced as the official...” | Detained by Administration |
| `reassemble` | “This spa is incredible. They're taking my entire...” | Some Assembly Required |

3. Send is interrupted by a low-battery sound and **0%** display. No invented real-world danger is shown.
4. `china.final.001` — Stephen: “Oh, for fuck's sake.”
5. Cut to black, then text: **BACK IN ENGLAND…** / *Two idiots are about to make this considerably worse.*
6. Enter the existing `OFFICE-ALARM` beat: David and Paul misinterpret Stephen's abrupt communications blackout, then travel for an unnecessary rescue.

**Narrative contrast:** Stephen is in a holiday romance/comedy; David thinks he is in an international thriller; Paul just wants a Wi-Fi fridge magnet.

## 7. Mechanics and deterministic outcomes

Persist only the necessary Stephen-stage additions, respecting the current V3 office save format:

- `chapterScene`: `transition | wall | palace | market | final-message`, plus one scene-specific progression cursor.
- `choices`: `{wall: accept|decline|null, palace: accept|decline|null, market: accept|decline|null}`.
- `pendingPlan`: `cult | detention | reassemble | null`. Updated only by **Accept** or the all-declined final resolution.
- `route`: same three values, unset until final-message checkpoint, then **immutable** through David/Paul's investigation and the matching ending.
- Preserve a compact checkpoint immediately before evening-plan commitment for **Play another ending**; returning here need not replay the office or sightseeing sections.

**Examples:**

| Great Wall | Forbidden City | Night market | Result |
|---|---|---|---|
| Accept | Decline | Decline | `cult` |
| Accept | Accept | Decline | `detention` |
| Accept | Accept | Accept | `reassemble` |
| Decline | Accept | Decline | `detention` |
| Decline | Decline | Decline | Player explicitly chooses any of the three before the exit |

No failure states, hidden prerequisites, randomised ending or moral score. Choices only select Stephen's evening itinerary and corresponding rescue misunderstanding.

## 8. Presentation and later work

- Three illustrated 16:9 scene backgrounds with a small number of simple hotspot interactions; reuse the office player's captions, sound toggle and native responsive buttons, without inventing a new engine or mandatory movement mechanics.
- Need an independently **approved standing/travel Stephen sprite** derived from the existing baseline art; do not reuse a desk-clasping seated sprite as if it were standing.
- No actual new music or voice files are required to implement GAME-SP2.1; recorded voices for Chapter Two (when requested) should use unique `china.*` IDs, preserving all 55 original `office.*` assets.
- All three location backgrounds, promoter presentation and any significant new character illustration remain separate visual-approval gates.
- Real historical landmarks may appear as stylised public locations. Spa, banquet and mountain club are entirely fictitious. Do not add identifiable real people, factual allegations, real-family details, actual itinerary specifics or private messages.
- No more than three short holiday scenes; preserve the original total-game **15–25-minute** first-play target. Reserve full mini-games for the existing David/Paul rescue section.

## 9. Implementation sequencing (not authorised by this story lock alone)

1. **GAME-SP2.2** — Transition + Great Wall: art concept approval, choose accept/decline, active booking display, keyboard/touch playtest.
2. **GAME-SP2.3** — Forbidden City + market, plan override rules, branch-dependent last message, save/resume and all-declined fallback.
3. **GAME-SP2.4** — Reconnect existing `OFFICE-ALARM` and common David/Paul hub, preserving the route-specific rescue narrative.
4. **GAME-SP3** — Three bounded route mini-games and endings, using existing approved treatment.
5. **GAME-SP4** — Second pass on humour, chapter voices, sound, runtime and desktop/tablet polish.

## 10. Acceptance criteria for the story lock

- The sequence and consequential choices are approved; the **full chapter has no extra kiosk or phone reply/mute mini-decision**.
- Exactly one booking is active at any time; accepting later overrides, declining preserves; all-declined requires explicit resolution.
- All three endings remain reachable with deterministic choices and lead into the correct route-specific truncated message.
- David/Paul's rescue hub, fictional misunderstandings and endings remain those previously approved, not silently rewritten.
- Dialogues remain compact (about 20–25 short spoken lines per playthrough, depending on decisions; in-game subtitles and phone text are separate).
- Owner approval of this V1 treatment is **not** approval of generated art, a finished playable scene, recorded performances, or public release.
