import LineupHeader from './components/LineupHeader';
import LineupHero from './components/LineupHero';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1419]">
      <LineupHeader />
      <LineupHero />
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Add your page content here */}
      </main>
    </div>
  );
}
