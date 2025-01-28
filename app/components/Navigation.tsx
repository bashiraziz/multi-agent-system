import Link from "next/link"
import { motion } from "framer-motion"
import { AgentiaLogo } from "./AgentiaLogo"

export function Navigation() {
  return (
    <motion.nav
      className="bg-white bg-opacity-80 backdrop-blur-lg shadow-md"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <AgentiaLogo />
            <span className="text-2xl font-bold text-[#45B7D1] hover:text-[#FF6B6B] transition-colors duration-300">
              Agentia
            </span>
          </Link>
          <div className="flex space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/demo">Demo</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} passHref>
      <motion.span
        className="text-gray-800 hover:text-[#45B7D1] transition-colors duration-300 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.span>
    </Link>
  )
}

