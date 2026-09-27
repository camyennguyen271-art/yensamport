export interface HeroData {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  email: string;
  imageUrl: string;
  ctaExperienceTextVi: string;
  ctaExperienceTextEn: string;
  ctaProjectsTextVi: string;
  ctaProjectsTextEn: string;
}

export interface CoreValueItem {
  id: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  color: string;
}

export interface StatItem {
  id: string;
  value: string;
  labelVi: string;
  labelEn: string;
  color: string;
}

export interface EducationItem {
  id: string;
  period: string;
  locationVi: string;
  locationEn: string;
  school: string;
  degreeVi: string;
  degreeEn: string;
  descVi: string;
  descEn: string;
  color: string;
}

export interface AboutData {
  candidateDossierVi: string;
  candidateDossierEn: string;
  titleVi: string;
  titleEn: string;
  locationEmailVi: string;
  locationEmailEn: string;
  headingVi: string;
  headingEn: string;
  paragraph1Vi: string;
  paragraph1En: string;
  paragraph2Vi: string;
  paragraph2En: string;
  coreValues: CoreValueItem[];
  stats: StatItem[];
  education: EducationItem[];
  quoteVi: string;
  quoteEn: string;
  quoteAuthor: string;
}

export interface ExperienceItemData {
  id: string;
  roleVi: string;
  roleEn: string;
  companyVi: string;
  companyEn: string;
  year: string;
  taglineVi: string;
  taglineEn: string;
  categoryVi: string;
  categoryEn: string;
  metrics?: string;
  achievementsVi: string[];
  achievementsEn: string[];
}

export interface ProjectItemData {
  id: string;
  title: string;
  role: string;
  category: 'mv' | 'podcast' | 'lead';
  categoryLabel: string;
  year: string;
  organization: string;
  featured?: boolean;
  image: string;
  youtubeUrl?: string;
  description: string;
  deliverables: string[];
  tags: string[];
}

export interface SkillGroupData {
  id: string;
  nameVi: string;
  nameEn: string;
  categoryVi: string;
  categoryEn: string;
  iconName: string;
  descriptionVi: string;
  descriptionEn: string;
  highlightsVi: string[];
  highlightsEn: string[];
}

export interface ContactData {
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  email: string;
  phone: string;
  addressVi: string;
  addressEn: string;
  socialLinks: {
    id: string;
    name: string;
    url: string;
    handle: string;
    icon: string;
  }[];
}

export interface FullSiteData {
  hero: HeroData;
  about: AboutData;
  experiences: ExperienceItemData[];
  projects: ProjectItemData[];
  skills: SkillGroupData[];
  contact: ContactData;
}

export const DEFAULT_SITE_DATA: FullSiteData = {
  hero: {
    title: 'NGUYỄN THỊ CẨM YẾN',
    subtitle: 'YẾN SAM · MEDIA SPECIALIST',
    tagline: 'Proactive · Friendly · Motivated Ambivert',
    description: 'Connecting strategic communication, viral media production, and artist management through a holistic, creative problem-solving approach.',
    email: 'camyen.nguyen.271@gmail.com',
    imageUrl: '/src/assets/images/hero_yen_portrait_1790314347035.jpg',
    ctaExperienceTextVi: 'Xem Kinh Nghiệm',
    ctaExperienceTextEn: 'View Work Experience',
    ctaProjectsTextVi: 'Khám Phá Dự Án',
    ctaProjectsTextEn: 'Explore Key Projects',
  },
  about: {
    candidateDossierVi: '01 / HỒ SƠ ỨNG VIÊN',
    candidateDossierEn: '01 / CANDIDATE DOSSIER',
    titleVi: 'Về Yến Sam',
    titleEn: 'About Yến Sam',
    locationEmailVi: 'TP. Hồ Chí Minh, Việt Nam · camyen.nguyen.271@gmail.com',
    locationEmailEn: 'Ho Chi Minh City, Vietnam · camyen.nguyen.271@gmail.com',
    headingVi: 'Người Kết Nối Toàn Diện Giữa Truyền Thông, Chiến Lược & Sản Xuất',
    headingEn: 'A Holistic Connector at the Intersection of Media, Strategy & Production',
    paragraph1Vi: 'Tôi là một người hướng trung (ambivert), chủ động, thân thiện và giàu động lực. Tôi phát triển tốt nhất trong các môi trường năng động, nơi tôi có thể liên tục học hỏi và tích lũy những kinh nghiệm thực tế mang tính đột phá.',
    paragraph1En: 'I am an ambivert who is proactive, friendly, and highly motivated. I thrive in dynamic environments where I can continuously expand my knowledge and acquire high-impact experience.',
    paragraph2Vi: 'Điểm mạnh của tôi nằm ở khả năng kết nối các khía cạnh khác nhau của công việc—từ kể chuyện cho nghệ sĩ, đạo diễn MV đến phân tích PR dựa trên dữ liệu và tổ chức sự kiện giới trẻ quy mô lớn—nhằm tạo ra phương pháp giải quyết vấn đề sáng tạo và toàn diện.',
    paragraph2En: 'My superpower lies in connecting different aspects of work—from artist storytelling and MV direction to data-driven PR analytics and large-scale youth events—contributing to a well-rounded, holistic approach to creative problem-solving.',
    coreValues: [
      {
        id: 'cv-1',
        titleVi: 'Sự Chủ Động',
        titleEn: 'Proactivity',
        descVi: 'Thúc đẩy tiến độ trong các dự án truyền thông đa chức năng.',
        descEn: 'Initiates forward momentum across cross-functional media projects.',
        color: 'text-cyan-400'
      },
      {
        id: 'cv-2',
        titleVi: 'Cân Bằng Nội-Ngoại',
        titleEn: 'Ambivert Balance',
        descVi: 'Kết hợp sự thấu hiểu đối tác với khả năng phân tích chuyên sâu.',
        descEn: 'Blends empathetic stakeholder relations with deep analytical focus.',
        color: 'text-rose-400'
      },
      {
        id: 'cv-3',
        titleVi: 'Tầm Nhìn Toàn Diện',
        titleEn: 'Holistic Vision',
        descVi: 'Hợp nhất ý tưởng, sản xuất, PR và hiệu quả đo lường được (ROI).',
        descEn: 'Unifies concept, production, PR dissemination, and measurable ROI.',
        color: 'text-amber-400'
      }
    ],
    stats: [
      { id: 'st-1', value: '+20%', labelVi: 'Tương Tác Khán Giả', labelEn: 'Audience Engagement Boost', color: 'text-cyan-400' },
      { id: 'st-2', value: '10+', labelVi: 'Sự Kiện & Cuộc Thi', labelEn: 'Contests & Youth Events', color: 'text-white' },
      { id: 'st-3', value: '3+', labelVi: 'MV Đã Đạo Diễn', labelEn: 'Directed Music Videos', color: 'text-rose-400' },
      { id: 'st-4', value: '4+ Năm', labelVi: 'Kinh Nghiệm Truyền Thông', labelEn: 'Media & Talent Track Record', color: 'text-amber-400' }
    ],
    education: [
      {
        id: 'edu-1',
        period: '2018 — 2022',
        locationVi: 'TP. HỒ CHÍ MINH',
        locationEn: 'HO CHI MINH CITY',
        school: 'FPT UNIVERSITY',
        degreeVi: 'Cử nhân Truyền thông Đa phương tiện',
        degreeEn: 'Multimedia Communications Student',
        descVi: 'Nền tảng về truyền thông đại chúng, chiến lược digital media, quản lý chiến dịch, nghệ thuật kể chuyện phát thanh/truyền hình và hệ thống tương tác.',
        descEn: 'Foundations in mass communications, digital media strategies, campaign management, broadcast storytelling, and interactive systems.',
        color: 'border-cyan-500/40 text-cyan-400'
      },
      {
        id: 'edu-2',
        period: '2019 — 2020',
        locationVi: 'MALAYSIA',
        locationEn: 'MALAYSIA',
        school: 'MULTIMEDIA UNIVERSITY (MMU)',
        degreeVi: 'Sinh viên Trao đổi Truyền thông Đa phương tiện',
        degreeEn: 'Multimedia Communications Exchange Student',
        descVi: 'Giao lưu học thuật quốc tế về giao tiếp đa văn hóa, công nghệ nghệ thuật thị giác và sản xuất sáng tạo xuyên biên giới.',
        descEn: 'International academic immersion in multicultural communication, visual arts technology, and cross-border creative production.',
        color: 'border-rose-500/40 text-rose-400'
      }
    ],
    quoteVi: '"Kết nối các khía cạnh chuyên môn thành một câu chuyện nhất quán giúp công việc trở nên ý nghĩa, hiệu quả và khó quên đối với khán giả."',
    quoteEn: '"Connecting disparate disciplines into one cohesive narrative makes work meaningful, impactful, and unforgettable for the audience."',
    quoteAuthor: 'Yến Sam'
  },
  experiences: [
    {
      id: 'fpt-comms-2024',
      roleVi: 'Chuyên Viên Tổ Chức Sự Kiện, Kịch Bản & Truyền Thông',
      roleEn: 'Event Operations, Scriptwriting & Communication Executive',
      companyVi: 'Đại học FPT Cần Thơ',
      companyEn: 'FPT University Can Tho',
      year: '05/2024 — Hiện tại',
      taglineVi: 'Quản lý sự kiện, viết kịch bản & truyền thông thương hiệu giáo dục',
      taglineEn: 'Educational brand marketing, copywriting & full-cycle event production',
      categoryVi: 'Truyền thông Giáo dục',
      categoryEn: 'Education Communications',
      metrics: '+20% Engagement',
      achievementsVi: [
        'Lên kế hoạch và thực hiện các chiến lược truyền thông toàn diện để quảng bá các chương trình và sự kiện của trường.',
        'Quản lý truyền thông nội bộ và đối ngoại (thông cáo báo chí, bản tin, mạng xã hội) đảm bảo thông điệp nhất quán.',
        'Hợp tác với các nhóm liên chức năng để tạo nội dung thu hút khách hàng, tăng 20% lượng tương tác.',
        'Tổ chức và quản lý các sự kiện PR lớn, nâng cao uy tín của trường trong ngành giáo dục.'
      ],
      achievementsEn: [
        'Planned and executed comprehensive communication strategies to promote university programs and events.',
        'Managed internal and external communications, including press releases, newsletters, and social media updates, ensuring consistent messaging.',
        'Collaborated with cross-functional teams to create content that resonated with stakeholders, boosting engagement by 20%.',
        'Organized and managed high-profile PR events, enhancing visibility and reputation in the education industry.'
      ]
    },
    {
      id: 'mov-media-2022',
      roleVi: 'Quản Lý Truyền Thông & Sự Kiện',
      roleEn: 'Media & Event Manager',
      companyVi: 'MOV Communications',
      companyEn: 'MOV Communications',
      year: '2022',
      taglineVi: 'Chiến lược truyền thông nghệ sĩ & PR giải trí',
      taglineEn: 'Artist media strategies, entertainment public relations & tailored activations',
      categoryVi: 'PR Giải Trí & Nghệ Sĩ',
      categoryEn: 'Entertainment & Artist PR',
      achievementsVi: [
        'Xây dựng và thực thi chiến lược truyền thông cho nghệ sĩ, đảm bảo phù hợp với mục tiêu thương hiệu.',
        'Lên kế hoạch và tổ chức các sự kiện giải trí và hoạt động kích hoạt thương hiệu theo yêu cầu khách hàng.',
        'Nâng cao uy tín công ty, mức độ nhận diện nghệ sĩ và sự hài lòng của đối tác.'
      ],
      achievementsEn: [
        'Developed and executed media strategies for company artists, ensuring alignment with brand goals.',
        'Planned and organized tailored entertainment events and activations customized to client requirements.',
        'Enhanced industry reputation, artist profile visibility, and client satisfaction metrics.'
      ]
    },
    {
      id: 'yanh-talent-2021',
      roleVi: 'Quản Lý Talent / KOLs',
      roleEn: 'Talent Manager',
      companyVi: 'Y Anh Film Joint Stock Company',
      companyEn: 'Y Anh Film Joint Stock Company',
      year: '2021',
      taglineVi: 'Đại diện KOL, đàm phán hợp đồng & chiến dịch thương mại',
      taglineEn: 'Influencer representation, contract negotiation & commercial campaigns',
      categoryVi: 'Quản lý KOLs / Influencer',
      categoryEn: 'Talent & Influencer Management',
      achievementsVi: [
        'Quản lý hoạt động của influencer, bao gồm đàm phán hợp đồng thương mại, định hướng nội dung và thực thi chiến dịch.',
        'Ký kết thành công các hợp đồng quảng cáo, mở rộng phạm vi thương mại, tài trợ và doanh thu công ty.'
      ],
      achievementsEn: [
        'Managed influencer activities, including commercial contract negotiations and campaign execution.',
        'Secured advertising contracts for influencers, expanding commercial reach, sponsorships, and revenue.'
      ]
    },
    {
      id: 'hayd-minishow-2021',
      roleVi: 'Nhà Sản Xuất & Tổ Chức Sự Kiện',
      roleEn: 'Organizer & Event Producer',
      companyVi: 'Hayd Minishow in Vietnam',
      companyEn: 'Hayd Minishow in Vietnam',
      year: '2021',
      taglineVi: 'Quản lý hậu cần, marketing & vận hành concert nghệ sĩ quốc tế',
      taglineEn: 'International artist fanmeeting logistics, marketing & live concert operations',
      categoryVi: 'Sản Xuất Concert Live',
      categoryEn: 'Live Concert Production',
      achievementsVi: [
        'Tổ chức thành công và quản lý toàn bộ khâu hậu cần, marketing và vận hành sự kiện Hayd Minishow & Fanmeeting tại VN.',
        'Phối hợp với các đối tác trong nước và quốc tế, công ty quản lý nghệ sĩ để mang lại trải nghiệm hoàn hảo cho fan.'
      ],
      achievementsEn: [
        'Organized and managed end-to-end logistics, marketing, and execution of Hayd Minishow and Fanmeeting in Vietnam.',
        'Coordinated across international and local stakeholders to deliver a seamless event experience.'
      ]
    },
    {
      id: 'fpt-admission-2018',
      roleVi: 'Tư Vấn Tuyển Sinh & Telesales',
      roleEn: 'Admission & Telesales Consultant',
      companyVi: 'Đại học FPT TP.HCM',
      companyEn: 'FPT University HCMC',
      year: '2018 — 2021',
      taglineVi: 'Tư vấn tuyển sinh, chiến lược ghi danh & chăm sóc học sinh',
      taglineEn: 'Student admissions advisory, enrollment strategy & consultative engagement',
      categoryVi: 'Tuyển Sinh & Tư Vấn',
      categoryEn: 'Admissions & Client Advisory',
      achievementsVi: [
        'Tư vấn và hướng dẫn sinh viên tương lai trong quá trình tuyển sinh với thành tích xuất sắc trong 3 năm.',
        'Góp phần đáng kể vào sự phát triển của trường thông qua việc đạt chỉ tiêu tuyển sinh và duy trì tỷ lệ hài lòng cao.'
      ],
      achievementsEn: [
        'Provided high-performing experience as an enrollment consultant, guiding prospective students.',
        'Contributed to institutional growth by consistently achieving enrollment targets and high satisfaction.'
      ]
    }
  ],
  projects: [
    {
      id: 'mv-ai-bon-voyaige',
      title: 'MV "AI Bon Voyaige"',
      role: 'Producer, Director, Creative, Prompt Engineer',
      category: 'mv',
      categoryLabel: 'Music Video & AI Direction',
      year: '2024',
      organization: 'Creative & Digital Production',
      featured: true,
      image: '/src/assets/images/project_mv_showcase_1790314359425.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Groundbreaking generative AI music video combining high-concept art direction with cutting-edge prompt engineering and cinematic production workflows.',
      deliverables: [
        'Engineered detailed visual prompt matrices for AI visual generative engines.',
        'Directed full creative narrative, color grading, storyboarding, and video editing.',
        'Synchronized multi-track audio scoring with AI visuals for cohesive pacing.'
      ],
      tags: ['AI Prompt Engineering', 'Directing', 'Music Video Production', 'Creative Concept']
    },
    {
      id: 'mv-slay-your-way',
      title: 'MV "Slay Your Way"',
      role: 'Producer, Director, Creative',
      category: 'mv',
      categoryLabel: 'Music Video & Creative Direction',
      year: '2024',
      organization: 'FPT Education / Media Production',
      featured: true,
      image: '/src/assets/images/project_event_stage_1790314370784.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'High-energy youth anthem music video promoting self-expression, modern style, and campus culture across Vietnam.',
      deliverables: [
        'Led full pre-production, filming schedule, set design, and creative directing.',
        'Managed artist rehearsals, costume aesthetics, and multi-camera crew operations.',
        'Achieved viral social spread and high positive sentiment across youth audiences.'
      ],
      tags: ['Directing', 'Production Management', 'Viral Media', 'Youth Culture']
    },
    {
      id: 'mv-giai-dieu-viet-nam-minh',
      title: 'MV "Giai Điệu Việt Nam Mình" feat Masew',
      role: 'Producer, Creative',
      category: 'mv',
      categoryLabel: 'Music Video & Artist Collab',
      year: '2023 - 2024',
      organization: 'National Music Collaboration',
      featured: false,
      image: '/src/assets/images/project_mv_showcase_1790314359425.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Special musical collaboration with acclaimed Vietnamese producer Masew, harmonizing traditional folk motifs with contemporary electronic beats.',
      deliverables: [
        'Coordinated creative alignment between headline music producer Masew and brand themes.',
        'Produced visual campaign assets, press teasers, and promotional rollouts.',
        'Delivered widespread press coverage across top Vietnamese entertainment portals.'
      ],
      tags: ['Masew Collaboration', 'Creative Producing', 'Traditional Meets Modern', 'PR Campaign']
    },
    {
      id: 'f-exp-podcast',
      title: 'F-EXP \'N BEYOND Experience Podcast',
      role: 'Project Manager',
      category: 'podcast',
      categoryLabel: 'Original Audio Series',
      year: '2023 - 2024',
      organization: 'FPT Education',
      featured: false,
      image: '/src/assets/images/project_event_stage_1790314370784.jpg',
      youtubeUrl: '',
      description: 'In-depth experience podcast series bringing authentic discussions with industry pioneers, creative talents, and student leaders.',
      deliverables: [
        'Led end-to-end podcast project management from guest curation to distribution.',
        'Managed audio recording engineering, episode scripting, and social soundbites.',
        'Established multi-platform distribution across Spotify, YouTube, and Apple Podcasts.'
      ],
      tags: ['Project Management', 'Podcast Production', 'Audio Storytelling', 'Guest Curation']
    },
    {
      id: 'fpt-hackathon-2024',
      title: 'FPT Edu Hackathon Technology Contest 2024',
      role: 'Media Leader',
      category: 'lead',
      categoryLabel: 'National Technology Contest',
      year: '2024',
      organization: 'FPT Education',
      featured: true,
      image: '/src/assets/images/project_event_stage_1790314370784.jpg',
      description: 'Nationwide technology tournament challenging hundreds of top engineering and AI student teams across all FPT Education campuses.',
      deliverables: [
        'Headed all media planning, broadcast livestreams, and tech press releases.',
        'Spearheaded real-time competition updates, mentor spotlights, and finale recap videos.',
        'Coordinated on-ground media teams, press interview booths, and sponsor exposure.'
      ],
      tags: ['Media Leader', 'Hackathon', 'Tech PR', 'Livestream Operations']
    }
  ],
  skills: [
    {
      id: 'communication',
      nameVi: 'Kỹ Năng Giao Tiếp',
      nameEn: 'Communication Skills',
      categoryVi: 'Năng Lực Cốt Lõi',
      categoryEn: 'Core Competency',
      iconName: 'MessageSquare',
      descriptionVi: 'Làm chủ truyền thông chiến lược, thông cáo PR, sự thống nhất của các bên liên quan và nghệ thuật kể chuyện cuốn hút.',
      descriptionEn: 'Mastery in strategic corporate communication, PR releases, internal/external stakeholder alignment, and compelling storytelling.',
      highlightsVi: [
        'Truyền thông chiến lược tại FPT Education',
        'Viết thông cáo báo chí & thiết kế media kit',
        'Đồng nhất thông điệp thương hiệu đa nền tảng',
        'Truyền thông khủng hoảng & định hướng dư luận'
      ],
      highlightsEn: [
        'Strategic corporate communications at FPT Education',
        'Press release copywriting & media kit design',
        'Cross-platform brand messaging consistency',
        'Crisis communication & audience sentiment tuning'
      ]
    },
    {
      id: 'project-management',
      nameVi: 'Quản Lý Dự Án',
      nameEn: 'Project Management',
      categoryVi: 'Lãnh Đạo Vận Hành',
      categoryEn: 'Operational Leadership',
      iconName: 'Workflow',
      descriptionVi: 'Tổ chức toàn diện các giải đấu quốc gia, quản lý ngân sách liên phòng ban, lịch trình sản xuất chặt chẽ và đội ngũ liên chức năng.',
      descriptionEn: 'End-to-end orchestration of national tournaments, multi-department budgets, tight production schedules, and cross-functional teams.',
      highlightsVi: [
        'Quản lý vòng đời Podcast F-EXP \'N BEYOND',
        'Giám sát các team media qua hơn 8 cuộc thi toàn quốc',
        'Lập kế hoạch nhân sự & timeline cho chuỗi sự kiện',
        'Điều phối giữa nghệ sĩ, nhà tài trợ & ekip sản xuất'
      ],
      highlightsEn: [
        'Full lifecycle management of F-EXP \'N BEYOND Podcast',
        'Supervision of media sub-teams across 8+ national competitions',
        'Resource & timeline planning for multi-day live camps',
        'Stakeholder coordination between artists, sponsors & crew'
      ]
    },
    {
      id: 'analytical',
      nameVi: 'Kỹ Năng Phân Tích',
      nameEn: 'Analytical Skills',
      categoryVi: 'Dữ Liệu & Tối Ưu',
      categoryEn: 'Data & Optimization',
      iconName: 'BarChart3',
      descriptionVi: 'Trích xuất các chỉ số thực tế từ chiến dịch truyền thông để tối ưu hóa phạm vi tiếp cận, tỷ lệ giữ chân và tỷ lệ chuyển đổi khán giả.',
      descriptionEn: 'Extracting actionable metrics from communication campaigns to measurably drive reach, retention, and audience conversion.',
      highlightsVi: [
        'Tối ưu hóa tăng 20% mức độ tương tác của khán giả',
        'Phân tích đo lường mạng xã hội & độ phủ tự nhiên',
        'Báo cáo & kiểm toán hiệu suất sau chiến dịch',
        'Lập hồ sơ nhân khẩu học & phân bổ kênh truyền thông'
      ],
      highlightsEn: [
        '+20% Audience engagement boost optimization',
        'Social media telemetry & organic virality analysis',
        'Post-contest performance audits & reporting',
        'Audience demographic profiling & channel attribution'
      ]
    },
    {
      id: 'problem-solving',
      nameVi: 'Kỹ Năng Giải Quyết Vấn Đề',
      nameEn: 'Problem-Solving Skills',
      categoryVi: 'Sự Linh Hoạt',
      categoryEn: 'Ambivert Agility',
      iconName: 'Lightbulb',
      descriptionVi: 'Kết nối các khía cạnh công việc để tạo ra phương pháp tiếp cận toàn diện, xử lý các sự cố sản xuất, sân khấu hoặc truyền thông một cách linh hoạt.',
      descriptionEn: 'Connecting different aspects of work for a holistic, resilient approach to unforeseen production, stage, or media roadblocks.',
      highlightsVi: [
        'Tiếp cận toàn diện kết nối tầm nhìn sáng tạo và hậu cần',
        'Xử lý sự cố trực tiếp nhanh chóng tại các cuộc thi hackathon',
        'Đàm phán linh hoạt làm cầu nối giữa người hướng nội & hướng ngoại',
        'Ngoại giao quốc tế đa bên (Việt Nam - Malaysia)'
      ],
      highlightsEn: [
        'Holistic approach connecting creative vision with logistics',
        'Rapid live event troubleshooting during national hackathons',
        'Adaptable ambivert negotiation bridging introverts & extroverts',
        'Multi-stakeholder international diplomacy (Vietnam - Malaysia)'
      ]
    },
    {
      id: 'media-knowledge',
      nameVi: 'Kiến Thức Truyền Thông',
      nameEn: 'Media & Communication Knowledge',
      categoryVi: 'Chuyên Môn Sâu',
      categoryEn: 'Domain Mastery',
      iconName: 'Radio',
      descriptionVi: 'Nền tảng lý thuyết và thực tiễn vững chắc về truyền thông đại chúng, nền tảng số, hệ thống phát sóng và xu hướng viral.',
      descriptionEn: 'Deep theoretical and hands-on domain fluency across mass communications, digital platforms, broadcast systems, and viral trends.',
      highlightsVi: [
        'Sản xuất MV sáng tạo & đạo diễn hiện trường',
        'Quản lý nghệ sĩ & KOLs (MOV & Y An Film)',
        'Vận hành livestream phát sóng cho chung kết eSports',
        'Hiểu biết sâu sắc hệ sinh thái giải trí Việt Nam & PR'
      ],
      highlightsEn: [
        'Music video creative production & on-set direction',
        'Artist & influencer talent management (MOV & Y An Film)',
        'Broadcast livestream operations for esports & tech finals',
        'Vietnamese entertainment ecosystem & PR connections'
      ]
    },
    {
      id: 'creative-ai',
      nameVi: 'Đạo Diễn Sáng Tạo & AI',
      nameEn: 'Creative Direction & AI Prompting',
      categoryVi: 'Đổi Mới Hiện Đại',
      categoryEn: 'Modern Innovation',
      iconName: 'Cpu',
      descriptionVi: 'Đạo diễn các câu chuyện hình ảnh đột phá, kết hợp làm phim truyền thống với kỹ thuật prompting AI để tạo ra các MV âm nhạc độc đáo.',
      descriptionEn: 'Directing cutting-edge visual narratives, combining traditional filmmaking with generative AI prompt engineering for groundbreaking music videos.',
      highlightsVi: [
        'Kỹ sư Prompt cho MV âm nhạc AI ("AI Bon Voyaige")',
        'Đạo diễn nghệ thuật, chỉnh màu & xử lý thẩm mỹ',
        'Hợp tác cùng nhà sản xuất âm nhạc (Masew, Indie)',
        'Lên ý tưởng video ngắn viral (TikTok, Reels, Shorts)'
      ],
      highlightsEn: [
        'Prompt engineering for generative AI music video ("AI Bon Voyaige")',
        'Art direction, color grading & aesthetic treatment',
        'Music producer collaboration (Masew, independent artists)',
        'Viral short-form video concepting (TikTok, Reels, Shorts)'
      ]
    }
  ],
  contact: {
    titleVi: 'Liên Hệ & Cộng Tác',
    titleEn: 'Contact & Collaborate',
    subtitleVi: 'Sẵn sàng thảo luận về các dự án truyền thông, sản xuất MV, hoặc quản lý tài năng.',
    subtitleEn: 'Ready to discuss media strategy, music video production, or talent management.',
    descriptionVi: 'Nếu bạn có bất kỳ câu hỏi hoặc cơ hội hợp tác nào, xin đừng ngần ngại liên hệ qua email hoặc mạng xã hội.',
    descriptionEn: 'If you have any questions or collaboration opportunities, feel free to reach out via email or social media.',
    email: 'camyen.nguyen.271@gmail.com',
    phone: '0901234567',
    addressVi: 'TP. Hồ Chí Minh, Việt Nam',
    addressEn: 'Ho Chi Minh City, Vietnam',
    socialLinks: [
      { id: 'soc-1', name: 'Email', url: 'mailto:camyen.nguyen.271@gmail.com', handle: 'camyen.nguyen.271@gmail.com', icon: 'Mail' },
      { id: 'soc-2', name: 'Facebook', url: 'https://facebook.com', handle: 'Yến Sam (Cẩm Yến)', icon: 'Facebook' },
      { id: 'soc-3', name: 'LinkedIn', url: 'https://linkedin.com', handle: 'Nguyen Thi Cam Yen', icon: 'Linkedin' },
      { id: 'soc-4', name: 'Instagram', url: 'https://instagram.com', handle: '@yensam.media', icon: 'Instagram' }
    ]
  }
};
