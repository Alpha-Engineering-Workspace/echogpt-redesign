import "./globals.css";

export const metadata = {
  title: {
    default: "EchoGPT",
    template: "%s | EchoGPT",
  },

  description:
    "One intelligent workspace for multiple AI models.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}