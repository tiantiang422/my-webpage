/*
 * 镇有数｜簕竹镇数字名片 V0.9
 * 这里是全站唯一的常用内容配置文件。
 * 修改文字、数字、年份、图片路径、链接、版本号和模块状态，只改本文件即可。
 * 图片路径必须使用相对路径，例如：assets/images/home/hero.jpg
 */
window.SITE_CONTENT = {
  site: {
    title: "镇有数｜簕竹镇数字名片",
    shortName: "镇有数",
    region: "广东省云浮市新兴县簕竹镇",
    version: "V0.9 样板版",
    updatedAt: "2026年8月18日",
    eyebrow: "广东云浮 · 新兴县",
    description: "一张面向产业认知、地方协作与青年实践的镇域数字名片。",
    sourceNote: "本页面为 V0.9 样板版。公开数据、人物信息与合作信息须经地方核验后发布；未确认内容不作为决策、投资或合作依据。",
  },

  /* 素材同步后，把 src 改成实际的相对路径。请不要填写未经确认的人物身份信息。 */
  images: {
    hero: {
      src: "assets/images/01_首页候选/hero-town-aerial.jpg",
      sourceFolder: "01_首页候选",
      alt: "簕竹镇镇区与河流航拍景观",
      position: "center 48%",
      status: "簕竹镇镇域航拍",
    },
    bamboo: {
      src: "assets/images/02_竹产业/bamboo-processing.jpg",
      sourceFolder: "02_竹产业",
      alt: "竹笋加工现场与生产人员",
      position: "70% center",
      status: "竹产业加工现场",
    },
    chicken: {
      src: "assets/images/03_肉鸡养殖/chicken-standard-farming.jpg",
      sourceFolder: "03_肉鸡养殖",
      alt: "标准化鸡舍内的肉鸡养殖场景",
      position: "center 54%",
      status: "肉鸡标准化养殖场景",
    },
    youth: {
      src: "assets/images/07_团队实践/youth-livestream.jpg",
      sourceFolder: "07_团队实践",
      alt: "青年团队在簕竹镇开展产品直播实践",
      position: "62% center",
      status: "青年团队数字传播实践现场",
    },
    water: {
      src: "assets/images/04_水产/aquaculture-aerial.jpg",
      sourceFolder: "04_水产",
      alt: "山谷河道与水产养殖水面航拍",
      position: "center",
      status: "水产产业航拍场景",
    },
    returnee: {
      src: "assets/images/06_人物/huang-xiuyan.jpg",
      sourceFolder: "06_人物",
      alt: "返乡创业者黄秀燕在种植场景中展示作物",
      position: "center 38%",
      status: "黄秀燕 · 返乡创业者",
    },
  },

  hero: {
    badge: "镇域数字名片 · V0.9",
    titleTop: "看见簕竹",
    titleBottom: "读懂一座镇的产业与机会",
    summary: "以可核验的数据、产业链视角和持续更新的在地记录，呈现簕竹镇的发展基础与协作方向。",
    factLabel: "本期关注",
    fact: "竹产业 · 肉鸡产业 · 青年实践",
    actions: [
      { label: "30秒读懂簕竹", href: "#overview", style: "primary" },
      { label: "看产业", href: "#industries", style: "secondary" },
      { label: "找合作", href: "#opportunities", style: "text" },
    ],
  },

  overview: {
    navLabel: "读镇",
    kicker: "30秒读镇",
    title: "簕竹，正把镇域资源转化为可持续的产业价值",
    intro: "从传统农业基础出发，簕竹镇围绕特色产业、联农带农与镇域协作，持续梳理资源、产业和机会。V0.9 先聚焦已有素材可支撑的竹产业、肉鸡产业与青年实践。",
    points: [
      { index: "01", title: "产业有基础", text: "以竹产业和肉鸡产业为首批观察切口，呈现从资源端到经营端的价值链。" },
      { index: "02", title: "发展看机制", text: "关注组织化生产、稳定增收、村集体参与等联农带农机制，不止展示产品与风景。" },
      { index: "03", title: "协作重核验", text: "人物、项目、联系方式与合作条件均以地方确认版本为准，保持信息正式、审慎。" },
    ],
  },

  stats: {
    kicker: "核心数据",
    title: "四项镇域观察指标",
    note: "数据口径与年份将在地方核验后同步更新",
    items: [
      { label: "镇域基础", value: "地方核验中", unit: "", year: "核验后标注年份", source: "以地方确认口径为准" },
      { label: "竹产业规模", value: "地方核验中", unit: "", year: "核验后标注年份", source: "以地方确认口径为准" },
      { label: "肉鸡产业规模", value: "地方核验中", unit: "", year: "核验后标注年份", source: "以地方确认口径为准" },
      { label: "联农带农覆盖", value: "地方核验中", unit: "", year: "核验后标注年份", source: "以地方确认口径为准" },
    ],
  },

  industries: {
    navLabel: "产业",
    kicker: "产业专题",
    title: "从资源禀赋，看经营链条与共富连接",
    intro: "首批专题不以风景宣传为终点，而是回答产业如何形成价值、如何连接农户、哪些信息仍需核验。",
    items: [
      {
        id: "bamboo",
        number: "01",
        tag: "首批重点产业",
        title: "竹产业",
        subtitle: "从竹资源到产品价值，梳理一条可被看见的产业链",
        imageKey: "bamboo",
        description: "围绕资源基础、加工流通、产品形态和经营主体，逐步呈现竹产业的价值构成。具体产量、产值、主体名称及合作条件将在地方核验后发布。",
        chain: ["资源与种植", "采运与初加工", "产品与渠道", "收益与农户连接"],
        financeTitle: "财经观察",
        financeText: "重点核验产业规模、成本结构、销售半径、订单稳定性与价值增量，避免仅以资源面积替代经营表现。",
        inclusionTitle: "联农带农",
        inclusionText: "关注农户参与方式、村集体连接机制与收益分配口径；相关案例经授权与核验后发布。",
        status: "首批产业数据持续核验中",
      },
      {
        id: "chicken",
        number: "02",
        tag: "首批重点产业",
        title: "肉鸡产业",
        subtitle: "从养殖端到市场端，观察标准化生产与稳定增收",
        imageKey: "chicken",
        description: "围绕养殖基础、生产组织、疫病防控、出栏与销售衔接，呈现产业运行链条。养殖主体、栏量、产值与合作方式将在地方核验后发布。",
        chain: ["育雏与投入", "标准化养殖", "出栏与流通", "经营与农户收益"],
        financeTitle: "财经观察",
        financeText: "重点关注饲料等投入成本、养殖周期、价格波动、产销衔接与风险管理的实际口径。",
        inclusionTitle: "联农带农",
        inclusionText: "持续核验农户参与、用工吸纳、技术服务与村集体协作方式，形成可追溯的共富记录。",
        status: "首批产业数据持续核验中",
      },
    ],
    reserved: [
      { title: "水产产业", label: "专题预留", text: "首批内容持续更新中", status: "后续版本开放", imageKey: "water" },
      { title: "农文旅", label: "专题预留", text: "资源与项目经地方确认后发布", status: "后续版本开放" },
    ],
  },

  people: {
    kicker: "人物与共富",
    title: "让产业故事回到真实的人与机制",
    intro: "首批展示经用户确认的燕归来合作社返乡创业者黄秀燕。其他人物姓名、身份、肖像与案例信息须经本人或地方授权确认后发布，不依据图片推断。",
    cards: [
      { role: "产业带头人", status: "首批人物内容持续更新中" },
      { role: "黄秀燕", status: "燕归来合作社 · 返乡创业者", imageKey: "returnee" },
      { role: "共富参与者", status: "案例口径经地方核验后发布" },
    ],
  },

  opportunities: {
    navLabel: "机会",
    kicker: "机会窗口",
    title: "把合作诉求说清楚，也把信息边界标清楚",
    intro: "本区域用于承接经地方确认的产业协作、渠道对接与青年实践机会。V0.9 不发布未经核验的招商条件、联系方式或承诺。",
    items: [
      { code: "A", title: "产业协作", text: "产业链协作方向与准入条件经地方确认后发布。" },
      { code: "B", title: "渠道连接", text: "产品、供给规模与渠道合作信息经核验后发布。" },
      { code: "C", title: "青年共创", text: "调研、传播与在地实践计划以正式招募信息为准。" },
    ],
    notice: "合作信息经地方确认后发布",
    contactLabel: "暂不展示联系方式",
  },

  updates: {
    kicker: "动态更新",
    title: "一张会持续生长的镇域名片",
    intro: "围绕产业数据、在地走访、人物记录和合作进展持续更新；所有内容均保留来源、时间与核验状态。",
    items: [
      { date: "更新中", type: "产业数据", title: "首批数据正在进行地方口径核验", status: "核验中" },
      { date: "更新中", type: "在地记录", title: "首批内容持续更新中", status: "整理中" },
      { date: "更新中", type: "合作信息", title: "合作信息经地方确认后发布", status: "待确认" },
    ],
  },

  youth: {
    navLabel: "实践",
    kicker: "青年实践",
    title: "以真实调研，参与镇域数字内容共建",
    imageKey: "youth",
    intro: "青年团队通过资料梳理、实地观察、内容共创与数字化呈现，协助地方把分散信息转化为可理解、可维护、可持续更新的公共内容。",
    steps: [
      { number: "01", title: "资料梳理", text: "建立来源、年份与核验状态清单。" },
      { number: "02", title: "在地调研", text: "围绕产业链与联农带农机制记录。" },
      { number: "03", title: "内容共建", text: "在授权边界内完成数字化表达。" },
    ],
    note: "青年实践影像已接入；团队成员姓名与个人身份信息经授权确认后发布。",
  },

  footer: {
    title: "镇有数",
    tagline: "用数据与在地记录，看见一座镇的真实发展。",
    verificationTitle: "内容来源与核验说明",
    verificationText: "页面内容来自项目需求、地方公开资料与经授权的在地素材。数据、人物及合作信息以地方最终核验版本为准。",
  },

  navigation: [
    { label: "首页", href: "#home", target: "home" },
    { label: "读镇", href: "#overview", target: "overview" },
    { label: "产业", href: "#industries", target: "industries" },
    { label: "机会", href: "#opportunities", target: "opportunities" },
    { label: "实践", href: "#youth", target: "youth" },
  ],
};
