export const SITE_TITLE = 'The Architecture Reference';
export const SITE_DESC =
  'A visual reference for software architecture — ten tracks from architecture foundations and styles to domain-driven design, microservices, event-driven and distributed systems, APIs, cloud & SaaS, process automation and the architect’s career, with diagrams, trade-offs, quizzes and progress tracking. Distilled from 20+ landmark architecture books.';

export interface CategoryMeta {
  key: string;
  title: string;
  blurb: string;
}

/** Foundations — the journey on /foundations/. */
export const FOUNDATIONS_CATEGORIES: CategoryMeta[] = [
  {
    key: 'fnd-thinking',
    title: 'Thinking Like an Architect',
    blurb:
      'What architecture really is — the difference between architecture and design, the architect’s expectations and soft skills, and why every decision is a trade-off.',
  },
  {
    key: 'fnd-characteristics',
    title: 'Architecture Characteristics',
    blurb:
      'The “-ilities” that shape a system — identifying, prioritizing and measuring the architecture characteristics (availability, scalability, performance…) that drive every structural choice.',
  },
  {
    key: 'fnd-components',
    title: 'Components & Modularity',
    blurb:
      'Carving a system into parts — components and coupling, connascence and modularity metrics, and identifying component boundaries.',
  },
  {
    key: 'fnd-evolution',
    title: 'Evolutionary Architecture',
    blurb:
      'Architecture that changes safely — fitness functions, incremental change, and guarding the important characteristics as the system evolves.',
  },
];

/** Architecture Styles — the journey on /styles/. */
export const STYLES_CATEGORIES: CategoryMeta[] = [
  {
    key: 'sty-fundamentals',
    title: 'Style Fundamentals',
    blurb:
      'How to read an architecture style — the partitioning dimension, the difference between styles and patterns, and the characteristics scorecard used to compare them.',
  },
  {
    key: 'sty-monolithic',
    title: 'Monolithic Styles',
    blurb:
      'One deployable unit — layered, pipeline, and microkernel architectures: their topology, strengths, and where they break down.',
  },
  {
    key: 'sty-distributed',
    title: 'Distributed Styles',
    blurb:
      'Many deployable units — service-based, event-driven, space-based, and microservices architectures, and the fallacies you inherit by going distributed.',
  },
  {
    key: 'sty-choosing',
    title: 'Choosing a Style',
    blurb:
      'Matching style to forces — how to weigh characteristics, team topology and domain to pick (and defend) an architecture style.',
  },
];

/** Domain-Driven Design — the journey on /ddd/. */
export const DDD_CATEGORIES: CategoryMeta[] = [
  {
    key: 'ddd-strategic',
    title: 'Strategic Design',
    blurb:
      'Modeling the problem space — ubiquitous language, bounded contexts, subdomains, and context maps that describe how teams and models relate.',
  },
  {
    key: 'ddd-tactical',
    title: 'Tactical Design',
    blurb:
      'Modeling the solution — value objects, entities, aggregates, domain events, and the architectural patterns (event sourcing, CQRS) that implement them.',
  },
  {
    key: 'ddd-application',
    title: 'Applying DDD',
    blurb:
      'Making it real — distilling the core domain, choosing the right modeling heuristic, EventStorming, and evolving a design as the business changes.',
  },
];

/** Microservices — the journey on /microservices/. */
export const MICROSERVICES_CATEGORIES: CategoryMeta[] = [
  {
    key: 'ms-foundations',
    title: 'Foundations',
    blurb:
      'What microservices are and aren’t — independent deployability, information hiding, the benefits and the very real costs, and when not to reach for them.',
  },
  {
    key: 'ms-decomposition',
    title: 'Decomposition & Migration',
    blurb:
      'Finding the seams — modeling service boundaries around business domains, and incrementally strangling a monolith into services without a big-bang rewrite.',
  },
  {
    key: 'ms-communication',
    title: 'Communication & Workflow',
    blurb:
      'How services talk — sync vs async styles, choreography vs orchestration, sagas for distributed workflow, and handling data across boundaries.',
  },
  {
    key: 'ms-operations',
    title: 'Building & Operating',
    blurb:
      'Running them in production — deployment and progressive delivery, testing strategies and contract tests, observability, and resilience at scale.',
  },
  {
    key: 'ms-organization',
    title: 'People & Organization',
    blurb:
      'The sociotechnical side — Conway’s Law and team topologies, ownership models, and the platform and culture that let microservices succeed.',
  },
];

/** Event-Driven — the journey on /event-driven/. */
export const EVENT_DRIVEN_CATEGORIES: CategoryMeta[] = [
  {
    key: 'ed-foundations',
    title: 'Foundations',
    blurb:
      'Thinking in events — events vs commands vs messages, event-first design, loose coupling, and the trade-offs of asynchrony.',
  },
  {
    key: 'ed-patterns',
    title: 'Events, Streams & Patterns',
    blurb:
      'The building blocks — event notification vs event-carried state transfer, event sourcing, streams and logs, and processing topologies.',
  },
  {
    key: 'ed-datamesh',
    title: 'Data in Motion & Data Mesh',
    blurb:
      'Events as the integration fabric — streaming data platforms, the data mesh’s four principles, data products, and the coming “world wide flow”.',
  },
];

/** Distributed Systems — the journey on /distributed-systems/. */
export const DISTRIBUTED_SYSTEMS_CATEGORIES: CategoryMeta[] = [
  {
    key: 'ds-foundations',
    title: 'Foundations',
    blurb:
      'The hard truths — the fallacies of distributed computing, communication models, consistency and CAP, time and ordering, and consensus.',
  },
  {
    key: 'ds-scalability',
    title: 'Scalability & Data',
    blurb:
      'Scaling out — load balancing and statelessness, caching, distributed databases, replication and partitioning, and asynchronous messaging at scale.',
  },
  {
    key: 'ds-patterns',
    title: 'System Patterns',
    blurb:
      'Reusable building blocks — single-node patterns (sidecar, ambassador, adapter), serving patterns (replication, sharding, scatter-gather), and batch patterns.',
  },
];

/** APIs & Communication — the journey on /apis/. */
export const APIS_CATEGORIES: CategoryMeta[] = [
  {
    key: 'api-design',
    title: 'API Design & Styles',
    blurb:
      'Designing the contract — REST, RPC/gRPC and GraphQL, resource modeling, versioning, and what makes an API a good product.',
  },
  {
    key: 'api-rest',
    title: 'REST & Web APIs',
    blurb:
      'The web done right — Richardson maturity, hypermedia and HATEOAS, idempotency, caching, pagination, and practical REST cookbook recipes.',
  },
  {
    key: 'api-management',
    title: 'Management, Security & Evolution',
    blurb:
      'Operating an API platform — gateways and service mesh, authentication (OAuth2/OIDC), rate limiting, threat modeling, and evolving without breaking clients.',
  },
  {
    key: 'api-messaging',
    title: 'Messaging & Async Communication',
    blurb:
      'Beyond request/response — messaging styles and patterns, choreography, idempotent consumers, and choosing the right interaction pattern.',
  },
];

/** Cloud & SaaS — the journey on /cloud/. */
export const CLOUD_CATEGORIES: CategoryMeta[] = [
  {
    key: 'cld-serverless',
    title: 'Serverless',
    blurb:
      'Architecting on managed services — functions and events, serverless-first design, the well-architected lens, testing, observability and cost.',
  },
  {
    key: 'cld-saas',
    title: 'Multi-Tenant SaaS',
    blurb:
      'Building software as a product — tenant isolation models, the control plane vs application plane, onboarding, tiering, metering and noisy neighbors.',
  },
];

/** Process Automation — the journey on /automation/. */
export const AUTOMATION_CATEGORIES: CategoryMeta[] = [
  {
    key: 'auto-foundations',
    title: 'Foundations',
    blurb:
      'Why long-running processes are hard — state, time and failure across services, and where orchestration beats hand-rolled glue.',
  },
  {
    key: 'auto-modeling',
    title: 'Modeling & Orchestration',
    blurb:
      'Making processes explicit — BPMN and executable workflow models, orchestration vs choreography, and workflow engines.',
  },
  {
    key: 'auto-operating',
    title: 'Building & Operating',
    blurb:
      'Production automation — integrating with services, handling failures and compensation, visibility into running processes, and organizational adoption.',
  },
];

/** The Architect's Path — the journey on /strategy/. */
export const STRATEGY_CATEGORIES: CategoryMeta[] = [
  {
    key: 'path-elevator',
    title: 'The Architect Elevator',
    blurb:
      'Connecting the penthouse to the engine room — the architect’s role, riding the elevator between business and tech, and architecting for change.',
  },
  {
    key: 'path-strategy',
    title: 'Technology Strategy',
    blurb:
      'Thinking like a strategist — patterns for analyzing, creating and communicating technology strategy that the whole organization can act on.',
  },
  {
    key: 'path-systems-thinking',
    title: 'Systems Thinking',
    blurb:
      'Seeing the whole — stocks, flows and feedback loops, emergence, leverage points, and reasoning about complex sociotechnical systems.',
  },
];

export const REPO_URL = 'https://github.com/ehabterra/architecture-reference';
