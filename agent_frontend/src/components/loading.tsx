import { CloudUpload } from "lucide-react"
import { motion } from "framer-motion"
import { Spinner } from "@/components/ui/spinner"

export default function LoadingScreen(): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
