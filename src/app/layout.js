import "./reset.css";
import "../content/styles.css";

export const metadata = {
  title: "Blank template for react-content examples",
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
