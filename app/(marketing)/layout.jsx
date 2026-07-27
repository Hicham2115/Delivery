import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

export default function MarketingLayout({ children }) {
  return (
    <SmoothScroll>
      <Header />
      {children}
      <Footer />
    </SmoothScroll>
  );
}
