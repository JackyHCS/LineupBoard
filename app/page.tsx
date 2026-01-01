import Header from './components/LineupHeader';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1419]">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-white text-4xl font-bold">Welcome to LineupBoard</h1>
        {/* Add your page content here */}
      </main>
    </div>
  );
}
