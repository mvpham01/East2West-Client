import Image from "next/image";


type BannerProps = {
    url : string
}

export default function Banner({ url }: BannerProps) {
  return (
    <>
      <div
        className={`w-full flex justify-center items-center h-70 ${
          url === "/banner/homestay_banner.jpeg" ||
          url === "/banner/car_banner.jpeg"
            ? "mt-19"
            : ""
        } ${
          url === "/banner/tour_banner.jpeg"
            ? "mt-27"
            : ""
        }    relative`}
      >
        <Image
          src={url}
          alt=""
          width={2400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
}