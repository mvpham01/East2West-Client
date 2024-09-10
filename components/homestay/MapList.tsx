import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point as OlPoint } from "ol/geom";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Style, Text, Fill, Stroke, Circle as CircleStyle } from "ol/style";
import { Extent } from "ol/extent";
import { getDistance } from "ol/sphere";
import { Point } from "geojson";
import { decodeWKB } from "@/utils/decodeWKB";
import Overlay from "ol/Overlay";

type Homestay = {
  homestayid: number;
  wardName: string;
  districtName: string;
  cityProvinceName: string;
  longitude: number;
  latitude: number;
  geom: string | null;
  structureId: number;
  userId: number | null;
  type: string;
  title: string;
  address: string;
  photos: string[];
  description: string;
  extraInfo: string;
  cleaningFee: number;
  isApproved: boolean;
  maxGuest: number;
  perkIds: number[];
  pricePerNight: number;
  instant: boolean;
  beds: number;
  bathroom: number;
  room: number | null;
  availability: HomestayAvailability[];
};

interface OpenLayersMapProps {
  homestays: Homestay[];
  radius: number | null;
  setRadius : (value: number | null) => void; 
}

const MapList: React.FC<OpenLayersMapProps> = ({ homestays, radius ,setRadius}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);

  const today = new Date().toISOString().split("T")[0];
  const [popup, setPopup] = useState<Overlay | null>(null);
  
  const coordinates = useMemo(() => {
     if (!homestays) return [];
    return homestays?.map((homestay) => {
      const geoJSON: Point = decodeWKB(homestay.geom ?? "");
      return { coordinates: geoJSON.coordinates as [number, number] , homestay  };
    });
  }, [homestays]);

  const vectorSourceRef = useRef<VectorSource>(new VectorSource());

  useEffect(() => {
    if (!mapRef.current || coordinates.length === 0) return;

    const newMap = new Map({
      target: mapRef.current!,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSourceRef.current,
          style: (feature) => {
            const text = feature.get("price") ?? 0;
            const price = `$${text}`;
            return [
              new Style({
                image: new CircleStyle({
                  radius: 25,
                  fill: new Fill({ color: "#fff" }),
                  stroke: new Stroke({ color: "#aaa", width: 1 }),
                }),
              }),
              new Style({
                text: new Text({
                  text: price,
                  offsetY: 0,
                  font: "bold 12px Arial",
                  fill: new Fill({ color: "#000" }),
                  backgroundFill: new Fill({ color: "transparent" }),
                  padding: [5, 8, 5, 8],
                  overflow: true,
                }),
              }),
            ];
          },
        }),
      ],
      view: new View({
        center: fromLonLat(coordinates[0].coordinates),
        zoom: 1,
      }),
    });

    const overlay = new Overlay({
      element: document.createElement("div"),
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -50],
    });
    newMap.addOverlay(overlay);
    setPopup(overlay);

    const closePopup = () => {
      const element = overlay.getElement();
      if (element) {
        element.style.display = "none";
      }
    };

    newMap.on("click", (event) => {
      const features = newMap.getFeaturesAtPixel(event.pixel);
      if (features.length > 0) {
        const feature = features[0];
        const homestay = feature.get("homestay") as Homestay;

        const coordinate = event.coordinate;
        overlay.setPosition(coordinate);
        const element = overlay.getElement();
        if (element) {
          element.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0,0,0,0.2);">
          <div style="
            width: 300px;
            height: 200px;
            position: relative;
            overflow: hidden;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          ">
            <img id="sliding-image" src="" alt="Sliding Image" style="
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: transform 0.5s ease;
            ">
            <button id="prev-slide" style="
              position: absolute;
              top: 50%;
              left: 10px;
              transform: translateY(-50%);
              background: rgba(0, 0, 0, 0.5);
              color: #fff;
              border: none;
              padding: 10px;
              cursor: pointer;
              font-size: 18px;
              z-index: 10;
            ">&#10094;</button>
            <button id="next-slide" style="
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              background: rgba(0, 0, 0, 0.5);
              color: #fff;
              border: none;
              padding: 10px;
              cursor: pointer;
              font-size: 18px;
              z-index: 10;
            ">&#10095;</button>
            <div class="dots" style="
              position: absolute;
              bottom: 10px;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
              gap: 5px;
              z-index: 10;
            ">
              <div id="dot-0" class="dot active" style="
                width: 10px;
                height: 10px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 50%;
                cursor: pointer;
              "></div>
              <div id="dot-1" class="dot" style="
                width: 10px;
                height: 10px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 50%;
                cursor: pointer;
              "></div>
              <div id="dot-2" class="dot" style="
                width: 10px;
                height: 10px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 50%;
                cursor: pointer;
              "></div>
            </div>
          </div>
          <h3>${homestay.title}</h3>
          <p>${homestay.address}</p>
          <p>Giá mỗi đêm: ${
            homestay.availability.find(
              (record) =>
                new Date(record.date).toISOString().split("T")[0] === today
            )?.pricepernight
          }₫</p>
          <p>Mô tả: ${homestay.description}</p>
          <button id="popup-close">Đóng</button>
        </div>
      `;

          let currentIndex = 0;
          const images: string[] = homestay.photos;

          const updateDots = (): void => {
            const dots = document.querySelectorAll(".dot");

            dots.forEach((dot: Element, index: number) => {
              const dotElement = dot as HTMLElement;

              dotElement.classList.toggle("active", index === currentIndex);
              dotElement.style.background =
                index === currentIndex ? "#fff" : "rgba(0, 0, 0, 0.5)";
            });
          };

          const slideImage = (direction: number): void => {
            currentIndex =
              (currentIndex + direction + images.length) % images.length;
            const slidingImage = document.getElementById(
              "sliding-image"
            ) as HTMLImageElement;
            if (slidingImage) {
              slidingImage.src = images[currentIndex];
              updateDots();
            }
          };

          const goToSlide = (index: number): void => {
            currentIndex = index;
            const slidingImage = document.getElementById(
              "sliding-image"
            ) as HTMLImageElement;
            if (slidingImage) {
              slidingImage.src = images[currentIndex];
              updateDots();
            }
          };

          document
            .getElementById("prev-slide")
            ?.addEventListener("click", () => slideImage(-1));
          document
            .getElementById("next-slide")
            ?.addEventListener("click", () => slideImage(1));

          // Attach event listeners to the dots
          document
            .getElementById("dot-0")
            ?.addEventListener("click", () => goToSlide(0));
          document
            .getElementById("dot-1")
            ?.addEventListener("click", () => goToSlide(1));
          document
            .getElementById("dot-2")
            ?.addEventListener("click", () => goToSlide(2));

          const closeButton = element.querySelector("#popup-close");
          if (closeButton) {
            closeButton.removeEventListener("click", closePopup); // Remove previous event listeners
            closeButton.addEventListener("click", closePopup); // Add new event listener
          }
          element.style.display = "block"; // Ensure the popup is visible
        }
      }
    });

    setMap(newMap);

    return () => {
      newMap.setTarget(undefined);
      if (overlay) newMap.removeOverlay(overlay);
    };
  }, [coordinates]);

  useEffect(() => {
    if (!map || !mapRef.current) return;

    vectorSourceRef.current.clear();

    const features = coordinates.map(
      ({ coordinates: [longitude, latitude], homestay }) =>
        new Feature({
          geometry: new OlPoint(fromLonLat([longitude, latitude])),
          price: homestay.availability.find(
            (record) =>
              new Date(record.date).toISOString().split("T")[0] === today
          )?.pricepernight,
          homestay,
        })
    );

    vectorSourceRef.current.addFeatures(features);

    if (coordinates.length > 0) {
      const extent: Extent = vectorSourceRef.current.getExtent();
      map.getView().fit(extent, { padding: [75, 75, 75, 75] });
      map.getView().setZoom(6);
    }
  }, [coordinates, map]);

  const calculateRadius = useCallback(() => {
    if (!map) return;

    const view = map.getView();
    const center = view.getCenter();
    if (center) {
      const lonLatCenter = toLonLat(center);
      const extent = view.calculateExtent();
      const bottomLeft = toLonLat([extent[0], extent[1]]);
      const distance = getDistance(lonLatCenter, bottomLeft);

      setRadius(
        radius !== distance ? distance : radius
      );
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.on("moveend", calculateRadius);
      calculateRadius();
    }

    return () => {
      if (map) map.un("moveend", calculateRadius);
    };
  }, [map, calculateRadius]);

  return (
    <>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </>
  );
};

export default MapList;
