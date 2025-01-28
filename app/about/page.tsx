"use client"

import { motion } from "framer-motion"
import { Navigation } from "../components/Navigation"
import { TechBackground } from "../components/TechBackground"
import { Brain, Zap, Puzzle, Boxes, Workflow, Rocket } from "lucide-react"

const features = [
  {
    title: "Multi-Agent System Architecture",
    icon: Brain,
    description: "Decentralized AI components working in harmony",
  },
  { title: "Natural Language Interfaces", icon: Zap, description: "Seamless communication between agents and users" },
  { title: "Autonomous Software Components", icon: Puzzle, description: "Self-managing, intelligent software modules" },
  { title: "Seamless Integration", icon: Boxes, description: "Effortless composition of AI services" },
  { title: "Scalability and Reliability", icon: Workflow, description: "Robust performance at any scale" },
  { title: "Rapid Innovation", icon: Rocket, description: "Accelerated development of AI-driven solutions" },
]

export default function About() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <TechBackground />
      <Navigation />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.h1
          className="text-5xl font-bold mb-8 text-center text-emerald-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Agentia
        </motion.h1>
        <motion.div
          className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">What is Agentia?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Agentia is a cutting-edge multi-agent ecosystem where autonomous software components, each with its own
            natural language interface, collaborate to fulfill end-user requests. This innovative approach represents a
            paradigm shift in how AI-driven systems are designed and implemented.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gradient-to-br from-emerald-50 to-purple-50 rounded-lg p-6 shadow-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <feature.icon className="w-12 h-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">The Future of AI-Driven Development</h2>
          <p className="text-lg text-gray-700 mb-6">
            Agentia represents the future of AI-driven software development, enabling complex problem-solving through
            simple, language-based interactions. Experience the power of Agentia in our demo and see how it can
            revolutionize your approach to building intelligent systems.
          </p>
          <div className="flex justify-center">
            <motion.a
              href="/demo"
              className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-emerald-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Agentia Demo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

