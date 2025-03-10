import React from "react";
import { DateRange } from "react-date-range";
import { enGB } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePickerWithFooter = ({ ranges, onChange, onApply, onCancel }) => {
  return (
    <div>
      <DateRange ranges={ranges} onChange={onChange} moveRangeOnFirstSelection={false} editableDateInputs={true} locale={enGB} className="custom-date-range" rangeColors={["#101223"]} />
      <div className="flex justify-end bg-cardBackground px-2 py-3 rounded-b-md border-t border-border">
        <button className="btn btn-white btn-md w-full mr-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-md w-full btn-primary" onClick={onApply}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateRangePickerWithFooter;
