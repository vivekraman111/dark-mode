import "./reset.css";
import "../content/shopping-list.css";

export const metadata = {
  title: "Shopping List",
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
