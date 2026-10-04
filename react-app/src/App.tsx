import './App.css'
import shopgenieHeroVideo from '../shopgenie-hero.mp4'
import { useState, useEffect, useRef } from 'react'

function App() {
  return (
    <>
      <Header />
      <Hero />
      <PlatformSection />
      <OwnerSection />
      <CustomerSection />
      <DiscoverySection />
      <IntelligenceSection />
      <AnalyticsSection />
      <RetailJourneySection />
      <AppsSection />
      <VisionSection />
      <RoadmapSection />
      <FinalCtaSection />
      <Footer />
    </>
  )
}

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="top">
      <a className="brand" href="#top" aria-label="ShopGenie home">
        <span className="brand-mark">
          <i></i><i></i><i></i><i></i>
        </span>
        <span>shop<span className="brand-light">genie</span></span>
      </a>
      <button 
        className="menu-toggle" 
        aria-label="Open navigation" 
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span><span></span>
      </button>
      <nav className={`nav-links ${isOpen ? 'open' : ''}`} aria-label="Main navigation">
        <a href="#platform" onClick={closeMenu}>Platform</a>
        <a href="#customers" onClick={closeMenu}>For Customers</a>
        <a href="#owners" onClick={closeMenu}>For Store Owners</a>
        <a href="#discovery" onClick={closeMenu}>Discovery</a>
        <a href="#intelligence" onClick={closeMenu}>AI Capabilities</a>
        <a href="#vision" onClick={closeMenu}>About</a>
      </nav>
      <a className="nav-cta" href="#get-started">Get started <span>↗</span></a>
    </header>
  )
}

function Hero() {
  const [isInView, setIsInView] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.13, rootMargin: '0px 0px -35px 0px' }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      const playVideo = () => {
        const result = videoRef.current?.play()
        if (result?.catch) {
          result.catch(() => {})
        }
      }

      videoRef.current.addEventListener('canplay', playVideo, { once: true })
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && videoRef.current?.paused) {
          playVideo()
        }
      })

      return () => {
        videoRef.current?.removeEventListener('canplay', playVideo)
        document.removeEventListener('visibilitychange', () => {})
      }
    }
  }, [])

  return (
    <section className="hero scene" id="home" data-scene="home-video" ref={heroRef}>
      <video 
        className="hero-video scene-media" 
        autoPlay 
        muted 
        loop 
        playsInline 
        preload="auto"
        ref={videoRef}
      >
        <source src={shopgenieHeroVideo} type="video/mp4" />
      </video>
      <div className="hero-shade"></div>
      <div className="hero-content wrap">
        <div className={`eyebrow hero-enter ${isInView ? 'in-view' : ''}`}>
          <span className="eyebrow-dot"></span> DISCOVERY-FIRST LOCAL RETAIL
        </div>
        <h1 className={`hero-enter ${isInView ? 'in-view' : ''}`}>
          Retail,<br/><span>reimagined.</span>
        </h1>
        <p className={`hero-kicker hero-enter ${isInView ? 'in-view' : ''}`}>Smarter Retail. Better Discovery.</p>
        <p className={`hero-copy hero-enter ${isInView ? 'in-view' : ''}`}>
          ShopGenie connects local shops with customers through intelligent retail technology — making stores easier to manage and products easier to discover.
        </p>
        <div className={`hero-actions hero-enter ${isInView ? 'in-view' : ''}`}>
          <a className="button button-primary" href="#platform">Explore ShopGenie <span>↗</span></a>
          <a className="button button-quiet" href="#owners">For shop owners <span>→</span></a>
        </div>
      </div>
      <div className="hero-bottom wrap">
        <span>01 / A NEW KIND OF LOCAL RETAIL</span>
        <a href="#platform" className="scroll-cue">
          <span className="scroll-line"></span> Scroll to explore
        </a>
        <span className="hero-location">BUILT FOR WHAT'S NEXT&nbsp; · &nbsp;MADE FOR EVERYDAY</span>
      </div>
      <div className="hero-side-label">LOCAL COMMERCE, CONNECTED</div>
    </section>
  )
}

function PlatformSection() {
  return (
    <section className="intro section-pad scene" id="platform" data-scene="ecosystem-network">
      <div className="scene-glow glow-blue"></div><div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span> ONE CONNECTED PLATFORM</div>
            <h2>One platform.<br/><span className="muted">Two experiences.</span></h2>
          </div>
          <p className="section-lede">ShopGenie brings local businesses and customers into one connected retail ecosystem.</p>
        </div>
        <div className="ecosystem reveal">
          <div className="eco-orbit orbit-one"></div>
          <div className="eco-orbit orbit-two"></div>
          <div className="eco-link link-a"></div>
          <div className="eco-link link-b"></div>
          <div className="eco-node eco-owner">
            <div className="node-icon">⌂</div>
            <div>
              <span className="node-label">FOR BUSINESS</span>
              <h3>Shop owner</h3>
              <p>Run your store with clarity.</p>
            </div>
            <ul>
              <li>Inventory & products</li>
              <li>Sales performance</li>
              <li>Customer connection</li>
            </ul>
          </div>
          <div className="eco-core">
            <div className="core-glyph">
              <i></i><i></i><i></i><i></i>
            </div>
            <strong>shopgenie</strong>
            <small>LOCAL RETAIL, RECONNECTED</small>
          </div>
          <div className="eco-node eco-customer">
            <div className="node-icon">⌕</div>
            <div>
              <span className="node-label">FOR EVERYONE</span>
              <h3>Customer</h3>
              <p>Find more, closer to home.</p>
            </div>
            <ul>
              <li>Nearby stores</li>
              <li>Products in your area</li>
              <li>Details you can trust</li>
            </ul>
          </div>
          <div className="eco-caption">
            <span className="pulse"></span> One local retail network
          </div>
        </div>
      </div>
    </section>
  )
}

function OwnerSection() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.13, rootMargin: '0px 0px -35px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="owner-section section-pad scene" id="owners" data-scene="owner-store-world" ref={sectionRef}>
      <div className="scene-glow glow-violet"></div>
      <div className="wrap split-layout">
        <div className={`split-copy reveal ${isInView ? 'in-view' : ''}`}>
          <div className="eyebrow"><span className="eyebrow-dot"></span> THE OWNER EXPERIENCE</div>
          <h2>Run your store<br/><span className="muted">smarter.</span></h2>
          <p>Powerful tools for local businesses to manage products, inventory, sales and business insights — all from one place.</p>
          <a className="text-link" href="#get-started">Explore the owner experience <span>↗</span></a>
          <div className="feature-list">
            <article>
              <span>01</span>
              <div>
                <h3>Smart inventory</h3>
                <p>Keep products organized and easier to manage.</p>
              </div>
              <b>↗</b>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Sales intelligence</h3>
                <p>See what's selling and how your business is performing.</p>
              </div>
              <b>↗</b>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Product management</h3>
                <p>Manage pricing, products and availability in one place.</p>
              </div>
              <b>↗</b>
            </article>
            <article>
              <span>04</span>
              <div>
                <h3>Business analytics</h3>
                <p>Turn store data into actionable insights.</p>
              </div>
              <b>↗</b>
            </article>
          </div>
        </div>
        <div className={`phone-stage owner-stage reveal ${isInView ? 'in-view' : ''}`}>
          <div className="stage-halo"></div>
          <div className="float-tag tag-inventory">
            <span className="tag-icon">▦</span>
            <span>
              <small>INVENTORY STATUS</small>
              <b>Looking good <i className="green-dot"></i></b>
            </span>
          </div>
          <div className="phone owner-phone">
            <div className="phone-island"></div>
            <div className="phone-screen">
              <div className="app-top">
                <span className="app-brand">
                  <span className="mini-mark">✦</span> Genie <small>OWNER</small>
                </span>
                <span className="avatar">A</span>
              </div>
              <p className="greeting">Good morning, Anil <span>✦</span></p>
              <p className="app-date">Here's your store at a glance</p>
              <div className="app-metric">
                <small>TODAY'S SALES</small>
                <strong>₹12,480</strong>
                <span className="metric-up">↗ 12.8% <em>vs yesterday</em></span>
                <div className="mini-chart">
                  <i style={{height: '32%'}}></i>
                  <i style={{height: '49%'}}></i>
                  <i style={{height: '36%'}}></i>
                  <i style={{height: '71%'}}></i>
                  <i style={{height: '53%'}}></i>
                  <i style={{height: '87%'}}></i>
                  <i style={{height: '64%'}}></i>
                  <i style={{height: '100%'}}></i>
                  <i style={{height: '76%'}}></i>
                  <i style={{height: '92%'}}></i>
                  <i style={{height: '72%'}}></i>
                  <i style={{height: '100%'}}></i>
                </div>
              </div>
              <div className="app-row-head">
                <b>Quick overview</b>
                <span>View all →</span>
              </div>
              <div className="app-stats">
                <div>
                  <small>Products</small>
                  <b>1,284</b>
                  <em>Across 12 categories</em>
                </div>
                <div>
                  <small>Low stock</small>
                  <b className="warn">08</b>
                  <em>Needs your attention</em>
                </div>
              </div>
              <div className="app-row-head">
                <b>Top products</b>
                <span>This week⌄</span>
              </div>
              <div className="app-product">
                <span className="product-thumb shirt">✣</span>
                <span>
                  <b>Everyday Cotton Tee</b>
                  <small>Clothing · 38 sold</small>
                </span>
                <strong>₹899</strong>
              </div>
              <div className="app-product">
                <span className="product-thumb mug">◉</span>
                <span>
                  <b>Stoneware Mug</b>
                  <small>Home · 24 sold</small>
                </span>
                <strong>₹540</strong>
              </div>
              <div className="app-tabbar">
                <span>◫<small>Home</small></span>
                <span>▦<small>Products</small></span>
                <span>▥<small>Sales</small></span>
                <span>◉<small>Profile</small></span>
              </div>
            </div>
          </div>
          <div className="float-tag tag-sales">
            <span className="sales-spark">↗</span>
            <span>
              <small>SA... (showing 30% of widget content)</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function CustomerSection() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.13, rootMargin: '0px 0px -35px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="customer-section section-pad scene" id="customers" data-scene="product-discovery-space" ref={sectionRef}>
      <div className="scene-glow glow-cyan"></div>
      <div className="wrap split-layout customer-layout">
        <div className={`phone-stage customer-stage reveal ${isInView ? 'in-view' : ''}`}>
          <div className="stage-halo"></div>
          <div className="map-float">
            <div className="map-grid"></div>
            <span className="map-road road-a"></span>
            <span className="map-road road-b"></span>
            <span className="map-road road-c"></span>
            <i className="map-pin pin-main">⌖</i>
            <i className="map-pin pin-one">●</i>
            <i className="map-pin pin-two">●</i>
            <div className="map-label">12 stores nearby</div>
          </div>
          <div className="phone customer-phone">
            <div className="phone-island"></div>
            <div className="phone-screen">
              <div className="app-top">
                <span className="app-brand">
                  <span className="mini-mark">✦</span> Genie
                </span>
                <span className="location-pill">⌖ Pune, India⌄</span>
              </div>
              <p className="discover-title">Find your<br/><b>next favourite.</b></p>
              <div className="search-box">
                <span>⌕</span>
                <span>Nike shoes</span>
                <kbd>⌘ K</kbd>
              </div>
              <div className="filter-row">
                <span className="filter-active">Nearby</span>
                <span>Best match</span>
                <span>Filters +</span>
              </div>
              <div className="results-meta">AVAILABLE NEAR YOU <span>Map view ↗</span></div>
              <div className="store-result">
                <div className="shoe-thumb shoe-blue">↗</div>
                <div className="store-info">
                  <span className="open-label"><i></i> OPEN NOW · 0.8 KM</span>
                  <b>Nike Air Max SC</b>
                  <small>Stride & Style · Koregaon Park</small>
                  <strong>₹7,495 <em>Check details →</em></strong>
                </div>
              </div>
              <div className="store-result">
                <div className="shoe-thumb shoe-sand">↗</div>
                <div className="store-info">
                  <span className="open-label"><i></i> OPEN NOW · 1.4 KM</span>
                  <b>Nike Revolution 7</b>
                  <small>City Sports · Kalyani Nagar</small>
                  <strong>₹3,695 <em>Check details →</em></strong>
                </div>
              </div>
              <div className="nearby-foot">Showing local availability <span>◎</span></div>
              <div className="app-tabbar">
                <span className="tab-selected">⌂<small>Discover</small></span>
                <span>♡<small>Saved</small></span>
                <span>⌖<small>Explore</small></span>
                <span>◉<small>Profile</small></span>
              </div>
            </div>
          </div>
        </div>
        <div className={`split-copy reveal ${isInView ? 'in-view' : ''}`}>
          <div className="eyebrow"><span className="eyebrow-dot"></span> THE CUSTOMER EXPERIENCE</div>
          <h2>Find what you need,<br/><span className="muted">near you.</span></h2>
          <p>Discover products and nearby stores without wasting time searching from shop to shop. Real local options, right when you need them.</p>
          <div className="discovery-steps">
            <span>Search a product</span>
            <i>→</i>
            <span>Explore nearby</span>
            <i>→</i>
            <span>Choose your store</span>
          </div>
          <a className="text-link" href="#discovery">Explore the customer experience <span>↗</span></a>
        </div>
      </div>
    </section>
  )
}

function DiscoverySection() {
  return (
    <section className="discovery-section section-pad scene" id="discovery" data-scene="city-discovery-map">
      <div className="discovery-map scene-media">
        <div className="city-grid"></div>
        <div className="city-block block-1"></div>
        <div className="city-block block-2"></div>
        <div className="city-block block-3"></div>
        <div className="city-block block-4"></div>
        <div className="city-block block-5"></div>
        <div className="city-block block-6"></div>
        <div className="city-road road-1"></div>
        <div className="city-road road-2"></div>
        <div className="city-road road-3"></div>
        <div className="map-path"></div>
        <div className="map-user"><span></span></div>
        <div className="map-point point-a">
          <i>⌂</i>
          <span>Northside Market<small>0.4 km · 8 products</small></span>
        </div>
        <div className="map-point point-b">
          <i>✦</i>
          <span>Good Things Store<small>0.8 km · 12 products</small></span>
        </div>
        <div className="map-point point-c">
          <i>⌂</i>
          <span>City Sports<small>1.2 km · 4 products</small></span>
        </div>
        <div className="map-product product-marker">
          <span>NIKE AIR MAX</span>
          <b>Available nearby</b>
        </div>
      </div>
      <div className="wrap discovery-copy reveal">
        <div className="eyebrow"><span className="eyebrow-dot"></span> YOUR NEIGHBOURHOOD, OPEN</div>
        <h2>Discover products.<br/><span className="muted">Discover stores.</span></h2>
        <p>ShopGenie makes local retail searchable, visible and easier to explore. See what's close, then decide where to go.</p>
        <div className="map-legend">
          <span><i className="legend-user"></i> Your location</span>
          <span><i className="legend-store"></i> Local stores</span>
          <span><i className="legend-product"></i> Product found</span>
        </div>
      </div>
    </section>
  )
}

function IntelligenceSection() {
  return (
    <section className="ai-section section-pad scene" id="intelligence" data-scene="ai-intelligence-field">
      <div className="ai-field scene-media">
        <div className="ai-ring ring-outer"></div>
        <div className="ai-ring ring-mid"></div>
        <div className="ai-ring ring-inner"></div>
        <div className="ai-orb">
          <span>SG</span>
          <i></i>
        </div>
        <div className="ai-ray ray-1"></div>
        <div className="ai-ray ray-2"></div>
        <div className="ai-ray ray-3"></div>
        <div className="ai-ray ray-4"></div>
        <div className="ai-node ai-node-1">Product signals</div>
        <div className="ai-node ai-node-2">Store context</div>
        <div className="ai-node ai-node-3">Better discovery</div>
        <div className="ai-node ai-node-4">Useful insights</div>
      </div>
      <div className="wrap ai-content">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span> BUILT FOR INTELLIGENT RETAIL</div>
            <h2>Intelligent retail,<br/><span className="muted">powered by AI.</span></h2>
          </div>
          <p className="section-lede">ShopGenie combines retail workflows with intelligent technology to help stores operate better and customers discover products faster.</p>
        </div>
        <div className="ai-cards reveal">
          <article>
            <span className="ai-icon">⌗</span>
            <small>01 / RECOGNITION</small>
            <h3>AI product recognition</h3>
            <p>Identify products using intelligent visual technology.</p>
            <span className="card-arrow">↗</span>
          </article>
          <article>
            <span className="ai-icon">▦</span>
            <small>02 / OPERATIONS</small>
            <h3>Smart inventory insights</h3>
            <p>Turn inventory information into useful business insights.</p>
            <span className="card-arrow">↗</span>
          </article>
          <article>
            <span className="ai-icon">⌁</span>
            <small>03 / PERFORMANCE</small>
            <h3>Sales intelligence</h3>
            <p>Understand product performance and sales patterns.</p>
            <span className="card-arrow">↗</span>
          </article>
          <article>
            <span className="ai-icon">⌕</span>
            <small>04 / DISCOVERY</small>
            <h3>Intelligent discovery</h3>
            <p>Help customers find relevant products and stores more efficiently.</p>
            <span className="card-arrow">↗</span>
          </article>
        </div>
        <p className="roadmap-note">AI capabilities shown as product direction and concepts.</p>
      </div>
    </section>
  )
}

function AnalyticsSection() {
  return (
    <section className="dashboard-section section-pad scene" data-scene="analytics-dashboard-space">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span> A CLEARER VIEW OF YOUR BUSINESS</div>
            <h2>From data to<br/><span className="muted">better decisions.</span></h2>
          </div>
          <p className="section-lede">See the signals that matter, understand your store at a glance and find the next useful action.</p>
        </div>
        <div className="dashboard reveal">
          <div className="dash-sidebar">
            <div className="dash-logo">
              <span className="mini-mark">✦</span> ShopGenie
            </div>
            <div className="dash-store">
              <span className="store-avatar">S</span>
              <span>
                <b>Sunday Supply</b>
                <small>Owner workspace</small>
              </span>
              <i>⌄</i>
            </div>
            <small className="dash-label">WORKSPACE</small>
            <a className="dash-active">▦ &nbsp; Overview</a>
            <a>◫ &nbsp; Products</a>
            <a>▤ &nbsp; Inventory</a>
            <a>↗ &nbsp; Sales</a>
            <a>◉ &nbsp; Customers</a>
            <div className="dash-help">
              Need a hand?<br/>
              <span>Visit help center →</span>
            </div>
          </div>
          <div className="dash-main">
            <div className="dash-top">
              <div>
                <small>SATURDAY, 03 OCTOBER 2026</small>
                <h3>Good morning, Anil <span>✦</span></h3>
              </div>
              <button>Last 30 days⌄</button>
            </div>
            <div className="dash-kpis">
              <div>
                <small>Total revenue <span>ⓘ</span></small>
                <strong>₹84,250</strong>
                <em>↗ 8.4% vs last month</em>
              </div>
              <div>
                <small>Products listed <span>ⓘ</span></small>
                <strong>1,284</strong>
                <em>Across 12 categories</em>
              </div>
              <div>
                <small>Customers reached <span>ⓘ</span></small>
                <strong>324</strong>
                <em>↗ 18 new this month</em>
              </div>
              <div>
                <small>Stock availability <span>ⓘ</span></small>
                <strong>87%</strong>
                <em className="kpi-warn">12 products running low</em>
              </div>
            </div>
            <div className="dash-panels">
              <div className="chart-panel">
                <div className="panel-heading">
                  <span>
                    <b>Revenue overview</b>
                    <small>Store performance over time</small>
                  </span>
                  <span className="chart-key">
                    <i></i> Revenue
                  </span>
                </div>
                <div className="chart-area">
                  <div className="y-labels">
                    <span>₹1L</span>
                    <span>₹75k</span>
                    <span>₹50k</span>
                    <span>₹25k</span>
                    <span>₹0</span>
                  </div>
                  <div className="chart-plot">
                    <div className="chart-guides">
                      <i></i><i></i><i></i><i></i><i></i>
                    </div>
                    <svg viewBox="0 0 640 190" preserveAspectRatio="none" aria-label="Illustrative revenue trend chart">
                      <defs>
                        <linearGradient id="chartfill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0" stop-color="#7c8cff" stop-opacity=".25"/>
                          <stop offset="1" stop-color="#7c8cff" stop-opacity="0"/>
                        </linearGradient>
                      </defs>
                      <path d="M0 150 C28 137 36 143 58 130 S90 132 112 117 S147 130 166 107 S201 11..." fill="url(#chartfill)" stroke="#7c8cff" stroke-width="2" fillOpacity="0.8"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RetailJourneySection() {
  return (
    <section className="how-section section-pad scene" data-scene="retail-journey-flow">
      <div className="wrap">
        <div className="how-heading reveal">
          <div className="eyebrow"><span className="eyebrow-dot"></span> A SIMPLE LOOP, MADE BETTER</div>
          <h2>From store<br/><span className="muted">to screen.</span></h2>
          <p>Local retail gets easier when every step works together.</p>
        </div>
        <div className="timeline">
          <div className="timeline-line">
            <span></span>
          </div>
          <article className="timeline-item reveal">
            <div className="timeline-num">01</div>
            <div className="timeline-icon">▦</div>
            <small>THE OWNER</small>
            <h3>Add products</h3>
            <p>Shop owners manage their products digitally.</p>
          </article>
          <article className="timeline-item reveal">
            <div className="timeline-num">02</div>
            <div className="timeline-icon">⌘</div>
            <small>THE STORE</small>
            <h3>Manage your store</h3>
            <p>Inventory and sales are organized in one platform.</p>
          </article>
          <article className="timeline-item reveal">
            <div className="timeline-num">03</div>
            <div className="timeline-icon">↗</div>
            <small>THE CONNECTION</small>
            <h3>Connect</h3>
            <p>Products become easier for customers to discover.</p>
          </article>
          <article className="timeline-item reveal">
            <div className="timeline-num">04</div>
            <div className="timeline-icon">⌕</div>
            <small>THE CUSTOMER</small>
            <h3>Discover</h3>
            <p>Customers search for products and nearby stores.</p>
          </article>
          <article className="timeline-item reveal">
            <div className="timeline-num">05</div>
            <div className="timeline-icon">✦</div>
            <small>THE OPPORTUNITY</small>
            <h3>Grow</h3>
            <p>Better visibility creates opportunities for stronger local retail.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function AppsSection() {
  return (
    <section className="apps-section section-pad scene" data-scene="two-apps-network">
      <div className="scene-glow glow-blue"></div>
      <div className="wrap">
        <div className="apps-heading reveal">
          <div className="eyebrow"><span className="eyebrow-dot"></span> DESIGNED TO WORK TOGETHER</div>
          <h2>Two apps.<br/><span className="muted">One ecosystem.</span></h2>
          <p>Two thoughtful experiences. One more connected way to shop local.</p>
        </div>
        <div className="apps-visual reveal">
          <div className="app-line"></div>
          <div className="app-orb">
            <span className="core-glyph">
              <i></i><i></i><i></i><i></i>
            </span>
          </div>
          <div className="app-preview owner-preview">
            <div className="preview-top">
              <span className="preview-mark">✦</span>
              <span>SHOPGENIE / OWNER</span>
              <i>↗</i>
            </div>
            <div className="preview-copy">
              <small>YOUR STORE, IN SYNC</small>
              <h3>Good morning.<br/>Here's your day.</h3>
              <div className="preview-stat">
                <span>Sales today</span>
                <b>₹12,480 <i>↗ 12.8%</i></b>
              </div>
              <div className="preview-bars">
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
              </div>
              <div className="preview-list">
                <span>Top product <b>Everyday Cotton Tee</b></span>
                <span>Stock health <b>Looking good</b></span>
              </div>
            </div>
          </div>
          <div className="app-preview customer-preview">
            <div className="preview-top">
              <span className="preview-mark">✦</span>
              <span>SHOPGENIE / CUSTOMER</span>
              <i>↗</i>
            </div>
            <div className="preview-copy">
              <small>GOOD FINDS, CLOSE BY</small>
              <h3>Something great<br/>is around here.</h3>
              <div className="preview-search">⌕ &nbsp; What are you looking for?</div>
              <div className="preview-nearby">
                <span className="preview-product blue"></span>
                <span>
                  <b>Nike Air Max SC</b>
                  <small>Stride & Style · 0.8 km</small>
                </span>
                <strong>₹7,495</strong>
              </div>
              <div className="preview-nearby">
                <span className="preview-product sand"></span>
                <span>
                  <b>Stoneware Mug</b>
                  <small>Good Things Store · 1.1 km</small>
                </span>
                <strong>₹540</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="app-labels">
          <a href="#owners"><span>01</span> Owner app <b>↗</b></a>
          <a href="#customers"><span>02</span> Customer app <b>↗</b></a>
        </div>
      </div>
    </section>
  )
}

function VisionSection() {
  return (
    <section className="vision-section section-pad scene" id="vision" data-scene="connected-retail-world">
      <div className="vision-world scene-media">
        <div className="world-grid"></div>
        <div className="world-ring world-ring-a"></div>
        <div className="world-ring world-ring-b"></div>
        <div className="world-globe">
          <span className="globe-lat"></span>
          <span className="globe-lon"></span>
          <i className="globe-node node-1"></i>
          <i className="globe-node node-2"></i>
          <i className="globe-node node-3"></i>
          <i className="globe-node node-4"></i>
          <i className="globe-node node-5"></i>
          <div className="globe-core">✦</div>
        </div>
        <div className="world-label label-1">LOCAL STORES</div>
        <div className="world-label label-2">CONNECTED COMMUNITIES</div>
        <div className="world-label label-3">INTELLIGENT RETAIL</div>
      </div>
      <div className="wrap vision-content reveal">
        <div className="eyebrow"><span className="eyebrow-dot"></span> A MORE CONNECTED FUTURE</div>
        <h2>The future of local<br/>retail is <span>connected.</span></h2>
        <p>Our vision is to make local stores digitally visible, easier to manage and easier for customers to discover.</p>
        <div className="principles">
          <article>
            <span>01</span>
            <h3>Empower stores</h3>
            <p>Help local businesses adopt smarter digital tools.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Connect communities</h3>
            <p>Bring nearby stores and customers closer together.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Enable intelligent retail</h3>
            <p>Make everyday retail more efficient and discoverable.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function RoadmapSection() {
  return (
    <section className="roadmap-section section-pad scene" data-scene="roadmap-horizon">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span> OUR DIRECTION</div>
            <h2>Building the next<br/><span className="muted">generation of retail.</span></h2>
          </div>
          <p className="section-lede">A clear starting point, with room to keep making local retail work better.</p>
        </div>
        <div className="roadmap-track reveal">
          <div className="road-progress"></div>
          <article className="road-stop current">
            <span className="road-dot"></span>
            <small>NOW</small>
            <h3>2026</h3>
            <div className="road-status status-live">FOUNDATION</div>
            <ul>
              <li>Owner app</li>
              <li>Customer app</li>
              <li>Smart inventory</li>
            </ul>
          </article>
          <article className="road-stop">
            <span className="road-dot"></span>
            <small>COMING NEXT</small>
            <h3>2027</h3>
            <div className="road-status">IN DEVELOPMENT</div>
            <ul>
              <li>Advanced AI</li>
              <li>Product recognition</li>
              <li>Analytics & recommendations</li>
            </ul>
          </article>
          <article className="road-stop">
            <span className="road-dot"></span>
            <small>FUTURE VISION</small>
            <h3>Beyond</h3>
            <div className="road-status">EXPLORATING</div>
            <ul>
              <li>Local marketplace</li>
              <li>Demand intelligence</li>
              <li>AI retail assistant</li>
              <li>Multi-store intelligence</li>
            </ul>
          </article>
        </div>
        <p className="roadmap-note">Roadmap reflects product direction and may evolve.</p>
      </div>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section className="final-cta section-pad scene" id="get-started" data-scene="final-retail-environment">
      <div className="cta-geometry scene-media">
        <div className="cta-plane plane-a"></div>
        <div className="cta-plane plane-b"></div>
        <div className="cta-ring"></div>
        <div className="cta-glow"></div>
        <div className="cta-pin">✦</div>
      </div>
      <div className="wrap cta-content reveal">
        <div className="eyebrow"><span className="eyebrow-dot"></span> LET'S MOVE LOCAL RETAIL FORWARD</div>
        <h2>Your store.<br/>Your customers.<br/><span>One platform.</span></h2>
        <p>Welcome to ShopGenie — smarter retail starts here.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="mailto:hello@shopgenie.in">Explore ShopGenie <span>↗</span></a>
          <a className="button button-quiet" href="mailto:hello@shopgenie.in?subject=ShopGenie%20for%20Store%20Owners">For shop owners <span>→</span></a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand-col">
            <a className="brand" href="#top">
              <span className="brand-mark">
                <i></i><i></i><i></i><i></i>
              </span>
              <span>shop<span className="brand-light">genie</span></span>
            </a>
            <p>Smarter Retail.<br/>Better Discovery.</p>
            <span className="footer-note"><i></i> MADE FOR THE NEIGHBOURHOOD</span>
          </div>
          <div className="footer-links">
            <div>
              <small>PLATFORM</small>
              <a href="#platform">Overview</a>
              <a href="#customers">For customers</a>
              <a href="#owners">For store owners</a>
              <a href="#discovery">Discovery</a>
              <a href="#intelligence">AI capabilities</a>
            </div>
            <div>
              <small>COMPANY</small>
              <a href="#vision">About</a>
              <a href="#vision">Vision</a>
              <a href="#intelligence">Roadmap</a>
              <a href="mailto:hello@shopgenie.in">Contact</a>
            </div>
            <div>
              <small>EXPERIENCE</small>
              <a href="#owners">Owner app</a>
              <a href="#customers">Customer app</a>
              <a href="#get-started">Get started ↗</a>
            </div>
            <div>
              <small>FOLLOW ALONG</small>
              <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ShopGenie. All rights reserved.</span>
          <span>SMALL SHOPS. BIG POSSIBILITIES.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

export default App
