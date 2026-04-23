import { parseStatMarkdown } from "@/lib/parseStats";

export function StatBullet({ text }) {
  const parts = parseStatMarkdown(text);
  return (
    <li className="text-body text-ink-dim leading-relaxed">
      {parts.map((p, i) =>
        p.type === "stat" ? (
          <strong key={i} className="text-violet font-semibold">{p.value}</strong>
        ) : (
          <span key={i}>{p.value}</span>
        )
      )}
    </li>
  );
}
