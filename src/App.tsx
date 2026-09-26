import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Overview from "./components/Overview";
import DCFSection from "./components/DCFSection";
import WACCAndSensitivity from "./components/WACCAndSensitivity";
import HousingSection from "./components/HousingSection";
import ImmigrationSection from "./components/ImmigrationSection";
import PolicySection from "./components/PolicySection";
import ScenarioSection from "./components/ScenarioSection";
import ConclusionSection from "./components/ConclusionSection";
import MethodologySection from "./components/MethodologySection";

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Nav />
      <Hero />
      <Overview />
      <DCFSection />
      <WACCAndSensitivity />
      <HousingSection />
      <ImmigrationSection />
      <PolicySection />
      <ScenarioSection />
      <ConclusionSection />
      <MethodologySection />
    </div>
  );
}
