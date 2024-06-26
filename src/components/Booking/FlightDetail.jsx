import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Separator } from "@/components/ui/separator";
import FlightDetailLoading from "./FlightDetailLoading";

const FlightDetail = ({ flight, adult, children, baby, isLoading }) => {
  const priceAdult = flight?.price * adult || 0;
  const priceChildren = flight?.price * children || 0;
  const totalPrice = priceAdult + priceChildren;

  const formatTime = (time) => {
    return time
      ? format(new Date(time), "HH:mm", {
          locale: id,
        })
      : "";
  };

  const formatDate = (date) => {
    return date
      ? format(new Date(date), "dd MMMM yyyy", {
          locale: id,
        })
      : "";
  };

  return (
    <div className="font-semibold">
      {!isLoading ? (
        <>
          <section>
            <div className="flex w-full justify-between items-center ">
              <p className="text-lg">{formatTime(flight?.departureTime)}</p>
              <p className="text-base text-color-primary">Keberangkatan</p>
            </div>
            <p className="font-normal">{formatDate(flight?.departureTime)}</p>
            <p className="font-medium">
              {flight?.departureAirport?.airportName} - Terminal{" "}
              {flight?.terminal}
            </p>
          </section>
          <Separator className="my-4" />
          <section className="flex w-full gap-2">
            <div className="flex w-6 justify-center items-center">
              <img src={flight?.airline?.image} className="w-6" />
            </div>
            <div className="flex-grow  ">
              <p>
                {flight?.airline?.airlineName} -{" "}
                {flight.flightClass &&
                  flight?.flightClass
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
              </p>
              <p className="mb-4">{flight?.flightCode}</p>
              <p>Informasi:</p>
              {flight?.information?.split(", ").map((info, index) => (
                <p className="font-normal text-base" key={index}>
                  {info}
                </p>
              ))}
            </div>
          </section>
          <Separator className="my-4" />
          <section>
            <div className="flex w-full justify-between items-center  ">
              <p className="text-lg">{formatTime(flight?.arrivalTime)}</p>
              <p className="text-base text-color-primary">Kedatangan</p>
            </div>
            <p className="font-normal">{formatDate(flight?.arrivalTime)}</p>
            <p className="font-medium">{flight?.arrivalAirport?.airportName}</p>
          </section>
          <Separator className="my-4" />
          <section>
            <p>Rincian Harga</p>
            {adult > 0 && (
              <div className="flex w-full justify-between items-center font-normal">
                <p>
                  {adult} {adult > 1 ? "Adults" : "Adult"}
                </p>
                <p>IDR {priceAdult.toLocaleString("id-ID")}</p>
              </div>
            )}
            {children > 0 && (
              <div className="flex w-full justify-between items-center font-normal">
                <p>
                  {children} {children > 1 ? "Children" : "Child"}
                </p>
                <p>IDR {priceChildren.toLocaleString("id-ID")}</p>
              </div>
            )}
            {baby > 0 && (
              <div className="flex w-full justify-between items-center font-normal">
                <p>
                  {baby} {baby > 1 ? "Babies" : "Baby"}
                </p>
                <p>IDR 0</p>
              </div>
            )}
            <Separator className="my-4" />
            <section>
              <div className="flex w-full justify-between items-center">
                <p>Total</p>
                <p className="text-xl font-bold text-color-primary">
                  IDR {totalPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </section>
          </section>
        </>
      ) : (
        <FlightDetailLoading />
      )}
    </div>
  );
};

export default FlightDetail;
