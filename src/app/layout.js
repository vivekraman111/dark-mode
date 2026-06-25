import "./globals.css";


export const metadata = {
  title: "Sticker Pad",
  description: "Prototype for the react-content design pattern",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
