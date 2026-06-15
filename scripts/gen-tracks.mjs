// One-off generator: emits each track's landing (index.astro) + route
// ([...slug].astro). Run from project root: `node scripts/gen-tracks.mjs`.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const tracks = [
  {
    dir: 'foundations', coll: 'foundations', constName: 'FOUNDATIONS_CATEGORIES',
    section: 'Foundations', eyebrow: 'The ground floor',
    h1: 'Software Architecture Foundations',
    pageTitle: 'Software Architecture Foundations',
    desc: "What software architecture actually is — thinking like an architect, the architecture characteristics (the “-ilities”) that drive every decision, components and modularity, and building architecture that can evolve. Distilled from Fundamentals of Software Architecture, Head First Software Architecture, The Hard Parts and Building Evolutionary Architectures.",
    lede: 'Architecture is the set of decisions that are <strong>hard to change</strong> later. This track builds the mindset: how architecture differs from design, the <strong>architecture characteristics</strong> you must identify and prioritize, how to carve a system into <strong>components</strong>, and how to keep it <strong>evolvable</strong> with fitness functions.',
    go: { title: '🏛️ There are no best practices — only trade-offs', body: 'Every architectural decision buys you one quality at the cost of another. The job is not to find the “right” architecture but to understand the forces, make the trade-offs explicit, and record <em>why</em>. Start by naming the characteristics that matter most for <em>this</em> system — everything else follows from them.' },
  },
  {
    dir: 'styles', coll: 'styles', constName: 'STYLES_CATEGORIES',
    section: 'Architecture Styles', eyebrow: 'Topologies',
    h1: 'Architecture Styles',
    pageTitle: 'Architecture Styles',
    desc: 'The named shapes a system can take — layered, pipeline, microkernel, service-based, event-driven, space-based and microservices — each with its topology, its strengths, and the characteristics it optimizes for. Based on Software Architecture Patterns and Fundamentals of Software Architecture.',
    lede: 'A style is the overall <strong>topology</strong> of a system — how its parts are partitioned and deployed. This track walks the major styles from the simple <strong>monolithic</strong> shapes to the <strong>distributed</strong> ones, scoring each against the architecture characteristics so you can choose with eyes open.',
    go: { title: '🧭 Pick the style that fits the forces, not the fashion', body: 'Every style is strong at some characteristics and weak at others. A modular monolith is simpler and cheaper; microservices buy independent deployability and scale at a steep operational price. Match the style to your real drivers — team size, scale, change cadence — and resist distributing by default.' },
  },
  {
    dir: 'ddd', coll: 'ddd', constName: 'DDD_CATEGORIES',
    section: 'Domain-Driven Design', eyebrow: 'Modeling the domain',
    h1: 'Domain-Driven Design',
    pageTitle: 'Domain-Driven Design',
    desc: 'Modeling software around the business — strategic design (ubiquitous language, bounded contexts, subdomains, context maps) and tactical design (value objects, entities, aggregates, domain events, event sourcing and CQRS). Based on Learning Domain-Driven Design.',
    lede: 'Most bugs are <strong>translation errors</strong> between how the business talks and how the code is written. DDD closes that gap: a <strong>ubiquitous language</strong> inside explicit <strong>bounded contexts</strong>, and tactical building blocks — <strong>aggregates</strong>, <strong>value objects</strong>, <strong>domain events</strong> — that put the business rules in the model.',
    go: { title: '🗺️ Spend your modeling effort on the core domain', body: 'Not every part of a system deserves deep modeling. Find the <em>core domain</em> — the part that gives competitive advantage — and lavish DDD’s tactical patterns there. For generic and supporting subdomains, buy or build something simple. The art of DDD is knowing where the complexity is worth it.' },
  },
  {
    dir: 'microservices', coll: 'microservices', constName: 'MICROSERVICES_CATEGORIES',
    section: 'Microservices', eyebrow: 'Independent services',
    h1: 'Microservices',
    pageTitle: 'Microservices',
    desc: 'Services modeled around business domains and independently deployable — foundations and trade-offs, decomposing a monolith, communication and distributed workflow with sagas, building and operating at scale, and the team topologies that make it work. Based on Building Microservices, Monolith to Microservices and Enabling Microservice Success.',
    lede: 'Microservices are services <strong>independently deployable</strong> and modeled around a business domain. They buy autonomy and scale — at a real cost in operational and cognitive complexity. This track covers when they pay off, how to <strong>decompose</strong> a monolith safely, how services <strong>communicate</strong>, and how teams own them.',
    go: { title: '🔪 Migrate incrementally — never big-bang rewrite', body: 'The reliable path to microservices is to keep the monolith running and peel services off one at a time, behind patterns like the strangler fig, branch-by-abstraction and parallel run. Each step delivers value and is reversible. A big-bang rewrite trades a working system for months of risk.' },
  },
  {
    dir: 'event-driven', coll: 'event-driven', constName: 'EVENT_DRIVEN_CATEGORIES',
    section: 'Event-Driven', eyebrow: 'Thinking in events',
    h1: 'Event-Driven Architecture',
    pageTitle: 'Event-Driven Architecture',
    desc: 'Systems that react to events rather than commands — event-first design, notification vs event-carried state transfer, event sourcing, streams and logs, and events as the integration fabric for a data mesh and “data in motion”. Based on Building Event-Driven Microservices, Building an Event-Driven Data Mesh and Flow Architectures.',
    lede: 'In an event-driven system, components announce <strong>facts</strong> (“order placed”) instead of issuing commands, and others react. That loose coupling enables autonomy and real-time flow — at the cost of harder reasoning about consistency and order. This track covers events, streams, <strong>event sourcing</strong>, and the <strong>data mesh</strong>.',
    go: { title: '⚡ Events decouple in time, space, and team', body: 'A producer that emits an event doesn’t know or care who consumes it — consumers come and go without touching the producer. That is event-driven architecture’s superpower and its trap: the same decoupling that buys autonomy makes end-to-end flows invisible. Invest early in schemas and observability.' },
  },
  {
    dir: 'distributed-systems', coll: 'distributed-systems', constName: 'DISTRIBUTED_SYSTEMS_CATEGORIES',
    section: 'Distributed Systems', eyebrow: 'Many machines, one system',
    h1: 'Distributed Systems',
    pageTitle: 'Distributed Systems',
    desc: 'The realities of building across many machines — the fallacies of distributed computing, consistency and CAP, scaling with load balancing, caching, replication and partitioning, and reusable distributed system patterns. Based on Foundations of Scalable Systems and Designing Distributed Systems.',
    lede: 'A distributed system is one where a machine you didn’t know existed can break yours. This track covers the <strong>fallacies</strong> you inherit the moment you cross a network, the fundamentals of <strong>consistency</strong> and <strong>scale</strong>, and the reusable <strong>patterns</strong> — sidecar, sharding, scatter-gather — that tame them.',
    go: { title: '🌐 The network is not reliable — design for partial failure', body: 'The eight fallacies of distributed computing all reduce to one: the network will fail in ways a single process never does. Latency is nonzero, messages get lost and duplicated, and parts of the system go dark while others stay up. Idempotency, timeouts, retries and backpressure aren’t extras — they’re the baseline.' },
  },
  {
    dir: 'apis', coll: 'apis', constName: 'APIS_CATEGORIES',
    section: 'APIs & Communication', eyebrow: 'The contract',
    h1: 'APIs & Communication',
    pageTitle: 'APIs & Communication',
    desc: 'Designing the contracts between systems — REST, RPC/gRPC and GraphQL, hypermedia and the Richardson maturity model, gateways and security, evolution without breaking clients, and asynchronous messaging patterns. Based on Mastering API Architecture, the RESTful Web API Patterns & Practices Cookbook and Communication Patterns.',
    lede: 'An API is a <strong>product</strong> with users — and its contract outlives every implementation behind it. This track covers how to <strong>design</strong> APIs (REST, gRPC, GraphQL), make REST robust with hypermedia and idempotency, <strong>secure and manage</strong> them at the edge, and evolve them without breaking the clients you can’t see.',
    go: { title: '🔌 Design the contract for change you can’t coordinate', body: 'You rarely control every client of an API, so you can’t change it in lockstep. Treat the contract as the hard part: model resources and messages carefully, add fields rather than repurpose them, version deliberately, and prefer additive, tolerant readers. The implementation is replaceable; the contract is forever.' },
  },
  {
    dir: 'cloud', coll: 'cloud', constName: 'CLOUD_CATEGORIES',
    section: 'Cloud & SaaS', eyebrow: 'Software as a product',
    h1: 'Cloud & SaaS Architecture',
    pageTitle: 'Cloud & SaaS Architecture',
    desc: 'Architecting on the cloud and selling software as a service — serverless-first design with functions and events, the well-architected lens, and multi-tenant SaaS: tenant isolation, the control plane, onboarding, tiering and metering. Based on Serverless Development on AWS and Building Multi-Tenant SaaS Architectures.',
    lede: 'The cloud changes the unit of architecture from servers to <strong>managed services and events</strong>, and SaaS changes the unit of value to a <strong>multi-tenant product</strong>. This track covers <strong>serverless-first</strong> design and the discipline of <strong>multi-tenancy</strong> — isolation, control planes, onboarding, tiering and metering.',
    go: { title: '☁️ In SaaS, the tenant is the architecture', body: 'Multi-tenancy isn’t a feature you add later — it shapes data, identity, deployment, billing and operations from day one. Decide your isolation model (silo, pool, or bridge) per tier, separate the control plane from the application plane, and make every request tenant-aware. Retrofitting tenancy is one of the hardest migrations there is.' },
  },
  {
    dir: 'automation', coll: 'automation', constName: 'AUTOMATION_CATEGORIES',
    section: 'Process Automation', eyebrow: 'Long-running processes',
    h1: 'Process Automation',
    pageTitle: 'Process Automation',
    desc: 'Coordinating long-running business processes across services — why state, time and failure make them hard, modeling processes with BPMN and executable workflows, orchestration vs choreography, and building and operating workflow engines. Based on Practical Process Automation.',
    lede: 'Real business processes span services and <strong>run for seconds, days, or weeks</strong> — and anything can fail in the middle. This track covers why long-running processes are hard, how to make them <strong>explicit</strong> with BPMN and workflow engines, when to <strong>orchestrate</strong> vs choreograph, and how to operate them with full visibility.',
    go: { title: '⚙️ Make the process explicit, or it hides in the gaps', body: 'When a long-running process is implicit — scattered across event handlers and retries — no one can see its state or fix it when it stalls. An executable workflow model turns that invisible flow into a first-class, observable, recoverable artifact. Orchestrate the steps you need to reason about; choreograph the rest.' },
  },
  {
    dir: 'strategy', coll: 'strategy', constName: 'STRATEGY_CATEGORIES',
    section: "The Architect's Path", eyebrow: 'The craft & the career',
    h1: "The Architect's Path",
    pageTitle: "The Architect's Path",
    desc: "The architect as a person and strategist — riding the “architect elevator” between the boardroom and the engine room, patterns for analyzing, creating and communicating technology strategy, and systems thinking for complex sociotechnical systems. Based on The Software Architect Elevator, Technology Strategy Patterns and Learning Systems Thinking.",
    lede: 'Great architecture is as much about <strong>people and decisions</strong> as boxes and lines. This track is about the architect’s craft: riding the <strong>elevator</strong> between business and tech, building and communicating <strong>technology strategy</strong>, and using <strong>systems thinking</strong> to reason about feedback loops and leverage in complex organizations.',
    go: { title: '🛗 An architect connects the penthouse to the engine room', body: 'The unique value of an architect isn’t living on one floor — it’s riding the elevator: translating business strategy into technical decisions and surfacing technical realities into business choices. The higher the building (the bigger the org), the more valuable that ride, and the more tempting it is to get stuck on one floor.' },
  },
];

const landing = (t) => `---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import CategorySection from '../../components/CategorySection.astro';
import SkillTree from '../../components/SkillTree.astro';
import { ${t.constName} } from '../../lib/consts';

const topics = await getCollection('${t.coll}');
const sorted = [...topics].sort((a, b) => a.data.order - b.data.order);
const first = sorted[0];
const slugs = topics.filter((t) => t.data.kind !== 'pattern').map((t) => t.id).join(',');
---
<BaseLayout title="${t.pageTitle}" description=${JSON.stringify(t.desc)}>
  <nav class="dp-breadcrumb dp-kicker"><a href="/">The Architecture Reference</a> › <span>${t.section}</span></nav>

  <header class="dp-hero">
    <p class="dp-hero__eyebrow">${t.eyebrow}</p>
    <h1>${t.h1}</h1>
    <p class="dp-hero__lede">
      ${t.lede}
    </p>
    {first && (
      <div class="dp-hero__cta">
        <a class="dp-btn dp-btn--primary" href={\`/${t.dir}/\${first.id}/\`} data-i18n="ui.startJourney">Start the journey →</a>
      </div>
    )}
  </header>

  <div class="dp-overall">
    <div class="dp-overall__top">
      <strong>Your ${t.section.toLowerCase()} progress</strong>
      <button class="dp-btn dp-btn--ghost dp-btn--sm" data-dp-reset data-i18n="ui.reset">Reset</button>
    </div>
    <div class="dp-progress" data-dp-progress data-slugs={slugs}>
      <div class="dp-progress__track"><div class="dp-progress__fill"></div></div>
      <span class="dp-progress__label"></span>
    </div>
    <p class="dp-kicker" style="margin:.7rem 0 0;">Mark a topic “learned” on its page and watch the bars fill.</p>
  </div>

  <SkillTree entries={topics} categories={${t.constName}} base="/${t.dir}" />

  {${t.constName}.map((c) => (
    <CategorySection cat={c.key} title={c.title} blurb={c.blurb} collection="${t.coll}" base="/${t.dir}" />
  ))}

  <div class="dp-callout dp-callout--go" style="margin-top:2.6rem;">
    <p class="dp-callout__title">${t.go.title}</p>
    <p>${t.go.body}</p>
  </div>
</BaseLayout>
`;

const route = (t) => `---
import { getCollection, render } from 'astro:content';
import PageLayout from '../../layouts/PageLayout.astro';

export async function getStaticPaths() {
  const items = await getCollection('${t.coll}');
  return items.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---
<PageLayout
  entry={entry}
  collection="${t.coll}"
  base="/${t.dir}"
  sectionTitle="${t.section}"
  sectionHref="/${t.dir}/"
  relatedHeading="Related topics"
  topicLabel="${t.section}"
>
  <Content />
</PageLayout>
`;

for (const t of tracks) {
  const d = join(root, 'src', 'pages', t.dir);
  mkdirSync(d, { recursive: true });
  writeFileSync(join(d, 'index.astro'), landing(t));
  writeFileSync(join(d, '[...slug].astro'), route(t));
  // ensure content dir exists
  mkdirSync(join(root, 'src', 'content', t.coll), { recursive: true });
  console.log('wrote', t.dir);
}
console.log('done:', tracks.length, 'tracks');
