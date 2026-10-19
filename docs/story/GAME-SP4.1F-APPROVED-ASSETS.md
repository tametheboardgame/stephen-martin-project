# GAME-SP4.1F — Locked transition artwork (18 October 2026)

**Owner approval:** All four revised illustrations explicitly approved in the game artwork review; F2B received the final map-orientation and slightly slimmer-Paul correction before approval. The PNGs are immutable version **v01 originals** at 1672 × 941, staged in the project-owned [Generated Asset Staging folder](https://drive.google.com/drive/folders/1C6kezJBL_sexyHmxeLnFnzpj-Zbn9iC6). Their SHA-256 hashes identify the exact accepted bytes. No older off-model drafts are approved.

| Packet | Approved original in Drive | SHA-256 (approved PNG) | Repository WebP output | Usage |
| --- | --- | --- | --- | --- |
| F1 | [transition-china-passing-time-v01.png](https://drive.google.com/file/d/16zPAo9wnx9KHnwR2rPjNE9ZENRkN-sib/view) | `6ed7b08cae18ab709a2997db7034233187aa3a5b77315d52436efbe464b62387` | `public/assets/generated/locations/transition-china-passing-time-v01.webp` | Both Stephen sightseeing time jumps; the Forbidden City and Night Market |
| F2A | [transition-operation-flight-luggage-v01.png](https://drive.google.com/file/d/1KHv72tO9O-IfuBqiLwVemX7IC5AFunoI/view) | `248ed4d275c27d0abf58eb65cb820749b513c8ac258444616692572c5cda5245` | `public/assets/generated/locations/transition-operation-flight-luggage-v01.webp` | David/Paul airport, luggage and bear printouts; travel beats 001–002 |
| F2B | [transition-operation-map-expenses-v01.png](https://drive.google.com/file/d/1_3-3pcPQj8ppbp7mYrKbdBcnpXc9KHsU/view) | `35ded44ff9d4e4efe7d52ec27d73a5063b2d09e6bc285b1c078d7ce8200b8cb4` | `public/assets/generated/locations/transition-operation-map-expenses-v01.webp` | David's upside-down map and Paul's receipts; travel beats 003–004; slimmer Paul on approved revision |
| F3 | [transition-stephen-route-handoff-v01.png](https://drive.google.com/file/d/1y2ICvgQ1M71f0aq5rucs4iqA6wLX4krF/view) | `3e7922fd509a51e9ea45a3a3b6b1f4e61a9c8a162bbdc4676756fc9164ce632f` | `public/assets/generated/locations/transition-stephen-route-handoff-v01.webp` | Shared Stephen handoff for all three routes; dynamic headings retained |

**Production gate:** The four manifests under `generated-assets/manifests/game-sp41f-*.json` are authoritative and should be materialised via the existing GitHub Actions Drive → Pillow/WebP workflow. Max 1672×941, quality 85, max file size 2 MiB, one materialised WebP per manifest. Keep original PNGs in Drive; do not commit oversized raw PNGs to GitHub. Image imports are *asset-only* and do not change playable scenes until separate F1, F2A/B and F3 layout/voice PRs receive approval.

**Character reference policy:** F1/F3 use the locked blue quarter-zip Stephen from the existing holiday standing sprite, not an invented blonde character. F2A/F2B use the locked bald ginger-bearded David and heavier-set but **not exaggeratedly overweight** bald, glasses-wearing Paul. The original Paul reference and locked David/Stephen references remain the baselines. No unrelated/generated off-model alternatives permitted.

**Narrator voice:** The owner has confirmed the existing narrator voice in ElevenLabs. The 12 draft spoken narrator lines/audio IDs remain in `docs/story/GAME-SP4.1F0-TRANSITION-ART-NARRATION.md`; the owner has **not yet approved final recording scripts or uploaded those files**. Do not mark audio integrated or fake recordings.

**Status:** The four approved PNGs are staged in Drive. All four corresponding optimised WebPs have been committed directly into this development branch using GitHub blob/tree commits, retaining the literal filenames/destinations declared by their versioned manifests. The automatic materialisation job **failed at Google workload identity authentication** before reading any originals (mapped `google.subject` exceeded 127 bytes); its existing manifests remain committed for provenance and later credential remediation. Source WebP copies are in the same Drive staging folder. The direct-import route used the approved source PNGs at WebP quality 85 and verified image decoding and byte sizes locally. **This paragraph describes the earlier artwork-lock commit only. A subsequent GAME-SP4.1F integration commit on the same branch has now wired all four scenes and 12 optional narrator cues without modifying story choices.** PR #59 remains draft until separate scene integration and review.

**WebP source hashes** (SHA-256 of the exact optimised bytes):

- F1: `6fd46e526c6b0e5739f1a11e20413527371c0f147e57cdeeedb524ae0aa72c69` (301,822 bytes)
- F2A: `621b9337593d9a64205b9e89c7f21dd208fa902a283ab6ca29055686e2e08a0b` (292,250 bytes)
- F2B: `2ec9e5cb7eff40dbd8c2387a94ada3a74b3e83a1039bfe872d9abbdf96cbf887` (300,558 bytes)
- F3: `79c74c27594dd02a8dfa3a808a098a182af710aa6ede81ad7984f6ce9d15982f` (342,896 bytes)

**Technical debt:** Google Workload Identity Provider `google.subject` length error must be resolved before subsequent automatic Drive materialisations. Do not add unapproved raw PNGs or make the originals public in the interim.
