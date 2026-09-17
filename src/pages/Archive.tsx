import { useState } from "react";
import { Link } from "wouter";
import { FolderHeart, ArrowRight, Calendar, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/Card";
import { ARCHIVES } from "../data/mock";
import { cn } from "../utils/cn";

export function Archive() {
  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  // Filter archives by year, sorted latest first (although we don't have exact dates in mock, we sort by ID or keep as is if no date)
  // Assuming ID roughly correlates to chronological order, but we can just filter for now.
  const filteredArchives = ARCHIVES.filter(archive => archive.year === selectedYear);

  return (
    <div className="flex flex-col w-full fade-in pb-24">
      {/* Page Header */}
      <section className="bg-surface pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary tracking-tight">
            Arsip Perjalanan
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            Menelusuri jejak langkah, album kegiatan, dan memori pelayanan GP Jatipon dari tahun ke tahun.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 w-full flex flex-col md:flex-row gap-12">
        {/* Year Selector Sidebar */}
        <div className="w-full md:w-48 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-6 px-2">Pilih Tahun</h3>
            <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0 hide-scrollbar">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  aria-current={selectedYear === year ? "true" : undefined}
                  className={cn(
                    "text-left px-4 py-3 rounded-xl transition-colors font-medium flex-shrink-0 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ring-offset-background",
                    selectedYear === year 
                      ? "bg-surface border border-white/10 text-accent shadow-sm" 
                      : "text-text-muted hover:text-text-primary hover:bg-surface/50 border border-transparent"
                  )}
                >
                  <span className="text-lg">{year}</span>
                  {selectedYear === year && <ArrowRight className="h-4 w-4 hidden md:block" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="flex-grow">
          <div className="mb-8 border-b border-white/5 pb-4">
            <h2 className="text-3xl font-serif text-text-primary">Tahun {selectedYear}</h2>
          </div>

          {filteredArchives.length > 0 ? (
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {filteredArchives.map((archive) => (
                <div key={archive.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Timeline Node */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-surface text-accent shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                    <Calendar className="h-4 w-4" />
                  </div>
                  
                  {/* Timeline Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4">
                    <Card className="bg-surface border-white/5 hover:border-accent/30 transition-colors h-full">
                      <CardHeader className="pb-3">
                        <div className="text-accent text-xs font-bold tracking-widest mb-1">{archive.year}</div>
                        <CardTitle className="text-xl group-hover:text-accent transition-colors line-clamp-2">
                          <Link href={`/arsip/${archive.slug}`}><a>{archive.title}</a></Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-text-muted line-clamp-3 leading-relaxed">{archive.description}</p>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Link href={`/arsip/${archive.slug}`}>
                          <a className="inline-flex items-center text-sm font-medium text-text-primary hover:text-accent transition-colors">
                            Lihat Detail <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-50" />
                          </a>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center bg-surface border border-white/5 rounded-2xl border-dashed">
              <FolderHeart className="h-12 w-12 text-text-muted/30 mb-4" />
              <h3 className="text-xl font-medium text-text-primary mb-2">Belum ada arsip untuk tahun ini.</h3>
              <p className="text-text-muted text-sm max-w-sm">Data arsip kegiatan tahun {selectedYear} belum didokumentasikan ke dalam sistem.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
