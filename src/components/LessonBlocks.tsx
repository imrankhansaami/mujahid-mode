import { Quote } from 'lucide-react'
import type { Block } from '../types'

export function LessonBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'p':
            return (
              <p key={i} className="mb-5 text-[0.95rem] leading-[1.85] text-bone/75">
                {block.text}
              </p>
            )
          case 'h':
            return (
              <h2 key={i} className="display mb-3 mt-9 text-2xl leading-tight text-bone">
                {block.text}
              </h2>
            )
          case 'list':
            return (
              <ul key={i} className="mb-6 space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[0.92rem] leading-relaxed text-bone/75">
                    <span className="mt-[0.62rem] h-px w-3 shrink-0 bg-gold/70" />
                    {item}
                  </li>
                ))}
              </ul>
            )
          case 'quote':
            return (
              <blockquote
                key={i}
                className="my-7 rounded-r-xl border-l-2 border-gold/50 bg-gold/[0.04] py-4 pl-5 pr-4"
              >
                <Quote className="mb-2 h-4 w-4 text-gold/70" />
                <p className="font-display text-lg leading-relaxed text-bone/90">{block.text}</p>
                <footer className="mt-2 text-[0.7rem] uppercase tracking-[0.16em] text-faint">
                  {block.source}
                </footer>
              </blockquote>
            )
          case 'ayah':
            return (
              <div
                key={i}
                className="my-7 rounded-2xl border border-gold/20 bg-gold/[0.05] px-6 py-5 text-center"
              >
                {block.arabic ? (
                  <p className="arabic mb-3 text-2xl text-gold/90 sm:text-[1.75rem]">{block.arabic}</p>
                ) : null}
                <p className="mx-auto max-w-xl font-display text-lg leading-relaxed text-bone/90">
                  “{block.translation}”
                </p>
                <p className="mt-3 text-[0.7rem] uppercase tracking-[0.18em] text-faint">
                  {block.source}
                </p>
              </div>
            )
          case 'drill':
            return (
              <div
                key={i}
                className="my-7 rounded-2xl border border-emerald/25 bg-emerald/[0.06] px-5 py-4"
              >
                <p className="eyebrow mb-1.5 text-emerald">Practice</p>
                <p className="text-sm leading-relaxed text-bone/80">{block.text}</p>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}