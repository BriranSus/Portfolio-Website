import React, { useState, useMemo } from "react";
import { CERTIFICATES, CertificateItem } from "../../data/certificatesData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  X,
  FileBadge,
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
      setCurrentPage((p) => p + 1);
    }
  };

  const handlePrevPage = () => {
    if (safeCurrentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="certificates"
      className="relative w-full h-full flex flex-col justify-center px-6 md:px-16 max-w-[1700px] mx-auto overflow-hidden select-none"
    >
      <div className="w-full my-auto flex flex-col justify-between py-2">
        <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b border-[#00f5c4]/20 mb-4 pr-12 md:pr-16">
          <div>
            <div className="font-['DM_Mono'] text-xs md:text-sm tracking-[0.3em] uppercase mb-1.5 text-[#00f5c4] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#00f5c4] animate-pulse" />
              06 — CERTIFICATIONS & CREDENTIALS
            </div>
            <h2 className="font-['Archivo_Black'] text-3xl sm:text-4xl md:text-5xl text-[#edeae1] leading-none">
              VERIFIED CERTIFICATES
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-[#000c1a]/80 backdrop-blur-md p-1 rounded-xl border border-white/10">
              {(["ALL", "AI & ML", "WEB DEV"] as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1 rounded-lg font-['DM_Mono'] text-[10px] md:text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#00f5c4]/20 text-[#00f5c4] border border-[#00f5c4]/40 font-bold shadow-[0_0_10px_rgba(0,245,196,0.2)]"
                      : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs md:text-sm font-['DM_Mono'] text-white/70 bg-[#000c1a]/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 select-none pointer-events-none">
              [ PAGE 0{safeCurrentPage} / 0{totalPages} ]
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${safeCurrentPage}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 w-full my-auto"
          >
            {displayedCerts.map((cert) => {
              return (
                <div
                  key={cert.id}
                  className="section-card rounded-2xl p-4 md:p-5 bg-[#000c1a]/85 backdrop-blur-2xl border border-white/10 hover:border-[#00f5c4]/50 transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_0_25px_rgba(0,245,196,0.15)]"
                >
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/40" />
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/40" />
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/40" />
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/40" />

                  <div
                    className="absolute -top-10 -right-10 w-36 h-36 pointer-events-none rounded-full blur-3xl opacity-15 group-hover:opacity-35 transition-opacity duration-500"
                    style={{ background: cert.accent }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] md:grid-cols-[160px_1fr] gap-4 items-center">
                    <div
                      onClick={() => setModalCert(cert)}
                      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#000611] flex items-center justify-center cursor-pointer group/thumb hover:border-[#00f5c4]/60 transition-all"
                      title="Click to expand certificate"
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        onError={() => handleImageError(cert.id)}
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-[#000c1a]/70 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-[#00f5c4] font-['DM_Mono'] text-[10px] tracking-wider">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>PREVIEW</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/90 font-['DM_Mono'] text-[10px]">
                          <ShieldCheck className="w-3 h-3" style={{ color: cert.accent }} />
                          <span className="font-semibold">{cert.issuer}</span>
                        </div>

                        <span
                          className="font-['DM_Mono'] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border backdrop-blur-md font-bold"
                          style={{
                            borderColor: `${cert.accent}55`,
                            color: cert.accent,
                            backgroundColor: `${cert.accent}15`,
                          }}
                        >
                          {cert.category}
                        </span>
                      </div>

                      <h3 className="font-['Archivo_Black'] text-base sm:text-lg text-[#edeae1] mb-1 line-clamp-1 leading-snug">
                        {cert.title}
                      </h3>

                      <div className="flex items-center gap-3 text-white/50 font-['DM_Mono'] text-[10px] mb-2">
                        <span className="flex items-center gap-1">
                          <FileBadge className="w-3 h-3 text-[#00f5c4]" />
                          <span className="text-white/80 font-mono">{cert.credentialId}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-white/40" />
                          {cert.issueDate}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="font-['DM_Mono'] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="font-['DM_Mono'] text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                        <button
                          onClick={() => setModalCert(cert)}
                          className="inline-flex items-center gap-1 font-['DM_Mono'] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/20 text-white/80 bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 text-[#00f5c4]" />
                          <span>Details</span>
                        </button>

                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-['DM_Mono'] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#00f5c4] text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] transition-all duration-300 shadow-[0_0_10px_rgba(0,245,196,0.15)] cursor-pointer"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="w-full flex items-center justify-between pt-3 mt-3 border-t border-white/10 pr-12 md:pr-16">
          <div className="font-['DM_Mono'] text-[11px] text-white/50 select-none pointer-events-none">
            Showing {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
            {Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredCerts.length)} of {filteredCerts.length} credentials
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  safeCurrentPage === pg
                    ? "w-8 bg-[#00f5c4] shadow-[0_0_10px_#00f5c4]"
                    : "w-2.5 bg-white/20 hover:bg-white/50"
                }`}
                title={`Go to Page ${pg}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
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

      {modalCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none"
          onClick={() => setModalCert(null)}
        >
          <div
            className="relative w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-[#000c1a]/95 border border-[#00f5c4]/40 shadow-[0_0_60px_rgba(0,245,196,0.3)] text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalCert(null)}
              className="absolute top-4 right-4 p-2 rounded-lg border border-white/10 text-white/60 hover:text-[#00f5c4] hover:border-[#00f5c4]/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[#00f5c4] font-['DM_Mono'] text-xs tracking-widest uppercase mb-2">
              <Award className="w-4 h-4" />
              <span>CERTIFICATE INSPECTION SEAL</span>
            </div>

            <h3 className="font-['Archivo_Black'] text-2xl md:text-3xl text-[#edeae1] mb-2 leading-snug">
              {modalCert.title}
            </h3>

            <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-xl overflow-hidden border border-white/15 bg-[#000611] my-4 flex items-center justify-center">
              <img
                src={modalCert.image}
                alt={modalCert.title}
                onError={() => handleImageError(modalCert.id)}
                className="w-full h-full object-contain bg-black/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-['DM_Mono'] text-white/60">
              <span className="px-2.5 py-1 rounded bg-[#00f5c4]/10 text-[#00f5c4] border border-[#00f5c4]/30">
                {modalCert.issuer}
              </span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
                Issued {modalCert.issueDate}
              </span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#00f5c4]">
                STATUS: VERIFIED
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 mb-4 font-['DM_Mono'] text-xs">
              <div className="text-white/40 mb-1 tracking-wider uppercase text-[10px]">
                Credential Identifier
              </div>
              <div className="text-[#00f5c4] font-mono text-sm tracking-wide">
                {modalCert.credentialId}
              </div>
            </div>

            <p className="font-['DM_Mono'] text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
              {modalCert.description}
            </p>

            <div className="mb-6">
              <div className="font-['DM_Mono'] text-[11px] uppercase tracking-wider text-white/50 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5c4]" />
                Demonstrated Competencies
              </div>
              <div className="flex flex-wrap gap-2">
                {modalCert.skills.map((s) => (
                  <span
                    key={s}
                    className="font-['DM_Mono'] text-xs px-3 py-1 rounded-lg bg-[#00f5c4]/10 border border-[#00f5c4]/30 text-[#00f5c4]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setModalCert(null)}
                className="px-4 py-2 rounded-xl font-['DM_Mono'] text-xs uppercase tracking-wider text-white/60 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <a
                href={modalCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-['DM_Mono'] text-xs uppercase tracking-wider bg-[#00f5c4] text-[#020817] font-bold hover:bg-[#00f5c4]/90 transition-all shadow-[0_0_20px_rgba(0,245,196,0.4)] cursor-pointer"
              >
                <span>Direct Verification</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
