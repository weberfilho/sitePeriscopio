"use client";

import Button from "@/components/button/Button";
import Link from "next/link";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const eventDate = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleDateChange(date: any) {
    console.log(date);
  }

  function handleShowDatePicker() {
    setShowDatePicker((prevState) => !prevState);
  }

  return (
    <div className="mx-16 my-8 flex flex-grow flex-col space-y-5">
      {showDatePicker && (
        <DatePicker
          selected={selectDate}
          onChange={handleDateChange}
          showIcon
        />
      )}

      <Link href={`../../events/eventList/1`}>
        <Button title="HOJE" />
      </Link>

      <Link href={""} onClick={handleShowDatePicker}>
        <Button title="OUTRAS DATAS" />
      </Link>
    </div>
  );
};

export default eventDate;
