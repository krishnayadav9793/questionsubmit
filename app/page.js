"use client"
import { useState, useEffect, useRef } from "react";
export default function Home() {



  const OPTION_CONFIG = [
    { label: "A", ring: "focus:ring-violet-500", badge: "bg-violet-500/20 text-violet-300 border-violet-500/40", glow: "focus:shadow-[0_0_20px_rgba(139,92,246,0.4)]" },
    { label: "B", ring: "focus:ring-pink-500", badge: "bg-pink-500/20 text-pink-300 border-pink-500/40", glow: "focus:shadow-[0_0_20px_rgba(236,72,153,0.4)]" },
    { label: "C", ring: "focus:ring-cyan-500", badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40", glow: "focus:shadow-[0_0_20px_rgba(6,182,212,0.4)]" },
    { label: "D", ring: "focus:ring-amber-500", badge: "bg-amber-500/20 text-amber-300 border-amber-500/40", glow: "focus:shadow-[0_0_20px_rgba(245,158,11,0.4)]" },
  ];


  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [exam, setExam] = useState('');
  const [subject,setSubject]=useState('');
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const handleOption = (i, v) => {
    const o = [...options]; o[i] = v; setOptions(o);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImagePreview(file);
    }
  };

  const handleSubmit = async () => {

    try {

  
  if (file) {

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {

      try {

        const res = await fetch("/api/upload/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result }),
        });

        const data = await res.json();

        console.log("Image uploaded:", data.secure_url);

        await dataSave(data.secure_url);

      } catch (e) {
        console.log("error in image upload", e);
      }

    };

  } else {

    // No image selected
    await dataSave(null);

  }

} catch (e) {
  console.log("error reading file", e);
}

    async function dataSave(imageUrl) {

      try {

        const res1 = await fetch("/api/upload/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Qusetion_Statement: question,
            Option_1: options[0],
            Option_2: options[1],
            Option_3: options[2],
            Option_4: options[3],
            Image: imageUrl,
            Answer: correct,
            Exam: exam,
            Subject:subject
          }),
        });

        console.log("Question saved", await res1.json());

      } catch (e) {
        console.log("error in question upload", e);
      }
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000);

    }

  };


  return (
    <div className="min-h-screen bg-[#070711] flex items-center justify-center p-6 relative overflow-hidden font-serif">

      {/* Animated mesh background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
        <div className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] bg-cyan-600/15 rounded-full blur-[110px] animate-pulse [animation-delay:4s]" />
        <div className="absolute top-1/4 left-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[90px] animate-pulse [animation-delay:1s]" />
      </div>

      {/* Grid lines */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="fixed w-1 h-1 rounded-full bg-violet-400/40 animate-bounce pointer-events-none"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${3 + i * 0.5}s`
          }}
        />
      ))}

      {/* Card */}
      <div className="relative z-10 w-full max-w-[640px] bg-white/[0.03] border border-white/[0.08] rounded-3xl p-10 backdrop-blur-xl shadow-[0_0_100px_rgba(139,92,246,0.1),0_32px_80px_rgba(0,0,0,0.5)]">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,1)] animate-pulse" />
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,1)] animate-pulse [animation-delay:0.5s]" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,1)] animate-pulse [animation-delay:1s]" />
            </div>
            <span className="text-white/25 text-[10px] tracking-[4px] uppercase font-mono">Quiz Builder</span>
          </div>
          <h1 className="text-[36px] font-bold leading-tight">
            <span className="bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
              Craft Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Question
            </span>
          </h1>
        </div>

        {/* Question Statement */}
        <div className="mb-7">
          <label className="block text-[10px] font-mono tracking-[3px] uppercase text-white/40 mb-2.5">
            Question Statement
          </label>
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="What would you like to ask?"
            rows={3}
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3.5 text-white/90 text-sm placeholder:text-white/20 outline-none resize-none transition-all duration-300 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30 focus:shadow-[0_0_24px_rgba(139,92,246,0.25)] font-sans"
          />
        </div>

        {/* Options Grid */}
        <div className="mb-7">
          <label className="block text-[10px] font-mono tracking-[3px] uppercase text-white/40 mb-2.5">
            Answer Options
          </label>
          <div className="grid grid-cols-2 gap-3">
            {OPTION_CONFIG.map((cfg, i) => (
              <div key={i} className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg border text-[10px] font-bold font-mono flex items-center justify-center z-10 ${cfg.badge}`}>
                  {cfg.label}
                </span>
                <input
                  type="text"
                  value={options[i]}
                  onChange={e => handleOption(i, e.target.value)}
                  placeholder={`Option ${cfg.label}`}
                  className={`w-full bg-white/[0.04] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white/90 text-sm placeholder:text-white/20 outline-none transition-all duration-300 ${cfg.ring} focus:ring-2 ${cfg.glow} focus:border-white/20 font-sans`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Correct Answer */}
        <div className="mb-7">
          <label className="block text-[10px] font-mono tracking-[3px] uppercase text-white/40 mb-2.5">
            Correct Answer
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 text-lg font-bold pointer-events-none">✓</span>
            <input
              type="text"
              value={correct}
              onChange={e => setCorrect(e.target.value)}
              placeholder="Enter the correct answer..."
              className="w-full bg-emerald-500/[0.04] border border-emerald-500/20 rounded-xl pl-10 pr-4 py-3.5 text-white/90 text-sm placeholder:text-white/20 outline-none transition-all duration-300 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/30 focus:shadow-[0_0_24px_rgba(16,185,129,0.25)] font-sans"
            />
          </div>
        </div>
        {/* <FormControl fullWidth> */}
        <div className="w-full max-w-sm">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exam
          </label>

          <select
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
        focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Exam</option>
            <option value="JeeMains">JEE Mains</option>
            <option value="JeeAdvance">JEE Advance</option>
            <option value="Neet">NEET</option>
          </select>

          <p className="mt-2 text-sm text-gray-600">
            Selected: {exam}
          </p>

        </div>
        <div className="w-full max-w-sm">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
        focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Maths">Maths</option>
            <option value="Biology">Biology</option>
          </select>

          <p className="mt-2 text-sm text-gray-600">
            Selected: {subject}
          </p>

        </div>
        {/* </FormControl> */}
        {/* Image Upload */}
        <div className="mb-9">
          <label className="block text-[10px] font-mono tracking-[3px] uppercase text-white/40 mb-2.5">
            Attach Image <span className="text-white/20 normal-case tracking-normal text-[10px]">(optional)</span>
          </label>

          {imagePreview ? (
            <div className="relative group rounded-2xl overflow-hidden border border-violet-500/40 cursor-pointer" onClick={() => fileRef.current.click()}>
              <img src={imagePreview} alt="Preview" className="w-full max-h-48 object-cover" />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-2xl mb-1">🔄</span>
                <span className="text-white/80 text-xs font-mono tracking-widest uppercase">Change Image</span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileRef.current.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${dragOver
                ? "border-violet-500/70 bg-violet-500/10 scale-[1.01]"
                : "border-white/10 bg-white/[0.02] hover:border-violet-500/40 hover:bg-violet-500/5"
                }`}
            >
              <div className="text-4xl mb-3">🖼️</div>
              <div className="text-white/40 text-xs font-mono tracking-widest uppercase mb-1">
                {dragOver ? "Drop it here!" : "Click or drag to upload"}
              </div>
              <div className="text-white/20 text-[10px] font-mono">PNG · JPG · GIF · WEBP</div>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={e => {
            handleFile(e.target.files[0])
            setFile(e.target.files[0])
          }} className="hidden" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-7" />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className={`w-full py-4 rounded-2xl font-mono text-sm font-bold tracking-[3px] uppercase transition-all duration-500 cursor-pointer select-none
            ${submitted
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_50px_rgba(16,185,129,0.5)] scale-[0.99]"
              : "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98]"
            }`}
        >
          <span className="text-white drop-shadow-sm">
            {submitted ? "✓  Question Saved!" : "Submit Question →"}
          </span>
        </button>

        <p className="text-center text-white/15 text-[10px] font-mono tracking-[2px] mt-5">
          STATEMENT · 4 OPTIONS · CORRECT ANSWER REQUIRED
        </p>
      </div>
    </div>


  );
}
