import axios, { AxiosError } from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

interface SubmitRequestBody {
  user_query: string
}

interface PollRequestBody {
  job_id: string
}

interface ApiErrorResponse {
  error?: string
}

export const useSubmitCompletionRequest = (searchUrl: string) => {
  return useMutation({
    mutationFn: async (channelName: string) => {
      const response = await axios.post(searchUrl, {
        user_query: channelName,
      } satisfies SubmitRequestBody)

      return response.data
    },

    onError: (err: AxiosError<ApiErrorResponse>) => {
      if (err.response?.data?.error) {
        toast.error(
          "Quota exceeded. Please contact us to increase your limits."
        )
      }
    },
  })
}

export const usePollCompletionStatus = (
  pollUrl: string,
  jobId: string,
  queryInterval: number
) => {
  return useQuery({
    queryKey: ["completetionStatus", jobId],

    queryFn: async () => {
      const response = await axios.post(pollUrl, {
        job_id: jobId,
      } satisfies PollRequestBody)

      return response.data
    },

    enabled: Boolean(jobId),
    refetchInterval: queryInterval,
    retry: 1,
  })
}
