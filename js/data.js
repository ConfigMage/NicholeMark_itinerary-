/*
 * Trip data. Everything the site shows comes from this file, so this is the
 * only place you need to edit to change a plan, a restaurant, or a seat.
 *
 * - `q` on any item is a Google Maps search, used for the "Map" links.
 * - `time` is a short label shown as a pill (Morning, Lunch, Dinner, ...).
 * - Seats were transcribed from the original poster, which was low resolution.
 *   Double check them against the airline and Amtrak confirmations.
 */
window.TRIP = {
  couple: "Nichole & Mark",
  title: "East Coast Honeymoon",
  start: "2026-10-22",
  end: "2026-10-31",
  tagline: ["History", "Museums", "Great Food", "Unforgettable Memories"],

  cities: {
    phl: {
      name: "Philadelphia",
      short: "Philly",
      range: "October 22 – 27, 2026",
      nights: 5,
      motto: "History Happens Here",
      stay: null,
    },
    dc: {
      name: "Washington, D.C.",
      short: "D.C.",
      range: "October 27 – 31, 2026",
      nights: 4,
      motto: "Monuments, Museums & More Together",
      stay: {
        name: "The Watergate Hotel",
        area: "Foggy Bottom, on the Potomac",
        q: "The Watergate Hotel, 2650 Virginia Ave NW, Washington, DC",
      },
    },
  },

  travel: {
    out: {
      type: "flight",
      label: "Flight to Philadelphia",
      date: "2026-10-22",
      carrier: "American Airlines",
      legs: [
        {
          from: { code: "PDX", city: "Portland", place: "Portland International Airport" },
          to: { code: "PHL", city: "Philadelphia", place: "Philadelphia International Airport" },
          seats: "33E & 33F",
        },
      ],
    },
    train: {
      type: "train",
      label: "Train to Washington",
      date: "2026-10-27",
      carrier: "Amtrak",
      legs: [
        {
          from: { code: "PHL", city: "Philadelphia", place: "30th Street Station, Philadelphia" },
          to: { code: "WAS", city: "Washington", place: "Union Station, Washington DC" },
          seats: "7A & 7C",
        },
      ],
    },
    home: {
      type: "flight",
      label: "Flights Home",
      date: "2026-10-31",
      carrier: "American Airlines",
      legs: [
        {
          from: { code: "DCA", city: "Washington", place: "Ronald Reagan Washington National Airport" },
          to: { code: "PHL", city: "Philadelphia", place: "Philadelphia International Airport" },
          seats: "20F & 20D",
        },
        {
          from: { code: "PHL", city: "Philadelphia", place: "Philadelphia International Airport" },
          to: { code: "PDX", city: "Portland", place: "Portland International Airport" },
          seats: "30E & 30F",
        },
      ],
    },
  },

  days: [
    {
      date: "2026-10-22",
      title: "Arrival & Old City",
      icon: "lamp",
      travel: "out",
      segments: [
        {
          city: "phl",
          items: [
            { text: "Fly in, arrive, and check in" },
            { text: "Old City stroll", time: "Evening", q: "Old City, Philadelphia, PA" },
          ],
          food: [{ name: "Red Owl Tavern", time: "Dinner", q: "Red Owl Tavern, Philadelphia" }],
        },
      ],
    },
    {
      date: "2026-10-23",
      title: "Liberty & Independence",
      icon: "bell",
      segments: [
        {
          city: "phl",
          items: [
            { text: "Liberty Bell", q: "Liberty Bell Center, Philadelphia" },
            { text: "Independence Hall", q: "Independence Hall, Philadelphia" },
            { text: "Academy of Natural Sciences", q: "Academy of Natural Sciences of Drexel University" },
          ],
          food: [{ name: "Reading Terminal Market", q: "Reading Terminal Market, Philadelphia" }],
        },
      ],
    },
    {
      date: "2026-10-24",
      title: "Eastern State & the Mütter",
      icon: "gate",
      segments: [
        {
          city: "phl",
          items: [
            { text: "Eastern State Penitentiary", q: "Eastern State Penitentiary, Philadelphia" },
            { text: "Mütter Museum", q: "Mütter Museum, Philadelphia" },
          ],
          food: [
            { name: "A café in Fairmount", time: "Daytime", q: "cafe Fairmount, Philadelphia" },
            { name: "Dinner in Old City", time: "Dinner", q: "restaurants Old City, Philadelphia" },
          ],
        },
      ],
    },
    {
      date: "2026-10-25",
      title: "Zoo & Penn Museum",
      icon: "paw",
      segments: [
        {
          city: "phl",
          items: [
            { text: "Philadelphia Zoo", q: "Philadelphia Zoo" },
            { text: "Penn Museum", q: "Penn Museum, Philadelphia" },
          ],
          food: [{ name: "Lunch near the zoo or in University City", time: "Lunch", q: "restaurants University City, Philadelphia" }],
        },
      ],
    },
    {
      date: "2026-10-26",
      title: "Franklin Institute & Free Time",
      icon: "bulb",
      segments: [
        {
          city: "phl",
          items: [
            { text: "The Franklin Institute", q: "The Franklin Institute, Philadelphia" },
            { text: "Extra time for shopping or historic sights" },
          ],
          food: [
            { name: "Reading Terminal Market", q: "Reading Terminal Market, Philadelphia" },
            { name: "or a Center City restaurant", q: "restaurants Center City, Philadelphia" },
          ],
        },
      ],
    },
    {
      date: "2026-10-27",
      title: "Philly to D.C.",
      icon: "train",
      travel: "train",
      segments: [
        {
          city: "phl",
          label: "Morning in Philadelphia",
          items: [
            { text: "Breakfast and check out" },
            { text: "Head to 30th Street Station", q: "30th Street Station, Philadelphia" },
          ],
          food: [{ name: "Coffee and pastry near the hotel", time: "Breakfast" }],
        },
        {
          city: "dc",
          label: "Arrive in Washington",
          items: [
            { text: "Arrive and check in at The Watergate Hotel", q: "The Watergate Hotel, Washington, DC" },
            { text: "Explore Foggy Bottom or the Georgetown waterfront", q: "Georgetown Waterfront Park, Washington, DC" },
          ],
          food: [{ name: "Kingbird", note: "at the hotel", time: "Dinner", q: "Kingbird, The Watergate Hotel, Washington, DC" }],
        },
      ],
    },
    {
      date: "2026-10-28",
      title: "National Zoo",
      icon: "panda",
      segments: [
        {
          city: "dc",
          items: [
            { text: "Smithsonian's National Zoo", q: "Smithsonian's National Zoo, Washington, DC" },
            { text: "Back to the hotel to relax" },
          ],
          food: [
            { name: "Duke's Counter", note: "burgers", q: "Duke's Counter, Washington, DC" },
            { name: "or Mika's Neapolitan Pizza", note: "pizza", q: "Mika's Neapolitan Pizza, 3000 Connecticut Ave NW, Washington, DC" },
          ],
        },
      ],
    },
    {
      date: "2026-10-29",
      title: "Two Smithsonians",
      icon: "museum",
      segments: [
        {
          city: "dc",
          items: [
            { text: "National Museum of Natural History", time: "Morning", q: "National Museum of Natural History, Washington, DC" },
            { text: "National Museum of American History", time: "Afternoon", q: "National Museum of American History, Washington, DC" },
          ],
          food: [
            { name: "Atrium Café", note: "inside Natural History", time: "Lunch", q: "Atrium Cafe, National Museum of Natural History" },
            { name: "Café Fiorello DC or Kingbird", time: "Dinner", q: "Cafe Fiorello, 1001 Pennsylvania Ave NW, Washington, DC" },
          ],
        },
      ],
    },
    {
      date: "2026-10-30",
      title: "Museums & the Mall",
      icon: "spy",
      segments: [
        {
          city: "dc",
          items: [
            { text: "National Museum of the American Indian", time: "Morning", note: "about 2 hrs", q: "National Museum of the American Indian, Washington, DC" },
            { text: "International Spy Museum", time: "Afternoon", note: "about 2 hrs", q: "International Spy Museum, Washington, DC" },
            { text: "Lincoln Memorial & the National Mall", time: "Evening", q: "Lincoln Memorial, Washington, DC" },
          ],
          food: [
            { name: "Mitsitam Native Foods Café", note: "inside the museum", time: "Lunch", q: "Mitsitam Native Foods Cafe, Washington, DC" },
            { name: "The Smith or Kingbird", time: "Dinner", q: "The Smith, Washington, DC" },
          ],
        },
      ],
    },
    {
      date: "2026-10-31",
      title: "Farewell & Flights Home",
      icon: "dome",
      travel: "home",
      segments: [
        {
          city: "dc",
          items: [
            { text: "Breakfast at The Watergate Hotel", time: "Morning" },
            { text: "Check out" },
            { text: "Explore the area with a bit more shopping" },
            { text: "Head to the airport (DCA)", q: "Ronald Reagan Washington National Airport" },
          ],
          food: [],
        },
      ],
    },
  ],
};
