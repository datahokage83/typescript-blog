import type { NextPage } from "next";
import Image from 'next/image'
export type AboutContainerType = {
  className?: string;
};


const AboutContainer: NextPage<AboutContainerType> = ({ className = "" }) => {
  return (
    <>
    <div
      className={`h-[1200px] flex-1 flex flex-dir1 items-center justify-center py-20 px-20 mdN box-border text-left text-lg text-black font-dm-sans ${className}`}
    >
      <div className="flex-1 flex flex-dir1 items-center justify-start">
      <div className="flex-1 flex flex-dir1 items-center justify-start p-2.5">
          <div className="w-[100px] relative inline-block h-[23px] shrink-0 text-lg font-dm-sans">
            About
          </div>
        </div>
        <div className="flex-1 flex flex-dir1 items-center justify-start px-40 text-21xl font-dm-serif-display">
          <div className="self-stretch flex flex-col items-center justify-start gap-[40px]">
            <div className="self-stretch flex flex-col items-center justify-start gap-[40px]">
              <div className="w-[1130px] h-80 flex flex-row items-start justify-center gap-[40px] mdN">
                {/* <img
                  className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
                  alt=""
                  src="/frame-15@2x.png"
                /> */}
                I<Image
                  className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
                  src="/frame-15@2x.png"
                  alt=""
                  width={1200}
                  height={800}
                />
                <Image
                  className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
                  width={1200}
                  height={800}
                  alt=""
                  layout="responsive"
                  src="/frame-20@2x.png"
                />
              </div>
              {/* <img
                className="self-stretch relative max-w-full overflow-hidden h-80 shrink-0 object-cover"
                alt=""
                src="/frame-14@2x.png"
              /> */}
              <Image
                className="self-stretch relative max-w-full overflow-hidden h-80 shrink-0 object-cover"
                src="/frame-14@2x.png"
                alt=""
                width={1600}
                height={800}
              />
            </div>
            <div className="w-[1120px] flex flex-col items-start justify-center gap-[24px] mdN">
              <div className="self-stretch relative">Heading</div>
              <div className="self-stretch relative text-lg leading-[32px] font-dm-sans">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutContainer;
