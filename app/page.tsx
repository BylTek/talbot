import Header from "./components/ui/chat/header";
import ChatSection from "./components/chat-section";
import Footer from "./components/ui/layout/footer";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center md:pt-6 min-h-screen md:gap-10 px-6 pt-2 lg:px-24  
    bg-gradient-to-r from-slate-800 from-10% via-slate-900 via-30% to-black to-90% "
    >
      <Header />
      <ChatSection />
      <Footer />
    </main>
  );
}
