"use client"

import { useState, useEffect } from "react"
import { motion} from "framer-motion"
import { UserIcon, CaptainIcon, TechIcon, HealthIcon, DataIcon, APIIcon, FinanceIcon } from "./AgentIcons"

export function DetailedAgentAnimation() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % 6)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const agents = [
    { name: "TechAgent", Icon: TechIcon, color: "#9333ea" },
    { name: "APIAgent", Icon: APIIcon, color: "#6366f1" },
    { name: "DataAgent", Icon: DataIcon, color: "#3b82f6" },
    { name: "HealthAgent", Icon: HealthIcon, color: "#ef4444" },
    { name: "FinanceAgent", Icon: FinanceIcon, color: "#10b981" },
  ]

  // Calculate viewBox dimensions to ensure all elements are visible
  const viewBoxWidth = 1200 // Increased width to accommodate horizontal gap
  const viewBoxHeight = 1000
  const centerX = viewBoxWidth / 2 + 100 // Shifted center to the right
  const centerY = viewBoxHeight / 2 - 50
  const radius = 280
  const captainX = centerX
  const captainY = centerY
  const userX = centerX - 400 // Positioned User to the left
  const userY = centerY - 100 // Slightly higher than Synth Coordinator

  // Function to calculate agent position
  const getAgentPosition = (index: number) => {
    let angle = 0
    let adjustedRadius = radius

    switch (agents[index].name) {
      case "TechAgent":
        angle = Math.PI / 2 // Below Synth Coordinator
        adjustedRadius = radius * 1.2
        break
      case "APIAgent":
        angle = Math.PI / 4 // Top-right
        break
      case "DataAgent":
        angle = (3 * Math.PI) / 4 // Bottom-right
        break
      case "HealthAgent":
        angle = (5 * Math.PI) / 4 // Bottom-left
        break
      case "FinanceAgent":
        angle = (7 * Math.PI) / 4 // Top-left
        break
    }

    const x = captainX + Math.cos(angle) * adjustedRadius
    const y = captainY + Math.sin(angle) * adjustedRadius
    return { x, y, angle }
  }

  return (
    <div className="relative h-[50rem] rounded-lg mb-6 overflow-hidden">
      <div className="absolute top-4 left-4 right-4 bg-opacity-10 backdrop-blur-sm bg-white p-4 rounded-lg shadow-md z-10">
        <h3 className="font-semibold mb-2">Current Step:</h3>
        <p>
          {step === 0 && "1. User sends a request to the Synth Coordinator."}
          {step === 1 && "2. Synth Coordinator delegates tasks to specialized agents."}
          {step === 2 && "3. Specialized agents collaborate and share information."}
          {step === 3 && "4. Specialized agents send responses back to the Synth Coordinator."}
          {step === 4 && "5. Synth Coordinator reviews and improves the responses."}
          {step === 5 && "6. Synth Coordinator sends the final response back to the user."}
        </p>
      </div>
      <svg width="100%" height="100%" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} className="absolute inset-0">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
          </marker>
        </defs>

        {/* Background circle for Synth Coordinator to ensure full visibility */}
        <circle cx={captainX} cy={captainY} r="52" fill="white" />

        {/* User */}
        <g transform={`translate(${userX}, ${userY})`}>
          <circle r="45" fill="#fbbf24" />
          <foreignObject x="-28" y="-28" width="56" height="56">
            <div className="w-full h-full flex items-center justify-center">
              <UserIcon className="w-14 h-14 text-white" />
            </div>
          </foreignObject>
          <text x="0" y="70" textAnchor="middle" className="text-lg font-semibold">
            User
          </text>
        </g>

        {/* Synth Coordinator */}
        <g transform={`translate(${captainX}, ${captainY})`}>
          <circle r="50" fill="#10b981" />
          <foreignObject x="-40" y="-40" width="80" height="80">
            <div className="w-full h-full flex items-center justify-center">
              <CaptainIcon className="w-20 h-20 text-white" />
            </div>
          </foreignObject>
          <text x="0" y="80" textAnchor="middle" className="text-lg font-semibold">
            Synth Coordinator
          </text>
        </g>

        {/* Specialist Agents */}
        {agents.map((agent, index) => {
          const { x, y } = getAgentPosition(index)
          return (
            <g key={agent.name} transform={`translate(${x}, ${y})`}>
              <circle r="45" fill={agent.color} />
              <foreignObject x="-28" y="-28" width="56" height="56">
                <div className="w-full h-full flex items-center justify-center">
                  <agent.Icon className="w-14 h-14 text-white" />
                </div>
              </foreignObject>
              <text x="0" y="70" textAnchor="middle" className="text-lg font-semibold">
                {agent.name}
              </text>
            </g>
          )
        })}

        {/* Animated paths */}
        <AnimatedPath
          d={`M ${userX + 45} ${userY} C ${userX + 200} ${userY - 50}, ${captainX - 200} ${captainY - 50}, ${captainX - 55} ${captainY}`}
          active={step === 0 || step === 5}
          duration={1}
        />
        {agents.map((_, index) => {
          const { x, y } = getAgentPosition(index)
          return (
            <AnimatedPath
              key={`captain-to-agent-${index}`}
              d={`M ${captainX} ${captainY} L ${x} ${y}`}
              active={step === 1}
              duration={0.5}
              delay={index * 0.2}
            />
          )
        })}
        {agents.map((_, index) => {
          const { x: x1, y: y1 } = getAgentPosition(index)
          const { x: x2, y: y2 } = getAgentPosition((index + 1) % agents.length)
          return (
            <AnimatedPath
              key={`agent-to-agent-${index}`}
              d={`M ${x1} ${y1} Q ${captainX} ${captainY}, ${x2} ${y2}`}
              active={step === 2}
              duration={0.5}
              delay={index * 0.2}
            />
          )
        })}
        {agents.map((_, index) => {
          const { x, y } = getAgentPosition(index)
          return (
            <AnimatedPath
              key={`agent-to-captain-${index}`}
              d={`M ${x} ${y} L ${captainX} ${captainY}`}
              active={step === 3}
              duration={0.5}
              delay={index * 0.2}
            />
          )
        })}
        <AnimatedPath
          d={`M ${captainX} ${captainY} A 30 30 0 1 1 ${captainX + 60} ${captainY} A 30 30 0 1 1 ${captainX} ${captainY}`}
          active={step === 4}
          duration={2}
        />
        <AnimatedPath
          d={`M ${captainX + 55} ${captainY} C ${captainX + 200} ${captainY - 50}, ${userX + 200} ${userY - 50}, ${userX + 45} ${userY}`}
          active={step === 5}
          duration={1}
        />
      </svg>
    </div>
  )
}

interface AnimatedPathProps {
  d: string
  active: boolean
  duration: number
  delay?: number
}

function AnimatedPath({ d, active, duration, delay = 0 }: AnimatedPathProps) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#4b5563"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: active ? 1 : 0 }}
      transition={{ duration, delay }}
      markerEnd="url(#arrowhead)"
    />
  )
}

