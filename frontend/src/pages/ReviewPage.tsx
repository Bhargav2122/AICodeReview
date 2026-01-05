import { useState } from "react";
import sideBar from "../assets/sidebar.png";
import { Editor } from "@monaco-editor/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getReview } from "../features/review/reviewSlice";

const ReviewPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const { data, loading } = useAppSelector((s) => s.review);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (!code.trim()) return;
    await dispatch(getReview({ code }));
  };

  return (
    <div className="h-screen bg-neutral-950 text-white flex flex-col md:flex-row overflow-hidden">
      {/* CSS to hide scrollbars while allowing mouse scroll */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-50
          h-full
          ${
            isOpen
              ? "translate-x-0 w-72"
              : "-translate-x-full md:translate-x-0 md:w-16"
          }
          bg-neutral-900 border-r border-neutral-800
          transition-all duration-300
          flex flex-col
        `}
      >
        <div className="h-16 flex items-center justify-center border-b border-neutral-800">
          <img
            src={sideBar}
            onClick={() => setIsOpen(!isOpen)}
            className="w-6 cursor-pointer"
            alt="toggle"
          />
        </div>

        {isOpen && (
          <div className="flex-1 p-3 space-y-2 overflow-y-auto no-scrollbar">
            <p className="text-sm text-gray-400">Recent Chats</p>
            <div className="bg-neutral-800 px-3 py-2 rounded">Auth Review</div>
            <div className="bg-neutral-800 px-3 py-2 rounded">Navbar Bug</div>
          </div>
        )}
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Mobile Top Header (Ensures icon is always visible when sidebar is closed) */}
        <div className="md:hidden flex items-center h-14 px-4 bg-neutral-900 border-b border-neutral-800">
          {!isOpen && (
            <img
              src={sideBar}
              onClick={() => setIsOpen(true)}
              className="w-6 cursor-pointer"
              alt="open"
            />
          )}
          <span className="ml-4 font-semibold">Review Tool</span>
        </div>

        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Scrollable Container for Code & Review */}
        <main className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden no-scrollbar">
          {/* Code Section */}
          <section className="w-full md:w-1/2 flex flex-col p-4 border-b md:border-b-0 md:border-r border-neutral-800 shrink-0 md:shrink">
            <h3 className="mb-2 font-semibold">Code</h3>
            <div className="h-[400px] md:flex-1 border border-neutral-800 rounded overflow-hidden">
              <Editor
                value={code}
                onChange={(v) => setCode(v ?? "")}
                defaultValue="// Paste or write your code"
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  automaticLayout: true,
                  fontSize: 14,
                }}
              />
            </div>
            <button
              disabled={loading}
              onClick={handleClick}
              className="cursor-pointer mt-4 w-full md:w-auto self-end px-5 py-2 bg-indigo-600 rounded"
            >
              {loading ? "Analyzing..." : "Review "}
            </button>
          </section>

          {/* AI Review Section */}
          <section className="w-full md:w-1/2 flex flex-col p-4 shrink-0 md:shrink">
            <h3 className="mb-2 font-semibold">AI Review</h3>
            {/* on mobile, this gets a specific height so it's visible */}
            <div className="h-[300px] md:flex-1 bg-neutral-900 border border-neutral-800 rounded p-4 overflow-y-auto no-scrollbar">
              {data && (
                <>
                  <section>
                    <h3 className="text-lg font-semibold">Summary</h3>
                    <p>{data.aiOutput.summary}</p>
                  </section>

                  {data.aiOutput.bugs.length > 0 && (
                    <section>
                      <h3 className="text-lg font-semibold">Bugs</h3>
                      {data.aiOutput.bugs.map((bug, i) => (
                        <div key={i} className="border p-2 rounded mb-2">
                          <p>
                            <strong>Severity:</strong> {bug.severity}
                          </p>
                          <p>
                            <strong>Issue:</strong> {bug.issue}
                          </p>
                          <p>
                            <strong>Why:</strong> {bug.why}
                          </p>
                          <pre className="bg-amber-50 text-black p-2 mt-2 rounded">
                            {bug.fix}
                          </pre>
                        </div>
                      ))}
                    </section>
                  )}

                  {data.aiOutput.improvements.length > 0 && (
                    <section>
                      <h3 className="text-lg font-semibold">Improvements</h3>
                      <ul className="list-disc pl-5">
                        {data.aiOutput.improvements.map((imp, i) => (
                          <li key={i}>{imp}</li>
                        ))}
                      </ul>
                    </section>
                  )}
                   <h3 className="text-lg font-semibold">optimizedCode</h3>
                    <section className="bg-amber-50 text-black">
                    <pre>{data.aiOutput.optimizedCode}</pre>
                  </section>


                  {data.aiOutput.securityIssues.length > 0 && (
                    <section>
                      <h3 className="text-lg font-semibold">Security Issues</h3>
                      <ul className="list-disc pl-5 text-red-600">
                        {data.aiOutput.securityIssues.map((sec, i) => (
                          <li key={i}>{sec}</li>
                        ))}
                      </ul>
                    </section>
                  )}
                </>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ReviewPage;
