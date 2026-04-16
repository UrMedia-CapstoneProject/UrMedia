import { CatalogProps } from "@/components/Catalog/Catalog";
import Catalog from "@/components/Catalog/Catalog";


export default async function CatalogPage({ searchParams }: CatalogProps) {
  const params = await searchParams;
  return(
    <Catalog searchParams={params} />
  )
}
