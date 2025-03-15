import { AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ErrorMessageProps {
    message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20"
                >
                    <AlertCircle className="h-4 w-4" />
                    <span>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    )
} 