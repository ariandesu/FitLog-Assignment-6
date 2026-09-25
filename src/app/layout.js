import './globals.css';
import { WorkoutProvider } from '@/context/WorkoutContext';

export const metadata = {
  title: 'FitLog',
  description: 'Dark, no-nonsense gym companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-white">
        <WorkoutProvider>
          {children}
        </WorkoutProvider>
      </body>
    </html>
  );
}
