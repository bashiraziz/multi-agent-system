"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navigation } from "./components/Navigation"
import { TechBackground } from "./components/TechBackground"
import { Brain, Zap, Puzzle, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <TechBackground />
      <Navigation />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold mb-4 text-emerald-600">Welcome to Agentia</h1>
          <p className="text-xl text-gray-700">The future of AI-driven multi-agent systems</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FeatureCard
            icon={Brain}
            title="Intelligent Collaboration"
            description="Multiple AI agents working together to solve complex problems"
          />
          <FeatureCard
            icon={Zap}
            title="Natural Language Interface"
            description="Interact with AI agents using everyday language"
          />
          <FeatureCard
            icon={Puzzle}
            title="Modular Architecture"
            description="Easily extensible and customizable for various use cases"
          />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/demo" passHref>
            <motion.a
              className="inline-flex items-center bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-emerald-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try the Demo
              <ArrowRight className="ml-2" />
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

import { FC } from "react";

interface FeatureCardProps {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-6"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="w-12 h-12 text-emerald-500 mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

