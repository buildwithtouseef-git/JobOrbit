import { AlertCircle } from "lucide-react";

export default function ErrorMessage({
    message,
}) {
    if (!message) return null;

    return (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle size={18} />
            <span>{message}</span>
        </div>
    );
}