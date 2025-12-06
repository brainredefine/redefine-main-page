"use client";

type LinkItem = {
  title: string;
  description: string;
  href: string;
  lastUpdate?: string;
  statusColor?: string; // "green" | "orange" | "red" etc.
};

type Section = {
  title: string;
  links: LinkItem[];
};

export default function ClientApp({ sections }: { sections: Section[] }) {
  
  // Fonction pour obtenir les initiales (ex: "Facility Management" -> "Fa")
  const getInitials = (text: string) => text.substring(0, 2).toUpperCase();

  // Fonction pour gérer la couleur du point
  const getStatusColorClass = (color?: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"; // Orange avec lueur
      case "red":
        return "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"; // Rouge avec lueur
      default:
        return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"; // Vert par défaut
    }
  };

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.title} className="space-y-6">
          
          {/* Titre de section minimaliste */}
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider pl-1">
            {section.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {section.links.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative"
              >
                <div className="flex items-start justify-between mb-4">
                  {/* Badge Initiales (Remplace l'image moche) */}
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 font-bold text-sm tracking-tight group-hover:bg-gray-100 group-hover:text-gray-900 transition-colors">
                    {getInitials(link.title)}
                  </div>

                  {/* Flèche qui apparait au hover */}
                  <span className="opacity-0 group-hover:opacity-100 text-gray-400 transition-opacity transform translate-x-[-5px] group-hover:translate-x-0">
                    ↗
                  </span>
                </div>

                {/* Titre */}
                <h3 className="font-semibold text-gray-900 text-base mb-1">
                  {link.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2">
                  {link.description}
                </p>

                {/* Footer : Last Update + Status Dot */}
                {link.lastUpdate && (
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-gray-400">
                      Updated {link.lastUpdate}
                    </span>
                    
                    {/* Le fameux point de couleur plus gros */}
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColorClass(link.statusColor)}`}></div>
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}