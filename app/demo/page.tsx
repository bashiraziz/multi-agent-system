"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "../components/Navigation"
import { UserInterface } from "../components/UserInterface"
import { MultiAgentSystem } from "../components/MultiAgentSystem"
import { ChatDisplay } from "../components/ChatDisplay"
import { DetailedAgentAnimation } from "../components/DetailedAgentAnimation"
import { TechBackground } from "../components/TechBackground"

export default function Demo() {
  const [userRequest, setUserRequest] = useState("")
  const [agentResponses, setAgentResponses] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleUserRequest = (request: string) => {
    setUserRequest(request)
    setAgentResponses([])
    setIsLoading(true)
  }

  const handleAgentResponse = (response: string) => {
    setAgentResponses((prev) => [...prev, response])
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <TechBackground />
      <Navigation />
      <div className="container mx-auto p-4 relative z-10">
        <motion.h1
          className="text-4xl font-bold mb-4 text-center text-emerald-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Agentia Demo
        </motion.h1>
        <motion.p
          className="mb-4 text-center text-gray-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Experience the power of our multi-agent system. Enter a request in the interface on the right, and watch as
          the Synth Coordinator and specialized agents collaborate to provide a comprehensive response.
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Agent Interaction Visualization */}
          <motion.div
            className="lg:w-2/3 bg-white bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg p-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Agent Interaction Visualization</h2>
            <DetailedAgentAnimation />
          </motion.div>

          {/* Right Column: User Request and Agent Responses */}
          <motion.div
            className="lg:w-1/3 flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg p-4">
              <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Enter Your Request</h2>
              <UserInterface onSubmit={handleUserRequest} />
              <MultiAgentSystem userRequest={userRequest} onAgentResponse={handleAgentResponse} />
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    className="flex justify-center items-center my-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <svg
                      className="animate-spin h-10 w-10 text-emerald-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg p-4">
              <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Agent Responses</h2>
              <ChatDisplay responses={agentResponses} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

