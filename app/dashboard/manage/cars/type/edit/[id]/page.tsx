"use client"; // Đảm bảo mã này chạy ở phía client

import React, { useState, useEffect } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const EditType = ({ params }: { params: { id: string } }) => {
  const [typeName, setTypeName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch data từ API để lấy thông tin của Type dựa trên ID
    const fetchType = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/cars/type/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch type.");
        const type = await response.json();
        setTypeName(type.typeName); // Đặt giá trị của input
      } catch (err) {
        console.error(err);
        setError("Failed to load type.");
      }
    };

    if (params.id) fetchType();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/cars/type/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ typeName: typeName }),
      });

      if (response.ok) {
        alert("Type updated successfully!");
        setError(""); 
      } else {
        setError("Failed to update type.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">Edit Type</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="Type Name"
                type="text"
                placeholder="Please Enter Type Name!"
                customClasses="w-full mb-4.5"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
              />

              {error && <div className="mb-4 text-red-500">{error}</div>}

              <div className="mb-6"></div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditType;
