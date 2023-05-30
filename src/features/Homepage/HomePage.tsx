import Map from "@/ui/Map/Map";
import Navbar from "./Navbar/Navbar";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="h-screen w-screen relative">
        <div className="h-"></div>
        <Map />
      </div>
    </div>
  );
};

export default HomePage;
