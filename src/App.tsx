import { useEffect, useRef, useState } from 'react';
import { CircleCheck, ShieldCheck, Sparkles } from 'lucide-react';
import {
  BENEFITS,
  BONUS_GUIDES,
  CHECKOUT_LINKS,
  COLLECTION_MARQUEE_1,
  COLLECTION_MARQUEE_2,
  COLLECTION_MARQUEE_3,
  FAQ_ITEMS,
  LUMINARIAS_IMAGES,
  PREMIUM_MARQUEE_1,
  PREMIUM_MARQUEE_2,
  TESTIMONIALS,
} from './data/catalog';
import { FaqAccordion } from './components/FaqAccordion';
import { LuminariasCarousel } from './components/LuminariasCarousel';
import { MarqueeRow } from './components/MarqueeRow';
import { OfferModals } from './components/OfferModals';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { VideoHeroPlayer } from './components/VideoHeroPlayer';

export default function App() {
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const exitShownRef = useRef(false);

  const scrollToOffer = () => {
    const el = document.getElementById('oferta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const mountedAt = Date.now();
    const handleMouseLeave = (e: MouseEvent) => {
      const elapsed = Date.now() - mountedAt;
      if (
        window.innerWidth >= 768 &&
        !exitShownRef.current &&
        elapsed >= 10000 &&
        e.clientY <= 0
      ) {
        exitShownRef.current = true;
        setIsExitOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 antialiased selection:bg-[#c9a84c] selection:text-[#0d0d0d]">
      {/* Sticky Top Notice Bar */}
      <div
        id="notice-bar"
        className="bg-[#1a1a1a] py-2.5 text-center px-4 border-b border-[#c9a84c]/15 sticky top-0 z-40 backdrop-blur-md bg-opacity-95"
      >
        <p className="text-[#c9a84c] text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em]">
          ⚠️ ÚLTIMAS VAGAS — OFERTA SOME EM BREVE, SEM AVISO
        </p>
      </div>

      {/* Hero Section */}
      <section id="hero" className="py-8 md:py-14 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 px-3.5 py-1.5 rounded-full mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" aria-hidden="true" />
          <span className="text-[#c9a84c] text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em]">
            Mega Pack Católico · Edição 2026
          </span>
        </div>

        <h1 className="text-[26px] sm:text-[34px] md:text-[44px] font-normal text-[#f0d78c] mb-6 leading-[1.22] tracking-tight font-serif">
          +500 Arquivos STL de arte sacra prontos para você{' '}
          <span className="italic text-white">imprimir hoje</span>, vender amanhã e fazer
          parte da comunidade católica que fatura com{' '}
          <span className="italic text-[#c9a84c]">fé</span>
        </h1>

        <VideoHeroPlayer />

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-6 text-xs sm:text-sm text-gray-300">
          <div className="flex items-center gap-1.5">
            <CircleCheck className="w-4 h-4 text-[#c9a84c]" aria-hidden="true" />
            <span>+500 Modelos Testados</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CircleCheck className="w-4 h-4 text-[#c9a84c]" aria-hidden="true" />
            <span>Acesso Vitalício Imediato</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#c9a84c]" aria-hidden="true" />
            <span>Garantia de 7 Dias</span>
          </div>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto">
          Enquanto você espera, pessoas da comunidade católica já estão faturando com esses
          mesmos modelos. Deixe sua impressora 3D imprimir arte sacra e comece a transformar
          imagens de fé em renda todos os dias.
        </p>

        <button
          type="button"
          onClick={scrollToOffer}
          className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-sm sm:text-base py-4 sm:py-5 px-8 rounded-xl shadow-xl shadow-[#c9a84c]/20 hover:shadow-[#c9a84c]/40 transition-all uppercase tracking-[0.2em] cursor-pointer active:scale-98"
        >
          Quero Garantir Meu Acesso
        </button>
      </section>

      {/* Collection Section */}
      <section
        id="colecao"
        className="bg-[#141216] py-16 md:py-20 px-4 border-y border-[#c9a84c]/15 overflow-hidden content-auto"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-normal text-[#f0d78c] mb-10 leading-tight tracking-tight font-serif uppercase max-w-3xl mx-auto">
            VEJA TUDO O QUE VOCÊ VAI RECEBER NESSA COLEÇÃO EXCLUSIVA
          </h2>

          <div className="flex justify-center mb-12">
            <img
              src="/images/impressao3d.webp"
              alt="Impressão 3D Arte Sacra"
              loading="lazy"
              decoding="async"
              width={800}
              height={800}
              className="w-full max-w-lg aspect-square rounded-2xl shadow-2xl shadow-black border border-[#c9a84c]/20 object-cover"
            />
          </div>

          <h3 className="text-xl md:text-3xl font-normal text-white mb-4 leading-snug font-serif max-w-3xl mx-auto">
            SÃO + DE 500 ARQUIVOS{' '}
            <span className="italic text-[#c9a84c]">
              de arte sacra testados, otimizados e prontos para imprimir hoje mesmo
            </span>
          </h3>

          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-10">
            E dezenas de outros modelos exclusivos que só quem tem esse pack pode oferecer.
            Veja a variedade de peças que você pode transformar em impressões reais.
          </p>

          <div className="my-6 space-y-2 sm:space-y-3">
            <MarqueeRow images={COLLECTION_MARQUEE_1} direction="left" />
            <MarqueeRow images={COLLECTION_MARQUEE_2} direction="right" />
            <MarqueeRow images={COLLECTION_MARQUEE_3} direction="left" />
          </div>

          <p className="text-[#f0d78c] text-sm md:text-base font-medium max-w-2xl mx-auto mt-8 mb-8 px-4">
            São centenas de possibilidades reunidas em um único acervo para você não depender
            de pesquisas intermináveis por arquivos espalhados na internet.
          </p>

          <button
            type="button"
            onClick={scrollToOffer}
            className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 rounded-xl shadow-xl shadow-[#c9a84c]/10 transition-all uppercase tracking-[0.2em] cursor-pointer active:scale-98"
          >
            Quero Meus Modelos
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios-section" className="py-20 px-4 bg-[#0d0d0d] content-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-normal text-[#f0d78c] mb-12 tracking-tight font-serif">
            Veja como esse material pode transformar o seu negócio de arte sacra:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="beneficios">
            {BENEFITS.map((item) => (
              <div
                key={item.number}
                className="p-6 rounded-2xl bg-[#1a1a1a] border border-white/5 text-left transition-colors duration-200 hover:border-[#c9a84c]/20"
              >
                <span className="font-serif italic text-[#c9a84c] text-2xl font-normal">
                  {item.number}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed mt-3">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Luminarias Section */}
      <section
        id="bonus-luminarias"
        className="py-20 px-4 bg-[#0d0d0d] border-t border-[#c9a84c]/10 content-auto"
      >
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-[#c9a84c] text-[#0d0d0d] font-bold py-1.5 px-6 rounded-full uppercase text-[10px] tracking-[0.25em] mb-6">
            Bônus incluso
          </span>

          <h2 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-4 tracking-tight font-serif">
            E ainda tem um bônus especial…
          </h2>

          <h3 className="text-lg md:text-xl font-medium text-[#c9a84c] mb-4">
            Leve também o Pack de Luminárias 3D
          </h3>

          <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Além da coleção de arte sacra, você recebe modelos de luminárias para ampliar
            ainda mais seu catálogo.
          </p>

          <div className="mb-10">
            <LuminariasCarousel images={LUMINARIAS_IMAGES} />
          </div>

          <button
            type="button"
            onClick={scrollToOffer}
            className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 rounded-xl shadow-xl shadow-[#c9a84c]/10 uppercase tracking-[0.2em] transition-all cursor-pointer active:scale-98"
          >
            Quero Meus Bônus
          </button>
        </div>
      </section>

      {/* Premium Sacred Art Section */}
      <section
        id="premium"
        className="py-20 px-4 bg-[#141216] border-t border-[#c9a84c]/10 content-auto"
      >
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-gradient-to-r from-[#f0d78c] to-[#a56f1e] text-[#0d0d0d] font-bold py-1.5 px-6 rounded-full uppercase text-[10px] tracking-[0.25em] mb-6">
            Exclusivo do Plano Completo
          </span>

          <h2 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-4 tracking-tight font-serif">
            Artes Sacras Premium: as peças mais buscadas e que mais vendem
          </h2>

          <p className="text-[#c9a84c] font-semibold text-lg mb-4">
            A seleção com a maior qualidade do acervo
          </p>

          <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed text-sm md:text-base">
            São as peças de acabamento mais refinado, mais procuradas por quem imprime e as
            que mais convertem em venda. Esse bônus vem apenas no Plano Completo — não está
            incluso no Plano Básico.
          </p>

          <div className="my-6 space-y-2 sm:space-y-3">
            <MarqueeRow images={PREMIUM_MARQUEE_1} direction="left" />
            <MarqueeRow images={PREMIUM_MARQUEE_2} direction="right" />
          </div>

          <button
            type="button"
            onClick={scrollToOffer}
            className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 mt-6 rounded-xl shadow-xl shadow-[#c9a84c]/10 uppercase tracking-[0.2em] transition-all cursor-pointer active:scale-98"
          >
            Quero as Artes Sacras Premium
          </button>
        </div>
      </section>

      {/* Bonus Guides Section */}
      <section
        id="bonus-guias"
        className="py-20 px-4 bg-[#0d0d0d] border-t border-[#c9a84c]/10 content-auto"
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#c9a84c] text-[10px] uppercase tracking-[0.35em] mb-4 font-semibold">
            Bônus Inclusos
          </p>

          <h2 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-3 tracking-tight font-serif">
            Tudo o que você vai receber
          </h2>

          <h3 className="text-sm font-medium text-gray-400 mb-12 italic font-serif">
            Acesso Imediato, sem enrolação
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" id="guias">
            {BONUS_GUIDES.map((guide) => (
              <div
                key={guide.title}
                className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden hover:border-[#c9a84c]/25 transition-colors text-center"
              >
                <img
                  src={guide.image}
                  alt={guide.title}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6 text-center">
                  <h4 className="font-normal text-[#f0d78c] mb-2 text-lg tracking-tight font-serif">
                    {guide.title}
                  </h4>
                  <p className="text-gray-500 line-through text-xs mb-4">{guide.oldPrice}</p>
                  <span className="bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30 font-semibold py-2 px-6 rounded-full inline-block w-full uppercase text-[10px] tracking-[0.25em]">
                    Incluso
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToOffer}
            className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 rounded-xl shadow-xl shadow-[#c9a84c]/10 transition-all uppercase tracking-[0.2em] cursor-pointer active:scale-98"
          >
            Quero Tudo Isso
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="depoimentos"
        className="py-20 px-4 bg-[#0d0d0d] border-t border-[#c9a84c]/10 content-auto"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#c9a84c] text-[10px] uppercase tracking-[0.35em] mb-4 font-semibold">
            Depoimentos
          </p>

          <h3 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-12 tracking-tight font-serif">
            Quem já está imprimindo e vendendo arte sacra
          </h3>

          <TestimonialsCarousel images={TESTIMONIALS} />

          <button
            type="button"
            onClick={scrollToOffer}
            className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 mt-14 rounded-xl shadow-xl shadow-[#c9a84c]/10 uppercase tracking-[0.2em] transition-all cursor-pointer active:scale-98"
          >
            Quero Fazer Parte
          </button>
        </div>
      </section>

      {/* Offer Header */}
      <section
        id="oferta"
        className="pt-24 pb-8 px-4 bg-[#0d0d0d] text-center scroll-mt-12 content-auto"
      >
        <div className="inline-flex items-center gap-2 bg-[#1a1a1a] text-[#c9a84c] font-semibold px-6 py-2 rounded-full mb-8 uppercase text-[10px] md:text-xs tracking-[0.3em] border border-[#c9a84c]/30 shadow-lg shadow-black">
          🔥 OFERTA VÁLIDA POR TEMPO LIMITADO
        </div>

        <h2 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-4 leading-tight max-w-3xl mx-auto tracking-tight font-serif">
          Aproveite Enquanto o <span className="italic text-white">Plano Completo</span>{' '}
          está em promoção
        </h2>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-4 bg-[#0d0d0d] content-auto">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Basic Plan */}
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-8 flex flex-col items-center text-center hover:border-white/10 transition-colors">
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-3">
              Acesso Básico
            </span>
            <p className="text-4xl font-light text-white mb-6 tabular-nums">R$ 10,90</p>

            <ul className="text-left space-y-3 text-gray-400 text-sm mb-8 w-full">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>+500 Arquivos STL Católicos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Acesso Vitalício</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Envio Imediato</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Não inclui bônus</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => setIsUpsellOpen(true)}
              className="block w-full py-3.5 rounded-xl border border-[#c9a84c]/50 text-[#c9a84c] hover:bg-[#c9a84c]/10 font-semibold uppercase tracking-[0.2em] text-xs transition-colors mb-6 cursor-pointer"
            >
              Escolher Básico
            </button>

            <div className="text-[11px] text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
              97% dos alunos escolhem o Plano Completo →
            </div>
          </div>

          {/* Complete Plan */}
          <div className="bg-[#1a1a1a] rounded-2xl border-2 border-[#c9a84c] p-8 flex flex-col items-center text-center relative shadow-2xl shadow-[#c9a84c]/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#0d0d0d] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap shadow-md">
              Mais Vendido
            </div>

            <span className="text-[10px] text-[#f0d78c]/70 uppercase tracking-[0.3em] mt-2 mb-3">
              Mega Pack + Bônus
            </span>

            <div className="w-full mb-6">
              <img
                src="/images/mega-pack.webp"
                alt="Mega Pack Católico Completo"
                loading="lazy"
                decoding="async"
                width={600}
                height={600}
                className="w-full aspect-square rounded-xl border border-[#c9a84c]/20 object-cover"
              />
            </div>

            <ul className="text-left space-y-2.5 text-gray-300 text-sm mb-6 w-full">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>+500 Arquivos STL Católicos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>Uso comercial liberado e sem limite</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 1:</strong> Guia de
                  Produtos Católicos que Mais Vendem
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 2:</strong> Tabela
                  de Preços para Produtos 3D Católicos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 3:</strong> Guia de
                  Configuração para Impressão
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 4:</strong> Mockups
                  para Divulgação
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 5:</strong> Guia de
                  Acabamento e Pintura
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 6:</strong> Pack de
                  Luminárias 3D
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span className="text-[#f0d78c] font-medium flex items-center flex-wrap gap-2">
                  <strong className="font-semibold">Bônus 7:</strong> Artes Sacras Premium
                  <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    NOVO
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>Acesso Vitalício</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>Envio Imediato</span>
              </li>
            </ul>

            <div className="w-full border-t border-[#c9a84c]/15 pt-5 mb-2">
              <p className="text-gray-500 line-through text-xs">Valor Total: R$ 97,00</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.25em] mt-1">
                Hoje, pagamento único
              </p>
              <p className="text-5xl font-bold text-[#c9a84c] my-3 tabular-nums">
                R$ 37,90
              </p>
            </div>

            <a
              href={CHECKOUT_LINKS.completo}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-sm py-5 rounded-xl uppercase tracking-[0.2em] shadow-xl shadow-[#c9a84c]/20 transition-colors mb-5 active:scale-98 text-center"
            >
              Quero o Plano Completo
            </a>

            <div className="flex flex-wrap justify-center items-center gap-4 text-gray-500 text-[10px] uppercase tracking-[0.2em]">
              <span>🛡️ Garantida</span>
              <span>🔒 Segura</span>
              <span>⚡ Imediato</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section
        id="garantia"
        className="py-20 px-4 bg-[#1a1a1a] text-center border-t border-[#c9a84c]/10 content-auto"
      >
        <div className="max-w-3xl mx-auto">
          <img
            src="/images/garantia.webp"
            alt="Selo de 7 dias de garantia"
            loading="lazy"
            decoding="async"
            width={160}
            height={160}
            className="w-32 md:w-40 aspect-square object-contain mx-auto mb-6 drop-shadow-[0_10px_30px_rgba(201,168,76,0.35)]"
          />

          <h3 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-8 tracking-tight font-serif">
            Sua compra 100% segura e sem risco nenhum
          </h3>

          <div className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto space-y-5 text-left md:text-center">
            <p>
              Quero que você se sinta em paz ao adquirir esse material de fé. Por isso, você
              tem{' '}
              <strong className="text-white font-semibold">
                7 dias de garantia incondicional
              </strong>
              .
            </p>
            <p>
              Você recebe acesso imediato a mais de 500 arquivos STL de arte sacra, prontos
              para imprimir em 3D e começar a faturar ainda essa semana.
            </p>
            <p>
              Se dentro desse prazo você sentir que o material não faz sentido para o seu
              negócio, basta solicitar o reembolso e eu devolvo{' '}
              <strong className="text-white font-semibold">100% do seu dinheiro.</strong>
            </p>
            <p>Sem perguntas. Sem burocracia. O risco é todo meu.</p>
            <p className="font-serif italic text-[#f0d78c] text-xl md:text-2xl mt-10 leading-snug">
              Ou esse material te ajuda a faturar com arte sacra e construir uma nova fonte
              de renda… ou você não paga nada por isso. Simples assim.
            </p>
          </div>

          <div className="mt-12">
            <button
              type="button"
              onClick={scrollToOffer}
              className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 rounded-xl shadow-xl shadow-[#c9a84c]/10 uppercase tracking-[0.2em] transition-all cursor-pointer active:scale-98"
            >
              Quero Meu Acesso
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 px-4 bg-[#1a1a1a] border-t border-[#c9a84c]/10 content-auto"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-12 tracking-tight font-serif">
            Dúvidas Frequentes
          </h3>

          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-[10px] uppercase tracking-[0.3em] text-gray-600 bg-[#0d0d0d] border-t border-[#c9a84c]/10">
        © 2026 Mega Pack Católico · Arte &amp; Devoção 3D
      </footer>

      {/* Upsell & Exit Modals */}
      <OfferModals
        isUpsellOpen={isUpsellOpen}
        isExitOpen={isExitOpen}
        onCloseUpsell={() => setIsUpsellOpen(false)}
        onCloseExit={() => setIsExitOpen(false)}
      />
    </div>
  );
}
