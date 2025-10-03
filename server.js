const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

// 30 realistic paragraphs (each paragraph is 3-5 sentences)
const paragraphs = [
  "The sun dipped below the horizon, casting a golden glow over the tranquil sea. Waves lapped gently at the shore, their rhythmic sound creating a soothing melody. Seagulls soared overhead, their calls echoing in the crisp evening air.",
  "In the bustling city, neon lights flickered as night fell. The streets were alive with people hurrying to their destinations, the hum of conversation blending with the distant sound of traffic. Street vendors offered their goods, adding to the vibrant atmosphere.",
  "A lone wolf howled at the full moon, its eerie cry piercing the stillness of the forest. Shadows danced among the trees as the wind whispered through the leaves. The night was alive with the sounds of nocturnal creatures going about their business.",
  "The aroma of freshly baked bread wafted through the air, drawing people into the quaint bakery. Inside, the warm glow of the oven illuminated shelves lined with pastries and cakes. Customers chatted with the baker, savoring the comforting atmosphere.",
  "High atop the mountain, the world seemed to stretch endlessly. Snow-capped peaks pierced the sky, their majesty awe-inspiring. The air was thin and crisp, each breath a reminder of the altitude. Silence enveloped the landscape, broken only by the occasional gust of wind.",
  "The old library was a haven for book lovers. Shelves upon shelves of books lined the walls, their spines worn from years of use. The scent of aged paper filled the air, and the soft rustle of pages turning was the only sound in the room.",
  "In the heart of the jungle, the air was thick with humidity. Vibrant flowers bloomed in a riot of colors, their petals glistening with dew. The calls of exotic birds echoed through the trees, and the ground was alive with the scurrying of small creatures.",
  "The desert stretched out in all directions, a vast sea of sand. The sun blazed overhead, its heat shimmering off the dunes. Occasional cacti dotted the landscape, their spines casting long shadows. The silence was profound, broken only by the whisper of the wind.",
  "At the edge of the cliff, the view was breathtaking. Below, the river wound through the valley, its waters sparkling in the sunlight. Trees clung to the slopes, their leaves rustling in the breeze. The sky above was a brilliant blue, dotted with fluffy clouds.",
  "The old clock tower struck midnight, its chimes resonating through the quiet town. Windows were dark, and the streets were empty, save for the occasional stray cat. The air was cool, carrying the scent of pine from the nearby forest.",
  "The aroma of fresh coffee filled the café, mingling with the sweet scent of pastries. Customers sat at tables, engrossed in conversation or lost in their laptops. The barista moved swiftly behind the counter, preparing drinks with practiced ease.",
  "In the quiet meadow, wildflowers swayed gently in the breeze. Bees buzzed lazily from bloom to bloom, collecting nectar. Birds flitted from tree to tree, their songs adding a cheerful soundtrack to the peaceful scene.",
  "The city park was a hub of activity. Children played on the swings and slides, their laughter ringing through the air. Joggers circled the path, earbuds in place, while couples strolled hand in hand, enjoying the sunny afternoon.",
  "The old theater stood proudly on the corner, its marquee advertising the latest show. Inside, the velvet seats were plush, and the stage was set for the evening's performance. The smell of popcorn lingered in the air, adding to the nostalgic ambiance.",
  "On the farm, the rooster crowed at dawn, signaling the start of a new day. Cows mooed softly in the distance, and chickens clucked as they pecked at the ground. The farmer moved methodically through his chores, a routine honed by years of practice.",
  "The bustling marketplace was a sensory overload. Stalls overflowed with colorful produce, fragrant spices, and handmade goods. Vendors called out to passersby, enticing them with their wares. The air was thick with the mingling scents of food and flowers.",
  "In the quiet village, the sound of church bells ringing marked the passage of time. Cobblestone streets wound through rows of charming cottages, their gardens bursting with blooms. The community gathered regularly, fostering a strong sense of togetherness.",
  "The mountain trail was steep and challenging. Loose rocks and uneven footing tested the hikers' resolve. But the promise of a panoramic view at the summit kept them moving forward, each step bringing them closer to their goal.",
  "The ocean waves crashed against the rocks, sending sprays of salty mist into the air. Seagulls circled overhead, their calls blending with the sound of the surf. The beach was deserted, save for a lone fisherman casting his line into the water.",
  "In the dense forest, sunlight filtered through the canopy, casting dappled shadows on the forest floor. The air was cool and earthy, filled with the scent of pine and damp leaves. Small animals rustled in the underbrush, going about their daily routines.",
  "The bustling café was a favorite among locals. The barista knew most customers by name, greeting them with a smile. The menu boasted a variety of drinks and pastries, each more tempting than the last. The atmosphere was warm and inviting.",
  "At the edge of the lake, the water was calm and reflective. Tall grasses swayed gently in the breeze, their tips brushing the surface. Dragonflies darted above the water, their iridescent wings catching the sunlight.",
  "The old bridge arched gracefully over the river, its stone surface worn smooth by centuries of use. Below, the water flowed steadily, its surface reflecting the sky above. The surrounding trees stood tall, their leaves rustling softly in the wind.",
  "In the quiet library, the only sound was the turning of pages. Rows upon rows of books lined the shelves, their spines a rainbow of colors. Readers sat at tables, engrossed in their chosen volumes, lost in the worlds within.",
  "The city skyline gleamed in the setting sun, the buildings casting long shadows over the streets. Cars moved steadily along the roads, their headlights flickering on as dusk approached. The hum of urban life continued unabated.",
  "On the farm, the barn stood at the center of the property, its red paint faded by years of sun and rain. Animals moved about in their pens, and the scent of hay and earth filled the air. The farmer worked tirelessly, ensuring everything ran smoothly.",
  "The quiet beach was a haven for those seeking solitude. The sound of waves crashing against the shore was a constant companion. Seashells and driftwood littered the sand, evidence of the ocean's ever-changing nature.",
  "In the dense jungle, the air was thick with humidity and the scent of blooming flowers. Vines hung from towering trees, their leaves a vibrant green. The calls of exotic birds echoed through the foliage, adding to the symphony of jungle sounds.",
  "The old mansion stood atop the hill, its windows dark and uninviting. Ivy climbed the stone walls, and the front gate creaked in the wind. The surrounding grounds were overgrown, nature slowly reclaiming the once-grand estate.",
  "At the bustling intersection, traffic moved in a constant flow. Pedestrians hurried across the crosswalks, their faces a mix of determination and distraction. The city buzzed with energy, each person contributing to the vibrant tapestry of urban life.",
  "The quiet countryside was a patchwork of fields and forests. Birds chirped from the treetops, and the occasional rustle of leaves signaled the presence of small animals. The air was fresh and clean, carrying the scent of earth and greenery.",
  "In the heart of the city, skyscrapers reached toward the sky, their glass facades reflecting the sunlight. Streets teemed with people, each going about their business. The constant movement and noise created a dynamic urban environment.",
  "The old lighthouse stood sentinel on the rocky coastline, its light sweeping across the darkened sea. Waves crashed against the shore, sending sprays of foam into the air. The beam of the lighthouse cut through the night, guiding ships safely.",
  "On the farm, the orchard was heavy with fruit. Apples, pears, and peaches hung from the branches, ripe for picking. The farmer moved through the rows, gathering the harvest, his basket filling steadily.",
  "The mountain pass was narrow and winding, carved into the steep slopes. Snow clung to the edges, and the air was thin and crisp. The journey was arduous, but the promise of breathtaking views kept travelers moving forward.",
  "The city park was a haven for relaxation. Benches lined the pathways, and fountains provided a soothing soundtrack. Children played on the playground, their laughter ringing through the air. Joggers circled the track, earbuds in place.",
  "In the quiet village, the bakery was a popular spot. The smell of freshly baked bread and pastries wafted through the air, drawing customers in. Inside, the display cases were filled with tempting treats, each more delicious than the last.",
  "The dense forest was alive with activity. Birds flitted from tree to tree, their songs adding to the symphony of nature. Squirrels scurried along the ground, gathering food for the coming winter. The air was cool and earthy.",
  "At the edge of the canyon, the view was awe-inspiring. The vast expanse of rock and sky stretched out before the observer. The wind howled through the gorge, and the sound of distant waterfalls echoed in the distance.",
  "The old mill stood beside the river, its wheel turning steadily in the current. The sound of water rushing over the wheel was a constant companion. The surrounding area was peaceful, with only the occasional chirp of a bird breaking the silence.",
  "In the quiet town, the diner was a gathering place. Locals sat at the counter, chatting with the staff and each other. The smell of sizzling bacon and brewing coffee filled the air, creating a welcoming atmosphere.",
  "The city streets were lined with trees, their leaves a vibrant green. Sidewalk cafes spilled out onto the walkways, offering refreshments to passersby. The hum of conversation blended with the sounds of traffic, creating a lively urban environment.",
  "On the farm, the vegetable garden was thriving. Rows of tomatoes, cucumbers, and carrots grew in neat lines. The farmer tended to each plant, ensuring they received the care they needed to flourish.",
  "The quiet beach was a perfect spot for reflection. The gentle sound of waves lapping at the shore provided a calming backdrop. Seashells and driftwood littered the sand, evidence of the ocean's ever-changing nature.",
  "In the dense jungle, the air was thick with humidity. Vines hung from towering trees, and the ground was soft with decaying leaves. The ground was soft with decaying leaves. The calls of unseen creatures echoed through the foliage, creating a mysterious symphony. Sunlight filtered through the thick canopy, casting dappled patterns on the forest floor, while insects buzzed lazily around flowering plants.",
  "The historic cathedral loomed over the city square, its spires reaching toward the heavens. Inside, stained glass windows painted the interior with vibrant colors, while the scent of incense lingered. Visitors whispered in awe, admiring the intricate architecture and ancient carvings.",
  "At the serene lake, the water reflected the sky like a giant mirror. Ducks glided across the surface, leaving gentle ripples behind. Reeds swayed in the breeze, and dragonflies skimmed the water, their iridescent wings shimmering in the sunlight.",
  "The bustling market was alive with energy, colors, and smells. Stalls overflowed with fruits, spices, and handcrafted goods. Shoppers haggled with vendors, children ran between tables laughing, and street musicians played lively tunes, adding rhythm to the vibrant atmosphere.",
  "On the windswept prairie, wildflowers dotted the rolling hills with bursts of color. The tall grasses swayed rhythmically under the steady breeze. Birds soared above, and the distant hum of insects completed the peaceful yet dynamic landscape of nature's vast expanse.",
  "In the quiet study, books covered every wall from floor to ceiling. The scent of old paper and leather filled the air. A single lamp illuminated a wooden desk where papers were neatly stacked, offering a tranquil atmosphere for deep thought and reflection.",
  "The mountain waterfall tumbled into a crystal-clear pool below, sending up sprays of mist that sparkled in the sunlight. The roar of cascading water echoed through the valley, while moss-covered rocks and lush vegetation framed the stunning natural display.",
  "Along the cobblestone streets, quaint houses lined the alleys with their pastel facades. Flower boxes overflowed with blooms, and the chatter of neighbors mingled with the clatter of carts. The atmosphere exuded charm and a timeless, storybook-like quality.",
  "In the ancient ruins, crumbling stone walls told stories of centuries past. Vines crept along the remnants of buildings, and the wind whispered through empty doorways. Sunlight created sharp contrasts between shadows and illuminated surfaces, highlighting the textures of decay.",
  "The desert sunset painted the sky in brilliant hues of orange, pink, and purple. Silhouettes of cacti and distant mountains created a dramatic foreground. The heat of the day faded into a cool evening, and the first stars began to appear, twinkling in the vast sky.",
  "At the coastal cliffs, waves crashed against jagged rocks below, sending white spray into the air. Seabirds circled in the wind, calling to each other. The salty breeze carried the scent of the ocean, invigorating and fresh, as the sun slowly set over the horizon.",
  "The crowded train station buzzed with movement. Commuters hurried to catch their trains, suitcases rolling over the tiled floors. Announcements echoed overhead, mingling with the sound of conversations, footsteps, and the occasional train whistle. The energy was palpable and relentless.",
  "In the botanical garden, rare plants from around the world thrived in carefully maintained habitats. Colorful flowers attracted bees and butterflies, while fountains created gentle sounds of flowing water. Paths meandered through themed sections, offering visitors a peaceful retreat into nature.",
  "The small village square hosted a weekly festival. Stalls sold handmade crafts, local delicacies, and fragrant herbs. Children ran and played, musicians entertained, and the scent of roasted food filled the air. The entire community gathered, celebrating traditions and togetherness.",
  "Inside the old ship, creaking wooden beams told tales of countless voyages. Nets hung from the walls, and maps were pinned to the cabin. The smell of salt and wood mingled, reminding visitors of the long journeys across stormy seas and distant lands.",
  "In the quiet cemetery, rows of weathered tombstones stood under ancient oak trees. Birds chirped softly, and a gentle wind rustled leaves across the paths. Sunlight broke through clouds, casting solemn yet peaceful shadows over the resting places.",
  "The mountain village was nestled in a valley surrounded by towering peaks. Smoke curled from chimneys, signaling fires lit in cozy homes. Narrow paths wound through stone houses, gardens, and terraces, creating a harmonious blend of nature and human habitation.",
  "Along the riverbank, willows dipped their branches into the flowing water. Children skipped stones, and the distant hum of life in the town added background noise. Ducks and swans swam gracefully, and the reflections of clouds painted the surface with fleeting patterns.",
  "In the bustling airport terminal, travelers moved quickly between gates, luggage in tow. Screens displayed flight information, and announcements echoed through the hall. Families hugged, businesspeople typed on laptops, and the air was filled with a mix of excitement and impatience.",
  "The hidden waterfall deep in the jungle revealed a secret oasis. Ferns and moss covered nearby rocks, and exotic flowers added bursts of color. The sound of water created a soothing melody, and sunlight filtered through the dense canopy, creating shimmering patterns in the pool below."
];


// Endpoint to get random paragraph
app.get("/paragraph", (req, res) => {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  res.json({ text: paragraphs[randomIndex] });
});

// Start server
app.listen(port, () => {
  console.log(`Typing API running at http://localhost:${port}`);
});
