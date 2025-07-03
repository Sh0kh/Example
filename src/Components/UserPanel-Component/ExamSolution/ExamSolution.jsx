import { useEffect, useState } from "react";
import ExamStart from "./components/ExamStart";
import { useCallback } from "react";
import ExamSolutionHeader from "./components/ExamSolutionHeader";
import ExamSolutionBody from "./components/ExamSolutionBody";

export default function ExamSolution() {
    const [examStartModal, setExamStartModal] = useState(true)
    const [examData, setExamData] = useState([])
    const [timeLeft, setTimeLeft] = useState(0);
    const [outModal, setOutModal] = useState(false);
    const handleDataFromChild = useCallback((data) => {
        setExamData(data);
    }, []);

    console.log(examData)

    useEffect(() => {
        const durationInMinutes = examData?.section?.duration || 0;
        setTimeLeft(durationInMinutes * 60);
    }, [examData]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    

    return (
        <>
            <ExamSolutionHeader examData={examData} timeLeft={formatTime(timeLeft)} />
            <ExamSolutionBody examData={examData} />
            <ExamStart isOpen={examStartModal} onClose={() => setExamStartModal(false)} setDataFromChild={handleDataFromChild} />
        </>
    )
}