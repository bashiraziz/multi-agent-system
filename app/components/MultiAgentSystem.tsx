"use client"

import { useState, useEffect } from "react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface MultiAgentSystemProps {
  userRequest: string
  onAgentResponse: (response: string) => void
}

export function MultiAgentSystem({ userRequest, onAgentResponse }: MultiAgentSystemProps) {
  const [specialistResponses, setSpecialistResponses] = useState<string[]>([])

  const specialists = [
    { name: "TechAgent", expertise: "technology and programming" },
    { name: "HealthAgent", expertise: "health and medicine" },
    { name: "DataAgent", expertise: "database management and queries" },
    { name: "APIAgent", expertise: "external API integration" },
  ]

  useEffect(() => {
    if (userRequest) {
      handleUserRequest()
    }
  }, [userRequest])

  const handleUserRequest = async () => {
    onAgentResponse(
      `CaptainAgent: Received user request: "${userRequest}". Analyzing and delegating to specialist agents.`,
    )

    const specialistPromises = specialists.map((specialist) =>
      generateSpecialistResponse(specialist.name, specialist.expertise, userRequest),
    )

    const responses = await Promise.all(specialistPromises)
    setSpecialistResponses(responses)

    responses.forEach((response, index) => {
      onAgentResponse(`${specialists[index].name}: ${response}`)
    })

    const consolidatedResponse = await generateConsolidatedResponse(responses)
    onAgentResponse(`CaptainAgent: Consolidating responses and polishing the final answer.`)

    const polishedResponse = await generatePolishedResponse(consolidatedResponse)
    onAgentResponse(`CaptainAgent: ${polishedResponse}`)
  }

  const generateSpecialistResponse = async (name: string, expertise: string, request: string) => {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are a ${expertise} specialist named ${name}. Respond to this request: "${request}". Keep your response concise and relevant to your expertise.`,
    })
    return text
  }

  const generateConsolidatedResponse = async (specialistResponses: string[]) => {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are the CaptainAgent responsible for consolidating specialist responses. Review and compile these specialist responses into a cohesive response:
        ${specialistResponses.join("\n")}
        
        Ensure the response addresses all relevant points from the specialists and provides a clear answer to the user's request.`,
    })
    return text
  }

  const generatePolishedResponse = async (consolidatedResponse: string) => {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are the CaptainAgent responsible for the final review and polishing of the response. Review this consolidated response:

        ${consolidatedResponse}

        Your tasks:
        1. Ensure the response is well-structured and easy to understand.
        2. Add any missing information or context that might be helpful.
        3. Remove any redundancies or irrelevant information.
        4. Improve the overall clarity and coherence of the response.
        5. Double-check that the response fully addresses the user's original request.

        Provide the final, polished response that will be sent to the user.`,
    })
    return text
  }

  return null // This component doesn't render anything directly
}

