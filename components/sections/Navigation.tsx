"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Contact", href: "#contact" },
  ];

  const dashboardUrl =
    "https://spaceborn-dashboard-official.vercel.app/";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-sm border-b border-white/50 shadow-lg shadow-black/10"
          : "bg-black backdrop-blur-md border-b border-white/10"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/images/logo.png"
                alt="Spaceborn Logo"
                width={40}
                height={40}
                className="w-auto h-10 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <span className="text-xl font-bold tracking-[0.2em] bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              SPACEBORN
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/70 hover:text-white transition-all duration-300 relative group text-sm tracking-wider uppercase font-medium"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-white/50 to-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            <a
              href={dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="cursor-default bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10">
                <span className="uppercase tracking-wider text-sm font-semibold">
                  Login
                </span>
              </Button>
            </a>

            <Button
              onClick={() =>
                (window.location.href =
                  "https://github.com/Spaceborn-Beyond-Autonomous/spaceborn-desktop-app/releases/download/v1.0.0/Spaceborn.Setup.1.0.0.exe")
              }
              className="cursor-default bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
            >
              <span className="uppercase tracking-wider text-sm font-semibold">
                Download
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
              className="text-white hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-125 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mt-2 mb-4 p-6 shadow-2xl shadow-black/20">
            <div className="space-y-4">
              
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-white/70 hover:text-white transition-all duration-300 text-sm tracking-wider uppercase font-medium border-b border-white/5 last:border-0 hover:pl-2"
                >
                  {item.name}
                </a>
              ))}

              <a
                href={dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full mt-2 bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-full py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10">
                  <span className="uppercase tracking-wider text-sm font-semibold">
                    Login
                  </span>
                </Button>
              </a>

              <Button className="w-full mt-2 bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-full py-3 transition-all duration-300">
                <span className="uppercase tracking-wider text-sm font-semibold">
                  Get Started
                </span>
              </Button>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}