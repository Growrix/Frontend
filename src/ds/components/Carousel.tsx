"use client";

import * as React from "react";

import { cx } from "../utils/cx";
import { Button } from "../primitives/Button";

export type CarouselProps = {
  children: React.ReactNode;
  className?: string;
};

export function Carousel({ children, className }: CarouselProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const scrollBy = (delta: number) => {
    ref.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); scrollBy(-320); }
    else if (e.key === "ArrowRight") { e.preventDefault(); scrollBy(320); }
  }, []);

  return (
    <div className={cx("ui-carousel", className)} onKeyDown={handleKeyDown}>
      <div className="ui-carousel__controls">
        <Button size="sm" variant="secondary" onClick={() => scrollBy(-320)} aria-label="Previous">
          Prev
        </Button>
        <Button size="sm" variant="secondary" onClick={() => scrollBy(320)} aria-label="Next">
          Next
        </Button>
      </div>
      <div ref={ref} className="ui-carousel__track" role="region" aria-label="Carousel" tabIndex={0}>
        {children}
      </div>
    </div>
  );
}

export type CarouselItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function CarouselItem({ children, className }: CarouselItemProps) {
  return <div className={cx("ui-carousel__item", className)}>{children}</div>;
}
