"use client"
import React from "react";
import { CardDashboard } from "@/components/Dashboard/CardDashboard";
import MaterialPieChart from "@/components/Dashboard/MaterialPieChart";
import GanttChart from "@/components/Dashboard/GantChart";


export default function Dashboard() {

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                <CardDashboard title="Total Materials Processed Today" value={120} />
                <CardDashboard title="Machine/Line Usage Today" value={4} />
            </div>

            <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <GanttChart />
                </div>
                <div>
                    <MaterialPieChart />
                </div>
            </div>
        </div>
    );
}
