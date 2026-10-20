import { HeadlessLink } from "@/src/headless";
import { Icon } from "@/src/components/primitives/Icon";
import { actionLinkStyles } from "./base";

export interface WordPressLinkData {
  title?: string;
  url?: string;
  target?: string;
}

export interface ActionLinkData {
  intent?: "primary" | "secondary";
  destinationType?: "internal" | "external";
  internalPage?: number;
  internalLabel?: string;
  externalLink?: WordPressLinkData;
  /** Added by the WordPress adapter, or supplied directly by static/demo content. */
  link?: WordPressLinkData;
}

export interface ActionLinkProps extends ActionLinkData {
  appearance?: "primary" | "secondary" | "dark" | "inverse";
  size?: "compact" | "default" | "wide";
  className?: string;
}

export function resolveActionLink(action?: ActionLinkData): WordPressLinkData | null {
  if (!action) return null;
  const link = action.link ?? (action.destinationType === "external" ? action.externalLink : undefined);
  if (!link?.url || !link.title) return null;
  return link;
}

export function validActions(actions?: readonly ActionLinkData[]): ActionLinkData[] {
  return actions?.filter((action) => resolveActionLink(action)) ?? [];
}

export function ActionLink({ intent, link, destinationType, externalLink, appearance, size, className }: ActionLinkProps) {
  const resolved = resolveActionLink({ intent, link, destinationType, externalLink });
  if (!resolved) return null;
  const { root, label, mark } = actionLinkStyles({ intent: appearance ?? intent, size });
  const external = resolved.target === "_blank";
  return (
    <HeadlessLink.Root href={resolved.url!} target={resolved.target || undefined} className={root({ class: className })} prefetch>
      <HeadlessLink.Label className={label()}>{resolved.title}</HeadlessLink.Label>
      <HeadlessLink.EndIcon className={mark()}>
        <Icon name={external ? "ArrowUpRight" : "ArrowRight"} size="sm" />
      </HeadlessLink.EndIcon>
    </HeadlessLink.Root>
  );
}
