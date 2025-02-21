'use client';

import { getTextColor } from "@/helpers/helpers";
import { useProgramColor } from "@/hooks/useProgramColor";
import useSession from "@/hooks/useSession";

interface formHeaderInterface {
  contentString: string
}

export const FormHeader = ({contentString}: formHeaderInterface) => (
    <div className="mb-4 flex flex-col">
      <h2 className={`text-lg md:text-xl mr-2 text-green-rare`}>
        {contentString}
      </h2>
    </div>
  );
  