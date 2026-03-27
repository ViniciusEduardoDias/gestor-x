"use client"

import { useEffect } from "react"

type Props = {
    message: string
    show: boolean
    onClose: () => void
}

export default function Toast({ message, show, onClose }: Props) {

    useEffect(() => {
        if (!show) return

        const timer = setTimeout(() => {
            onClose()
        }, 3000)

        return () => clearTimeout(timer)
    }, [show, onClose])

    if (!show) return null

    return (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
            {message}
        </div>
    )
}