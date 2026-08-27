interface AgentGraphMarkProps {
  className?: string;
  reduceMotion?: boolean;
}

/**
 * The page's signature element: a small planner-orchestrates-agents graph
 * with a human-in-the-loop gate, rendered as an animated SVG. It stands in
 * for a portrait or logo and encodes the actual subject matter — agentic
 * orchestration — rather than a decorative abstract shape.
 */
export const AgentGraphMark = ({ className, reduceMotion = false }: AgentGraphMarkProps) => {
  const nodes = [
    { id: 'planner', x: 160, y: 40, r: 12, label: 'Planner' },
    { id: 'agent-a', x: 70, y: 140, r: 9, label: 'Agent' },
    { id: 'agent-b', x: 160, y: 170, r: 9, label: 'Agent' },
    { id: 'agent-c', x: 250, y: 140, r: 9, label: 'Agent' },
  ];

  const edges: [string, string][] = [
    ['planner', 'agent-a'],
    ['planner', 'agent-b'],
    ['planner', 'agent-c'],
  ];

  const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));

  return (
    <svg viewBox="0 0 320 210" className={className} role="img" aria-label="Multi-agent orchestration diagram">
      <defs>
        <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent-from)" />
          <stop offset="100%" stopColor="var(--accent-to)" />
        </linearGradient>
      </defs>

      {edges.map(([fromId, toId]) => {
        const from = nodeById[fromId];
        const to = nodeById[toId];
        return (
          <line
            key={`${fromId}-${toId}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="url(#edgeGradient)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
            style={reduceMotion ? undefined : { animation: 'flow-dash 1.4s linear infinite' }}
            opacity={0.7}
          />
        );
      })}

      {/* Human-in-the-loop approval gate sitting on the planner -> agent-b edge */}
      <g transform="translate(160, 105)">
        <rect
          x={-11}
          y={-11}
          width={22}
          height={22}
          transform="rotate(45)"
          fill="var(--surface)"
          stroke="var(--ring)"
          strokeWidth={1.5}
        />
      </g>

      {nodes.map((node) => (
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
          <circle
            r={node.r}
            fill="var(--surface)"
            stroke="url(#edgeGradient)"
            strokeWidth={2}
            style={reduceMotion ? undefined : { animation: 'pulse-node 2.4s ease-in-out infinite' }}
          />
        </g>
      ))}
    </svg>
  );
};
