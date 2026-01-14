"use client";

// import { motion } from "framer-motion";
import { Rocket, Twitter, Linkedin, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const footerLinks = {
    Products: [
      "Guardian Pro",
      "Sentinel Max",
      "Stealth Scout",
      "Custom Solutions",
    ],
    Company: ["About Us", "Careers", "News", "Investors"],
    Support: ["Documentation", "API Reference", "Community", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookies", "Compliance"],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-linear-to-r from-gray-900/20 via-transparent to-gray-900/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-4
                  gap-10
                  mb-14
                "
        >
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="h-7 w-7 text-white" />
              <span className="text-xl font-bold tracking-widest text-white">
                SPACEBORN
              </span>
            </div>

            <p className="text-white/75 text-sm leading-relaxed mb-5">
              Advanced autonomous security drones with AI-powered intelligence,
              protecting what matters most with precision and reliability.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-md border border-white/15 bg-white/5 hover:border-white/40 transition"
                >
                  <social.icon className="h-4 w-4 text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm sm:text-lg font-semibold text-white mb-3 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hologram rounded-2xl p-6 sm:p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="
              text-2xl
              font-bold
              text-white 
              mb-2 
              uppercase 
              tracking-wide 
              text-glow">
                Security Updates
              </h3>
              <p className="text-white/80">
                Stay informed about our latest security drone technologies,
                deployments, and breakthrough innovations.
              </p>
            </div>
            <div
              className="
                        flex 
                        flex-col
                        md:flex-col
                        lg:flex-row
                        gap-3
                      "
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="
                          flex-1
                          h-auto lg:h-[52px]
                          px-4
                          py-3 lg:py-0
                          bg-white/5
                          border border-white/20
                          rounded-lg
                          text-white
                          placeholder:text-white/50
                          focus:outline-none
                          focus:border-white
                          "
              />

              <Button
                className="
                          bg-white text-black hover:bg-gray-200
                          h-auto lg:h-[52px]
                          px-6
                          py-3 lg:py-0
                          font-semibold
                          tracking-wider
                        "
              >
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © 2026 Spaceborn Technologies. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              {/* <span>Made with ❤️ for the future of security</span> */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="uppercase tracking-wider">
                  Security Status: Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl hidden sm:block" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gray-500/10 rounded-full blur-2xl hidden sm:block" />
    </footer>
  );
}
