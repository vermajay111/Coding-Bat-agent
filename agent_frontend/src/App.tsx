import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function App() {
  const [email, setEmail] = useState("")
  const [jsSessionId, setJsSessionId] = useState("")
  const [problemId, setProblemId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log({
      email,
      jsSessionId,
      problemId,
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Submit Details</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="text"
              placeholder="JSESSIONID"
              value={jsSessionId}
              onChange={(e) => setJsSessionId(e.target.value)}
              required
            />

            <Input
              type="text"
              placeholder="Problem ID"
              value={problemId}
              onChange={(e) => setProblemId(e.target.value)}
              required
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
