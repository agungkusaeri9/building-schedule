"use client";
import React, { useState } from "react";
import { Dropdown } from "./ui/dropdown/Dropdown";
import { FileSpreadsheet, FileText, Download } from "lucide-react";

export default function ButtonExportDropdown({ onExportExcel, onExportPDF }: {
    onExportExcel?: () => void;
    onExportPDF?: () => void;
}) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    }

    function closeDropdown() {
        setIsOpen(false);
    }

    return (
        <div className="relative">
            {/* Trigger button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
                <Download className="w-4 h-4" />
                Export
                <svg
                    className={`stroke-white transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Dropdown content */}
            <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className="absolute right-0 mt-2 flex w-40 flex-col rounded-md border border-gray-200 bg-white shadow-lg"
            >
                <button
                    onClick={() => {
                        onExportExcel?.();
                        closeDropdown();
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    <FileSpreadsheet className="w-4 h-4 text-green-600" />
                    Excel
                </button>
                <button
                    onClick={() => {
                        onExportPDF?.();
                        closeDropdown();
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    <FileText className="w-4 h-4 text-red-600" />
                    PDF
                </button>
            </Dropdown>
        </div>
    );
}
