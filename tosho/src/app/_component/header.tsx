"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Cookies from "js-cookie";
import { Loader2, LogInIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

export function Header() {
  const { user } = useUser();

  const [cartItemCount, setCartItemCount] = React.useState(0);

  const { data: cartItems, isLoading: isLoadingCart } =
    api.cart.getCartItems.useQuery(undefined, { enabled: !!user });

  React.useEffect(() => {
    if (user && cartItems) {
      setCartItemCount(
        cartItems.reduce((total, item) => total + item.quantity, 0),
      );
    } else if (!user) {
      const cart = JSON.parse(Cookies.get("cart") || "[]");
      setCartItemCount(
        cart.reduce((total: number, item: any) => total + item.quantity, 0),
      );
    }
  }, [user, cartItems]);

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md transition-shadow duration-300 ease-in-out">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">文庫 (Tosho)</h1>
          <p className="text-muted-foreground text-sm font-semibold">
            A random book-store...
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Link href={"/cart"}>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="bg-primary text-primary-foreground absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                {isLoadingCart ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  cartItemCount
                )}
              </span>
            </Button>
          </Link>

          <SignedOut>
            <Link href={"/sign-in"}>
              <Button>
                Sign In <LogInIcon />
              </Button>
            </Link>
          </SignedOut>

          <UserButton />
        </div>
      </div>
    </header>
  );
}
