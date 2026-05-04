export type Language = 'pt' | 'en';

export const content = {
  pt: {
    nav: {
      home: 'Home',
      solutions: 'Soluções',
      clients: 'Clientes',
      products: 'Produtos',
      method: 'Método',
      portfolio: 'Portfólio',
      about: 'Sobre',
      contact: 'Contato',
      cta: 'Fale com a TATO'
    },
    hero: {
      headline: 'Transformamos operações complexas em produtos digitais inteligentes.',
      subheadline: 'A TATO Digital combina estratégia, governança, dados, automação e desenvolvimento sob medida para criar sistemas, dashboards e plataformas que ajudam empresas a decidir melhor, operar com mais controle e escalar com segurança.',
      tags: ['Estratégia', 'Dados', 'Operações', 'Governança', 'Automação', 'Escala'],
      ctaPrimary: 'Conheça as soluções',
      ctaSecondary: 'Ver portfólio profissional'
    },
    positioning: [
      'Estratégia em sistemas',
      'Dados em decisões',
      'Operações em escala',
      'Complexidade em clareza',
      'Governança em performance'
    ],
    transform: {
      label: 'OPERAÇÕES DIGITAIS',
      cardLabel: 'Transformação de Processo',
      title: 'Tecnologia com visão de negócio. Estratégia com execução real.',
      text: 'A TATO Digital nasce da experiência prática em ambientes de alta complexidade. Antes de construir uma solução, entendemos o fluxo real do negócio, os gargalos, as decisões críticas e os indicadores que precisam ganhar visibilidade.',
      items: [
        { from: 'Processos confusos', to: 'fluxos digitais claros' },
        { from: 'Dados dispersos', to: 'dashboards acionáveis' },
        { from: 'Operações manuais', to: 'sistemas sob medida' },
        { from: 'Decisões por percepção', to: 'gestão orientada por indicadores' }
      ]
    },
    products: {
      label: 'ESTRATÉGIA DE PRODUTO',
      title: 'Produtos digitais para empresas que precisam de controle, eficiência e escala.',
      items: [
        {
          id: 'sgvc',
          title: 'SGVC',
          subtitle: 'Sistema de Gestão de Vendas para Clínicas',
          description: 'Solução de gestão financeira e operacional desenvolvida para clínicas que precisam de mais clareza, controle e visão estratégica sobre sua operação.',
          features: ['Planilha estruturada de gestão financeira', 'Dashboard de indicadores', 'Controle de receitas e despesas', 'Acompanhamento de lucro e margem', 'Visão estratégica do fluxo de caixa']
        },
        {
          id: 'clinicash',
          title: 'CliniCa$h',
          subtitle: 'Gestão financeira simples e inteligente',
          description: 'Gestão financeira simples e inteligente para clínicas que precisam enxergar despesas, receitas, fluxo de caixa, margem e projeção de lucro.',
          features: ['Controle de despesas', 'Fluxo de caixa', 'Projeção de lucro', 'Performance financeira', 'Visão para sócios e gestores']
        },
        {
          id: 'emagresalus',
          title: 'EmagreSalus',
          subtitle: 'Plataforma SaaS para redes multiunidade',
          description: 'Plataforma SaaS para redes de clínicas multiunidade, com foco na jornada do paciente, acompanhamento, gamificação e fidelização.',
          features: ['Gestão nutricional', 'Acompanhamento de pacientes', 'Gamificação', 'Programas de fidelidade', 'Visão por unidade']
        },
        {
          id: 'clinicos',
          title: 'ClinicOS',
          subtitle: 'Sistema operacional de saúde',
          description: 'Sistema operacional completo para clínicas modernas, integrando agenda, estoque, equipe, salas, equipamentos, permissões e dashboards.',
          features: ['Agenda inteligente', 'Estoque e inventário', 'Serviços e pacotes', 'RBAC e controle de acesso', 'Dashboard operacional']
        }
      ]
    },
    solutions: {
      label: 'SISTEMAS SOB MEDIDA',
      cardLabel: 'SISTEMA SOB MEDIDA',
      title: 'Sistemas desenhados para o jeito real como sua empresa opera.',
      text: 'Nem todo negócio precisa de uma solução pronta. Muitas vezes, o maior ganho está em transformar um processo interno específico em um produto digital simples, eficiente e escalável.',
      items: [
        {
          id: 'SOL-01',
          title: 'Sistemas Internos',
          description: 'Criamos sistemas internos sob medida para organizar fluxos, centralizar informações e dar mais controle à operação.',
          keywords: ['Workflow', 'Centralização', 'Controle', 'Escalabilidade']
        },
        {
          id: 'SOL-02',
          title: 'Backoffices',
          description: 'Estruturamos backoffices digitais que reduzem retrabalho, aumentam visibilidade e melhoram a execução do dia a dia.',
          keywords: ['Operação', 'Eficiência', 'Estrutura', 'Processos']
        },
        {
          id: 'SOL-03',
          title: 'Dashboards Executivos',
          description: 'Transformamos dados dispersos em dashboards claros, visuais e acionáveis para apoiar decisões com mais segurança.',
          keywords: ['KPIs', 'Analytics', 'Visibilidade', 'Decisão']
        },
        {
          id: 'SOL-04',
          title: 'Plataformas SaaS',
          description: 'Desenvolvemos plataformas digitais com lógica de produto, foco em usabilidade e estrutura preparada para crescimento.',
          keywords: ['SaaS', 'Produto', 'Escala', 'Experiência']
        },
        {
          id: 'SOL-05',
          title: 'Automações com IA',
          description: 'Automatizamos rotinas e interações com inteligência artificial para ganhar velocidade, consistência e eficiência.',
          keywords: ['AI', 'Automação', 'Produtividade', 'Inteligência']
        },
        {
          id: 'SOL-06',
          title: 'Portais Operacionais',
          description: 'Criamos portais que organizam processos, usuários e fluxos críticos em uma experiência simples e funcional.',
          keywords: ['Portal', 'Operação', 'Organização', 'Gestão']
        },
        {
          id: 'SOL-07',
          title: 'Modelos de Controle Financeiro',
          description: 'Desenhamos estruturas digitais para acompanhar receitas, despesas, margens e indicadores financeiros com clareza.',
          keywords: ['Financeiro', 'Margem', 'Controle', 'Performance']
        },
        {
          id: 'SOL-08',
          title: 'Ferramentas de Performance',
          description: 'Construímos ferramentas que ajudam líderes a monitorar metas, indicadores e evolução operacional em tempo real.',
          keywords: ['Performance', 'Indicadores', 'Meta', 'Gestão']
        },
        {
          id: 'SOL-09',
          title: 'MVPs para Novos Produtos',
          description: 'Desenvolvemos MVPs com foco em validação rápida, clareza estratégica e evolução orientada por aprendizado.',
          keywords: ['MVP', 'Validação', 'Produto', 'Agilidade']
        },
        {
          id: 'SOL-10',
          title: 'Estruturação de Processos Digitais',
          description: 'Transformamos processos manuais e difusos em fluxos digitais mais claros, escaláveis e mensuráveis.',
          keywords: ['Processos', 'Digitalização', 'Clareza', 'Escala']
        }
      ]
    },
    method: {
      label: 'MÉTODO TATO',
      title: 'Do diagnóstico ao produto digital.',
      steps: [
        { title: 'Entendimento do negócio', text: 'Mapeamos operação, fluxos críticos, gargalos, responsabilidades e decisões-chave.' },
        { title: 'Desenho da solução', text: 'Transformamos necessidades em arquitetura funcional: módulos, telas, permissões, dados e indicadores.' },
        { title: 'Estruturação dos dados', text: 'Organizamos bases, fontes de informação, regras de cálculo e modelos de acompanhamento.' },
        { title: 'Desenvolvimento', text: 'Criamos dashboards, sistemas, automações ou plataformas sob medida.' },
        { title: 'Implantação', text: 'Apoiamos a adoção, ajustamos fluxos e documentamos processos.' },
        { title: 'Evolução contínua', text: 'Acompanhamos melhorias, novas necessidades e evolução do produto.' }
      ]
    },
    renato: {
      label: 'HUB PROFISSIONAL',
      title: 'POR TRÁS DA TATO: ESTRATÉGIA, DADOS E EXECUÇÃO PARA OPERAÇÕES COMPLEXAS.',
      bio: [
        '**Gerente de Projetos** e **PMO** com foco em **governança**, acompanhamento de **performance** e **coordenação estratégica** para **Rock in Rio**, **The Town** e **Rock in Rio Lisboa**. Durante a execução, atua nas operações para garantir a entrega.',
        '**Liderança operacional** em zonas de **Food & Beverage** (**The Town 2023**, **Rock in Rio Lisboa 2024**) com coordenação de fornecedores, gestão de força de trabalho, resolução de problemas e preparação de vendors.',
        'Desenhou e implementou processo completo de **intake** para ativações de parceiros (aprovações de conceito, documentação legal/técnica, **HSSE**, sustentabilidade) suportando ativações no **Lollapalooza 2024**, **Rock in Rio 2024**, **The Town 2025**.'
      ],
      competences: [
        'Gestão de Projetos & PMO', 'Performance de Negócio', 'Decisões Baseadas em Dados', 'Estruturas de Governança',
        'Excelência Operacional', 'Execução Orientada a Produto', 'IA & Automação', 'Gestão de Stakeholders'
      ],
      roles: [
        { title: 'Fundador', sub: 'TATO DIGITAL' },
        { title: 'PMO', sub: 'Líder Executivo' }
      ],
      vision: 'A VISÃO ESTRATÉGICA POR TRÁS DA TATO DIGITAL.',
      specialties: 'Especialidades'
    },
    portfolio: {
      label: 'HISTÓRIAS de TRANSFORMAÇÃO',
      title: 'Casas onde estratégia encontra execução.',
      cursorDetails: 'DETALHES',
      cursorGoal: 'OBJETIVO',
      modalLabel: 'OPERAÇÕES DETALHADAS',
      cases: [
        {
          id: 'rockworld',
          client: 'Rock World',
          title: 'Rock in Rio, The Town, Lollapalooza',
          description: 'Atuação em PMO, performance, alinhamento multifuncional, relatórios executivos e operação em campo.',
          tags: ['PMO', 'Megaevents', 'Governance', 'Operations'],
          image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1600&auto=format&fit=crop'
        },
        {
          id: 'rappi',
          client: 'Rappi',
          title: 'Expansão e escalabilidade operacional.',
          description: 'Liderança na expansão de mais de 30 dark stores, usando análise de dados para rollout e supply chain.',
          tags: ['Expansion', 'Data', 'Operations', 'Rollout'],
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop'
        },
        {
          id: 'rededor',
          client: "Rede D'Or São Luiz",
          title: 'Projetos críticos em saúde.',
          description: 'Gestão de projetos estratégicos, implementação de sistemas e coordenação entre áreas clínicas e tecnologia.',
          tags: ['Healthcare', 'Systems', 'Performance', 'Governance'],
          image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop'
        },
        {
          id: 'accenture',
          client: 'Accenture',
          title: 'Consultoria e governança.',
          description: 'Planejamento integrado de projetos complexos, alinhamento entre negócios e transformação operacional.',
          tags: ['Consulting', 'Transformation', 'Risk', 'Strategy'],
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop'
        }
      ]
    },
    metrics: [
      { value: '700K+', label: 'pessoas impactadas' },
      { value: '30+', label: 'unidades expandidas' },
      { value: 'Global', label: 'Brasil e Europa' },
      { value: 'Impacto', label: 'Megaeventos Globais' }
    ],
    faq: {
      title: 'Perguntas Frequentes',
      label: 'BASE DE CONHECIMENTO',
      items: [
        { q: 'O que a TATO faz exatamente?', a: 'Transformamos processos operacionais complexos em produtos digitais (sistemas, dashboards, automações) que trazem controle e clareza para a gestão.' },
        { q: 'Como funciona o processo de trabalho?', a: 'Começamos com um diagnóstico da operação, desenhamos a solução ideal e depois desenvolvemos e implantamos o produto digital.' },
        { q: 'Quanto tempo leva para desenvolver um sistema?', a: 'Depende da complexidade, mas trabalhamos com ciclos ágeis. Um MVP funcional geralmente é entregue entre 4 a 8 semanas.' },
        { q: 'As soluções são proprietárias?', a: 'Sim, os sistemas são desenvolvidos sob medida para sua necessidade e a propriedade do código/licença é estruturada conforme o modelo de negócio.' }
      ]
    },
    manifesto: {
      title: 'Acreditamos que tecnologia boa começa antes do código.',
      text: 'Antes de uma tela bonita, existe um processo que precisa ser entendido. Antes de um dashboard, existe uma decisão que precisa ser tomada. Antes de um sistema, existe uma operação que precisa funcionar melhor. A TATO Digital existe para criar soluções digitais com intenção, método e clareza.'
    },
    ctaFinal: {
      title: 'Sua operação já sabe onde quer chegar. Talvez ela só precise de um sistema melhor para chegar lá.',
      text: 'Se sua empresa ainda depende de planilhas soltas, controles manuais, informações dispersas ou decisões baseadas em percepção, a TATO Digital pode ajudar.',
      btn1: 'Fale com a TATO',
      btn2: 'Quero estruturar minha operação'
    },
    footer: {
      rights: '© TATO Digital. Todos os direitos reservados.',
      contactText: 'rw.rgioia@gmail.com • NY / SP',
      contactEmail: 'rw.rgioia@gmail.com',
      navTitle: 'Navegação',
      connectTitle: 'Conectar',
      availability: 'Disponibilidade: Q3 2026',
      locations: 'Operação Global • NY / SP',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Serviço',
      strategy: 'Estratégia em sistemas. Dados em decisões.'
    },
    clients: {
      label: 'ECOSSISTEMA',
      title: 'Marcas que confiam na clareza da nossa estratégia.',
      filters: {
        all: 'TODOS',
        events: 'EVENTOS',
        health: 'SAÚDE / CLÍNICAS',
        tech: 'TECNOLOGIA / SERVIÇOS',
        others: 'OUTROS'
      },
      items: [
        { id: 'lolla', number: 1, symbol: 'L', name: 'Lollapalooza', category: 'events', mass: '20.24', logo: 'https://lh3.googleusercontent.com/d/1Z4jF6l9tGvWsvFp6ITWGp0UGFObhDDfy' },
        { id: 'rir', number: 2, symbol: 'RR', name: 'Rock in Rio', category: 'events', mass: '19.85', logo: 'https://lh3.googleusercontent.com/d/1QlNuL7Tydc1_wfkMv_kvSzH8f4HJMdcP' },
        { id: 'rirl', number: 3, symbol: 'RL', name: 'Rock in Rio Lisboa', category: 'events', mass: '20.04', logo: 'https://lh3.googleusercontent.com/d/1WY48AfiHDVFO9uzDUSrjnPUkB_JYxsrL' },
        { id: 'tt', number: 4, symbol: 'TT', name: 'The Town', category: 'events', mass: '20.23', logo: 'https://lh3.googleusercontent.com/d/1d4EYDWEQYzCnB-g5W4WX1i3nLKYYMLN6' },
        { id: 'nb', number: 5, symbol: 'NB', name: 'Natal Brasilidade', category: 'events', mass: '20.22', logo: 'https://lh3.googleusercontent.com/d/1QtS6yQak5s5n5yfU4USIjGPNHYeqcf1r' },
        { id: 'eb', number: 6, symbol: 'EB', name: 'Emagrecentro Barra', category: 'health', mass: '19.86', logo: 'https://lh3.googleusercontent.com/d/1SJRF7n458PAxgZp5bYXA5zDHaQDu7jOZ' },
        { id: 'ec', number: 7, symbol: 'EC', name: 'Emagrecentro Campo G.', category: 'health', mass: '19.86', logo: 'https://lh3.googleusercontent.com/d/1SJRF7n458PAxgZp5bYXA5zDHaQDu7jOZ' },
        { id: 'es', number: 8, symbol: 'ES', name: 'Emagrecentro Santa C.', category: 'health', mass: '19.86', logo: 'https://lh3.googleusercontent.com/d/1SJRF7n458PAxgZp5bYXA5zDHaQDu7jOZ' },
        { id: 'rappi_c', number: 9, symbol: 'R', name: 'Rappi', category: 'tech', mass: '20.15', logo: 'https://lh3.googleusercontent.com/d/17KE22JqlVN2n5wLLwKRKckbLYkHNC5v8' },
        { id: 'joinup', number: 10, symbol: 'JU', name: 'JoinUP', category: 'tech', mass: '20.21', logo: 'https://lh3.googleusercontent.com/d/1y-M8jwEmyrwN1utlO2bCjxfR7D4crkBD' },
        { id: 'bs', number: 11, symbol: 'BS', name: 'Barbearia Samuca', category: 'others', mass: '20.18', logo: 'https://lh3.googleusercontent.com/d/1SdnsHYoVN_5EWYE5QgVEgSGzD6c1V-1O' },
        { id: 'ct', number: 12, symbol: 'CT', name: 'Cervejaria Tropí', category: 'others', mass: '20.19', logo: 'https://lh3.googleusercontent.com/d/1ScJo_Mc41JH1W7oTTWi9FKJ4QZ2uTBkv' }
      ]
    },
    audioToggle: {
      on: "SOM LIGADO",
      off: "SOM DESLIGADO",
      ariaOn: "Desligar música de fundo",
      ariaOff: "Ligar música de fundo"
    },
    sgvcDetail: {
      productLabel: 'SISTEMA DE PRODUTO',
      introShort: 'Gestão financeira com clareza, controle e visão estratégica para clínicas.',
      mainDescription: 'SGVC é uma solução de gestão financeira e operacional desenvolvida para clínicas que precisam de mais clareza, controle e visão estratégica sobre sua operação.\n\nA plataforma integra estruturação de dados, acompanhamento de receitas e despesas, análise de rentabilidade, monitoramento do fluxo de caixa e visualização de indicadores em dashboards claros e acionáveis.\n\nCom o SGVC, a gestão deixa de ser reativa e passa a ser orientada por informação confiável, organização e capacidade real de tomada de decisão.',
      problemsTitle: 'Problemas que resolve',
      problems: [
        'Falta de controle financeiro',
        'Dificuldade em visualizar o lucro real',
        'Desorganização de receitas e despesas',
        'Ausência de indicadores claros de performance',
        'Dificuldade em acompanhar a evolução do negócio'
      ],
      deliverablesTitle: 'Principais entregáveis',
      deliverables: [
        'Planilha estruturada de gestão financeira',
        'Dashboard de visualização de indicadores',
        'Controle completo de receitas e despesas',
        'Acompanhamento de lucro e margem',
        'Visão estratégica do fluxo de caixa'
      ],
      ctaImplantacao: 'IMPLANTAÇÃO',
      ctaMensalidades: 'MENSALIDADES',
      modalImplantacaoTitle: 'Implantação do SGVC',
      modalImplantacaoIntro: 'A implantação do SGVC contempla a estrutura inicial da solução, configuração do ambiente e preparação da base para uso.',
      modalMensalidadesTitle: 'Mensalidades do SGVC',
      modalMensalidadesIntro: 'Escolha o plano mensal mais adequado para a rotina e o porte da sua operação.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      solutions: 'Solutions',
      clients: 'Clients',
      products: 'Products',
      method: 'Method',
      portfolio: 'Portfolio',
      about: 'About',
      contact: 'Contact',
      cta: 'Talk to TATO'
    },
    hero: {
      headline: 'Transforming complex operations into intelligent digital products.',
      subheadline: 'TATO Digital combines strategy, governance, data, automation and tailor-made development to create systems, dashboards and platforms that help companies decide better, operate with more control and scale safely.',
      tags: ['Strategy', 'Data', 'Operations', 'Governance', 'Automation', 'Scale'],
      ctaPrimary: 'Explore solutions',
      ctaSecondary: 'View professional portfolio'
    },
    positioning: [
      'Strategy into systems',
      'Data into decisions',
      'Operations into scale',
      'Complexity into clarity',
      'Governance into performance'
    ],
    transform: {
      label: 'DIGITAL OPERATIONS',
      cardLabel: 'Process Transformation',
      title: 'Business-vision technology. Strategy with real execution.',
      text: "TATO Digital is born from practical experience in high-complexity environments. Before building a solution, we understand the real business flow, bottlenecks, critical decisions, and indicators that need visibility.",
      items: [
        { from: 'Confusing processes', to: 'clear digital flows' },
        { from: 'Scattered data', to: 'actionable dashboards' },
        { from: 'Manual operations', to: 'tailor-made systems' },
        { from: 'Decision by perception', to: 'indicator-driven management' }
      ]
    },
    products: {
      label: 'PRODUCT STRATEGY',
      title: 'Digital solutions for companies that need control, efficiency, and scale.',
      items: [
        {
          id: 'sgvc',
          title: 'SGVC',
          subtitle: 'Sales Management System for Clinics',
          description: 'Financial and operational management solution designed for clinics that need more clarity, control, and strategic vision over their operation.',
          features: ['Structured financial management spreadsheet', 'KPI dashboard', 'Revenue & expense control', 'Profit & margin tracking', 'Strategic cash flow vision']
        },
        {
          id: 'clinicash',
          title: 'CliniCa$h',
          subtitle: 'Simple & intelligent financial management',
          description: 'Simple and intelligent financial management for clinics that need to see expenses, revenues, cash flow, margin, and profit projections.',
          features: ['Expense control', 'Cash flow', 'Profit projection', 'Financial performance', 'Partner & manager view']
        },
        {
          id: 'emagresalus',
          title: 'EmagreSalus',
          subtitle: 'SaaS platform for multi-unit networks',
          description: 'SaaS platform for multi-unit clinic networks, focusing on the patient journey, tracking, gamification, and loyalty.',
          features: ['Nutritional management', 'Patient tracking', 'Gamification', 'Loyalty programs', 'View by unit']
        },
        {
          id: 'clinicos',
          title: 'ClinicOS',
          subtitle: 'Healthcare operating system',
          description: 'Complete operating system for modern clinics, integrating scheduling, stock, team, rooms, equipment, permissions, and dashboards.',
          features: ['Smart scheduling', 'Inventory & stock', 'Services & packages', 'RBAC & access control', 'Operational dashboard']
        }
      ]
    },
    solutions: {
      label: 'CUSTOM SYSTEMS',
      cardLabel: 'CUSTOM SYSTEM',
      title: 'Systems designed for the real way your company operates.',
      text: 'Not every business needs an off-the-shelf solution. Often, the biggest gain lies in transforming a specific internal process into a simple, efficient, and scalable digital product.',
      items: [
        {
          id: 'SOL-01',
          title: 'Internal Systems',
          description: 'We create tailor-made internal systems to organize flows, centralize information and give more control to the operation.',
          keywords: ['Workflow', 'Centralization', 'Control', 'Scalability']
        },
        {
          id: 'SOL-02',
          title: 'Backoffices',
          description: 'We structure digital backoffices that reduce rework, increase visibility and improve day-to-day execution.',
          keywords: ['Operation', 'Efficiency', 'Structure', 'Processes']
        },
        {
          id: 'SOL-03',
          title: 'Executive Dashboards',
          description: 'We transform scattered data into clear, visual and actionable dashboards to support decisions with more security.',
          keywords: ['KPIs', 'Analytics', 'Visibility', 'Decision']
        },
        {
          id: 'SOL-04',
          title: 'SaaS Platforms',
          description: 'We develop digital platforms with product logic, focus on usability and structure prepared for growth.',
          keywords: ['SaaS', 'Product', 'Scale', 'Experience']
        },
        {
          id: 'SOL-05',
          title: 'AI Automations',
          description: 'We automate routines and interactions with artificial intelligence to gain speed, consistency and efficiency.',
          keywords: ['AI', 'Automation', 'Productivity', 'Intelligence']
        },
        {
          id: 'SOL-06',
          title: 'Operational Portals',
          description: 'We create portals that organize processes, users and critical flows in a simple and functional experience.',
          keywords: ['Portal', 'Operation', 'Organization', 'Management']
        },
        {
          id: 'SOL-07',
          title: 'Financial Control Models',
          description: 'We design digital structures to track revenues, expenses, margins and financial indicators with clarity.',
          keywords: ['Financial', 'Margin', 'Control', 'Performance']
        },
        {
          id: 'SOL-08',
          title: 'Performance Tools',
          description: 'We build tools that help leaders monitor goals, indicators and operational evolution in real-time.',
          keywords: ['Performance', 'Indicators', 'Goal', 'Management']
        },
        {
          id: 'SOL-09',
          title: 'MVPs for New Products',
          description: 'We develop MVPs with a focus on rapid validation, strategic clarity and learning-oriented evolution.',
          keywords: ['MVP', 'Validation', 'Product', 'Agility']
        },
        {
          id: 'SOL-10',
          title: 'Digital Process Structuring',
          description: 'We transform manual and diffuse processes into clearer, more scalable and measurable digital flows.',
          keywords: ['Processes', 'Digitization', 'Clarity', 'Scale']
        }
      ]
    },
    method: {
      label: 'TATO METHOD',
      title: 'From diagnosis to digital product.',
      steps: [
        { title: 'Business Understanding', text: 'We map operation, critical flows, bottlenecks, responsibilities, and key decisions.' },
        { title: 'Solution Design', text: 'We transform needs into functional architecture: modules, screens, permissions, data, and KPIs.' },
        { title: 'Data Structuring', text: 'We organize bases, information sources, calculation rules, and tracking models.' },
        { title: 'Development', text: 'We create tailormade dashboards, systems, automations, or platforms.' },
        { title: 'Implementation', text: 'We support adoption, adjust flows, and document processes.' },
        { title: 'Continuous Evolution', text: 'We follow up on improvements, new needs, and product evolution.' }
      ]
    },
    renato: {
      label: 'PROFESSIONAL HUB',
      title: 'BEHIND TATO: STRATEGY, DATA AND EXECUTION FOR COMPLEX OPERATIONS.',
      bio: [
        '**Project Manager** and **PMO** focused on **governance**, **performance tracking**, and **strategic coordination** for **Rock in Rio**, **The Town**, and **Rock in Rio Lisboa**. During execution, operates directly to ensure field delivery.',
        '**Operational leadership** in **Food & Beverage** zones (**The Town 2023**, **Rock in Rio Lisboa 2024**) managing vendor coordination, workforce management, troubleshooting, and operational readiness.',
        'Designed and implemented the full **intake** process for partner activations (concept approvals, legal/technical documentation, **HSSE**, sustainability) supporting activations at **Lollapalooza 2024**, **Rock in Rio 2024**, and **The Town 2025**.'
      ],
      competences: [
        'Project Management & PMO', 'Business Performance', 'Data-driven Decision Making', 'Governance Frameworks',
        'Operational Excellence', 'Product-oriented Execution', 'AI & Automation', 'Stakeholder Management'
      ],
      roles: [
        { title: 'Founder', sub: 'TATO DIGITAL' },
        { title: 'PMO', sub: 'Executive Lead' }
      ],
      vision: 'THE STRATEGIC VISION BEHIND TATO DIGITAL.',
      specialties: 'Specialties'
    },
    portfolio: {
      label: 'TRANSFORMATION STORIES',
      title: 'Where strategy meets execution.',
      cursorDetails: 'DETAILS',
      cursorGoal: 'GOAL',
      modalLabel: 'DETAILED OPERATIONS',
      cases: [
        {
          id: 'rockworld',
          client: 'Rock World',
          title: 'Rock in Rio, The Town, Lollapalooza',
          description: 'PMO, performance, multi-functional alignment, executive reporting, and field operation.',
          tags: ['PMO', 'Megaevents', 'Governance', 'Operations'],
          image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1600&auto=format&fit=crop'
        },
        {
          id: 'rappi',
          client: 'Rappi',
          title: 'Expansion and operational scalability.',
          description: 'Led the expansion of 30+ dark stores using data analysis for rollout and supply chain management.',
          tags: ['Expansion', 'Data', 'Operations', 'Rollout'],
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop'
        },
        {
          id: 'rededor',
          client: "Rede D'Or São Luiz",
          title: 'Critical healthcare projects.',
          description: 'Management of strategic hospital projects, system implementation, and clinical-tech coordination.',
          tags: ['Healthcare', 'Systems', 'Performance', 'Governance'],
          image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop'
        },
        {
          id: 'accenture',
          client: 'Accenture',
          title: 'Consulting and governance.',
          description: 'Integrated planning of complex projects, business-ops-IT alignment, and operational transformation.',
          tags: ['Consulting', 'Transformation', 'Risk', 'Strategy'],
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop'
        }
      ]
    },
    metrics: [
      { value: '700K+', label: 'people impacted' },
      { value: '30+', label: 'units expanded' },
      { value: 'Global', label: 'Brazil and Europe' },
      { value: 'Impact', label: 'Global Megaevents' }
    ],
    faq: {
      title: 'Frequently Asked Questions',
      label: 'KNOWLEDGE BASE',
      items: [
        { q: 'What does TATO specifically do?', a: 'We transform complex operational processes into digital products (systems, dashboards, automations) that bring control and clarity to management.' },
        { q: 'How does the workflow work?', a: 'We start with an operation diagnostics, design the ideal solution, and then develop and implement the digital product.' },
        { q: 'How long does it take to develop a system?', a: 'It depends on the complexity, but we work with agile cycles. A functional MVP is usually delivered within 4 to 8 weeks.' },
        { q: 'Are the solutions proprietary?', a: 'Yes, systems are tailor-made for your needs and code ownership/license is structured according to the business model.' }
      ]
    },
    manifesto: {
      title: 'We believe good technology starts before the code.',
      text: 'Before a beautiful screen, there is a process that needs to be understood. Before a dashboard, there is a decision that needs to be taken. Before a system, there is an operation that needs to work better. TATO Digital exists to create digital solutions with intention, method, and clarity.'
    },
    ctaFinal: {
      title: 'Your operation already knows where it wants to go. It might just need a better system to get there.',
      text: 'If your company still depends on loose spreadsheets, manual controls, scattered info or perception-based decisions, TATO Digital can help.',
      btn1: 'Talk to TATO',
      btn2: 'I want to structure my operation'
    },
    footer: {
      rights: '© TATO Digital. All rights reserved.',
      contactText: 'rw.rgioia@gmail.com • NY / SP',
      contactEmail: 'rw.rgioia@gmail.com',
      navTitle: 'Navigation',
      connectTitle: 'Connect',
      availability: 'Availability: Q3 2026',
      locations: 'Global Presence • NY / SP',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      strategy: 'Strategy into systems. Data into decisions.'
    },
    clients: {
      label: 'ECOSYSTEM',
      title: 'Brands that trust our strategy clarity.',
      filters: {
        all: 'ALL',
        events: 'EVENTS',
        health: 'HEALTH / CLINICS',
        tech: 'TECH / SERVICES',
        others: 'OTHERS'
      },
      items: [
        { id: 'lolla', number: 1, symbol: 'L', name: 'Lollapalooza', category: 'events', mass: '20.24', logo: 'https://lh3.googleusercontent.com/d/1Z4jF6l9tGvWsvFp6ITWGp0UGFObhDDfy' },
        { id: 'rir', number: 2, symbol: 'RR', name: 'Rock in Rio', category: 'events', mass: '19.85', logo: 'https://lh3.googleusercontent.com/d/1QlNuL7Tydc1_wfkMv_kvSzH8f4HJMdcP' },
        { id: 'rirl', number: 3, symbol: 'RL', name: 'Rock in Rio Lisboa', category: 'events', mass: '20.04', logo: 'https://lh3.googleusercontent.com/d/1WY48AfiHDVFO9uzDUSrjnPUkB_JYxsrL' },
        { id: 'tt', number: 4, symbol: 'TT', name: 'The Town', category: 'events', mass: '20.23', logo: 'https://lh3.googleusercontent.com/d/1d4EYDWEQYzCnB-g5W4WX1i3nLKYYMLN6' },
        { id: 'nb', number: 5, symbol: 'NB', name: 'Natal Brasilidade', category: 'events', mass: '20.22', logo: 'https://lh3.googleusercontent.com/d/1QtS6yQak5s5n5yfU4USIjGPNHYeqcf1r' },
        { id: 'eb', number: 6, symbol: 'EB', name: 'Emagrecentro Barra', category: 'health', mass: '19.86', logo: 'https://lh3.googleusercontent.com/d/1SJRF7n458PAxgZp5bYXA5zDHaQDu7jOZ' },
        { id: 'ec', number: 7, symbol: 'EC', name: 'Emagrecentro Campo G.', category: 'health', mass: '19.86', logo: 'https://lh3.googleusercontent.com/d/1SJRF7n458PAxgZp5bYXA5zDHaQDu7jOZ' },
        { id: 'es', number: 8, symbol: 'ES', name: 'Emagrecentro Santa C.', category: 'health', mass: '19.86', logo: 'https://lh3.googleusercontent.com/d/1SJRF7n458PAxgZp5bYXA5zDHaQDu7jOZ' },
        { id: 'rappi_c', number: 9, symbol: 'R', name: 'Rappi', category: 'tech', mass: '20.15', logo: 'https://lh3.googleusercontent.com/d/17KE22JqlVN2n5wLLwKRKckbLYkHNC5v8' },
        { id: 'joinup', number: 10, symbol: 'JU', name: 'JoinUP', category: 'tech', mass: '20.21', logo: 'https://lh3.googleusercontent.com/d/1y-M8jwEmyrwN1utlO2bCjxfR7D4crkBD' },
        { id: 'bs', number: 11, symbol: 'BS', name: 'Barbearia Samuca', category: 'others', mass: '20.18', logo: 'https://lh3.googleusercontent.com/d/1SdnsHYoVN_5EWYE5QgVEgSGzD6c1V-1O' },
        { id: 'ct', number: 12, symbol: 'CT', name: 'Cervejaria Tropí', category: 'others', mass: '20.19', logo: 'https://lh3.googleusercontent.com/d/1ScJo_Mc41JH1W7oTTWi9FKJ4QZ2uTBkv' }
      ]
    },
    audioToggle: {
      on: "SOUND ON",
      off: "SOUND OFF",
      ariaOn: "Turn background music off",
      ariaOff: "Turn background music on"
    },
    sgvcDetail: {
      productLabel: 'PRODUCT SYSTEM',
      introShort: 'Financial management with clarity, control, and strategic vision for clinics.',
      mainDescription: 'SGVC is a financial and operational management solution designed for clinics that need more clarity, control, and strategic vision over their operation.\n\nThe platform integrates data structuring, revenue and expense tracking, profitability analysis, cash flow monitoring, and indicator visualization in clear and actionable dashboards.\n\nWith SGVC, management shifts from reactive to information-driven, with reliable organization and real decision-making capacity.',
      problemsTitle: 'Problems it solves',
      problems: [
        'Lack of financial control',
        'Difficulty visualizing real profit',
        'Disorganized revenue and expenses',
        'Absence of clear performance indicators',
        'Difficulty tracking business evolution'
      ],
      deliverablesTitle: 'Key deliverables',
      deliverables: [
        'Structured financial management spreadsheet',
        'KPI visualization dashboard',
        'Complete revenue and expense control',
        'Profit and margin tracking',
        'Strategic cash flow vision'
      ],
      ctaImplantacao: 'SETUP',
      ctaMensalidades: 'PLANS',
      modalImplantacaoTitle: 'SGVC Setup',
      modalImplantacaoIntro: 'The SGVC setup includes the initial solution structure, environment configuration, and base preparation for use.',
      modalMensalidadesTitle: 'SGVC Plans',
      modalMensalidadesIntro: 'Choose the monthly plan that best fits your routine and the size of your operation.'
    }
  }
};
