"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/theme-toggle"
import { UserCircle, Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  // const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-200  px-4 md:px-6 lg:px-8",
      isScrolled ? "bg-background/90 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <UserCircle className="h-6 w-6" />
            <span className="font-bold text-lg hidden md:inline-block">HR Dashboard</span>
          </Link>
        </div>

        {/* <div className={cn(
          "absolute inset-x-0 top-full bg-background border-b md:static md:bg-transparent md:border-none p-4 md:p-0 transition-opacity duration-200 md:opacity-100",
          isMobileSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none md:pointer-events-auto"
        )}>
          {pathname === "/" && (
            <div className="relative max-w-sm mx-auto md:w-80 lg:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
                className="w-full pl-8 bg-background md:bg-muted/50"
              />
            </div>
          )}
        </div> */}
        
        <div className="flex items-center gap-2">
          {/* {pathname === "/" && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Toggle search</span>
            </Button>
          )} */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}