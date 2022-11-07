import React, { useMemo, useState } from 'react'

interface DatePickerProps {
    value: Date,
    onChange: (value: Date) => void

}
interface DateCellItem {
    year: number
    month: number
    date: number
}
const months = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const DatePicker = ({ value, onChange }: DatePickerProps) => {
    const [panelYear, setPanelYear] = useState(value.getFullYear())
    const [panelMonth, setPanelMonth] = useState(value.getMonth())
    console.log()
    const getDaysAmountInMonth = (year: number, month: number) => {
        const nextMonthDate = new Date(year, month + 1, 1)
        nextMonthDate.setMinutes(-1)
        return nextMonthDate.getDate()
    }
    const getCurrentMonthDays = (year: number, month: number, numberOfdays: number) => {
        const dateCells: DateCellItem[] = []
        for (let index = 1; index <= numberOfdays; index++) {
            dateCells.push({ year, month, date: index })
        }
        return dateCells
    }
    const getPreviosMonthDays = (year: number, month: number,) => {
        const currentMonthFirstDay = new Date(year, month, 1)
        const dayOfTheWeek = currentMonthFirstDay.getDay()
        const fixdayOfWeek = dayOfTheWeek === 0 ? 7 : dayOfTheWeek
        const previosMonthDaysAmount = fixdayOfWeek - 1;
        const daysAmountInPrevMonth = getDaysAmountInMonth(year, month - 1)

        const dateCells: DateCellItem[] = []
        const [cellYear, cellMonth] = month === 0 ? [year - 1, 11] : [year, month - 1]
        for (let i = previosMonthDaysAmount - 1; i >= 0; i--) {
            dateCells.push({
                year: cellYear,
                month: cellMonth,
                date: daysAmountInPrevMonth - i
            })

        }
        return dateCells
    }
    const VISIBLE_CELLS_AMOUNT = 7 * 6
    const getNexMonthDays = (year: number, month: number,) => {
        const currentMonthFirstDay = new Date(year, month, 1)
        const dayOfTheWeek = currentMonthFirstDay.getDay()
        const fixdayOfWeek = dayOfTheWeek === 0 ? 7 : dayOfTheWeek
        const previosMonthDaysAmount = fixdayOfWeek - 1;
        const daysAmount = getDaysAmountInMonth(year, month)
        const nextDaysAmount = VISIBLE_CELLS_AMOUNT - daysAmount - previosMonthDaysAmount
        const dateCells: DateCellItem[] = []
        const [cellYear, cellMonth] = month === 11 ? [year + 1, 0] : [year, month + 1]
        for (let i = 1; i <= nextDaysAmount; i++) {
            dateCells.push({
                year: cellYear,
                month: cellMonth,
                date: i
            })

        }
        return dateCells
    }
    const [year, month, day] = useMemo(() => {
        const year = value.getFullYear()
        const month = value.getMonth()
        const day = value.getDate()
        return [year, month, day]
    }, [value])

    const dateCells = useMemo(() => {
        const daysInMonth = getDaysAmountInMonth(panelYear, panelMonth)
        const currentMonthDays = getCurrentMonthDays(panelYear, panelMonth, daysInMonth)
        const previosMonthDays = getPreviosMonthDays(panelYear, panelMonth)
        const nextMonthDays = getNexMonthDays(panelYear, panelMonth)
        return [...previosMonthDays, ...currentMonthDays, ...nextMonthDays]
    },
        [panelYear, panelMonth]
    )
    const prevYear = () => {
        setPanelYear((year) => year - 1)
    }
    const nextYear = () => {
        setPanelYear((year) => year + 1)
    }
    const prevMonth = () => {
        if (panelMonth === 0) {
            setPanelYear((year) => year - 1)
            setPanelMonth(11)
        } else {
            setPanelMonth((panelMonth) => panelMonth - 1)
        }
    }
    const nextMonth = () => {
        if (panelMonth === 11) {
            setPanelYear((year) => year + 1)
            setPanelMonth(0)
        } else {
            setPanelMonth((panelMonth) => panelMonth + 1)
        }
    }
    const onDateSelect = (item: DateCellItem) => {
        onChange(new Date(item.year, item.month, item.date))
    }
    return (
        <div>
            {day}   {month}  {year}
            <button onClick={prevYear}>Prev Year</button>
            <button onClick={prevMonth}>Prev Month</button>
            <button onClick={nextMonth}>Next Month</button>
            <button onClick={nextYear}>Next Year</button>
            <div className='calendarPanel'>
                {dateCells.map((cell) => {
                    const isCurrentDate = cell.date === day && cell.month === month && cell.year === year
                    return <div
                        key={`${cell.year}--${cell.month}--${cell.date}`} onClick={() => onDateSelect(cell)} className={`calendarPanelItem ${isCurrentDate ? "current" : ""}`}>{cell.date}</div>
                })}
            </div>
        </div>
    )
}
