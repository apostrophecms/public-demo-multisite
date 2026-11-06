// Linden Valley: a long-established rural association of orchard owners and
// sideliners. The default profile (`--profile=linden`).
//
// A profile is the sample association as data. Its functions take the
// populate task's context: `name`, `images` (image pieces by key, see
// images/credits.json), `h` (area and widget builders from ../../index.js),
// `date(days)` and `year(years)` relative to today, and whatever earlier
// steps inserted (`authors`, `categories`, `members`, `pages`,
// `checklist`).
//
// People, places, phone numbers (555-01xx) and email addresses (example.org)
// are fictional.

import seasonalTasks from '../../../../lib/seasonalTasks.js';

// The photos this association uses, by key in images/credits.json. Only these
// are uploaded, and only these appear on its photo credits page.
const images = [
  'hives-meadow', 'apiary-field', 'heather-hives', 'bee-quince', 'bee-pink-flower',
  'bee-lavender', 'beekeeper-frame', 'inspecting-frame', 'smoker', 'honey-cells',
  'honeycomb', 'brood-eggs', 'pollen-cells', 'honey-show-jars', 'honey-jars',
  'honey-pouring', 'marked-queen', 'capped-frame', 'beeswax-candle', 'wildflowers',
  'skeps', 'swarm', 'winter-hives', 'varroa'
];

function global({ name }) {
  return {
    siteTitle: name,
    tagline: 'Helping bees and beekeepers thrive across the valley since 1952.',
    founded: 1952,
    contactEmail: 'hello@example.org',
    contactPhone: '(610) 555-0142',
    swarmHotline: '(610) 555-0199',
    mailingAddress: `${name}\nThe Grange Hall, 14 Orchard Lane\nLinden Valley, PA 19000`,
    legalNote: 'A volunteer-run nonprofit.',
    socialLinks: [
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/'
      },
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/'
      },
      {
        platform: 'Newsletter',
        url: 'https://example.org/newsletter'
      }
    ]
  };
}

function authors() {
  return [
    {
      key: 'margaret',
      title: 'Margaret Okafor'
    },
    {
      key: 'tom',
      title: 'Tom Lindqvist'
    },
    {
      key: 'priya',
      title: 'Priya Raman'
    }
  ];
}

function categories() {
  return [
    {
      key: 'news',
      title: 'Association news'
    },
    {
      key: 'tips',
      title: 'Beekeeping tips'
    },
    {
      key: 'show',
      title: 'Honey show'
    }
  ];
}

function members({ h, year }) {
  const bio = (...paragraphs) => h.area(h.rt(paragraphs.map((p) => `<p>${p}</p>`).join('')));
  return [
    {
      key: 'margaret',
      title: 'Margaret Okafor',
      town: 'Linden Valley',
      membershipType: 'full',
      memberSince: 1998,
      beekeepingSince: 1994,
      colonies: 12,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'mentor', 'honeySeller' ],
      honeyNote: 'Wildflower and fall goldenrod honey, cut comb in summer. Sold from the farm stand on Orchard Lane, Saturdays.',
      committeeRole: 'Chair',
      committeeOrder: 1,
      bio: bio(
        'Margaret started with a single hive in her back garden and now runs a dozen colonies on the family orchard. She has chaired the association since 2015.',
        'Ask her about queen rearing, or about the year a swarm moved into the farm mailbox.'
      )
    },
    {
      key: 'tom',
      title: 'Tom Lindqvist',
      town: 'Millbrook',
      membershipType: 'full',
      memberSince: 2011,
      beekeepingSince: 2009,
      colonies: 6,
      hiveTypes: [ 'langstroth', 'warre' ],
      roles: [ 'mentor', 'swarmCollector' ],
      swarmArea: 'Millbrook, Eastbridge',
      swarmPhone: '(610) 555-0117',
      committeeRole: 'Education Officer',
      committeeOrder: 4,
      bio: bio('Tom runs our beginners\' course and the Saturday sessions at the teaching apiary. He keeps Langstroth and Warré hives side by side and will happily tell you which he prefers, depending on the day.')
    },
    {
      key: 'priya',
      title: 'Priya Raman',
      town: 'Cedar Hollow',
      membershipType: 'full',
      memberSince: 2016,
      beekeepingSince: 2016,
      colonies: 4,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'mentor' ],
      committeeRole: 'Secretary',
      committeeOrder: 2,
      bio: bio('Priya edits the newsletter and keeps four colonies on a rooftop in Cedar Hollow. She is our go-to for questions about varroa monitoring and keeping good records.')
    },
    {
      key: 'dan',
      title: 'Dan Whitcombe',
      town: 'Ashford Mills',
      membershipType: 'full',
      memberSince: 2005,
      beekeepingSince: 2001,
      colonies: 20,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'honeySeller', 'swarmCollector' ],
      swarmArea: 'Ashford Mills, Willow Bend',
      swarmPhone: '(610) 555-0123',
      honeyNote: 'Clover and basswood honey by the jar or the gallon. Also beeswax blocks. Call ahead, or find him at the Ashford Mills farmers\' market.',
      committeeRole: 'Treasurer',
      committeeOrder: 3,
      bio: bio('Dan is a sideliner with twenty colonies spread across three farms. He judges at regional honey shows and has the ribbons to prove it.')
    },
    {
      key: 'rosa',
      title: 'Rosa Delgado',
      town: 'Fox Run',
      membershipType: 'full',
      memberSince: 2014,
      beekeepingSince: 2012,
      colonies: 8,
      hiveTypes: [ 'langstroth', 'topBar' ],
      roles: [ 'swarmCollector', 'mentor' ],
      swarmArea: 'Fox Run, Linden Valley',
      swarmPhone: '(610) 555-0131',
      committeeRole: 'Swarm Coordinator',
      committeeOrder: 5,
      bio: bio('Rosa coordinates our swarm collection volunteers each spring. If you call the hotline in May, there is a good chance she answers.')
    },
    {
      key: 'walter',
      title: 'Walter Brennan-Hughes',
      town: 'Eastbridge',
      membershipType: 'honorary',
      memberSince: 1971,
      beekeepingSince: 1966,
      colonies: 2,
      hiveTypes: [ 'langstroth', 'observation' ],
      roles: [ 'mentor' ],
      committeeRole: 'Apiary Manager',
      committeeOrder: 6,
      bio: bio('Walter has looked after the association\'s teaching apiary for longer than most members have been keeping bees. His observation hive is the star of every county fair.')
    },
    {
      key: 'hannah',
      title: 'Hannah Kowalczyk',
      town: 'Millbrook',
      membershipType: 'family',
      memberSince: 2021,
      beekeepingSince: 2021,
      colonies: 3,
      hiveTypes: [ 'flow' ],
      roles: [ 'honeySeller' ],
      honeyNote: 'Small batches of spring honey from Millbrook. Order by email through the association.',
      bio: bio('Hannah keeps bees with her two children, who are in charge of naming the queens.')
    },
    {
      key: 'james',
      title: 'James Achebe',
      town: 'Willow Bend',
      membershipType: 'full',
      memberSince: 2019,
      beekeepingSince: 2018,
      colonies: 5,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'swarmCollector' ],
      swarmArea: 'Willow Bend',
      swarmPhone: '(610) 555-0146',
      bio: bio('James caught his first swarm from the hotline list in 2019 and has been collecting them ever since.')
    },
    {
      key: 'eleanor',
      title: 'Eleanor Marsh',
      town: 'Linden Valley',
      membershipType: 'full',
      memberSince: year(-1),
      beekeepingSince: year(-1),
      colonies: 1,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'newBeekeeper' ],
      bio: bio('Eleanor took the beginners\' course last spring and her first colony came through its first summer strong.')
    },
    {
      key: 'sam',
      title: 'Sam Oduya',
      town: 'Cedar Hollow',
      membershipType: 'junior',
      memberSince: year(-1),
      beekeepingSince: year(0),
      colonies: 0,
      roles: [ 'newBeekeeper' ],
      bio: bio('Sam is our youngest member and helps out at the teaching apiary most Saturdays.')
    },
    {
      key: 'grace',
      title: 'Grace Fontaine',
      town: 'Ashford Mills',
      membershipType: 'full',
      memberSince: 2010,
      beekeepingSince: 2008,
      colonies: 7,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'honeySeller', 'mentor' ],
      honeyNote: 'Creamed honey and beeswax candles. Stall at the Ashford Mills holiday market every December.',
      bio: bio('Grace makes the best beeswax candles in the county and teaches our wax and candle-making workshop.')
    },
    {
      key: 'luis',
      title: 'Luis Herrera',
      town: 'Fox Run',
      membershipType: 'full',
      memberSince: year(-3),
      beekeepingSince: year(-3),
      colonies: 2,
      hiveTypes: [ 'topBar' ],
      roles: [ 'newBeekeeper' ],
      bio: bio('Luis keeps top-bar hives and is learning to love natural comb.')
    },
    {
      key: 'mei',
      title: 'Mei Tanaka',
      town: 'Eastbridge',
      membershipType: 'full',
      memberSince: 2017,
      beekeepingSince: 2015,
      colonies: 9,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'swarmCollector', 'mentor' ],
      swarmArea: 'Eastbridge, Cedar Hollow',
      swarmPhone: '(610) 555-0158',
      bio: bio('Mei rears queens from her calmest colonies and shares them with association members each summer.')
    },
    {
      key: 'peter',
      title: 'Peter Strand',
      town: 'Linden Valley',
      membershipType: 'family',
      memberSince: 2008,
      beekeepingSince: 2006,
      colonies: 4,
      hiveTypes: [ 'langstroth' ],
      roles: [],
      bio: bio('Peter looks after the association\'s extractor and loans it out each August.')
    }
  ];
}

function events({
  h, images, date
}) {
  const body = (...paragraphs) => h.area(h.rt(paragraphs.map((p) => `<p>${p}</p>`).join('')));
  const grange = {
    venue: 'The Grange Hall',
    address: '14 Orchard Lane, Linden Valley, PA'
  };
  const apiary = {
    venue: 'Teaching apiary, Hollins Farm',
    address: '220 Mill Road, Millbrook, PA'
  };
  return [
    {
      key: 'meeting',
      title: 'Monthly meeting: ask the experts',
      eventType: 'meeting',
      startDate: date(6),
      startTime: '19:00:00',
      endTime: '21:00:00',
      ...grange,
      cost: 'Free',
      summary: 'Bring your questions, photos of puzzling frames and the odd dead bee. A panel of experienced members answers them all.',
      _image: [ images['inspecting-frame'] ],
      main: body(
        'Our monthly meetings are open to members and anyone curious about bees. This month there is no speaker: instead a panel of long-time beekeepers takes your questions.',
        'Tea, coffee and honey cake from 6:30pm.'
      )
    },
    {
      key: 'candles',
      title: 'Wax and candle-making workshop',
      eventType: 'course',
      startDate: date(13),
      startTime: '10:00:00',
      endTime: '13:00:00',
      ...grange,
      cost: '$15, materials included',
      bookingUrl: 'https://example.org/book/candles',
      summary: 'Render old comb into clean wax, then roll and pour your own beeswax candles to take home.',
      _image: [ images['beeswax-candle'] ],
      main: body(
        'Grace Fontaine shows how to render wax from old comb and cappings, filter it, and turn it into rolled and poured candles.',
        'Places are limited to twelve. Bring an apron.'
      )
    },
    {
      key: 'brood',
      title: 'Talk: reading the brood nest',
      eventType: 'meeting',
      startDate: date(27),
      startTime: '19:00:00',
      endTime: '21:00:00',
      ...grange,
      cost: 'Free',
      summary: 'What a frame of brood tells you about your queen, your colony\'s health and what to do next.',
      _image: [ images['brood-eggs'] ],
      main: body('Priya Raman walks through photos of healthy and not-so-healthy brood, from eggs to capped cells, and explains what to look for at every inspection.')
    },
    {
      key: 'social',
      title: 'Members\' social and honey tasting',
      eventType: 'social',
      startDate: date(41),
      startTime: '18:00:00',
      endTime: '21:00:00',
      ...grange,
      membersOnly: true,
      cost: 'Bring a dish to share',
      summary: 'An evening of good food and better honey. Bring a jar of your own to share and compare.',
      _image: [ images['honey-jars'] ]
    },
    {
      key: 'course',
      title: 'Beginners\' course (six weeks)',
      eventType: 'course',
      startDate: date(96),
      startTime: '19:00:00',
      endTime: '21:00:00',
      ...grange,
      cost: '$120, including your first year\'s membership',
      bookingUrl: 'https://example.org/book/beginners',
      summary: 'Six evening classes and two apiary sessions that take you from "should I?" to your first colony.',
      _image: [ images['beekeeper-frame'] ],
      main: body(
        'Our beginners\' course runs every spring. Over six weeks we cover bee biology, equipment, inspections, swarm control, pests and diseases, and the honey harvest.',
        'Every student is paired with a mentor for their first season.'
      )
    },
    {
      key: 'apiary',
      title: 'Teaching apiary open session',
      eventType: 'apiary',
      startDate: date(150),
      startTime: '10:00:00',
      endTime: '12:00:00',
      ...apiary,
      membersOnly: true,
      cost: 'Free',
      summary: 'Suit up and join an inspection of the association\'s hives. Veils are available to borrow.',
      _image: [ images['apiary-field'] ],
      main: body('Sessions go ahead in fair weather only. Check the website on the morning of the session.')
    },
    {
      key: 'swarmTraining',
      title: 'Swarm collector training',
      eventType: 'course',
      startDate: date(172),
      startTime: '14:00:00',
      endTime: '16:00:00',
      ...apiary,
      cost: 'Free for members',
      summary: 'How to collect a swarm safely, what to carry in your swarm kit, and how the hotline works.',
      _image: [ images.swarm ]
    },
    {
      key: 'show',
      title: 'Annual honey show',
      eventType: 'show',
      startDate: date(300),
      startTime: '11:00:00',
      endTime: '16:00:00',
      venue: 'County Fairgrounds, Hall B',
      address: '1 Fairground Road, Ashford Mills, PA',
      cost: 'Free entry',
      summary: 'Classes for light, medium and dark honey, cut comb, beeswax, candles, mead and photography.',
      _image: [ images['honey-show-jars'] ],
      main: body('Entries are staged the evening before. The schedule of classes is in the newsletter, and our judges are happy to give feedback once the ribbons are awarded.')
    },
    {
      key: 'extraction',
      title: 'Honey extraction day',
      eventType: 'apiary',
      startDate: date(-24),
      startTime: '09:00:00',
      endTime: '15:00:00',
      ...apiary,
      summary: 'Members brought their supers and took home their honey, using the association\'s extractor.',
      _image: [ images['honey-pouring'] ]
    },
    {
      key: 'queens',
      title: 'Talk: queen rearing for beginners',
      eventType: 'meeting',
      startDate: date(-52),
      startTime: '19:00:00',
      endTime: '21:00:00',
      ...grange,
      summary: 'Mei Tanaka on raising a few good queens from your best colonies.',
      _image: [ images['marked-queen'] ]
    },
    {
      key: 'planting',
      title: 'Pollinator garden planting day',
      eventType: 'social',
      startDate: date(-130),
      startTime: '10:00:00',
      endTime: '14:00:00',
      venue: 'Linden Valley Library garden',
      address: '3 Main Street, Linden Valley, PA',
      summary: 'Volunteers planted over 400 native perennials for bees and other pollinators.',
      _image: [ images.wildflowers ]
    }
  ];
}

function resources({
  h, images, checklist
}) {
  const html = (markup) => h.area(h.rt(markup));
  return [
    {
      key: 'firstYear',
      title: 'Your first year with bees',
      topic: 'gettingStarted',
      level: 'beginner',
      summary: 'What to expect from your first colony, season by season, and where to get help.',
      _image: [ images['bee-quince'] ],
      main: html(`
        <h2>Before the bees arrive</h2>
        <p>Take a course, find a mentor and visit a few apiaries before buying anything. Choose a sunny, sheltered spot for the hive with a source of water nearby, and tell your neighbors.</p>
        <h2>Spring</h2>
        <p>Install your package or nucleus colony and feed sugar syrup while the bees draw out comb. Inspect every week or so: you are looking for a laying queen, healthy brood, and enough room.</p>
        <h2>Summer</h2>
        <p>A first-year colony may not produce surplus honey, and that is fine. Focus on building a strong colony. Start monitoring for varroa mites in midsummer.</p>
        <h2>Fall and winter</h2>
        <p>Make sure the colony has enough stores, treat for mites if you need to, fit a mouse guard, and then leave the bees in peace. Heft the hive on mild days to check its weight.</p>
        <p>Your mentor is there for all of it. No question is too small.</p>
      `)
    },
    {
      key: 'equipment',
      title: 'Equipment checklist for new beekeepers',
      topic: 'gettingStarted',
      level: 'beginner',
      summary: 'Everything you need on day one, and what can wait. Includes a printable checklist.',
      _image: [ images.smoker ],
      _file: [ checklist ],
      main: html(`
        <p>You do not need to buy everything at once. Start with protective gear, a smoker, a hive tool and one complete hive. The association can lend you an extractor when the time comes.</p>
        <p>Download the checklist, print it, and tick items off as you go.</p>
      `)
    },
    {
      key: 'varroa',
      title: 'Monitoring varroa with a sugar roll',
      topic: 'colonyHealth',
      level: 'intermediate',
      summary: 'A quick, bee-friendly way to count mites, and what the numbers mean.',
      _image: [ images.varroa ],
      externalUrl: 'https://en.wikipedia.org/wiki/Varroa_destructor',
      main: html(`
        <p>Varroa mites are the biggest threat to honey bee colonies. You cannot manage what you do not measure, so count mites regularly from midsummer onward.</p>
        <h2>How to do it</h2>
        <ol>
          <li>Shake about half a cup of bees (roughly 300) from a brood frame into a jar with a mesh lid. Make sure the queen is not among them.</li>
          <li>Add a heaped tablespoon of powdered sugar and roll the jar gently for a minute.</li>
          <li>Let it sit for a minute or two, then shake the sugar and mites out through the mesh onto a white plate.</li>
          <li>Count the mites, and return the bees to the hive.</li>
        </ol>
        <h2>Reading the result</h2>
        <p>Divide the count by three to get mites per hundred bees. Many beekeepers act at two or three mites per hundred in late summer. Ask a mentor which treatment suits your colonies and the season.</p>
      `)
    },
    {
      key: 'brood',
      title: 'Recognizing healthy brood',
      topic: 'colonyHealth',
      level: 'beginner',
      summary: 'Eggs, larvae, capped cells: what a healthy brood frame looks like, and what should worry you.',
      _image: [ images['brood-eggs'] ],
      main: html(`
        <p>A healthy brood frame has a compact pattern of capped cells with few gaps, surrounded by an arc of pollen and honey. Larvae should be pearly white and curled in a "C".</p>
        <p>Sunken, greasy or perforated cappings, or larvae that are discolored or have a bad smell, need a closer look. Take a photo and ask a mentor, and contact your state apiarist if you suspect a notifiable disease.</p>
      `)
    },
    {
      key: 'winter',
      title: 'Preparing colonies for winter',
      topic: 'seasonal',
      level: 'intermediate',
      summary: 'Stores, mites, ventilation and mice: a fall checklist for colonies that make it to spring.',
      _image: [ images['winter-hives'] ],
      main: html(`
        <ul>
          <li><strong>Stores.</strong> Most colonies in our area need around 60 pounds of honey to get through the winter. Feed thick syrup early in the fall if they are light.</li>
          <li><strong>Mites.</strong> Treat as soon as the honey supers are off, so that the long-lived winter bees are raised mite-free.</li>
          <li><strong>Queen.</strong> Combine colonies that are weak or queenless.</li>
          <li><strong>Hive.</strong> Fit mouse guards, secure the roof, and tilt the hive slightly forward so rain runs off.</li>
        </ul>
      `)
    },
    {
      key: 'artificialSwarm',
      title: 'Swarm control: the artificial swarm',
      topic: 'swarms',
      level: 'intermediate',
      summary: 'When you find queen cells, this classic method keeps your bees, and your honey crop.',
      _image: [ images['marked-queen'] ],
      main: html(`
        <p>Swarming is how colonies reproduce. When you find charged queen cells, an artificial swarm splits the colony in a way that satisfies the urge to swarm without losing half your bees over the fence.</p>
        <ol>
          <li>Move the original hive a few feet aside and put a new hive with frames of foundation in its place.</li>
          <li>Find the queen and move her, on her frame, into the new hive. Make sure there are no queen cells on that frame.</li>
          <li>The foragers return to the original spot and join the queen: that is your "swarm".</li>
          <li>The old hive, with the brood and queen cells, raises a new queen.</li>
        </ol>
        <p>There are several variations. Tom covers them in the beginners' course, and any mentor will talk you through it.</p>
      `)
    },
    {
      key: 'foundSwarm',
      title: 'Found a swarm? What to do',
      topic: 'swarms',
      level: 'beginner',
      summary: 'For the public: how to tell a honey bee swarm from other insects, and who to call.',
      _image: [ images.swarm ],
      main: html(`
        <p>A swarm is a cluster of thousands of honey bees resting while scouts look for a new home. Swarms are usually gentle because the bees have no home to defend.</p>
        <ul>
          <li>Keep children and pets away, and do not spray the bees with anything.</li>
          <li>Take a photo if you can safely do so: it helps us tell honey bees from wasps or bumble bees.</li>
          <li>Call our swarm hotline. A volunteer collector will come and rehome them, usually for free.</li>
        </ul>
        <p>We cannot remove bees that have already moved into walls or chimneys, but we can suggest someone who can.</p>
      `)
    },
    {
      key: 'extracting',
      title: 'Extracting and bottling honey',
      topic: 'honey',
      level: 'intermediate',
      summary: 'From capped frames to labeled jars, with the association\'s loan extractor.',
      _image: [ images['honey-pouring'] ],
      main: html(`
        <p>Only take frames that are at least 80% capped: uncapped honey may be too wet and can ferment. Remove the bees with a clearer board or a gentle brush.</p>
        <p>Uncap the frames with a knife or fork, spin them in the extractor, then strain the honey through a fine filter into a settling tank. Leave it a day or two for air bubbles to rise before bottling.</p>
        <p>Members can borrow the association's extractor for a weekend. Ask Peter Strand to book it.</p>
      `)
    },
    {
      key: 'showEntries',
      title: 'Preparing entries for the honey show',
      topic: 'honey',
      level: 'advanced',
      summary: 'What the judges look for, and how to stage a jar that wins a ribbon.',
      _image: [ images['capped-frame'] ],
      main: html(`
        <p>Judges look for honey that is clean, clear, free of bubbles and scum, and filled to the right level in a spotless jar. Flavor and aroma count too.</p>
        <p>Strain twice, warm gently if needed, and let jars settle in a warm room for several days. Polish the glass and check the lid fits perfectly. Read the show schedule carefully: each class has its own rules.</p>
      `)
    }
  ];
}

// Newest first here, then reversed so they are inserted oldest first: the
// article widget lists the most recently created, so creation order should
// follow publication order.
function articles({
  h, images, date, authors, categories
}) {
  const blurb = (text) => h.area(h.rt(`<p>${text}</p>`));
  const body = (markup) => h.area(h.rt(markup));
  return [
    {
      key: 'course',
      title: 'Record turnout for the beginners\' course',
      publishedAt: date(-9),
      _image: [ images['beekeeper-frame'] ],
      _authors: [ authors.tom ],
      _categories: [ categories.news ],
      blurb: blurb('Thirty-two new beekeepers signed up this year, our largest class ever. Here is what they learned.'),
      main: body(`
        <p>This year's beginners' course was the biggest in the association's history, with thirty-two students and a waiting list.</p>
        <p>Over six weeks they learned bee biology, how to light a smoker so it stays lit, and how to find the queen (or at least her eggs). The two apiary sessions were, as ever, the highlight.</p>
        <p>Every student now has a mentor. If you are an experienced member and can mentor a new beekeeper, please let Tom know.</p>
      `)
    },
    {
      key: 'varroa',
      title: 'Varroa: why late summer matters most',
      publishedAt: date(-40),
      _image: [ images.varroa ],
      _authors: [ authors.priya ],
      _categories: [ categories.tips ],
      blurb: blurb('The bees that carry your colony through winter are raised in late summer. Protect them from mites.'),
      main: body(`
        <p>Mite populations peak just as colonies start raising their long-lived winter bees. Bees that develop in heavily infested cells are shorter-lived and less able to make it to spring.</p>
        <p>Monitor now, and treat promptly when your counts call for it. Our <a href="/learn">resource library</a> has a step-by-step guide to the sugar roll.</p>
      `)
    },
    {
      key: 'show',
      title: 'Results from the annual honey show',
      publishedAt: date(-65),
      _image: [ images['honey-show-jars'] ],
      _authors: [ authors.margaret ],
      _categories: [ categories.show, categories.news ],
      blurb: blurb('Over 140 entries across eighteen classes, and a first ribbon for a junior member.'),
      main: body(`
        <p>Thank you to everyone who entered, stewarded and visited. The judges praised the quality of the light honey classes in particular.</p>
        <p>Dan Whitcombe took best in show for his basswood honey, and junior member Sam Oduya won his first ribbon in the photography class.</p>
      `)
    },
    {
      key: 'planting',
      title: 'Planting for pollinators: a guide for gardeners',
      publishedAt: date(-120),
      _image: [ images.wildflowers ],
      _authors: [ authors.priya ],
      _categories: [ categories.tips ],
      blurb: blurb('You do not need to keep bees to help them. Here is what to plant for flowers from early spring to late fall.'),
      main: body(`
        <p>Bees need a steady supply of nectar and pollen from the first warm days of spring to the first frosts. Aim for something in flower every month.</p>
        <ul>
          <li><strong>Spring:</strong> crocus, willow, fruit trees, dandelions (leave them!)</li>
          <li><strong>Summer:</strong> clover, lavender, bee balm, basswood</li>
          <li><strong>Fall:</strong> goldenrod, asters, sedum</li>
        </ul>
        <p>Choose single-flowered varieties, avoid pesticides, and leave a patch of lawn unmown.</p>
      `)
    },
    {
      key: 'apiary',
      title: 'Our teaching apiary has a new home',
      publishedAt: date(-160),
      _image: [ images['apiary-field'] ],
      _authors: [ authors.margaret ],
      _categories: [ categories.news ],
      blurb: blurb('Thanks to the Hollins family, the association\'s hives now sit at the edge of a wildflower meadow.'),
      main: body(`
        <p>After twenty years behind the Grange Hall, the teaching apiary has moved to Hollins Farm on Mill Road. There is room for twelve hives, a shed for equipment, and parking.</p>
        <p>Walter Brennan-Hughes and a team of volunteers moved the hives on a cold February night. Open sessions start again in the spring.</p>
      `)
    },
    {
      key: 'winter',
      title: 'Winter checks: hefting, feeding and patience',
      publishedAt: date(-300),
      _image: [ images['winter-hives'] ],
      _authors: [ authors.tom, authors.priya ],
      _categories: [ categories.tips ],
      blurb: blurb('Winter is a time to leave the bees alone, mostly. Here is what you can usefully do.'),
      main: body(`
        <p>Opening a hive in winter breaks the cluster and lets out precious heat. Instead, heft the hive from the back: if it feels light, slip some fondant over the frames on a mild day.</p>
        <p>Keep entrances clear of snow and dead bees, and use the quiet months to clean equipment and plan for spring.</p>
      `)
    }
  ].reverse();
}

// Top-level pages and their children, in navigation order. `key` names a page
// for later links; `parent` is the key of its parent page. These are built
// before any page exists, so links between them are URLs; the home page,
// built last, links to page docs.
function pages(ctx) {
  const {
    name, h, images, members, credits
  } = ctx;
  const rt = (markup) => h.rt(markup);
  return [
    {
      key: 'about',
      type: 'default-page',
      title: 'About us',
      slug: '/about',
      main: h.area(
        {
          type: 'banner',
          _image: [ images['heather-hives'] ],
          height: 'medium',
          align: 'left',
          content: h.area(rt('<h2>Seventy years of beekeeping in the valley</h2><p>We are a friendly, volunteer-run association for beekeepers of every level, and for anyone who cares about bees.</p>'))
        },
        h.layout(
          [ 7, [
            rt(`
              <h2>Who we are</h2>
              <p>${name} was founded in 1952 by a handful of orchard owners who wanted better pollination and better honey. Today we have members from Linden Valley to Willow Bend, from teenagers with their first hive to sideliners with dozens.</p>
              <p>We run a beginners' course every spring, keep a teaching apiary at Hollins Farm, collect swarms for the public, and hold a monthly meeting at the Grange Hall.</p>
              <h3>What we believe</h3>
              <ul>
                <li>Every new beekeeper deserves a mentor.</li>
                <li>Healthy bees start with good husbandry: regular inspections, mite monitoring, and records.</li>
                <li>Bees are good neighbors when beekeepers are too.</li>
              </ul>
            `)
          ] ],
          [ 5, [ h.image(images.skeps) ] ]
        ),
        rt('<h2>Our committee</h2><p>Elected every spring at the annual general meeting. You can reach any of us through the association\'s email address.</p>'),
        {
          type: 'members',
          show: 'committee',
          limit: 8
        }
      )
    },
    {
      key: 'credits',
      parent: 'about',
      type: 'default-page',
      title: 'Photo credits',
      slug: '/about/photo-credits',
      main: h.area(rt(`
        <p>The photographs on this site are freely licensed from Wikimedia Commons. Thank you to their photographers.</p>
        <ul>
          ${credits.map((credit) => `<li>${credit.alt}: <a href="${credit.creditUrl}">${credit.credit}</a></li>`).join('\n')}
        </ul>
      `))
    },
    {
      key: 'events',
      type: 'event-page',
      title: 'Events',
      slug: '/events',
      intro: h.area(rt('<p class="large">Monthly meetings, practical sessions at the teaching apiary, courses and the annual honey show. Most events are free and open to everyone.</p>'))
    },
    {
      key: 'learn',
      type: 'resource-page',
      title: 'Learn',
      slug: '/learn',
      intro: h.area(rt('<p class="large">Guides and checklists written by our members, for beekeepers at every stage.</p>'))
    },
    {
      key: 'news',
      type: 'article-page',
      title: 'News',
      slug: '/news',
      intro: h.area(rt('<p class="large">News from the association, seasonal tips, and honey show results.</p>'))
    },
    {
      key: 'members',
      type: 'member-page',
      title: 'Members',
      slug: '/members',
      intro: h.area(rt('<p class="large">Meet our members. Looking for a mentor, local honey, or someone to collect a swarm? Use the filters.</p>'))
    },
    {
      key: 'swarms',
      type: 'default-page',
      title: 'Swarms',
      slug: '/swarms',
      main: h.area(
        {
          type: 'swarm-hotline',
          heading: 'Seen a swarm?',
          text: 'Don\'t panic, and please don\'t spray them. Swarming honey bees are rarely aggressive. Call our hotline and a volunteer collector will rehome them, usually for free.',
          phone: '',
          _image: [ images.swarm ]
        },
        h.layout(
          [ 6, [
            rt(`
              <h2>Is it a honey bee swarm?</h2>
              <p>A swarm is a cluster of thousands of bees, often hanging from a branch like a bunch of grapes. It is a colony on the move, resting while scouts find a new home. It may stay a few hours or a few days.</p>
              <p>Bumble bees and wasps do not swarm like this. If you are not sure, send us a photo.</p>
            `)
          ] ],
          [ 6, [
            rt(`
              <h2>What happens next</h2>
              <ol>
                <li>Call the hotline and tell us where the swarm is and how high up.</li>
                <li>We put you in touch with the nearest volunteer collector.</li>
                <li>They collect the bees, usually in the evening when all the bees are home, and give them a new hive.</li>
              </ol>
            `)
          ] ]
        ),
        rt('<h2>Our swarm collectors</h2>'),
        {
          type: 'members',
          show: 'swarmCollector',
          limit: 8
        }
      )
    },
    {
      key: 'join',
      type: 'default-page',
      title: 'Join',
      slug: '/join',
      main: h.area(
        rt('<p class="large">Membership supports the teaching apiary, the swarm hotline and our education program, and gives you a mentor, a monthly newsletter and a community of fellow beekeepers.</p>'),
        h.layout(
          [ 4, [ priceCard({
            title: 'Junior',
            content: 'For beekeepers under 18.',
            priceText: '$10',
            features: [ 'Monthly meetings', 'Teaching apiary sessions', 'Newsletter' ]
          }) ] ],
          [ 4, [ priceCard({
            title: 'Individual',
            content: 'Everything you need to keep bees well.',
            priceText: '$35',
            featured: true,
            badge: true,
            badgeIcon: 'people',
            badgeLabel: 'Most popular',
            features: [ 'Everything in Junior', 'A mentor for your first season', 'Loan of the extractor', 'Honey show entry' ]
          }) ] ],
          [ 4, [ priceCard({
            title: 'Family',
            content: 'Two adults and children at one address.',
            priceText: '$50',
            features: [ 'Everything in Individual', 'For the whole household', 'Two votes at the AGM' ]
          }) ] ]
        ),
        rt('<h2>Find a mentor</h2><p>Every new member is offered a mentor: an experienced beekeeper nearby who will answer questions, visit your apiary, and help with your first inspections.</p>'),
        {
          type: 'members',
          show: 'mentor',
          limit: 4
        },
        h.button('See all our mentors', '/members/roles/mentor', 'outline')
      )
    },
    {
      key: 'membersArea',
      parent: 'join',
      type: 'default-page',
      title: 'Members\' area',
      slug: '/join/members-area',
      // Only visible to visitors who are logged in, such as members with a
      // "guest" account.
      visibility: 'loginRequired',
      main: h.area(rt(`
        <p class="large">Welcome back. This page is only visible when you are logged in.</p>
        <ul>
          <li>Committee meeting minutes</li>
          <li>Booking the extractor and the teaching apiary</li>
          <li>Honey show schedule and entry forms</li>
        </ul>
        <p>Questions? Email ${members.priya.title}, our secretary, at hello@example.org.</p>
      `))
    }
  ];
}

function priceCard(fields) {
  return {
    type: 'price-card',
    priceTextUnit: '/ year',
    buttonStyle: fields.featured ? 'primary' : 'outline',
    linkText: 'Join now',
    linkType: 'custom',
    linkUrl: 'mailto:hello@example.org?subject=Membership',
    ...fields,
    features: fields.features.map((item) => ({ item }))
  };
}

function home(ctx) {
  const {
    name, h, images, pages
  } = ctx;
  const rt = (markup) => h.rt(markup);
  const card = (icon, title, text, linkText, page) => ({
    type: 'card',
    icon,
    bg: true,
    orientation: 'vertical',
    titleRT: h.area({
      type: 'card-title-rt',
      content: `<h3 class="card__title">${title}</h3>`
    }),
    contentRT: h.area({
      type: 'card-content-rt',
      content: `<p class="card__text">${text}</p>`
    }),
    ...h.link(linkText, page),
    style: 'outline'
  });
  return h.area(
    {
      type: 'banner',
      _image: [ images['hives-meadow'] ],
      height: 'tall',
      align: 'left',
      content: h.area(rt(`<h6 class="meta">${name}</h6><h2>Healthy bees, thriving beekeepers</h2><p class="large">Courses, mentoring, a teaching apiary and a swarm hotline, run by volunteers who love bees.</p>`)),
      links: [
        {
          ...h.link('Become a member', pages.join),
          style: 'primary'
        },
        {
          ...h.link('Upcoming events', pages.events),
          style: 'outline'
        }
      ]
    },
    {
      type: 'association-stats',
      stats: [
        {
          source: 'members',
          label: 'Members'
        },
        {
          source: 'colonies',
          label: 'Colonies kept'
        },
        {
          source: 'mentors',
          label: 'Mentors'
        },
        {
          source: 'yearsActive',
          label: 'Years in the valley'
        }
      ]
    },
    h.layout(
      [ 6, [
        rt(`
          <h2>New to bees?</h2>
          <p>Start with our beginners' course, then keep your first colony with a mentor at your side. Our members have been helping new beekeepers get started since 1952.</p>
        `),
        h.button('Read "Your first year with bees"', pages.learn)
      ] ],
      [ 6, [ h.image(images.smoker) ] ]
    ),
    rt('<h2>Coming up</h2>'),
    {
      type: 'upcoming-events',
      limit: 3,
      eventType: 'all',
      display: 'cards'
    },
    rt('<h2>This month in the apiary</h2>'),
    {
      type: 'seasonal-calendar',
      display: 'current',
      months: seasonalTasks.map(({
        month, headline, tasks
      }) => ({
        month: String(month),
        headline,
        tasks: tasks.map((task) => ({ task }))
      }))
    },
    {
      type: 'swarm-hotline',
      heading: 'Seen a swarm?',
      text: 'Don\'t panic, and please don\'t spray them. Call our volunteer collectors and we\'ll find them a new home.',
      phone: '',
      _image: [ images.swarm ],
      ...h.link('What to do about a swarm', pages.swarms)
    },
    rt('<h2>Get involved</h2>'),
    h.layout(
      [ 4, [ card('people', 'Find a mentor', 'Pair up with an experienced beekeeper near you for your first season.', 'Meet our mentors', '/members/roles/mentor') ] ],
      [ 4, [ card('trophy', 'Enter the honey show', 'Light, dark, cut comb, candles and mead: there is a class for everyone.', 'See the calendar', pages.events) ] ],
      [ 4, [ card('earth', 'Buy local honey', 'Our members sell honey, wax and candles from across the valley.', 'Find a seller', '/members/roles/honeySeller') ] ]
    ),
    rt('<h2>News from the hive</h2>'),
    {
      type: 'article',
      limit: 3,
      display: 'horizontal'
    }
  );
}

export default {
  defaultName: 'Linden Valley Beekeepers\' Association',
  images,
  // The site keeps the platform's default honey styles.
  styles: null,
  logo: {},
  global,
  authors,
  categories,
  members,
  events,
  resources,
  articles,
  pages,
  home
};
