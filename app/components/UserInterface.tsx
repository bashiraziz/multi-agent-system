"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface UserInterfaceProps {
  onSubmit: (request: string) => void
}

export function UserInterface({ onSubmit }: UserInterfaceProps) {
  const [request, setRequest] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (request.trim()) {
      onSubmit(request)
      setRequest("")
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col space-y-2">
        <Input
          type="text"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="Enter your request..."
          className="w-full bg-white bg-opacity-50 backdrop-blur-sm"
        />
        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
          <Send className="mr-2 h-4 w-4" /> Submit
        </Button>
      </div>
    </motion.form>
  )
}

