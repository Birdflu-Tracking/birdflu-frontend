import Map from "@/ui/Map/Map";
import Navbar from "./Navbar/Navbar";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="h-screen w-full">
        <Map />
      </div>
    </div>
  );
};

export default HomePage;
