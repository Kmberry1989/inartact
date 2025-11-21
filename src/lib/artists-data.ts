import { Artist } from './types';

export const artists: Artist[] = [
  {
    id: "1",
    artist: {
      name: "The Eighteen Art Collective",
      isAlive: true,
      bio: "The Eighteen Art Collective is a group of 18 Indianapolis-based Black artists who came together in 2020 to paint the 'Black Lives Matter' mural on Indiana Avenue. They have since formalized as a collective to advocate for equity, civic engagement, and the support of Black creatives in the city."
    },
    artwork: {
      title: "Black Lives Matter Street Mural",
      description: "A massive street mural where each of the 18 artists was assigned one letter of the phrase 'Black Lives Matter.' The mural is a vibrant affirmation of Black life and culture, located on a street with deep historical significance to Indianapolis's Black community.",
      medium: "Street Paint / Public Mural",
      date: "August 2020",
      location: "Indianapolis (Indiana Avenue)",
      cause: "Racial Justice",
      searchQuery: "The Eighteen Art Collective Indianapolis",
      imageUrl: "/theeighteenartcollective.jpg",
      latitude: 39.7753,
      longitude: -86.1649,
      categories: ["mural", "public art", "activism"]
    }
  },
  {
    id: "2",
    artist: {
      name: "Gary Gee",
      isAlive: true,
      bio: "Gary Gee is a multidisciplinary artist from Indianapolis who bridges the gap between street art and fine art. His work often incorporates ceramics, mixed media, and bold graphic styles to explore themes of urban life, hip-hop culture, and social justice."
    },
    artwork: {
      title: "We the People",
      description: "Part of the 'Murals for Racial Justice', this panel depicts a diverse group of protesters demanding justice. The work contrasts the constitutional ideal of 'We the People' with the reality of police brutality and systemic inequality faced by marginalized communities.",
      medium: "Acrylic on Plywood Banner",
      date: "2020",
      location: "Indianapolis (Archived by IndyPL)",
      cause: "Civil Rights, Police Brutality",
      searchQuery: "Gary Gee We the People mural Indianapolis",
      imageUrl: "/wethepeople.webp",
      categories: ["street art", "public art"]
    }
  },
  {
    id: "3",
    artist: {
      name: "Mechi Shakur (Demetrius Green)",
      isAlive: true,
      bio: "Mechi Shakur (Demetrius Green) is a self-taught visual artist whose work is characterized by raw emotion and intense social commentary. He often uses his art to challenge comfort zones and confront viewers with the harsh realities of racial violence and systemic oppression."
    },
    artwork: {
      title: "Blkkk Lives Don't Matter",
      description: "A powerful, eight-panel work created on boarded-up windows during the 2020 protests. The provocative title and imagery serve as a direct confrontation of the violence against Black bodies, challenging the viewer to acknowledge the disparity in how lives are valued.",
      medium: "Acrylic on Plywood Banner",
      date: "2020",
      location: "Indianapolis (Archived by IndyPL)",
      cause: "Racial Justice, Police Brutality",
      searchQuery: "Mechi Shakur Blkkk Lives Don't Matter",
      imageUrl: "/blkkklivesdontmatter.jpg",
      categories: ["controversial", "political"]
    }
  },
  {
    id: "4",
    artist: {
      name: "Israel Solomon",
      isAlive: true,
      bio: "Israel Solomon is a visual artist and educator known for his geometric, cubist-inspired style and vibrant use of color. His work frequently focuses on community, family, and the Black experience, often creating portraits that elevate everyday people to icons.",
      website: "https://www.israelsolomonart.com",
      social_media: [
        "https://www.instagram.com/israelsoloart/?hl=en",
        "https://www.facebook.com/israelsolomonart/"
      ]
    },
    artwork: {
      title: "American Duality",
      description: "This piece explores the split experience of American life, highlighting the stark differences in safety, policing, and opportunity faced by Black Americans versus their white counterparts.",
      medium: "Art/Mural on Plywood",
      date: "2020",
      location: "Indianapolis",
      cause: "Social Justice (General)",
      searchQuery: "Israel Solomon American Duality",
      imageUrl: "/americanduality.webp",
      portfolio_url: "https://www.israelsolomonart.com/art",
      categories: ["mural", "public art"],
      tags: ["mural", "contemporary", "public", "Indianapolis"],
      news_media_coverage: [
        "https://ganggangculture.com/artists/israel-solomon/",
        "https://theindianapolisreview.com/featured-artist-israel-solomon/"
      ]
    }
  },
  {
    id: "5",
    artist: {
      name: "Fred Wilson",
      isAlive: true,
      bio: "Fred Wilson is a world-renowned conceptual artist known for his practice of 'mining the museum,' where he rearranges and recontextualizes objects to reveal hidden histories of racism and exclusion. He represented the U.S. at the Venice Biennale in 2003.",
      website: "https://en.wikipedia.org/wiki/Fred_Wilson_(artist)",
      social_media: [
        "https://www.instagram.com/theartassignment/"
      ]
    },
    artwork: {
      title: "E Pluribus Unum",
      description: "This controversial project proposed remixing the Soldiers' and Sailors' Monument by isolating the sole African American figure (a formerly enslaved man) and elevating him on a new pedestal holding a flag of the African diaspora. The project was cancelled due to public controversy.",
      medium: "Sculptural Intervention (Proposed/Cancelled)",
      date: "2007-2011",
      location: "Indianapolis (Not Installed)",
      cause: "Racial Justice, Historical Reconciliation",
      searchQuery: "Fred Wilson E Pluribus Unum Indianapolis",
      imageUrl: "/EPluribusUnum.webp",
      portfolio_url: "https://en.wikipedia.org/wiki/E_Pluribus_Unum_(sculpture)",
      categories: ["public art", "proposal", "conceptual"],
      tags: ["sculpture", "Indianapolis"],
      news_media_coverage: [
        "https://www.pbs.org/video/art-assignment-fred-wilson/",
        "https://paulmullins.wordpress.com/2012/05/12/race-and-materiality-the-e-pluribus-unum-project/"
      ]
    }
  },
  {
    id: "6",
    artist: {
      name: "Robert Indiana (Robert Clark)",
      isAlive: false,
      born: "1928",
      died: "2018",
      bio: "Robert Indiana was a preeminent figure in the Pop Art movement, best known for his iconic 'LOVE' series. Born in Indiana, his work often used bold text and hard-edge painting to critique American politics, identity, and the deceptive nature of the 'American Dream.'",
      website: "https://www.robertindiana.com",
      social_media: [
        "https://www.instagram.com/explore/tags/robertindiana/"
      ]
    },
    artwork: {
      title: "The Confederacy: Mississippi",
      description: "Part of his 'Confederacy' series, this work is a blunt critique of Southern racism during the Civil Rights era. It features a map of Mississippi and references the 1964 murders of civil rights workers, condemning the state's violent resistance to justice.",
      medium: "Oil on Canvas",
      date: "1965",
      location: "Various Collections",
      cause: "Civil Rights",
      searchQuery: "Robert Indiana Confederacy Mississippi painting",
      imageUrl: "/mississippi.jpeg",
      portfolio_url: "https://www.robertindiana.com/artworks/artworks-items/mississippi",
      categories: ["print", "pop art"],
      tags: ["Confederacy series", "Mississippi"],
      news_media_coverage: [
        "https://www.umma.umich.edu/objects/mississippi-from-the-confederacy-1983-1-321-1/"
      ]
    }
  },
  {
    id: "7",
    artist: {
      name: "Samuel Levi Jones",
      isAlive: true,
      bio: "Samuel Levi Jones is an artist who challenges the authority of established history by physically deconstructing institutional materials like encyclopedias and law books. He strips the covers and reassembles them into abstract grids, visually dismantling the systems that have historically excluded marginalized voices.",
      website: "https://www.samuellevijones.com",
      social_media: [
        "https://www.instagram.com/slevijones/?hl=en"
      ]
    },
    artwork: {
      title: "Poplar Trees",
      description: "A diptych made from the skins of deconstructed books. The title references the song 'Strange Fruit' and the history of lynching (poplar trees), using the medium itself to critique how history and law have been used to oppress rather than protect.",
      medium: "Deconstructed Books on Canvas",
      date: "2015",
      location: "IU Eskenazi Museum of Art (Bloomington)",
      cause: "Racial Justice",
      searchQuery: "Samuel Levi Jones Poplar Trees",
      imageUrl: "/Poplar_Trees_2015.webp",
      portfolio_url: "https://www.samuellevijones.com/2015",
      categories: ["mixed media"],
      tags: [],
      news_media_coverage: [
        "https://artmuseum.indiana.edu/news-events/news-stories/2024-03-19-jones-diptych-acquisition.html"
      ]
    }
  },
  {
    id: "8",
    artist: {
      name: "Shauta Marsh & Jim Walker",
      isAlive: true,
      bio: "Shauta Marsh and Jim Walker are the co-founders of Big Car Collaborative, a non-profit arts organization. They specialize in 'creative placemaking,' using art to transform public spaces, build social cohesion, and improve quality of life in Indianapolis neighborhoods.",
      website: "https://www.bigcar.org",
      social_media: [
        "https://www.instagram.com/bigcarpix/?hl=en",
        "https://www.facebook.com/groups/bigcar/"
      ]
    },
    artwork: {
      title: "Social Alchemy",
      description: "'Social Alchemy' is a multi-year project exploring the concepts of utopia and dystopia, drawing inspiration from New Harmony, Indiana. It uses art, radio, and design to facilitate social connection and reimagine how communities can live better together.",
      medium: "Social Practice / Community Engagement",
      date: "Ongoing (Since 2005)",
      location: "Indianapolis (Garfield Park)",
      cause: "Social Connection",
      searchQuery: "Big Car Collaborative Social Alchemy",
      imageUrl: "/socialalchemy.jpg",
      portfolio_url: "https://www.bigcar.org/project/utopia/",
      latitude: 39.7326,
      longitude: -86.1415,
      mixcloudEmbed: '<iframe width="100%" height="120" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FWQRT_Indianapolis%2Fplaylists%2Fsocial-alchemy-symposium-2022%2F" allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share;" frameborder="0"></iframe>',
      vimeoUrl: "https://vimeo.com/709741692",
      categories: ["public art", "collaborative"],
      tags: ["Utopia", "Indianapolis"],
      news_media_coverage: [
        "https://www.bigcar.org/coverage/"
      ]
    }
  },
  {
    id: "9",
    artist: {
      name: "Andre Portee (AbsorbALL)",
      isAlive: true,
      bio: "Andre Portee is a Fort Wayne-based creative and the founder of AbsorbALL. He focuses on using art as a tool for community revitalization, specifically targeting public spaces in underserved neighborhoods to instill pride and ownership.",
      website: "http://www.andreportee.com",
      social_media: [
        "https://www.instagram.com/bodrega/?hl=en"
      ]
    },
    artwork: {
      title: "McMillen Park Basketball Court Murals",
      description: "A massive, vibrant mural painted directly onto the basketball courts of McMillen Park. The project revitalized a gray, neglected space into a colorful destination, celebrating Black culture and providing a beautiful, dignified space for youth recreation.",
      medium: "Court Paint / Public Art",
      date: "2020",
      location: "Fort Wayne (McMillen Park)",
      cause: "Racial Justice, Placemaking",
      searchQuery: "Andre Portee McMillen Park mural",
      imageUrl: "/mcmillenparkbasketballcourtmural.jpeg",
      portfolio_url: "http://www.andreportee.com",
      latitude: 41.0582,
      longitude: -85.1069,
      categories: ["mural", "public art"],
      news_media_coverage: [
        "https://inputfortwayne.com/absorball-turnstone/",
        "https://waynedalenews.com/2020/08/new-basketball-court-mural-unveiled/"
      ]
    }
  },
  {
    id: "10",
    artist: {
      name: "Rachel Kavathe",
      isAlive: true,
      bio: "Rachel Kavathe is an artist and landscape architect whose work lies at the intersection of nature, community, and urban design. She creates site-specific installations that highlight the identity of neighborhoods and the natural ecosystems they inhabit.",
      website: "https://rachelkavathestudio.com",
      social_media: [
        "https://www.instagram.com/rachelkavathe/?hl=en"
      ]
    },
    artwork: {
      title: "McDoel Blooms",
      description: "A street mural project designed to calm traffic and beautify the McDoel Gardens neighborhood. The design features native flora and garden imagery, reflecting the neighborhood's history and the shared values of its residents.",
      medium: "Street Mural / Public Art",
      date: "2025",
      location: "Bloomington (Allen & Fairview Streets)",
      cause: "Social Connection, Placemaking",
      searchQuery: "Rachel Kavathe artist Bloomington",
      imageUrl: "/mcdoelblooms.webp",
      portfolio_url: "https://rachelkavathestudio.com/project/2",
      latitude: 39.1539,
      longitude: -86.5396,
      categories: ["public art", "sculpture"],
      news_media_coverage: [
        "https://bloomington.in.gov/arts/public-art"
      ]
    }
  },
  {
    id: "11",
    artist: {
      name: "Kacy Jackson",
      isAlive: true,
      bio: "Kacy Jackson, founder of 'The Art of Kacy', is a muralist known for his photorealistic portraits and ability to capture the human spirit. His work is dedicated to storytelling and uplifting community heroes through large-scale public art.",
      social_media: [
        "https://www.instagram.com/kyjacksonart/"
      ]
    },
    artwork: {
      title: "Faces of the Fort: Southeast Mural",
      description: "This mural honors local figures Irene Paxia, who supports refugees, and William E. Warfield, a historic Black real estate investor. It celebrates the contributions of immigrants and Black leaders to the fabric of Fort Wayne.",
      medium: "Acrylic on Building / Mural",
      date: "June 2021",
      location: "Fort Wayne (4335 S Anthony Blvd)",
      cause: "Civil Rights, Immigration",
      searchQuery: "Kacy Jackson Faces of the Fort mural",
      imageUrl: "/facesofthefortkacyjackson.jfif",
      portfolio_url: "https://www.cityoffortwayne.in.gov/368/Faces-of-the-Fort",
      categories: ["mural", "public art"],
      news_media_coverage: [
        "https://inputfortwayne.com/facesofthefort/"
      ]
    }
  },
  {
    id: "12",
    artist: {
      name: "Benjamin Duke",
      isAlive: true,
      bio: "Benjamin Duke is a painter and professor at Michigan State University. His studio work often involves complex, figurative narratives, which translates into his murals as dynamic, multi-layered compositions that tackle history and social justice.",
      website: "https://bendukeart.com",
      social_media: [
        "https://www.instagram.com/bendukeart/"
      ]
    },
    artwork: {
      title: "Faces of the Fort: Northeast Mural",
      description: "The mural depicts Glynn Hines, a long-time advocate for racial justice, and Genevieve Meyer, a crusader against child marriage in Indiana. It highlights the ongoing fight for legislative and social protection of vulnerable groups.",
      medium: "Acrylic on Building / Mural",
      date: "June 2021",
      location: "Fort Wayne (1514 St. Joseph Blvd)",
      cause: "Racial Justice, Inclusive Community",
      searchQuery: "Benjamin Duke Faces of the Fort mural",
      imageUrl: "/facesofthefortbenjaminduke.jfif",
      portfolio_url: "https://bendukeart.com/mural-projects/faces-of-the-fort",
      categories: ["mural", "public art"]
    }
  },
  {
    id: "13",
    artist: {
      name: "Mitchell Egly",
      isAlive: true,
      bio: "Mitchell Egly is a Fort Wayne native and artist who specializes in large-scale public works that engage with local history. He returned to his hometown to contribute to its artistic renaissance, focusing on themes of civic pride and history."
    },
    artwork: {
      title: "Faces of the Fort: Southwest Mural",
      description: "A tribute to diverse local leaders who have shaped the community's history. The mural serves as a visual history lesson, ensuring that the contributions of civil rights leaders and community builders are not forgotten.",
      medium: "Acrylic on Building / Mural",
      date: "June 2021",
      location: "Fort Wayne (1818 Bluffton Road)",
      cause: "Social Justice (General)",
      searchQuery: "Mitchell Egly Faces of the Fort mural",
      imageUrl: "/facesofthefortmitchellegly.jfif",
      portfolio_url: "https://www.cityoffortwayne.in.gov/382/Southwest-Mural",
      categories: ["mural", "public art"]
    }
  },
  {
    id: "14",
    artist: {
      name: "May Wright Sewall",
      isAlive: false,
      born: "1844",
      died: "1920",
      bio: "May Wright Sewall was a legendary suffragist, educator, and peace activist. A close ally of Susan B. Anthony, she believed that access to culture and education was essential for women's liberation, leading her to found the Art Association (now Newfields) and the Propylaeum.",
      website: "https://indyencyclopedia.org/may-wright-sewall/"
    },
    artwork: {
      title: "Founding the Art Association of Indianapolis",
      description: "While not a visual artwork, her 'work' was the creation of the institutions themselves. She leveraged her influence to create spaces where women could organize, learn, and engage with the arts, laying the cultural foundation of Indianapolis.",
      medium: "Institution Building",
      date: "1883",
      location: "Indianapolis",
      cause: "Women's Suffrage, Education",
      searchQuery: "May Wright Sewall portrait",
      imageUrl: "/maywrightsewall.jpg",
      portfolio_url: "https://images.indianahistory.org/digital/collection/womenshistory",
      categories: ["portrait", "historical"],
      tags: ["Indiana", "suffrage"]
    }
  },
  {
    id: "15",
    artist: {
      name: "Florita Eichel",
      isAlive: false,
      born: "1892",
      died: "1983",
      bio: "Florita Eichel was a pioneering artist and suffragist in Evansville, Indiana. She joined the suffrage movement at age 20 and later became a key figure in the local arts scene, founding the Evansville Artists Guild to support professional artists in the region.",
      website: "https://historicevansville.com/"
    },
    artwork: {
      title: "Suffrage Movement Involvement & Guild Founding",
      description: "Eichel used her position to bridge political activism and the arts in Southern Indiana. Her legacy is the professionalization of the arts in Evansville and her early grassroots work securing the vote for women in the state.",
      medium: "Activism / Curatorial Work",
      date: "Early 1900s",
      location: "Evansville, Indiana",
      cause: "Women's Suffrage",
      searchQuery: "Florita Eichel artist Evansville",
      imageUrl: "/floritaeichel.jpg",
      portfolio_url: "",
      categories: ["print", "historical"],
      tags: ["Evansville", "Indiana", "courthouse"]
    }
  },
  {
    id: "16",
    artist: {
      name: "Kassie Woodworth",
      isAlive: true,
      bio: "Kassie Woodworth is an Indianapolis-based sculptor and fiber artist. Her work often utilizes traditional 'domestic' crafts like quilting and embroidery to elevate women's history and explore themes of labor, memory, and social connectivity.",
      social_media: [
        "https://www.instagram.com/kassiewoodworth.art/"
      ]
    },
    artwork: {
      title: "Together",
      description: "Commissioned for the 19th Amendment Centennial, this quilt commemorates the suffrage movement while explicitly acknowledging the racial divide within it. It honors the women of color whose fight for voting rights continued long after 1920.",
      medium: "Quilt (Mixed media)",
      date: "2020",
      location: "Indianapolis (Indiana Statehouse)",
      cause: "Women's Suffrage, Racial Justice",
      searchQuery: "Kassie Woodworth Together quilt",
      imageUrl: "/together.jpg",
      portfolio_url: "https://www.in.gov/arts/programs-and-services/public-art/",
      categories: ["quilt", "textile", "public art"]
    }
  },
  {
    id: "17",
    artist: {
      name: "Shelby Nower",
      isAlive: true,
      bio: "Shelby Nower is a fine artist and muralist from Decatur, Indiana. She is known for her colorful, illustrative style and character-driven works that often bring historical figures or community narratives to life."
    },
    artwork: {
      title: "nINeteenth",
      description: "A celebratory painting depicting women triumphantly casting their first votes. Nower integrated the names of prominent Indiana suffragists into the clothing of the figures, turning the painting into a historical document of the movement's leaders.",
      medium: "Painting (Oil/Acrylic)",
      date: "2020",
      location: "Decatur / Indiana Statehouse",
      cause: "Women's Suffrage",
      searchQuery: "Shelby Nower nINeteenth painting",
      imageUrl: "/nINeteenth.webp",
      portfolio_url: "https://www.in.gov/arts/programs-and-services/public-art/",
      categories: ["textile", "quilt", "public art"]
    }
  },
  {
    id: "18",
    artist: {
      name: "Bonnie Fillenwarth",
      isAlive: true,
      bio: "Bonnie Fillenwarth is an Indiana artist who works in painting and mixed media. She is deeply interested in women's history and uses her art to tell the stories of forgotten or underappreciated female figures.",
      website: "https://www.herflag.com",
      social_media: [
        "https://www.instagram.com/bonniefillenwarth/",
        "https://www.facebook.com/BonnieFillenwarthArt/"
      ]
    },
    artwork: {
      title: "Her Flag (Indiana Stripe)",
      description: "Created as Indiana's contribution to the national 'Her Flag' collaborative project. The stripe illustrates key Hoosier suffragists, visually weaving Indiana's specific history into the larger national tapestry of the 19th Amendment ratification.",
      medium: "Mixed Media on Fabric",
      date: "2020",
      location: "Indianapolis (Work travels nationally)",
      cause: "Women's Suffrage",
      searchQuery: "Bonnie Fillenwarth Her Flag Indiana",
      imageUrl: "/herflag.webp",
      portfolio_url: "https://www.herflag.com/indiana",
      categories: ["textile", "public art"],
      tags: ["Her Flag", "suffrage"]
    }
  },
  {
    id: "19",
    artist: {
      name: "Robert Indiana (Suffrage Work)",
      isAlive: false,
      born: "1928",
      died: "2018",
      bio: "Robert Indiana was a preeminent figure in the Pop Art movement. Beyond his famous 'LOVE' works, he was deeply engaged with American history and created visual tributes to key historical figures, including suffragists.",
      website: "https://www.robertindiana.com"
    },
    artwork: {
      title: "The Mother of Us All (Posters/Designs)",
      description: "Indiana created the set design and costumes for the Virgil Thomson/Gertrude Stein opera 'The Mother of Us All', which chronicles the life of Susan B. Anthony. His pop-art aesthetic brought a modern, graphic energy to the story of the suffrage movement.",
      medium: "Lithography / Set Design",
      date: "1967 / 1976",
      location: "Various Collections",
      cause: "Women's Suffrage",
      searchQuery: "Robert Indiana Mother of Us All poster",
      imageUrl: "/themotherofusall.jpg",
      portfolio_url: "https://www.robertindiana.com/artworks/",
      categories: ["poster", "pop art"],
      tags: ["Indiana", "Smithsonian"]
    }
  },
  {
    id: "20",
    artist: {
      name: "Karen Boone",
      isAlive: true,
      bio: "Karen Boone is a 'natural pigment painter' who forages for clay, ochre, and charcoal near her home in Southern Indiana. She processes these materials by hand to create zero-waste paints, making her entire artistic process an act of environmental stewardship.",
      website: "https://www.karenboone.com",
      social_media: [
        "https://www.instagram.com/karenbooneartist/"
      ]
    },
    artwork: {
      title: "Natural Pigment Works",
      description: "Her abstract paintings are literal pieces of the Indiana landscape. By refusing commercial, toxic paints in favor of earth-based materials, her work advocates for a sustainable relationship with the land.",
      medium: "Painting / Mixed Media",
      date: "Ongoing",
      location: "Borden, Indiana",
      cause: "Environmental Justice",
      searchQuery: "Karen Boone natural pigment artist",
      imageUrl: "/karenboonenaturalpigment.webp",
      portfolio_url: "https://www.karenboone.com/portfolio",
      categories: ["photo", "studio", "artist"]
    }
  },
  {
    id: "21",
    artist: {
      name: "Justin Roberts & Shannon Davis-Roberts",
      isAlive: true,
      bio: "Justin and Shannon operate 'Walk the Willow,' a creative studio specializing in large-scale sculptures made from woven willow branches. They are committed to using sustainable, biodegradable materials that eventually return to the earth without harm."
    },
    artwork: {
      title: "Walk the Willow Sculptures",
      description: "Whimsical, large-scale woven sculptures (often figures or structures) that demonstrate how public art can be created with a zero-waste footprint. Their work emphasizes the beauty of natural, renewable materials.",
      medium: "Willow Branches / Sculpture",
      date: "Ongoing",
      location: "Southern Indiana",
      cause: "Environmental Justice, Zero Waste",
      searchQuery: "Walk the Willow sculpture",
      imageUrl: "/walkthewillow.png",
      portfolio_url: "https://www.walkthewillow.com/gallery",
      categories: ["sculpture", "public art"]
    }
  },
  {
    id: "22",
    artist: {
      name: "Pat Rowbottom",
      isAlive: true,
      bio: "Pat Rowbottom is a painter and a leader (Vice President) of the 'Artists for Climate Awareness' organization. She works to mobilize the arts community to address the climate crisis through exhibitions, education, and fundraising.",
      website: "https://www.artistsforclimateawareness.org"
    },
    artwork: {
      title: "Artists for Climate Awareness",
      description: "While her personal work often celebrates nature, her primary 'activist' work is organizational—facilitating exhibits that force the community to confront climate change and conservation issues.",
      medium: "Painting / Advocacy",
      date: "Ongoing",
      location: "Bloomington",
      cause: "Climate Change Awareness",
      searchQuery: "Pat Rowbottom art",
      imageUrl: "/patRowbottom-Mikes-Garden.jpg",
      portfolio_url: "https://www.artistsforclimateawareness.org/gallery",
      categories: ["photo", "portrait"]
    }
  },
  {
    id: "23",
    artist: {
      name: "Angelica Frausto (Nerdy Brown Kid)",
      isAlive: true,
      bio: "Angelica Frausto, known as 'Nerdy Brown Kid,' is a Xicana artist and social scientist. Her work is deeply rooted in the experiences of women of color and immigrants, often serving as visual advocacy for the abolition of immigration detention.",
      website: "https://nerdybrownkid.com",
      social_media: [
        "https://www.instagram.com/nerdybrownkid/"
      ]
    },
    artwork: {
      title: "Portraits/Illustrations",
      description: "Her illustrations are often used in campaigns for organizations like the Detention Watch Network. They focus on the humanity, dreams, and resilience of those impacted by the immigration system, countering dehumanizing political narratives.",
      medium: "Digital Art / Graphic Design",
      date: "Ongoing",
      location: "South Bend",
      cause: "Immigration Detention Abolition",
      searchQuery: "Angelica Frausto Nerdy Brown Kid art",
      imageUrl: "/nerdybrownkid.jpeg",
      portfolio_url: "https://nerdybrownkid.com/portfolio/",
      categories: ["digital art", "portrait"]
    }
  },
  {
    id: "24",
    artist: {
      name: "Beatriz Vasquez",
      isAlive: true,
      bio: "Beatriz Vasquez is a Mexican-American 'artivist' who specializes in papel picado (cut paper). She transforms this delicate folk art tradition into large-scale, political statements about border culture, human rights, and the realities of the immigrant experience.",
      website: "https://beatrizvasquez.com",
      social_media: [
        "https://www.instagram.com/beatrizvasquezartist/"
      ]
    },
    artwork: {
      title: "Immigrantes Bienvenidos (Immigrants Welcome)",
      description: "A public installation designed to signal safety and welcome to Latinx neighbors. It uses the imagery of the Monarch butterfly—a symbol of natural, borderless migration—to advocate for the free movement and dignity of people.",
      medium: "Papel Picado / Mural",
      date: "Ongoing",
      location: "Indianapolis",
      cause: "Immigration, Community Safety",
      searchQuery: "Beatriz Vasquez Immigrantes Bienvenidos",
      imageUrl: "/beatrizvasquez.jpg",
      portfolio_url: "https://beatrizvasquez.com/portfolio/",
      categories: ["public art", "paper art", "installation"],
      tags: ["Latinx", "immigration", "Indiana"]
    }
  },
  {
    id: "25",
    artist: {
      name: "Nasreen Khan",
      isAlive: true,
      bio: "Nasreen Khan is a queer, biracial, immigrant artist and writer. Living in the Haughville neighborhood, she uses art to explore 'the margins'—of race, gender, and geography—often using scavenged urban wood to highlight the resilience of nature in the city.",
      website: "https://nasreenkhan.com",
      social_media: [
        "https://www.instagram.com/nasreenkhanartist/"
      ]
    },
    artwork: {
      title: "Paintings & Mixed Media",
      description: "Her mixed media works often combine natural elements with personal narrative, grappling with the feeling of 'otherness' in the Midwest and challenging the viewer to see the beauty in the marginalized and the reclaimed.",
      medium: "Visual Art / Scavenged Wood",
      date: "Ongoing",
      location: "Indianapolis (Haughville)",
      cause: "Immigration, Gender & LGBTQ+ Rights",
      searchQuery: "Nasreen Khan artist Indianapolis",
      imageUrl: "/nasreenkhanbluewoman.webp",
      portfolio_url: "https://nasreenkhan.com/portfolio/",
      categories: ["portrait", "photography"]
    }
  },
  {
    id: "26",
    artist: {
      name: "Jawshing Arthur Liou",
      isAlive: true,
      bio: "Jawshing Arthur Liou is a digital media artist and professor whose work often involves pilgrimages to sacred or politically charged sites. He uses high-definition video to create meditative, immersive experiences that deal with human tragedy and impermanence.",
      website: "https://www.jawshingliou.com",
      social_media: [
        "https://www.instagram.com/jawshingarthurliou/"
      ]
    },
    artwork: {
      title: "Whispers from the Divide",
      description: "A video installation filmed along the US-Mexico border. Rather than focusing on political rhetoric, the work captures the atmospheric and physical reality of the borderlands, fostering empathy and offering a meditative look at the barriers we erect.",
      medium: "Video Installation",
      date: "Recent",
      location: "Bloomington (IU Museum)",
      cause: "Immigration, Empathy",
      searchQuery: "Jawshing Arthur Liou Whispers from the Divide",
      imageUrl: "/whispersfromthedivide.png",
      portfolio_url: "https://www.jawshingliou.com/works",
      categories: ["installation", "public art"]
    }
  },
  {
    id: "28",
    artist: {
      name: "John Fabion",
      isAlive: false,
      bio: "John Fabion was a WPA artist. His work in Bedford is a direct homage to the specific labor history of the 'Limestone Capital of the World'."
    },
    artwork: {
      title: "Limestone Quarry Workers",
      description: "A relief sculpture capturing the dangerous and physically demanding work of quarrying limestone. It honors the dignity of the industrial worker during an era when labor rights were a central national conversation.",
      medium: "Terra-Cotta Relief",
      date: "1942",
      location: "Bedford (U.S. Post Office)",
      cause: "Labor Rights",
      searchQuery: "John Fabion Limestone Quarry Workers",
      imageUrl: "/limestonequarryworkersjohnfabion.jpg",
      portfolio_url: "https://livingnewdeal.org/projects/post-office-bedford-in/",
      categories: ["relief", "historical"]
    }
  },
  {
    id: "29",
    artist: {
      name: "William F. Kaeser",
      isAlive: false,
      bio: "William F. Kaeser was an Indiana artist who participated in the New Deal art programs. His work often focused on the honest depiction of rural and industrial labor."
    },
    artwork: {
      title: "Loggers",
      description: "A mural depicting the logging industry, emphasizing the collective effort and physical strength required by the workers, serving as a permanent tribute to the region's working-class roots.",
      medium: "Oil on Canvas Mural",
      date: "1941",
      location: "Pendleton (U.S. Post Office)",
      cause: "Labor Rights",
      searchQuery: "William F. Kaeser Loggers mural",
      imageUrl: "/loggers.png",
      portfolio_url: "https://livingnewdeal.org/projects/post-office-mural-pendleton-in/",
      categories: ["mural", "historical"]
    }
  },
  {
    id: "30",
    artist: {
      name: "Nat Werner",
      isAlive: false,
      bio: "Nat Werner was a sculptor known for his socially conscious work. His WPA commission in Fowler reflects the agricultural backbone of the local economy."
    },
    artwork: {
      title: "Rest during Prairie Plowing",
      description: "A relief sculpture that humanizes the agricultural laborer, depicting a moment of rest. It acknowledges the exhaustion and humanity of the worker behind the agricultural production.",
      medium: "Cast Stone Relief",
      date: "1940",
      location: "Fowler (U.S. Post Office)",
      cause: "Labor Rights",
      searchQuery: "Nat Werner Rest during Prairie Plowing",
      imageUrl: "/restduringprairieplowing.jpg",
      portfolio_url: "https://livingnewdeal.org/projects/post-office-relief-fowler-in/",
      categories: ["relief", "New Deal art"]
    }
  },
  {
    id: "31",
    artist: {
      name: "Artists At Work (Indianapolis Cohort)",
      isAlive: true,
      bio: "Modeled after the WPA, 'Artists At Work' is a workforce resilience program that puts artists on a salary with benefits. It treats art-making as essential labor, pairing artists with social impact organizations to serve the community.",
      website: "https://www.cicf.org"
    },
    artwork: {
      title: "Salaried Artist Employment Program",
      description: "This is not a single artwork but a radical labor model. It validates art as 'work' deserving of a living wage and health insurance, directly combating the precarious financial reality that many artists face.",
      medium: "Program/Economic Model",
      date: "Ongoing (Since 2023)",
      location: "Indianapolis",
      cause: "Labor Rights for Artists",
      searchQuery: "Artists At Work Indianapolis logo",
      imageUrl: "/artistsatwork.png",
      portfolio_url: "https://www.cicf.org/news/",
      categories: ["logo", "graphic design"]
    }
  },
  {
    id: "32",
    artist: {
      name: "Robert Indiana (Robert Clark)",
      isAlive: false,
      born: "1928",
      died: "2018",
      bio: "Robert Indiana was a preeminent figure in the Pop Art movement. His iconic 'LOVE' series is known worldwide, but he also engaged deeply with political themes, using his graphic style to support causes he believed in.",
      website: "https://www.robertindiana.com"
    },
    artwork: {
      title: "HOPE",
      description: "Created for Barack Obama's 2008 presidential campaign, the 'HOPE' sculpture utilizes Indiana's signature stacked typography. Proceeds from the print sales were donated to the campaign, marking a direct intersection of Pop Art and political activism.",
      medium: "Mixed Media / Sculpture",
      date: "2008",
      location: "Various Collections (Global)",
      cause: "Political Change",
      searchQuery: "Robert Indiana HOPE sculpture",
      imageUrl: "/hope.jpg",
      portfolio_url: "https://www.robertindiana.com/artworks/",
      categories: ["pop art", "icon"],
      tags: ["LOVE sculpture", "iconic"]
    }
  },
  {
    id: "33",
    artist: {
      name: "Jeffrey A. Wolin",
      isAlive: true,
      bio: "Jeffrey A. Wolin is a photographer and professor known for his unique combination of portraiture and hand-written text. His work gives voice to his subjects, allowing them to write their own stories directly onto the photographic prints.",
      website: "https://jeffreywolin.com",
      social_media: [
        "https://www.instagram.com/jeffreywolin/"
      ]
    },
    artwork: {
      title: "Written in Memory (Series)",
      description: "This series documents the stories of Holocaust survivors. By combining portraits with the survivors' own written memories, Wolin ensures these personal histories are preserved and witnesses to the atrocities of the past are honored.",
      medium: "Photography with Text",
      date: "1990s–2000s",
      location: "IU Bloomington",
      cause: "Social Justice, Holocaust Memory",
      searchQuery: "Jeffrey A. Wolin Written in Memory",
      imageUrl: "/writteninmemory.jpg",
      portfolio_url: "https://jeffreywolin.com/gallery/",
      categories: ["photography", "documentary"]
    }
  }
];