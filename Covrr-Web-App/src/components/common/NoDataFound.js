import React from "react";
import { NoDataFound } from "../SvgIcons";

const NoDataFoundContainer = ({
  title = "No Data Found !",
  description = "Try changing your filters or search terms to view more results.",
  showDescription = false,
  icon: Icon = null,
  iconClassName = "w-[40px] h-[40px] fill-none text-primary",
}) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="grid gap-4 w-72">
        <div className="w-20 h-20 mx-auto bg-muted3 border border-primary/10 rounded-full shadow-sm justify-center items-center inline-flex">
          <NoDataFound className={iconClassName} />
        </div>
        <div>
          <h2 className="text-center text-primary/30 text-xl font-bold leading-relaxed pb-1">{title}</h2>
          <p className={`text-center text-black text-sm font-normal leading-snug pb-4 ${!showDescription && "hidden"}`}>
            {description.includes("<br />") ? (
              <>
                {description.split("<br />")[0]} <br />
                {description.split("<br />")[1]}
              </>
            ) : (
              description
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoDataFoundContainer;
