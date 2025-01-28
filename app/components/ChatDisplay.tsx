"use client"

import { motion, AnimatePresence } from "framer-motion"
import { UserIcon, CaptainIcon, TechIcon, HealthIcon, DataIcon, APIIcon, FinanceIcon } from "./AgentIcons"

interface ChatDisplayProps {
  responses: string[]
}

export function ChatDisplay({ responses }: ChatDisplayProps) {
  const getAgentIcon = (agentName: string) => {
    switch (agentName) {
      case "Synth Coordinator":
        return <CaptainIcon className="w-6 h-6 text-green-500" />
      case "TechAgent":
        return <TechIcon className="w-6 h-6 text-purple-500" />
      case "HealthAgent":
        return <HealthIcon className="w-6 h-6 text-red-500" />
      case "DataAgent":
        return <DataIcon className="w-6 h-6 text-emerald-500" />
      case "APIAgent":
        return <APIIcon className="w-6 h-6 text-indigo-500" />
      case "FinanceAgent":
        return <FinanceIcon className="w-6 h-6 text-yellow-500" />
      default:
        return <UserIcon className="w-6 h-6 text-blue-500" />
    }
  }

  return (
    <div className="h-[calc(100vh-20rem)] overflow-y-auto">
      <AnimatePresence>
        {responses.map((response, index) => {
          const [agent, message] = response.split(": ", 2)
          return (
            <motion.div
              key={index}
              className="mb-4 p-3 bg-white bg-opacity-50 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-2">
                {getAgentIcon(agent)}
                <span className="ml-2 font-semibold">{agent}</span>
              </div>
              <p className="text-gray-700 text-sm">{message}</p>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

