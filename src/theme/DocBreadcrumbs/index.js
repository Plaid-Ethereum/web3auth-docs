import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useSidebarBreadcrumbs, useHomePageRoute } from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import HomeBreadcrumbItem from "@theme/DocBreadcrumbs/Items/Home";
import styles from "./styles.module.css";
// TODO move to design system folder
function BreadcrumbsItemLink({ children, href, isLast }) {
  const className = "breadcrumbs__link";
  if (isLast) {
    return (
      <span className={className} itemProp="name">
        {children}
      </span>
    );
  }
  return <span className={className}>{children}</span>;
}
// TODO move to design system folder
function BreadcrumbsItem({ children, active, index, addMicrodata }) {
  return (
    <li
      {...(addMicrodata && {
        itemScope: true,
        itemProp: "itemListElement",
        itemType: "https://schema.org/ListItem",
      })}
      className={clsx("breadcrumbs__item", {
        "breadcrumbs__item--active": active,
      })}
    >
      {children}
      <meta itemProp="position" content={String(index + 1)} />
    </li>
  );
}
export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();
  if (!breadcrumbs) {
    return null;
  }
  return (
    <nav
      className={clsx(ThemeClassNames.docs.docBreadcrumbs, styles.breadcrumbsContainer)}
      aria-label={translate({
        id: "theme.docs.breadcrumbs.navAriaLabel",
        message: "Breadcrumbs",
        description: "The ARIA label for the breadcrumbs",
      })}
    >
      <ul className="breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList">
        {homePageRoute && <HomeBreadcrumbItem />}
        {breadcrumbs.map((item, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          const href = item.type === "category" && item.linkUnlisted ? undefined : item.href;
          return (
            <BreadcrumbsItem key={idx} active={isLast} index={idx} addMicrodata={!!href}>
              <BreadcrumbsItemLink href={href} isLast={isLast}>
                {item.label}
              </BreadcrumbsItemLink>
            </BreadcrumbsItem>
          );
        })}
      </ul>
    </nav>
  );
}
