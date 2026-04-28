import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ChevronRight, ArrowRight, Layers, Cpu, Shield, Globe, Star, Code2, Zap, BrainCircuit, BarChart3 } from 'lucide-react';
import Hero3D from './components/Hero3D';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
   const containerRef = useRef();

   useEffect(() => {
      // 1. SMOOTH SCROLL (LENIS)
      const lenis = new Lenis({
         duration: 1.5,
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         smoothWheel: true,
      });

      function raf(time) {
         lenis.raf(time);
         requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // 2. REVEALS

      // CINEMATIC REVEALS
      const reveals = document.querySelectorAll('.reveal-up');
      reveals.forEach((el) => {
         gsap.fromTo(el,
            { opacity: 0, y: 50, filter: 'blur(10px)' },
            {
               scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  toggleActions: "play none none reverse"
               },
               opacity: 1,
               y: 0,
               filter: 'blur(0px)',
               duration: 1.2,
               ease: "power3.out"
            }
         );
      });

      // SCROLL SCRUBBING FOR BIG TITLES
      gsap.utils.toArray('.scrub-text').forEach(text => {
         gsap.to(text, {
            scrollTrigger: {
               trigger: text,
               start: "top bottom",
               end: "bottom top",
               scrub: 1,
            },
            x: -100,
            opacity: 1
         });
      });

      return () => {
         lenis.destroy();
,StartLine:72,TargetContent:         ScrollTrigger.getAll().forEach(t => t.kill());
      };
   }, []);

   return (
      <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-white/10 overflow-hidden font-sans">
         {/* CINEMATIC OVERLAYS */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[9998] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black z-[50]" />

         {/* NAVIGATION */}
         <nav className="fixed top-0 w-full z-[100] px-8 md:px-16 py-8 flex justify-between items-center mix-blend-difference">
            <div className="flex items-center gap-6 group cursor-pointer">
               <div className="relative w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-all duration-700">
                  <span className="text-xl font-black italic tracking-tighter relative z-10">M</span>
               </div>
               <div className="flex flex-col hidden sm:flex">
                  <span className="text-[13px] font-black uppercase tracking-[0.5em]">Maven Studio</span>
                  <span className="text-[8px] uppercase tracking-[0.3em] opacity-30 font-bold">Architectural AI Bureau</span>
               </div>
            </div>

            <div className="hidden lg:flex gap-16 text-[10px] font-bold uppercase tracking-[0.4em]">
               {['Решения', 'Метод', 'Проекты', 'Контакты'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="opacity-40 hover:opacity-100 transition-all duration-500 relative group">
                     {item}
                     <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" />
                  </a>
               ))}
            </div>

            <motion.button
               whileHover={{ scale: 1.05 }}
               className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest"
            >
               Обсудить проект
            </motion.button>
         </nav>

         <main className="relative z-10">
            {/* HERO */}
            <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
               <Hero3D />
               <div className="relative z-10 hero-parallax">
                  <motion.div
                     initial={{ opacity: 0, tracking: "0em" }}
                     animate={{ opacity: 0.3, tracking: "1.2em" }}
                     transition={{ duration: 3 }}
                     className="text-[9px] font-black uppercase mb-12 text-white"
                  >
                     The Silent Authority
                  </motion.div>

                  <motion.h1
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0, letterSpacing: ["-0.05em", "0.08em", "-0.05em"] }}
                     transition={{ 
                        opacity: { duration: 2 },
                        y: { duration: 2 },
                        letterSpacing: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                     }}
                     className="text-[15vw] lg:text-[12vw] font-black leading-[0.75] text-gradient uppercase mb-12 tracking-tightest"
                  >
                     MAVEN <br className="hidden lg:block" /> STUDIO
                  </motion.h1>

                  <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 0.2 }}
                     transition={{ duration: 3, delay: 1 }}
                     className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed tracking-[0.4em] uppercase italic"
                  >
                     Проектирование цифрового превосходства.
                  </motion.p>
               </div>

               {/* SOFT SEAMLESS TRANSITION */}
               <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-[5] pointer-events-none" />

               {/* SCROLL INDICATOR */}
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4, duration: 2 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
               >
                  <span className="shimmer-text text-[10px] font-black uppercase tracking-[0.5em]">Scroll to Explore</span>
                  <motion.div 
                     animate={{ y: [0, 8, 0] }}
                     transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                     className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
                  />
               </motion.div>
            </section>

            {/* SOLUTIONS - CHAPTER 01 */}
            <section id="решения" className="min-h-screen py-32 px-8 md:px-24 flex flex-col justify-center relative overflow-hidden">
               {/* BACKGROUND ASSET */}
               <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[60%] h-full z-0 opacity-50 pointer-events-none reveal-up">
                  <img
                     src="/maven_solutions.png"
                     alt="Solutions"
                     className="w-full h-full object-contain mix-blend-screen"
                  />
               </div>

               <div className="max-w-7xl mx-auto relative z-10">
                  <div className="reveal-up">
                     <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[1px] bg-white/20" />
                        <span className="text-[11px] font-black text-white/30 uppercase tracking-[1em]">Chapter_01 / Expertise</span>
                     </div>
                     <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tightest leading-[0.8] mb-16 max-w-4xl">
                        Инженерия <br /> <span className="text-gradient">Интеллекта.</span>
                     </h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-2xl">
                        {[
                           { title: 'Neural UI', desc: 'Интерфейсы, которые адаптируются под паттерны поведения пользователя в реальном времени.', icon: <BrainCircuit className="text-white/20" /> },
                           { title: 'Cognitive Web', desc: 'Платформы, способные предсказывать запрос пользователя еще до клика.', icon: <Zap className="text-white/20" /> },
                           { title: 'Data Sovereignty', desc: 'Протоколы защиты данных, обеспечивающие абсолютный суверенитет бренда.', icon: <Shield className="text-white/20" /> },
                           { title: 'Predictive Sales', desc: 'ИИ-агенты, которые закрывают сделки, общаясь на языке вашего бренда.', icon: <BarChart3 className="text-white/20" /> }
                        ].map((item, i) => (
                           <div key={i} className="group cursor-pointer">
                              <div className="mb-4 group-hover:scale-110 transition-transform duration-500 origin-left">{item.icon}</div>
                              <h3 className="text-lg font-black uppercase mb-2 tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">{item.title}</h3>
                              <p className="text-[10px] text-white/20 uppercase tracking-widest leading-loose">{item.desc}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-[5] pointer-events-none" />
            </section>

            {/* METHODOLOGY - CHAPTER 02 */}
            <section id="метод" className="min-h-screen py-32 px-8 flex flex-col justify-center bg-black relative">
               <div className="max-w-7xl mx-auto w-full">
                  <div className="mb-32 reveal-up">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-white/20" />
                        <span className="text-[11px] font-black text-white/30 uppercase tracking-[1em]">Chapter_02 / Process</span>
                     </div>
                     <h2 className="text-7xl md:text-[8vw] font-black uppercase tracking-tightest leading-[0.8]">
                        Алхимия <br /> <span className="text-gradient italic">Смысла.</span>
                     </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {[
                        { step: '01', label: 'Экстракция', text: 'Мы извлекаем самую суть вашего продукта, отсекая маркетинговый шум и концентрируясь на чистой ценности.' },
                        { step: '02', label: 'Дистилляция', text: 'Проектирование чистого опыта. Каждая линия, каждый пиксель должен иметь глубокое архитектурное обоснование.' },
                        { step: '03', label: 'Синтез', text: 'Объединение дизайна и ИИ в единую, бесшовную экосистему, готовую к абсолютному доминированию.' }
                     ].map((item, i) => (
                        <div key={i} className="group relative p-12 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-700 reveal-up overflow-hidden">
                           {/* ACCENT LINE */}
                           <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-1000" />
                           
                           {/* GHOST NUMBER */}
                           <span className="absolute -right-4 -bottom-8 text-[12rem] font-black text-white/[0.02] group-hover:text-white/[0.05] transition-all duration-1000 select-none">
                              {item.step}
                           </span>

                           <div className="relative z-10">
                              <span className="text-xs font-black text-white/20 uppercase tracking-[0.5em] block mb-12">{item.step} — System</span>
                              <h3 className="text-2xl font-black uppercase mb-6 tracking-tighter group-hover:text-gradient transition-all">{item.label}</h3>
                              <p className="text-xs text-white/40 uppercase tracking-widest leading-loose max-w-[240px]">
                                 {item.text}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* PROJECTS - CHAPTER 03 */}
            <section id="проекты" className="bg-black min-h-screen py-32 px-8 md:px-16 overflow-hidden">
               <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-40 reveal-up">
                     <div className="relative">
                        <div className="flex items-center gap-4 mb-8">
                           <div className="w-12 h-[1px] bg-white/20" />
                           <span className="text-[11px] font-black text-white/30 uppercase tracking-[1em]">Chapter_03 / Artifacts</span>
                        </div>
                        <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tightest leading-[0.8]">
                           Цифровые <br /> <span className="text-gradient">Артефакты.</span>
                        </h2>
                     </div>
                     <div className="mt-12 md:mt-0 max-w-xs">
                        <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] leading-loose font-bold border-l border-white/10 pl-6">
                           Мы создаем не просто продукты, а цифровые монументы, определяющие будущее индустрий.
                        </p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                     {/* PROJECT 01 - AEON FINANCE */}
                     <div className="md:col-span-8 group relative reveal-up">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[40px] border border-white/5 bg-zinc-950">
                           <motion.div 
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="w-full h-full"
                           >
                              <img 
                                 src="/project_aeon.png" 
                                 alt="Aeon Finance" 
                                 className="w-full h-full object-cover mix-blend-screen opacity-80 group-hover:opacity-100 transition-all duration-1000" 
                              />
                           </motion.div>
                           
                           {/* OVERLAY INFO */}
                           <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none">
                              <span className="text-xs font-black text-white/40 uppercase tracking-[0.5em] mb-4">01 / Fintech Ecosystem</span>
                              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 group-hover:text-gradient transition-all">Aeon Finance</h3>
                              <div className="flex gap-4">
                                 <span className="px-4 py-2 rounded-full border border-white/10 text-[8px] font-black uppercase tracking-widest bg-white/5">Neural Interface</span>
                                 <span className="px-4 py-2 rounded-full border border-white/10 text-[8px] font-black uppercase tracking-widest bg-white/5">Real-time Auth</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* PROJECT 02 - CYBER LOGISTICS */}
                     <div className="md:col-span-4 md:mt-48 group relative reveal-up">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-white/5 bg-zinc-950">
                           <motion.div 
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="w-full h-full"
                           >
                              <img 
                                 src="/project_cyber.png" 
                                 alt="Cyber Logistics" 
                                 className="w-full h-full object-cover mix-blend-screen opacity-80 group-hover:opacity-100 transition-all duration-1000" 
                              />
                           </motion.div>

                           {/* OVERLAY INFO */}
                           <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none">
                              <span className="text-xs font-black text-white/40 uppercase tracking-[0.5em] mb-4">02 / Infrastructure</span>
                              <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">Cyber <br /> Logistics</h3>
                              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                                 View Case <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* SECTION DIVIDER */}
               <div className="mt-40 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </section>

            {/* CONTACT - THE DIALOGUE */}
            <section id="контакты" className="min-h-screen py-32 px-8 md:px-24 flex flex-col justify-center relative">
               <div className="max-w-4xl mx-auto w-full">
                  <div className="mb-24 reveal-up text-center">
                     <h2 className="text-8xl md:text-[12vw] font-black uppercase leading-[0.8] tracking-tightest mb-12">
                        Начать <br /> <span className="text-gradient italic">Диалог.</span>
                     </h2>
                  </div>

                  <div className="glass-panel p-12 md:p-20 rounded-[60px] border-white/5 relative overflow-hidden reveal-up">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-12">
                           <div className="border-b border-white/10 pb-6 focus-within:border-white transition-colors">
                               <label className="text-[10px] font-black uppercase tracking-widest opacity-20 block mb-4">Your Identity</label>
                               <input type="text" placeholder="NAME" className="bg-transparent w-full outline-none text-2xl font-black placeholder:text-white/5" />
                           </div>
                           <div className="border-b border-white/10 pb-6 focus-within:border-white transition-colors">
                               <label className="text-[10px] font-black uppercase tracking-widest opacity-20 block mb-4">Contact Gateway</label>
                               <input type="text" placeholder="TG / EMAIL" className="bg-transparent w-full outline-none text-2xl font-black placeholder:text-white/5" />
                           </div>
                        </div>
                        <div className="flex flex-col justify-end">
                           <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-10 bg-white text-black text-[13px] font-black uppercase tracking-[0.6em] flex justify-center items-center gap-4 group rounded-2xl"
                           >
                              Отправить <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                           </motion.button>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>

         {/* FOOTER */}
         <footer className="py-32 px-8 md:px-24 bg-black border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-16 opacity-20 hover:opacity-60 transition-opacity duration-1000">
               <div>
                  <span className="text-[10vw] font-black uppercase tracking-tightest leading-none block -mb-4">MAVEN</span>
                  <span className="text-[10vw] font-black uppercase tracking-tightest leading-none">STUDIO</span>
               </div>
               <div className="text-right space-y-6">
                  <div className="text-[9px] font-black uppercase tracking-[1em] text-white/50">Autonomous Architecture Bureau</div>
                  <div className="text-[9px] uppercase tracking-[0.5em] flex gap-12 justify-end font-bold">
                     <span>ZURICH</span>
                     <span>DUBAI</span>
                     <span>LONDON</span>
                  </div>
                  <div className="pt-8 border-t border-white/5 text-[8px] opacity-30 tracking-[0.2em]">© 2024 MAVEN STUDIO WORLDWIDE. BUILT IN SILENCE.</div>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default App;
