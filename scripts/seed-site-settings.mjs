import { createClient } from '@sanity/client'
import { config } from 'dotenv'
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'y7ytd6po',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const DOCUMENT_ID = 'be017460-24c5-4a73-90f1-e6ba5f94c94f'

function block(key, text) {
  return {
    _key: key,
    _type: 'block',
    children: [{ _key: key + 's1', _type: 'span', marks: [], text }],
    markDefs: [],
    style: 'normal',
  }
}

const patch = {
  welcomeIntro: [
    block('wi1', 'Hallo, schön, dass du auf diese Seite gefunden hast. Ich bin Rebecca Schwindt und habe es zu meiner Aufgabe gemacht, Menschen in schwierigen Phasen kunsttherapeutisch zu unterstützen. Ich begeistere mich für vieles und diese Begeisterungsfähigkeit ist erfüllt von tiefer Ehrfurcht und Freude am Leben. Als Heilpraktikerin für Psychotherapie und Kunsttherapeutin ist es meine Mission, Menschen aus ihren Blockaden zurück zum Lebensfluss und ihrer Lebensfreude zu führen.'),
  ],

  aboutParagraph1: [
    block('ap1', 'Schon seit meiner Kindheit fühle ich mich zu allem künstlerischen Ausdruck hingezogen und spüre beim Malen eine ganz besondere Kraft. Ich habe meine ersten Lebensjahre in Argentinien verbracht, doch durch die schwere Krankheit meiner Mutter zogen wir in meinem 7. Lebensjahr zurück nach Deutschland, wo ich bis zu meinem 16. Lebensjahr aufwuchs. Dann begann ein neuer spannender Abschnitt. Wir zogen nach Ecuador und es wurde mein Zuhause für die nächsten 10 Jahre. Dort studierte ich Psychologie mit klinischem Schwerpunkt und arbeitete dann in Deutschland als Psychologin in verschiedenen Bereichen, unter anderem in einem Krankenhaus für Kinder und Jugendliche und im Betreuten Einzelwohnen für Menschen mit Psychischen Erkrankungen.'),
  ],

  aboutParagraph2: [
    block('ap2', 'Einige Jahre später machte ich eine Reise nach Indien. Ich trug die Frage in meinem Herzen: Wie möchte ich auf der Erde wirken? Auf dieser Reise berührten mich die wundervollen, starken Farben, kunstvollen Handwerke und die Lebensart der Menschen. Ich erlebte dort auf prägende Weise einen Schlüsselmoment, der mich zur Kunsttherapie führte.'),
  ],

  aboutParagraph3: [
    block('ap3', 'In Berlin begann ich meinen Ruf zu folgen und schloss die Ausbildung als Kunst- und Kreativitätstherapeutin kurz bevor meine Tochter auf die Welt kam ab. Im Jahr 2025 beendete ich außerdem eine Ausbildung als Sterbebegleiterin. Auch der Sterbeprozess ist ein Verwandlungsraum. Seitdem habe ich den tiefen Wunsch, einen Raum zu schaffen, in dem Menschen unterstützt werden, sich lebendig, selbstbestimmt und kraftvoll zu erleben und persönliche Veränderungen zu erfahren.'),
  ],

  ktSubtitle: [
    block('kts1', 'Stell dir einen Ort vor, an dem du innere Ruhe und Freude erleben kannst. Schon die Imagination kann unterstützend auf Entspannung und Wohlbefinden wirken. Wenn zudem der Körper und die Hände in den kreativen Prozess einbezogen werden, werden unterschiedliche Ebenen – Geist und Körper – gleichzeitig angesprochen, was die persönliche Entwicklung fördern kann.'),
  ],

  ktHowItWorksTitle: 'Was ist Kunsttherapie?',

  ktHowItWorksIntro: [
    block('kthw1', 'Kunsttherapie ist ein kreativer Ansatz, der es ermöglicht, Emotionen nonverbal auszudrücken und zu reflektieren. Sie kann dazu beitragen: Gefühle sichtbar zu machen, die schwer in Worte zu fassen sind, Entspannung und Achtsamkeit zu fördern, Selbstreflexion zu unterstützen und neue Perspektiven zu entdecken. Studien geben Hinweise darauf, dass kreative Prozesse die Auseinandersetzung mit Themen fördern können. Dieser Ansatz kann zum Beispiel Menschen in belastenden Lebenssituationen, wie Stress, Ängsten oder Trauer, unterstützen. Zu beachten ist, dass die Wirkungen individuell sind und nicht garantiert werden können.'),
  ],

  ktPomTitle: 'Personenorientiertes Malen (POM)',

  ktPomIntro: [
    block('kpi1', 'Das personenorientierte Malen wurde von Bettina Egger entwickelt und unterscheidet sich etwas von anderen kunsttherapeutischen Ansätzen.'),
  ],

  ktPomDescription: [
    block('kpd1', 'In der Personenorientierten Maltherapie gibt es in der Regel keine vorgegebenen Aufgaben oder Themen. Dein Bild entsteht aus einem ersten inneren Impuls und entwickelt sich daraus weiter. Der offene Malprozess steht im Mittelpunkt.'),
    block('kpd2', 'Alles, was sich zeigt – Farben, Formen, Bewegungen – ist Teil deines persönlichen Ausdrucks. Ziele, Themen und Erkenntnisse entstehen aus diesem Prozess heraus.'),
    block('kpd3', 'Meine wichtigste Aufgabe dabei ist das Begleiten: Ich bin präsent, aufmerksam und unterstützend an deiner Seite – und gehe mit dir den Weg, wohin auch immer das Bild dich führt.'),
  ],

  sessionDescription1: [
    block('sd1', 'Im Zentrum der Waldstadt Eberswalde biete ich – bis zur Anmietung eines eigenen Ateliers – Einzelsitzungen im ruhigen Coachingraum des Coworking-Spaces Thinkfarm an.'),
  ],

  sessionDescription2: [
    block('sd2', 'Der Raum bietet einen geschützten Rahmen, in dem mit unterschiedlichen künstlerischen Materialien wie Pastellkreide, Gouache oder Zeichenkreide gearbeitet werden kann. Der gestalterische Prozess dient der Selbsterforschung und dem Ausdruck innerer Themen.'),
  ],

  sessionDescription3: [
    block('sd3', 'Die Dauer eines begleitenden Prozesses ist individuell sehr unterschiedlich. In einzelnen Fällen kann bereits eine einmalige Sitzung als hilfreich erlebt werden, häufig werden jedoch Themen über mehrere Wochen hinweg vertieft bearbeitet, bis sich ein stimmiger Abschluss zeigt. Umfang und Verlauf werden dabei stets gemeinsam abgestimmt.'),
  ],

  sessionDescription4: [
    block('sd4', 'Die erste Kennenlernsitzung dauert in der Regel 90 Minuten. Die erste halbe Stunde ist dem gegenseitigen Kennenlernen, der Klärung von Fragen sowie der Besprechung deines Anliegens gewidmet. Anschließend findet die praktische Arbeit statt.'),
  ],

  sessionDescription5: [
    block('sd5', 'Nach der ersten Sitzung kannst du individuell entscheiden, ob du künftig 60 oder 90 Minuten buchen möchtest.'),
  ],
}

console.log('Seeding siteSettings document…')

try {
  const result = await client
    .patch(DOCUMENT_ID)
    .set(patch)
    .commit({ autoGenerateArrayKeys: true })

  console.log('✅ Done! Updated document:', result._id)
} catch (err) {
  // Document may not exist yet — create it
  if (err.statusCode === 404 || err.message?.includes('not found')) {
    console.log('Document not found, creating it…')
    const result = await client.createOrReplace({
      _id: DOCUMENT_ID,
      _type: 'siteSettings',
      ...patch,
    })
    console.log('✅ Created document:', result._id)
  } else {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}
