
export default function GuidePage() {
  const [step, setStep] = useState(0)
  const showForm = step >= guideSteps.length
  const currentStep = guideSteps[step]

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <img
            src={currentStep.image}
            alt={currentStep.title}
            className="w-full rounded-lg border object-cover"
          />

          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold">{currentStep.title}</h2>

            <p className="mt-2 text-muted-foreground">{currentStep.caption}</p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep((prev) => prev - 1)}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              {step + 1} / {guideSteps.length}
            </span>

            <Button
              onClick={() => {
                if (step === guideSteps.length - 1) {
                  setStep(guideSteps.length)
                } else {
                  setStep((prev) => prev + 1)
                }
              }}
            >
              {step === guideSteps.length - 1 ? "Continue" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
