import React, { useState, useMemo } from "react";
import { CERTIFICATES, CertificateItem } from "../../data/certificatesData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  X,
  Maximize2,
  ImageIcon,
} from "lucide-react";

type CategoryFilter = "ALL" | "AI & ML" | "WEB DEV" | "BACKEND & CLOUD";

const ITEMS_PER_PAGE = 4;

export function CertificatesSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("ALL");
  const [modalCert, setModalCert] = useState<CertificateItem | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filteredCerts = useMemo(() => {
    if (selectedCategory === "ALL") return CERTIFICATES;
    if (selectedCategory === "AI & ML") {
      return CERTIFICATES.filter((c) => c.category === "Artificial Intelligence");
    }
    if (selectedCategory === "WEB DEV") {
      return CERTIFICATES.filter((c) => c.category === "Web Development");
    }
    if (selectedCategory === "BACKEND & CLOUD") {
      return CERTIFICATES.filter(
        (c) => c.category === "Cloud & Backend" || c.category === "Computer Science"
      );
    }
    return CERTIFICATES;
  }, [selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredCerts.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const displayedCerts = useMemo(() => {
    const startIdx = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredCerts.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredCerts, safeCurrentPage]);

  const handleCategoryChange = (cat: CategoryFilter) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (safeCurrentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (safeCurrentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="certificates"
      className="relative w-full h-full flex flex-col justify-center px-3 sm:px-6 md:px-16 max-w-[1700px] mx-auto overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* MOBILE VIEW (<= 768px): Centered 2-Column Scrollable Small Cards          */}
      {/* ========================================================================= */}
      <div className="flex md:hidden flex-col w-full my-auto justify-center">
        {/* Mobile Header */}
        <div className="pb-2 border-b border-[#00f5c4]/20 mb-2">
          <div className="flex items-center justify-between mb-1">
            <div className="font-['DM_Mono'] text-[10px] tracking-[0.25em] uppercase text-[#00f5c4] flex items-center gap-1.5">
              06 — CERTIFICATIONS
            </div>
            <span className="font-['DM_Mono'] text-[9px] text-white/50 bg-[#000c1a]/80 px-2 py-0.5 rounded border border-white/10">
              {filteredCerts.length} CERTIFICATES
            </span>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {(["ALL", "AI & ML", "WEB DEV", "BACKEND & CLOUD"] as CategoryFilter[]).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-2 py-0.5 rounded-md font-['DM_Mono'] text-[9px] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-[#00f5c4] text-[#020817] font-bold shadow-[0_0_10px_rgba(0,245,196,0.3)]"
                      : "bg-white/5 border border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Scrollable Small Cards Grid Centered */}
        <div
          className="grid grid-cols-2 gap-2.5 overflow-y-auto max-h-[54dvh] sm:max-h-[60dvh] no-scrollbar pr-0.5 pb-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {filteredCerts.map((cert) => {
            const hasImgError = imgErrors[cert.id];
            return (
              <div
                key={cert.id}
                className="group flex flex-col justify-between rounded-2xl bg-[#000c1a]/85 backdrop-blur-xl border border-white/10 p-2.5 shadow-lg transition-all duration-300 hover:border-[#00f5c4]/50 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-20 h-20 pointer-events-none rounded-full blur-xl opacity-15"
                  style={{ background: cert.accent }}
                />

                {/* Top: Square Thumbnail with Click-to-Inspect */}
                <div
                  onClick={() => setModalCert(cert)}
                  className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#000611] border border-white/10 mb-2 cursor-pointer group/img flex items-center justify-center"
                >
                  {!hasImgError ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      onError={() => handleImageError(cert.id)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-center">
                      <ImageIcon className="w-5 h-5 text-white/30 mb-1" />
                      <span className="font-['DM_Mono'] text-[8px] text-white/40">Certificate</span>
                    </div>
                  )}

                  {/* Issuer Chip Overlay */}
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded font-['DM_Mono'] text-[8px] uppercase tracking-wider bg-[#000c1a]/90 backdrop-blur-md border border-white/10 text-white/80 max-w-[90px] truncate">
                    {cert.issuer}
                  </div>

                  {/* Hover/Tap Inspect Seal */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white font-['DM_Mono'] text-[9px] uppercase tracking-wider backdrop-blur-[2px]">
                    <Maximize2 className="w-3 h-3 text-[#00f5c4]" />
                    <span>Inspect</span>
                  </div>
                </div>

                {/* Middle: Title & Year */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-['Archivo_Black'] text-xs text-[#edeae1] leading-tight line-clamp-2 mb-1 group-hover:text-white transition-colors">
                      {cert.title}
                    </h3>
                    <div className="flex items-center justify-between font-['DM_Mono'] text-[8px] text-white/50 mb-2">
                      <span>{cert.issueDate}</span>
                      <span className="text-[#00f5c4] font-bold">VERIFIED</span>
                    </div>
                  </div>

                  {/* Bottom: Action Buttons */}
                  <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/10">
                    <button
                      onClick={() => setModalCert(cert)}
                      className="flex-1 py-1 px-1.5 rounded-lg font-['DM_Mono'] text-[8.5px] uppercase tracking-wider border border-white/15 bg-white/5 text-white/70 hover:text-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Details</span>
                    </button>

                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1 px-1.5 rounded-lg font-['DM_Mono'] text-[8.5px] uppercase tracking-wider border border-[#00f5c4]/40 bg-[#00f5c4]/10 text-[#00f5c4] font-bold flex items-center justify-center gap-1 hover:bg-[#00f5c4] hover:text-[#020817] transition-all shadow-[0_0_8px_rgba(0,245,196,0.15)] cursor-pointer"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (> 768px): 4-Column Grid with Pagination & Categories         */}
      {/* ========================================================================= */}
      <div className="hidden md:block w-full my-auto">
        <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b border-[#00f5c4]/20 mb-4 pr-16">
          <div>
            <div className="font-['DM_Mono'] text-sm tracking-[0.3em] uppercase mb-1.5 text-[#00f5c4] flex items-center gap-2">
              06 — CERTIFICATIONS & CREDENTIALS
            </div>
            <h2 className="font-['Archivo_Black'] text-4xl md:text-5xl text-[#edeae1] leading-none">
              OFFICIAL CERTIFICATIONS
            </h2>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {(["ALL", "AI & ML", "WEB DEV", "BACKEND & CLOUD"] as CategoryFilter[]).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3.5 py-1 rounded-lg font-['DM_Mono'] text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-[#00f5c4] text-[#020817] font-bold shadow-[0_0_15px_rgba(0,245,196,0.35)]"
                      : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${safeCurrentPage}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 py-1 px-1 focus:outline-none"
          >
            {displayedCerts.map((cert) => {
              const hasImgError = imgErrors[cert.id];
              return (
                <div
                  key={cert.id}
                  className="section-card group rounded-2xl border border-white/10 bg-[#000c1a]/85 backdrop-blur-xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#00f5c4]/50 hover:shadow-[0_0_25px_rgba(0,245,196,0.15)] relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-full blur-2xl opacity-15 group-hover:opacity-35 transition-opacity"
                    style={{ background: cert.accent }}
                  />

                  <div
                    onClick={() => setModalCert(cert)}
                    className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-[#000611] mb-3 flex items-center justify-center cursor-pointer group/img"
                  >
                    {!hasImgError ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        onError={() => handleImageError(cert.id)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-3 text-center">
                        <ImageIcon className="w-6 h-6 text-white/30 mb-1" />
                        <span className="font-['DM_Mono'] text-[9px] text-white/40">
                          Preview Unavailable
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-['DM_Mono'] text-[10px] tracking-wider uppercase backdrop-blur-[2px]">
                      <Maximize2 className="w-3.5 h-3.5 text-[#00f5c4]" />
                      <span>Inspect</span>
                    </div>

                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded font-['DM_Mono'] text-[9px] uppercase tracking-wider bg-[#000c1a]/90 backdrop-blur-md border border-white/10 text-white/80">
                      {cert.issuer}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-white/50 font-['DM_Mono'] text-[10px] mb-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-white/40" />
                          {cert.issueDate}
                        </span>
                        <span className="text-[#00f5c4]/80 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          VERIFIED
                        </span>
                      </div>

                      <h3 className="font-['Archivo_Black'] text-base md:text-lg text-[#edeae1] mb-1 leading-snug line-clamp-2 group-hover:text-white transition-colors">
                        {cert.title}
                      </h3>

                      <div className="flex flex-wrap gap-1 my-1.5">
                        {cert.skills.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="font-['DM_Mono'] text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 mt-1.5 border-t border-white/10 flex items-center justify-between gap-1.5">
                      <button
                        onClick={() => setModalCert(cert)}
                        className="inline-flex items-center gap-1 font-['DM_Mono'] px-2 py-0.5 rounded-md border border-white/15 bg-white/5 text-[10px] uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer"
                      >
                        <span>Details</span>
                      </button>

                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-['DM_Mono'] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#00f5c4] text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] transition-all duration-300 shadow-[0_0_10px_rgba(0,245,196,0.15)] cursor-pointer"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="w-full flex items-center justify-between pt-2 mt-2 border-t border-white/10 pr-16">
          <div className="font-['DM_Mono'] text-[11px] text-white/50 select-none pointer-events-none">
            Showing {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
            {Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredCerts.length)} of {filteredCerts.length} credentials
          </div>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  safeCurrentPage === pg
                    ? "w-6 bg-[#00f5c4] shadow-[0_0_10px_#00f5c4]"
                    : "w-2 bg-white/20 hover:bg-white/50"
                }`}
                title={`Go to Page ${pg}`}
                aria-label={`Go to Page ${pg}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevPage}
              disabled={safeCurrentPage === 1}
              className={`px-3 py-1 rounded-lg font-['DM_Mono'] text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                safeCurrentPage === 1
                  ? "border-white/5 text-white/20 cursor-not-allowed bg-white/[0.02]"
                  : "border-white/20 text-white/70 hover:text-[#00f5c4] hover:border-[#00f5c4] bg-white/5"
              }`}
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={safeCurrentPage === totalPages}
              className={`px-3 py-1 rounded-lg font-['DM_Mono'] text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                safeCurrentPage === totalPages
                  ? "border-white/5 text-white/20 cursor-not-allowed bg-white/[0.02]"
                  : "border-white/20 text-white/70 hover:text-[#00f5c4] hover:border-[#00f5c4] bg-white/5"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Inspection Modal */}
      {modalCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none"
          onClick={() => setModalCert(null)}
        >
          <div
            className="relative w-full max-w-xl p-4 sm:p-6 md:p-8 rounded-2xl bg-[#000c1a]/95 border border-[#00f5c4]/40 shadow-[0_0_60px_rgba(0,245,196,0.3)] text-left max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalCert(null)}
              className="absolute top-3 right-3 p-1.5 rounded-lg border border-white/10 text-white/60 hover:text-[#00f5c4] hover:border-[#00f5c4]/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[#00f5c4] font-['DM_Mono'] text-[10px] sm:text-xs tracking-widest uppercase mb-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>CERTIFICATE DETAILS</span>
            </div>

            <h3 className="font-['Archivo_Black'] text-lg sm:text-2xl text-[#edeae1] mb-2 leading-snug">
              {modalCert.title}
            </h3>

            <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-xl overflow-hidden border border-white/15 bg-[#000611] my-2 sm:my-3 flex items-center justify-center">
              <img
                src={modalCert.image}
                alt={modalCert.title}
                onError={() => handleImageError(modalCert.id)}
                className="w-full h-full object-contain bg-black/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3 text-[10px] sm:text-xs font-['DM_Mono'] text-white/60">
              <span className="px-2 py-0.5 rounded bg-[#00f5c4]/10 text-[#00f5c4] border border-[#00f5c4]/30">
                {modalCert.issuer}
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                {modalCert.issueDate}
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#00f5c4]">
                VERIFIED
              </span>
            </div>

            <p className="font-['DM_Mono'] text-[11px] sm:text-xs text-white/80 leading-relaxed mb-3">
              {modalCert.description}
            </p>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => setModalCert(null)}
                className="px-3 py-1.5 rounded-xl font-['DM_Mono'] text-xs uppercase tracking-wider text-white/60 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <a
                href={modalCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-['DM_Mono'] text-xs uppercase tracking-wider bg-[#00f5c4] text-[#020817] font-bold hover:bg-[#00f5c4]/90 transition-all shadow-[0_0_20px_rgba(0,245,196,0.4)] cursor-pointer"
              >
                <span>Verify</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}