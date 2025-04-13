"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button
} from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/app/theme-switcher";
import LogoASB from "@/components/Logo";
import Link from "next/link";

export default function NavBar() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="shadow-md bg-white/10 dark:bg-dark-3/70 backdrop-saturate-200"
    >
      <NavbarContent>
        <NavbarBrand>
          <Link
            href="/"
            className="flex items-center cursor-pointer"
            onClick={closeMenu}
          >
            <LogoASB className="w-32 h-16 text-dark-1 dark:text-white" />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className="font-magistral tracking-widest uppercase hidden lg:flex gap-4"
        justify="center"
      >
        <NavbarItem isActive={isActive("/about")}>
          <Link
            href="/about"
            className="text-dark-1 dark:text-white cursor-pointer"
            onClick={closeMenu}
          >
            О Компании
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive("/contact")}>
          <Link
            href="/contact"
            className="text-dark-1 dark:text-white cursor-pointer"
            onClick={closeMenu}
          >
            Контакты
          </Link>
        </NavbarItem>
      </NavbarContent>
      {isAuthenticated && (
        <NavbarContent justify="end" className="hidden lg:flex">
          <NavbarItem isActive={isActive("/user")}>
            <Link
              href="/user"
              className="font-magistral tracking-widest text-dark-1 dark:text-white cursor-pointer"
              onClick={closeMenu}
            >
              Админка
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as="div"
              variant="flat"
              onClick={() => {
                signOut();
                closeMenu();
              }}
              className="font-magistral tracking-widest dark:dark-4 dark:text-white"
            >
              Выход
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Link
            href="tel:88005059591"
            className="text-dark-1 dark:text-white leading-none"
          >
            <span className="font-magistral tracking-widest text-[16px] flex mb-0">
              8 (800) 505-95-91
            </span>
            <span className="text-[10px]">звонок по России бесплатный</span>
          </Link>
        </NavbarItem>
        <ThemeSwitcher />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden text-dark-1 dark:text-white"
        />
      </NavbarContent>
      <NavbarMenu className="font-magistral-bold tracking-widest uppercase">
        <NavbarMenuItem>
          <Link
            href="/about"
            className="w-full text-dark-4"
            onClick={closeMenu}
          >
            О Компании
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href="/contact"
            className="w-full text-dark-4"
            onClick={closeMenu}
          >
            Контакты
          </Link>
        </NavbarMenuItem>
        {isAuthenticated && (
          <>
            <hr className="opacity-100 dark:opacity-50 mt-3 mb-3 dark:border-dark-4" />
            <NavbarMenuItem>
              <Link
                href="/user"
                className="w-full text-dark-4"
                onClick={closeMenu}
              >
                Админка
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                as="div"
                className="text-dark-1 dark:text-white"
                onClick={() => {
                  signOut();
                  closeMenu();
                }}
              >
                Выход
              </Button>
            </NavbarMenuItem>
          </>
        )}
        <hr className="opacity-100 dark:opacity-50 mt-3 mb-3 dark:border-dark-4" />
        <NavbarItem>
          <Link href="tel:88005059591" className="text-dark-1 dark:text-dark-4">
            8 (800) 505-95-91
          </Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
