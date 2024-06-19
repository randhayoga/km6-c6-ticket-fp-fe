import { format } from "date-fns";

import { Separator } from "@/components/ui/separator";
import { id } from "date-fns/locale";

const FlightDetail = ({ flight, adult, children, baby }) => {
  const priceAdult = flight?.price * adult || 0;
  const priceChildren = flight?.price * children || 0;
  const tax = 0.11 * (priceAdult + priceChildren);
  const totalPrice = priceAdult + priceChildren + tax;

  
  const formatTime = (time) => {
    return time
      ? format(new Date(time), "HH:mm", {
          locale: id,
        })
      : "";
  };

  const formatDate = (date) => {
    return date
      ? format(
          new Date(date),
          "dd MMM yyyy",
          {
            locale: id,
          }
        )
      : "";
  };

  return (
    <>
      <h1 className="font-bold tracking-wide text-lg mb-4">
        Detail Penerbangan
      </h1>
      {flight && (
        <div className="font-semibold">
          <section>
            <div className="flex w-full justify-between items-center tracking-wide">
              <p className="text-lg">
                {formatTime(flight?.departureTime)}
              </p>
              <p className="text-base text-color-primary">Keberangkatan</p>
            </div>
            <p className="font-normal">{formatDate(flight?.departureTime)}</p>
            <p className="font-medium">
              {flight?.departureAirport?.airportName} - {flight?.terminal}
            </p>
          </section>
          <Separator className="my-4" />
          <section className="flex w-full gap-2">
            <div className="flex w-6 justify-center items-center">
              <img src={flight?.airline?.image} className="w-6" />
            </div>
            <div className="flex-grow  tracking-wide">
              <p>
                {flight?.airline?.airlineName} - {flight?.flightClass}
              </p>
              <p className="mb-4">
                {flight?.flightCode?.replace(/([A-Za-z]+)(\d+)/, "$1 - $2")}
              </p>
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
            <div className="flex w-full justify-between items-center  tracking-wide">
              <p className="text-lg">
                {formatTime(flight?.arrivalTime)}
              </p>
              <p className="text-base text-color-primary">Kedatangan</p>
            </div>
            <p className="font-normal">{formatDate(flight?.arrivalTime)}</p>
            <p className="font-medium">{flight?.arrivalAirport?.airportName}</p>
          </section>
          <Separator className="my-4" />
          <section>
            <p className=" tracking-wide">Rincian Harga</p>
            <div className="flex w-full justify-between items-center">
              <p>{adult} {adult > 1 ? "Adults" : "Adult"}</p>
              <p>IDR {priceAdult.toLocaleString("id-ID")}</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <p>{children} {children > 1 ? "Children" : "Child"}</p>
              <p>IDR {priceChildren.toLocaleString("id-ID")}</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <p>{baby} {baby > 1 ? "Babies" : "Baby"}</p>
              <p>IDR 0</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <p>Tax</p>
              <p>IDR {tax.toLocaleString("id-ID")}</p>
            </div>
            <Separator className="my-4" />
            <section className=" tracking-wide">
              <div className="flex w-full justify-between items-center">
                <p>Total</p>
                <p className="text-xl font-bold text-color-primary">
                  IDR {totalPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </section>
          </section>
        </div>
      )}
    </>
  );
};

export default FlightDetail;
