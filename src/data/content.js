/**
 * Every user-facing string of the site, in French and English.
 * Shape: { key: { fr: '…', en: '…' } } — resolve with t() from src/utils/i18n.js.
 *
 * French is the primary language: write it first, then the English equivalent.
 * Nothing here may state a fact the client has not supplied (no years in
 * business, no figures, no certifications, no testimonials).
 */

export const content = {
  // ---------------------------------------------------------------- global --
  brand: {
    baseline: { fr: 'travaux en bois — l’art de la vie', en: 'woodwork — the art of living' },
    descriptor: {
      fr: 'Revêtement de sols, pose et ponçage de parquets, et tous travaux en bois.',
      en: 'Floor coverings, parquet laying and sanding, and all kinds of woodwork.',
    },
    logoPlaceholder: { fr: 'LOGO TO BE PROVIDED', en: 'LOGO TO BE PROVIDED' },
    sloganPlaceholder: { fr: 'SLOGAN TO BE PROVIDED', en: 'SLOGAN TO BE PROVIDED' },
    addressPlaceholder: { fr: 'ADDRESS TO BE PROVIDED', en: 'ADDRESS TO BE PROVIDED' },
  },

  nav: {
    home: { fr: 'Accueil', en: 'Home' },
    services: { fr: 'Services', en: 'Services' },
    projects: { fr: 'Réalisations', en: 'Projects' },
    contact: { fr: 'Contact', en: 'Contact' },
    legal: { fr: 'Mentions légales', en: 'Legal notice' },
    privacy: { fr: 'Politique de confidentialité', en: 'Privacy policy' },
  },

  common: {
    quoteCta: { fr: 'Demander un devis', en: 'Request a quote' },
    callCta: { fr: 'Appeler', en: 'Call' },
    phoneLabel: { fr: 'Téléphone', en: 'Phone' },
    emailLabel: { fr: 'E-mail', en: 'Email' },
    hoursLabel: { fr: 'Horaires', en: 'Opening hours' },
    addressLabel: { fr: 'Adresse', en: 'Address' },
    hoursWeek: { fr: 'Lundi – vendredi, 07h30 – 17h00', en: 'Monday – Friday, 07:30 – 17:00' },
    hoursWeekend: { fr: 'Samedi et dimanche, fermé', en: 'Saturday and Sunday, closed' },
    servicesLabel: { fr: 'Prestations', en: 'Services' },
    allProjects: { fr: 'Toutes les réalisations', en: 'All projects' },
    seeServices: { fr: 'Voir les services', en: 'View services' },
    discover: { fr: 'Découvrir', en: 'Discover' },
    year: { fr: 'Année', en: 'Year' },
    location: { fr: 'Lieu', en: 'Location' },
    surface: { fr: 'Surface', en: 'Surface area' },
    materials: { fr: 'Matériaux', en: 'Materials' },
  },

  a11y: {
    skipToContent: { fr: 'Aller au contenu principal', en: 'Skip to main content' },
    mainNav: { fr: 'Navigation principale', en: 'Main navigation' },
    footerNav: { fr: 'Navigation du pied de page', en: 'Footer navigation' },
    legalNav: { fr: 'Liens légaux', en: 'Legal links' },
    languageSwitcher: { fr: 'Choix de la langue', en: 'Language selection' },
    switchToFrench: { fr: 'Afficher le site en français', en: 'View the site in French' },
    switchToEnglish: { fr: 'Afficher le site en anglais', en: 'View the site in English' },
    openMenu: { fr: 'Ouvrir le menu', en: 'Open menu' },
    closeMenu: { fr: 'Fermer le menu', en: 'Close menu' },
    menuLabel: { fr: 'Menu', en: 'Menu' },
    homeLink: { fr: 'BI SERVICES Sàrl, retour à l’accueil', en: 'BI SERVICES Sàrl, back to home' },
  },


  /**
   * Alternative text for the licensed images that illustrate the pages, keyed
   * as in src/data/siteImages.js. The photographs of real job sites carry their
   * own alt text in src/data/projects.js.
   */
  siteImageAlt: {
    hero: {
      fr: 'Lumière du jour traversant une pièce et glissant sur un plancher en bois clair',
      en: 'Daylight crossing a room and running along a pale wooden floor',
    },
    'intro-principale': {
      fr: 'Ombres losangées dessinées par le soleil sur un plancher en bois',
      en: 'Diamond shadows cast by the sun across a wooden floor',
    },
    'intro-detail': {
      fr: 'Surface de chêne vue de près, veinage et joints entre les lames',
      en: 'Oak surface seen close up, grain and joints between the boards',
    },
    'parquet-principale': {
      fr: 'Parquet à bâtons rompus avec une finition satinée',
      en: 'Herringbone parquet with a satin finish',
    },
    'parquet-detail': {
      fr: 'Motif d’un parquet vu de près',
      en: 'Close-up of a parquet pattern',
    },
    'souples-principale': {
      fr: 'Revêtement de sol textile vu de près, armure tissée',
      en: 'Textile floor covering seen close up, woven structure',
    },
    'souples-detail': {
      fr: 'Revêtement de sol textile dans un ton chaud',
      en: 'Textile floor covering in a warm tone',
    },
    contact: {
      fr: 'Intérieur clair avec mur en briques et plancher en bois',
      en: 'Bright interior with a brick wall and a wooden floor',
    },
    introuvable: {
      fr: 'Lames de plancher en bois vues du dessus',
      en: 'Wooden floorboards seen from above',
    },
  },

  // ------------------------------------------------------------------ meta --
  meta: {
    home: {
      title: {
        fr: 'BI SERVICES Sàrl — Pose et rénovation de sols',
        en: 'BI SERVICES Sàrl — Flooring installation and renovation',
      },
      description: {
        fr: 'BI SERVICES Sàrl, entreprise de pose de sols dirigée par Blerim Ibrahimi : pose, ponçage et imprégnation de parquet, pose de lino, PVC, moquette et vinyle.',
        en: 'BI SERVICES Sàrl, a flooring company led by Blerim Ibrahimi: parquet installation, sanding and sealing, plus linoleum, PVC, carpet and vinyl installation.',
      },
    },
    services: {
      title: {
        fr: 'Services — Pose, ponçage et sols souples | BI SERVICES Sàrl',
        en: 'Services — Parquet, resilient floors and carpet | BI SERVICES Sàrl',
      },
      description: {
        fr: 'Pose, ponçage et imprégnation de parquet ; pose de lino, PVC, moquette, vinyle. Préparation du support, exécution et finitions par BI SERVICES Sàrl.',
        en: 'Parquet installation, sanding and sealing; installation of linoleum, PVC, carpet and vinyl. Subfloor preparation, execution and finishing by BI SERVICES Sàrl.',
      },
    },
    projects: {
      title: {
        fr: 'Réalisations — Chantiers de sols | BI SERVICES Sàrl',
        en: 'Projects — Completed flooring work | BI SERVICES Sàrl',
      },
      description: {
        fr: 'Une sélection de chantiers réalisés par BI SERVICES Sàrl : parquet, PVC et lino, moquette, vinyle.',
        en: 'A selection of projects completed by BI SERVICES Sàrl: parquet, PVC and lino, carpet, vinyl.',
      },
    },
    contact: {
      title: {
        fr: 'Contact — Demander un devis | BI SERVICES Sàrl',
        en: 'Contact — Request a quote | BI SERVICES Sàrl',
      },
      description: {
        fr: 'Demander un devis à BI SERVICES Sàrl : téléphone, e-mail, horaires et formulaire de contact.',
        en: 'Request a quote from BI SERVICES Sàrl: phone, email, opening hours and contact form.',
      },
    },
    legal: {
      title: { fr: 'Mentions légales — BI SERVICES Sàrl', en: 'Legal notice — BI SERVICES Sàrl' },
      description: {
        fr: 'Mentions légales du site de BI SERVICES Sàrl.',
        en: 'Legal notice for the BI SERVICES Sàrl website.',
      },
    },
    privacy: {
      title: {
        fr: 'Politique de confidentialité — BI SERVICES Sàrl',
        en: 'Privacy policy — BI SERVICES Sàrl',
      },
      description: {
        fr: 'Politique de confidentialité du site de BI SERVICES Sàrl.',
        en: 'Privacy policy for the BI SERVICES Sàrl website.',
      },
    },
    notFound: {
      title: { fr: 'Page introuvable — BI SERVICES Sàrl', en: 'Page not found — BI SERVICES Sàrl' },
      description: {
        fr: 'La page demandée n’existe pas.',
        en: 'The requested page does not exist.',
      },
    },
    projectPrefix: {
      fr: 'Réalisation',
      en: 'Project',
    },
  },

  // ------------------------------------------------------------------ home --
  home: {
    heroPlaceholder: {
      fr: 'HERO PHOTO PLACEHOLDER — COMPLETED FLOORING PROJECT',
      en: 'HERO PHOTO PLACEHOLDER — COMPLETED FLOORING PROJECT',
    },
    heroEyebrow: { fr: 'Pose de sols — Suisse', en: 'Flooring — Switzerland' },
    heroStatement: {
      fr: 'Parquet, lino, PVC, moquette et vinyle. Un support préparé, une pose exécutée avec soin, une finition qui tient dans le temps.',
      en: 'Parquet, lino, PVC, carpet and vinyl. A properly prepared subfloor, careful installation, and a finish that lasts.',
    },
    introEyebrow: { fr: 'L’entreprise', en: 'The company' },
    introTitle: {
      fr: 'Un seul métier, exercé de bout en bout.',
      en: 'One trade, carried out from start to finish.',
    },
    introBody1: {
      fr: 'BI SERVICES Sàrl est dirigée par Blerim Ibrahimi. L’entreprise pose et rénove des sols : parquet, linoléum, PVC, moquette et vinyle, dans des logements comme dans des locaux professionnels.',
      en: 'BI SERVICES Sàrl is led by Blerim Ibrahimi. The company installs and renovates floors — parquet, linoleum, PVC, carpet and vinyl — in homes as well as commercial spaces.',
    },
    introBody2: {
      fr: 'Tout commence par le support : mesures, contrôle de l’humidité et de la planéité, préparation. C’est là que se décide la tenue du sol fini. Vient ensuite la pose, puis le ponçage et la finition, exécutés dans l’ordre et sans raccourci.',
      en: 'Everything starts with the subfloor: measurements, moisture and flatness checks, preparation. That is where the durability of the finished floor is decided. Then comes installation, followed by sanding and finishing, carried out in order and without shortcuts.',
    },
    introPlaceholder: {
      fr: 'PHOTO PLACEHOLDER — MAINS AU TRAVAIL, POSE DE LAMES',
      en: 'PHOTO PLACEHOLDER — HANDS AT WORK, LAYING BOARDS',
    },
    introDetailPlaceholder: {
      fr: 'PHOTO PLACEHOLDER — DÉTAIL DE FINITION, PLINTHE ET RIVE',
      en: 'PHOTO PLACEHOLDER — FINISHING DETAIL, SKIRTING AND EDGE',
    },

    servicesEyebrow: { fr: 'Ce que nous faisons', en: 'What we do' },
    servicesTitle: { fr: 'Deux domaines, un même soin.', en: 'Two fields, the same care.' },
    servicesLink: { fr: 'Détail des prestations', en: 'Full service details' },

    projectsEyebrow: { fr: 'En images', en: 'In pictures' },
    projectsTitle: { fr: 'Travaux récents.', en: 'Recent work.' },
    projectsIntro: {
      fr: 'Parquets massifs et contrecollés, bâtons rompus, panneaux Versailles, escaliers et terrasses. Quelques chantiers récents.',
      en: 'Solid and engineered parquet, herringbone, Versailles panels, staircases and decking. A few recent projects.',
    },

    whyEyebrow: { fr: 'Notre façon de travailler', en: 'How we work' },
    whyTitle: { fr: 'Ce qui fait la différence sur un sol.', en: 'What makes the difference in a floor.' },
    why: [
      {
        title: { fr: 'Le métier', en: 'The craft' },
        body: {
          fr: 'Un sol ne se juge pas sur un échantillon mais sur le chantier : le support, l’humidité, la lumière, l’usage de la pièce. Chaque situation impose sa méthode.',
          en: 'A floor is not judged from a sample but on site: the subfloor, the moisture, the light, the use of the room. Every situation calls for its own method.',
        },
      },
      {
        title: { fr: 'La précision', en: 'Precision' },
        body: {
          fr: 'Coupes nettes, joints réguliers, raccords qui tombent juste, rives alignées. Ce sont les détails que l’on voit tous les jours, une fois les meubles remis en place.',
          en: 'Clean cuts, even joints, seams that land where they should, aligned edges. These are the details you see every day, once the furniture is back in place.',
        },
      },
      {
        title: { fr: 'Un chantier propre', en: 'A clean site' },
        body: {
          fr: 'Accès et surfaces protégés, aspiration à la source pendant le ponçage, nettoyage en fin de journée. Les lieux restent praticables du début à la fin.',
          en: 'Protected access routes and surfaces, dust extraction at source while sanding, cleaning at the end of each day. The space stays usable from start to finish.',
        },
      },
      {
        title: { fr: 'Les délais', en: 'Deadlines' },
        body: {
          fr: 'Un calendrier annoncé avant le début des travaux, tenu, et une information claire dès qu’un imprévu apparaît sur le chantier.',
          en: 'A schedule agreed before work begins and kept to, with clear information as soon as something unexpected comes up on site.',
        },
      },
    ],

    contactEyebrow: { fr: 'Prendre contact', en: 'Get in touch' },
    contactTitle: {
      fr: 'Un projet de sol ? Parlons-en.',
      en: 'A flooring project? Let’s talk it through.',
    },
    contactBody: {
      fr: 'Décrivez la surface, le revêtement souhaité et l’état actuel du sol. Nous revenons vers vous avec une proposition.',
      en: 'Tell us the surface area, the covering you have in mind and the current state of the floor. We will come back to you with a proposal.',
    },
  },

  // -------------------------------------------------------------- services --
  services: {
    eyebrow: { fr: 'Services', en: 'Services' },
    title: { fr: 'Pose, rénovation et finition de sols.', en: 'Installation, renovation and finishing of floors.' },
    intro: {
      fr: 'Deux domaines de prestation, de la préparation du support à la finition. Le détail de chaque étape est arrêté avec vous avant le début des travaux.',
      en: 'Two areas of work, from subfloor preparation through to finishing. The details of each stage are agreed with you before work begins.',
    },
    processLabel: { fr: 'Déroulement', en: 'Process' },
    materialsLabel: { fr: 'Matériaux', en: 'Materials' },
    materialsNote: {
      fr: 'Le choix final dépend de l’usage de la pièce, du support et du budget. Nous en discutons sur place.',
      en: 'The final choice depends on how the room is used, on the subfloor and on the budget. We discuss it on site.',
    },
    ctaTitle: {
      fr: 'Un devis, sans engagement.',
      en: 'A quote, with no obligation.',
    },
    ctaBody: {
      fr: 'Une visite sur place permet de mesurer, de contrôler le support et d’établir une proposition précise.',
      en: 'An on-site visit allows us to measure, check the subfloor and put together a precise proposal.',
    },
  },

  /**
   * The two services. The French titles are the client's exact wording and must
   * not be rewritten.
   */
  serviceList: [
    {
      id: 'parquet',
      number: '01',
      /** Keys in src/data/siteImages.js (licensed images, see CREDITS.md). */
      photo: 'parquet-principale',
      photoSecondary: 'parquet-principale',
      photoDetail: 'parquet-detail',
      title: {
        fr: 'Pose, ponçage et imprégnation de parquet',
        en: 'Parquet installation, sanding and sealing',
      },
      short: {
        fr: 'Pose collée ou flottante, rénovation de parquets existants, ponçage et finition.',
        en: 'Glued or floating installation, renovation of existing parquet, sanding and finishing.',
      },
      body: {
        fr: 'Parquet massif ou contrecollé, neuf ou à rénover. Un parquet existant peut souvent être poncé plutôt que remplacé : les passages marqués, les taches et les anciennes finitions disparaissent, et le bois retrouve sa teinte. La finition est choisie selon l’usage de la pièce.',
        en: 'Solid or engineered parquet, newly laid or renovated. An existing parquet floor can often be sanded rather than replaced: worn paths, stains and old finishes disappear, and the wood regains its tone. The finish is chosen to suit how the room is used.',
      },
      imagePlaceholder: {
        fr: 'PHOTO PLACEHOLDER — PONÇAGE DE PARQUET EN COURS',
        en: 'PHOTO PLACEHOLDER — PARQUET SANDING IN PROGRESS',
      },
      detailPlaceholder: {
        fr: 'PHOTO PLACEHOLDER — PARQUET FINI, DÉTAIL DE VEINAGE',
        en: 'PHOTO PLACEHOLDER — FINISHED PARQUET, GRAIN DETAIL',
      },
      process: [
        {
          title: { fr: 'Relevé et contrôle du support', en: 'Survey and subfloor check' },
          body: {
            fr: 'Mesures, contrôle de l’humidité, de la planéité et de la cohésion du support.',
            en: 'Measurements, checks on moisture, flatness and the soundness of the subfloor.',
          },
        },
        {
          title: { fr: 'Préparation', en: 'Preparation' },
          body: {
            fr: 'Dépose de l’ancien revêtement si nécessaire, primaire, ragréage et mise à niveau.',
            en: 'Removal of the old covering where needed, primer, levelling compound and flattening.',
          },
        },
        {
          title: { fr: 'Pose', en: 'Installation' },
          body: {
            fr: 'Pose collée ou flottante, calepinage, coupes et raccords, joints de dilatation en rive.',
            en: 'Glued or floating installation, setting out, cuts and joints, expansion gaps at the edges.',
          },
        },
        {
          title: { fr: 'Ponçage', en: 'Sanding' },
          body: {
            fr: 'Passes successives, du grain le plus grossier au plus fin, bords et angles compris, avec aspiration à la source.',
            en: 'Successive passes from the coarsest to the finest grit, edges and corners included, with dust extraction at source.',
          },
        },
        {
          title: { fr: 'Imprégnation et finition', en: 'Sealing and finishing' },
          body: {
            fr: 'Imprégnation, huile ou vernis selon l’usage de la pièce, en plusieurs couches avec égrenage.',
            en: 'Impregnation, oil or lacquer depending on the use of the room, applied in several coats with intermediate sanding.',
          },
        },
        {
          title: { fr: 'Plinthes et remise des lieux', en: 'Skirting and handover' },
          body: {
            fr: 'Pose ou repose des plinthes, nettoyage, conseils d’entretien et de remise en service.',
            en: 'Fitting or refitting of skirting boards, cleaning, and advice on maintenance and when the floor can be used again.',
          },
        },
      ],
      materials: {
        fr: [
          'Parquet massif',
          'Parquet contrecollé',
          'Finitions : imprégnation, huile, huile-cire ou vernis',
          'Essences et formats à définir avec vous',
        ],
        en: [
          'Solid parquet',
          'Engineered parquet',
          'Finishes: impregnation, oil, oil-wax or lacquer',
          'Wood species and board formats to be defined with you',
        ],
      },
      cta: { fr: 'Demander un devis parquet', en: 'Request a parquet quote' },
    },
    {
      id: 'souples',
      number: '02',
      photo: 'souples-principale',
      photoSecondary: 'souples-principale',
      photoDetail: 'souples-detail',
      title: {
        fr: 'Pose de lino, PVC, moquette, vinyle, etc.',
        en: 'Installation of linoleum, PVC, carpet, vinyl and more',
      },
      short: {
        fr: 'Revêtements souples en lés ou en dalles, posés sur support préparé et ragréé.',
        en: 'Resilient and textile coverings in sheets or tiles, laid on a prepared and levelled subfloor.',
      },
      body: {
        fr: 'Les revêtements souples ne pardonnent rien au support : le moindre défaut se lit en surface une fois la pose terminée. La préparation et le ragréage représentent donc une part importante du travail. Viennent ensuite le calepinage, la pose et les finitions de rives.',
        en: 'Resilient coverings are unforgiving of the subfloor: the slightest defect shows through once the covering is down. Preparation and levelling are therefore a large part of the work. Then come setting out, installation and edge finishing.',
      },
      imagePlaceholder: {
        fr: 'PHOTO PLACEHOLDER — POSE DE LÉ PVC, ROULEAU DÉROULÉ',
        en: 'PHOTO PLACEHOLDER — LAYING SHEET PVC, ROLL UNROLLED',
      },
      detailPlaceholder: {
        fr: 'PHOTO PLACEHOLDER — SOUDURE À CHAUD D’UN JOINT DE LINO',
        en: 'PHOTO PLACEHOLDER — HOT WELDING A LINOLEUM SEAM',
      },
      process: [
        {
          title: { fr: 'Relevé et contrôle du support', en: 'Survey and subfloor check' },
          body: {
            fr: 'Mesures, contrôle de l’humidité et de la planéité, repérage des points singuliers.',
            en: 'Measurements, moisture and flatness checks, identification of awkward details.',
          },
        },
        {
          title: { fr: 'Préparation et ragréage', en: 'Preparation and levelling' },
          body: {
            fr: 'Dépose de l’ancien revêtement, primaire d’accrochage, ragréage et ponçage du ragréage.',
            en: 'Removal of the old covering, bonding primer, levelling compound and sanding of the screed.',
          },
        },
        {
          title: { fr: 'Calepinage', en: 'Setting out' },
          body: {
            fr: 'Implantation des lés ou des dalles, position des joints, sens de pose et calepinage des seuils.',
            en: 'Layout of sheets or tiles, joint positions, laying direction and threshold detailing.',
          },
        },
        {
          title: { fr: 'Pose', en: 'Installation' },
          body: {
            fr: 'Pose collée, coupes en périphérie, traitement des passages de portes et des remontées en plinthe.',
            en: 'Glued installation, perimeter cuts, treatment of doorways and coved skirting where required.',
          },
        },
        {
          title: { fr: 'Soudure et finitions', en: 'Welding and finishing' },
          body: {
            fr: 'Soudure à chaud des joints pour le lino et le PVC, profilés de seuil, barres de rive et plinthes.',
            en: 'Hot welding of seams for linoleum and PVC, threshold profiles, edge trims and skirting.',
          },
        },
        {
          title: { fr: 'Nettoyage et remise des lieux', en: 'Cleaning and handover' },
          body: {
            fr: 'Nettoyage du sol posé, évacuation des déchets de chantier et conseils d’entretien.',
            en: 'Cleaning of the finished floor, removal of site waste and maintenance advice.',
          },
        },
      ],
      materials: {
        fr: [
          'Linoléum en lés',
          'PVC en lés ou en dalles',
          'Moquette en lés ou en dalles',
          'Vinyle, lames ou dalles (LVT)',
          'Autres revêtements souples sur demande',
        ],
        en: [
          'Sheet linoleum',
          'PVC in sheets or tiles',
          'Carpet in rolls or tiles',
          'Vinyl planks or tiles (LVT)',
          'Other resilient coverings on request',
        ],
      },
      cta: { fr: 'Demander un devis sols souples', en: 'Request a resilient flooring quote' },
    },
  ],

  // -------------------------------------------------------------- projects --
  projects: {
    eyebrow: { fr: 'Réalisations', en: 'Projects' },
    title: { fr: 'Chantiers réalisés.', en: 'Completed projects.' },
    intro: {
      fr: 'Parquet, sols souples et moquette. Les photographies et les informations de chaque chantier sont à fournir par le client.',
      en: 'Parquet, resilient floors and carpet. Photographs and details for each project are still to be provided by the client.',
    },
    filterLabel: { fr: 'Filtrer par type de sol', en: 'Filter by floor type' },
    filters: {
      all: { fr: 'Tous', en: 'All' },
      parquet: { fr: 'Parquet', en: 'Parquet' },
      'pvc-lino': { fr: 'PVC / Lino', en: 'PVC / Lino' },
      moquette: { fr: 'Moquette', en: 'Carpet' },
      vinyle: { fr: 'Vinyle', en: 'Vinyl' },
      other: { fr: 'Autre', en: 'Other' },
    },
    countZero: { fr: '0 réalisation', en: '0 projects' },
    countOne: { fr: '1 réalisation', en: '1 project' },
    countMany: { fr: '{count} réalisations', en: '{count} projects' },
    emptyTitle: { fr: 'Aucune réalisation dans cette catégorie', en: 'No projects in this category' },
    emptyBody: {
      fr: 'Les chantiers de ce type seront publiés dès que les photographies seront disponibles.',
      en: 'Projects of this type will be published as soon as photographs are available.',
    },
    emptyAction: { fr: 'Afficher toutes les réalisations', en: 'Show all projects' },
  },

  projectDetail: {
    backToProjects: { fr: 'Toutes les réalisations', en: 'All projects' },
    galleryTitle: { fr: 'Galerie', en: 'Gallery' },
    galleryEmpty: {
      fr: 'PHOTOS À FOURNIR — galerie du chantier',
      en: 'PHOTOS TO BE PROVIDED — project gallery',
    },
    beforeAfterTitle: { fr: 'Avant / après', en: 'Before / after' },
    beforeLabel: { fr: 'Avant', en: 'Before' },
    afterLabel: { fr: 'Après', en: 'After' },
    sliderLabel: {
      fr: 'Comparer l’avant et l’après : utilisez les flèches gauche et droite',
      en: 'Compare before and after: use the left and right arrow keys',
    },
    previousProject: { fr: 'Réalisation précédente', en: 'Previous project' },
    nextProject: { fr: 'Réalisation suivante', en: 'Next project' },
    ctaTitle: { fr: 'Un chantier comparable ?', en: 'A similar project?' },
    ctaBody: {
      fr: 'Décrivez votre sol actuel et la surface concernée : nous établissons un devis.',
      en: 'Describe your current floor and the surface area involved and we will put together a quote.',
    },
    coverPlaceholderFallback: {
      fr: 'PHOTO PLACEHOLDER — PHOTO DE COUVERTURE DU CHANTIER',
      en: 'PHOTO PLACEHOLDER — PROJECT COVER PHOTO',
    },
  },

  lightbox: {
    label: { fr: 'Galerie du chantier', en: 'Project gallery' },
    close: { fr: 'Fermer la galerie', en: 'Close gallery' },
    previous: { fr: 'Image précédente', en: 'Previous image' },
    next: { fr: 'Image suivante', en: 'Next image' },
    counter: { fr: 'Image {current} sur {total}', en: 'Image {current} of {total}' },
    openImage: { fr: 'Agrandir l’image', en: 'Enlarge image' },
  },

  // --------------------------------------------------------------- contact --
  contact: {
    eyebrow: { fr: 'Contact', en: 'Contact' },
    title: { fr: 'Parlons de votre sol.', en: 'Let’s talk about your floor.' },
    intro: {
      fr: 'Pour un devis, le plus simple est d’appeler. Vous pouvez aussi écrire ou remplir le formulaire : indiquez la surface, le revêtement souhaité et l’état actuel du sol.',
      en: 'The quickest way to get a quote is to call. You can also write or fill in the form: tell us the surface area, the covering you have in mind and the current state of the floor.',
    },
    formTitle: { fr: 'Formulaire de contact', en: 'Contact form' },
    formIntro: {
      fr: 'Les champs signalés comme obligatoires doivent être remplis.',
      en: 'Fields marked as required must be completed.',
    },
    mapTitle: { fr: 'Zone d’intervention', en: 'Service area' },
    mapPlaceholder: {
      fr: 'MAP PLACEHOLDER — carte à activer une fois l’adresse fournie',
      en: 'MAP PLACEHOLDER — map to be activated once the address is provided',
    },
    mapConsentTitle: { fr: 'Charger la carte', en: 'Load the map' },
    mapConsentBody: {
      fr: 'La carte est fournie par {provider}. En la chargeant, vous acceptez que ce service dépose des cookies et reçoive votre adresse IP.',
      en: 'The map is provided by {provider}. By loading it you accept that this service sets cookies and receives your IP address.',
    },
    mapConsentButton: { fr: 'Afficher la carte', en: 'Show the map' },
    mapFrameTitle: { fr: 'Carte de localisation', en: 'Location map' },
    mapDirections: { fr: 'Ouvrir l’itinéraire', en: 'Open directions' },
    hoursNote: {
      fr: 'En dehors des horaires, laissez un message : nous rappelons.',
      en: 'Outside these hours, leave a message and we will call you back.',
    },
    sidePlaceholder: {
      fr: 'PHOTO PLACEHOLDER — OUTILS ET MATÉRIEL DE POSE',
      en: 'PHOTO PLACEHOLDER — TOOLS AND INSTALLATION EQUIPMENT',
    },
  },

  form: {
    name: { fr: 'Nom', en: 'Name' },
    email: { fr: 'E-mail', en: 'Email' },
    phone: { fr: 'Téléphone', en: 'Phone' },
    phoneOptional: { fr: 'facultatif', en: 'optional' },
    optional: { fr: 'facultatif', en: 'optional' },
    workType: { fr: 'Type de travaux', en: 'Type of work' },
    workTypePlaceholder: { fr: 'Choisir une option', en: 'Select an option' },
    workTypeOther: { fr: 'Autre', en: 'Other' },
    surface: { fr: 'Surface approximative en m²', en: 'Approximate surface area in m²' },
    message: { fr: 'Message', en: 'Message' },
    messageHint: {
      fr: 'Surface, revêtement actuel, revêtement souhaité, délai envisagé.',
      en: 'Surface area, current covering, desired covering, intended timeframe.',
    },
    photos: { fr: 'Photos', en: 'Photos' },
    photosOptional: { fr: 'facultatif', en: 'optional' },
    photosHint: {
      fr: 'JPG, PNG, WebP ou HEIC. 10 Mo maximum par fichier, 5 fichiers au maximum.',
      en: 'JPG, PNG, WebP or HEIC. 10 MB maximum per file, 5 files maximum.',
    },
    photosButton: { fr: 'Ajouter des photos', en: 'Add photos' },
    photosRemove: { fr: 'Retirer {name}', en: 'Remove {name}' },
    photosSelected: { fr: '{count} fichier(s) sélectionné(s)', en: '{count} file(s) selected' },
    submit: { fr: 'Envoyer la demande', en: 'Send request' },
    submitting: { fr: 'Envoi en cours…', en: 'Sending…' },
    required: { fr: 'obligatoire', en: 'required' },
    errorSummaryTitle: {
      fr: 'Le formulaire contient des erreurs :',
      en: 'The form contains errors:',
    },
    errors: {
      nameRequired: { fr: 'Veuillez indiquer votre nom.', en: 'Please enter your name.' },
      nameTooLong: { fr: 'Le nom est trop long (100 caractères au maximum).', en: 'This name is too long (100 characters maximum).' },
      emailRequired: { fr: 'Veuillez indiquer votre adresse e-mail.', en: 'Please enter your email address.' },
      emailInvalid: {
        fr: 'Cette adresse e-mail n’est pas valide.',
        en: 'This email address is not valid.',
      },
      phoneInvalid: {
        fr: 'Ce numéro n’est pas valide. Exemple : +41 79 000 00 00 ou 079 000 00 00.',
        en: 'This number is not valid. Example: +41 79 000 00 00 or 079 000 00 00.',
      },
      surfaceInvalid: {
        fr: 'Indiquez une surface en m², sous forme de nombre positif.',
        en: 'Enter a surface area in m² as a positive number.',
      },
      messageRequired: { fr: 'Veuillez écrire un message.', en: 'Please write a message.' },
      messageTooShort: {
        fr: 'Le message doit contenir au moins 10 caractères.',
        en: 'The message must be at least 10 characters long.',
      },
      messageTooLong: {
        fr: 'Le message ne peut pas dépasser 2000 caractères.',
        en: 'The message cannot be longer than 2000 characters.',
      },
      fileType: {
        fr: '{name} : format non accepté. Utilisez JPG, PNG, WebP ou HEIC.',
        en: '{name}: file type not accepted. Use JPG, PNG, WebP or HEIC.',
      },
      fileSize: {
        fr: '{name} : fichier trop lourd. 10 Mo au maximum.',
        en: '{name}: file too large. 10 MB maximum.',
      },
      fileCount: {
        fr: '5 photos au maximum. Les fichiers en trop n’ont pas été ajoutés.',
        en: '5 photos maximum. The extra files were not added.',
      },
    },
    successTitle: { fr: 'Message envoyé', en: 'Message sent' },
    successBody: {
      fr: 'Merci, votre demande nous est bien parvenue. Nous revenons vers vous dans les meilleurs délais.',
      en: 'Thank you, we have received your request. We will get back to you as soon as possible.',
    },
    successAgain: { fr: 'Envoyer une autre demande', en: 'Send another request' },
    errorTitle: { fr: 'L’envoi a échoué', en: 'Sending failed' },
    errorBody: {
      fr: 'Le message n’a pas pu être envoyé. Merci d’appeler le {phone} ou d’écrire à {email}.',
      en: 'The message could not be sent. Please call {phone} or write to {email}.',
    },
    notConfiguredTitle: {
      fr: 'Le formulaire en ligne n’est pas encore actif',
      en: 'The online form is not active yet',
    },
    notConfiguredBody: {
      fr: 'FORM SERVICE TO BE PROVIDED. En attendant, appelez le {phone} ou écrivez à {email} : votre demande sera traitée de la même manière.',
      en: 'FORM SERVICE TO BE PROVIDED. In the meantime, please call {phone} or write to {email} — your request will be handled just the same.',
    },
  },

  // ----------------------------------------------------------------- legal --
  legalPages: {
    placeholderBadge: {
      fr: 'LEGAL CONTENT TO BE PROVIDED AND REVIEWED',
      en: 'LEGAL CONTENT TO BE PROVIDED AND REVIEWED',
    },
    placeholderNotice: {
      fr: 'Le texte de cette page doit être rédigé et validé par le client, au besoin avec un conseil juridique. Le contenu ci-dessous n’est qu’une trame de structure.',
      en: 'The text of this page must be written and approved by the client, with legal advice where appropriate. The content below is a structural outline only.',
    },
    sectionPlaceholder: {
      fr: 'LEGAL CONTENT TO BE PROVIDED AND REVIEWED',
      en: 'LEGAL CONTENT TO BE PROVIDED AND REVIEWED',
    },
    legal: {
      eyebrow: { fr: 'Informations légales', en: 'Legal information' },
      title: { fr: 'Mentions légales', en: 'Legal notice' },
      sections: [
        {
          title: { fr: 'Éditeur du site', en: 'Site publisher' },
          body: {
            fr: 'Raison sociale, forme juridique, adresse du siège, numéro IDE et représentant : à compléter.',
            en: 'Company name, legal form, registered address, business identification number and representative: to be completed.',
          },
        },
        {
          title: { fr: 'Contact', en: 'Contact' },
          body: {
            fr: 'Téléphone et adresse e-mail de contact du responsable du site.',
            en: 'Phone number and email address of the person responsible for the site.',
          },
        },
        {
          title: { fr: 'Hébergement', en: 'Hosting' },
          body: {
            fr: 'Nom et adresse de l’hébergeur du site : à compléter une fois l’hébergement choisi.',
            en: 'Name and address of the hosting provider: to be completed once hosting is chosen.',
          },
        },
        {
          title: { fr: 'Propriété intellectuelle', en: 'Intellectual property' },
          body: {
            fr: 'Conditions d’utilisation des textes, photographies et éléments graphiques du site.',
            en: 'Terms governing the use of the texts, photographs and graphic elements of the site.',
          },
        },
        {
          title: { fr: 'Responsabilité', en: 'Liability' },
          body: {
            fr: 'Portée des informations publiées et limites de responsabilité, y compris pour les liens externes.',
            en: 'Scope of the published information and limits of liability, including for external links.',
          },
        },
        {
          title: { fr: 'Droit applicable', en: 'Applicable law' },
          body: {
            fr: 'Droit applicable et for juridique : à définir avec le client.',
            en: 'Applicable law and place of jurisdiction: to be defined with the client.',
          },
        },
      ],
    },
    privacy: {
      eyebrow: { fr: 'Données personnelles', en: 'Personal data' },
      title: { fr: 'Politique de confidentialité', en: 'Privacy policy' },
      sections: [
        {
          title: { fr: 'Responsable du traitement', en: 'Data controller' },
          body: {
            fr: 'Identité et coordonnées du responsable du traitement des données.',
            en: 'Identity and contact details of the party responsible for processing the data.',
          },
        },
        {
          title: { fr: 'Données collectées', en: 'Data collected' },
          body: {
            fr: 'Données transmises via le formulaire de contact : nom, e-mail, téléphone, type de travaux, surface, message et photographies éventuelles.',
            en: 'Data submitted through the contact form: name, email, phone, type of work, surface area, message and any photographs.',
          },
        },
        {
          title: { fr: 'Finalité et base légale', en: 'Purpose and legal basis' },
          body: {
            fr: 'Motifs du traitement des données et base légale correspondante.',
            en: 'Reasons for processing the data and the corresponding legal basis.',
          },
        },
        {
          title: { fr: 'Destinataires et sous-traitants', en: 'Recipients and processors' },
          body: {
            fr: 'Prestataires ayant accès aux données : hébergeur, service de formulaire, fournisseur de carte.',
            en: 'Service providers with access to the data: hosting provider, form service, map provider.',
          },
        },
        {
          title: { fr: 'Durée de conservation', en: 'Retention period' },
          body: {
            fr: 'Durée pendant laquelle les demandes et les pièces jointes sont conservées.',
            en: 'How long enquiries and attachments are kept.',
          },
        },
        {
          title: { fr: 'Cookies et services tiers', en: 'Cookies and third-party services' },
          body: {
            fr: 'Le site ne dépose pas de cookie de mesure d’audience. La carte éventuelle n’est chargée qu’après un clic explicite du visiteur, car le fournisseur dépose alors ses propres cookies.',
            en: 'The site sets no analytics cookies. Any map is loaded only after the visitor explicitly clicks, because the provider then sets its own cookies.',
          },
        },
        {
          title: { fr: 'Vos droits', en: 'Your rights' },
          body: {
            fr: 'Droits d’accès, de rectification, d’effacement et d’opposition, et manière de les exercer.',
            en: 'Rights of access, rectification, erasure and objection, and how to exercise them.',
          },
        },
      ],
    },
  },

  // ------------------------------------------------------------------- 404 --
  notFound: {
    code: { fr: '404', en: '404' },
    title: { fr: 'Cette page n’existe pas.', en: 'This page does not exist.' },
    body: {
      fr: 'Le lien est peut-être ancien, ou l’adresse a été mal saisie. Revenez à l’accueil ou parcourez les réalisations.',
      en: 'The link may be out of date, or the address may have been mistyped. Return to the home page or browse the projects.',
    },
    homeCta: { fr: 'Retour à l’accueil', en: 'Back to home' },
    mediaPlaceholder: {
      fr: 'PHOTO PLACEHOLDER — DÉTAIL DE SOL, PLAN RAPPROCHÉ',
      en: 'PHOTO PLACEHOLDER — FLOOR DETAIL, CLOSE-UP',
    },
    projectsCta: { fr: 'Voir les réalisations', en: 'View projects' },
  },

  // ---------------------------------------------------------------- footer --
  footer: {
    tagline: {
      fr: 'Revêtement de sols, pose et ponçage de parquets, et tous travaux en bois.',
      en: 'Floor coverings, parquet laying and sanding, and all kinds of woodwork.',
    },
    navTitle: { fr: 'Navigation', en: 'Navigation' },
    contactTitle: { fr: 'Contact', en: 'Contact' },
    hoursTitle: { fr: 'Horaires', en: 'Opening hours' },
    copyright: { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
  },
}

export default content
