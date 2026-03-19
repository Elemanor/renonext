import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ChatWidget } from '@/components/chat/chat-widget';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
