"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

export function Settings() {
  const { theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 space-y-2 rounded-xl"
        align="end"
        forceMount
      >
        <DropdownMenuGroup className="space-y-1 py-2">
          <DropdownMenuItem
            asChild
            className="text-muted-foreground cursor-pointer rounded-md py-2"
          >
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-layout-dashboard w-5 h-5 mr-4"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.2"
                stroke={theme === "dark" ? "lightgray" : "#2c3e50"}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4h6v8h-6z" />
                <path d="M4 16h6v4h-6z" />
                <path d="M14 12h6v8h-6z" />
                <path d="M14 4h6v4h-6z" />
              </svg>
              Explore
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="text-muted-foreground cursor-pointer rounded-md py-2"
          >
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-credit-card w-5 h-5 mr-4"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.2"
                stroke={theme === "dark" ? "lightgray" : "#2c3e50"}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
                <path d="M3 10l18 0" />
                <path d="M7 15l.01 0" />
                <path d="M11 15l2 0" />
              </svg>
              Subscription & Billing
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="text-muted-foreground cursor-pointer rounded-md py-2"
          >
            <Link href="https://git.new/civitui" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-github w-5 h-5 mr-4"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.2"
                stroke={theme === "dark" ? "lightgray" : "#2c3e50"}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
              Github
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
