"use client";
import dynamic from "next/dynamic";
import React from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const MaterialPieChart = () => {
    const data = [
        { machine: "MC-01", materials: 120 },
        { machine: "MC-02", materials: 80 },
        { machine: "MC-03", materials: 60 },
        { machine: "MC-04", materials: 40 },
    ];

    const series = data.map((d) => d.materials);
    const labels = data.map((d) => d.machine);

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "pie",
        },
        labels: labels,
        legend: {
            position: "bottom",
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Material per Machine</h2>
            <ReactApexChart options={options} series={series} type="pie" height={350} />
        </div>
    );
};

export default MaterialPieChart;
