import clsx from "clsx";

const variants = {
    primary: "auth-primary-btn",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-900",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline: "border border-cyan-400 text-cyan-500 hover:bg-cyan-50",
};

export default function Button({
    children,
    variant = "primary",
    className,
    loading = false,
    ...props
}) {
    return (
        <button
            className={clsx(
                "disabled:cursor-not-allowed disabled:opacity-50",
                variants[variant],
                className
            )}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
}
