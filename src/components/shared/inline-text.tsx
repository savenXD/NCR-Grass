import Link from "next/link"

const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g

/**
 * Renders plain copy that may contain internal links written as `[anchor text](/path)`.
 * Lets content files in lib/ carry contextual links without becoming JSX.
 */
export function InlineText({ text, linkClassName }: { text: string; linkClassName?: string }) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(LINK)) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(
      <Link key={m.index} href={m[2]} className={linkClassName ?? "font-medium text-primary underline underline-offset-2 hover:text-primary/80"}>
        {m[1]}
      </Link>,
    )
    last = m.index + m[0].length
  }
  if (last === 0) return <>{text}</>
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

/** Plain-text version (for JSON-LD, where markup must not leak). */
export const stripLinks = (text: string) => text.replace(LINK, "$1")
