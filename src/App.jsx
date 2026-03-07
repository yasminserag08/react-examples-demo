import { useState, useEffect, useRef, useCallback } from "react";
import catImg from "./assets/cat.jpg";

// ─── Tabs / Examples ────────────────────────────────────────────────────────

const makeTabs = (catSrc) => [
  {
    id: "props",
    label: "Props",
    code: `import React from "react";

function UserCard({name, role, image, isOnline}) {
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

export default function Profile() {
  const cat = "${catSrc}";
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
    code: `import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
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
    code: `import React, { useReducer } from "react";

function reducer(state, action) {
  switch(action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

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
    id: "todo",
    label: "Todo App",
    code: `import React, { useReducer, useState } from "react";

// This is our reducer — it handles all the ways a todo can change.
// Instead of scattering setX calls everywhere, every update goes through here.
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // Spread the existing todos and tack on a new one at the end.
      // We use Date.now() as a quick unique ID.
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "TOGGLE":
      // Flip the done status of whichever todo was clicked.
      // Every other todo stays exactly the same.
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "DELETE":
      // Keep everything except the todo we want to remove.
      return state.filter(todo => todo.id !== action.id);
    case "EDIT":
      // Swap in the new text for the matching todo, leave the rest alone.
      return state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
    default:
      return state;
  }
}

export default function TodoApp() {
  // useReducer gives us the todos array + a dispatch function to trigger changes.
  // The second argument is our initial list of todos.
  const [todos, dispatch] = useReducer(todoReducer, [
    { id: 1, text: "Learn useReducer", done: true },
    { id: 2, text: "Build a Todo app", done: false },
    { id: 3, text: "Present to the class", done: false },
  ]);

  // Controlled input for the "add new todo" field
  const [input, setInput] = useState("");

  // These two track which todo is currently being edited (if any)
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    // Don't add empty or whitespace-only todos
    if (!input.trim()) return;
    dispatch({ type: "ADD", text: input.trim() });
    console.log("Added:", input.trim());
    setInput(""); // clear the input after adding
  };

  const handleEditStart = (todo) => {
    // Store which todo we're editing and pre-fill the edit input with its current text
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = (id) => {
    // Don't save if they cleared the text entirely
    if (!editText.trim()) return;
    dispatch({ type: "EDIT", id, text: editText.trim() });
    console.log("Edited:", editText.trim());
    // Reset editing state — this takes us back to the normal view
    setEditingId(null);
    setEditText("");
  };

  // Just a quick count for the "X/Y done" badge in the header
  const done = todos.filter(t => t.done).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">

        {/* Header with the live done/total counter */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">My Todos</h1>
          <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
            {done}/{todos.length} done
          </span>
        </div>

        {/* Add new todo — pressing Enter also triggers handleAdd */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Add a new task..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 transition font-medium"
          >Add</button>
        </div>

        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition group"
            >
              {/* Checkbox toggles done/undone */}
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => dispatch({ type: "TOGGLE", id: todo.id })}
                className="w-4 h-4 accent-indigo-500 cursor-pointer flex-shrink-0"
              />

              {/* If this todo is being edited, show the inline edit form instead */}
              {editingId === todo.id ? (
                <div className="flex flex-1 gap-2 items-center">
                  <input
                    className="flex-1 border border-indigo-300 rounded px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") handleEditSave(todo.id);
                      if (e.key === "Escape") setEditingId(null); // cancel on Escape
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => handleEditSave(todo.id)}
                    className="text-indigo-500 hover:text-indigo-700 text-xs font-medium"
                  >save</button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >cancel</button>
                </div>
              ) : (
                <>
                  {/* Strike through the text if it's done */}
                  <span className={\`flex-1 text-sm \${todo.done ? "line-through text-slate-400" : "text-slate-700"}\`}>
                    {todo.text}
                  </span>
                  {/* Edit and delete buttons are hidden until you hover the row (group-hover) */}
                  <button
                    onClick={() => handleEditStart(todo)}
                    className="text-slate-300 hover:text-indigo-400 transition text-xs opacity-0 group-hover:opacity-100"
                  >✎</button>
                  <button
                    onClick={() => {
                      dispatch({ type: "DELETE", id: todo.id });
                      console.log("Deleted:", todo.text);
                    }}
                    className="text-slate-300 hover:text-red-400 transition text-xs opacity-0 group-hover:opacity-100"
                  >✕</button>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Only shows up when all todos have been deleted */}
        {todos.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-4">All done! 🎉</p>
        )}
      </div>
    </div>
  );
}`,
  },
  {
    id: "usememo",
    label: "useMemo",
    code: `import React, { useState, useMemo } from "react";

export default function App() {
  const items = useMemo(() => Array.from({ length: 10000 }, (_, i) => \`Item \${i}\`), []);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
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
    code: `import { useState, useCallback, memo } from "react";

export default function MarketingPage({ campaignId = "summer2026", source = "instagram" }) {
  const [darkMode, setDarkMode] = useState(false);

  // MarketingPage uses this Tailwind theme
  const theme = darkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";

  const handleSubscribe = useCallback(
    (email) => {
      console.log("Subscribed:", campaignId, source, email);
    }, [campaignId, source]
  );

  return (
    <div className={\`min-h-screen p-8 transition-all \${theme}\`}>
      <div className="max-w-md mx-auto space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Marketing Page</h1>
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
          >
            Toggle Theme
          </button>
        </div>

        {/* Newsletter Card (does NOT use theme) */}
        <div className="bg-white text-black rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Join Our Newsletter</h2>
          <NewsletterForm onSubscribe={handleSubscribe} />
        </div>

      </div>
    </div>
  );
}

/* ========================= */

const NewsletterForm = memo(function NewsletterForm({ onSubscribe }) {
  console.log("NewsletterForm Rendered");

  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubscribe(email);
      }}
      className="space-y-4"
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button
        type="submit"
        className="w-full py-2 bg-purple-500 text-white rounded-lg"
      >
        Subscribe
      </button>
    </form>
  );
});`,
  },
  {
    id: "usecontext",
    label: "useContext",
    code: `import { createContext, useState, useContext } from "react";

const ThemeContext = createContext("light");

export default function MarketingPage({campaignId="summer2026", source="Insagram"}) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  function handleSubscribe(email) {
    console.log("Subscribed: ", campaignId, source, email);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className={\`min-h-screen flex items-center justify-center transition-all
        \${theme === "light" ? "bg-gray-100" : "bg-gray-900"}\`}>
        {/* Compact Card */}
        <div
          className={\`w-full max-w-md p-6 rounded-2xl shadow-lg transition-all
            \${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"}\`}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">My App</h1>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm"
            >
              Toggle Theme
            </button>
          </div>

          <NewsletterForm
          handleSubscribe={handleSubscribe}/>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

function NewsletterForm({handleSubscribe}) {
  const theme = useContext(ThemeContext);
  const [email, setEmail] = useState("");

  // Input styling changes with theme
  const inputClasses = \`w-full px-3 py-2 mb-2 rounded-lg border focus:outline-none
    \${theme === "light" ? "bg-gray-50 text-black border-gray-300" : "bg-gray-700 text-white border-gray-600"}\`;

  const cardClasses = \`p-4 rounded-xl transition-all
    \${theme === "light" ? "bg-gray-50 text-black" : "bg-gray-700 text-white"}\`;

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
      <button
        onClick={() => handleSubscribe(email)}
        className="w-full py-2 bg-purple-500 text-white rounded-lg"
      >
        Subscribe
      </button>
      <p className="mt-2 text-xs opacity-70">Current theme: {theme}</p>
    </div>
  );
}`,
  },
  {
    id: "fetching",
    label: "Data Fetching",
    code: `import React, { useState, useEffect } from "react";

export default function RandomArtwork() {
  const [artwork, setArtwork] = useState({ title: "", artist: "", image: "" });
  const [loading, setLoading] = useState(true);

  const fetchArtwork = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.artic.edu/api/v1/artworks?page=" +
          (Math.floor(Math.random() * 100) + 1) +
          "&limit=1"
      );
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        const item = data.data[0];
        const imageUrl = item.image_id
          ? \`https://www.artic.edu/iiif/2/\${item.image_id}/full/843,/0/default.jpg\`
          : null;
        setArtwork({
          title: item.title || "Unknown",
          artist: item.artist_display || "Unknown",
          image: imageUrl,
        });
        console.log("Fetched:", item.title);
      }
    } catch (err) {
      console.error(err.message);
      setArtwork({ title: "Failed to fetch", artist: "", image: null });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArtwork(); }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Random Artwork</h1>
      <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md flex flex-col items-center">
        {loading ? (
          <p className="py-8 text-gray-400">Loading...</p>
        ) : (
          <>
            {artwork.image && (
              <img src={artwork.image} alt={artwork.title} className="rounded-lg mb-4 w-full object-cover" />
            )}
            <h2 className="text-lg font-semibold text-center">{artwork.title}</h2>
            <p className="text-sm opacity-70 mb-4 text-center">{artwork.artist}</p>
          </>
        )}
        <button
          onClick={fetchArtwork}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >Fetch New Artwork</button>
      </div>
    </div>
  );
}`,
  },
  {
    id: "useref",
    label: "useRef",
    code: `import React, { useRef, useState } from "react";

export default function FocusInputExample() {
  const inputRef = useRef(null);
  const [popup, setPopup] = useState(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const showValue = () => {
    const val = inputRef.current.value;
    setPopup(val === "" ? "(empty)" : val);
    setTimeout(() => setPopup(null), 2500);
  };

  const selectInput = () => {
    inputRef.current.select();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm flex flex-col gap-4" style={{ position: "relative" }}>
        <h2 className="text-xl font-semibold text-slate-800">useRef Demo</h2>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type something..."
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <div className="flex flex-col gap-2">
          <button
            onClick={handleFocus}
            className="px-4 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 transition"
          >Focus Input</button>
          <button
            onClick={showValue}
            className="px-4 py-2 bg-slate-700 text-white text-sm rounded-lg hover:bg-slate-800 transition"
          >Show Value</button>
          <button
            onClick={selectInput}
            className="px-4 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition"
          >Select Input</button>
        </div>
        {popup !== null && (
          <div style={{
            position:"absolute", top:16, right:16,
            background:"#1e293b", color:"#f1f5f9",
            padding:"8px 14px", borderRadius:8,
            fontSize:13, fontFamily:"monospace",
            boxShadow:"0 4px 12px rgba(0,0,0,0.2)",
            animation:"fadeIn 0.15s ease",
          }}>
            Value: <strong>{popup}</strong>
          </div>
        )}
      </div>
    </div>
  );
}`,
  },
];

// ─── Syntax Highlighter ─────────────────────────────────────────────────────

const KEYWORDS = new Set([
  "const","let","var","function","return","if","else","switch","case","default",
  "break","for","while","do","new","typeof","instanceof","import","export",
  "from","class","extends","super","this","null","undefined","true","false",
  "async","await","try","catch","finally","throw","of","in","=>",
]);
const HOOKS = new Set([
  "useState","useEffect","useReducer","useMemo","useCallback","useContext",
  "useRef","useLayoutEffect","useImperativeHandle","useDebugValue","memo",
  "createContext","useId",
]);

function tokenize(code) {
  const tokens = [];
  let i = 0;
  while (i < code.length) {
    if (code[i] === "/" && code[i+1] === "/") {
      let j = i;
      while (j < code.length && code[j] !== "\n") j++;
      tokens.push({ type: "comment", value: code.slice(i, j) });
      i = j;
      continue;
    }
    if (code[i] === "/" && code[i+1] === "*") {
      let j = i + 2;
      while (j < code.length && !(code[j-1] === "*" && code[j] === "/")) j++;
      tokens.push({ type: "comment", value: code.slice(i, j+1) });
      i = j + 1;
      continue;
    }
    if (code[i] === "`") {
      let j = i + 1;
      while (j < code.length && code[j] !== "`") {
        if (code[j] === "\\") j++;
        j++;
      }
      tokens.push({ type: "string", value: code.slice(i, j+1) });
      i = j + 1;
      continue;
    }
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== q) {
        if (code[j] === "\\") j++;
        j++;
      }
      tokens.push({ type: "string", value: code.slice(i, j+1) });
      i = j + 1;
      continue;
    }
    if (/[0-9]/.test(code[i]) && (i === 0 || /\W/.test(code[i-1]))) {
      let j = i;
      while (j < code.length && /[0-9.]/.test(code[j])) j++;
      tokens.push({ type: "number", value: code.slice(i, j) });
      i = j;
      continue;
    }
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (HOOKS.has(word)) tokens.push({ type: "hook", value: word });
      else if (KEYWORDS.has(word)) tokens.push({ type: "keyword", value: word });
      else if (/^[A-Z]/.test(word)) tokens.push({ type: "component", value: word });
      else tokens.push({ type: "ident", value: word });
      i = j;
      continue;
    }
    if (code[i] === "<" || code[i] === ">") {
      tokens.push({ type: "tag", value: code[i] });
      i++;
      continue;
    }
    tokens.push({ type: "plain", value: code[i] });
    i++;
  }
  return tokens;
}

const TOKEN_COLORS_DARK = {
  keyword:   "#c084fc",
  hook:      "#38bdf8",
  string:    "#86efac",
  number:    "#fb923c",
  comment:   "#6b7280",
  component: "#fde68a",
  tag:       "#94a3b8",
  ident:     "#e2e8f0",
  plain:     "#cbd5e1",
};

const TOKEN_COLORS_LIGHT = {
  keyword:   "#8250df",
  hook:      "#0550ae",
  string:    "#116329",
  number:    "#953800",
  comment:   "#6e7781",
  component: "#953800",
  tag:       "#57606a",
  ident:     "#1f2328",
  plain:     "#57606a",
};

function HighlightedCode({ code, dark }) {
  const TOKEN_COLORS = dark ? TOKEN_COLORS_DARK : TOKEN_COLORS_LIGHT;
  const tokens = tokenize(code);
  return (
    <code style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12.5, lineHeight: "20px" }}>
      {tokens.map((tok, i) => (
        <span key={i} style={{ color: TOKEN_COLORS[tok.type] || TOKEN_COLORS.plain }}>
          {tok.value}
        </span>
      ))}
    </code>
  );
}

// ─── iframe srcdoc builder ───────────────────────────────────────────────────

function buildSrcDoc(code) {
  const exportDefaultMatch = code.match(/export\s+default\s+function\s+([A-Z]\w*)/);
  const exportDefaultConst = code.match(/export\s+default\s+([A-Z]\w*)/);

  const sanitized = code
    .replace(/^import\s+.*$/gm, "")
    .replace(/export\s+default\s+/g, "")
    .replace(/export\s+/g, "");

  const reactGlobals = "const { useState, useEffect, useReducer, useMemo, useCallback, useContext, useRef, useLayoutEffect, useId, createContext, memo, forwardRef, Fragment } = React;";

  const rootComponent = exportDefaultMatch
    ? exportDefaultMatch[1]
    : exportDefaultConst
      ? exportDefaultConst[1]
      : (() => { const m = [...sanitized.matchAll(/^function\s+([A-Z]\w*)/gm)]; return m.length > 0 ? m[m.length - 1][1] : null; })();

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<script src="https://cdn.tailwindcss.com"></script>
<style>* { box-sizing: border-box; margin: 0; padding: 0; } body { height: 100vh; } #root { height: 100vh; }</style>
</head>
<body>
<div id="root"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js"></script>
<script>
  const _log = console.log.bind(console), _err = console.error.bind(console), _warn = console.warn.bind(console);
  const isBabelNoise = (...a) => a.map(String).join(' ').toLowerCase().includes('babel');
  console.log = (...a) => { _log(...a); if (!isBabelNoise(...a)) window.parent.postMessage({type:'log',level:'log',msg:a.map(x=>typeof x==='object'?JSON.stringify(x,null,2):String(x)).join(' ')},'*'); };
  console.error = (...a) => { _err(...a); if (!isBabelNoise(...a)) window.parent.postMessage({type:'log',level:'error',msg:a.map(String).join(' ')},'*'); };
  console.warn = (...a) => { _warn(...a); if (!isBabelNoise(...a)) window.parent.postMessage({type:'log',level:'warn',msg:a.map(String).join(' ')},'*'); };
  window.addEventListener('error', e => window.parent.postMessage({type:'log',level:'error',msg:e.message},'*'));
</script>
<script type="text/babel" data-presets="react">
  try {
    ${reactGlobals}
    ${sanitized}
    ${rootComponent
      ? `ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${rootComponent}));`
      : `document.getElementById('root').innerHTML='<div style="color:#888;padding:20px;font-family:monospace">No root component found.</div>'; window.parent.postMessage({type:'log',level:'warn',msg:'No default export found — add export default to your root component.'},'*');`
    }
  } catch(e) {
    document.getElementById('root').innerHTML=\`<div style="color:#ef4444;padding:20px;font-family:monospace;font-size:13px;white-space:pre-wrap">\${e.message}</div>\`;
    window.parent.postMessage({type:'log',level:'error',msg:e.message},'*');
  }
</script>
</body></html>`;
}

// ─── Colors ──────────────────────────────────────────────────────────────────

const DARK = {
  bg:         "#0f1117",
  panel:      "#161b22",
  border:     "#30363d",
  text:       "#e6edf3",
  muted:      "#8b949e",
  accent:     "#58a6ff",
  tag:        "#21262d",
  consoleBg:  "#0d1117",
  log:        "#c9d1d9",
  warn:       "#e3b341",
  error:      "#f85149",
  lineNum:    "#484f58",
  green:      "#3fb950",
  btnActiveBg:        "#1f3a5f",
  btnActiveBorder:    "#58a6ff",
  btnActiveColor:     "#58a6ff",
  copiedActiveBg:     "#1a3a2a",
  copiedActiveBorder: "#3fb950",
  copiedActiveColor:  "#3fb950",
};

const LIGHT = {
  bg:         "#ffffff",
  panel:      "#f6f8fa",
  border:     "#d0d7de",
  text:       "#1f2328",
  muted:      "#656d76",
  accent:     "#0969da",
  tag:        "#eaeef2",
  consoleBg:  "#f6f8fa",
  log:        "#1f2328",
  warn:       "#9a6700",
  error:      "#d1242f",
  lineNum:    "#8c959f",
  green:      "#1a7f37",
  btnActiveBg:        "#dbeafe",
  btnActiveBorder:    "#93c5fd",
  btnActiveColor:     "#1d4ed8",
  copiedActiveBg:     "#dcfce7",
  copiedActiveBorder: "#86efac",
  copiedActiveColor:  "#15803d",
};

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const TABS = makeTabs(catImg);
  const [activeTab, setActiveTab]   = useState(0);
  const [codes, setCodes]           = useState(() => makeTabs(catImg).map(t => t.code));
  const [logs, setLogs]             = useState([]);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [srcDoc, setSrcDoc]         = useState("");
  const [copied, setCopied]         = useState(false);
  const [editMode, setEditMode]     = useState(false);
  const [dark, setDark]             = useState(true);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const C = dark ? DARK : LIGHT;

  const textareaRef  = useRef(null);
  const lineNumRef   = useRef(null);
  const preScrollRef = useRef(null);
  const logsEndRef   = useRef(null);

  const currentCode = codes[activeTab];

  useEffect(() => {
    const t = setTimeout(() => { setSrcDoc(buildSrcDoc(currentCode)); }, 400);
    return () => clearTimeout(t);
  }, [currentCode]);

  useEffect(() => {
    const h = (e) => {
      if (e.data?.type === "log")
        setLogs(p => [...p.slice(-199), { level: e.data.level, msg: e.data.msg, id: Date.now() + Math.random() }]);
    };
    window.addEventListener("message", h);
    return () => window.removeEventListener("message", h);
  }, []);

  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  const syncScroll = (e) => {
    if (lineNumRef.current) lineNumRef.current.scrollTop = e.target.scrollTop;
    if (preScrollRef.current) {
      preScrollRef.current.scrollTop  = e.target.scrollTop;
      preScrollRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const handleTabKey = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = textareaRef.current;
      const s = el.selectionStart, end = el.selectionEnd;
      const next = currentCode.substring(0, s) + "  " + currentCode.substring(end);
      const nc = [...codes]; nc[activeTab] = next; setCodes(nc);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + 2; });
    }
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(currentCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [currentCode]);

  const lineCount = currentCode.split("\n").length;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: ${C.bg}; }
        textarea { outline: none; resize: none; caret-color: #58a6ff; }
        textarea::selection { background: #58a6ff33; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
        .tab-btn { transition: all 0.15s; }
        .tab-btn:hover { background: ${C.tag} !important; color: ${C.text} !important; }
        .console-row { border-bottom: 1px solid ${dark ? "#1c2128" : "#d0d7de"}; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(2px); } to { opacity:1; transform:none; } }
        .log-in { animation: fadeIn 0.12s ease; }
        .icon-btn:hover { background: ${C.tag} !important; }
      `}</style>

      <div style={{ height:"100vh", display:"flex", flexDirection:"column", fontFamily:"'Geist Mono',monospace", background:C.bg, color:C.text }}>

        {/* ── Top bar ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", height:50, borderBottom:`1px solid ${C.border}`, background:C.panel, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0 }}>
            <span style={{ fontFamily:"'Instrument Serif',serif", fontSize:17, fontStyle:"italic", color:C.text, flexShrink:0 }}>
              live.editor
            </span>
            <span style={{ width:1, height:16, background:C.border, flexShrink:0 }} />
            <div style={{ display:"flex", gap:4, overflowX:"auto", paddingBottom:1 }}>
              {TABS.map((t, i) => (
                <button key={t.id} className="tab-btn" onClick={() => { setActiveTab(i); setEditMode(false); setSrcDoc(""); setLogs([]); }} style={{
                  padding:"4px 11px", fontSize:11,
                  fontFamily:"'Geist Mono',monospace",
                  border:`1px solid ${i === activeTab ? C.accent : C.border}`,
                  borderRadius:6,
                  background: i === activeTab ? (dark ? "#1f3a5f" : "#dce8f8") : "transparent",
                  color: i === activeTab ? C.accent : C.muted,
                  cursor:"pointer", fontWeight: i === activeTab ? 600 : 400,
                  letterSpacing:0.3, whiteSpace:"nowrap", flexShrink:0,
                }}>{t.label}</button>
              ))}
            </div>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            <span style={{ fontSize:10, color:C.muted }}>{lineCount} lines</span>
            <span style={{ position:"relative", display:"inline-block" }}>
              <span
                onMouseEnter={() => setTooltipOpen(true)}
                onMouseLeave={() => setTooltipOpen(false)}
                style={{
                  fontSize:10, color:C.muted, cursor:"help",
                  display:"flex", alignItems:"center", gap:4, lineHeight:"14px",
                }}
              >
                <span style={{
                  width:14, height:14, borderRadius:"50%",
                  border:`1px solid ${C.muted}`,
                  display:"inline-flex", alignItems:"center", justifyContent:"center",
                  fontSize:9, fontWeight:600, flexShrink:0,
                }}>i</span>
                demo env
              </span>
              {tooltipOpen && (
                <span style={{
                  position:"fixed",
                  background: dark ? "#1c2128" : "#ffffff",
                  border: `1px solid ${C.border}`,
                  borderRadius:8, padding:"10px 13px",
                  fontSize:11, lineHeight:"18px",
                  color: C.muted,
                  width:260, whiteSpace:"normal",
                  boxShadow: dark ? "0 8px 24px rgba(0,0,0,0.6)" : "0 8px 24px rgba(0,0,0,0.1)",
                  pointerEvents:"none",
                  zIndex:999,
                  transform:"translateX(-80%) translateY(24px)",
                }}>
                  <span style={{ color:C.text, fontWeight:600, display:"block", marginBottom:4 }}>For demonstration only</span>
                  This environment is designed purely for learning and exploration. It runs React in the browser without a bundler, build step, or package manager — which is not how production React apps work. For real projects, use a proper setup like <span style={{ color:C.accent }}>Vite</span> or <span style={{ color:C.accent }}>Next.js</span>.
                </span>
              )}
            </span>
            <button onClick={() => setDark(d => !d)} className="icon-btn" style={{
              padding:"4px 10px", fontSize:11,
              border:`1px solid ${C.border}`, borderRadius:6,
              background:"transparent", color:C.muted,
              cursor:"pointer", fontFamily:"'Geist Mono',monospace",
            }}>{dark ? "☀ light" : "☾ dark"}</button>
            <button onClick={() => setConsoleOpen(o => !o)} className="icon-btn" style={{
              padding:"4px 10px", fontSize:11,
              border:`1px solid ${C.border}`, borderRadius:6,
              background: consoleOpen ? C.tag : "transparent",
              color: consoleOpen ? C.text : C.muted,
              cursor:"pointer", fontFamily:"'Geist Mono',monospace",
            }}>{consoleOpen ? "hide console" : "show console"}</button>
          </div>
        </div>

        {/* ── Main ── */}
        <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

          {/* ── Code panel ── */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", borderRight:`1px solid ${C.border}`, minWidth:0 }}>

            {/* Code header */}
            <div style={{
              padding:"7px 12px 7px 16px", fontSize:10, color:C.muted,
              letterSpacing:1.5, textTransform:"uppercase",
              borderBottom:`1px solid ${C.border}`, background:C.panel,
              display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0,
            }}>
              <span style={{ color:C.muted }}>Code</span>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <button className="edit-toggle" onClick={() => setEditMode(m => !m)} style={{
                  padding:"3px 9px", fontSize:10, borderRadius:5,
                  border:`1px solid ${editMode ? C.btnActiveBorder : C.border}`,
                  background: editMode ? C.btnActiveBg : "transparent",
                  color: editMode ? C.btnActiveColor : C.muted,
                  cursor:"pointer", fontFamily:"'Geist Mono',monospace",
                  display:"flex", alignItems:"center", gap:4,
                }}>
                  <span style={{ fontSize:9 }}>✎</span>
                  {editMode ? "editing" : "edit"}
                </button>
                <button onClick={handleCopy} className="icon-btn" style={{
                  padding:"3px 9px", fontSize:10, borderRadius:5,
                  border:`1px solid ${copied ? C.copiedActiveBorder : C.border}`,
                  background: copied ? C.copiedActiveBg : "transparent",
                  color: copied ? C.copiedActiveColor : C.muted,
                  cursor:"pointer", fontFamily:"'Geist Mono',monospace",
                  display:"flex", alignItems:"center", gap:4, transition:"all 0.2s",
                }}>
                  {copied ? "✓ copied" : "copy"}
                </button>
              </div>
            </div>

            {/* Editor body */}
            <div style={{ flex:1, display:"flex", overflow:"hidden", background:C.bg, position:"relative" }}>

              {/* Line numbers */}
              <div ref={lineNumRef} style={{
                padding:"16px 10px 16px 12px", minWidth:46, textAlign:"right",
                background:C.bg, color:C.lineNum, fontSize:12, lineHeight:"20px",
                userSelect:"none", borderRight:`1px solid ${C.border}`,
                overflowY:"hidden", flexShrink:0,
              }}>
                {currentCode.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>

              {/* Highlighted code layer */}
              <pre
                ref={preScrollRef}
                style={{
                  position:"absolute", left:46, right:0, top:0, bottom:0,
                  margin:0, padding:"16px 16px 16px 14px",
                  fontSize:12.5, lineHeight:"20px",
                  fontFamily:"'Geist Mono',monospace",
                  background:"transparent",
                  whiteSpace:"pre", overflowY:"auto", overflowX:"auto",
                  pointerEvents:"none",
                  tabSize:2,
                }}
              >
                <HighlightedCode code={currentCode} dark={dark} />
              </pre>

              {/* Transparent textarea on top */}
              <textarea
                ref={textareaRef}
                value={currentCode}
                readOnly={!editMode}
                onChange={(e) => {
                  const nc = [...codes]; nc[activeTab] = e.target.value; setCodes(nc);
                }}
                onKeyDown={handleTabKey}
                onScroll={syncScroll}
                spellCheck={false}
                style={{
                  position:"absolute", left:46, right:0, top:0, bottom:0,
                  padding:"16px 16px 16px 14px",
                  fontSize:12.5, lineHeight:"20px",
                  fontFamily:"'Geist Mono',monospace",
                  background:"transparent",
                  color: editMode ? (dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)") : "transparent",
                  border:"none",
                  overflowY:"auto", overflowX:"auto",
                  whiteSpace:"pre", tabSize:2,
                  cursor: editMode ? "text" : "default",
                  caretColor: editMode ? C.accent : "transparent",
                  zIndex:2,
                  resize:"none",
                }}
              />
            </div>
          </div>

          {/* ── Right: Preview + Console ── */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

            {/* Preview */}
            <div style={{ flex: consoleOpen ? "1 1 60%" : "1 1 100%", display:"flex", flexDirection:"column", minHeight:0 }}>
              <div style={{
                padding:"7px 16px", fontSize:10, color:C.muted,
                letterSpacing:1.5, textTransform:"uppercase",
                borderBottom:`1px solid ${C.border}`, background:C.panel,
                display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0,
              }}>
                <span>Preview</span>
                <div style={{ display:"flex", gap:4 }}>
                  {["#f85149","#e3b341","#3fb950"].map(c => (
                    <div key={c} style={{ width:8, height:8, borderRadius:"50%", background:c }} />
                  ))}
                </div>
              </div>
              <iframe
                srcDoc={srcDoc}
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                style={{ flex:1, border:"none", background:"#fff" }}
                title="preview"
              />
            </div>

            {/* Console */}
            {consoleOpen && (
              <div style={{ flex:"0 0 36%", display:"flex", flexDirection:"column", background:C.consoleBg, minHeight:0, borderTop:`1px solid ${C.border}` }}>
                <div style={{
                  padding:"6px 16px", fontSize:10, letterSpacing:1.5, textTransform:"uppercase",
                  borderBottom:`1px solid ${C.border}`, color:C.muted,
                  display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0,
                }}>
                  <span>Console</span>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    {logs.length > 0 && (
                      <span style={{ background:C.tag, color:C.muted, borderRadius:3, padding:"1px 6px", fontSize:9 }}>
                        {logs.length}
                      </span>
                    )}
                    <button onClick={() => setLogs([])} style={{
                      background:"none", border:"none", color:C.muted,
                      cursor:"pointer", fontSize:10, fontFamily:"'Geist Mono',monospace", padding:0,
                    }}>clear</button>
                  </div>
                </div>
                <div style={{ flex:1, overflowY:"auto", padding:"6px 0" }}>
                  {logs.length === 0 && (
                    <div style={{ padding:"8px 16px", color:"#484f58", fontSize:12 }}>
                      No output yet — try <span style={{ color:"#38bdf8" }}>console.log()</span>
                    </div>
                  )}
                  {logs.map(log => (
                    <div key={log.id} className="log-in console-row" style={{
                      padding:"5px 16px", fontSize:12,
                      fontFamily:"'Geist Mono',monospace", lineHeight:"18px",
                      color: log.level === "error" ? C.error : log.level === "warn" ? C.warn : C.log,
                      display:"flex", alignItems:"flex-start", gap:8,
                    }}>
                      <span style={{ color:"#484f58", userSelect:"none", flexShrink:0, fontSize:10, marginTop:1 }}>
                        {log.level === "error" ? "✕" : log.level === "warn" ? "△" : "›"}
                      </span>
                      <span style={{ whiteSpace:"pre-wrap", wordBreak:"break-word" }}>{log.msg}</span>
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