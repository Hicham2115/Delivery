import { Geist_Mono, Montserrat, Playfair_Display } from "next/font/google";
import { SplashScreen } from "@/components/layout/splash-screen";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "SwiftWay — Livrer la Confiance",
  description:
    "Plateforme premium de gestion de livraisons. Créez un compte, passez des commandes de livraison et suivez-les en temps réel.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`dark ${montserrat.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <QueryProvider>
          <SplashScreen />
          {children}
          <Toaster position="top-center" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
