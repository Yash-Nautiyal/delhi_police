import React from "react";

const SummaryCards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 shadow-md theme-transition"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-[var(--color-text-secondary)]">
                {card.title}
              </p>
              <p className="text-2xl font-semibold text-[var(--color-text)] mt-2">
                {card.value}
              </p>
              {card.caption && (
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                  {card.caption}
                </p>
              )}
            </div>
            {card.badge && (
              <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold">
                {card.badge}
              </span>
            )}
          </div>
          {card.progress !== undefined && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-1">
                <span>Progress</span>
                <span>{card.progress}%</span>
              </div>
              <div className="w-full h-2 bg-[var(--color-surface-hover)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-primary)] transition-all"
                  style={{ width: `${card.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
