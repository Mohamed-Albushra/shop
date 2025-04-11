import CategoryUI from "@/components/CategoryUI";
import { getSearchedProducts } from "@/lib/actions"
import { Product } from "@/lib/interfaces"


export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const results: Product[] = await getSearchedProducts((await searchParams).query as string);

  return (
    <div>
      <CategoryUI category="Results" products={results} />
    </div>);
}