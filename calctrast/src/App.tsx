import { useState, useEffect } from 'react'
import './App.css'

interface CalculateResponse {
  positions: number[]
  error?: string
}

function App() {
  const [scale, setScale] = useState<string>('650')
  const [frets, setFrets] = useState<string>('24')
  const [positions, setPositions] = useState<number[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    setShowAnimation(true)
  }, [])

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scale: parseFloat(scale),
          frets: parseInt(frets),
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`)
      }

      const data: CalculateResponse = await response.json()
      if (data.error) {
        setError(data.error)
        setPositions(null)
      } else {
        setPositions(data.positions)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com o servidor')
      setPositions(null)
    } finally {
      setLoading(false)
    }
  }

  const maxPosition = positions ? Math.max(...positions) : 0
  const totalLength = parseFloat(scale)

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <div className="header-content">
            <h1>Calculador de Posições de Trastes</h1>
            <p className="subtitle">Ferramenta de Engenharia para Instrumentos de Corda</p>
          </div>
        </header>

        <div className="main-content">
          <div className="form-section">
            <div className="section-title">Parâmetros de Entrada</div>
            
            <form onSubmit={handleCalculate}>
              <div className="form-group">
                <label htmlFor="scale">Comprimento da Escala</label>
                <div className="input-wrapper">
                  <input
                    id="scale"
                    type="number"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    placeholder="650"
                  />
                  <span className="unit">mm</span>
                </div>
                <small>Distância entre o ponto de ancoragem e o ponto de transição</small>
              </div>

              <div className="form-group">
                <label htmlFor="frets">Quantidade de Trastes</label>
                <div className="input-wrapper">
                  <input
                    id="frets"
                    type="number"
                    value={frets}
                    onChange={(e) => setFrets(e.target.value)}
                    placeholder="24"
                  />
                  <span className="unit">un</span>
                </div>
                <small>Número total de trastes no instrumento</small>
              </div>

              <button type="submit" disabled={loading} className="btn-calculate">
                <span>{loading ? 'Processando...' : 'Calcular Posições'}</span>
              </button>
            </form>

            {error && (
              <div className="error-box">
                <svg className="icon-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>{error}</p>
              </div>
            )}
          </div>

          {positions && (
            <div className="results-section">
              <div className="section-title">Resultados</div>
              
              <div className="fretboard-container">
                <div className="fretboard-info">
                  <div className="info-item">
                    <span className="label">Escala</span>
                    <span className="value">{parseFloat(scale).toFixed(1)} mm</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Trastes</span>
                    <span className="value">{frets}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Último Traste</span>
                    <span className="value">{positions[positions.length - 1].toFixed(2)} mm</span>
                  </div>
                </div>

                <svg 
                  className="fretboard-svg" 
                  viewBox={`0 0 ${Math.ceil(maxPosition) + 80} 320`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Braço do violão */}
                  <defs>
                    <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#8B6F47', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: '#A0826D', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#8B6F47', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>

                  <rect 
                    x="40" 
                    y="60" 
                    width={Math.ceil(maxPosition) + 30} 
                    height="200" 
                    fill="url(#woodGradient)"
                    stroke="#5C3D2E" 
                    strokeWidth="2"
                    rx="4"
                  />

                  {/* Cordas (6 cordas) */}
                  {[80, 120, 160, 200, 240, 280].map((y, i) => (
                    <line
                      key={`string-${i}`}
                      x1="40"
                      y1={y}
                      x2={Math.ceil(maxPosition) + 70}
                      y2={y}
                      stroke="#C0A080"
                      strokeWidth="2.5"
                      opacity="0.8"
                    />
                  ))}

                  {/* Trastes (linhas verticais) */}
                  {positions.map((pos, idx) => (
                    <g key={`fret-${idx}`}>
                      <line
                        x1={pos + 40}
                        y1="60"
                        x2={pos + 40}
                        y2="260"
                        stroke="#D4A05A"
                        strokeWidth="3.5"
                        opacity="0.9"
                      />
                      {idx % 2 === 0 && (
                        <text
                          x={pos + 40}
                          y="48"
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="600"
                          fill="#D4A05A"
                        >
                          {idx + 1}
                        </text>
                      )}
                    </g>
                  ))}

                  {/* Marcadores de escala */}
                  <circle cx="40" cy="160" r="6" fill="#FFD700" stroke="#C0860C" strokeWidth="2" />
                  <text x="40" y="295" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontWeight="500">
                    0mm
                  </text>
                  
                  <circle cx={Math.ceil(maxPosition) + 40} cy="160" r="6" fill="#FFD700" stroke="#C0860C" strokeWidth="2" />
                  <text x={Math.ceil(maxPosition) + 40} y="295" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontWeight="500">
                    {Math.ceil(maxPosition)}mm
                  </text>
                </svg>
              </div>

              <div className="measurements">
                <div className="measurements-header">
                  <h3>Detalhes das Posições</h3>
                  <span className="count">{positions.length} medidas</span>
                </div>
                <div className="measurements-grid">
                  {positions.map((pos, idx) => (
                    <div key={idx} className="measurement-card">
                      <div className="fret-number">Traste {idx + 1}</div>
                      <div className="fret-position">{pos.toFixed(2)}</div>
                      <div className="fret-unit">mm</div>
                      {idx > 0 && (
                        <div className="fret-spacing">
                          Espaço: {(pos - positions[idx - 1]).toFixed(2)}mm
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {!positions && (
          <div className="empty-state">
            <div className="empty-icon">♪</div>
            <h3>Pronto para Calcular</h3>
            <p>Configure os parâmetros e execute o cálculo para visualizar as posições dos trastes</p>
          </div>
        )}

        <footer className="footer">
          <p>Calculador de Trastes v1.0 • Licença MIT • © 2026 Grupo de Engenharia de Software</p>
          <p style={{ fontSize: '0.75rem', marginTop: '8px', opacity: 0.6 }}>
            Desenvolvido para fins educacionais e profissionais em Lutheria
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
