"use client"
import Link from "next/link";
import {BsArrowLeftShort, BsArrowRight} from "react-icons/bs";
import QUESTIONS from "../../../DB/data";
import {useEffect, useState} from "react";
import {GiCheckMark} from "react-icons/gi";
import {HiOutlineXMark} from "react-icons/hi2";

const Quick = () => {
    const [checked, setChecked] = useState<boolean>(false)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<any>(null)
    const [result, setResult] = useState<any>([])
    const [startTime, setStartTime] = useState<number>(100)
    const [correctCount, setCorrectCount] = useState(0)
    const nextQuestion = () => {
        setResult([...result, selectedAnswer])
        if (QUESTIONS.questions[currentQuestion].correctIndex === selectedAnswer){
            setCorrectCount(prevState => prevState + 1)
        }
        if (currentQuestion !== QUESTIONS.questions.length - 1) {
            setCurrentQuestion((prev: any) => prev + 1)
            setSelectedAnswer(null)
        }else {
            setChecked(true)
        }
    }
    const restart = () => {
        setStartTime(120)
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setResult([])
        setChecked(false)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (startTime > 0 && !checked) setStartTime((prevSeconds) => prevSeconds - 1);
            }, 1000);
        if  (startTime === 0) setChecked(true)
        return () => clearInterval(interval);
    }, [startTime,checked]);
    return (
        <div className='min-h-screen max-w-[500px] mx-auto bg-[#04364A] flex flex-col'>
            <div
                className="w-full flex justify-between items-center sticky top-0 backdrop-blur bg-[#04364A]/20 py-4 px-3">
                <Link href="/" className='p-2 rounded-full hover:bg-white/30'>
                    <BsArrowLeftShort className="text-2xl text-white"/>
                </Link>
                {checked? <h1
                    className='text-xl font-semibold text-[#DAFFFB] text-center'>Result</h1>:<h1
                    className='text-xl font-semibold text-[#DAFFFB] text-center'>Question {currentQuestion + 1}/{QUESTIONS.totalQuestions}</h1>}
            </div>
            {checked && <div className='px-3 w-full flex justify-between items-center text-xl font-semibold text-[#DAFFFB]'>
                <div>Your score</div>
                <div>{correctCount}</div>
            </div>}
            {!checked && <div className="w-full flex justify-between items-center px-3">
                <h1 className='text-xl font-semibold text-[#DAFFFB]'>Your time Left</h1>
                <div className="w-[50px] h-[50px] bg-gray-400 rounded-full grid place-items-center"
                     style={{background: `conic-gradient(#7d2ae8 ${startTime * 3.6}deg,#ededed 0deg)`}}>
                    <div className="w-[40px] h-[40px] rounded-full bg-white text-sm grid place-items-center">
                        {startTime} s
                    </div>
                </div>
            </div>}
            <div className='w-full py-5 px-3'>
                {checked ?
                    <div className="w-full">
                        {QUESTIONS.questions.map((question: any, index: number) => (
                            <ul key={index} className='w-full flex flex-col gap-y-2  mb-4'>
                                <li className='text-xl font-normal text-white mb-2'>
                                    {question.question}
                                </li>
                                <li
                                    className={`w-full p-2 border border-[#176B87] rounded text-[#DAFFFB] bg-[#176B87]`}>
                                    <div className="w-full font-semibold mb-2 text-white">Correct Answer:</div>
                                    <div className='w-full inline-flex items-center justify-between'>
                                        {question.answers[question.correctIndex]}
                                        <GiCheckMark className='text-lg'/>
                                    </div>
                                </li>
                                {question.correctIndex !== result[index] && <li
                                    className={`w-full p-2 border border-[#176B87] rounded  text-red-500 bg-[#176B87]`}>
                                    <div className="w-full font-semibold mb-2 text-white">Your Answer:</div>
                                    <div className="w-full inline-flex items-center justify-between ">
                                        {question.answers[result[index]] ? question.answers[result[index]] : "Not answer!" }
                                        <HiOutlineXMark className="text-xl"/>
                                    </div>
                                </li>}
                            </ul>))}
                    </div>
                    :
                    <div className="w-full">
                        <h1 className='text-xl font-normal text-white mb-9'>
                            {QUESTIONS.questions[currentQuestion].question}
                        </h1>
                        <ul className='w-full flex flex-col gap-y-2'>
                            {QUESTIONS.questions[currentQuestion].answers.map((answer: any, index: number) => (
                                <li
                                    key={index}
                                    onClick={() => setSelectedAnswer(index)}
                                    className={`inline-flex items-center justify-between w-full p-2 border border-[#176B87] rounded cursor-pointer hover:text-[#DAFFFB] hover:bg-[#176B87]  ${selectedAnswer === index ? 'text-[#DAFFFB] bg-[#176B87] ' : 'bg-[#64CCC5] border-blue-600'}`}>
                                    {answer}
                                </li>))}
                        </ul>
                    </div>}
            </div>
            <div className='w-full mt-auto  py-5 px-3'>
                {checked ? <button onClick={restart}
                                   className={`flex justify-center items-center w-full text-center px-5 py-2 rounded bg-[#64CCC5] text-gray-900 font-semibold group ${selectedAnswer !== null ? "pointer-events-auto" : "pointer-events-none opacity-60"}`}>
                    Restart
                </button> : <button onClick={nextQuestion}
                                    className={`flex justify-center items-center w-full text-center px-5 py-2 rounded bg-[#64CCC5] text-gray-900 font-semibold group ${selectedAnswer !== null ? "pointer-events-auto" : "pointer-events-none opacity-60"}`}>
                    {currentQuestion !== QUESTIONS.questions.length - 1 ? "Next" : "Check"}
                    <BsArrowRight className='text-xl group-hover:translate-x-2 transition'/>
                </button>}
            </div>
        </div>);
};

export default Quick;
