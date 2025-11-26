"use client";

import Button from "@/components/button/Button";
import Calendar from "@/components/calendar/Calendar";
import PopUp from "@/components/popup/Popup";
import Link from "next/link";

import React, { useState } from "react";

import { format } from "date-fns";

const eventDate = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(true);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const today: Date = new Date();

  const formattedDate = format(today, "yyyy-MM-dd");

  function handleShowDatePicker() {
    setShowDatePicker(true);
  }

  return (
    <div className="mx-16 my-8 flex flex-grow flex-col space-y-5">
      {showDatePicker && (
        <PopUp isVisible={isPopUpVisible}>
          <Calendar action={() => setIsPopUpVisible(false)} />
        </PopUp>
      )}

      <Link href={`../../events/eventList/${formattedDate}`}>
        <Button title="HOJE" />
      </Link>

      <Link href={""} onClick={handleShowDatePicker}>
        <Button title="OUTRAS DATAS" />
      </Link>
    </div>
  );
};

export default eventDate;
