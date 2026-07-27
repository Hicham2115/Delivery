import { Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TopProducts({ products }) {
  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold font-sans ">
          Produits déclarés
        </CardTitle>
        <Button variant="outline" size="sm" className="py-5">
          Top produits
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {products.map((product, index) => (
          <div key={product.name} className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-sm font-semibold text-gold">
              {index + 1}
            </span>
            <span className="flex flex-1 items-center gap-2 text-sm text-foreground">
              <Package className="size-4 text-muted-foreground" />
              {product.name}
            </span>
            <span className="font-mono text-sm font-medium text-muted-foreground tabular-nums">
              ×{product.quantity}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
