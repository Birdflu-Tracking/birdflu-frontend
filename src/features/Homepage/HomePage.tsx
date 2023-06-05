import Map from "@/ui/Map/Map";
import Navbar from "./Navbar/Navbar";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
const HomePage = () => {
  const [mapBox, setMapBox] = useState<any | undefined>(undefined);
  const [liveData, setLiveData] = useState({
    affectedFarmers: 0,
    affectedSellers: 0,
    activeCases: 0,
  });
  useEffect(() => {
    if (mapBox) {
      (async () => {
        try {
          let response = await axios.get(
            `http://localhost:8080/open/infected-stakeholders`
          );
          let res2 = await axios.get(
            `http://localhost:8080/open/active-cases`
          );
          // Create a new marker.
          setLiveData((prev) => ({
            activeCases:res2.data.activeCases.count,
            affectedFarmers: response.data.infectedUsers.farmer.length,
            affectedSellers: response.data.infectedUsers.seller.length,
          }));
          Object.keys(response.data.infectedUsers).forEach((key) => {
            for (const user of response.data.infectedUsers[key]) {
              const el = document.createElement("div");
              const icon = document.createElement("div");
              console.log(user);
              el.className = "marker";
              icon.style.backgroundImage = `url(/images/${
                user.type == "seller"
                  ? "danger-marker.png"
                  : "indirect-danger-marker.png"
              })`;
              icon.style.backgroundRepeat = "no-repeat";
              icon.style.width = `100px`;
              icon.style.height = `100px`;
              icon.style.backgroundSize = "100%";

              // icon.style.backgroundColor = "blue";
              el.appendChild(icon);
              const marker = new mapboxgl.Marker(el)
                .setLngLat([ user.longitude,user.latitude])
                .addTo(mapBox);
            }
          });
          //creates a marker to display saafwater selected device location
          // const marker1 = new mapboxgl.Marker({ color: "blue" })
          //   .setLngLat([data.long, data.lat])
          //   .addTo(map.current);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [mapBox]);
  return (
    <div>
      <Navbar />
      <div className="h-screen w-full relative">
        <div className="h-full w-full absolute flex justify-center">
          <div className="absolute top-16 m-auto h-fit w-1/3 bg-white z-10  rounded-xl shadow-md p-5 space-y-4">
            <div className="space-y-2">
              <div className="w-full bg-secondary rounded-md p-2 flex items-center gap-2">
                <Icon
                  icon="ic:outline-search"
                  height={20}
                  className="text-gray-600"
                />
                <input
                  type="text"
                  className="bg-transparent  outline-none italic"
                  placeholder="Search Location"
                />
              </div>
              <div className="flex gap-2">
                <h5 className="bg-primary px-3 py-1 text-white rounded-full">
                  Poultry Shops
                </h5>
                <h5 className="bg-primary px-3 py-1 text-white rounded-full">
                  Farms
                </h5>
                <h5 className="bg-primary px-3 py-1 text-white rounded-full">
                  Distributors
                </h5>
              </div>
            </div>
            {/* list */}
            <div className="space-y-1">
              <h1 className="font-medium text-base ">Manoj Chicken Shop</h1>
              <p className=" text-sm text-gray-500">
                Near blue dart office, khorlim,mapusa goa
              </p>
            </div>
          </div>
          <div className="absolute top-16 left-10 z-10 w-fit bg-white/50 rounded-2xl backdrop-blur-md shadow-lg p-5 space-y-2 min-w-[250px] h-fit">
            <h1 className="font-medium text-2xl text-gray-600">Index</h1>

            <div className="flex items-center gap-2 font-medium text-sm text-gray-500">
              <Image
                src={"/images/danger-marker.png"}
                alt="test"
                height={50}
                width={50}
              />{" "}
              <p>Direct Contact</p>
            </div>
            <div className="flex items-center gap-2 font-medium text-sm text-gray-500">
              <Image
                src={"/images/indirect-danger-marker.png"}
                alt="test"
                height={50}
                width={50}
              />{" "}
              <p>Indirect Contact</p>
            </div>
          </div>
          <div className="fixed  z-10 bottom-10 flex gap-10">
            <div className="h-fit w-fit bg-white/50 rounded-2xl backdrop-blur-md shadow-lg p-5 space-y-2 min-w-[250px]">
              <h1 className="text-2xl font-medium text-gray-500">
                Active Cases
              </h1>
              <div className="flex justify-between items-center">
                <h1 className="text-6xl text-primary font-bold">{liveData.activeCases}</h1>
                <Icon
                  icon="mingcute:alert-fill"
                  height={50}
                  className="text-gray-500"
                />
              </div>
            </div>
            <div className="h-fit w-fit bg-white/50 rounded-2xl backdrop-blur-md shadow-lg p-5 space-y-2 min-w-[250px]">
              <h1 className="text-2xl font-medium text-gray-500">
                Affected Poultry shop
              </h1>
              <div className="flex justify-between items-center">
                <h1 className="text-6xl text-primary font-bold">{liveData.affectedSellers}</h1>
                <Icon
                  icon="ic:twotone-store-mall-directory"
                  height={50}
                  className="text-gray-500"
                />
              </div>
            </div>
            <div className="h-fit w-fit bg-white/50 rounded-2xl backdrop-blur-md shadow-lg p-5 space-y-2 min-w-[250px]">
              <h1 className="text-2xl font-medium text-gray-500">
                Affected Farmer
              </h1>
              <div className="flex justify-between items-center">
                <h1 className="text-6xl text-primary font-bold">{liveData.affectedFarmers}</h1>
                <Icon
                  icon="openmoji:farmer-light-skin-tone"
                  height={50}
                  className="text-gray-500 grayscale"
                />
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="absolute h-full w-full">
          <Map setMapBox={(map) => setMapBox(map)} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
