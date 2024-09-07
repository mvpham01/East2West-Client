import Image from "next/image";

<<<<<<< HEAD
const CardSearch = ({ tourPackage }) => {
=======
const CardSearch = ({tourPackage} : any) => {
>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="w-full h-50">
        <Image
          src={`/${tourPackage.thumbnail}`}
          alt={tourPackage.title}
          height={300}
          width={300}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div>
        <div className="p-4 ">
          <div className="border-b">
            <div className="flex items-center justify-between ">
              <div className="text-base font-extrabold">
                {tourPackage.title}
              </div>
<<<<<<< HEAD
              <div className="border rounded-md border-blue-600 text-blue-600 px-[5px] py-[3px] text-xs">
                {tourPackage.groupsize} People
=======
              <div className="flex items-center gap-1 mt-1 mb-2">
                <span className="text-sm">2N Hanoi</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                    />
                  </svg>
                </span>
                <span className="text-sm">2N HoChiMinh</span>
              </div>
            </div>
            <ul className="grid grid-cols-2 list-disc p-4 ">
              <li className="text-gray-6">data test</li>
              <li className="text-gray-6">data test</li>
              <li className="text-gray-6">data test</li>
              <li className="text-gray-6">data test</li>
              <li className="text-gray-6">data test</li>
              <li className="text-gray-6">data test</li>
            </ul>
            <div className="flex border border-[#e5e5e5] items-center justify-between p-4 bg-[#f9f9f9] rounded-lg">
              <p className="text-[#4a4a4a">some thing</p>
              <div className="flex items-center">
                <span className="text-black font-bold text-lg">$51,588</span>
                <p>/Person</p>
>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1 mb-2">
              <span className="text-sm">{tourPackage.bookinghold} Hold</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                  />
                </svg>
              </span>
              <span className="text-sm">{tourPackage.bookingchange} Change</span>
            </div>
          </div>
          <ul className="grid grid-cols-2 list-disc p-4 ">
            {tourPackage.itineraries.map((itinerary, index) => (
              <li key={index} className="text-gray-6">
                {itinerary.accommodations[0].accommodationname}
              </li>
            ))}
          </ul>
          <div className="flex border border-[#e5e5e5] items-center justify-between p-4 bg-[#f9f9f9] rounded-lg">
            <p className="text-[#4a4a4a]">Price Reduced: {tourPackage.pricereduce}</p>
            <div className="flex items-center">
              <span className="text-black font-bold text-lg">${tourPackage.price}</span>
              <p>/Person</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
}

>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018

export default CardSearch;