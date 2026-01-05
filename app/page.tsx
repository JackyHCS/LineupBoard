import LineupHeader from './components/LineupHeader';
import LineupHero from './components/LineupHero';
import LineupSection from './components/LineupSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1419]">
      <LineupHeader/>
      <LineupHero/>
      <LineupSection/>
    </div>
  );
}
