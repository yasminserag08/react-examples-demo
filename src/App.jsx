import { useState, useEffect, useRef } from "react";

const TABS = [
  {
    id: "props",
    label: "Props",
    code: `function UserCard({name, role, image, isOnline}) {
  console.log({name, role, image, isOnline});
  return (
    <div className="w-72 p-6 rounded-2xl bg-gray-900 text-white shadow-xl text-center">
      <img
        src={image}
        alt={name}
        className={\`w-24 h-24 rounded-full mx-auto mb-4 border-4 \${isOnline ? "border-green-500" : "border-red-500"} object-cover\`}
      />
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-400 text-sm mb-2">{role}</p>
      <p className={isOnline ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
        ● {isOnline ? "Online" : "Offline"}
      </p>
    </div>
  );
}

function Profile() {
  const cat = "https://i.pravatar.cc/150?img=47";
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-8">
        React Props Demo
      </h1>
      <UserCard
        name="Yasmin"
        role="Frontend Developer"
        image={cat}
        isOnline={true}
      />
    </div>
  );
}`,
  },
  {
    id: "usestate",
    label: "useState",
    code: `function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md w-64">
        <h2 className="text-xl font-semibold mb-4">Counter</h2>
        <p className="text-3xl font-bold text-blue-600 mb-4">
          {count}
        </p>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          Increment
        </button>
      </div>
    </div>
  );
}`,
  },
  {
    id: "usereducer",
    label: "useReducer",
    code: `function reducer(state, action) {
  switch(action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md w-64">
        <h2 className="text-xl font-semibold mb-4">useReducer Counter</h2>
        <p className="text-3xl font-bold text-blue-600 mb-4">
          {state.count}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch({ type: "decrement" })}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >-</button>
          <button
            onClick={() => dispatch({ type: "increment" })}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >+</button>
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    id: "usememo",
    label: "useMemo",
    code: `function App() {
  const items = React.useMemo(() => Array.from({ length: 10000 }, (_, i) => \`Item \${i}\`), []);
  const [count, setCount] = React.useState(0);
  const [search, setSearch] = React.useState("");

  const filteredItems = React.useMemo(() => {
    console.log("Filtering...");
    return items.filter(item =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-sm w-full mx-auto p-4 border rounded-lg text-center space-y-3 bg-white shadow">
        <h2 className="text-lg font-semibold">useMemo Demo</h2>
        <button
          onClick={() => setCount(count + 1)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Count: {count}
        </button>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search items..."
          className="w-full border px-2 py-1 rounded"
        />
        <p className="text-sm text-gray-600">
          Results: {filteredItems.length}
        </p>
      </div>
    </div>
  );
}`,
  },
  {
    id: "usecallback",
    label: "useCallback",
    code: `const { useState, useCallback, memo } = React;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";

  return (
    <div className={\`min-h-screen p-8 transition-all \${theme}\`}>
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Marketing Page</h1>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
          >Toggle Theme</button>
        </div>
        <MarketingPage campaignId="summer2026" source="instagram" theme={theme} />
      </div>
    </div>
  );
}

function MarketingPage({ campaignId, source, theme }) {
  const handleSubscribe = useCallback((email) => {
    console.log("Subscribed:", campaignId, source, email);
  }, [campaignId, source]);

  return (
    <div className="bg-white text-black rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Join Our Newsletter</h2>
      <NewsletterForm onSubscribe={handleSubscribe} />
    </div>
  );
}

const NewsletterForm = memo(function NewsletterForm({ onSubscribe }) {
  console.log("NewsletterForm Rendered");
  const [email, setEmail] = useState("");
  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button
        onClick={() => onSubscribe(email)}
        className="w-full py-2 bg-purple-500 text-white rounded-lg"
      >Subscribe</button>
    </div>
  );
});`,
  },
  {
    id: "usecontext",
    label: "useContext",
    code: `const { createContext, useState, useContext, useCallback, memo } = React;

const ThemeContext = createContext("light");

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={theme}>
      <div className={\`min-h-screen flex items-center justify-center transition-all \${theme === "light" ? "bg-gray-100" : "bg-gray-900"}\`}>
        <div className={\`w-full max-w-md p-6 rounded-2xl shadow-lg transition-all \${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"}\`}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">My App</h1>
            <button onClick={toggleTheme} className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm">
              Toggle Theme
            </button>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

const NewsletterForm = memo(function NewsletterForm() {
  const theme = useContext(ThemeContext);
  const [email, setEmail] = useState("");

  const handleSubscribe = useCallback(() => {
    console.log("Subscribed:", email);
  }, [email]);

  const inputClasses = \`w-full px-3 py-2 mb-2 rounded-lg border focus:outline-none \${
    theme === "light" ? "bg-gray-50 text-black border-gray-300" : "bg-gray-700 text-white border-gray-600"
  }\`;
  const cardClasses = \`p-4 rounded-xl transition-all \${
    theme === "light" ? "bg-gray-50 text-black" : "bg-gray-700 text-white"
  }\`;

  return (
    <div className={cardClasses}>
      <h2 className="text-lg font-semibold mb-2">Newsletter Form</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className={inputClasses}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubscribe} className="w-full py-2 bg-purple-500 text-white rounded-lg">
        Subscribe
      </button>
      <p className="mt-2 text-xs opacity-70">Current theme: {theme}</p>
    </div>
  );
});`,
  },
  {
    id: "fetching",
    label: "Data Fetching",
    code: `function RandomPainting() {
  const [painting, setPainting] = React.useState({ title: "", artist: "", image: "" });
  const [loading, setLoading] = React.useState(true);

  const fetchPainting = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.artic.edu/api/v1/artworks?page=" +
          (Math.floor(Math.random() * 100) + 1) +
          "&limit=1"
      );
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        const artwork = data.data[0];
        const imageUrl = artwork.image_id
          ? \`https://www.artic.edu/iiif/2/\${artwork.image_id}/full/843,/0/default.jpg\`
          : null;
        setPainting({
          title: artwork.title || "Unknown",
          artist: artwork.artist_display || "Unknown",
          image: imageUrl,
        });
        console.log("Fetched:", artwork.title);
      }
    } catch (err) {
      console.error(err.message);
      setPainting({ title: "Failed to fetch", artist: "", image: null });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { fetchPainting(); }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Random Painting</h1>
      <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md flex flex-col items-center">
        {loading ? (
          <p className="py-8 text-gray-400">Loading...</p>
        ) : (
          <>
            {painting.image && (
              <img src={painting.image} alt={painting.title} className="rounded-lg mb-4 w-full object-cover" />
            )}
            <h2 className="text-lg font-semibold text-center">{painting.title}</h2>
            <p className="text-sm opacity-70 mb-4 text-center">{painting.artist}</p>
          </>
        )}
        <button
          onClick={fetchPainting}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >Fetch New Painting</button>
      </div>
    </div>
  );
}`,
  },
];

function buildSrcDoc(code) {
  // Find the first top-level capitalized function as root component
  const match = code.match(/^function\s+([A-Z]\w*)/m);
  const rootComponent = match ? match[1] : null;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<script src="https://cdn.tailwindcss.com"></script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { height: 100vh; }
  #root { height: 100vh; }
</style>
</head>
<body>
<div id="root"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js"></script>
<script>
  const _log = console.log.bind(console);
  const _err = console.error.bind(console);
  const _warn = console.warn.bind(console);
  console.log = (...a) => { _log(...a); window.parent.postMessage({type:'log',level:'log',msg:a.map(x=>typeof x==='object'?JSON.stringify(x,null,2):String(x)).join(' ')},'*'); };
  console.error = (...a) => { _err(...a); window.parent.postMessage({type:'log',level:'error',msg:a.map(String).join(' ')},'*'); };
  console.warn = (...a) => { _warn(...a); window.parent.postMessage({type:'log',level:'warn',msg:a.map(String).join(' ')},'*'); };
  window.addEventListener('error', e => window.parent.postMessage({type:'log',level:'error',msg:e.message},'*'));
</script>
<script type="text/babel" data-presets="react">
  try {
    ${code}
    ${rootComponent
      ? `ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${rootComponent}));`
      : `document.getElementById('root').innerHTML = '<div style="color:#888;padding:20px;font-family:monospace">No root component found.</div>';`
    }
  } catch(e) {
    document.getElementById('root').innerHTML = \`<div style="color:#ef4444;padding:20px;font-family:monospace;font-size:13px;white-space:pre-wrap">\${e.message}</div>\`;
    window.parent.postMessage({type:'log',level:'error',msg:e.message},'*');
  }
</script>
</body>
</html>`;
}

const COLORS = {
  bg: "#f5f4f0",
  panel: "#ffffff",
  border: "#e8e6e0",
  text: "#1a1a1a",
  muted: "#888",
  tag: "#f0ede6",
  consoleBg: "#1c1c1c",
  log: "#d4d4d4",
  warn: "#fbbf24",
  error: "#f87171",
  lineNum: "#bbb",
};

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [codes, setCodes] = useState(TABS.map((t) => t.code));
  const [logs, setLogs] = useState([]);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [srcDoc, setSrcDoc] = useState("");
  const textareaRef = useRef(null);
  const lineNumRef = useRef(null);
  const logsEndRef = useRef(null);

  const currentCode = codes[activeTab];

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSrcDoc(buildSrcDoc(currentCode));
      setLogs([]);
    }, 600);
    return () => clearTimeout(debounce);
  }, [currentCode, activeTab]);

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === "log") {
        setLogs((prev) => [
          ...prev.slice(-199),
          { level: e.data.level, msg: e.data.msg, id: Date.now() + Math.random() },
        ]);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleTabKey = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = textareaRef.current;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newCode = currentCode.substring(0, start) + "  " + currentCode.substring(end);
      const newCodes = [...codes];
      newCodes[activeTab] = newCode;
      setCodes(newCodes);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    }
  };

  const syncScroll = (e) => {
    if (lineNumRef.current) lineNumRef.current.scrollTop = e.target.scrollTop;
  };

  const lineCount = currentCode.split("\n").length;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: ${COLORS.bg}; }
        textarea { outline: none; resize: none; }
        textarea::selection { background: #6366f133; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }
        .tab-btn { transition: all 0.15s; }
        .tab-btn:hover { opacity: 0.75; }
        .console-line { border-bottom: 1px solid #252525; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: none; } }
        .log-entry { animation: fadeIn 0.12s ease; }
      `}</style>

      <div style={{
        height: "100vh", display: "flex", flexDirection: "column",
        fontFamily: "'Geist Mono', monospace",
        background: COLORS.bg, color: COLORS.text,
      }}>
        {/* Top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 20px", height: 50,
          borderBottom: `1px solid ${COLORS.border}`,
          background: COLORS.panel, flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 17, fontStyle: "italic", flexShrink: 0 }}>
              live.editor
            </span>
            <span style={{ width: 1, height: 16, background: COLORS.border, flexShrink: 0 }} />
            <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 2 }}>
              {TABS.map((t, i) => (
                <button key={t.id} className="tab-btn" onClick={() => setActiveTab(i)} style={{
                  padding: "4px 11px", fontSize: 11,
                  fontFamily: "'Geist Mono', monospace",
                  border: `1px solid ${i === activeTab ? COLORS.text : COLORS.border}`,
                  borderRadius: 6,
                  background: i === activeTab ? COLORS.text : "transparent",
                  color: i === activeTab ? "#fff" : COLORS.muted,
                  cursor: "pointer", fontWeight: i === activeTab ? 600 : 400,
                  letterSpacing: 0.3, whiteSpace: "nowrap", flexShrink: 0,
                }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ fontSize: 10, color: COLORS.muted }}>{lineCount} lines</span>
            <button onClick={() => setConsoleOpen(o => !o)} style={{
              padding: "4px 10px", fontSize: 11,
              border: `1px solid ${COLORS.border}`, borderRadius: 6,
              background: consoleOpen ? COLORS.tag : "transparent",
              color: COLORS.muted, cursor: "pointer",
              fontFamily: "'Geist Mono', monospace",
            }}>
              {consoleOpen ? "hide console" : "show console"}
            </button>
          </div>
        </div>

        {/* Main panels */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* Code panel */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            borderRight: `1px solid ${COLORS.border}`, minWidth: 0,
          }}>
            <div style={{
              padding: "7px 16px", fontSize: 10, color: COLORS.muted,
              letterSpacing: 1.5, textTransform: "uppercase",
              borderBottom: `1px solid ${COLORS.border}`, background: COLORS.panel,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexShrink: 0,
            }}>
              <span>Code</span>
              <span style={{ color: "#4ade80", fontSize: 9 }}>● editable</span>
            </div>

            <div style={{ flex: 1, display: "flex", overflow: "hidden", background: COLORS.panel }}>
              {/* Line numbers */}
              <div ref={lineNumRef} style={{
                padding: "16px 10px 16px 8px", minWidth: 42, textAlign: "right",
                background: COLORS.panel, color: COLORS.lineNum,
                fontSize: 12, lineHeight: "20px", userSelect: "none",
                borderRight: `1px solid ${COLORS.border}`,
                overflowY: "hidden", flexShrink: 0,
              }}>
                {currentCode.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={currentCode}
                onChange={(e) => {
                  const newCodes = [...codes];
                  newCodes[activeTab] = e.target.value;
                  setCodes(newCodes);
                }}
                onKeyDown={handleTabKey}
                onScroll={syncScroll}
                spellCheck={false}
                style={{
                  flex: 1, padding: "16px 16px 16px 12px",
                  fontSize: 12.5, lineHeight: "20px",
                  fontFamily: "'Geist Mono', monospace",
                  background: "transparent", color: COLORS.text,
                  border: "none", overflowY: "auto",
                  whiteSpace: "pre", tabSize: 2,
                }}
              />
            </div>
          </div>

          {/* Right column: Preview + Console */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

            {/* Preview */}
            <div style={{
              flex: consoleOpen ? "1 1 60%" : "1 1 100%",
              display: "flex", flexDirection: "column",
              borderBottom: consoleOpen ? `1px solid ${COLORS.border}` : "none",
              transition: "flex 0.2s ease", minHeight: 0,
            }}>
              <div style={{
                padding: "7px 16px", fontSize: 10, color: COLORS.muted,
                letterSpacing: 1.5, textTransform: "uppercase",
                borderBottom: `1px solid ${COLORS.border}`, background: COLORS.panel,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexShrink: 0,
              }}>
                <span>Preview</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {["#f87171","#fbbf24","#4ade80"].map(c => (
                    <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                  ))}
                </div>
              </div>
              <iframe
                key={activeTab}
                srcDoc={srcDoc}
                sandbox="allow-scripts allow-same-origin"
                style={{ flex: 1, border: "none", background: "#fff" }}
                title="preview"
              />
            </div>

            {/* Console */}
            {consoleOpen && (
              <div style={{
                flex: "0 0 36%", display: "flex", flexDirection: "column",
                background: COLORS.consoleBg, minHeight: 0,
              }}>
                <div style={{
                  padding: "6px 16px", fontSize: 10, letterSpacing: 1.5,
                  textTransform: "uppercase", borderBottom: "1px solid #2a2a2a",
                  color: "#555", display: "flex", alignItems: "center",
                  justifyContent: "space-between", flexShrink: 0,
                }}>
                  <span>Console</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {logs.length > 0 && (
                      <span style={{
                        background: "#333", color: "#777", borderRadius: 3,
                        padding: "1px 6px", fontSize: 9,
                      }}>{logs.length}</span>
                    )}
                    <button onClick={() => setLogs([])} style={{
                      background: "none", border: "none", color: "#555",
                      cursor: "pointer", fontSize: 10,
                      fontFamily: "'Geist Mono', monospace", padding: 0,
                    }}>clear</button>
                  </div>
                </div>

                <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
                  {logs.length === 0 && (
                    <div style={{ padding: "8px 16px", color: "#444", fontSize: 12 }}>
                      No output yet. Try adding{" "}
                      <span style={{ color: "#67e8f9" }}>console.log()</span> to your code.
                    </div>
                  )}
                  {logs.map((log) => (
                    <div key={log.id} className="log-entry console-line" style={{
                      padding: "5px 16px", fontSize: 12,
                      fontFamily: "'Geist Mono', monospace", lineHeight: "18px",
                      color: log.level === "error" ? COLORS.error : log.level === "warn" ? COLORS.warn : COLORS.log,
                      display: "flex", alignItems: "flex-start", gap: 8,
                    }}>
                      <span style={{ color: "#555", userSelect: "none", flexShrink: 0, fontSize: 10, marginTop: 1 }}>
                        {log.level === "error" ? "✕" : log.level === "warn" ? "△" : "›"}
                      </span>
                      <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{log.msg}</span>
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}