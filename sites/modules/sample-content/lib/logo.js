// An SVG wordmark for a sample association: a honeycomb cell with a bee,
// beside the name on two lines. Generated from the name so that every site
// populated with `--name` gets a logo of its own.
//
// The text uses system fonts because an SVG shown through <img> cannot reach
// the page's webfonts. Widths are estimates, generous enough for those fonts.

const fonts = '\'Avenir Next\', \'Segoe UI\', Helvetica, Arial, sans-serif';

function escape(text) {
  return text.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

// "Linden Valley Beekeepers' Association" => [ "Linden Valley",
// "BEEKEEPERS' ASSOCIATION" ]. Without a "Beekeep..." word, splits in half.
function lines(name) {
  const words = name.trim().split(/\s+/);
  let split = words.findIndex((word) => /^beekeep/i.test(word));
  if (split <= 0) {
    split = Math.ceil(words.length / 2);
  }
  return [ words.slice(0, split).join(' '), words.slice(split).join(' ').toUpperCase() ];
}

// `options.lines` overrides the automatic two-line split; `options.colors`
// gives `{ ink, accent }` for light mode and `{ darkInk, darkAccent }` for dark.
export default function logo(name, { dark = false, ...options } = {}) {
  const [ first, second ] = options.lines || lines(name);
  const colors = {
    ink: '#3a2508',
    accent: '#a35a00',
    darkInk: '#ffffff',
    darkAccent: '#f0a830',
    ...options.colors
  };
  const ink = dark ? colors.darkInk : colors.ink;
  const accent = dark ? colors.darkAccent : colors.accent;
  const width = Math.ceil(76 + Math.max(first.length * 14.5, second.length * 8.6));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="64" viewBox="0 0 ${width} 64">
  <title>${escape(name)}</title>
  <defs>
    <clipPath id="body"><ellipse cx="0" cy="3" rx="8" ry="12"/></clipPath>
  </defs>
  <path d="M32 2l26 15v30L32 62 6 47V17z" fill="#f0a830"/>
  <g transform="translate(32 33) rotate(-28)">
    <ellipse cx="-7" cy="-9" rx="6" ry="9.5" fill="#ffffff" fill-opacity="0.9" transform="rotate(-28 -7 -9)"/>
    <ellipse cx="7" cy="-9" rx="6" ry="9.5" fill="#ffffff" fill-opacity="0.9" transform="rotate(28 7 -9)"/>
    <ellipse cx="0" cy="3" rx="8" ry="12" fill="#3a2508"/>
    <g clip-path="url(#body)" stroke="#f0a830" stroke-width="3.2">
      <path d="M-9 0h18M-9 7h18"/>
    </g>
  </g>
  <text x="72" y="${second ? 31 : 41}" font-family="${fonts}" font-size="25" font-weight="700" fill="${ink}">${escape(first)}</text>
  ${second ? `<text x="73" y="50" font-family="${fonts}" font-size="12" font-weight="600" letter-spacing="1.6" fill="${accent}">${escape(second)}</text>` : ''}
</svg>
`;
}
