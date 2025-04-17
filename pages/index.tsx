import ParkingSpaceManager from "./create-parking-space";
import CreateVehicle from "./create-vehicle-page"
import ParkingManager from "./manage-parkinglot";

export default function Home() {

  return (
    <div>
      Test text
        <CreateVehicle />
        <br/>
        {/* <ParkingSpaceManager /> */}
        <br/>
        {/* <ParkingManager /> */}
    </div>
  );
}