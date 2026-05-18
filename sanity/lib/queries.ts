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

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    welcomeIntro,
    welcomeImage,
    aboutParagraph1,
    aboutParagraph2,
    aboutParagraph3,
    aboutPortrait,
    ktSubtitle,
    ktHowItWorksTitle,
    ktHowItWorksIntro,
    ktPomImage,
    ktPomTitle,
    ktPomIntro,
    ktPomDescription,
    sessionDescription1,
    sessionDescription2,
    sessionDescription3,
    sessionDescription4,
    sessionDescription5,
    sessionRoomImage,
  }
`)
