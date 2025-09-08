"use client";
import React from "react";
import moment from "moment";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
const GanttChart = () => {
    const data = [
        {
            machine: "MC-01",
            jobs: [
                { task: "Job A", start: "2025-09-08 08:00", end: "2025-09-08 12:00" },
                { task: "Job B", start: "2025-09-08 13:00", end: "2025-09-08 16:00" }
            ]
        },
        {
            machine: "MC-02",
            jobs: [
                { task: "Job C", start: "2025-09-08 09:00", end: "2025-09-08 14:00" }
            ]
        },
        {
            machine: "MC-03",
            jobs: [
                { task: "Job D", start: "2025-09-08 07:00", end: "2025-09-08 11:00" },
                { task: "Job E", start: "2025-09-08 12:00", end: "2025-09-08 18:00" }
            ]
        }
    ];

    // Transform ke format ApexCharts
    const series = data.map((machine) => ({
        name: machine.machine,
        data: machine.jobs.map((job) => ({
            x: job.task,
            y: [
                moment(job.start, "YYYY-MM-DD HH:mm").valueOf(),
                moment(job.end, "YYYY-MM-DD HH:mm").valueOf()
            ]
        }))
    }));

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "rangeBar",
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        xaxis: {
            type: "datetime",
        },
        legend: {
            position: "top",
        },
        tooltip: {
            custom: function (opts) {
                const from = moment(opts.y1).format("HH:mm");
                const to = moment(opts.y2).format("HH:mm");
                return `<div class="p-2">
                  <strong>${opts.seriesName}</strong><br/>
                  ${opts.label}: ${from} - ${to}
                </div>`;
            },
        },
    };

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Gantt Chart - Job Timeline Today</h2>
            <ReactApexChart options={options} series={series} type="rangeBar" height={400} />
        </div>
    );
};

export default GanttChart;
