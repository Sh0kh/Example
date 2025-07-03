import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import CONFIG from '../../../../utils/Config';
import parse, { domToReact } from 'html-react-parser';

// Question type components
const MultipleChoiceQuestion = ({ question, onAnswer, userAnswer }) => (
    <div className="space-y-4">
        <div className="flex flex-col space-y-3">
            <p
                className="text-lg font-semibold text-gray-800"
                dangerouslySetInnerHTML={{ __html: question.question_text }}
            />
            {question.image_url && (
                <img
                    src={CONFIG.API_URL + question.image_url}
                    alt="Question visual"
                    className="max-w-[400px] h-auto rounded-lg border"
                />
            )}
        </div>
        <div className="space-y-2">
            {question.answers.map((answer) => (
                <label
                    key={answer.id}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors
            ${userAnswer === answer.id
                            ? 'bg-blue-50 border-blue-300'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={answer.id}
                        checked={userAnswer === answer.id}
                        onChange={() => onAnswer(answer.id)}
                        className="mr-3 text-blue-600"
                    />
                    <span className="text-gray-700">{answer.answer_text}</span>
                </label>
            ))}
        </div>
    </div>
);

const MultipleSelectQuestion = ({ question, onAnswer, userAnswer }) => {
    const handleAnswerChange = (answerId) => {
        const newAnswers = userAnswer?.includes(answerId)
            ? userAnswer.filter(id => id !== answerId)
            : [...(userAnswer || []), answerId];
        onAnswer(newAnswers);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-3">
                <p
                    className="text-lg font-semibold text-gray-800"
                    dangerouslySetInnerHTML={{ __html: question.question_text }}
                />
                {question.image_url && (
                    <img
                        src={CONFIG.API_URL + question.image_url}
                        alt="Question visual"
                        className="max-w-[400px] h-auto rounded-lg border"
                    />
                )}
            </div>
            <div className="space-y-2">
                {question.answers.map((answer) => (
                    <label
                        key={answer.id}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors
                            ${userAnswer?.includes(answer.id)
                                ? 'bg-blue-50 border-blue-300'
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        <input
                            type="checkbox"
                            name={`question-${question.id}`}
                            value={answer.id}
                            checked={userAnswer?.includes(answer.id) || false}
                            onChange={() => handleAnswerChange(answer.id)}
                            className="mr-3 text-blue-600"
                        />
                        <span className="text-gray-700">{answer.answer_text}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

const FillInBlankQuestion = ({ question, onAnswer, userAnswer }) => {
    const handleInputChange = (e) => {
        onAnswer(e.target.value);
    };

    const parsedContent = parse(question.question_text || "", {
        replace: (domNode) => {
            if (domNode.type === "text" && domNode.data.includes("{textinput}")) {
                const parts = domNode.data.split("{textinput}");
                return (
                    <>
                        {parts.map((part, index) => (
                            <span key={index}>
                                {part}
                                {index < parts.length - 1 && (
                                    <input
                                        type="text"
                                        value={userAnswer || ""}
                                        onChange={handleInputChange}
                                        className="inline-block border rounded px-2 py-1 mx-2"
                                    />
                                )}
                            </span>
                        ))}
                    </>
                );
            }
        },
    });

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">{parsedContent}</h3>
            {question.image_url && (
                <img
                    src={CONFIG.API_URL + question.image_url}
                    alt="Question visual"
                    className="max-w-[400px] h-auto rounded-lg border mb-4"
                />
            )}
        </div>
    );
};

const DropdownQuestion = ({ question, onAnswer, userAnswer }) => {
    const handleSelectChange = (e) => {
        onAnswer(e.target.value);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-3">
                <p
                    className="text-lg font-semibold text-gray-800"
                    dangerouslySetInnerHTML={{ __html: question.question_text }}
                />
                {question.image_url && (
                    <img
                        src={CONFIG.API_URL + question.image_url}
                        alt="Question visual"
                        className="max-w-[400px] h-auto rounded-lg border"
                    />
                )}
            </div>
            <div className="mt-4">
                <select
                    value={userAnswer || ""}
                    onChange={handleSelectChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Tanlang</option>
                    {question.answers.map((answer) => (
                        <option key={answer.id} value={answer.id}>
                            {answer.answer_text}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

const EssayQuestion = ({ question, onAnswer, userAnswer }) => {
    const handleTextChange = (e) => {
        onAnswer(e.target.value);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-3">
                <p
                    className="text-lg font-semibold text-gray-800"
                    dangerouslySetInnerHTML={{ __html: question.question_text }}
                />
                {question.image_url && (
                    <img
                        src={CONFIG.API_URL + question.image_url}
                        alt="Question visual"
                        className="max-w-[400px] h-auto rounded-lg border"
                    />
                )}
            </div>
            <div className="mt-4">
                <textarea
                    value={userAnswer || ""}
                    onChange={handleTextChange}
                    rows={8}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Javobingizni yozing..."
                />
            </div>
        </div>
    );
};

const SpeakingQuestion = ({ question, onAnswer, userAnswer }) => {
    const [recording, setRecording] = useState(false);

    const handleRecord = () => {
        setRecording(!recording);
        // Implement actual recording logic here
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-3">
                <p
                    className="text-lg font-semibold text-gray-800"
                    dangerouslySetInnerHTML={{ __html: question.question_text }}
                />
                {question.image_url && (
                    <img
                        src={CONFIG.API_URL + question.image_url}
                        alt="Question visual"
                        className="max-w-[400px] h-auto rounded-lg border"
                    />
                )}
            </div>
            <div className="mt-4">
                <button
                    onClick={handleRecord}
                    className={`flex items-center px-4 py-2 rounded-md ${recording ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                >
                    {recording ? (
                        <>
                            <span className="mr-2">To'xtatish</span>
                            <div className="h-3 w-3 bg-white rounded-full animate-pulse"></div>
                        </>
                    ) : (
                        <span>Javob yozishni boshlash</span>
                    )}
                </button>
                {userAnswer && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-md">
                        <p className="text-sm text-gray-700">Audio javob yozilgan</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Question type renderer
const QuestionRenderer = ({ question, onAnswer, userAnswer }) => {
    const questionTypeComponents = {
        1: MultipleChoiceQuestion, // Bitta javobli test (Quiz)
        2: MultipleSelectQuestion, // Bir nechta javobli test
        3: FillInBlankQuestion,    // Bo'sh joy (alohida)
        4: FillInBlankQuestion,    // Bo'sh joy (hikoya shaklida)
        5: DropdownQuestion,       // Dropdown tanlov (Select)
        6: EssayQuestion,          // Essay (Writing)
        7: SpeakingQuestion,       // Speaking (Audio talabi)
    };

    const QuestionComponent = questionTypeComponents[question.question_type_id] || FillInBlankQuestion;

    return (
        <QuestionComponent
            question={question}
            onAnswer={onAnswer}
            userAnswer={userAnswer}
        />
    );
};

export default function ExamSolutionBody({ examData }) {
    const [activePart, setActivePart] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(null);

    const parts = examData?.section?.parts || [];
    const currentPart = parts.find(part => part.id === activePart);
    const currentQuestions = currentPart?.questions || [];

    // Initialize active part
    useEffect(() => {
        if (parts.length > 0 && !activePart) {
            setActivePart(parts[0].id);
        }
    }, [parts, activePart]);

    // Timer logic
    useEffect(() => {
        if (currentPart?.duration) {
            setTimeRemaining(parseInt(currentPart.duration) * 60); // Convert to seconds
        }
    }, [currentPart]);

    useEffect(() => {
        if (timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeRemaining]);

    const handlePartChange = (partId) => {
        setActivePart(partId);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getAnsweredQuestionsCount = (partId) => {
        const part = parts.find(p => p.id === partId);
        if (!part) return 0;
        return part.questions.filter(q => userAnswers[q.id] !== undefined).length;
    };

    if (!examData) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-500">Ma'lumotlar yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAFAFA] h-screen p-4">
            {/* Part navigation */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                    {parts.map((part, index) => {
                        const answeredCount = getAnsweredQuestionsCount(part.id);
                        const totalQuestions = part.questions.length;
                        return (
                            <button
                                key={part.id}
                                onClick={() => handlePartChange(part.id)}
                                className={`relative px-4 py-3 rounded-lg border transition-all duration-200 font-medium
                                    ${activePart === part.id
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-sm">Part {index + 1}</span>
                                </div>

                                {answeredCount === totalQuestions && totalQuestions > 0 && (
                                    <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-green-500 bg-white rounded-full" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Part content */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
                {currentPart?.rules && (
                    <div className="border-b px-6 py-4">
                        <h3
                            className="text-lg font-semibold text-gray-800"
                            dangerouslySetInnerHTML={{ __html: currentPart.rules }}
                        />
                    </div>
                )}

                {currentQuestions.length > 0 ? (
                    <div className="p-6 space-y-8">
                        {currentQuestions.map((question, index) => (
                            <div key={question.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                                <div className="flex items-start space-x-4">
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                                        ${userAnswers[question.id]
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            {userAnswers[question.id] && (
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            )}
                                        </div>
                                        <QuestionRenderer
                                            question={question}
                                            onAnswer={(answer) => {
                                                setUserAnswers(prev => ({
                                                    ...prev,
                                                    [question.id]: answer
                                                }));
                                            }}
                                            userAnswer={userAnswers[question.id]}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        Bu bo'limda savollar mavjud emas
                    </div>
                )}
            </div>
        </div>
    );
}