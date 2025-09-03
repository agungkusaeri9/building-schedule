"use client"
import React, { useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ComponentCard from "@/components/common/ComponentCard";
import scheduleData from "@/data/schedule-detail.json";
import toast from "react-hot-toast";
import InputLabel from "@/components/form/FormInput";

export default function CreateProduct() {
    const [schedule, setSchedule] = useState(scheduleData);
    const handleSetPriority = () => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        const machinesWithPriority = schedule.machines.map((machine) => {
            let index = 0;
            const materialsWithPriority = machine.materials.map((m) => ({
                ...m,
                priority: alphabet[index++ % alphabet.length],
            }));
            return { ...machine, materials: materialsWithPriority };
        });

        setSchedule({
            ...schedule,
            machines: machinesWithPriority,
        });

        toast.success("Prioritas berhasil di-set per machine!");
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Schedule", href: "/schedules" },
                    { label: "Detail" },
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Detail Schedule">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSetPriority();
                        }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold mb-6">
                            Form  Schedule
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <InputLabel
                                label="Start Date"
                                name="Start Date"
                                type="text"
                                placeholder="Enter Start Date"
                                defaultValue={schedule.startDate}
                                disabled
                                onChange={() => { }}
                            />
                            <InputLabel
                                label="End Date"
                                name="End Date"
                                type="text"
                                placeholder="Enter End Date"
                                defaultValue={schedule.endDate}
                                disabled
                                onChange={() => { }}
                            />

                        </div>
                    </form>
                </ComponentCard>

                <ComponentCard title="Request Schedule Detail">
                    <div className="space-y-6">
                        {schedule.machines.map((machine, midx) => (
                            <div key={midx} className="border p-4 rounded-md">
                                <h4 className="font-semibold text-blue-600 mb-3">
                                    {machine.machine_name}
                                </h4>
                                <div className="space-y-2">
                                    {machine.materials.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <InputLabel
                                                label="Priority"
                                                name="Priority"
                                                type="text"
                                                disabled
                                                defaultValue={item.priority}
                                                onChange={() => { }}
                                            />
                                            <InputLabel
                                                label="Size"
                                                name="Size"
                                                type="number"
                                                placeholder="Enter Size"
                                                defaultValue={Math.floor(Math.random() * 100) + 1}
                                                disabled
                                                onChange={() => { }}
                                            />
                                            <InputLabel
                                                label="RC/Stock"
                                                name="RC/Stock"
                                                type="number"
                                                disabled
                                                placeholder="Enter RC/Stock"
                                                defaultValue={Math.floor(Math.random() * 200) + 1}
                                                onChange={() => { }}
                                            />
                                            <InputLabel
                                                label="SCH"
                                                name="SCH"
                                                type="number"
                                                disabled
                                                placeholder="Enter SCH"
                                                defaultValue={Math.floor(Math.random() * 100) + 2}
                                                onChange={() => { }}
                                            />
                                            <InputLabel
                                                label="BO"
                                                name="BO"
                                                type="number"
                                                placeholder="Enter BO"
                                                disabled
                                                defaultValue={Math.floor(Math.random() * 100) + 3}
                                                onChange={() => { }}
                                            />
                                            <InputLabel
                                                label="Remark"
                                                name="Remark"
                                                type="text"
                                                placeholder="Enter Remark"
                                                defaultValue={item.name + " - " + item.code}
                                                disabled
                                                onChange={() => { }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ComponentCard>
            </div>
        </div >
    );
}
