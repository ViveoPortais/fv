import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { IconType } from "react-icons/lib";

interface ContentCardProps {
  isCustomBg?: boolean;
  bgColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonBorderColor?: string;
  title: string;
  subtitle?: string;
  subtitleTwo?: string;
  subtitleThree?: string;
  subtitleFour?: string;
  subtitleFive?: string;
  subtitleSix?: string;
  subtitleSeven?: string;
  textemail?: string;
  textphone?: string;
  buttonText?: string;
  svgIcon?: IconType;
  hasIcon?: boolean;
  hideButton?: boolean;
  isHeight?: boolean;
  isMainCard?: boolean;
  onButtonClick?: () => void;
  showImages?: boolean;
  programCode?: string;
}

const ContentCard = ({
  isCustomBg,
  bgColor,
  title,
  subtitle,
  subtitleTwo,
  textemail,
  textphone,
    buttonText,
  hideButton,
  subtitleThree,
  subtitleFour,
  subtitleFive,
  subtitleSix,
  subtitleSeven,
  isHeight,
  isMainCard,
  onButtonClick,
  showImages = false,
  programCode,
  hasIcon = false,
  svgIcon: Icon,
}: ContentCardProps) => {
  const sendEmail = () => {
    window.open(
      "mailto:teste@suporteaopaciente.com.br?subject=Subject&body=Body%20goes%20here"
    );
  };

  const calling = () => {
    window.open("tel:0800 000 0000");
  };

  const heightClass = isMainCard
    ? "2xl:h-20"
    : isHeight
      ? "2xl:h-80"
      : "2xl:h-60";

  return (
    <div
      className={`w-full rounded-xl lg:h-52 ${heightClass
        } ${isCustomBg
          ? "bg-[url('/')] bg-contain bg-no-repeat bg-careDarkBlue scale-x-[-1]"
          : `${bgColor}`
        } `}
    >
      <div className={`${isCustomBg && "scale-x-[-1]"} flex flex-col h-full`}>
        <div className="text-black md:w-full ml-3 2xl:ml-5 mt-5 md:mt-8 xl:mt-4 text-3xl flex flex-col">
          <span>{title}</span>
          <span className="text-sm mt-2 ml-1 opacity-95 w-3/4">{subtitle}</span>
          {showImages && (
            <div className="flex justify-start items-center space-x-5 mt-5 ml-3 2xl:ml-5">
              <Image
                src="/images/logo-rare.png"
                width={programCode === '987' ? 180 : 200}
                height={100}
                alt="Logo Rare"
                className="mb-3"
              />
              <a href="https://www.sanoficonecta.com.br/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/logo-conecta.png"
                  width={programCode === '987' ? 180 : 200}
                  height={80}
                  alt="Logo Conecta"
                  className="mb-3"
                />
              </a>

              {programCode === '987' && (
                <a href="https://www.labcorplink.com/ui/#/login" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/logo-LabCorp.png"
                    width={180}
                    height={80}
                    alt="Logo Conecta"
                    className="mb-3"
                  />
                </a>
              )}
            </div>
          )}
          <span className="text-base font-medium mt-3 ml-1 opacity-95">
            {subtitleTwo}
          </span>
          <span className="flex flex-col text-base font-medium mt-3 ml-1 opacity-95">
            <span>{subtitleThree}</span>
            <span>{subtitleFour}</span>
            <span>{subtitleFive}</span>
            <span>{subtitleSix}</span>
          </span>
          <span className="text-base font-medium mt-3 ml-1 opacity-95">
            {subtitleSeven}
          </span>
          <span
            onClick={sendEmail}
            className="text-sm font-bold ml-1 opacity-95 cursor-pointer hover:text-careDarkBlue"
          >
            {textemail}
          </span>
          <span
            onClick={calling}
            className="text-2xl md:text-3xl lg:text-3xl xl:text-xl xl:mt-0 2xl:mt-3 2xl:text-3xl font-bold ml-1 opacity-95 hover:text-careDarkBlue cursor-pointer"
          >
            {textphone}
          </span>
        </div>
        <div
          className={`ml-3 2xl:ml-5 my-5 flex justify-between items-end h-full`}
        >
          {!hideButton && (
            <Button size="lg" className={`${bgColor}/75 hover:${bgColor}/75 text-black font-semibold`} onClick={onButtonClick}>
              {buttonText}
            </Button>
          )}

          {hasIcon && Icon && (
            <div className="flex items-center justify-end w-16 mr-8">
              <Icon className="w-14 h-14 text-gray-100" />
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default ContentCard;
