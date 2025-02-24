const companies = [
  { id: 1, src: "/logos/company1.png", alt: "Company 1" },
  { id: 2, src: "/logos/company2.png", alt: "Company 2" },
  { id: 3, src: "/logos/company3.png", alt: "Company 3" },
  { id: 4, src: "/logos/company4.png", alt: "Company 4" },
  { id: 5, src: "/logos/company5.png", alt: "Company 5" },
  { id: 6, src: "/logos/company6.png", alt: "Company 6" },
  { id: 7, src: "/logos/company7.png", alt: "Company 7" },
];

const Carousel = () => {
  return (
    <div className="overflow-hidden py-6">
      <div className="flex w-max animate-slide">
        {companies.map((company, index) => (
          <div key={index} className="w-40 mx-4 flex flex-col items-center justify-center flex-shrink-0">
            <div className="w-16 h-16 rounded-xl bg-orange-200" />
            <h2>{company.alt}</h2>
          </div>
        ))}
        {companies.map((company, index) => (
          <div key={index + companies.length} className="w-40 mx-4 flex flex-col items-center justify-center flex-shrink-0">
            <div className="w-16 h-16 rounded-xl bg-orange-200" />
            <h2>{company.alt}</h2>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Carousel;