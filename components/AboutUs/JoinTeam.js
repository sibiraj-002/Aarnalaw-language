import React, { useContext } from "react";
import Link from "next/link";
import { LanguageContext } from "../../app/context/LanguageContext";

export default function JoinTeam() {
  const { translations } = useContext(LanguageContext);

  return (
    <div className="mx-auto flex w-11/12 flex-col items-center py-8 lg:flex-row">
      <div className="flex flex-col justify-center lg:w-9/12">
        <p className="pb-3 text-3xl font-semibold leading-normal text-custom-blue">
        {translations.joinTeam.joinTeamTitle} 
        </p>
        <p className="font-medium">
        {translations.joinTeam.joinTeamPara}  
        </p>
      </div>
      <div className="md:mt-16 flex flex-col items-end justify-end pt-8 lg:w-3/12 lg:pt-0">
        <Link
          href="/careers"
          className="border border-custom-red bg-white px-8 py-3 uppercase text-custom-blue transition-colors duration-300 hover:bg-custom-blue hover:text-white md:ml-0"
        >
          {translations.joinTeam.joinTeamOpening} 
        </Link>
      </div>
    </div>
  );
}
