export default function Stats() {
    const statsData = [
      {
        image: "/briefcase.png",
        stats: "24k",
        title: "Live Job",
      },
      {
        image: "/companies.png",
        stats: "600,000",
        title: "Companies",
      },
      {
        image:"/candidates.png",
        stats: "800+",
        title: "Candidates",
      },
      {
        image: "/briefcase.png",
        stats: "670,000",
        title: "New Job",
      },
    ];
  
    return (
      <div className="flex gap-5 pb-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="w-[312px] h-[112px] p-5 flex flex-col items-center justify-center rounded-tl-[8px] rounded-br-[8px] bg-gray-200 opacity-100"
          >
            <img src={stat.image} alt={stat.title} className="w-12 h-12 object-cover mb-2" />
           
            <p className="text-xl">{stat.stats}</p>
            <p className=" font-inter text-xl text-jet-black">{stat.title}</p>
          </div>
        ))}
      </div>
    );
  }
  