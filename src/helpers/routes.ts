import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlinePhotoLibrary, MdOutlineSupportAgent, MdQuestionAnswer } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { TbBuildingHospital } from "react-icons/tb";
import { IconType } from "react-icons/lib";
import { IoHomeOutline, IoStopwatchOutline, IoPeopleCircleOutline } from "react-icons/io5";
import { FaRegChartBar, FaRegFileAlt } from "react-icons/fa";

interface IProfileProps {
  route: string;
  text: string;
  icon: IconType;
}

interface IProgramRoutes {
  [programCode: string]: IProfileProps[];
}

interface IRouteProps {
  general: IProfileProps[];
  programs: IProgramRoutes;
}


export const routes: Record<string, IRouteProps> = {
  supervisor: {
    general: [
      {
        route: "/dashboard/starts",
        text: "Início",
        icon: IoHomeOutline,
      },
    ],
    programs: {
      "983": [ //Programa de Diagnóstico
        {
          route: "/dashboard/openingCalls",
          text: "Abertura de chamados",
          icon: LuClipboardList,
        },
        {
          route: "/dashboard/callTracking",
          text: "Acompanhamento de chamados",
          icon: IoStopwatchOutline,
        },
      ],
      "984": [ //Programa de monitoramento
        {
          route: "/dashboard/openingCalls",
          text: "Abertura de chamados",
          icon: LuClipboardList,
        },
        {
          route: "/dashboard/callTracking",
          text: "Acompanhamento de chamados",
          icon: IoStopwatchOutline,
        },
      ],
      "987": [ //Programa de segurança
        {
          route: "/dashboard/openingCalls",
          text: "Abertura de chamados",
          icon: LuClipboardList,
        },
        {
          route: "/dashboard/callTracking",
          text: "Acompanhamento de chamados",
          icon: IoStopwatchOutline,
        },
      ]
    }
  },
  operation: {
    general: [
      {
        route: "/dashboard/starts",
        text: "Início",
        icon: IoHomeOutline,
      },
    ],
    programs: {
      "983": [ //Programa de Diagnóstico
        {
          route: "/dashboard/openingCalls",
          text: "Abertura de chamados",
          icon: LuClipboardList,
        },
        {
          route: "/dashboard/callTracking",
          text: "Acompanhamento de chamados",
          icon: LuClipboardList,
        },
        {
          route: "/dashboard/diagnostic/exam",
          text: "Relatório de chamados",
          icon: LuClipboardList,
        },
      ],
      "984": [ //Programa de monitoramento
        {
          route: "/dashboard/openingCalls",
          text: "Abertura de chamados",
          icon: LuClipboardList,
        },
        {
          route: "/dashboard/callTracking",
          text: "Acompanhamento de chamados",
          icon: LuClipboardList,
        },
        {
          route: "/dashboard/diagnostic/exam",
          text: "Relatório de chamados",
          icon: LuClipboardList,
        },
      ],
      "987": [ //Programa de segurança
        {
          route: "/dashboard/openingCalls",
          text: "Abertura de chamados",
          icon: LuClipboardList,
        },
        {
          route: "/dashboard/callTracking",
          text: "Acompanhamento de chamados",
          icon: LuClipboardList,
        },
        {
          route: "/dashboard/diagnostic/exam",
          text: "Relatório de chamados",
          icon: LuClipboardList,
        },
      ]
    }
  },
  representative: {
    general: [
      {
        route: "/dashboard/starts",
        text: "Início",
        icon: IoHomeOutline,
      },
    ],
    programs: {
      "983": [ //Programa de Diagnóstico
        {
          route: "/dashboard/openingCalls",
          text: "Abertura de chamados",
          icon: MdOutlineSupportAgent,
        },
        {
          route: "/dashboard/callTracking",
          text: "Acompanhamento de chamados",
          icon: FaRegFileAlt,
        },
        {
          route: "/dashboard/diagnostic/exam",
          text: "Relatório de chamados",
          icon: FaRegChartBar,
        },
      ],
      "984": [ //Programa de monitoramento
        {
          route: "/dashboard/openingCalls",
          text: "Abertura de chamados",
          icon: MdOutlineSupportAgent,
        },
        {
          route: "/dashboard/callTracking",
          text: "Acompanhamento de chamados",
          icon: FaRegFileAlt,
        },
        {
          route: "/dashboard/diagnostic/exam",
          text: "Relatório de chamados",
          icon: FaRegChartBar,
        },
      ],
      "987": [ //Programa de segurança
        {
          route: "/dashboard/openingCalls",
          text: "Abertura de chamados",
          icon: MdOutlineSupportAgent,
        },
        {
          route: "/dashboard/callTracking",
          text: "Acompanhamento de chamados",
          icon: FaRegFileAlt,
        },
        {
          route: "/dashboard/diagnostic/exam",
          text: "Relatório de chamados",
          icon: FaRegChartBar,
        },
      ]
    }
  }
}
