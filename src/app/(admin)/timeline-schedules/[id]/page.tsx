"use client";
import React, { useRef, useEffect } from "react";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import "react-calendar-timeline/dist/style.css";

import scheduleData from "@/data/schedule-timeline-detail.json";

// Child component buat satu blok Machine
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MachineBlock({ machineBlock }: { machineBlock: any }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groups = machineBlock.schedules.map((_: any, idx: number) => ({
        id: idx + 1,
        title: "",
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = machineBlock.schedules.map((row: any, idx: number) => ({
        id: idx + 1,
        group: idx + 1,
        title: row.code,
        start_time: moment(row.start, "HH:mm").valueOf(),
        end_time: moment(row.finish, "HH:mm").valueOf(),
    }));

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = 200; // geser timeline ke kanan biar sidebar ketutup
        }
    }, []);

    return (
        <div className="flex border border-gray-300 shadow-sm">
            {/* kolom kiri (tabel) */}
            <div className="w-1/2 border-r border-gray-300 overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 py-1 h-[62px]">MC</th>
                            <th className="border px-2 py-1 h-[62px]">RM</th>
                            <th className="border px-2 py-1 h-[62px]">Code</th>
                            <th className="border px-2 py-1 h-[62px]">Mould/Shift</th>
                            <th className="border px-2 py-1 h-[62px]">Stock RC</th>
                            <th className="border px-2 py-1 h-[62px]">Curv. Est.</th>
                            <th className="border px-2 py-1 h-[62px]">BO</th>
                            <th className="border px-2 py-1 h-[62px]">Building SCH</th>
                            <th className="border px-2 py-1 h-[62px]">Start</th>
                            <th className="border px-2 py-1 h-[62px]">Finish</th>
                            <th className="border px-2 py-1 h-[62px]">Loading</th>
                            <th className="border px-2 py-1 h-[62px]">Shortage</th>
                            <th className="border px-2 py-1 h-[62px]">Jeda</th>
                            <th className="border px-2 py-1 h-[62px]">Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {machineBlock.schedules.map((row: any, idx: number) => (
                            <tr key={idx} className="odd:bg-white even:bg-gray-50">
                                {idx === 0 && (
                                    <td
                                        className="border px-2 py-1 h-[50px]"
                                        rowSpan={machineBlock.schedules.length}
                                    >
                                        {machineBlock.machine.code}
                                    </td>
                                )}
                                <td className="border px-2 py-1 h-[50px]">{row.rm}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.code}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.shift}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.stock}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.curv}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.bo}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.sch}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.start}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.finish}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.loading}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.shortage}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.jeda}</td>
                                <td className="border px-2 py-1 h-[50px]">{row.remark}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* timeline kanan */}
            <div className="w-1/2 overflow-x-auto" ref={scrollRef}>
                <div className="min-w-[1200px]">
                    <Timeline
                        groups={groups}
                        items={items}
                        defaultTimeStart={moment().startOf("day").valueOf()}
                        defaultTimeEnd={moment().endOf("day").valueOf()}
                        lineHeight={50}
                        itemHeightRatio={0.7}
                        canMove={false}
                        canResize={false}
                        canChangeGroup={false}
                    />
                </div>
            </div>
        </div>
    );
}

// Parent component
export default function CustomTimeline() {
    return (
        <div className="space-y-8">
            {scheduleData.map((machineBlock) => (
                <MachineBlock key={machineBlock.id} machineBlock={machineBlock} />
            ))}
        </div>
    );
}
