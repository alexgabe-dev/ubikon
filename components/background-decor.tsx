import clsx from "clsx"

type Props = {
  className?: string
  /** Opacity for the pattern background (0—1 as string). */
  patternOpacity?: string
}

/**
 * Diszkrét art‑deco háttérdekor: finom minta és két forgatott geometriai keret.
 * Használathoz a szülő elem legyen `relative overflow-hidden`.
 */
export function BackgroundDecor({ className, patternOpacity = "0.08" }: Props) {
  return (
    <>
      {/* Finom mintázat */}
      <div
        className={clsx(
          "absolute inset-0 art-deco-pattern",
          className,
        )}
        style={{ opacity: Number(patternOpacity) }}
        aria-hidden
      />

      {/* Geometriai díszek – mobilon rejtve, sm-től jelennek meg */}
      <div
        className="absolute hidden sm:block top-8 left-6 sm:left-1/4 w-20 h-20 border border-primary/15 rotate-45"
        aria-hidden
      />
      <div
        className="absolute hidden sm:block bottom-8 right-6 sm:right-1/4 w-24 h-24 border border-primary/15 -rotate-12"
        aria-hidden
      />
    </>
  )
}