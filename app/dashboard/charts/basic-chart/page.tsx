import BasicChart from "@/components/Charts/BasicChart";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";




const BasicChartPage: React.FC = () => {
  return (
    <>
    <DefaultLayout>
      <Breadcrumb pageName="Basic Chart" />

      <BasicChart />
   
    </DefaultLayout>
    </>
    
  );
};

export default BasicChartPage;
