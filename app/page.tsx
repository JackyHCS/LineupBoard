import LineupHeader from './components/LineupHeader';
import LineupHero from './components/LineupHero';
import LineupFilter from './components/LineupFilter';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1419]">
      <LineupHeader/>
      <LineupHero/>
      <LineupFilter/>
    </div>
  );
}
