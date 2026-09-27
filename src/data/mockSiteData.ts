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

export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  handle: string;
  icon: string;
  descriptionVi?: string;
  descriptionEn?: string;
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
  socialLinks: SocialLinkItem[];
}

export interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  caption?: string;
}

export interface GalleryAlbum {
  id: string;
  titleVi: string;
  titleEn: string;
  categoryVi: string;
  categoryEn: string;
  descriptionVi?: string;
  descriptionEn?: string;
  coverImage: string;
  images: GalleryImage[];
}

export interface FullSiteData {
  hero: HeroData;
  about: AboutData;
  experiences: ExperienceItemData[];
  projects: ProjectItemData[];
  skills: SkillGroupData[];
  contact: ContactData;
  galleryAlbums?: GalleryAlbum[];
}

export const DEFAULT_SITE_DATA: FullSiteData = {
  "hero": {
    "email": "camyen.nguyen.271@gmail.com",
    "title": "NGUYỄN THỊ CẨM YẾN",
    "tagline": "Proactive · Friendly · Motivated Ambivert",
    "imageUrl": "https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790476859491_lrkwz.jpg",
    "subtitle": "YẾN SAM · MEDIA SPECIALIST",
    "description": "Kết nối truyền thông, sản xuất nội dung viral để tạo ra những ý tưởng sáng tạo và hiệu quả.",
    "ctaProjectsTextEn": "Explore Key Projects",
    "ctaProjectsTextVi": "Khám Phá Dự Án",
    "ctaExperienceTextEn": "View Work Experience",
    "ctaExperienceTextVi": "Xem Kinh Nghiệm"
  },
  "about": {
    "stats": [
      {
        "id": "st-1",
        "color": "text-cyan-400",
        "value": "+20%",
        "labelEn": "Audience Engagement Boost",
        "labelVi": "Tương Tác Khán Giả"
      },
      {
        "id": "st-2",
        "color": "text-white",
        "value": "60+",
        "labelEn": "Contests & Youth Events",
        "labelVi": "Sự Kiện & Cuộc Thi"
      },
      {
        "id": "st-3",
        "color": "text-rose-400",
        "value": "5+",
        "labelEn": "Directed Music Videos",
        "labelVi": "MV"
      },
      {
        "id": "st-4",
        "color": "text-amber-400",
        "value": "6+ Năm",
        "labelEn": "Media & Talent Track Record",
        "labelVi": "Kinh Nghiệm Truyền Thông"
      }
    ],
    "quoteEn": "\"Connecting disparate disciplines into one cohesive narrative makes work meaningful, impactful, and unforgettable for the audience.\"",
    "quoteVi": "\"Kết nối chuyên môn và sáng tạo để tạo nên những câu chuyện có ý nghĩa, hiệu quả và đáng nhớ với khán giả.\"\n",
    "titleEn": "About Yến Sam",
    "titleVi": "Về Yến Sam",
    "education": [
      {
        "id": "edu-1",
        "color": "border-cyan-500/40 text-cyan-400",
        "descEn": "Foundations in mass communications, digital media strategies, campaign management, broadcast storytelling, and interactive systems.",
        "descVi": "Truyền thông · Digital Media · Storytelling · Sản xuất nội dung",
        "period": "2018 — 2022",
        "school": "FPT UNIVERSITY",
        "degreeEn": "Multimedia Communications Student",
        "degreeVi": "Cử nhân Truyền thông Đa phương tiện",
        "locationEn": "HO CHI MINH CITY",
        "locationVi": "TP. HỒ CHÍ MINH"
      },
      {
        "id": "edu-2",
        "color": "border-rose-500/40 text-rose-400",
        "descEn": "International academic immersion in multicultural communication, visual arts technology, and cross-border creative production.",
        "descVi": "Truyền thông đa văn hóa · Visual Media · Creative Production",
        "period": "2019 — 2020",
        "school": "MULTIMEDIA UNIVERSITY (MMU)",
        "degreeEn": "Multimedia Communications Exchange Student",
        "degreeVi": "Sinh viên Trao đổi Truyền thông Đa phương tiện",
        "locationEn": "MALAYSIA",
        "locationVi": "MALAYSIA"
      }
    ],
    "headingEn": "A Holistic Connector at the Intersection of Media, Strategy & Production",
    "headingVi": "Tôi thích biến ý tưởng thành thứ có thể nhìn thấy.",
    "coreValues": [
      {
        "id": "cv-1",
        "color": "text-cyan-400",
        "descEn": "Initiates forward momentum across cross-functional media projects.",
        "descVi": "Theo sát công việc và thúc đẩy dự án tiến về phía trước.",
        "titleEn": "Proactivity",
        "titleVi": "Chủ động"
      },
      {
        "id": "cv-2",
        "color": "text-rose-400",
        "descEn": "Blends empathetic stakeholder relations with deep analytical focus.",
        "descVi": "Có thể làm việc độc lập, phối hợp với team và thích nghi nhanh với từng dự án.",
        "titleEn": "Ambivert Balance",
        "titleVi": "Linh hoạt"
      },
      {
        "id": "cv-3",
        "color": "text-amber-400",
        "descEn": "Unifies concept, production, PR dissemination, and measurable ROI.",
        "descVi": "Kết nối sáng tạo, sản xuất và mục tiêu truyền thông để tạo ra kết quả rõ ràng.",
        "titleEn": "Holistic Vision",
        "titleVi": "TƯ DUY ĐA CHIỀU"
      }
    ],
    "quoteAuthor": "Yến Sam",
    "paragraph1En": "I am an ambivert who is proactive, friendly, and highly motivated. I thrive in dynamic environments where I can continuously expand my knowledge and acquire high-impact experience.",
    "paragraph1Vi": "Tôi làm trong lĩnh vực Media & Communication, với kinh nghiệm từ content, storytelling, sản xuất MV, PR đến các dự án sự kiện và nội dung số.",
    "paragraph2En": "My superpower lies in connecting different aspects of work—from artist storytelling and MV direction to data-driven PR analytics and large-scale youth events—contributing to a well-rounded, holistic approach to creative problem-solving.",
    "paragraph2Vi": "Tôi thích đứng ở giữa nhiều khâu khác nhau của một dự án: hiểu ý tưởng, làm việc với con người, trực tiếp sản xuất và nhìn lại kết quả.\n\nTôi luôn tò mò, thích học cái mới và không ngại thử những cách làm khác để tìm ra giải pháp phù hợp.",
    "locationEmailEn": "Ho Chi Minh City, Vietnam · camyen.nguyen.271@gmail.com",
    "locationEmailVi": "TP. Hồ Chí Minh, Việt Nam · camyen.nguyen.271@gmail.com",
    "candidateDossierEn": "01 / CANDIDATE DOSSIER",
    "candidateDossierVi": "01 / HỒ SƠ ỨNG VIÊN"
  },
  "skills": [
    {
      "id": "communication",
      "nameEn": "Communication Skills",
      "nameVi": "Kỹ Năng Giao Tiếp",
      "iconName": "MessageSquare",
      "categoryEn": "Core Competency",
      "categoryVi": "Năng Lực Cốt Lõi",
      "highlightsEn": [
        "Strategic corporate communications at FPT Education",
        "Press release copywriting & media kit design",
        "Cross-platform brand messaging consistency",
        "Crisis communication & audience sentiment tuning"
      ],
      "highlightsVi": [
        "Truyền thông chiến lược tại FPT Education",
        "Viết thông cáo báo chí & thiết kế media kit",
        "Đồng nhất thông điệp thương hiệu đa nền tảng",
        "Truyền thông khủng hoảng & định hướng dư luận"
      ],
      "descriptionEn": "Mastery in strategic corporate communication, PR releases, internal/external stakeholder alignment, and compelling storytelling.",
      "descriptionVi": "Làm chủ truyền thông chiến lược, thông cáo PR, sự thống nhất của các bên liên quan và nghệ thuật kể chuyện cuốn hút."
    },
    {
      "id": "project-management",
      "nameEn": "Project Management",
      "nameVi": "Quản Lý Dự Án",
      "iconName": "Workflow",
      "categoryEn": "Operational Leadership",
      "categoryVi": "Lãnh Đạo Vận Hành",
      "highlightsEn": [
        "Full lifecycle management of F-EXP 'N BEYOND Podcast",
        "Supervision of media sub-teams across 8+ national competitions",
        "Resource & timeline planning for multi-day live camps",
        "Stakeholder coordination between artists, sponsors & crew"
      ],
      "highlightsVi": [
        "Quản lý vòng đời Podcast F-EXP 'N BEYOND",
        "Giám sát các team media qua hơn 8 cuộc thi toàn quốc",
        "Lập kế hoạch nhân sự & timeline cho chuỗi sự kiện",
        "Điều phối giữa nghệ sĩ, nhà tài trợ & ekip sản xuất"
      ],
      "descriptionEn": "End-to-end orchestration of national tournaments, multi-department budgets, tight production schedules, and cross-functional teams.",
      "descriptionVi": "Tổ chức toàn diện các giải đấu quốc gia, quản lý ngân sách liên phòng ban, lịch trình sản xuất chặt chẽ và đội ngũ liên chức năng."
    },
    {
      "id": "analytical",
      "nameEn": "Analytical Skills",
      "nameVi": "Kỹ Năng Phân Tích",
      "iconName": "BarChart3",
      "categoryEn": "Data & Optimization",
      "categoryVi": "Dữ Liệu & Tối Ưu",
      "highlightsEn": [
        "+20% Audience engagement boost optimization",
        "Social media telemetry & organic virality analysis",
        "Post-contest performance audits & reporting",
        "Audience demographic profiling & channel attribution"
      ],
      "highlightsVi": [
        "Tối ưu hóa tăng 20% mức độ tương tác của khán giả",
        "Phân tích đo lường mạng xã hội & độ phủ tự nhiên",
        "Báo cáo & kiểm toán hiệu suất sau chiến dịch",
        "Lập hồ sơ nhân khẩu học & phân bổ kênh truyền thông"
      ],
      "descriptionEn": "Extracting actionable metrics from communication campaigns to measurably drive reach, retention, and audience conversion.",
      "descriptionVi": "Trích xuất các chỉ số thực tế từ chiến dịch truyền thông để tối ưu hóa phạm vi tiếp cận, tỷ lệ giữ chân và tỷ lệ chuyển đổi khán giả."
    },
    {
      "id": "problem-solving",
      "nameEn": "Problem-Solving Skills",
      "nameVi": "Kỹ Năng Giải Quyết Vấn Đề",
      "iconName": "Lightbulb",
      "categoryEn": "Ambivert Agility",
      "categoryVi": "Sự Linh Hoạt",
      "highlightsEn": [
        "Holistic approach connecting creative vision with logistics",
        "Rapid live event troubleshooting during national hackathons",
        "Adaptable ambivert negotiation bridging introverts & extroverts",
        "Multi-stakeholder international diplomacy (Vietnam - Malaysia)"
      ],
      "highlightsVi": [
        "Tiếp cận toàn diện kết nối tầm nhìn sáng tạo và hậu cần",
        "Xử lý sự cố trực tiếp nhanh chóng tại các cuộc thi hackathon",
        "Đàm phán linh hoạt làm cầu nối giữa người hướng nội & hướng ngoại",
        "Ngoại giao quốc tế đa bên (Việt Nam - Malaysia)"
      ],
      "descriptionEn": "Connecting different aspects of work for a holistic, resilient approach to unforeseen production, stage, or media roadblocks.",
      "descriptionVi": "Kết nối các khía cạnh công việc để tạo ra phương pháp tiếp cận toàn diện, xử lý các sự cố sản xuất, sân khấu hoặc truyền thông một cách linh hoạt."
    },
    {
      "id": "media-knowledge",
      "nameEn": "Media & Communication Knowledge",
      "nameVi": "Kiến Thức Truyền Thông",
      "iconName": "Radio",
      "categoryEn": "Domain Mastery",
      "categoryVi": "Chuyên Môn Sâu",
      "highlightsEn": [
        "Music video creative production & on-set direction",
        "Artist & influencer talent management (MOV & Y An Film)",
        "Broadcast livestream operations for esports & tech finals",
        "Vietnamese entertainment ecosystem & PR connections"
      ],
      "highlightsVi": [
        "Sản xuất MV sáng tạo & đạo diễn hiện trường",
        "Quản lý nghệ sĩ & KOLs (MOV & Y An Film)",
        "Vận hành livestream phát sóng cho chung kết eSports",
        "Hiểu biết sâu sắc hệ sinh thái giải trí Việt Nam & PR"
      ],
      "descriptionEn": "Deep theoretical and hands-on domain fluency across mass communications, digital platforms, broadcast systems, and viral trends.",
      "descriptionVi": "Nền tảng lý thuyết và thực tiễn vững chắc về truyền thông đại chúng, nền tảng số, hệ thống phát sóng và xu hướng viral."
    },
    {
      "id": "creative-ai",
      "nameEn": "Creative Direction & AI Prompting",
      "nameVi": "Đạo Diễn Sáng Tạo & AI",
      "iconName": "Cpu",
      "categoryEn": "Modern Innovation",
      "categoryVi": "Đổi Mới Hiện Đại",
      "highlightsEn": [
        "Prompt engineering for generative AI music video (\"AI Bon Voyaige\")",
        "Art direction, color grading & aesthetic treatment",
        "Music producer collaboration (Masew, independent artists)",
        "Viral short-form video concepting (TikTok, Reels, Shorts)"
      ],
      "highlightsVi": [
        "Kỹ sư Prompt cho MV âm nhạc AI (\"AI Bon Voyaige\")",
        "Đạo diễn nghệ thuật, chỉnh màu & xử lý thẩm mỹ",
        "Hợp tác cùng nhà sản xuất âm nhạc (Masew, Indie)",
        "Lên ý tưởng video ngắn viral (TikTok, Reels, Shorts)"
      ],
      "descriptionEn": "Directing cutting-edge visual narratives, combining traditional filmmaking with generative AI prompt engineering for groundbreaking music videos.",
      "descriptionVi": "Đạo diễn các câu chuyện hình ảnh đột phá, kết hợp làm phim truyền thống với kỹ thuật prompting AI để tạo ra các MV âm nhạc độc đáo."
    }
  ],
  "contact": {
    "email": "camyen.nguyen.271@gmail.com",
    "phone": "0901234567",
    "titleEn": "Contact & Collaborate",
    "titleVi": "Liên Hệ & Cộng Tác",
    "addressEn": "Ho Chi Minh City, Vietnam",
    "addressVi": "TP. Hồ Chí Minh, Việt Nam",
    "subtitleEn": "Ready to discuss media strategy, music video production, or talent management.",
    "subtitleVi": "Sẵn sàng thảo luận về các dự án truyền thông, sản xuất MV, hoặc quản lý tài năng.",
    "socialLinks": [
      {
        "id": "soc-1",
        "url": "mailto:camyen.nguyen.271@gmail.com",
        "icon": "Mail",
        "name": "Email",
        "handle": "camyen.nguyen.271@gmail.com",
        "descriptionVi": ""
      },
      {
        "id": "soc-2",
        "url": "https://www.facebook.com/camyen.nguyen123",
        "icon": "Facebook",
        "name": "Facebook",
        "handle": "Nguyễn Yến (Sam)"
      },
      {
        "id": "soc-4",
        "url": "https://instagram.com",
        "icon": "Instagram",
        "name": "Instagram",
        "handle": "@sam_no_jam"
      }
    ],
    "descriptionEn": "If you have any questions or collaboration opportunities, feel free to reach out via email or social media.",
    "descriptionVi": "Nếu bạn có bất kỳ câu hỏi hoặc cơ hội hợp tác nào, xin đừng ngần ngại liên hệ qua email hoặc mạng xã hội."
  },
  "projects": [
    {
      "id": "fpt-nihongoeng-2023",
      "role": "Media Sub-Leader",
      "tags": [
        "Media Leader",
        "NihongoEng 2023",
        "Truyền Thông Quốc Tế",
        "English & Japanese"
      ],
      "year": "2023",
      "image": "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/476821623_924184736551332_2827023413497581641_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1223&ctp=s2048x1223&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFIGVJkt3NrcbuKMQbXtbVP3pAiCZs7NXbekCIJmzs1dhtJFVdgWYmEcCbsq3xTisUJZqllMFp90eTU3UStXZGK&_nc_ohc=CdafzHA5jqEQ7kNvwExmiJE&_nc_oc=AdqGiyNJQwtRJbk84fDdtiVQm9Ee0G81ZC5m3pOTL9JcT33RqnsoiXfZT3C8twt4erM&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=kq5by_IAyXT2QtL2Jy9f1w&_nc_ss=7b2a8&oh=00_AQKxmoldABXWwXeeExdDQq30JdIB5v_A5AFqsxER0R_f-w&oe=6ABE9E40",
      "title": "FPT  Edu NihongoEng  2023",
      "category": "lead",
      "featured": true,
      "youtubeUrl": "https://www.youtube.com/watch?v=u8h35qlCAjg",
      "description": "Cuộc thi tranh tài ngôn ngữ quy mô lớn dành cho sinh viên FPT Edu với bảng thi Tiếng Anh và Tiếng Nhật.",
      "deliverables": [
        "Lên kế hoạch và thực thi chiến lược truyền thông quốc tế tại Việt Nam và Malaysia.",
        "Sản xuất chuỗi Aftermovie recap hành trình thi đấu của các thí sinh xuất sắc.",
        "Quản lý nội dung mạng xã hội, thông cáo báo chí và hình ảnh đại diện thương hiệu."
      ],
      "organization": "FPT Education & MMU Malaysia",
      "categoryLabel": "Cuộc Thi Ngôn Ngữ Tiếng Anh & Tiếng Nhật"
    },
    {
      "id": "fes-camp-4-thang-am-viet",
      "role": "Media Sub-Leader",
      "tags": [
        "Media Sub-Leader",
        "FES-Camp 4",
        "Thang Âm Việt",
        "Trải Nghiệm Văn Hóa"
      ],
      "year": "2023",
      "image": "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/488601898_3384165101719803_2756082371784677937_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1366&ctp=s2048x1366&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGBrAXI0sWvBwqKWZaNp7Zh9ojOkHjjv9H2iM6QeOO_0dNYnU5H58iMvDbDQ9m9qVh2-fmiv_tZgz98rz4p-TQL&_nc_ohc=AlOjFt56h0YQ7kNvwHxWDmb&_nc_oc=AdpnvIt8ogzJUQEiBkL4cZgnlJPfC3oKTn3YGVD327yfYABECr22A8Wi83zSJ4gkiyc&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=umXd4aQJE-m5GWZNwjUZ8g&_nc_ss=7b2a8&oh=00_AQKJCAICfFo3XBhLNznWB96pHI_lfRkYye5hUa_daluY6Q&oe=6ABE8616",
      "title": "FES-Camp 4: Thang Âm Việt",
      "category": "lead",
      "featured": false,
      "youtubeUrl": "https://www.youtube.com/watch?v=WJchrbodUyo&list=RDWJchrbodUyo&start_radio=1",
      "description": "FES-CAMP 4 \"THANG ÂM VIỆT\" là chương trình biểu diễn và khóa học âm nhạc truyền thống dành cho các bạn học sinh, sinh viên, CBGV Tổ chức Giáo dục FPT. Chương trình là không gian trải nghiệm và học tập về di sản âm nhạc của Việt Nam. ",
      "deliverables": [
        "Điều phối chiến dịch truyền thông đa nền tảng cho chuỗi sự kiện FES-Camp.",
        "Lên kịch bản nội dung, thông điệp trải nghiệm văn hóa dân gian."
      ],
      "organization": "FPT Edu Experience Space (FES)",
      "categoryLabel": "Chương trình biểu diễn và khóa học âm nhạc"
    },
    {
      "id": "fpt-hackathon-2024",
      "role": "Media Leader",
      "tags": [
        "Media Leader",
        "Hackathon 2024",
        "Lập Trình & AI",
        "Livestream Toàn Quốc"
      ],
      "year": "2024",
      "image": "https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790480293325_1mi92.jpg",
      "title": "FPT Edu Hackathon  2024",
      "category": "lead",
      "featured": true,
      "youtubeUrl": "https://www.youtube.com/watch?v=_8MzJi77njk",
      "description": "Giải đấu công nghệ quy mô toàn quốc của FPT Education quy tụ hàng trăm đội thi lập trình và AI từ khắp các cơ sở trên cả nước.",
      "deliverables": [
        "Chịu trách nhiệm chính xây dựng chiến lược truyền thông toàn diện & tổng duyệt nội dung báo chí.",
        "Chỉ đạo livestream phát sóng trực tiếp vòng chung kết và thực hiện video recap aftermovie.",
        "Điều phối đội ngũ media tại chỗ, gian hàng phỏng vấn và bảo trợ truyền thông."
      ],
      "organization": "FPT Education",
      "categoryLabel": "Cuộc Thi Công Nghệ Quốc Gia"
    },
    {
      "id": "fpt-tich-tich-tinh-tang-2024",
      "role": "Media Sub-Leader",
      "tags": [
        "Media Sub-Leader",
        "Nhạc Cụ Dân Tộc",
        "Masew Collab",
        "Văn Hóa Việt"
      ],
      "year": "2024",
      "image": "https://bqn.1cdn.vn/2024/09/01/baodanang.vn-dataimages-202409-original-_images1748236_b1.png",
      "title": "FPT Edu Tích Tịch Tình Tang 2024",
      "category": "lead",
      "featured": true,
      "youtubeUrl": "https://www.youtube.com/watch?v=BNtSYJRJus4&list=RDBNtSYJRJus4&start_radio=1",
      "description": "Cuộc thi trình diễn nhạc cụ dân tộc quy mô lớn nhất hệ thống FPT Edu, tôn vinh và lan tỏa bản sắc âm nhạc truyền thống Việt Nam.",
      "deliverables": [
        "Phó ban truyền thông, đồng điều phối sản xuất bài hát chủ đề \"Giai Điệu Việt Nam Mình\" feat Masew.",
        "Quản lý chiến dịch PR lan tỏa văn hóa dân tộc kết hợp nghệ thuật hiện đại.",
        "Thực hiện Aftermovie và truyền thông đa kênh thu hút hàng triệu lượt xem."
      ],
      "organization": "FPT Education",
      "categoryLabel": "Cuộc Thi Nhạc Cụ Dân Tộc Truyền Thống"
    },
    {
      "id": "fpt-color-up-2024",
      "role": "Media Sub-Leader",
      "tags": [
        "Media Sub-Leader",
        "Color Up 2024",
        "Graphic Design",
        "Visual Arts"
      ],
      "year": "2024",
      "image": "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/490296691_1199739075494825_8066883256694202291_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1366&ctp=s2048x1366&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEgsz4-wI-5nX5uzdwakRPkCNt2DqLF3TII23YOosXdMgSxGPipZUpCoCl51eftM10181KdEB47aHaSIJeXjCLi&_nc_ohc=9hXIwHUgTQEQ7kNvwHhE0Mz&_nc_oc=AdqQtOHOOsx7Zaj9ZJTPJDEcJj-VkG7yK9hklAe73Cxeuc21VNAEUXtH_JI3n4zYjn4&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=sncm8j8YmiZHPhmq_hl5ww&_nc_ss=7b2a8&oh=00_AQJJemhYPrPF_0cyAMbnjmfiz6zkc25Ryg34z6Abuf66qw&oe=6ABE643B",
      "title": "FPT Edu Color Up  2024",
      "category": "lead",
      "featured": false,
      "youtubeUrl": "https://www.youtube.com/watch?v=PZy7qwm2Bk4",
      "description": "Sân chơi sáng tạo nghệ thuật thị giác và thiết kế đồ họa hàng đầu dành cho các tài năng trẻ FPT Edu.",
      "deliverables": [
        "Đồng quản lý nội dung truyền thông, định hướng hình ảnh triển lãm thiết kế đồ họa.",
        "Thực hiện chuỗi bài đăng sản phẩm thi đấu, phỏng vấn giám khảo và ban cố vấn.",
        "Sản xuất Aftermovie trao giải và triển lãm tác phẩm đồ họa xuất sắc."
      ],
      "organization": "FPT Education",
      "categoryLabel": "Cuộc Thi Thiết Kế Đồ Họa"
    },
    {
      "id": "first-tech-challenge-2024",
      "role": "Media Sub-Leader",
      "tags": [
        "Media Sub-Leader",
        "FIRST Tech Challenge",
        "Robotics",
        "STEM Vietnam"
      ],
      "year": "2023 - 2024",
      "image": "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/482238771_1643771059840517_3277520129166320987_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=p180x540&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEzL8tilttgsKQ-50dqZIRwYE68RrTyzK9gTrxGtPLMr9rPnDWZr0RMoOoKochQEtLznuHoLXE2mtSMLYOqwNpF&_nc_ohc=qFKGJOPhF1oQ7kNvwHilL76&_nc_oc=Adqss-t38D4l6IF1W7CJHg6QEzQYZutZSMAY3gzGJ_mgyOko2x86eHoyKFWy32o-yUg&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=6JGcOGqBsdJQ8vEZQOheoQ&_nc_ss=7b2a8&oh=00_AQJhsEce14t25XPPNxsbCY7a92Odd_kciUFMPkdNyYyu5A&oe=6ABE6A5F",
      "title": "FIRST Tech Challenge Vietnam 2023-2024",
      "category": "lead",
      "featured": false,
      "youtubeUrl": "https://www.youtube.com/watch?v=0YyScEPS6zA",
      "description": "Giải đấu Robot tiêu chuẩn quốc tế lần đầu tiên tổ chức tại Việt Nam, tìm kiếm đại diện tham dự Chung kết thế giới tại Mỹ.",
      "deliverables": [
        "Phó ban truyền thông điều phối truyền thông giải đấu Robotics quốc tế.",
        "Đồng hành cùng 26 đội thi toàn quốc, cập nhật kết quả trận đấu tự hành và điều khiển.",
        "Sản xuất video tổng kết hành trình và bảo trợ truyền thông báo chí."
      ],
      "organization": "FPT Education & FIRST Global",
      "categoryLabel": "Giải Đấu Robot Quốc Tế"
    },
    {
      "id": "fpt-got-talent-2024",
      "role": "Media Sub-Leader",
      "tags": [
        "Media Sub-Leader",
        "Got Talent 2024",
        "Nghệ Thuật Trình Diễn",
        "Slay Your Way"
      ],
      "year": "2024",
      "image": "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/495938626_24114463391473553_2042498132119654463_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1152&ctp=s2048x1152&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHQ0Jk9aqyJqz6LU46QPpB1FwX7wr4lcdgXBfvCviVx2KhjeSSBDNuMcGP-4szHTCoYvTOYNgW76A3HmKEDenH2&_nc_ohc=XjRxl2zZlToQ7kNvwHQ714d&_nc_oc=AdrFdGRA0aJHh89S-gG82x1s6bGmVAiRaEwAKQlY_G235vyooIg5nJHKI_HThhqLAac&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=XG-nvSD_vWKh6QDBPV6OQw&_nc_ss=7b2a8&oh=00_AQLrxJy0JLg8NEl7ZOD9bN4OjaDyqdoMQsrNu5E-buF4Tg&oe=6ABE83B7",
      "title": "FPT Edu Got Talent 2024",
      "category": "lead",
      "featured": false,
      "youtubeUrl": "https://www.youtube.com/watch?v=PHKg6_Tx9uM",
      "description": "Đại hội tài năng âm nhạc, vũ đạo và nghệ thuật trình diễn quy tụ các ngôi sao trẻ hàng đầu FPT Edu.",
      "deliverables": [
        "Phó ban truyền thông chỉ đạo nội dung quảng bá MV chủ đề \"Slay Your Way\".",
        "Tổ chức truyền thông đêm chung kết toàn quốc với sự tham gia của 120+ thí sinh.",
        "Thực hiện Aftermovie bùng nổ cảm xúc và chiến dịch mạng xã hội viral."
      ],
      "organization": "FPT Education",
      "categoryLabel": "Cuộc Thi Tìm Kiếm Tài Năng"
    },
    {
      "id": "fpt-biz-talent-2023",
      "role": "Media Sub-Leader",
      "tags": [
        "Media Sub-Leader",
        "Biz Talent 2023",
        "Khởi Nghiệp Kinh Tế",
        "Business Case"
      ],
      "year": "2023",
      "image": "https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790484776131_bo1c3.jpg",
      "title": "FPT Edu Biz Talent 2023",
      "category": "lead",
      "featured": false,
      "youtubeUrl": "https://www.youtube.com/watch?v=PIQZWf7ieyo",
      "description": "FPT Edu Biz Talent là cuộc thi kinh doanh quy mô lớn nhất của Tổ chức Giáo dục FPT (FPT Edu) do Ban Công tác học đường tổ chức.\nMùa giải thứ 4 với chủ đề Rev Up là nơi các thí sinh nhập vai trở thành Chairman, CEO, CFO, CTO, CSMO để đưa ra chiến lược đổi mới sáng tạo cho các doanh nghiệp, cơ hội học hỏi bởi đội ngũ chuyên gia hàng đầu và các doanh nghiệp, phát triển kỹ năng và thể hiện tài năng trong các lĩnh vực.",
      "deliverables": [
        "Đồng điều phối chiến dịch truyền thông nhận diện thương hiệu cuộc thi kinh tế.",
        "Tạo dựng nội dung giới thiệu các đề án kinh doanh và hội đồng giám khảo doanh nhân.",
        "Quản lý ghi hình và phát sóng Recap tranh tài."
      ],
      "organization": "FPT Education",
      "categoryLabel": "Cuộc Thi Ý Tưởng Kinh Doanh"
    },
    {
      "id": "mv-ai-bon-voyaige",
      "role": "Producer, Director, Creative, Prompt Engineer",
      "tags": [
        "AI Prompt Engineering",
        "Directing",
        "Music Video Production",
        "Generative Art"
      ],
      "year": "2024",
      "image": "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/482010961_664522949573255_95670421209723899_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s640x640&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFlNtyY5Mg89Q90A7i8xIhIEnefbVafnyMSd59tVp-fI_UVgAGAfdi-GjpdXqSKQ2zuww8qchhtcDpyb3t23P1j&_nc_ohc=aPQEe7iG6NQQ7kNvwGLkBjN&_nc_oc=Ado9AP66SmGMOSorRxVRnGHhQ2ZD1DHQr1RxYirv8M_1GIBcSj-k5cM7onSTne-QmtE&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=pbKCNcZcHltTSot-6mG9ZQ&_nc_ss=7b2a8&oh=00_AQLM9scYnr__kO1Ud_mxb_ABSm6ktyIm1MXayoxoVgdxtA&oe=6ABE6C4F",
      "title": "MV AI \"Bon VoyAIge\"",
      "category": "mv",
      "featured": true,
      "youtubeUrl": "https://www.youtube.com/watch?v=rM9YAglDCBA&list=RDrM9YAglDCBA&start_radio=1",
      "description": "MV ca nhạc nghệ thuật với công nghệ Generative AI & Prompt Engineering tiên phong.",
      "deliverables": [
        "Kỹ sư Prompt thiết kế ma trận hình ảnh Generative AI cho toàn bộ khung hình MV.",
        "Đạo diễn nghệ thuật, lên ý tưởng kịch bản, dựng phim và chỉnh màu hiệu ứng thị giác.",
        "Sáng tác ca khúc bằng AI"
      ],
      "organization": "Creative & Digital Production",
      "categoryLabel": "Music Video & AI Direction"
    },
    {
      "id": "mv-slay-your-way",
      "role": "Producer, Director, Creative",
      "tags": [
        "Producer & Director",
        "Slay Your Way",
        "Theme Song MV",
        "Youth Culture"
      ],
      "year": "2024",
      "image": "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/480773677_660471393311744_4978702432081040830_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s640x640&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEg__6SYyWLeuCDVMWu1992bQlCAXxev5dtCUIBfF6_lxLafW6s9g7n5SqwamGf7JOQkhHUWUJI-2C4SaEme7Jk&_nc_ohc=DxKylXBy9VkQ7kNvwHsXQ-p&_nc_oc=Adr2GSu1iHJWeJaDs76dgwoPmk-H90ANhCnHxq7qaqQWUcn_lz60C1vSmVoZGjYaECM&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=3C9JNyLi6hQdIS86kSnCwg&_nc_ss=7b2a8&oh=00_AQKREsfmC-qcZaTMtUsibDYOlw5pkcovwbKBC2FlPvEcTg&oe=6ABE6A0D",
      "title": "MV \"Slay Your Way\"",
      "category": "mv",
      "featured": true,
      "youtubeUrl": "https://www.youtube.com/watch?v=I8xWcI7Tl_M&list=RDI8xWcI7Tl_M&start_radio=1",
      "description": "MV ca nhạc chủ đề FPT Edu Got Talent 2024 lan tỏa năng lượng tuổi trẻ, phong cách hiện đại và tinh thần tự tin.",
      "deliverables": [
        "Chỉ đạo toàn bộ tiền sản xuất, lịch quay, thiết kế bối cảnh và đạo diễn sáng tạo.",
        "Quản lý tập luyện vũ đạo nghệ sĩ, trang phục và vận hành ê-kíp camera đa góc.",
        "Đạt hàng triệu lượt xem và tương tác tích cực trên các nền tảng mạng xã hội."
      ],
      "organization": "FPT Education / Media Production",
      "categoryLabel": "Music Video & Theme Song"
    },
    {
      "id": "mv-giai-dieu-viet-nam-minh",
      "role": "Producer, Creative",
      "tags": [
        "Masew Collaboration",
        "Nhạc Cụ Dân Tộc",
        "Producer",
        "PR Campaign"
      ],
      "year": "2024",
      "image": "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/482258664_667144635977753_4229649854588329040_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1366&ctp=s2048x1366&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGFoDP0Aj-m44_zByNhgNLTDcvCShEJd8cNy8JKEQl3x6dtpSaLFEK1dvuX02VZNf26jZ0MHMSYX9zFUeurKRnW&_nc_ohc=-4JN9Shh_fkQ7kNvwHfkWr5&_nc_oc=AdqWjjHezeJpRQxaih0xmqJlBA4W-lig12OtVu6nglibK1oiDolquXTv-RWlgPtElM8&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=YDUup4ri5hfxxANEeqH4yA&_nc_ss=7b2a8&oh=00_AQLlq_7176usfk8u8rcbQOvnoQnJWdsnMySaKZ__zNmVkQ&oe=6ABE84CF",
      "title": "MV \"Giai Điệu Việt Nam Mình\" feat Masew",
      "category": "mv",
      "featured": true,
      "youtubeUrl": "https://www.youtube.com/watch?v=BbavRMbfvmY&list=RDBbavRMbfvmY&start_radio=1",
      "description": "MV ca nhạc kết hợp cùng Producer Masew, hòa quyện giai điệu nhạc cụ dân tộc Việt Nam với chất nhạc điện tử hiện đại.",
      "deliverables": [
        "Điều phối sáng tạo giữa Producer Masew và thông điệp văn hóa cuộc thi Tích Tịch Tình Tang.",
        "Sản xuất ấn phẩm truyền thông, teaser báo chí và kế hoạch phát hành đa nền tảng.",
        "Đạt phủ sóng rộng rãi trên các trang tin tức giải trí và truyền thông hàng đầu.",
        "Hạng mục giao nộp mới..."
      ],
      "organization": "National Music Collaboration",
      "categoryLabel": "Music Video & Theme Song"
    },
    {
      "id": "proj_1790494577517",
      "role": "Director, Creative",
      "tags": [
        "Creative Producing",
        "Media Campaign"
      ],
      "year": "2024",
      "image": "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/484171523_668647335827483_7312477286328797865_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFC-YVj664vghSua9WNJOAAqcBc6qcAt2apwFzqpwC3ZtFde1a1022JVTYq1GuTaQoWD-buNi5FpmGlsd5e88y9&_nc_ohc=akDF7nqDD1sQ7kNvwHCDs0J&_nc_oc=Adps_0y55Eze2SezNJbrExuPykIKdgW893Zto-22SDJxYOhYUfppNoggb13qll79vjg&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=ZpZCciK_0XYcCB4cbwziwA&_nc_ss=7b2a8&oh=00_AQJ-mt8ThOo3JDyG8XEOXcJYJ_A-mnmhLp0AUEG89PW8yQ&oe=6ABE9937",
      "title": "MV \"Khơi Nguồn Võ Việt Nam\"",
      "category": "mv",
      "featured": true,
      "youtubeUrl": "https://www.youtube.com/watch?v=AbDLpepiMRo&list=RDAbDLpepiMRo&start_radio=1",
      "description": "Dự án MV ca nhạc hợp tác cùng nhạc sĩ/ca sĩ Bùi Công Nam nhằm tôn vinh tinh thần võ thuật dân tộc",
      "deliverables": [
        "Đưa ý tưởng và kịch bản thành một MV hoàn chỉnh, có câu chuyện và hình ảnh nhất quán.",
        "Hoàn thiện MV theo định hướng hình ảnh và câu chuyện đã xây dựng, đảm bảo sự thống nhất từ ý tưởng đến thành phẩm.",
        "MV hoàn chỉnh cùng toàn bộ nội dung hình ảnh phục vụ hậu kỳ và phát hành."
      ],
      "organization": "FPT Education / Media Production",
      "categoryLabel": "Music Video & Creative"
    },
    {
      "id": "proj_1790490577326",
      "role": "Assitant Director, Creative",
      "tags": [
        "Creative Producing",
        "Media Campaign"
      ],
      "year": "2025",
      "image": "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/494483114_1150710426856831_1052438302677449338_n.jpg?stp=dst-jpg_tt6&cstp=mx1920x1080&ctp=s1920x1080&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEoq1xcUEaNSQqwodbius76pCz5eStBm0akLPl5K0GbRinuGn5anlsSx-Mv16ES6QBKfFeDcNwowXZEF6lEX2Ew&_nc_ohc=wFyv6aAxXU0Q7kNvwHl9saL&_nc_oc=Adp1UmCpsRFMbXf3xL0dkV04JvOo6VzW5GjqNklG8cfbfE4uqCfCYkKYTDVYeFDU5QM&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=-SHm9-ZLc8fylxW4e7fVxg&_nc_ss=7b2a8&oh=00_AQJYQSIMDv4Fk8H2bukaTrrTQOon1_jpf_jvTU3ziImvoA&oe=6ABE795E",
      "title": "MV \"Cho Con Là Người Việt Nam\"",
      "category": "mv",
      "featured": true,
      "youtubeUrl": "https://www.youtube.com/watch?v=nyPru6HCyuk",
      "description": "“Cho con là người Việt Nam” là một sản phẩm âm nhạc được Nhạc sĩ Trương Quý Hải sáng tác, nằm trong bản Trường ca \"Người Việt Nam\". Tác phẩm được Nhà sản xuất âm nhạc Nguyễn Hữu Vượng làm mới lại với phần phối khí kết hợp giữa giao hưởng, rap và nhạc cụ dân tộc đàn tranh và sáo trúc. Nghệ sĩ Tùng Dương là ca sĩ thể hiện ca khúc này cùng sự tham gia của Rapper Manbo - quý quân Rap Việt 2024, Hoa hậu Quốc gia Việt Nam Nguyễn Ngọc Kiều Duy, Á Hậu Du lịch Việt Nam Phạm Hoàng Thu Uyên.",
      "deliverables": [
        "Điều phối đoàn phim, diễn viên và các bộ phận trên set, đảm bảo lịch quay diễn ra đúng kế hoạ",
        "Hoàn thành toàn bộ lịch quay theo kế hoạch, phối hợp bàn giao footage đầy đủ cho khâu hậu kỳ.",
        "Phát triển ý tưởng và kịch bản theo hướng creative, đồng thời phối hợp triển khai các cảnh quay trên set.",
        "Kịch bản hoàn chỉnh và footage theo kế hoạch, sẵn sàng cho khâu hậu kỳ."
      ],
      "organization": "FPT Education / Media Production",
      "categoryLabel": "Music Video & Creative"
    },
    {
      "id": "f-exp-podcast",
      "role": "Project Manager",
      "tags": [
        "Project Manager",
        "Podcast Production",
        "Audio Storytelling",
        "Guest Curation"
      ],
      "year": "2023 - 2024",
      "image": "https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/482198297_1113346313926576_5439307586424676216_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s640x640&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF1iziTYMwK2wj5mXLOYDMwM5W1c_Yub9MzlbVz9i5v0wdf34uYTVanf-C47wxBrN_T9AEy5D0gOAc9Fuf_XbrE&_nc_ohc=DoQqw4LRp40Q7kNvwF1-bLm&_nc_oc=Adpyxt0J36gnhxOHE-ngJSJYOTCUiG6n8C1cYGQz0wcSD-JUwMNgSITWfPUJIv3FfrI&_nc_zt=23&_nc_ht=scontent.fsgn2-3.fna&_nc_gid=v5C4rFQhpJIqdxW0NrwBIQ&_nc_ss=7b2a8&oh=00_AQLSsV-2k-YzCFCBV6oE5CnkYmokD8dn26iwJplSK0H5dw&oe=6ABE7C13",
      "title": "F-EXP 'N BEYOND Experience Podcast",
      "category": "podcast",
      "featured": false,
      "youtubeUrl": "https://www.youtube.com/watch?v=efdlGSW8bOY",
      "description": "Chuỗi Podcast chuyên sâu chia sẻ góc nhìn trải nghiệm thực tế với các chuyên gia ngành, nghệ sĩ sáng tạo và sinh viên tiêu biểu.",
      "deliverables": [
        "Quản lý toàn bộ dự án từ khâu chọn lọc khách mời, kịch bản đến phát hành.",
        "Chỉ đạo kỹ thuật thu âm, biên tập âm thanh và thiết kế trích đoạn ngắn cho social.",
        "Phát triển kênh phân phối đa nền tảng trên Spotify, YouTube và Apple Podcasts."
      ],
      "organization": "FPT Education",
      "categoryLabel": "Original Audio Series"
    }
  ],
  "experiences": [
    {
      "id": "fpt-comms-2024",
      "year": "2023 — 2025",
      "roleEn": "Event Operations, Scriptwriting & Communication Executive",
      "roleVi": "Chuyên Viên Tổ Chức Sự Kiện, Kịch Bản & Truyền Thông",
      "metrics": "+20% Engagement",
      "companyEn": "FPT University Can Tho",
      "companyVi": "Tổ chức Giáo dục FPT",
      "taglineEn": "Educational brand marketing, copywriting & full-cycle event production",
      "taglineVi": "Quản lý sự kiện, viết kịch bản & truyền thông thương hiệu giáo dục",
      "categoryEn": "Education Communications",
      "categoryVi": "Truyền thông Giáo dục",
      "achievementsEn": [
        "Planned and executed comprehensive communication strategies to promote university programs and events.",
        "Managed internal and external communications, including press releases, newsletters, and social media updates, ensuring consistent messaging.",
        "Collaborated with cross-functional teams to create content that resonated with stakeholders, boosting engagement by 20%.",
        "Organized and managed high-profile PR events, enhancing visibility and reputation in the education industry."
      ],
      "achievementsVi": [
        "Lên kế hoạch và thực hiện các chiến lược truyền thông toàn diện để quảng bá các chương trình và sự kiện của trường.",
        "Quản lý truyền thông nội bộ và đối ngoại (thông cáo báo chí, bản tin, mạng xã hội) đảm bảo thông điệp nhất quán.",
        "Hợp tác với các nhóm liên chức năng để tạo nội dung thu hút khách hàng, tăng 20% lượng tương tác.",
        "Tổ chức và quản lý các sự kiện PR lớn, nâng cao uy tín của trường trong ngành giáo dục."
      ]
    },
    {
      "id": "mov-media-2022",
      "year": "2022",
      "roleEn": "Media & Event Manager",
      "roleVi": "Quản Lý Truyền Thông & Sự Kiện",
      "companyEn": "MOV Communications",
      "companyVi": "MOV Communications",
      "taglineEn": "Artist media strategies, entertainment public relations & tailored activations",
      "taglineVi": "Chiến lược truyền thông nghệ sĩ & PR giải trí",
      "categoryEn": "Entertainment & Artist PR",
      "categoryVi": "PR Giải Trí & Nghệ Sĩ",
      "achievementsEn": [
        "Developed and executed media strategies for company artists, ensuring alignment with brand goals.",
        "Planned and organized tailored entertainment events and activations customized to client requirements.",
        "Enhanced industry reputation, artist profile visibility, and client satisfaction metrics."
      ],
      "achievementsVi": [
        "Xây dựng và thực thi chiến lược truyền thông cho nghệ sĩ, đảm bảo phù hợp với mục tiêu thương hiệu.",
        "Lên kế hoạch và tổ chức các sự kiện giải trí và hoạt động kích hoạt thương hiệu theo yêu cầu khách hàng.",
        "Nâng cao uy tín công ty, mức độ nhận diện nghệ sĩ và sự hài lòng của đối tác."
      ]
    },
    {
      "id": "yanh-talent-2021",
      "year": "2021",
      "roleEn": "Talent Manager",
      "roleVi": "Quản Lý Talent / KOLs",
      "companyEn": "Y Anh Film Joint Stock Company",
      "companyVi": "Y Anh Film Joint Stock Company",
      "taglineEn": "Influencer representation, contract negotiation & commercial campaigns",
      "taglineVi": "Đại diện KOL, đàm phán hợp đồng & chiến dịch thương mại",
      "categoryEn": "Talent & Influencer Management",
      "categoryVi": "Quản lý KOLs / Influencer",
      "achievementsEn": [
        "Managed influencer activities, including commercial contract negotiations and campaign execution.",
        "Secured advertising contracts for influencers, expanding commercial reach, sponsorships, and revenue."
      ],
      "achievementsVi": [
        "Quản lý hoạt động của influencer, bao gồm đàm phán hợp đồng thương mại, định hướng nội dung và thực thi chiến dịch.",
        "Ký kết thành công các hợp đồng quảng cáo, mở rộng phạm vi thương mại, tài trợ và doanh thu công ty."
      ]
    },
    {
      "id": "hayd-minishow-2021",
      "year": "2021",
      "roleEn": "Organizer & Event Producer",
      "roleVi": "Nhà Sản Xuất & Tổ Chức Sự Kiện",
      "companyEn": "Hayd Minishow in Vietnam",
      "companyVi": "Hayd Minishow in Vietnam",
      "taglineEn": "International artist fanmeeting logistics, marketing & live concert operations",
      "taglineVi": "Quản lý hậu cần, marketing & vận hành concert nghệ sĩ quốc tế",
      "categoryEn": "Live Concert Production",
      "categoryVi": "Sản Xuất Concert Live",
      "achievementsEn": [
        "Organized and managed end-to-end logistics, marketing, and execution of Hayd Minishow and Fanmeeting in Vietnam.",
        "Coordinated across international and local stakeholders to deliver a seamless event experience."
      ],
      "achievementsVi": [
        "Tổ chức thành công và quản lý toàn bộ khâu hậu cần, marketing và vận hành sự kiện Hayd Minishow & Fanmeeting tại VN.",
        "Phối hợp với các đối tác trong nước và quốc tế, công ty quản lý nghệ sĩ để mang lại trải nghiệm hoàn hảo cho fan."
      ]
    },
    {
      "id": "fpt-admission-2018",
      "year": "2018 — 2021",
      "roleEn": "Admission & Telesales Consultant",
      "roleVi": "Tư Vấn Tuyển Sinh & Telesales",
      "companyEn": "FPT University HCMC",
      "companyVi": "Đại học FPT TP.HCM",
      "taglineEn": "Student admissions advisory, enrollment strategy & consultative engagement",
      "taglineVi": "Tư vấn tuyển sinh",
      "categoryEn": "Admissions & Client Advisory",
      "categoryVi": "Tuyển Sinh & Tư Vấn",
      "achievementsEn": [
        "Provided high-performing experience as an enrollment consultant, guiding prospective students.",
        "Contributed to institutional growth by consistently achieving enrollment targets and high satisfaction."
      ],
      "achievementsVi": [
        "Tư vấn và hướng dẫn sinh viên tương lai trong quá trình tuyển sinh với thành tích xuất sắc trong 3 năm.",
        "Góp phần đáng kể vào sự phát triển của trường thông qua việc đạt chỉ tiêu tuyển sinh và duy trì tỷ lệ hài lòng cao."
      ]
    }
  ],
  "galleryAlbums": [
    {
      "id": "album-led-stage-1",
      "images": [
        {
          "id": "img-101",
          "url": "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/482027282_667530732605810_5608055114663309702_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFxRCCIZD1NO8-mPOPhtXARK0FBAt-7hXorQUEC37uFel2Lqi8CjfeOOJDJUu--3rluST7BYgvSbpVRp2hyTOd7&_nc_ohc=j0OKmM7bHK0Q7kNvwG-lT6q&_nc_oc=AdqV2Mt1cRhR-trcmRkjPilZQoV7TplDt0A8XqO1mZ4XnX6zvBGYm8-zGBm-xqr8-JI&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=7v5d4UAdsvyRlqysYEDXPw&_nc_ss=7b2a8&oh=00_AQIfKPYNkxzkoChalpn-ioZupqGXICETPWSjJDvRPHCUjA&oe=6ABE8F3C",
          "title": "Main Concert LED Stage",
          "caption": "Thiết kế visual 3D sân khấu chính Masew Concert"
        },
        {
          "id": "img-102",
          "url": "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/482015739_667530669272483_3437898819778414643_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGpNlwJUEI0ReuHhc3f3gk3ZJ3g5NBxwkFkneDk0HHCQRuPrSOBnUjV8aSZuP1RvirRAxW4jpj62ppH7mV_nbTk&_nc_ohc=ztue1chjfbgQ7kNvwFSSQFN&_nc_oc=AdqSPuNyeU8PNP5TCPFaYDsOzvHuPyuvhPYRD8vj37Xr7Wle7ewBT4LnSAnfiDVIZ7s&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=sCT7_rqmCXzlSfn1bmPyvQ&_nc_ss=7b2a8&oh=00_AQImb_uuuS38bjgmI7E2XSdcYGUMJodNRJi_w-0FxFYfSQ&oe=6ABEB0EC",
          "title": "Dynamic Stage Lighting & LED Loop",
          "caption": "Hiệu ứng ánh sáng phối hợp cùng nhịp điệu âm nhạc"
        },
        {
          "id": "img-103",
          "url": "https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/481978945_667530459272504_3668797001751949129_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGwVcnbzEjg4nMjagK11z7gd0HTFM1-ceN3QdMUzX5x41-wfDZoOpzfdzNSYiezzyrrRHaVQ2BQ5KFZPwzgYsyX&_nc_ohc=GtFl9kl4JH8Q7kNvwE6jM6n&_nc_oc=AdqIkM_fcqy-dwufUMPIuVJg_J9pDbPrgCntp1xQSDLqpmLyLgSF5y5KQGy9xsKXvlU&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=_zGiascV_SzCwMQlvPt7eg&_nc_ss=7b2a8&oh=00_AQJx-6rwigcILiPVGvDJIEkYrGgofAA647DBN8lEC_smjg&oe=6ABE901D",
          "title": "Event Visual Atmosphere",
          "caption": "Không gian truyền thông visual ấn tượng"
        },
        {
          "id": "img_1790493769187",
          "url": "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/482032090_667530795939137_6808358692077532256_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGIxm52peOLcFpAh6RS0CvTCJOp2C9MxjMIk6nYL0zGM-rcqnJH-Xuy6g5leb0RjAw_bQ8ZqvmWnD8vp-Rl32Cs&_nc_ohc=QH-aj6u3J0cQ7kNvwEoTPAI&_nc_oc=AdooFZPzWk1H9PQUHpNMqfgXzDsz9GIfxsVmCRIWVep2htCW_NDteCdYQJZ5zeHEWfY&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=wBzMmdcMRz0Qcec-ePsetQ&_nc_ss=7b2a8&oh=00_AQKIANf70QARuXNbCwoWrhakLCrBdlKYgsidV51Y620ixQ&oe=6ABE80E4",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790493778302",
          "url": "https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/482020564_667530799272470_4052510873130466698_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFJN81LRyr3Rpa0n7PXc0tprd6ZsbtNXAGt3pmxu01cAV6D5HtGgePpLF90Iri1vG32W0bBz5EUW_zXzdJIa_0i&_nc_ohc=gQW1gJ2O3yAQ7kNvwH2znzA&_nc_oc=AdpMnr8X0aMntnHVtID6IxtD4IUJNEK0dqqXlam79HAxyUg5lN5QFkBcGsDJdav4vtg&_nc_zt=23&_nc_ht=scontent.fsgn2-3.fna&_nc_gid=H6XVFKc4JgLIul1pVK1-eA&_nc_ss=7b2a8&oh=00_AQIu1I8STutVcXdgsibjmrBA6Fj_AneUBH99hbN3r7u5dQ&oe=6ABE85FC",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790493787411",
          "url": "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/481976185_667530805939136_6217838996024052413_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE0TCj5OmJSro0GZYidqx7m0pwRxqpMSB7SnBHGqkxIHlx_eVJTFIorYKWBoPfoQ7bYKfn9cKcMzmLlaYZKEY4P&_nc_ohc=ZzU16p8heIIQ7kNvwFHlUZ9&_nc_oc=Adrv5naAwkm54dtqskxCT1ynd436y07VHAV3NQbcr60oGJpW5wxHqNr0Ai9YqYOczew&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=l2d0Q2sFlfHZ5Y6MksRy0w&_nc_ss=7b2a8&oh=00_AQLCPy4qli1Yccn_epdAW_0VgIF6CXszsE4v6HpbG8o8qg&oe=6ABE9DE0",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790493797267",
          "url": "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/481924868_667530725939144_1407299251778943084_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEV8J9FHfas7NrgxDbX7ZeMYY2hxMXV5BJhjaHExdXkElAWwhTf9631YsY09_AR-kFNxBEaH4lf_wtxMs2KoFoD&_nc_ohc=Wc4BFWW2RqsQ7kNvwGJlTVl&_nc_oc=Adoun7ck6Oy1OXNeZvikPopizalnbIvE7rwli3wb8ZvAyNRa3QvlHmVb0kwsBtoyGFg&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=Gg59EzGjWmqYG3e55g5yuQ&_nc_ss=7b2a8&oh=00_AQIHJl0pHtEOHAcZ0XAZWFmbDu39GfGAu5DX_xahR7wB4A&oe=6ABE9631",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790493810987",
          "url": "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/481996833_667530625939154_7225252324981254652_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH0Zf6M4dH1qnifp0xp0D7FCMCJlV2itZQIwImVXaK1lAsM-5w-4A_W5xHWYyBRwME6FDt55a9K66s7-yuLXESC&_nc_ohc=F8DjYPyBGCUQ7kNvwHOpDcs&_nc_oc=Adqjlj5ZmelQ_uPQPurnSRkWNNE4MHYpJ6_4N53699PproIIoQFHJqo2wUitcYxz2YE&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=1D8yjEnaXtPdj0GHtQHGMA&_nc_ss=7b2a8&oh=00_AQJFUqssXeFSqIefL00NbZbo_E_Cuq2Y5v7Zy4VPge57Bw&oe=6ABE8724",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790493837174",
          "url": "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/482026452_667530719272478_5481339420394380099_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEN28i9S7IAEig_txJzgenmqXLOc3OjIMGpcs5zc6MgwVSZB09eMzG8wENhNbGFFfzavRMJ7WJT95YsvoQ7GSta&_nc_ohc=cONHT3ZB68YQ7kNvwF8995i&_nc_oc=AdrkFh640M8mnZdd_9QFgXJWsx0aDrIhwEJ6Vq43n-0MzJkjVYhNZ0TGAmr96NVXL94&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=LjsqDAoFy4EVXYopkAfMYg&_nc_ss=7b2a8&oh=00_AQLNgE-35nUpkI_UgKo_o_A5NgVBbFuAvmqyYoJYR79N5g&oe=6ABE9666",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790493851525",
          "url": "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/482012541_667530745939142_498604480231668405_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGum1ZHY2SGsFB3TTcLwoGpeCXHdXtTFG94Jcd1e1MUb1RKFS4FaZ8pC4hosjbF0i-c4TZ5-euvjlJkyBeLeTw4&_nc_ohc=Qrb70xpDRAIQ7kNvwFhH3El&_nc_oc=Ado62V8eqVkxF0v0FmyZlkYNKTeSkGJ9ha4EJ9_dn-08N2olnphkAGzRUIwCsYX2V2A&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=x82YzYbawjYtqzm63UWMRA&_nc_ss=7b2a8&oh=00_AQKemhvrUl3Z9VxFwA1-aAevtz7t4zF6cA-ah--S6tiE_Q&oe=6ABE7CA8",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790493868617",
          "url": "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/482001133_667530312605852_4707955437797016835_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFA5mv_zHK9zoJ0_ftojzg1fMmD4kRVRp58yYPiRFVGnrD8a0UOongrzQ5XMo9i5hDO4a4OoB-7gHm_FZj1aq-i&_nc_ohc=1bvAHc5NKXQQ7kNvwH8ZCN0&_nc_oc=Ado99Kw1s6qqtt7_MfApvdkmcswK1QcnldGvoV3c10iiKO7G5b35yjA31PkXGY_vOOM&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=2JigDFsv_6U_t3AuheLTEw&_nc_ss=7b2a8&oh=00_AQJqSN99aPbKkdaDzt5YdkAMTbOgO97v4G9FK4m-dWbHcQ&oe=6ABE80E2",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790493878927",
          "url": "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/482007936_667530485939168_7971653072246229152_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGdJz1AGpKcT0Rz6J7uwLb3ZHO--CPeVzdkc774I95XNwfhgmaCa_ibBSr8M9Bj5ROExQyEEGy_6l-JSFhkVZkg&_nc_ohc=_1VDT6l2qDYQ7kNvwElH63K&_nc_oc=AdpqaFfHmbVF2OpV2l2Clw4e7Ct1a8syJWGQcW3GvNeT9u38lGIw_eAlnNNRKnY2SFk&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A6OiXj1aJO-ROh98-aDl6Q&_nc_ss=7b2a8&oh=00_AQI9wEe6IzZHTk65NI7AXcIQXRtReXhONKZi8cVMjvce5Q&oe=6ABE9EC2",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790493887491",
          "url": "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/482014612_667530722605811_6160322898019461847_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGdZ0m9aTtW4M4kb-JlNP-uWISs3D_0rwxYhKzcP_SvDMa2JpE5DXy1DIqa0xe2FHWGUfCgF1ydAzLSYb8JLomE&_nc_ohc=mTnSyO50SMsQ7kNvwHuApzu&_nc_oc=AdpzjuPUwdIo4YleSZvfjLF692HZfxMA21mZ1-iTDP_9ny8rMFZ7jY5AMphO7tZuuAU&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=UfPzH0aeHatcZanc2AOpqw&_nc_ss=7b2a8&oh=00_AQJMg7N2Z5c5ij15K0dv_pbrSL8AUJ0ZDU115CG3W0qUpg&oe=6ABE9A29",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790493897518",
          "url": "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/481922295_667530399272510_1027696838687856550_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x2000&ctp=s2000x2000&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEmhzGk1loPggPk5E-j38mDaDODmqWGcZZoM4OapYZxlrivEnMiCifMDMUNKXhTcHTtkFKcHGJOWe961DRnEJPY&_nc_ohc=vwv9vKXCZfoQ7kNvwFjJ0Pi&_nc_oc=Adp0lEECyHvwy90SW7l8hsD6MFfnWEc1ON2DaQF25MlWhEIxdKq8CxWa_8Ab2vYoI1w&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=Rkjx2LGSuCh4p2cCJi1zyA&_nc_ss=7b2a8&oh=00_AQJbv9qpNS20ik8Fe4tet6yGEUXANxHkWZuQ305FmHu2cQ&oe=6ABE7DD8",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        }
      ],
      "titleEn": "STAGE NIGHT OF PERFORMANCE & AWARDS FPT EDU 2024 FUNERAL FUNERAL",
      "titleVi": "SÂN KHẤU ĐÊM CÔNG DIỄN & TRAO GIẢI FPT EDU TÍCH TỊCH TÌNH TANG 2024",
      "categoryEn": "Visual Showcase",
      "categoryVi": "Visual Showcase",
      "coverImage": "/src/assets/images/project_mv_showcase_1790314359425.jpg",
      "descriptionEn": "Collection of 3D LED background graphics, lighting visuals and stage designs for live music concerts.",
      "descriptionVi": "Tổng hợp thiết kế visual màn hình LED, hiệu ứng ánh sáng 3D và bối cảnh sân khấu quy mô lớn."
    },
    {
      "id": "album-led-motion-2",
      "images": [
        {
          "id": "img-201",
          "url": "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/480462430_672046082154275_6883656982816384794_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF3bVUml9Yh2bV9-uM_HtC_CBagAQlpWeQIFqABCWlZ5BsbBH3Tgz56vhiSifN_cf4ZMmQsNnTAoSTbjEfut3S0&_nc_ohc=Qo6O4yclPJYQ7kNvwFgEqiS&_nc_oc=AdrtAPecm9B7sbp9m1QxYyFX7j74qF7kpGxbDgK_OkhHU2RJERjJZoTH70PQTBpQF40&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=TiYMcQdZG9FMANfHgEdpMQ&_nc_ss=7b2a8&oh=00_AQLquJU332pcn1p71-jhXixH2W63RsSPynM9j3zhyFkYzg&oe=6ABE7E77",
          "title": "Cyberpunk Futuristic Visual Loop",
          "caption": "Visual chuyển động phong cách tương lai"
        },
        {
          "id": "img-202",
          "url": "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/484035024_672046035487613_1662053713298587721_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEE3-Iq07JtKh2M56SgRBz_eL-q8mhVlAZ4v6ryaFWUBuydpouv-0AXCwk9-f0JbMyi6W7MwLkZOaf9pm7k_nHf&_nc_ohc=7rcoBRHnI4gQ7kNvwFccyko&_nc_oc=Adp2yQyGV6vut48l-EfvY0zbJjkirQ--mWa7I4XLBZTJWwua_B89lvyE7XZwUy93jKY&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=fFi-SeKgIJNptqWicmOw2w&_nc_ss=7b2a8&oh=00_AQLwF921ES5IpZtJZhe6K-1gBNWEv33z1IeHYXqSoLBa5Q&oe=6ABEABB4",
          "title": "Generative AI Visual Texture",
          "caption": "Hình ảnh visual sáng tạo kết hợp AI"
        },
        {
          "id": "img_1790494188463",
          "url": "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/480490948_672045955487621_4758606600206208688_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHUGjWcHRvsovRrJpGn4iwgAAe_fib0u-UAB79-JvS75TbDGWrIwYyAuTU3MAEAKBvWib6WK_IXXWv7sP8FV7Xr&_nc_ohc=R00oRVPuES4Q7kNvwESv_I_&_nc_oc=Adqia_y7W0d_i8pO5ADfuhOeg8gdgcF6J7BLN0d6OVhhS4Hm0MBRbsNN_m6prEF2d8M&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=ktoChDZUbRwrudVYYIx5JQ&_nc_ss=7b2a8&oh=00_AQIgk3wFf9d_r9Sn0pmFMDF-CB_j3JaB2ueEY6iDh7xrhw&oe=6ABEA633",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790494199636",
          "url": "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/482088747_672045852154298_6871433742994302320_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG8_ZQ25XtbkMkTWpt_V9BAK66-UqFhJx4rrr5SoWEnHkPGmac_SZoR02TQtWD6-UuCGpqQ6ONK3MV3yfxqzKf3&_nc_ohc=J-I-YOpHjY0Q7kNvwFi-pRr&_nc_oc=Adq8wrbrTOAgQyaID9_BIdqTYE6CpKiMk3pQbqBXWPzxshk2yc6ZMNshWTNJZkOOdxQ&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=OEJEEyDSD7IQbKUjt4gLSQ&_nc_ss=7b2a8&oh=00_AQKXtlvO4FmdFnHb6DNn-qc3cbxKRqYVqpk5eGVAw2qRfg&oe=6ABE8D24",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790494210368",
          "url": "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/483966208_672045962154287_5737738206703198754_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEWT8UPrQ1IZ4GonHPSRFUF6PLRtKsh51To8tG0qyHnVFjtRSNpkiRIOhRPdCnXoCKKslSf9Hd_ZEBmY1hNlOIR&_nc_ohc=K90R2ku1qCsQ7kNvwFlHrfo&_nc_oc=Adr5cgXNodvM496z2rgzXOp9mWBUv_eQ2OpiWjhN_gqZrLWcn5Q5AKu-xM1WbgNbOZk&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=cP9WilsKqE36vV-omdE6tA&_nc_ss=7b2a8&oh=00_AQJ31ascF1BR8RE9KylEW5JMYB3WlFPYPs67trcz-ru78Q&oe=6ABE9DD8",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790494222725",
          "url": "https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/484168357_672045872154296_4760546951724968665_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF_rb2dCNnmUYZfFsPqT8PxMDHSYtmKgYUwMdJi2YqBhQ6agMHFtimGFeGNRfbwVzgLhsp8QJHKdfockYXTfJ87&_nc_ohc=v3bTsq45dn4Q7kNvwGlLQWq&_nc_oc=Adr60eq4v0PjYUgrCkhnhi2a4bnBrqu1ybxTKN2Otmz-Ap51Sxu8WW92nsvcq-c-2Mw&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=G-I9gF4uiNQLQNnAXoZQcA&_nc_ss=7b2a8&oh=00_AQKB--7baZSPQiMjKEt1dvdE-wVtric3EVXOeDWV_3FV1A&oe=6ABEB3BD",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790494238404",
          "url": "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/484049147_672045945487622_1923702986428708686_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFWNapUqdpyvBL7NdkCbECWcCp3L86H9eRwKncvzof15IXRhcnaZYfoDQ5dgfgw3W7Mn6nBTw6Y_1tvixSvqV0O&_nc_ohc=EWsU0x-PKvEQ7kNvwGdRP6x&_nc_oc=AdqU_8krmTruXbIB95RnryCNJLfFflx6MMqM1Mkxe0vrS1I7swdbDbMqEVX1Pjr6LHY&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=OqMfN_YXPOW08_KSOBJrxw&_nc_ss=7b2a8&oh=00_AQJW6bzSDdDRR8k5W6f9hc8O3YK6TWcXWrmy6QjmHuO0aQ&oe=6ABE7F0F",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790494252248",
          "url": "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/484078361_672046122154271_2580401755371830663_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFG82Vd0jcwyKoLNnTk7SWSCFVlc3VSx4UIVWVzdVLHhSkuV_v4tCVHl4rHjijT1e7Zh7ptxdeK5m6zhEmMb9Kw&_nc_ohc=PwQQyPiFW6IQ7kNvwGQmJV6&_nc_oc=Adrrs_qZwEjKF2qkfXGn6eKrTJA5CWO7iNvsDzynixfyz4IaC_jGjGQv8mDgL1-n4_I&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=L_orQslBTD7y7ZEqG1IrSw&_nc_ss=7b2a8&oh=00_AQKJMEf_0ipXq_0SLYDG4B2BOMG3G85sV1hTk-czIeGALQ&oe=6ABE7F0D",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790494261950",
          "url": "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/484166465_672046008820949_1349375971747757020_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGrE9mAspQToo0Rh5pwd0D1c32YvL7_pv5zfZi8vv-m_sVFJvFshVsJ1hoEIaCgnSf_COT0nYEL4kWxSIvnByFh&_nc_ohc=EYH0vRDTmHYQ7kNvwEqy6Gb&_nc_oc=AdoUQH2kRlIX_VH-h8-A6m-rkqsp5KyjEuAkTEHlsTE3Ashej1l6EjhdmE9D93tpNqM&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=A1kf4I7oHblQupsM_vUXiw&_nc_ss=7b2a8&oh=00_AQJ0NZH909wxXNDZmePsV81hjGXbhhsjbc83VGe5Ra8yCg&oe=6ABE9A4C",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790494271560",
          "url": "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/483961962_672045918820958_5391632712477482949_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEFx1wNTTdBHbVQgKjQWyKJ4GPsHpsI7crgY-wemwjtyj7taS4IjHzk-4qG4F0mlioHqo2Ttb-HXBvuZsZn07XO&_nc_ohc=nYNgB8UFPGcQ7kNvwFyHcAo&_nc_oc=AdpCqucyMB47KkCCXSta5hRCVbM1BuCrZ2lmEFHN-FXWqyma9Hk-D73FE6OKBmlYXvc&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=VBxNMcedzyoklfT4Cl9cxA&_nc_ss=7b2a8&oh=00_AQKOtREy4b_9UCvgh9uXINu1ScFTN1JO9sRgbi0MEg6MGA&oe=6ABE8889",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790494283620",
          "url": "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/480557433_672045922154291_4795473596733527806_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF1j7u-Oi2xhTY88bAkBDspDGLqOP_m1LcMYuo4_-bUt_Vqrht2g2i2AFUSfyV6eswCufAonZ9QY-MUpfteVqNz&_nc_ohc=bTtXSGGZ5w4Q7kNvwFShw5z&_nc_oc=AdpjDhPUcC2kEd6zyewPtKNTHUdQUJNJ3pCDp4T_FtcCezml7peil6_B2ernpuZ76nU&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=UHBFqF5CgqE89p7jK-LNsA&_nc_ss=7b2a8&oh=00_AQLsnrNh3fViaVmwMJ_HuqFwQnp4f4_nzYYrv0RXaT4cmA&oe=6ABEA2CA",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        },
        {
          "id": "img_1790494292014",
          "url": "https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/480226735_672045895487627_3203951264317620104_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1500&ctp=s1200x1500&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEWw58Zrcb8vZiitS8vGudx90_b2bXBjun3T9vZtcGO6ea3KTOUbJbKy751U0ygUnzGax6tEMEP05i49-3vkEiG&_nc_ohc=C33XqDJq4WcQ7kNvwFI14EZ&_nc_oc=AdrjDdKir7xqQyqIDtFRiSfMKl4ATt9oIBxCAatuWa13ptHaceeBQ9umqLY-jgd6i4I&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=LfBnSUgLl4UaM_vzj1BjnA&_nc_ss=7b2a8&oh=00_AQLcvosNOBNsOkTn925K8r-SdWE_IaKPqCPRNOpOXxuygA&oe=6ABEAF22",
          "title": "Visual LED Photo",
          "caption": "Thiết kế Visual LED sân khấu"
        }
      ],
      "titleEn": "PERFORMANCE & AWARD NIGHT FPT EDU INITIATING VIETNAMESE MARTIAL SOURCE 2024",
      "titleVi": "ĐÊM CÔNG DIỄN & TRAO GIẢI FPT EDU KHƠI NGUỒN VÕ VIỆT 2024",
      "categoryEn": "Visual Showcase",
      "categoryVi": "Visual Showcase",
      "coverImage": "/src/assets/images/project_lead_showcase_1790314373406.jpg",
      "descriptionEn": "Motion visual loops and AI-prompted background graphics crafted for music videos.",
      "descriptionVi": "Các vòng lặp đồ họa chuyển động (motion loops) kết hợp công nghệ AI Prompting cho video ca nhạc và biểu diễn."
    }
  ]
};
