import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared schema for every track (foundations, microservices, …).
const refSchema = z.object({
  title: z.string(),
  category: z.enum([
    // foundations
    'fnd-thinking',
    'fnd-characteristics',
    'fnd-components',
    'fnd-evolution',
    // architecture styles
    'sty-fundamentals',
    'sty-monolithic',
    'sty-distributed',
    'sty-choosing',
    // domain-driven design
    'ddd-strategic',
    'ddd-tactical',
    'ddd-application',
    // microservices
    'ms-foundations',
    'ms-decomposition',
    'ms-communication',
    'ms-operations',
    'ms-organization',
    // event-driven
    'ed-foundations',
    'ed-patterns',
    'ed-datamesh',
    // distributed systems
    'ds-foundations',
    'ds-scalability',
    'ds-patterns',
    // apis & communication
    'api-design',
    'api-rest',
    'api-management',
    'api-messaging',
    // cloud & saas
    'cld-serverless',
    'cld-saas',
    // process automation
    'auto-foundations',
    'auto-modeling',
    'auto-operating',
    // the architect's path
    'path-elevator',
    'path-strategy',
    'path-systems-thinking',
  ]),
  kind: z.enum(['pattern', 'guide', 'topic']).default('topic'),
  order: z.number(),
  difficulty: z.string(),
  gof: z.boolean().default(false),
  status: z.enum(['stub', 'ready']).default('stub'),
  intent: z.string(),
  nutshell: z.string().optional(),
  aka: z.string().optional(),
  source: z.string().optional(),
  playground: z.string().optional(),
  // The book(s) this page draws from — available for citation chips.
  book: z.string().optional(),
  related: z.array(z.string()).default([]),
  when_use: z.array(z.string()).default([]),
  when_avoid: z.array(z.string()).default([]),
  quiz: z
    .array(
      z.object({
        q: z.string(),
        options: z.array(
          z.object({
            text: z.string(),
            correct: z.boolean().default(false),
          }),
        ),
        explain: z.string().optional(),
      }),
    )
    .default([]),
  // NEW (BLUEPRINT §14): one short, flashcard-worthy line to remember.
  takeaway: z.string().optional(),
});

const mk = (base: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${base}` }),
    schema: refSchema,
  });

const foundations = mk('foundations');
const styles = mk('styles');
const ddd = mk('ddd');
const microservices = mk('microservices');
const eventDriven = mk('event-driven');
const distributedSystems = mk('distributed-systems');
const apis = mk('apis');
const cloud = mk('cloud');
const automation = mk('automation');
const strategy = mk('strategy');

export const collections = {
  foundations,
  styles,
  ddd,
  microservices,
  'event-driven': eventDriven,
  'distributed-systems': distributedSystems,
  apis,
  cloud,
  automation,
  strategy,
};
