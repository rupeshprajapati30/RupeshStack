"use client";

import { useEffect, useState } from "react";
import type { TerminalEntry } from "@/types/portfolio";

interface TerminalProps {
  title: string;
  entries: TerminalEntry[];
}

interface Progress {
  /** Index of the entry currently being typed. */
  entry: number;
  /** Characters of the current command typed so far. */
  chars: number;
}

const TYPE_DELAY_MS = 55;
const OUTPUT_DELAY_MS = 450;
const START_DELAY_MS = 700;

export function Terminal({ title, entries }: TerminalProps) {
  const [progress, setProgress] = useState<Progress>({ entry: 0, chars: 0 });
  const done = progress.entry >= entries.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress({ entry: entries.length, chars: 0 });
    }
  }, [entries.length]);

  useEffect(() => {
    if (done) return;
    const current = entries[progress.entry];
    if (!current) return;

    const typing = progress.chars < current.command.length;
    const isFirstTick = progress.entry === 0 && progress.chars === 0;
    const delay = isFirstTick ? START_DELAY_MS : typing ? TYPE_DELAY_MS : OUTPUT_DELAY_MS;

    const timer = window.setTimeout(() => {
      setProgress((p) =>
        typing ? { ...p, chars: p.chars + 1 } : { entry: p.entry + 1, chars: 0 },
      );
    }, delay);
    return () => window.clearTimeout(timer);
  }, [progress, entries, done]);

  return (
    <figure className="glass overflow-hidden rounded-2xl font-mono text-[0.8rem] sm:text-sm">
      <figcaption className="flex items-center gap-2 border-b border-border/80 bg-background/40 px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-3 rounded-full bg-secondary/80" />
          <span className="size-3 rounded-full bg-accent/70" />
          <span className="size-3 rounded-full bg-success/80" />
        </span>
        <span className="ml-2 truncate text-xs text-muted">{title}</span>
      </figcaption>

      {/* Full transcript for assistive technology; the animation below is decorative. */}
      <pre className="sr-only">
        {entries.map((e) => `$ ${e.command}\n${e.output.map((o) => `> ${o}`).join("\n")}`).join("\n\n")}
      </pre>

      <div aria-hidden="true" className="min-h-[15.5rem] space-y-3 px-4 py-4 leading-relaxed sm:px-5">
        {entries.map((entry, index) => {
          if (index > progress.entry) return null;
          const isCurrent = index === progress.entry;
          const typed = isCurrent ? entry.command.slice(0, progress.chars) : entry.command;
          const showOutput = index < progress.entry;

          return (
            <div key={entry.command}>
              <p className="text-text">
                <span className="text-success">$</span> {typed}
                {isCurrent ? <Cursor /> : null}
              </p>
              {showOutput
                ? entry.output.map((line) => (
                    <p key={line} className="flex items-center gap-2 text-muted">
                      <span className="text-primary">&gt;</span>
                      <span className={entry.status === "success" ? "text-success" : undefined}>
                        {line}
                      </span>
                      {entry.status === "success" ? <span className="status-dot" /> : null}
                    </p>
                  ))
                : null}
            </div>
          );
        })}
        {done ? (
          <p className="text-text">
            <span className="text-success">$</span> <Cursor />
          </p>
        ) : null}
      </div>
    </figure>
  );
}

function Cursor() {
  return <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-primary" />;
}
