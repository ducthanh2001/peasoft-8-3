import { useEffect, useRef, useState } from 'react'
import companyLogo from './assets/PeaSoft Vietnam.webp'

const secrets = [
  'Hôm nay bạn không chỉ là một đóa hoa xinh đẹp, mà còn là nguồn năng lượng truyền cảm hứng cho mọi người xung quanh.',
  'Chúc bạn mãi rạng rỡ, được yêu thương đúng nghĩa và luôn được trân trọng ở bất cứ nơi đâu bạn bước đến.',
  'Mọi nỗ lực lặng thầm của bạn đều đáng giá – mong những điều dịu dàng nhất của cuộc sống luôn tìm đến bạn.',
  'Chúc trái tim bạn luôn đủ ấm áp để yêu thương, đủ mạnh mẽ để vượt qua và đủ bình yên để mỉm cười mỗi ngày.',
  'Bạn xứng đáng với những cơ hội tốt đẹp hơn, những điều ngọt ngào hơn và những người trân quý bạn nhiều hơn nữa.',
  'Hy vọng hôm nay bạn nhận được không chỉ là lời chúc, mà còn là sự công nhận cho tất cả những gì bạn đã cống hiến.',
  'Chúc bạn luôn đủ tự tin để tỏa sáng, đủ dịu dàng để yêu thương và đủ bản lĩnh để đi đến cùng ước mơ của mình.',
  'Dù ở công việc hay cuộc sống, mong bạn luôn được “bao bọc” bởi sự tôn trọng, thấu hiểu và yêu thương chân thành.',
  'Hãy dành cho chính mình một khoảnh khắc nghỉ ngơi, vì bạn đã làm rất tốt – và xứng đáng với mọi lời khen hôm nay.',
  'Chúc bạn một ngày 8/3 tràn ngập hoa, quà và những cái ôm ấm áp từ những người thật sự quan trọng với bạn.',
]

function App() {
  const [cardOpened, setCardOpened] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)
  const [secretText, setSecretText] = useState(secrets[0])
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  const triggerFlowerConfetti = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = (canvas.width = window.innerWidth)
    const height = (canvas.height = window.innerHeight)

    const petals = []
    const petalCount = 120
    const emojis = ['🌸', '🌷', '💮', '💐']

    for (let i = 0; i < petalCount; i += 1) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * -height,
        speedY: 2 + Math.random() * 4,
        speedX: -1 + Math.random() * 2,
        size: 18 + Math.random() * 18,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.03 + Math.random() * 0.06,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      })
    }

    const start = performance.now()

    const draw = now => {
      const elapsed = now - start
      const progress = Math.min(elapsed / 2000, 1) // 2s

      ctx.clearRect(0, 0, width, height)

      petals.forEach(petal => {
        petal.x += petal.speedX
        petal.y += petal.speedY
        petal.rotation += petal.rotationSpeed

        if (petal.y - petal.size > height) {
          petal.y = -petal.size
          petal.x = Math.random() * width
        }

        ctx.save()
        ctx.translate(petal.x, petal.y)
        ctx.rotate(petal.rotation)
        ctx.font = `${petal.size}px system-ui`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.globalAlpha = 1 - progress * 0.5
        ctx.fillText(petal.emoji, 0, 0)
        ctx.restore()
      })

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, width, height)
      }
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animationRef.current = requestAnimationFrame(draw)
  }

  const handleOpenInvitation = () => {
    setCardOpened(true)
    setTimeout(() => {
      const messageSection = document.getElementById('message')
      if (messageSection) {
        messageSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 2000)
  }

  const handleRevealSecret = () => {
    const randomSecret = secrets[Math.floor(Math.random() * secrets.length)]
    setSecretText(`"${randomSecret}"`)
    setSecretOpen(true)
    triggerFlowerConfetti()
  }

  const handleCloseSecret = () => {
    setSecretOpen(false)
  }

  useEffect(() => {
    const sections = document.querySelectorAll('.reveal-section')

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 },
    )

    sections.forEach(section => observer.observe(section))

    return () => {
      sections.forEach(section => observer.unobserve(section))
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Canvas Flower Confetti */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-40"
      />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[radial-gradient(circle,_#FCE4EC_0%,_#FFFDF9_100%)]"
      >
        {/* Floating Background Decor */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 animate-float opacity-40">🌸</div>
          <div className="absolute top-1/4 right-20 animate-float [animation-delay:2s] opacity-40">
            ✨
          </div>
          <div className="absolute bottom-20 left-1/4 animate-float [animation-delay:4s] opacity-40">
            🌷
          </div>
          <div className="absolute top-1/2 right-10 animate-float [animation-delay:1s] opacity-40">
            💖
          </div>
        </div>

        {/* Invitation Card */}
        <div
          id="invitation-container"
          className={`relative z-10 w-[90%] max-w-2xl h-[500px] flex items-center justify-center cursor-pointer group ${
            cardOpened ? 'opened' : ''
          }`}
        >
          {/* Card Gates */}
          <div className="absolute inset-0 flex z-30 transition-all duration-500">
            {/* Left Wing */}
            <div className="card-gate-left w-1/2 h-full bg-lavender-purple border-r border-white/20 shadow-xl flex items-center justify-end overflow-hidden rounded-l-2xl">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/floral-paper.png')]" />
              <div className="pr-2 text-6xl text-white font-script">Happy</div>
            </div>
            {/* Right Wing */}
            <div className="card-gate-right w-1/2 h-full bg-lavender-purple border-l border-white/20 shadow-xl flex items-center justify-start overflow-hidden rounded-r-2xl">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/floral-paper.png')]" />
              <div className="pl-2 text-6xl text-white font-script">8/3</div>
            </div>
          </div>

          {/* Initial CTA */}
          {!cardOpened && (
            <div
              id="cta-overlay"
              className="absolute z-40 text-center transition-opacity duration-500 group-[.opened]:opacity-0"
            >
              <button
                type="button"
                onClick={handleOpenInvitation}
                className="bg-white/90 hover:bg-white text-deep-lavender px-8 py-3 rounded-full font-semibold shadow-lg animate-bounce-slow transition-transform hover:scale-105 border border-lavender-purple"
              >
                Xem Thiệp Mời
              </button>
            </div>
          )}

          {/* Inner Content */}
          <div className="inner-content absolute inset-0 bg-white shadow-inner rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-0 scale-95 transition-all duration-1000 z-20 border-8 border-pastel-pink">
            <div className="absolute top-4 right-4 text-4xl opacity-10">❀</div>
            <div className="absolute bottom-4 left-4 text-4xl opacity-10 rotate-180">❀</div>
            <img
              src={companyLogo}
              alt="PeaSoft Vietnam Logo"
              className="mb-4 h-10 md:h-16 w-auto object-contain drop-shadow-sm"
            />
            <h1 className="text-4xl md:text-5xl font-script text-deep-lavender mb-4">
              Happy Women's Day
            </h1>
            <h2 className="text-2xl font-serif text-gray-700 mb-6 italic">
              Gửi những bông hoa xinh đẹp nhất
            </h2>
            <div className="w-16 h-0.5 bg-lavender-purple mb-6" />
            <p className="text-gray-600 leading-relaxed font-light italic">
              &quot;Phụ nữ là để yêu thương, trân trọng và tỏa sáng theo cách của riêng mình.&quot;
            </p>
            <div className="mt-8">
              <a
                href="#message"
                className="text-xs uppercase tracking-widest text-deep-lavender font-semibold hover:tracking-[0.2em] transition-all"
              >
                Kéo xuống để xem thêm
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section id="message" className="reveal-section py-20 px-6 bg-white relative">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-shimmer-gold text-3xl block mb-4">✦</span>
          <h3 className="font-serif text-3xl md:text-4xl text-gray-800 mb-8">
            Thân gửi Quý đồng nghiệp Nữ,
          </h3>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
            <p>
              Nhân ngày Quốc tế Phụ nữ 8/3, Ban lãnh đạo Công ty xin gửi đến tất cả các chị em
              những lời chúc tốt đẹp, rạng rỡ và hạnh phúc nhất.
            </p>
            <p>
              Cảm ơn bạn vì đã luôn là những đóa hoa tươi thắm, mang đến sự ấm áp, sáng tạo và
              nguồn năng lượng tích cực cho đại gia đình chúng ta. Sự nỗ lực và cống hiến của các
              bạn chính là mảnh ghép không thể thiếu để tạo nên thành công ngày hôm nay.
            </p>
            <p className="font-script text-3xl text-deep-lavender pt-4">
              Hãy luôn xinh đẹp, tự tin và yêu đời nhé!
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10 grayscale pointer-events-none">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIAuJpCL8DIolYELDlDZeNm--ZaUqTr4xhaBYDguYiEEXc-vZhh9zFjH_andCvOiOIWWQdyTFPO4UgQDiDUmcfEx_2Rt6NpFoelkVXC3cOKTfKULzxzCt3AtWiejjjmJGn6V11QUaJdR3zVE--xtBevMQY7DvWyr_mi80eY51zbLfuUfCz5WY2IH-on3xrgmBPZVKA1JfyQM3JWnEZnB735XBK7LLjGyl4aZHgDbdIqoj1unvwyVIlXJ8O4bxiDob9wF-TnvgYaBHf"
            alt="Floral decor"
            className="w-full h-full object-contain"
          />
        </div>
      </section>

      {/* Event Details Section */}
      <section id="details" className="reveal-section py-16 bg-pastel-pink/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h4 className="font-serif text-2xl uppercase tracking-widest text-deep-lavender">
              Bữa Tiệc Chào Mừng
            </h4>
            <div className="h-px w-20 bg-deep-lavender mx-auto mt-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Time */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group">
              <div className="w-16 h-16 bg-lavender-purple/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-deep-lavender"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h5 className="font-semibold text-gray-700 mb-2 uppercase text-sm tracking-tighter">
                Thời Gian
              </h5>
              <p className="text-gray-600">
                11:30 - Thứ Sáu
                <br />
                Ngày 08 tháng 03, 2026
              </p>
            </div>
            {/* Location */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group">
              <div className="w-16 h-16 bg-lavender-purple/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-10 h-10 text-deep-lavender"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 0111.314 0z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h5 className="font-semibold text-gray-700 mb-2 uppercase text-sm tracking-tighter">
                Địa Điểm
              </h5>
              <p className="text-gray-600">
               Lẩu gà lá é <br />
               Cạnh trường mầm non Sakura, CT4-1
              </p>
            </div>
            {/* Dresscode */}
            {/* <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group">
              <div className="w-16 h-16 bg-lavender-purple/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-deep-lavender"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h6a2 2 0 012 2v11a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h5 className="font-semibold text-gray-700 mb-2 uppercase text-sm tracking-tighter">
                Trang Phục
              </h5>
              <p className="text-gray-600">
                Smart Casual
                <br />
                Tone: Trắng/Hồng/Tím
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Interactive Mini-game Section */}
      <section id="surprise" className="reveal-section py-24 text-center bg-white">
        <div className="max-w-xl mx-auto px-6 bg-lavender-purple/10 border-2 border-dashed border-lavender-purple p-12 rounded-[3rem] relative overflow-hidden">
          <div className="absolute inset-0 shimmer-effect pointer-events-none opacity-20" />
          <h3 className="font-serif text-3xl mb-6 relative z-10">Dành riêng cho bạn...</h3>
          <p className="text-gray-600 mb-10 relative z-10">
            Hãy chạm vào nút bên dưới để nhận một lời chúc bí mật từ vũ trụ gửi đến bạn hôm nay!
          </p>
          <button
            type="button"
            onClick={handleRevealSecret}
            className="relative z-10 bg-deep-lavender text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-opacity-90 transition-all active:scale-95 text-lg"
          >
            Nhận lời chúc bí mật
          </button>

          {/* Secret Popup */}
          <div
            id="secret-popup"
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 ${
              secretOpen ? '' : 'hidden'
            }`}
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-lg md:max-w-xl w-full shadow-2xl relative animate-[scaleIn_0.4s_ease-out] text-center">
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                onClick={handleCloseSecret}
              >
                ✕
              </button>
              <div className="text-5xl mb-4">💖</div>
              <p
                id="secret-text"
                className="text-xl md:text-2xl font-serif text-gray-800 italic leading-relaxed"
              >
                {secretText}
              </p>
              <button
                type="button"
                className="mt-8 text-deep-lavender font-semibold text-sm uppercase tracking-widest border-b border-deep-lavender"
                onClick={handleCloseSecret}
              >
                Tuyệt quá
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pastel-pink py-12 text-center border-t border-white">
        <div className="mb-6">
          <img
            src={companyLogo}
            alt="PeaSoft Vietnam Logo"
            className="mx-auto h-16 w-auto object-contain drop-shadow-sm"
          />
        </div>
        <p className="text-gray-700 font-serif italic text-lg mb-2">
          &quot;Chúc một ngày 8/3 thật rực rỡ và hạnh phúc&quot;
        </p>
        <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-8">
          © 2026 International Women&apos;s Day Celebration
        </div>
      </footer>
    </>
  )
}

export default App
