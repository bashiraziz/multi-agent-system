"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UserIcon, CaptainIcon, TechIcon, HealthIcon, DataIcon, APIIcon, FinanceIcon } from "./AgentIcons"

interface AgentMessage {
  from: string
  to: string
  message: string
  step: number
}

interface AgentCommunicationFlowProps {
  messages: AgentMessage[]
}

export function AgentCommunicationFlow({ messages }: AgentCommunicationFlowProps) {
  const [visibleMessages, setVisibleMessages] = useState<AgentMessage[]>([])
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (messages.length > visibleMessages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages(messages.slice(0, visibleMessages.length + 1))
        setCurrentStep(messages[visibleMessages.length].step)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [messages, visibleMessages])

  const agents = [
    { name: "User", icon: UserIcon, color: "bg-yellow-500" },
    { name: "Synth Coordinator", icon: CaptainIcon, color: "bg-emerald-600" },
    { name: "TechAgent", icon: TechIcon, color: "bg-purple-600" },
    { name: "APIAgent", icon: APIIcon, color: "bg-indigo-600" },
    { name: "DataAgent", icon: DataIcon, color: "bg-blue-600" },
    { name: "HealthAgent", icon: HealthIcon, color: "bg-red-600" },
    { name: "FinanceAgent", icon: FinanceIcon, color: "bg-green-600" },
  ]

  const steps = [
    "User sends a request to the Synth Coordinator.",
    "Synth Coordinator delegates tasks to specialized agents.",
    "Specialized agents collaborate and share information.",
    "Specialized agents send responses back to the Synth Coordinator.",
    "Synth Coordinator reviews and improves the responses.",
    "Synth Coordinator sends the final response back to the user.",
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 p-2 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Current Step:</h3>
        <p className="text-sm">{steps[currentStep]}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.name}
            className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`w-6 h-6 ${agent.color} rounded-full flex items-center justify-center text-white mr-2`}>
              <agent.icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold">{agent.name}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex-grow overflow-y-auto">
        <AnimatePresence>
          {visibleMessages.map((msg, index) => {
            const fromAgent = agents.find((a) => a.name === msg.from)
            const toAgent = agents.find((a) => a.name === msg.to)

            return (
              <motion.div
                key={index}
                className="mb-2 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-1">
                  <div
                    className={`w-6 h-6 ${fromAgent?.color} rounded-full flex items-center justify-center text-white mr-1`}
                  >
                    {fromAgent && <fromAgent.icon className="w-4 h-4" />}
                  </div>
                  <div
                    className={`w-6 h-6 ${toAgent?.color} rounded-full flex items-center justify-center text-white ml-1`}
                  >
                    {toAgent && <toAgent.icon className="w-4 h-4" />}
                  </div>
                </div>
                <div className="bg-white bg-opacity-50 rounded p-2">
                  <p className="font-semibold">
                    {msg.from} → {msg.to}
                  </p>
                  <p>{msg.message}</p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

