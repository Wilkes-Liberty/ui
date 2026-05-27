import { Article } from "@/components/drupal/Article"
import { BasicPage } from "@/components/drupal/BasicPage"
import { Career } from "@/components/drupal/Career"
import { CaseStudy } from "@/components/drupal/CaseStudy"
import { Event } from "@/components/drupal/Event"
import { Person } from "@/components/drupal/Person"
import { Platform } from "@/components/drupal/Platform"
import { Resource } from "@/components/drupal/Resource"
import { Service } from "@/components/drupal/Service"
import { Solution } from "@/components/drupal/Solution"
import type { DrupalNode } from "@/types"

export function NodeRenderer({ node }: { node: DrupalNode }) {
  switch (node.__typename) {
    case "NodeArticle":
      return <Article node={node} />
    case "NodeBasicPage":
      return <BasicPage node={node} />
    case "NodePlatform":
      return <Platform node={node} />
    case "NodeService":
      return <Service node={node} />
    case "NodeSolution":
      return <Solution node={node} />
    case "NodeCaseStudy":
      return <CaseStudy node={node} />
    case "NodeResource":
      return <Resource node={node} />
    case "NodeEvent":
      return <Event node={node} />
    case "NodeCareer":
      return <Career node={node} />
    case "NodePerson":
      return <Person node={node} />
    default:
      return null
  }
}
