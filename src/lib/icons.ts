import {
  Boxes,
  Braces,
  Cloud,
  Code2,
  Container,
  CreditCard,
  Database,
  DatabaseZap,
  GitBranch,
  Globe,
  Layers,
  Network,
  Radio,
  Rocket,
  Server,
  ShieldCheck,
  Webhook,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the `icon` keys used in the JSON data to icon components.
 * Add a new entry here to support a new key; unknown keys fall back to `Code2`.
 */
const iconMap: Record<string, LucideIcon> = {
  csharp: Braces,
  dotnet: Layers,
  aspnet: Server,
  api: Network,
  websocket: Radio,
  sqlserver: Database,
  database: DatabaseZap,
  stripe: CreditCard,
  webhook: Webhook,
  aws: Cloud,
  docker: Container,
  git: GitBranch,
  workflow: Workflow,
  code: Code2,
  layers: Layers,
  shield: ShieldCheck,
  globe: Globe,
  rocket: Rocket,
  zap: Zap,
  boxes: Boxes,
};

export function resolveIcon(key: string): LucideIcon {
  return iconMap[key.toLowerCase()] ?? Code2;
}
