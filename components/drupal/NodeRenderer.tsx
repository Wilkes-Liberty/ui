import { Article } from "@/components/drupal/Article"
import { Career } from "@/components/drupal/Career"
import { CaseStudy } from "@/components/drupal/CaseStudy"
import { Event } from "@/components/drupal/Event"
import { Person } from "@/components/drupal/Person"
import { Product } from "@/components/drupal/Product"
import { Resource } from "@/components/drupal/Resource"
import { Service } from "@/components/drupal/Service"
import { Solution } from "@/components/drupal/Solution"
import type { DrupalNode } from "@/types"

// NodePage (basic_page) is not exposed by graphql_compose, so no case
// here. Restore once the schema gap is closed.
export function NodeRenderer({ node }: { node: DrupalNode }) {
  switch (node.__typename) {
    case "NodeArticle":
      return <Article node={node} />
    case "NodeProduct":
      return <Product node={node} />
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
