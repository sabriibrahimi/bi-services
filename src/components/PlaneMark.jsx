/**
 * The hand-plane mark from the company's business card, redrawn as clean
 * vectors. Inline (rather than an <img>) so it inherits the surrounding text
 * colour — the same mark sits on the light header and the dark footer.
 *
 * public/logo-mark.svg is the identical drawing as a standalone file, for
 * structured data, link previews and anyone who needs the logo on its own.
 */
export default function PlaneMark({ className = '' }) {
  return (
    <svg
      className={`plane-mark ${className}`.trim()}
      viewBox="0 0 200 112"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M94 44C82 25 61 16 45 23c-13 6-17 20-8 28 7 6 17 4 19-3 1-4-1-7-5-8" />
      </g>
      <g fill="currentColor">
        <path d="M108 76 94 38l13-5 16 43z" />
        <path d="M136 76c1-17 8-29 20-35 11-6 23-1 26 9 2 8-1 16-9 20l-8-13c3-2 5-5 4-8-2-4-7-5-11-2-6 4-10 14-10 29z" />
        <path d="M30 76h148c10 0 18 8 18 18s-8 18-18 18H26c-10 0-18-8-18-18 0-8 6-14 16-18z" />
      </g>
    </svg>
  )
}
