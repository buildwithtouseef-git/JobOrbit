import { Link } from "react-router-dom";

export default function AuthFooter({
    text,
    linkText,
    to,
}) {
    return (
        <p className="mt-8 text-center text-sm text-gray-500">
            {text}

            <Link
                to={to}
                className="ml-1 font-semibold text-violet-600 hover:underline"
            >
                {linkText}
            </Link>
        </p>
    );
}