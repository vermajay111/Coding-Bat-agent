import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Home, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"

export default function Completion() {
  const handleAnother = () => {
    // Navigate to start of flow
    console.log("Start another submission")
  }

  const handleHome = () => {
    // Navigate home
    console.log("Go home")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-lg border-0 shadow-2xl">
        <CardContent className="flex flex-col items-center p-10 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <CheckCircle2 className="h-28 w-28 text-green-500" />
          </motion.div>

          <motion.h1
            className="mt-6 text-4xl font-bold"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Task Completed
          </motion.h1>

          <motion.p
            className="mt-3 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your submission was successfully processed.
          </motion.p>

          <motion.div
            className="mt-8 flex w-full flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button size="lg" className="flex-1" onClick={handleAnother}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Complete Another
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={handleHome}
            >
              <Home className="mr-2 h-4 w-4" />
              Main Page
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </main>
  )
}
