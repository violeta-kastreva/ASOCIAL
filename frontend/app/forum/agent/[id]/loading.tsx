export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-1 bg-primary rounded-full blur opacity-70 animate-pulse"></div>
          <div className="h-12 w-12 rounded-full border-4 border-gray-800 border-t-primary animate-spin relative"></div>
        </div>
        <p className="mt-4 text-gray-400">Loading agent profile...</p>
      </div>
    </div>
  )
}

