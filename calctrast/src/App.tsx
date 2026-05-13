import { useState, useRef } from 'react'
import './App.css'

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface CalculateResponse {
  positions: number[]
  error?: string
}

interface FretData {
  index: number          // 1-based fret number
  pestana: number        // distance from nut
  ponte: number          // distance from bridge
  tamanho: number        // fret slot width
}

/* ─── Local calculation: equal temperament rule of 18 ───────────────────── */
// position_n = scale × (1 - 1/2^(n/12))
function calcLocal(scale: number, numFrets: number): number[] {
  const positions: number[] = []
  for (let n = 1; n <= numFrets; n++) {
    positions.push(scale * (1 - 1 / Math.pow(2, n / 12)))
  }
  return positions
}

/* ─── Scale presets ─────────────────────────────────────────────────────── */
const SCALE_PRESETS = [
  { label: 'Violão 650', value: '650' },
  { label: 'Viola 648', value: '648' },
  { label: 'Baixo 864', value: '864' },
  { label: 'Ukulele 380', value: '380' },
]

const FRET_PRESETS = [
  { label: '18 trastes', value: '18' },
  { label: '19 trastes', value: '19' },
  { label: '20 trastes', value: '20' },
  { label: '21 trastes', value: '21' },
  { label: '22 trastes', value: '22' },
  { label: '24 trastes', value: '24' },
]

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function buildFretData(positions: number[], scale: number): FretData[] {
  return positions.map((pos, i) => ({
    index: i + 1,
    pestana: pos,
    ponte: scale - pos,
    tamanho: i === 0 ? pos : pos - positions[i - 1],
  }))
}

/* ─── Fretboard SVG ─────────────────────────────────────────────────────── */
function FretboardSVG({ frets, scale }: { frets: FretData[]; scale: number }) {
  const W = 900
  const H = 220
  const PAD_L = 30
  const PAD_R = 30
  const Y_TOP = 30
  const Y_BOT = 190
  const STRINGS = 6
  const stringYs = Array.from({ length: STRINGS }, (_, i) =>
    Y_TOP + (i * (Y_BOT - Y_TOP)) / (STRINGS - 1)
  )

  const drawWidth = W - PAD_L - PAD_R
  const lastPos = frets[frets.length - 1]?.pestana ?? scale

  const toX = (mm: number) => PAD_L + (mm / lastPos) * drawWidth

  // Marker frets (standard guitar markers)
  const markerFrets = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24])

  return (
    <svg
      className="fretboard-svg"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-label="Visualização do braço do instrumento"
    >
      <defs>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#3d2200" />
          <stop offset="40%"  stopColor="#5c3610" />
          <stop offset="100%" stopColor="#3d2200" />
        </linearGradient>
        <linearGradient id="nutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#f0e6c8" />
          <stop offset="100%" stopColor="#c8b890" />
        </linearGradient>
        <linearGradient id="fretGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#e8d49a" />
          <stop offset="100%" stopColor="#c4a050" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Neck body */}
      <rect
        x={PAD_L} y={Y_TOP}
        width={drawWidth} height={Y_BOT - Y_TOP}
        fill="url(#woodGrad)"
        rx="4"
      />

      {/* Strings */}
      {stringYs.map((y, i) => (
        <line
          key={`s${i}`}
          x1={PAD_L} y1={y}
          x2={PAD_L + drawWidth} y2={y}
          stroke={`rgba(212,180,100,${0.45 + i * 0.08})`}
          strokeWidth={0.8 + i * 0.28}
        />
      ))}

      {/* Fret wires */}
      {frets.map((f) => {
        const x = toX(f.pestana)
        return (
          <rect
            key={`fw${f.index}`}
            x={x - 1.2} y={Y_TOP - 2}
            width={2.4} height={Y_BOT - Y_TOP + 4}
            fill="url(#fretGrad)"
            rx="1"
          />
        )
      })}

      {/* Nut */}
      <rect
        x={PAD_L - 4} y={Y_TOP - 2}
        width={7} height={Y_BOT - Y_TOP + 4}
        fill="url(#nutGrad)"
        rx="2"
      />

      {/* Fret markers (dots) */}
      {frets
        .filter((f) => markerFrets.has(f.index))
        .map((f) => {
          const prevX = f.index === 1 ? PAD_L : toX(frets[f.index - 2].pestana)
          const currX = toX(f.pestana)
          const cx = (prevX + currX) / 2
          const midY = (Y_TOP + Y_BOT) / 2

          if (f.index === 12) {
            return (
              <g key={`m${f.index}`}>
                <circle cx={cx} cy={midY - 18} r={5} fill="#d4a650" opacity={0.8} filter="url(#glow)" />
                <circle cx={cx} cy={midY + 18} r={5} fill="#d4a650" opacity={0.8} filter="url(#glow)" />
              </g>
            )
          }
          return (
            <circle
              key={`m${f.index}`}
              cx={cx} cy={midY}
              r={5.5}
              fill="#d4a650"
              opacity={0.8}
              filter="url(#glow)"
            />
          )
        })}

      {/* Fret number labels (every other) */}
      {frets.map((f) =>
        f.index % 2 === 0 ? null : (
          <text
            key={`ln${f.index}`}
            x={toX(f.pestana)}
            y={Y_BOT + 18}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
            fill="#d4a650"
            opacity={0.75}
          >
            {f.index}
          </text>
        )
      )}

      {/* Scale end line */}
      <line
        x1={PAD_L + drawWidth} y1={Y_TOP - 4}
        x2={PAD_L + drawWidth} y2={Y_BOT + 4}
        stroke="rgba(212,166,80,0.4)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
    </svg>
  )
}

/* ─── Main App ──────────────────────────────────────────────────────────── */
function App() {
  const [scale, setScale]       = useState<string>('650')
  const [frets, setFrets]       = useState<string>('24')
  const [fretData, setFretData] = useState<FretData[] | null>(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const tableRef = useRef<HTMLDivElement>(null)

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const scaleVal = parseFloat(scale)
    const fretsVal = parseInt(frets)

    if (isNaN(scaleVal) || scaleVal <= 0 || isNaN(fretsVal) || fretsVal <= 0) {
      setError('Insira valores válidos para escala e quantidade de trastes.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scale: scaleVal, frets: fretsVal }),
      })

      if (!response.ok) throw new Error('api_unavailable')

      const data: CalculateResponse = await response.json()

      if (data.error) {
        setError(data.error)
        setFretData(null)
      } else {
        setFretData(buildFretData(data.positions, scaleVal))
        setTimeout(() => tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    } catch {
      // Backend offline → compute locally with the same formula as the Clojure service
      const positions = calcLocal(scaleVal, fretsVal)
      setFretData(buildFretData(positions, scaleVal))
      setTimeout(() => tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } finally {
      setLoading(false)
    }
  }

  const scaleNum = parseFloat(scale) || 0
  const lastFret = fretData ? fretData[fretData.length - 1] : null

  return (
    <div className="app">
      <div className="container">
        {/* ── Top Bar ── */}
        <nav className="topbar" aria-label="Barra de navegação">
          <div className="topbar-brand">
            <div className="brand-icon" aria-hidden="true">🎸</div>
            <span className="brand-name">CalcTrast</span>
          </div>

          <a
            href="https://qualitsys.com.br/valderrama/"
            target="_blank"
            rel="noopener noreferrer"
            className="valderrama-badge"
            title="Visitar site de Valderrama"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Valderrama
          </a>
        </nav>

        {/* ── Hero ── */}
        <header className="hero">
          <div className="hero-eyebrow">
            <span className="dot" aria-hidden="true" />
            Ferramenta de Lutheria
          </div>
          <h1>Calculador de<br />Posições de Trastes</h1>
          <p className="hero-sub">
            Calcule com precisão a distância à pestana, à ponte e o tamanho
            de cada traste para qualquer instrumento de corda.
          </p>
        </header>

        {/* ── Main Layout ── */}
        <main className="main-layout">
          {/* ── Form Card ── */}
          <aside>
            <div className="glass-card">
              <div className="section-label">Parâmetros</div>

              <form onSubmit={handleCalculate} noValidate>
                <div className="form-stack">
                  {/* Scale */}
                  <div className="form-field">
                    <label className="field-label" htmlFor="scale-input">
                      Comprimento da Escala
                    </label>
                    <div className="input-row">
                      <input
                        id="scale-input"
                        type="number"
                        step="0.1"
                        min="100"
                        max="1200"
                        value={scale}
                        onChange={(e) => setScale(e.target.value)}
                        placeholder="650"
                        required
                        aria-describedby="scale-hint"
                      />
                      <span className="input-unit">mm</span>
                    </div>
                    <p className="field-hint" id="scale-hint">
                      Distância entre pestana e cavalete (ponte)
                    </p>
                    <div className="presets" role="group" aria-label="Escalas pré-definidas">
                      {SCALE_PRESETS.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          className={`preset-pill${scale === p.value ? ' active' : ''}`}
                          onClick={() => setScale(p.value)}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Frets */}
                  <div className="form-field">
                    <label className="field-label" htmlFor="frets-input">
                      Quantidade de Trastes
                    </label>
                    <div className="input-row">
                      <input
                        id="frets-input"
                        type="number"
                        min="1"
                        max="48"
                        value={frets}
                        onChange={(e) => setFrets(e.target.value)}
                        placeholder="24"
                        required
                        aria-describedby="frets-hint"
                      />
                      <span className="input-unit">un</span>
                    </div>
                    <p className="field-hint" id="frets-hint">
                      Número total de trastes no instrumento
                    </p>
                    <div className="presets" role="group" aria-label="Quantidades pré-definidas">
                      {FRET_PRESETS.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          className={`preset-pill${frets === p.value ? ' active' : ''}`}
                          onClick={() => setFrets(p.value)}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    id="btn-calculate"
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    aria-busy={loading}
                  >
                    <span className="btn-inner">
                      {loading ? (
                        <>
                          <span className="spinner" aria-hidden="true" />
                          Calculando…
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
                          </svg>
                          Calcular Posições
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>

              {error && (
                <div className="error-box" role="alert">
                  <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p>{error}</p>
                </div>
              )}

              {/* Valderrama Banner */}
              <a
                href="https://qualitsys.com.br/valderrama/"
                target="_blank"
                rel="noopener noreferrer"
                className="valderrama-banner"
                aria-label="Visitar o site de Valderrama Lutheria"
              >
                <div className="vald-top">
                  <span className="vald-label">✦ Desenvolvido para</span>
                  <svg className="vald-ext-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
                <div className="vald-name">Valderrama Lutheria</div>
                <div className="vald-desc">
                  Instrumentos artesanais de alta precisão. Acesse o site e conheça o trabalho completo.
                </div>
              </a>
            </div>
          </aside>

          {/* ── Results ── */}
          <div className="results-side" ref={tableRef}>
            {fretData ? (
              <>
                {/* Stats */}
                <div className="stats-row" aria-label="Resumo dos resultados">
                  <div className="stat-card">
                    <div className="stat-label">Escala</div>
                    <div className="stat-value">{scaleNum.toFixed(0)}</div>
                    <div className="stat-unit">mm</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Trastes</div>
                    <div className="stat-value">{fretData.length}</div>
                    <div className="stat-unit">un</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Último Traste</div>
                    <div className="stat-value">{lastFret?.pestana.toFixed(1)}</div>
                    <div className="stat-unit">mm</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">1º à Pestana</div>
                    <div className="stat-value">{fretData[0]?.pestana.toFixed(2)}</div>
                    <div className="stat-unit">mm</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">1º à Ponte</div>
                    <div className="stat-value">{fretData[0]?.ponte.toFixed(2)}</div>
                    <div className="stat-unit">mm</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Menor Traste</div>
                    <div className="stat-value">{lastFret?.tamanho.toFixed(2)}</div>
                    <div className="stat-unit">mm</div>
                  </div>
                </div>

                {/* Fretboard */}
                <div className="fretboard-card">
                  <div className="section-label">Visualização do Braço</div>
                  <FretboardSVG frets={fretData} scale={scaleNum} />
                </div>

                {/* Data Table */}
                <div className="table-card" aria-label="Tabela de posições dos trastes">
                  <div className="table-header">
                    <span className="table-title">Detalhes por Traste</span>
                    <span className="table-badge">{fretData.length} medidas</span>
                  </div>
                  <div className="table-scroll">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Dist. à Pestana</th>
                          <th scope="col">Dist. à Ponte</th>
                          <th scope="col">Tamanho do Traste</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fretData.map((f) => (
                          <tr
                            key={f.index}
                            className={f.index === 12 ? 'highlight-row' : ''}
                          >
                            <td>
                              <span className="td-fret">{f.index}</span>
                            </td>
                            <td>
                              <span className="td-value">{f.pestana.toFixed(2)}</span>
                              <span className="td-unit">mm</span>
                            </td>
                            <td>
                              <span className="td-dim">{f.ponte.toFixed(2)}</span>
                              <span className="td-unit">mm</span>
                            </td>
                            <td>
                              <span className="td-size">{f.tamanho.toFixed(2)}</span>
                              <span className="td-unit">mm</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state" aria-label="Aguardando cálculo">
                <div className="empty-graphic" aria-hidden="true">🎸</div>
                <h3>Pronto para Calcular</h3>
                <p>
                  Configure os parâmetros ao lado e clique em{' '}
                  <strong>Calcular Posições</strong> para visualizar a distância
                  à pestana, à ponte e o tamanho de cada traste.
                </p>
                <a
                  href="https://qualitsys.com.br/valderrama/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="empty-vald-link"
                >
                  <span>🎼</span>
                  Conheça a Lutheria de Valderrama
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
            )}
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="footer">
          <p>
            CalcTrast v1.0
            <span className="footer-divider">·</span>
            Licença MIT
            <span className="footer-divider">·</span>
            © 2026 Grupo de Engenharia de Software
          </p>
          <p>
            Desenvolvido para{' '}
            <a
              href="https://qualitsys.com.br/valderrama/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Valderrama
            </a>
            {' '}— Lutheria de precisão
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
