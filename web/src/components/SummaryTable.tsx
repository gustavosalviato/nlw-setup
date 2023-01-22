import React, { useState } from "react"
import { generateDatesFromYearBeginning } from "../utils/generateDatesFromYearBeginning"
import { HabitDay } from "./HabitDay"
import { useEffect } from "react"
import { api } from "../lib/axios"
import dayjs from "dayjs"
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

interface Summary {
    id: string
    date: string
    completed: number
    amount: number
}

export function SummaryTable() {

    const [summaries, setSummaries] = useState<Summary[]>([])

    const summaryDates = generateDatesFromYearBeginning()
    const minimumSummaryDatesSize = 18 * 7
    const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

    useEffect(() => {
        async function getSummary() {
            const res = await api.get('/summary')
            setSummaries(res.data)
        }

        getSummary()
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => (
                    <div key={`${weekDay}-${i}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                        {weekDay}
                    </div>
                ))}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaries.length > 0 && summaryDates.map((summaryDate) => {

                    const dayInSummary = summaries.find((summary) => {
                        return dayjs(summaryDate).isSame(summary.date)
                    })

                    return (
                        <HabitDay
                            key={summaryDate.toString()}
                            date={summaryDate}
                            amount={dayInSummary?.amount}
                            defaultCompleted={dayInSummary?.completed}
                        />
                    )
                })}



                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                    <div
                        key={i}
                        className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                    />
                ))}
            </div>
        </div>
    )
}