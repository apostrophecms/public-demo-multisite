// Port Sorrel: a young, volunteer-run city collective. Hives live on rooftops
// that local businesses and institutions "host", and much of the work is
// outreach, advocacy and swarm rescue. A deliberate contrast with Linden
// Valley's rural, long-established association, in content, tone and look.
// `--profile=port-sorrel`.
//
// See linden.js for what each function receives. People, places, phone
// numbers (555-01xx) and email addresses (example.org) are fictional.

const images = [
  'rooftop-beekeeper', 'rooftop-hives', 'rooftop-hives-cathedral', 'green-roof-class',
  'city-garden', 'observation-hive', 'bee-sunflower', 'bee-dandelion', 'bee-crocus',
  'honeycomb', 'honey-jars', 'honey-pouring', 'swarm', 'varroa', 'inspecting-frame',
  'smoker', 'pollen-cells', 'beeswax-candle', 'bee-lavender', 'brood-eggs'
];

// Teal and sunflower yellow, Poppins headings, squarer corners: Global Styles
// values, exactly as an editor would set them.
const styles = {
  defaultColorLight: '#24403c',
  headingColorLight: '#0d2b27',
  faintColorLight: '#d3e6e1',
  accentColorLight: '#0f6e66',
  contrastColorLight: '#ffffff',
  backgroundColorLight: '#f7fbfa',
  surfaceColorLight: '#e4f1ed',
  defaultColorDark: '#dcebe7',
  headingColorDark: '#ffffff',
  faintColorDark: '#23403b',
  accentColorDark: '#f5c542',
  contrastColorDark: '#10201d',
  backgroundColorDark: '#0c1715',
  surfaceColorDark: '#142724',
  fontHeading: '"Poppins", sans-serif;',
  fontNav: '"Poppins", sans-serif;',
  navRadius: 14,
  lightButtonPrimaryRadius: 8,
  lightButtonOutlineRadius: 8,
  darkButtonPrimaryRadius: 8,
  darkButtonOutlineRadius: 8,
  lightButtonPrimaryWeight: '700',
  darkButtonPrimaryWeight: '700'
};

const logo = {
  lines: [ 'Port Sorrel', 'URBAN BEE COLLECTIVE' ],
  colors: {
    ink: '#0d2b27',
    accent: '#0f6e66',
    darkInk: '#ffffff',
    darkAccent: '#f5c542'
  }
};

// The rooftop year. Same months as anywhere temperate, different worries:
// wind, heat, water and neighbors.
const rooftopYear = [
  [ 1, 'Strapped down', [ 'Check hive straps after every storm', 'Clear snow from roof drains near the hives', 'Heft hives; add fondant if light' ] ],
  [ 2, 'Paperwork season', [ 'Renew hive registrations with the city', 'Confirm roof access with your hive host', 'Order packages and nucs early' ] ],
  [ 3, 'Crocus and maples', [ 'First check on a calm, sunny day', 'Watch for pollen from street maples', 'Put out a water source with landing stones' ] ],
  [ 4, 'Dandelion rush', [ 'Weekly inspections begin', 'Add space before the colony needs it', 'Brief your building on swarm season' ] ],
  [ 5, 'Swarm squad', [ 'Inspect every 7 days for queen cells', 'Keep a swarm box in the car', 'Answer the hotline when it\'s your shift' ] ],
  [ 6, 'Linden bloom', [ 'Street linden trees flow: add supers', 'Shade hives on hot roofs', 'Top up water daily in heat waves' ] ],
  [ 7, 'Harvest', [ 'Pull capped frames early in the morning', 'Book the collective\'s extractor', 'Count mites as soon as supers are off' ] ],
  [ 8, 'Dearth', [ 'Reduce entrances against robbing', 'Treat for mites if counts call for it', 'Thank your hive host with a jar' ] ],
  [ 9, 'Goldenrod in the rail yards', [ 'Feed light colonies', 'Combine weak colonies', 'Check every colony has a queen' ] ],
  [ 10, 'Windproofing', [ 'Add weight or straps for winter winds', 'Fit mouse guards', 'Store spare boxes off the roof' ] ],
  [ 11, 'Quiet roofs', [ 'Leave the bees alone', 'Render wax from old comb', 'Plan next year\'s rooftops' ] ],
  [ 12, 'Count and celebrate', [ 'Oxalic acid treatment while broodless', 'Write up the season for your host', 'Come to the year-end party' ] ]
].map(([ month, headline, tasks ]) => ({
  month: String(month),
  headline,
  tasks: tasks.map((task) => ({ task }))
}));

function global({ name }) {
  return {
    siteTitle: name,
    tagline: 'Bees on rooftops, flowers on every block, and a city that\'s better for both.',
    founded: 2015,
    contactEmail: 'hive@example.org',
    contactPhone: '(215) 555-0163',
    swarmHotline: '(215) 555-0177',
    mailingAddress: 'The Hive Space\n210 Canal Street, Unit 3\nPort Sorrel, PA 19100',
    legalNote: 'A volunteer collective. Dues fund equipment, never salaries.',
    socialLinks: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/'
      },
      {
        platform: 'Bluesky',
        url: 'https://bsky.app/'
      },
      {
        platform: 'Newsletter',
        url: 'https://example.org/dispatches'
      }
    ]
  };
}

function authors() {
  return [
    {
      key: 'dani',
      title: 'Dani Reyes'
    },
    {
      key: 'kwame',
      title: 'Kwame Asante'
    },
    {
      key: 'lou',
      title: 'Lou Petrakis'
    }
  ];
}

function categories() {
  return [
    {
      key: 'news',
      title: 'Collective news'
    },
    {
      key: 'hosts',
      title: 'Hive hosts'
    },
    {
      key: 'advocacy',
      title: 'Advocacy'
    }
  ];
}

function members({ h, year }) {
  const bio = (...paragraphs) => h.area(h.rt(paragraphs.map((p) => `<p>${p}</p>`).join('')));
  return [
    {
      key: 'dani',
      title: 'Dani Reyes',
      town: 'Canal Street',
      membershipType: 'full',
      memberSince: 2015,
      beekeepingSince: 2013,
      colonies: 5,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'mentor', 'swarmCollector' ],
      swarmArea: 'Canal Street, Docklands',
      swarmPhone: '(215) 555-0112',
      committeeRole: 'Coordinator',
      committeeOrder: 1,
      bio: bio(
        'Dani started the collective with three hives on a bike shop roof and a group chat. Ten years on, the group chat is a little bigger.',
        'By day, a nurse. By weekend, usually on a roof.'
      )
    },
    {
      key: 'kwame',
      title: 'Kwame Asante',
      town: 'Old Mill District',
      membershipType: 'full',
      memberSince: 2017,
      beekeepingSince: 2016,
      colonies: 4,
      hiveTypes: [ 'langstroth', 'topBar' ],
      roles: [ 'mentor' ],
      committeeRole: 'Hive Host Liaison',
      committeeOrder: 2,
      bio: bio('Kwame matches beekeepers with rooftops and keeps building managers happy. He has talked more landlords into bees than anyone in the city.')
    },
    {
      key: 'lou',
      title: 'Lou Petrakis',
      town: 'Sorrel Heights',
      membershipType: 'full',
      memberSince: 2019,
      beekeepingSince: 2019,
      colonies: 2,
      hiveTypes: [ 'flow' ],
      roles: [ 'honeySeller' ],
      honeyNote: 'Sorrel Heights summer honey, mostly linden. Pick up at Bees & Brews or the Saturday market on Market Square.',
      committeeRole: 'Outreach & Schools',
      committeeOrder: 3,
      bio: bio('Lou teaches eighth-grade science and runs the observation hive visits to schools. Ask about the time a drone escaped during a lesson on drones.')
    },
    {
      key: 'priscilla',
      title: 'Priscilla Ng',
      town: 'Docklands',
      membershipType: 'full',
      memberSince: 2016,
      beekeepingSince: 2014,
      colonies: 7,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'swarmCollector', 'honeySeller' ],
      swarmArea: 'Docklands, Riverbend',
      swarmPhone: '(215) 555-0124',
      honeyNote: 'Docklands rooftop honey and creamed honey with cinnamon. Ships across the city by bike courier.',
      committeeRole: 'Swarm Dispatch',
      committeeOrder: 4,
      bio: bio('Priscilla runs swarm dispatch every spring. She has collected swarms from a bus shelter, a parking meter and, once, a wedding.')
    },
    {
      key: 'theo',
      title: 'Theo Marchetti',
      town: 'Market Square',
      membershipType: 'full',
      memberSince: 2018,
      beekeepingSince: 2018,
      colonies: 3,
      hiveTypes: [ 'langstroth' ],
      roles: [],
      committeeRole: 'Treasurer',
      committeeOrder: 5,
      bio: bio('Theo keeps the books and three hives above his family\'s bakery. The bees get the leftover sugar syrup; the collective gets the spreadsheets.')
    },
    {
      key: 'amara',
      title: 'Amara Osei',
      town: 'Northside',
      membershipType: 'full',
      memberSince: 2020,
      beekeepingSince: 2020,
      colonies: 2,
      hiveTypes: [ 'observation', 'langstroth' ],
      roles: [ 'mentor' ],
      committeeRole: 'Garden Partnerships',
      committeeOrder: 6,
      bio: bio('Amara works with community gardens to plant pollinator strips, and looks after the observation hive at Northside Library.')
    },
    {
      key: 'jules',
      title: 'Jules Fairweather',
      town: 'Riverbend',
      membershipType: 'full',
      memberSince: 2021,
      beekeepingSince: 2021,
      colonies: 2,
      hiveTypes: [ 'topBar' ],
      roles: [ 'swarmCollector' ],
      swarmArea: 'Riverbend, Northside',
      swarmPhone: '(215) 555-0138',
      bio: bio('Jules keeps top-bar hives on a converted warehouse and is the collective\'s best climber, which matters more than you would think.')
    },
    {
      key: 'ines',
      title: 'Inés Carvalho',
      town: 'Canal Street',
      membershipType: 'family',
      memberSince: 2022,
      beekeepingSince: 2022,
      colonies: 1,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'honeySeller' ],
      honeyNote: 'A few dozen jars a year from the Canal Street Lofts roof. Usually gone by September.',
      bio: bio('Inés and her partner keep one hive on their building, which the whole building now refers to as "our bees".')
    },
    {
      key: 'ravi',
      title: 'Ravi Subramanian',
      town: 'Sorrel Heights',
      membershipType: 'full',
      memberSince: year(-1),
      beekeepingSince: year(-1),
      colonies: 1,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'newBeekeeper' ],
      bio: bio('Ravi took the crash course last spring. His colony lives on the roof of the public library\'s Sorrel Heights branch.')
    },
    {
      key: 'maya',
      title: 'Maya Lindgren',
      town: 'Docklands',
      membershipType: 'junior',
      memberSince: year(-1),
      beekeepingSince: year(0),
      colonies: 0,
      roles: [ 'newBeekeeper' ],
      bio: bio('Maya joined through the schools program and now helps Lou with observation hive visits.')
    },
    {
      key: 'sol',
      title: 'Sol Abernathy',
      town: 'Old Mill District',
      membershipType: 'full',
      memberSince: year(-2),
      beekeepingSince: year(-2),
      colonies: 2,
      hiveTypes: [ 'flow' ],
      roles: [ 'newBeekeeper' ],
      bio: bio('Sol hosts two hives above a co-working space and is learning that bees do not care about meeting schedules.')
    },
    {
      key: 'bea',
      title: 'Bea Okonkwo',
      town: 'Market Square',
      membershipType: 'honorary',
      memberSince: 2015,
      beekeepingSince: 1988,
      colonies: 3,
      hiveTypes: [ 'langstroth' ],
      roles: [ 'mentor' ],
      bio: bio('Bea kept bees in the city long before it was fashionable, and mentored most of the collective\'s founders.')
    }
  ];
}

function events({
  h, images, date
}) {
  const body = (...paragraphs) => h.area(h.rt(paragraphs.map((p) => `<p>${p}</p>`).join('')));
  const hiveSpace = {
    venue: 'The Hive Space',
    address: '210 Canal Street, Port Sorrel, PA'
  };
  return [
    {
      key: 'brews',
      title: 'Bees & Brews',
      eventType: 'social',
      startDate: date(4),
      startTime: '18:30:00',
      endTime: '21:00:00',
      venue: 'Tidewater Taproom',
      address: '88 Dock Street, Port Sorrel, PA',
      cost: 'Free; drinks are on you',
      summary: 'Our monthly hangout. New faces, bee questions and honey tastings welcome; no experience needed.',
      _image: [ images['honey-jars'] ],
      main: body('First-timers: look for the table with the jars of honey on it. Somebody will say hello.')
    },
    {
      key: 'roofTour',
      title: 'Rooftop hive tour: the Foundry Building',
      eventType: 'apiary',
      startDate: date(11),
      startTime: '10:00:00',
      endTime: '11:30:00',
      venue: 'The Foundry Building (meet in the lobby)',
      address: '45 Ironworks Way, Port Sorrel, PA',
      cost: 'Free, RSVP required',
      bookingUrl: 'https://example.org/rsvp/foundry',
      summary: 'Five hives, a green roof and a view of the whole harbor. Suits provided; closed-toe shoes required.',
      _image: [ images['rooftop-hives'] ],
      main: body('Roof access is limited to fifteen people per tour. If the forecast calls for rain or high wind we will reschedule and email everyone who RSVPed.')
    },
    {
      key: 'mites',
      title: 'Mite count meetup',
      eventType: 'apiary',
      startDate: date(18),
      startTime: '13:00:00',
      endTime: '15:00:00',
      venue: 'Canal Street Lofts roof',
      address: '300 Canal Street, Port Sorrel, PA',
      membersOnly: true,
      cost: 'Free',
      summary: 'Bring a jar, we bring the alcohol wash kits. Counting mites is less grim in company.',
      _image: [ images.varroa ]
    },
    {
      key: 'crashCourse',
      title: 'Urban beekeeping crash course',
      eventType: 'course',
      startDate: date(25),
      startTime: '09:30:00',
      endTime: '16:00:00',
      ...hiveSpace,
      cost: 'Sliding scale, $0–$60',
      bookingUrl: 'https://example.org/rsvp/crash-course',
      summary: 'One day, everything you need to decide whether city beekeeping is for you, ending on a real roof.',
      _image: [ images['green-roof-class'] ],
      main: body(
        'Morning: bee biology, equipment, city rules, and what hive hosts expect. Afternoon: suit up and open a hive with us.',
        'Nobody is turned away for lack of funds. Pay what works for you.'
      )
    },
    {
      key: 'ordinance',
      title: 'Testimony night: the backyard hive ordinance',
      eventType: 'meeting',
      startDate: date(32),
      startTime: '18:00:00',
      endTime: '20:00:00',
      ...hiveSpace,
      cost: 'Free',
      summary: 'City council hears the backyard hive ordinance next month. Help us write and practice two-minute testimony.',
      _image: [ images['city-garden'] ]
    },
    {
      key: 'planting',
      title: 'Plant a pollinator strip on Market Square',
      eventType: 'social',
      startDate: date(46),
      startTime: '10:00:00',
      endTime: '13:00:00',
      venue: 'Market Square median, north end',
      address: 'Market Square, Port Sorrel, PA',
      cost: 'Free; gloves provided',
      summary: 'Six hundred native plugs, one city median, and as many volunteers as we can find.',
      _image: [ images['bee-sunflower'] ]
    },
    {
      key: 'library',
      title: 'Family day at the observation hive',
      eventType: 'social',
      startDate: date(61),
      startTime: '11:00:00',
      endTime: '14:00:00',
      venue: 'Northside Library',
      address: '12 Elm Row, Port Sorrel, PA',
      cost: 'Free',
      summary: 'Find the queen, taste three honeys, and make a seed bomb to take home.',
      _image: [ images['observation-hive'] ]
    },
    {
      key: 'swarmSquad',
      title: 'Swarm squad training',
      eventType: 'course',
      startDate: date(150),
      startTime: '18:00:00',
      endTime: '20:30:00',
      ...hiveSpace,
      cost: 'Free for members',
      summary: 'Ladders, lures and the art of explaining to a crowd that the bees are fine. Required for hotline volunteers.',
      _image: [ images.swarm ]
    },
    {
      key: 'tasting',
      title: 'The block-by-block honey tasting',
      eventType: 'show',
      startDate: date(290),
      startTime: '16:00:00',
      endTime: '19:00:00',
      ...hiveSpace,
      cost: 'Free',
      summary: 'Our take on a honey show: every rooftop\'s honey, side by side, voted on by everyone who walks in.',
      _image: [ images['honey-pouring'] ]
    },
    {
      key: 'harvest',
      title: 'Harvest party',
      eventType: 'social',
      startDate: date(-48),
      startTime: '15:00:00',
      endTime: '20:00:00',
      ...hiveSpace,
      summary: 'We spun 900 pounds of honey from 38 rooftops and ate an unreasonable amount of it.',
      _image: [ images.honeycomb ]
    },
    {
      key: 'lofts',
      title: 'Rooftop hive tour: Canal Street Lofts',
      eventType: 'apiary',
      startDate: date(-26),
      startTime: '10:00:00',
      endTime: '11:30:00',
      venue: 'Canal Street Lofts',
      address: '300 Canal Street, Port Sorrel, PA',
      summary: 'Two hives, one very proud building, and a lot of questions from the residents\' association.',
      _image: [ images['rooftop-beekeeper'] ]
    }
  ];
}

function resources({
  h, images, checklist
}) {
  const html = (markup) => h.area(h.rt(markup));
  return [
    {
      key: 'canI',
      title: 'Can I keep bees in the city?',
      topic: 'gettingStarted',
      level: 'beginner',
      summary: 'Short answer: yes, usually. The rules, the roofs and the neighbors.',
      _image: [ images['rooftop-hives'] ],
      main: html(`
        <p>Port Sorrel allows beekeeping with a free hive registration, and most of the city's roofs and yards can host a hive. Three questions matter more than the rules:</p>
        <ul>
          <li><strong>Access.</strong> Can you reach the hive safely, with a full box of honey in your arms, every week?</li>
          <li><strong>Neighbors.</strong> Bees fly up and away from a roof, but tell the people around you anyway, and offer them a jar.</li>
          <li><strong>Time.</strong> Plan on an hour a week in spring and summer.</li>
        </ul>
        <p>Not sure? Take the crash course, or join a rooftop tour before you buy anything.</p>
      `)
    },
    {
      key: 'hosting',
      title: 'Hosting a hive: a guide for building owners',
      topic: 'gettingStarted',
      level: 'beginner',
      summary: 'What a hive host provides, what we provide, and what your tenants will think (they will love it).',
      _image: [ images['rooftop-hives-cathedral'] ],
      main: html(`
        <p>A hive host offers a sunny, safe corner of a roof or yard. We provide the bees, the equipment, an insured beekeeper, and a share of the honey.</p>
        <h2>What we look for</h2>
        <ul>
          <li>A flat area at least 6 by 6 feet, out of the main walkway</li>
          <li>Access by stairs or a permanent ladder, not a hatch only</li>
          <li>Some shelter from the prevailing wind</li>
        </ul>
        <p>Ready to talk? Our hive host liaison will visit, look at the space and answer every question your building has.</p>
      `)
    },
    {
      key: 'roofSafety',
      title: 'Rooftop safety for beekeepers',
      topic: 'gettingStarted',
      level: 'intermediate',
      summary: 'Edges, heat, wind and lifting: the rules we follow on every roof.',
      _image: [ images['rooftop-beekeeper'] ],
      main: html(`
        <ul>
          <li>Never work a roof alone. Text a buddy when you go up and when you come down.</li>
          <li>Keep hives at least 10 feet from any edge without a parapet.</li>
          <li>Roofs get hot: inspect early in the morning in summer, and carry water.</li>
          <li>Strap every hive to something that will not move. Then check the straps after storms.</li>
          <li>Lift with a hive cart, not your back. A full super weighs 50 pounds.</li>
        </ul>
      `)
    },
    {
      key: 'forage',
      title: 'What city bees eat, month by month',
      topic: 'seasonal',
      level: 'beginner',
      summary: 'Street trees, weeds and window boxes: the surprising city forage calendar.',
      _image: [ images['bee-dandelion'] ],
      main: html(`
        <p>City bees often do better than country bees, because cities flower all season long.</p>
        <ul>
          <li><strong>March–April:</strong> red maples, crocus in the parks, and dandelions in every crack in the sidewalk</li>
          <li><strong>May–June:</strong> street trees in blossom, clover in the lawns, and the big one: linden trees</li>
          <li><strong>July–August:</strong> window boxes, community gardens, sumac along the rail lines</li>
          <li><strong>September–October:</strong> goldenrod and asters in vacant lots</li>
        </ul>
        <p>Want to help? Leave your dandelions, and plant something that flowers in August.</p>
      `)
    },
    {
      key: 'mites',
      title: 'Counting mites with an alcohol wash',
      topic: 'colonyHealth',
      level: 'intermediate',
      summary: 'The most accurate mite count, step by step, and what to do with the number.',
      _image: [ images.varroa ],
      main: html(`
        <ol>
          <li>Scoop half a cup of bees (about 300) from a brood frame, making sure the queen is not among them.</li>
          <li>Shake them in a jar of rubbing alcohol for a minute to dislodge the mites.</li>
          <li>Pour through a mesh into a white tray and count the mites.</li>
        </ol>
        <p>Divide by three for mites per hundred bees. At two or three in late summer, it is time to treat. This method kills the sample; if you would rather not, use a powdered-sugar roll and expect a slightly lower count.</p>
        <p>Come to a mite count meetup and we will do it together.</p>
      `)
    },
    {
      key: 'starterKit',
      title: 'Starter kit list',
      topic: 'gettingStarted',
      level: 'beginner',
      summary: 'Everything for your first season, with the printable checklist we hand out at the crash course.',
      _image: [ images.smoker ],
      _file: [ checklist ],
      main: html('<p>Most of this you can borrow from the collective in your first season: ask before you buy. The checklist covers the rest.</p>')
    },
    {
      key: 'citySwarms',
      title: 'Swarms in the city: what to do',
      topic: 'swarms',
      level: 'beginner',
      summary: 'For everyone: a swarm on a bike rack is not an emergency. Here is who to call.',
      _image: [ images.swarm ],
      main: html(`
        <p>A swarm is a colony looking for a new home. It may hang from a sign, a tree or a bike rack for a few hours, and the bees are usually gentle.</p>
        <ul>
          <li>Keep people back a few feet, and please do not spray anything.</li>
          <li>Text a photo to the swarm hotline with the cross streets.</li>
          <li>A swarm squad volunteer will come, usually within a couple of hours.</li>
        </ul>
        <p>Bees in a wall or under a roof are not a swarm, and need a building contractor who works with beekeepers. We can recommend one.</p>
      `)
    },
    {
      key: 'cityHoney',
      title: 'Why city honey tastes different',
      topic: 'honey',
      level: 'beginner',
      summary: 'Every rooftop has its own flavor. Here is why, and how to taste the difference.',
      _image: [ images['honey-jars'] ],
      main: html(`
        <p>A hive forages within about two miles, so a jar of honey is a map of the flowers on its blocks. Docklands honey is light and minty from linden trees; Sorrel Heights is darker from the park's chestnuts and late asters.</p>
        <p>Taste side by side, at room temperature, from a clean spoon. Then come to the block-by-block tasting and vote.</p>
      `)
    }
  ];
}

// Newest first here, then reversed so they are inserted oldest first (see
// linden.js).
function articles({
  h, images, date, authors, categories
}) {
  const blurb = (text) => h.area(h.rt(`<p>${text}</p>`));
  const body = (markup) => h.area(h.rt(markup));
  return [
    {
      key: 'rooftops',
      title: 'Thirty-eight rooftops and counting',
      publishedAt: date(-6),
      _image: [ images['rooftop-hives'] ],
      _authors: [ authors.kwame ],
      _categories: [ categories.hosts, categories.news ],
      blurb: blurb('Six new hive hosts joined this year, including a fire station and a hospital parking garage.'),
      main: body(`
        <p>When we started, three hives sat on a bike shop roof. This season the collective's bees lived on thirty-eight rooftops across seven neighborhoods.</p>
        <p>The newest hosts include Engine Company 9, the Riverbend Medical Center garage, and the Foundry Building, whose tenants voted unanimously to keep the bees after a trial summer.</p>
        <p>Thank you to every host. If your building has a sunny corner, we would love to talk.</p>
      `)
    },
    {
      key: 'ordinance',
      title: 'Why we\'re testifying for the backyard hive ordinance',
      publishedAt: date(-21),
      _image: [ images['city-garden'] ],
      _authors: [ authors.dani ],
      _categories: [ categories.advocacy ],
      blurb: blurb('Rooftops are great, but most people have a yard, not a roof. The city is finally catching up.'),
      main: body(`
        <p>Today, Port Sorrel only allows hives on roofs and in community gardens. The proposed ordinance would allow up to two hives in a backyard with a flyway barrier and a water source.</p>
        <p>We support it, with a request: pair every new backyard beekeeper with a mentor. Join us at testimony night to help make the case.</p>
      `)
    },
    {
      key: 'library',
      title: 'Meet a hive host: Northside Library',
      publishedAt: date(-58),
      _image: [ images['observation-hive'] ],
      _authors: [ authors.lou ],
      _categories: [ categories.hosts ],
      blurb: blurb('Two hives on the roof, one behind glass in the children\'s room, and a waiting list for story time.'),
      main: body(`
        <p>The library's observation hive has become the most popular thing in the building. Kids press their noses to the glass to find the queen; adults pretend not to.</p>
        <p>Amara Osei looks after the hive, and the roof colonies supply the honey for the library's fall fundraiser.</p>
      `)
    },
    {
      key: 'pollen',
      title: 'What the city\'s bees ate this year',
      publishedAt: date(-95),
      _image: [ images['pollen-cells'] ],
      _authors: [ authors.dani, authors.lou ],
      _categories: [ categories.news ],
      blurb: blurb('Students sorted pollen from six rooftops by color. Street trees won by a mile.'),
      main: body('<p>Lou\'s eighth graders collected pollen from six rooftops every two weeks and sorted it by color. Maples dominated spring, linden trees dominated June, and in August the bees found something purple we are still arguing about.</p>')
    },
    {
      key: 'swarmSpring',
      title: 'The swarm squad\'s busiest spring yet',
      publishedAt: date(-170),
      _image: [ images.swarm ],
      _authors: [ authors.kwame ],
      _categories: [ categories.news ],
      blurb: blurb('Forty-one calls, thirty-three swarms rehomed, one very confused parking enforcement officer.'),
      main: body('<p>Our hotline volunteers answered forty-one calls between April and June. Thirty-three were honey bee swarms, now living in new hives; the rest were bumble bees, wasps, and one remarkably bee-like moth.</p>')
    }
  ].reverse();
}

// Top-level pages and their children, in navigation order (see linden.js).
function pages(ctx) {
  const {
    name, h, images, members, credits
  } = ctx;
  const rt = (markup) => h.rt(markup);
  const tier = (fields) => ({
    type: 'price-card',
    buttonStyle: fields.featured ? 'primary' : 'outline',
    linkType: 'custom',
    ...fields,
    features: fields.features.map((item) => ({ item }))
  });
  return [
    {
      key: 'about',
      type: 'default-page',
      title: 'About',
      slug: '/about',
      main: h.area(
        h.layout(
          [ 6, [
            rt(`
              <h2>Beekeeping, together</h2>
              <p>${name} is a volunteer collective of city beekeepers, would-be beekeepers and people who just like bees. We started in 2015 with three hives on a bike shop roof.</p>
              <p>Today we keep hives on rooftops all over the city, rescue swarms, teach, plant, and push for a city that is good for pollinators and the people who live with them.</p>
              <h3>How we work</h3>
              <ul>
                <li>Dues are a sliding scale, and nobody is turned away.</li>
                <li>Every hive has a beekeeper and a buddy.</li>
                <li>Decisions are made at the open monthly meeting.</li>
              </ul>
            `)
          ] ],
          [ 6, [ h.image(images['green-roof-class']) ] ]
        ),
        rt('<h2>The organizing team</h2><p>Volunteers, elected every January. Reach any of us at the collective\'s email address.</p>'),
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
      intro: h.area(rt('<p class="large">Rooftop tours, Bees &amp; Brews, workdays and the occasional council hearing. Almost everything is free, and everyone is welcome.</p>'))
    },
    {
      key: 'learn',
      type: 'resource-page',
      title: 'Toolkit',
      slug: '/toolkit',
      intro: h.area(rt('<p class="large">Practical guides for city beekeepers, hive hosts and curious neighbors.</p>'))
    },
    {
      key: 'news',
      type: 'article-page',
      title: 'Dispatches',
      slug: '/dispatches',
      intro: h.area(rt('<p class="large">News from the rooftops, hive host stories, and where we stand on city policy.</p>'))
    },
    {
      key: 'members',
      type: 'member-page',
      title: 'Beekeepers',
      slug: '/beekeepers',
      intro: h.area(rt('<p class="large">The people behind the hives. Filter for a mentor, a swarm collector, or honey from your block.</p>'))
    },
    {
      key: 'swarms',
      type: 'default-page',
      title: 'Swarms',
      slug: '/swarms',
      main: h.area(
        {
          type: 'swarm-hotline',
          heading: 'Bees on your bike rack?',
          text: 'That\'s a swarm, and it\'s not dangerous. Text a photo and the cross streets to the swarm squad and a volunteer will come collect them.',
          phone: '',
          _image: [ images.swarm ]
        },
        rt(`
          <h2>What to expect</h2>
          <ol>
            <li>Text or call the hotline. A photo helps us tell honey bees from wasps.</li>
            <li>Dispatch finds the nearest volunteer, usually within a couple of hours.</li>
            <li>They collect the bees into a box, often at dusk when every bee is home, and give them a rooftop of their own.</li>
          </ol>
          <p>The service is free. If you would like to thank the squad, buy a jar of honey from your block.</p>
        `),
        rt('<h2>The swarm squad</h2>'),
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
      title: 'Get involved',
      slug: '/get-involved',
      main: h.area(
        rt('<p class="large">Keep bees, host bees, or just help. However you join, you get the newsletter, the events, and a crowd of people who think bees are the best thing about the city.</p>'),
        h.layout(
          [ 4, [ tier({
            title: 'Beekeeper',
            content: 'For members keeping bees, or learning to.',
            priceText: 'Pay what you can',
            priceTextUnit: '',
            priceDetail: 'Sliding scale, $0–$40 a year',
            featured: true,
            badge: true,
            badgeIcon: 'people',
            badgeLabel: 'Most of us',
            features: [ 'A mentor and a buddy', 'Loaner suits and tools', 'Extractor access', 'A vote at the monthly meeting' ],
            linkText: 'Join the collective',
            linkUrl: 'mailto:hive@example.org?subject=Joining'
          }) ] ],
          [ 4, [ tier({
            title: 'Hive host',
            content: 'For buildings, businesses and gardens with a sunny corner.',
            priceText: 'Free',
            priceTextUnit: '',
            priceDetail: 'We bring the bees',
            features: [ 'Hives, bees and an insured beekeeper', 'A share of every harvest', 'A plaque, if you want one' ],
            linkText: 'Host a hive',
            linkUrl: '/get-involved/host-a-hive'
          }) ] ],
          [ 4, [ tier({
            title: 'Supporter',
            content: 'Love bees, no time for them? This is you.',
            priceText: '$60',
            priceTextUnit: '/ year',
            features: [ 'Funds a new beekeeper\'s first suit', 'Newsletter and events', 'A jar of rooftop honey' ],
            linkText: 'Support us',
            linkUrl: 'mailto:hive@example.org?subject=Supporting'
          }) ] ]
        ),
        rt('<h2>Talk to a mentor</h2><p>New to bees? Every member is paired with an experienced beekeeper for their first season.</p>'),
        {
          type: 'members',
          show: 'mentor',
          limit: 4
        },
        h.button('All our mentors', '/beekeepers/roles/mentor', 'outline')
      )
    },
    {
      key: 'host',
      parent: 'join',
      type: 'default-page',
      title: 'Host a hive',
      slug: '/get-involved/host-a-hive',
      main: h.area(
        {
          type: 'banner',
          _image: [ images['rooftop-hives-cathedral'] ],
          height: 'medium',
          align: 'left',
          content: h.area(rt('<h2>Your roof could make honey</h2><p>We bring the bees, the equipment and an insured beekeeper. You get a share of the honey and some very good neighbors.</p>')),
          links: [
            {
              ...h.link('Talk to us about hosting', 'mailto:hive@example.org?subject=Hosting%20a%20hive'),
              style: 'primary'
            }
          ]
        },
        h.layout(
          [ 4, [ rt('<h3>1. We visit</h3><p>Our hive host liaison looks at your space, access and wind, and answers your building\'s questions.</p>') ] ],
          [ 4, [ rt('<h3>2. We set up</h3><p>In spring we install one or two hives, strapped down and out of the way, with water nearby.</p>') ] ],
          [ 4, [ rt('<h3>3. You enjoy</h3><p>A beekeeper visits weekly in season. At harvest, you get honey with your building\'s name on it.</p>') ] ]
        ),
        rt('<p>Read the <a href="/toolkit/hosting-a-hive-a-guide-for-building-owners">full guide for building owners</a>, or meet the people who will look after your bees on our <a href="/beekeepers">beekeepers</a> page.</p>')
      )
    },
    {
      key: 'membersArea',
      parent: 'join',
      type: 'default-page',
      title: 'Members\' corner',
      slug: '/get-involved/members-corner',
      // Only visible to visitors who are logged in.
      visibility: 'loginRequired',
      main: h.area(rt(`
        <p class="large">Hey, you're logged in. This page is just for members.</p>
        <ul>
          <li>The rooftop roster and buddy schedule</li>
          <li>Booking the extractor and the loaner suits</li>
          <li>Swarm squad shift sign-ups</li>
        </ul>
        <p>Something missing? Tell ${members.dani.title}, our coordinator, at hive@example.org.</p>
      `))
    }
  ];
}

// A different shape from Linden Valley's home page: the call to action comes
// first, events are a list, and the whole rooftop year is on show.
function home(ctx) {
  const {
    name, h, images, pages
  } = ctx;
  const rt = (markup) => h.rt(markup);
  const card = (icon, title, text, linkText, target) => ({
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
    ...h.link(linkText, target),
    style: 'primary'
  });
  return h.area(
    {
      type: 'banner',
      _image: [ images['rooftop-beekeeper'] ],
      height: 'tall',
      align: 'center',
      content: h.area(rt(`<h6 class="meta">${name} · since 2015</h6><h2>Bees belong in the city</h2><p class="large">We keep hives on rooftops across Port Sorrel, rescue swarms, and teach anyone who wants to learn.</p>`)),
      links: [
        {
          ...h.link('Host a hive', pages.host),
          style: 'primary'
        },
        {
          ...h.link('Join the collective', pages.join),
          style: 'outline'
        }
      ]
    },
    h.layout(
      [ 4, [ card('people', 'Learn the craft', 'A one-day crash course, then a mentor and a buddy for your first season.', 'Upcoming courses', '/events/eventType/course') ] ],
      [ 4, [ card('building', 'Host a hive', 'Got a sunny roof? We bring the bees, you get the honey.', 'How hosting works', pages.host) ] ],
      [ 4, [ card('earth', 'Report a swarm', 'Bees on a bike rack? Text the swarm squad and we\'ll rehome them, free.', 'Swarm help', pages.swarms) ] ]
    ),
    {
      type: 'association-stats',
      stats: [
        {
          source: 'custom',
          value: '38',
          label: 'Rooftops hosting hives'
        },
        {
          source: 'colonies',
          label: 'Colonies in the city'
        },
        {
          source: 'members',
          label: 'Beekeepers'
        },
        {
          source: 'swarmCollectors',
          label: 'On the swarm squad'
        }
      ]
    },
    rt('<h2>What\'s on</h2>'),
    {
      type: 'upcoming-events',
      limit: 4,
      eventType: 'all',
      display: 'list'
    },
    h.button('Full calendar', pages.events, 'outline'),
    h.layout(
      [ 7, [
        rt(`
          <h2>A hive on every block</h2>
          <p>City bees thrive on street trees, window boxes and the dandelions nobody mows. Our job is to keep them healthy, keep the neighbors happy, and make sure the city plants more of what they need.</p>
          <p>Most of our hives sit on roofs lent to us by hive hosts: shops, schools, a fire station and the public library.</p>
        `),
        h.button('Meet our hive hosts', '/dispatches/categories/hive-hosts')
      ] ],
      [ 5, [ h.image(images['bee-dandelion']) ] ]
    ),
    {
      type: 'swarm-hotline',
      heading: 'Bees on your bike rack?',
      text: 'It\'s a swarm, and it\'s not dangerous. Text a photo and the cross streets.',
      phone: '',
      _image: [ images.swarm ],
      ...h.link('What to do', pages.swarms)
    },
    rt('<h2>Honey from your block</h2>'),
    {
      type: 'members',
      show: 'honeySeller',
      limit: 4
    },
    rt('<h2>Dispatches</h2>'),
    {
      type: 'article',
      limit: 2,
      display: 'horizontal'
    },
    rt('<h2>The rooftop year</h2>'),
    {
      type: 'seasonal-calendar',
      display: 'year',
      months: rooftopYear
    }
  );
}

export default {
  defaultName: 'Port Sorrel Urban Bee Collective',
  images,
  styles,
  logo,
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
