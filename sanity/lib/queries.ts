import { defineQuery } from 'next-sanity'

export const OFFERS_QUERY = defineQuery(`
  *[_type == "offer" && hidden != true] | order(order asc, _createdAt asc) {
    _id,
    title,
    shortDescription,
    category,
    hidden,
    order,
    cardImage,
    image,
    externalImageUrl,
    dates,
    registrationUrl,
    location,
    participants,
    duration,
    price,
    dialogType,
    canvaUrl,
    dialogContent,
  }
`)

export const ALL_OFFERS_QUERY = defineQuery(`
  *[_type == "offer"] | order(order asc, _createdAt asc) {
    _id,
    title,
    shortDescription,
    category,
    hidden,
    order,
    cardImage,
    image,
    externalImageUrl,
    dates,
    registrationUrl,
    location,
    participants,
    duration,
    price,
    dialogType,
    canvaUrl,
    dialogContent,
  }
`)
