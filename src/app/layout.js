import './globals.css';
import { WorkoutProvider } from '@/context/WorkoutContext';
import { ToastProvider } from '@/components/Toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'FitLog',
  description: 'Dark, no-nonsense gym companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-white">
        <ToastProvider>
          <WorkoutProvider>
            <Navbar />
            <main className="flex-1 pt-[67px]">{children}</main>
            <Footer />
          </WorkoutProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
