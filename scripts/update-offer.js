// Script to update Atmen und Malen document in Sanity
// Uses SANITY_API_READ_TOKEN from .env.local (needs write permissions)

const fs = require('fs');

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const tokenMatch = envContent.match(/SANITY_API_READ_TOKEN=(.+)/);
const token = tokenMatch ? tokenMatch[1].trim() : '';

const projectId = 'y7ytd6po';
const dataset = 'production';
const docId = 'f0039819-f95a-45fc-bb79-31418cba52dd';

const mutations = {
  mutations: [
    {
      patch: {
        id: docId,
        set: {
          shortDescription: "Aus deiner Mitte heraus Grenzen setzen",
          dates: ["Samstag, 30. Mai, 14:30\u201318:30 Uhr"],
          location: "Lebensraum, Spechthausen",
          price: "35\u201350 \u20ac",
          dialogType: "details",
          hidden: false,
          dialogContent: [
            {
              _type: "block",
              _key: "block1",
              style: "normal",
              children: [{ _type: "span", _key: "s1", text: "Wann bist du ganz bei dir?", marks: [] }],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block2",
              style: "normal",
              children: [{ _type: "span", _key: "s2", text: "Wie f\u00fchlt es sich an, deinen K\u00f6rper liebevoll von innen auszuf\u00fcllen und bewusst zu bewohnen?", marks: [] }],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block3",
              style: "normal",
              children: [{ _type: "span", _key: "s3", text: "", marks: [] }],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block4",
              style: "normal",
              children: [{ _type: "span", _key: "s4", text: "Unsere Erfahrung ist, dass es sich aus dieser Mitte leichter lebt und wir bei Bedarf Grenzen klarer setzen k\u00f6nnen.", marks: [] }],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block5",
              style: "normal",
              children: [{ _type: "span", _key: "s5", text: "", marks: [] }],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block6",
              style: "normal",
              children: [{ _type: "span", _key: "s6", text: "Aus der Erdung in dir selbst heraus m\u00f6chten wir dich dabei unterst\u00fctzen, deine Grenzen klar und mit Leichtigkeit zu sp\u00fcren und stimmig zu kommunizieren.", marks: [] }],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block7",
              style: "normal",
              children: [{ _type: "span", _key: "s7", text: "", marks: [] }],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block8",
              style: "normal",
              children: [{ _type: "span", _key: "s8", text: "Mit dem verbundenen Atem atmest du dich in deine Mitte. Mit achtsamem Malen kannst du diese Erfahrung visualisieren und als sichtbare Erinnerung mit nach Hause nehmen.", marks: [] }],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block9",
              style: "normal",
              children: [{ _type: "span", _key: "s9", text: "", marks: [] }],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block10",
              style: "normal",
              children: [{ _type: "span", _key: "s10", text: "Wir freuen uns auf dich!", marks: [] }],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block11",
              style: "normal",
              children: [{ _type: "span", _key: "s11", text: "", marks: [] }],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block12",
              style: "normal",
              children: [
                { _type: "span", _key: "s12a", text: "Rebecca Schwindt", marks: ["strong"] },
                { _type: "span", _key: "s12b", text: " \u2013 HP Psychotherapie, Kunsttherapeutin, B.Sc Psychologie", marks: [] }
              ],
              markDefs: []
            },
            {
              _type: "block",
              _key: "block13",
              style: "normal",
              children: [
                { _type: "span", _key: "s13a", text: "Rebecca Schwegel", marks: ["strong"] },
                { _type: "span", _key: "s13b", text: " \u2013 Begleiterin f\u00fcr Atemarbeit, B.Sc Psychologie", marks: [] }
              ],
              markDefs: []
            }
          ]
        }
      }
    }
  ]
};

async function main() {
  const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/mutate/${dataset}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mutations)
  });
  
  const result = await response.json();
  console.log('Status:', response.status);
  console.log('Result:', JSON.stringify(result, null, 2));
}

main().catch(console.error);
