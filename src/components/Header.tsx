"use client";

import { ComponentProps } from "react";
import { useSelf } from "@liveblocks/react/suspense";
import { getUser } from "../app/lib/getUser";
import { InboxPopover } from "./InboxPopover";
import "./../styles/header.css";

export function Header({ className, ...props }: ComponentProps<"header">) {
  const currentUser = useSelf();
  const user = getUser(currentUser.id);

  return (
    <header className={`header ${className || ""}`} {...props}>
    <h1 className="header-title">
        Login as <span className="username">{user?.name}</span>
    </h1>
      <InboxPopover />
    </header>
  );
}
