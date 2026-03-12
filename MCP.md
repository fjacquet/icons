# MCP Server — React Icons to SVG

This repo ships a standalone [Model Context Protocol](https://modelcontextprotocol.io/) server that exposes the icon catalog and SVG renderer as tools. Any MCP-compatible client (Claude Desktop, Obsidian + MCP plugin, Cursor, etc.) can use it to generate SVGs on demand without touching a browser.

## Quick start

```bash
# Install server dependencies (one-time)
cd mcp-server && npm install

# Start the server (stdio transport)
npm run mcp-server
```

## Tools

### `list_icons`

Search the icon catalog.

| Parameter | Type     | Default | Description                                                                |
| --------- | -------- | ------- | -------------------------------------------------------------------------- |
| `query`   | `string` | —       | Case-insensitive substring match on icon name                              |
| `library` | `string` | —       | Filter by library ID: `fa6` `md` `fi` `bs` `lu` `ri` `vsc` `si` `tb` `hi2` |
| `limit`   | `number` | `50`    | Max results (1–500)                                                        |

**Example:**

```
list_icons(query="cloud", library="lu", limit=10)
```

---

### `render_icon`

Render a single icon as a standalone SVG string.

| Parameter    | Type           | Default   | Description                                      |
| ------------ | -------------- | --------- | ------------------------------------------------ |
| `name`       | `string`       | required  | PascalCase icon name, e.g. `FaBeer`              |
| `library`    | `string`       | required  | Library ID, e.g. `fa6`                           |
| `size`       | `number`       | `64`      | Size in px (16–512)                              |
| `color`      | `string`       | `#000000` | Icon color as hex                                |
| `background` | `string\|null` | `null`    | Background fill color, or `null` for transparent |

**Example:**

```
render_icon(name="LuCloud", library="lu", size=128, color="#007DB8")
```

---

### `render_icon_batch`

Render multiple icons with the same settings (max 50 per call).

| Parameter    | Type                | Default   | Description             |
| ------------ | ------------------- | --------- | ----------------------- |
| `icons`      | `{name, library}[]` | required  | List of icons to render |
| `size`       | `number`            | `64`      | Applied to all icons    |
| `color`      | `string`            | `#000000` | Applied to all icons    |
| `background` | `string\|null`      | `null`    | Applied to all icons    |

**Example:**

```
render_icon_batch(
  icons=[{name:"LuServer",library:"lu"},{name:"LuDatabase",library:"lu"}],
  size=64,
  color="#334155"
)
```

## MCP client configuration

### Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "icons": {
      "command": "npm",
      "args": ["run", "mcp-server"],
      "cwd": "/path/to/this/repo"
    }
  }
}
```

### Obsidian (MCP plugin)

In the MCP plugin settings add a server entry:

```json
{
  "name": "icons",
  "command": "npm",
  "args": ["run", "mcp-server"],
  "cwd": "/path/to/this/repo"
}
```

Then in a note or agent prompt:

> "Find all Lucide icons containing 'storage', render them at 48px in #334155, and save each SVG into my vault's `assets/icons/` folder."

## Library IDs

| ID    | Library         |
| ----- | --------------- |
| `fa6` | Font Awesome 6  |
| `md`  | Material Design |
| `fi`  | Feather         |
| `bs`  | Bootstrap       |
| `lu`  | Lucide          |
| `ri`  | Remix           |
| `vsc` | VS Code         |
| `si`  | Simple Icons    |
| `tb`  | Tabler          |
| `hi2` | Heroicons       |
