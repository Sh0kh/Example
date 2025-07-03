import { useEffect, useState } from "react";

export default function ExamSolutionHeader({ examData, timeLeft }) {

    const loading = false;


    return (
        <div className="Book__header p-4 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Заголовок */}
                <h2 className="text-black text-2xl font-bold">
                    {examData?.section?.name}
                </h2>

                {/* Таймер */}
                <h2 className="text-lg font-medium text-red-600">
                    {timeLeft}
                </h2>

                {/* Кнопки */}
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Кнопка "Leave exam" */}
                    <button
                        onClick={() => setOutModal(true)}
                        className="bg-white text-base shadow-sm px-6 py-2 font-semibold rounded-lg text-gray-700 transition duration-500 border border-gray-300 hover:opacity-70 sm:px-8 md:px-10 lg:px-12"
                    >
                        Leave exam
                    </button>

                    {/* Кнопка "Next Exam" */}
                    <button
                        disabled={loading}
                        className={`bg-blue-600 text-white px-6 py-2 font-bold rounded-lg shadow-sm transition duration-500 border-2 border-blue-600
                            ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-transparent hover:text-blue-600"} 
                            sm:px-8 md:px-10 lg:px-12`}
                    >
                        {loading ? "Loading..." : "Next Section"}
                    </button>
                </div>
            </div>
        </div >
    );
}
