import fs from 'fs';

const A = '../../assets/projects';

const P = [
{
  slug:'rose-lady', title:'Rose Lady', cat:'Illustration', order:1, feat:true, tags:['Photoshop','Illustrator'], year:2020,
  coverAlt:'Negative-space illustration of an elegant woman in a flowing black gown, the skirt swirling into rose-like leaf shapes on a grey background',
  details:[
    ['detail-01.jpg','Full-length negative-space illustration of a woman in a flowing gown, signed Rpm'],
    ['detail-02.jpg','Close crop of the Rose Lady artwork showing the swirling leaf folds of the skirt'],
    ['detail-03.jpg','Alternate framing of the Rose Lady silhouette illustration']],
  body:`## Problem

Rose Lady began as a self-directed study: could a single flat silhouette carry both a human figure and a flower at the same time, using nothing but black ink and the empty space around it?

## Approach

The whole piece is built from one solid shape. The woman's profile and gown are carved out of a dark mass, and the skirt dissolves into swirling folds that curl like rose petals at the base. No gradients, no texture — the drawing works entirely on silhouette and the negative space between the folds.

## Outcome

The finished artwork reads as a fashion silhouette from a distance and as an abstract rose up close. It became one of the most appreciated pieces on the Behance profile and sets the tone for the rest of the negative-space portrait work.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'this-city-is-ours', title:'This City is Ours', cat:'Illustration', order:2, feat:true, tags:['Illustrator','Photoshop'], year:2020,
  coverAlt:'Bengali hand-lettered typography reading "Ei shohor tomar ar amar" (This city is yours and mine) in black on a vivid red background, with a small silhouetted couple walking along a stroke of the lettering',
  details:[
    ['detail-01.jpg','Alternate view of the red Bengali lettering composition'],
    ['detail-02.jpg','Detail of the Bengali type and couple silhouette'],
    ['detail-03.jpg','Full artwork of the This City is Ours lettering piece']],
  body:`## Problem

"This City is Ours" is a lettering poster built around the Bengali phrase "Ei shohor tomar ar amar" — this city is yours and mine — and the phrase needed to work as an image, not just as text.

## Approach

The phrase is hand-lettered vertically in black against a saturated red field, and the words themselves become the scene: a tiny silhouetted couple walks hand-in-hand along one long swash, so the lettering and the story share the same stroke.

## Outcome

The result is a one-colour poster where the type is the illustration — a statement piece that also shows a different side of the portfolio from the portrait and mascot work.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'leafiesta-logo', title:'Leafiesta logo', cat:'Branding', order:3, feat:true, tags:['Illustrator','Photoshop'], year:2019,
  coverAlt:'Letterpress-style presentation of the Leafiesta logo: a fox formed from sweeping leaf shapes, embossed in black on textured white paper',
  details:[
    ['detail-01.jpg','Flat version of the Leafiesta leaf-fox logo mark'],
    ['detail-02.jpg','Leafiesta logo presented on a light background'],
    ['detail-03.jpg','Alternate colour presentation of the Leafiesta mark']],
  body:`## Problem

Leafiesta needed a logo that fused two ideas — a fox and foliage — into one compact mark that would survive at icon size.

## Approach

The mark is drawn as a single flowing creature: the fox's ears, snout and tail are shaped from overlapping leaves, with one small leaf breaking away from the tail. The line work stays bold and closed so the silhouette stays readable small, and the artwork is shown off in embossed paper and flat presentations.

## Outcome

The result is a flexible mark that works both as a leaf-first nature brand and as an animal mascot, demonstrated across mockups showing how it would emboss onto stationery.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'red-girl', title:'RED GIRL', cat:'Illustration', order:5, feat:false, tags:null, year:2020,
  coverAlt:'Two red postcards printed with a bold vector portrait of a woman with dark hair, red lips and a white face patch, photographed on a grey surface',
  details:[
    ['detail-01.jpg','The RED GIRL vector portrait artwork'],
    ['detail-02.jpg','Close view of the RED GIRL portrait print'],
    ['detail-03.jpg','Tall-format crop of the RED GIRL portrait']],
  body:`## Problem

RED GIRL is a vector portrait study: reduce a woman's face to a handful of hard-edged shapes and let one aggressive colour carry the mood.

## Approach

The portrait uses a strict palette — red, near-black and one white highlight patch for the face. Hair strands are drawn as sweeping black ribbons, and the print is presented on red cards shot at an angle to show how the artwork holds up as a physical print.

## Outcome

The finished piece works both as a screen illustration and as a print-ready card design, and it anchors the red-on-black strand of the portrait work.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'bad-boy', title:'Bad boy', cat:'Illustration', order:10, feat:false, tags:['Illustrator'], year:2020,
  coverAlt:'Flat cartoon portrait of a smirking young man with blue skin, slicked black hair and ear studs, drawn with thick black outlines on white',
  details:[
    ['detail-01.jpg','Full Bad boy cartoon character artwork'],
    ['detail-02.jpg','Close crop of the Bad boy character face'],
    ['detail-03.jpg','Alternate framing of the Bad boy character']],
  body:`## Problem

"Bad boy" is a character-design exercise: build a confident, slightly mischievous mascot-style face with the smallest possible set of shapes.

## Approach

The character is drawn flat — teal skin, jet-black pompadour, half-lidded eyes and a smirk, with stud earrings as the only accessory. Every form is a closed vector shape with a heavy black outline, so the character stays crisp at any size.

## Outcome

The result is a repeatable character face that could extend into a full sticker or avatar set, and it rounds out the flat-portrait series alongside Swag Lady and RED GIRL.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'zews-logo', title:'Zews logo', cat:'Branding', order:4, feat:true, tags:['Illustrator','Photoshop'], year:2020,
  coverAlt:"White-on-black Zews logo mark: an intense bearded man's face where hair and beard are drawn as licking flames",
  details:[
    ['detail-01.jpg','Zews logo mark reversed in black on white'],
    ['detail-02.jpg','Zews logo shown small against a light background'],
    ['detail-03.jpg','Alternate presentation of the Zews mark']],
  body:`## Problem

Zews needed a mark built around intensity — something that read as a face first and as fire second, and worked in a single colour.

## Approach

The solution is a bearded man whose hair and beard are carved from flame shapes, all locked inside a compact oval silhouette. The mark is designed as a one-colour knockout so it can be reversed white-on-black or black-on-white without redrawing.

## Outcome

The finished mark scales cleanly from avatar to signage, and the white-on-black presentation gives the brand a heavy, high-contrast identity from day one.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'swag-lady', title:'Swag Lady', cat:'Illustration', order:8, feat:false, tags:['Illustrator','Photoshop'], year:2020,
  coverAlt:'Flat illustration of a woman with huge black hair and round sunglasses on a bright red background, described by the artist as made mostly for a clothing brand',
  details:[
    ['detail-01.jpg','Swag Lady illustration artwork'],
    ['detail-02.jpg','Close crop of the Swag Lady portrait'],
    ['detail-03.jpg','Alternate framing of the Swag Lady illustration']],
  body:`## Problem

Swag Lady was drawn mostly for a clothing brand — a graphic that could sit on a tee or hoodie and still read instantly from across the street.

## Approach

The face is reduced to three shapes: a huge sweeping mass of black hair, round sunglasses, and red skin that matches the background so the figure is defined purely by the hair's outline. The attitude does the branding.

## Outcome

The result is a bold one-colour-ready graphic with clear apparel potential, and a sibling piece to the other flat portraits in the series.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'foxer-logo', title:'Foxer logo', cat:'Branding', order:9, feat:false, tags:['Photoshop','Illustrator'], year:2020,
  coverAlt:'Orange fox head logo peeking out of a black triangle frame on a grey background',
  details:[
    ['detail-01.jpg','Foxer fox logo artwork'],
    ['detail-02.jpg','Close view of the Foxer mark'],
    ['detail-03.jpg','Alternate presentation of the Foxer logo']],
  body:`## Problem

Foxer needed a friendly, geometric fox mark that could live inside a simple frame and stay legible as an app icon.

## Approach

The fox head is drawn in flat orange with a brown shadow side and sharp angular fur cuts, tucked into a rotated black triangle that doubles as the negative space around the muzzle. Everything is hard-edged so the mark reproduces cleanly in one colour.

## Outcome

The finished logo works as a contained icon and as a standalone mascot, demonstrated across colour and reversed presentations.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'flower-with-a-girl', title:'Flower with a girl', cat:'Illustration', order:12, feat:false, tags:['Photoshop','Illustrator'], year:2020,
  coverAlt:"Hot-pink flat illustration of a sleeping girl's face cradled by a large blooming flower on black",
  details:[
    ['detail-01.jpg','Full Flower with a girl artwork']],
  body:`## Problem

This piece merges a portrait and a blossom into a single glyph: a girl whose hair grows into the petals of the flower above her.

## Approach

Everything is cut from one hot-pink shape on black. The girl's closed eye and smile are the only interior lines, and the flower's petals, stamens and falling leaves fill the upper half, so the negative space does the drawing.

## Outcome

The result is a compact decorative mark that reads as a girl, a flower, or both — suited to beauty or wellness branding.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'sparrow', title:'Sparrow', cat:'Illustration', order:6, feat:false, tags:['Photoshop'], year:2020,
  coverAlt:'Geometric low-poly blue hummingbird-like sparrow in flight on a black background',
  details:[
    ['detail-01.jpg','Sparrow geometric bird artwork'],
    ['detail-02.jpg','Embossed print of the Sparrow mark on white paper'],
    ['detail-03.jpg','Alternate presentation of the Sparrow bird']],
  body:`## Problem

Sparrow is a study in building a bird entirely from flat triangles while keeping the motion of a real bird in flight.

## Approach

The bird is faceted into angular planes of cyan and steel blue — bright facets on the wing, darker ones on the body — diving with wings swept back against a dark swirl background. The palette is limited to two blues so the geometry stays clean.

## Outcome

The finished piece works as a poster illustration and as a logo-ready mark, shown both flat and embossed on paper.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'midnight-owl', title:'Midnight Owl', cat:'Illustration', order:7, feat:false, tags:['Photoshop'], year:2020,
  coverAlt:'An owl face built entirely from white and gold leaf shapes, framed by laurel branches, on black',
  details:[
    ['detail-01.jpg','Monochrome metallic rendition of the Midnight Owl leaf emblem'],
    ['detail-02.jpg','Midnight Owl leaf illustration artwork'],
    ['detail-03.jpg','Alternate colourway of the Midnight Owl emblem']],
  body:`## Problem

Midnight Owl had to turn a nocturnal bird into an emblem without drawing a single feather — the bird had to be made of something else entirely.

## Approach

Every part of the owl — crest, brow, eyes, beak and breast — is composed from individual leaf shapes, with golden leaves reserved for the eyes and the laurel branches that frame the head. The strict black background keeps the emblem feeling like a crest.

## Outcome

The result is a heraldic emblem that reads equally as owl or bouquet, shown across gold-and-white and full-monochrome colourways.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'depict-joker', title:'Depict Joker', cat:'Illustration', order:11, feat:false, tags:['Photoshop'], year:2020,
  coverAlt:"Cartoon illustration of the Joker's grinning face with slicked black hair and a white streak, on a blue gradient background",
  details:[
    ['detail-01.jpg','Portrait-crop version of the Depict Joker illustration']],
  body:`## Problem

Depict Joker is a fan-art caricature: capture the character's menace in one exaggerated expression rather than a full scene.

## Approach

The head is drawn in a bold cartoon style — elongated grin, bared teeth, one arched brow — with a slicked black hairstyle pierced by a single white streak. A plain blue gradient keeps all attention on the face.

## Outcome

The finished caricature sits comfortably in the flat-character family of the portfolio and shows the same shapes-first approach applied to a licensed character.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'online-store-flyer', title:'Online store flyer', cat:'Print', order:16, feat:false, tags:['Illustrator','Photoshop'], year:2020,
  coverAlt:'Stacked square flyers for an online store promotion: a smiling red-haired shopper holding bags and like icons, on teal and grey shapes, advertising up to 20% off',
  details:[
    ['detail-01.jpg','Online store flyer layout artwork'],
    ['detail-02.jpg','Detail of the online store flyer typography'],
    ['detail-03.jpg','Alternate spread of the online store flyer design']],
  body:`## Problem

The Online Store Flyer is a retail promo template: announce a store launch and an up-to-20%-off deal on one printable square flyer.

## Approach

The design pairs a bright teal-and-grey shape system with a lifestyle photo of a shopper holding shopping bags and social "like" icons. The offer is set in a stacked headline — NEW / ONLINE STORE / up to 20% OFF — with placeholder web and social lines along the base so the layout can be re-skinned for any shop.

## Outcome

The result is a print-ready square flyer template with clearly swappable photo, logo and offer zones.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'pizza-flyer', title:'Pizza Flyer', cat:'Print', order:14, feat:true, tags:['Illustrator','Photoshop'], year:2020,
  coverAlt:'Stacked dark flyers for a pizzeria: an overhead photo of a sliced pepperoni pizza and a red Pizza Friday 2x1 offer headline on near-black panels',
  details:[
    ['detail-01.jpg','Pizza Friday flyer photographed on a dark wooden table'],
    ['detail-02.jpg','Front face of the Pizza Friday flyer design'],
    ['detail-03.jpg','Back and detail views of the pizza flyer layout']],
  body:`## Problem

Pizza Friday needed to shout one offer — 2x1, pay one eat two — for a neighbourhood Italian restaurant, in a way that felt premium rather than discount-bin.

## Approach

The layout inverts the usual fast-food flyer: a near-black canvas, a blood-red serif headline and an appetising overhead shot of a sliced pepperoni pizza breaking the panel edge. Ristorante branding, the "La Vera Cucina Italian Food" ribbon and social icons sit quietly at the edges.

## Outcome

The result is a moody, print-ready square flyer where the food photography does the selling and the offer stays unmistakable.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'food-flyer', title:'Food flyer', cat:'Print', order:18, feat:false, tags:null, year:2020,
  coverAlt:'A4 flyer on a green background advertising healthy food: a vivid salad photo behind a white FOOD headline, a curled page corner and a 30% off sale badge',
  details:[
    ['detail-01.jpg','Healthy food flyer design, front and rolled side view']],
  body:`## Problem

A healthy-food promo flyer: make fresh salad photography the hero while still carrying a 30%-off sale message and contact details.

## Approach

The design uses a two-tone dark-and-green panel system with a full-bleed salad photo behind a stacked FOOD / Healthy headline, a curled-page graphic to add depth, and a circular 30% OFF badge plus delivery call-out in the corners.

## Outcome

The result is a print-ready A4 flyer template that balances appetite appeal with a clear promotional message.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'corporate-design', title:'Corporate Design', cat:'Print', order:17, feat:false, tags:['Illustrator','Photoshop'], year:2020,
  coverAlt:'A4/A5 corporate seminar flyer on an orange background: a meeting-room photo inside a fluid white shape, with the headline Seminar for Your Own Business',
  details:[
    ['detail-01.jpg','Corporate seminar flyer presented flat with rolled edge']],
  body:`## Problem

A corporate conference flyer — the artist's own description — that had to look professional enough for a business audience while staying energetic.

## Approach

An orange-driven palette frames an A4 layout where a fluid white and peach shape wraps around a business-meeting photo. The "Seminar for Your Own Business" headline, date, time and venue block are laid out in a clean hierarchy, with A4/A5 print-ready sizing noted on the presentation.

## Outcome

The result is a versatile corporate flyer template that can be re-skinned for any seminar or conference program.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'birthday-invitation-card', title:'Birthday Invitation Card', cat:'Print', order:20, feat:false, tags:['Photoshop'], year:2020,
  coverAlt:"Landscape 25th birthday invitation card on a tufted white and silver backdrop: silver balloons, a chandelier and elegant script reading A'armani Jay",
  details:[
    ['detail-01.jpg','Birthday invitation card design shown with gold envelope']],
  body:`## Problem

A 25th-birthday club invitation that needed to feel like a luxury event ticket rather than a party-store card.

## Approach

The card is set on a quilted white-leather backdrop with silver balloons, a crystal chandelier and silver confetti. A circular "CLUB 25" badge carries the date, and the guest of honour's name is set in sweeping black script, with a row of luxury-brand marks along the base to underline the dress-code mood.

## Outcome

The result is a print-ready invitation that photographs like an actual event piece, complete with envelope styling.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'fashion-flyer', title:'Fashion Flyer', cat:'Print', order:19, feat:false, tags:null, year:2020,
  coverAlt:'Stacked square fashion flyers: a male model in a mustard suit on a split yellow-and-black layout with a Brand Fashion Flyer headline',
  details:[
    ['detail-01.jpg','Fashion flyer layout with model photography'],
    ['detail-02.jpg','Detail of the fashion flyer typography'],
    ['detail-03.jpg','Alternate view of the fashion flyer stack']],
  body:`## Problem

A fashion flyer design — per the artist's description — that had to put a garment-forward photo first while carrying headline and body copy without clutter.

## Approach

The layout is split diagonally: a mustard-yellow field with a male model in a matching suit, cut against a textured black panel that holds the BRAND / FASHION FLYER headline in yellow. Social icons and a website line anchor the base.

## Outcome

The result is a print-ready square flyer template with a clear photo zone and a two-tone system that suits any apparel brand.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'quarantine-flyer', title:'Quarantine flyer', cat:'Print', order:21, feat:false, tags:['Illustrator','Photoshop'], year:2020,
  coverAlt:'Stacked square flyers with a navy doodle pattern and a Cook at Home headline, framing a photo of a couple cooking together in a kitchen',
  details:[
    ['detail-01.jpg','Cook at Home flyer layout artwork'],
    ['detail-02.jpg','Detail of the quarantine flyer typography'],
    ['detail-03.jpg','Alternate spread of the quarantine flyer design']],
  body:`## Problem

During the 2020 lockdowns, this piece — captioned "Stay at home and cook" on Behance — needed to turn staying in into something warm and social rather than grim.

## Approach

A deep navy square flyer is covered in hand-drawn food doodles, with a fluid teal blob carrying the COOK AT HOME headline. A rounded photo frame holds a couple laughing over a chopping board, and social icons and placeholder text slots finish the layout.

## Outcome

The result is a friendly, print-ready flyer template built around the stay-at-home moment, easily re-skinned for cooking classes or food delivery brands.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'christmas-sale', title:'Christmas sale', cat:'Print', order:13, feat:true, tags:['Photoshop','Illustrator'], year:2020,
  coverAlt:'Tall Christmas sale poster on a yellow background: a decorated tree with red baubles and percentage gift tags beside a red panel reading Christmas Sale, up to 70% off',
  details:[
    ['detail-01.jpg','Christmas sale poster mockup on a yellow backdrop'],
    ['detail-02.jpg','Detail of the Christmas sale typography and tree'],
    ['detail-03.jpg','Alternate view of the Christmas sale poster']],
  body:`## Problem

A Christmas retail promo had to stack three offers — 30%, 50% and up to 70% off — without turning the poster into a wall of numbers.

## Approach

The poster splits vertically: a red gradient panel carries the scripted "Christmas" over a bold SALE headline and the "Up to 70% off / Limited Time Dec 20-24" call-out, while a decorated tree with red baubles fills the other side. The discounts are printed as hanging white gift tags scattered through the branches, so the offers feel like part of the decor.

## Outcome

The result is a festive, print-ready sale poster where the discount tiers are the decoration — one of the most complete multi-image pieces on the profile.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'restaurant-flyer', title:'Restaurant Flyer', cat:'Print', order:15, feat:false, tags:['Photoshop','Illustrator'], year:2020,
  coverAlt:"Stacked flyers for Shera Tong's Dum Biriyani: a dark layout with an overhead shot of chicken biriyani with a boiled egg, priced at BDT 249",
  details:[
    ['detail-01.jpg','Dum Biriyani flyer layout, front and back']],
  body:`## Problem

A local Bangladeshi restaurant flyer for Shera Tong's Dum Biriyani: make one dish photo sell a fixed-price meal at a glance.

## Approach

A dark, appetising backdrop frames an overhead shot of the biriyani — chicken leg, boiled egg, fragrant rice — with the dish name in white-and-orange script, the ingredient list beneath it, and the @BDT 249 price in an orange pill. Branding for the restaurant sits in the top corner.

## Outcome

The result is a print-ready flyer where price, dish and brand each get exactly one visual anchor.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'event-flyer', title:'Event Flyer', cat:'Print', order:22, feat:false, tags:['Illustrator','Photoshop'], year:2020,
  coverAlt:'Stacked event flyers for "The Opening" virtual summer white party: a halftone black-and-white portrait of a woman with gold Black Greek Ink branding and the line Be There, Be Chic',
  details:[
    ['detail-01.jpg','The Opening event flyer layout, front and back']],
  body:`## Problem

An event flyer for "The Opening", a virtual summer white party presented by Black Greek Ink — the piece needed club-flyer glamour without becoming unreadable.

## Approach

A light, almost-white canvas carries a halftone black-and-white portrait of a model with a statement earring, washed with soft light streaks. Gold foil-style "BG Black Greek Ink Presents" branding sits at the top, "Be There / Be Chic!" in spaced chrome type, and "The Opening" in a silver script over the subtitle.

## Outcome

The result is a print-ready white-party flyer that reads as premium event branding rather than a generic club handout.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
{
  slug:'sale-flyer', title:'Sale flyer', cat:'Print', order:23, feat:false, tags:['Photoshop','Illustrator'], year:2020,
  coverAlt:'Stacked pink sale flyers for Oh Just Us Girls Mobile: a $5 Blow Out Sale headline, cartoon shopping girls and the line Out With The Old In With The New',
  details:[
    ['detail-01.jpg','$5 Blow Out Sale flyer layout, front and back'],
    ['detail-02.jpg','Square crop of the sale flyer design']],
  body:`## Problem

A one-day clearance flyer for Oh Just Us Girls Mobile — the "$5 Blow Out Sale" needed to read instantly from a distance while keeping a fun, boutique feel.

## Approach

A soft pink layout is decorated with cartoon shopping-girl illustrations and silhouettes, with the "$5 BLOW OUT SALE" price set huge inside a hexagonal badge. "Out With The Old In With The New", the one-day-only note and the under-the-tent shopping details stack alongside it.

## Outcome

The result is a print-ready boutique sale flyer with a clear price hierarchy and playful, on-brand decoration.
<!-- DRAFT: thin source material — Rupom should enrich -->`
},
];

function fm(slug,p){
  const lines=[];
  lines.push(`title: "${p.title.replace(/"/g,'\\"')}"`);
  lines.push(`category: "${p.cat}"`);
  lines.push(`year: ${p.year}`);
  lines.push(`cover: "${A}/${slug}/cover.jpg"`);
  lines.push(`coverAlt: "${p.coverAlt.replace(/"/g,'\\"')}"`);
  lines.push('status: published');
  lines.push(`featured: ${p.feat}`);
  if(p.tags) lines.push(`tags: [${p.tags.map(t=>`"${t}"`).join(', ')}]`);
  lines.push(`order: ${p.order}`);
  const imgs=p.details.map(([f,alt])=>`  - src: "${A}/${slug}/${f}"\n    alt: "${alt.replace(/"/g,'\\"')}"`).join('\n');
  lines.push('images:');
  lines.push(imgs);
  return lines.join('\n');
}

let count=0;
const orders=new Set();
for(const p of P){
  if(orders.has(p.order)) throw new Error('duplicate order '+p.order);
  orders.add(p.order);
  const md=`---\n${fm(p.slug,p)}\n---\n\n${p.body}\n`;
  fs.writeFileSync(`src/content/projects/${p.slug}.md`,md);
  count++;
}
console.log('wrote',count);
