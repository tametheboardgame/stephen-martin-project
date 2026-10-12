# Generated image asset pipeline

This is an adaptation of the successful Unicorn Valley artwork pipeline.

## Resources
- Project: `tametheboardgame/stephen-martin-project`
- Staging: https://drive.google.com/drive/folders/1C6kezJBL_sexyHmxeLnFnzpj-Zbn9iC6
- GCP Workload Identity Provider: `projects/878071288497/locations/global/workloadIdentityPools/github/providers/stephen-martin-github`
- Service account: `stephen-martin-assets@unicorn-valley-510010.iam.gserviceaccount.com`
- Repo variables (Settings > Secrets and variables > Actions > Variables):
  - `GCP_WORKLOAD_IDENTITY_PROVIDER`: full provider resource above.
  - `GCP_ASSET_SERVICE_ACCOUNT`: service account email above.

The service account needs **Workload Identity User** access granted through a matching repository-ID principal. The repository ID is `1415241689`; GitHub owner ID is `8076321`. Its staging folder permission only needs **Viewer**; no JSON key or broad Drive sharing is necessary.

## Lifecycle

1. Generate and visually approve the original image.
2. Upload the original PNG/JPEG/WebP into the dedicated Drive staging folder, with a stable descriptive name.
3. On an `agent/*` branch, add or revise a JSON file under `generated-assets/manifests/`, specifying `source.fileId`, `expectedSourceName`, `destination`, transforms and a revision number.
4. The manifest push triggers the GitHub Actions materialisation workflow. Alternatively run its manual dispatch after it exists on `main`.
5. The workflow validates source parent folder, file name, type and size; downloads via the Drive API; converts deterministically to WebP; validates the result; and commits it to the same development branch.
6. Inspect the image and approve before merging. Staging and source originals remain on Drive.

## Example manifest

```json
{
  "schemaVersion": 1,
  "source": { "provider": "google-drive", "fileId": "DRIVE_FILE_ID" },
  "expectedSourceName": "stephen-martin-character-baseline-v01.png",
  "destination": "public/assets/generated/characters/stephen-martin-baseline.webp",
  "transform": { "maxWidth": 1600, "maxHeight": 1600, "quality": 88 },
  "revision": 1
}
```

Use `public/assets/generated/characters/`, `game/`, `comic/` or `music/` for approved, optimised artwork. The pipeline rejects absolute paths, traversal and destinations outside `public/assets/generated/`. Maximum source size is 12 MiB, maximum output is 2 MiB, accepted formats are PNG/JPEG/WebP.

To replace an image without changing references, replace the Drive file *in place*, increment the manifest `revision`, and commit. Full-resolution originals should not be committed to Git, and materialisation does not authorise external publication.
