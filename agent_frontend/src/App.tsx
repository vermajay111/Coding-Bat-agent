import { useState, useEffect } from "react"
import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudUpload, CheckCircle2, Home, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"
import { Spinner } from "@/components/ui/spinner"

interface SubmitRequestBody {
  email: string
  js_sessionid: string
  start_id: string
}

interface PollRequestBody {
  job_id: string
}

export default function App() {
  const [email, setEmail] = useState("")
  const [jsSessionId, setJsSessionId] = useState("")
  const [problemId, setProblemId] = useState("")

  const submissionEndpoint = "http://127.0.0.1:8000/"
  const pollingEndpoint = "http://127.0.0.1:8000/check_status/"

  const [jobId, setJobId] = useState("")
  const [step, setStep] = useState<"form" | "loading" | "complete">("form")

  const submitMutation = useMutation({
    mutationFn: async (payload: SubmitRequestBody) => {
      const response = await axios.post(submissionEndpoint, payload)
      return response.data
    },

    onSuccess: (data) => {
      if (data && data.task_id) {
        setJobId(data.task_id)
        setStep("loading")
      } else {
        toast.error("Submission succeeded, but no Job ID was returned.")
      }
    },

    onError: () => {
      toast.error("Error submitting request.")
    },
  })

  const pollQuery = useQuery({
    queryKey: ["completionStatus", jobId],

    queryFn: async () => {
      const response = await axios.post(pollingEndpoint, {
        job_id: jobId,
      } satisfies PollRequestBody)

      return response.data
    },

    enabled: step === "loading" && Boolean(jobId),

    refetchInterval: (queryOrData: any) => {
      const data = queryOrData?.state?.data ?? queryOrData
      if (data?.status === "completed") return false
      if (data?.status === "failed") return false
      return 3000
    },

    retry: false,
  })

  useEffect(() => {
    console.log(pollQuery.data)
    if (pollQuery.data?.status === "completed") {
      setStep("complete")
      toast.success("Processing completed!")
    } else if (pollQuery.data?.status === "failed") {
      toast.error("The job failed on the server. Likely due to incorrect information")
      setStep("form")
      setJobId("")
    }
  }, [pollQuery.data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    submitMutation.mutate({
      email,
      js_sessionid: jsSessionId,
      start_id: problemId,
    })
  }

  const resetFlow = () => {
    setEmail("")
    setJsSessionId("")
    setProblemId("")
    setJobId("")
    setStep("form")
  }

  if (step === "complete") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-lg border-0 shadow-2xl">
          <CardContent className="flex flex-col items-center p-10 text-center">
            <CheckCircle2 className="h-28 w-28 text-green-500" />

            <h1 className="mt-6 text-4xl font-bold">Solved All Problems!</h1>

            <p className="mt-3 text-muted-foreground">
              We solved all the problems in the section you gave us.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1" onClick={resetFlow}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Complete Another
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={resetFlow}
              >
                <Home className="mr-2 h-4 w-4" />
                Main Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (step === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-2xl border bg-white p-8 text-center shadow-lg"
        >
          <CloudUpload className="h-16 w-16 animate-bounce text-gray-700" />

          <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>

          <p className="text-gray-600">
            Please wait while we process your request.
          </p>

          <Spinner className="h-12 w-12 text-gray-700" />

          <p className="text-sm text-gray-400">This may take a few moments.</p>
        </motion.div>
      </main>
    )
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

            <Button
              type="submit"
              className="w-full"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
