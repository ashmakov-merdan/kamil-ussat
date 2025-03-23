import { BASE_URL } from "@/api";
import Image from "next/image";
import { FC } from "react";

interface Props {
  partners: IPartner[]
};

const Carousel: FC<Props> = ({ partners }) => {
  // Check if we should animate (more than 6 partners)
  const shouldAnimate = partners.length > 6;
  
  return (
    <div className="overflow-hidden py-6">
      <div className={`flex ${shouldAnimate ? "w-max animate-slide" : "flex-wrap justify-center"}`}>
        {partners.map((company, index) => (
          <div key={index} className="w-40 mx-4 flex flex-col items-center justify-center flex-shrink-0 space-y-3">
            <div className="w-16 h-16 flex justify-center items-center rounded-xl">
              <Image
                width={64}
                height={64}
                src={`${BASE_URL}/${company.files[0].path}`}
                alt={company.name}
              />
            </div>
            <h2>{company.name}</h2>
          </div>
        ))}
        {/* Only duplicate partners for infinite scroll effect when animating */}
        {shouldAnimate && partners.map((company, index) => (
          <div key={index + partners.length} className="w-40 mx-4 flex flex-col items-center justify-center flex-shrink-0">
            <div className="w-16 h-16 flex justify-center items-center rounded-xl">
              <Image
                width={64}
                height={64}
                src={`https://kamilussat.com.tm/${company.files[0].path}`}
                alt={company.name}
              />
            </div>
            <h2>{company.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Carousel;