import useDisclosure from "@/hooks/useDisclosure"
import { FormInputProps } from "@/types/componentsTypes"
import { isInRange, range } from "@/utils/numberUtils"
import { format, getMonth, getYear } from "date-fns"
import id from "date-fns/locale/id"
import { PropsWithChildren, useEffect, useRef, useState } from "react"
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from "react-datepicker"
import Box from "../Box"
import Button from "../Button"
import IconButton from "../IconButton"
import Icons from "../Icons"
import Modal from "../Modal"
import FormInputText from "./FormInputText"

registerLocale("id-ID", id)

function PickerContainer(props: PropsWithChildren<{}>) {
  const { children } = props

  return (
    <div className="absolute bg-white top-0 right-0 bottom-0 left-0 rounded-lg z-50 grid grid-cols-3 place-content-evenly place-items-center p-2  overflow-y-auto">
      {children}
    </div>
  )
}

interface InlineYearPickerProps {
  date: Date
  // eslint-disable-next-line no-unused-vars
  onChange: (year: number) => void
}

const YEARS_EACH_SECTION = 5

function InlineYearPicker(props: InlineYearPickerProps) {
  const { date, onChange } = props

  const selectedYear = getYear(date)

  const [startYear, setStartYear] = useState<number | null>(null)
  const [endYear, setEndYear] = useState<number | null>(null)

  const currentYear = getYear(new Date())
  const years = range(1970, currentYear)
  const countYearSection = Math.ceil(years.length / YEARS_EACH_SECTION)

  return (
    <PickerContainer>
      {startYear && endYear ? (
        <>
          {range(startYear, endYear).map(year => (
            <Button
              key={year}
              variant={year === selectedYear ? "outline-primary" : "unstyled"}
              size="large"
              onClick={() => onChange(year)}
            >
              {year}
            </Button>
          ))}
        </>
      ) : (
        Array.from(Array(countYearSection).keys()).map((_, idx) => {
          const start = idx > 0 ? years[idx * YEARS_EACH_SECTION + 1] : years[0]

          let end =
            idx > 0
              ? years[idx * YEARS_EACH_SECTION] + YEARS_EACH_SECTION
              : years[0] + YEARS_EACH_SECTION

          end = end > currentYear ? currentYear : end

          return (
            <Button
              key={idx}
              variant={isInRange(selectedYear, range(start, end)) ? "outline-primary" : "unstyled"}
              size="large"
              onClick={() => {
                setStartYear(start)
                setEndYear(end)
              }}
            >
              {start}-{end}
            </Button>
          )
        })
      )}
    </PickerContainer>
  )
}

const MONTHS_NAME = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

interface InlineMonthPickerProps {
  date: Date
  // eslint-disable-next-line no-unused-vars
  onChange: (index: number) => void
}
function InlineMonthPicker(props: InlineMonthPickerProps) {
  const { date, onChange } = props

  const selectedMonth = getMonth(date)

  return (
    <PickerContainer>
      {MONTHS_NAME.map((month: string, idx: number) => {
        return (
          <Button
            key={month}
            variant={idx === selectedMonth ? "outline-primary" : "unstyled"}
            size="large"
            onClick={() => onChange(idx)}
          >
            {month}
          </Button>
        )
      })}
    </PickerContainer>
  )
}

interface CalendarPickerProps extends ReactDatePickerProps {
  selected: Date | null
  // eslint-disable-next-line no-unused-vars
  onChange: (date: Date) => void
}
export function CalendarPicker(props: CalendarPickerProps) {
  const { selected, onChange, ...otherProps } = props

  const yearDisclosure = useDisclosure()
  const monthDisclosure = useDisclosure()

  const handleChangeDate = (date: Date) => {
    onChange(date)
  }

  return (
    <ReactDatePicker
      locale="id-ID"
      className="relative"
      dateFormat="dd/MM/yyyy"
      selected={selected}
      onChange={handleChangeDate}
      inline
      renderCustomHeader={({
        date,
        monthDate,
        decreaseMonth,
        increaseMonth,
        changeMonth,
        changeYear,
      }) => (
        <>
          {yearDisclosure.isOpen && (
            <InlineYearPicker
              date={date}
              onChange={year => {
                changeYear(year)
                yearDisclosure.onClose()
              }}
            />
          )}

          {monthDisclosure.isOpen && (
            <InlineMonthPicker
              date={date}
              onChange={(index: number) => {
                changeMonth(index)
                monthDisclosure.onClose()
              }}
            />
          )}
          <Box className="flex items-center justify-between">
            <Box className="flex">
              <button
                className="react-datepicker__current-month cursor-pointer focus:ring-0"
                onClick={monthDisclosure.onOpen}
              >
                {monthDate.toLocaleString("id-ID", {
                  month: "long",
                })}
              </button>
              <button
                className="react-datepicker__current-month cursor-pointer focus:ring-0"
                onClick={yearDisclosure.onOpen}
              >
                {monthDate.toLocaleString("id-ID", {
                  year: "numeric",
                })}
              </button>
            </Box>
            <Box className="flex gap-2">
              <IconButton
                ariaLabel="Previous Month"
                className="react-datepicker__navigation react-datepicker__navigation--previous"
                variant="unstyled"
                icon={<Icons name="chevron-left" />}
                onClick={decreaseMonth}
              />

              <IconButton
                ariaLabel="Next Month"
                className="react-datepicker__navigation react-datepicker__navigation--next"
                variant="unstyled"
                icon={<Icons name="chevron-right" />}
                onClick={increaseMonth}
              />
            </Box>
          </Box>
        </>
      )}
      {...otherProps}
    />
  )
}

interface FormInputDateProps extends Omit<FormInputProps<Date | null, Date>, "onBlur"> {
  minDate?: Date
  maxDate?: Date
}

export default function FormInputDate(props: FormInputDateProps) {
  const {
    value = new Date(),
    minDate,
    maxDate,
    onChange,
    disabled = false,
    readOnly = false,
    ...otherProps
  } = props

  const inputRef = useRef<HTMLInputElement | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(
    () => {
      if (otherProps.placeholder !== "" && !value) {
        // @ts-ignore
        inputRef.current.value = value
        return
      }
      if (inputRef.current && value) {
        inputRef.current.defaultValue = format(value, "dd/MM/yyyy")
        inputRef.current.value = format(value, "dd/MM/yyyy")
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputRef, value]
  )

  const handleChangeDate = (date: Date) => {
    if (onChange) {
      onChange(date)
      onClose()
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick>
        <CalendarPicker
          selected={value}
          onChange={handleChangeDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Modal>

      <FormInputText
        ref={inputRef}
        onClick={disabled || readOnly ? () => {} : onOpen}
        readOnly
        disabled={disabled}
        {...otherProps}
      />
    </>
  )
}
