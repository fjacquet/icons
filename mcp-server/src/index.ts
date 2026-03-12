import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { ICON_CATALOG, LIBRARY_LABELS, type IconLibraryId } from './catalog.js';
import { renderIconToSvg } from './renderer.js';

const VALID_LIBRARIES = Object.keys(LIBRARY_LABELS) as IconLibraryId[];

const server = new McpServer({
  name: 'icons',
  version: '0.1.0',
});

// ── list_icons ────────────────────────────────────────────────────────────────
server.tool(
  'list_icons',
  'Search the icon catalog. Returns matching icon names and their library.',
  {
    query: z.string().optional().describe('Case-insensitive substring to match against icon names'),
    library: z
      .enum(VALID_LIBRARIES as [IconLibraryId, ...IconLibraryId[]])
      .optional()
      .describe('Filter by library ID (fa6, md, fi, bs, lu, ri, vsc, si, tb, hi2)'),
    limit: z.number().int().min(1).max(500).optional().default(50).describe('Max results (default 50)'),
  },
  async ({ query, library, limit }) => {
    let results = ICON_CATALOG;

    if (library) results = results.filter((e) => e.libraryId === library);
    if (query) {
      const q = query.toLowerCase();
      results = results.filter((e) => e.name.toLowerCase().includes(q));
    }

    const slice = results.slice(0, limit);
    const text = JSON.stringify(
      slice.map((e) => ({ name: e.name, library: e.libraryId, label: e.libraryLabel })),
      null,
      2
    );

    return {
      content: [
        {
          type: 'text' as const,
          text: `Found ${results.length} icons (showing ${slice.length}):\n${text}`,
        },
      ],
    };
  }
);

// ── render_icon ───────────────────────────────────────────────────────────────
server.tool(
  'render_icon',
  'Render a single icon as a standalone SVG string.',
  {
    name: z.string().describe('PascalCase icon name, e.g. "FaBeer"'),
    library: z
      .enum(VALID_LIBRARIES as [IconLibraryId, ...IconLibraryId[]])
      .describe('Library ID, e.g. "fa6"'),
    size: z.number().int().min(16).max(512).optional().default(64).describe('Size in px (default 64)'),
    color: z.string().optional().default('#000000').describe('Icon color as hex (default #000000)'),
    background: z.string().nullable().optional().default(null).describe('Background color as hex, or null for transparent'),
  },
  async ({ name, library, size, color, background }) => {
    const entry = { name, libraryId: library, libraryLabel: LIBRARY_LABELS[library] };
    const svg = renderIconToSvg(entry, { size, color, background: background ?? null });
    return { content: [{ type: 'text' as const, text: svg }] };
  }
);

// ── render_icon_batch ─────────────────────────────────────────────────────────
server.tool(
  'render_icon_batch',
  'Render multiple icons with the same size/color/background settings.',
  {
    icons: z
      .array(
        z.object({
          name: z.string().describe('PascalCase icon name'),
          library: z.enum(VALID_LIBRARIES as [IconLibraryId, ...IconLibraryId[]]),
        })
      )
      .min(1)
      .max(50)
      .describe('List of icons to render (max 50)'),
    size: z.number().int().min(16).max(512).optional().default(64),
    color: z.string().optional().default('#000000'),
    background: z.string().nullable().optional().default(null),
  },
  async ({ icons, size, color, background }) => {
    const opts = { size, color, background: background ?? null };
    const results = icons.map(({ name, library }) => {
      try {
        const entry = { name, libraryId: library, libraryLabel: LIBRARY_LABELS[library] };
        return { name, library, svg: renderIconToSvg(entry, opts), error: null };
      } catch (err) {
        return { name, library, svg: null, error: String(err) };
      }
    });

    return {
      content: results.map((r) => ({
        type: 'text' as const,
        text: r.error
          ? `ERROR ${r.library}:${r.name} — ${r.error}`
          : `<!-- ${r.library}:${r.name} -->\n${r.svg}`,
      })),
    };
  }
);

// ── start ─────────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
