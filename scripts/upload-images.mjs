#!/usr/bin/env node
/**
 * upload-images.mjs
 *
 * Uploads local images from public/images/ to Sanity and patches offer documents.
 *
 * SETUP:
 *   1. Go to https://www.sanity.io/manage/personal/project/y7ytd6po/api#tokens
 *   2. Create a token with "Editor" permissions
 *   3. Add to .env.local:  SANITY_WRITE_TOKEN=skXXXXXX...
 *   4. Run: node scripts/upload-images.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { config as dotenvConfig } from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

// Load .env.local
dotenvConfig({ path: path.join(root, '.env.local') })

const WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN
if (!WRITE_TOKEN) {
  console.error('❌ SANITY_WRITE_TOKEN not found in .env.local')
  console.error('   Create an Editor token at: https://www.sanity.io/manage/personal/project/y7ytd6po/api#tokens')
  process.exit(1)
}

const client = createClient({
  projectId: 'y7ytd6po',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: WRITE_TOKEN,
  useCdn: false,
})

/** Map: offer document ID → local image file for card + detail */
const OFFER_IMAGES = {
  '201d1be2-36ee-4a00-b896-fe414388876b': {
    card: 'photo_2026-02-02_11-16-29.webp',
    detail: 'Einzeltherapie raum.jpg',
  },
  'b4c1683c-ad2d-4117-bc92-0f42fe053172': {
    card: 'Klang.webp',
  },
  'cefd20c0-7a7d-4433-b510-c7b0704b3292': {
    card: '5348175586192460915.jpg',
  },
  'b86d376e-b211-4307-9734-c91193daf1ea': {
    card: '5348175586192460911.jpg',
  },
  'daa669cd-588b-435e-ab79-eef9247624bb': {
    card: 'Atmen.webp',
  },
  '811ddcd8-e138-4207-89da-f4b38b4d00c3': {
    card: 'POM_header.webp',
  },
  '79272a4a-25ff-4e1c-b6b7-87910e467847': {
    card: 'photo_5427296683445393000_y.webp',
  },
}

/** Map: siteSettings field → local image file */
const SITE_SETTINGS_IMAGES = {
  welcomeImage: 'photo_5427296683445393000_y.webp',
  aboutPortrait: 'ueber-mich-portrait.jpeg',
  ktPomImage: 'POM_header.webp',
  sessionRoomImage: 'Einzeltherapie raum.jpg',
}

async function uploadImage(filename) {
  const filepath = path.join(root, 'public', 'images', filename)
  if (!fs.existsSync(filepath)) {
    console.warn(`  ⚠️  File not found: ${filepath}`)
    return null
  }
  const ext = path.extname(filename).slice(1).toLowerCase()
  const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
    : ext === 'webp' ? 'image/webp'
    : ext === 'png' ? 'image/png'
    : 'image/jpeg'

  console.log(`  📤 Uploading ${filename}...`)
  const asset = await client.assets.upload('image', fs.createReadStream(filepath), {
    filename,
    contentType,
  })
  console.log(`  ✅ Uploaded → ${asset._id}`)
  return asset
}

async function main() {
  console.log('\n🖼️  Verwandlungsraum — Image Upload Script\n')

  // ── Upload offer images ───────────────────────────────────────────────────
  console.log('═══ Uploading offer card images ═══')
  for (const [docId, images] of Object.entries(OFFER_IMAGES)) {
    console.log(`\nOffer ${docId}:`)
    const cardAsset = await uploadImage(images.card)
    if (!cardAsset) continue

    const patch = {
      cardImage: { _type: 'image', asset: { _type: 'reference', _ref: cardAsset._id } },
    }

    if (images.detail) {
      const detailAsset = await uploadImage(images.detail)
      if (detailAsset) {
        patch.image = { _type: 'image', asset: { _type: 'reference', _ref: detailAsset._id } }
      }
    }

    await client.patch(docId).set(patch).commit()
    console.log(`  💾 Patched offer document`)
  }

  // ── Upload siteSettings images ────────────────────────────────────────────
  console.log('\n═══ Uploading siteSettings images ═══')
  const sitePatch = {}
  for (const [field, filename] of Object.entries(SITE_SETTINGS_IMAGES)) {
    console.log(`\nsiteSettings.${field}:`)
    const asset = await uploadImage(filename)
    if (asset) {
      sitePatch[field] = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    }
  }

  if (Object.keys(sitePatch).length > 0) {
    await client.patch('siteSettings').set(sitePatch).commit()
    console.log('\n  💾 Patched siteSettings document')
  }

  console.log('\n✨ All done! Images are now live in Sanity Studio.\n')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
