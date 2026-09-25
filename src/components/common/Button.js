import Link from "next/link";

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyle =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition";

  const variants = {
    primary: "bg-[#6857f5] text-white hover:bg-[#5746e5]",

    secondary: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",

    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };

  const classes = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
