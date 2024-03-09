"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { ModeToggle } from "./ui/theme-toggle";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 lg:px-8 sm:flex-row h-14 backdrop-blur-md border-b border-b-slate-500 border-opacity-20 bg-transparent darktext-white"
        )}
      >
        <Link href={"/"} className="text-lg font-semibold">
          CivitUI<sup className="text-blue-500 ml-1">beta</sup>
        </Link>
        <div className="ml-auto flex space-x-3 sm:justify items-center">
          <div className="space-x-5 md:flex">
            <div>
              <NavigationMenu>
                <NavigationMenuList className="gap-4 items-center">
                  <NavigationMenuItem>
                    <ModeToggle />
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Button size={"sm"}>Queue Prompt</Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
